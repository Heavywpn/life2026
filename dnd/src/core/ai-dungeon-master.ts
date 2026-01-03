/**
 * AI Dungeon Master - Full AI-driven D&D experience
 * Uses Claude to narrate, interpret actions, and run the game
 */

import Anthropic from '@anthropic-ai/sdk';
import type { Character } from '../models/character.types.js';
import type { Monster } from '../models/monster.types.js';
import { roll, formatModifier, getAbilityModifier } from './dice.js';
import { getSkillModifier, getSavingThrowModifier } from '../models/character.types.js';
import { SKILL_ABILITIES } from '../models/common.types.js';
import { getWorldContextForAI, loadWorldState } from '../data/world-state.js';
import {
  loadStoryState,
  saveStoryState,
  createEmptyStoryState,
  getStoryContextForAI,
  parseStoryUpdates,
  mergeStoryUpdates,
  cleanStoryTags,
  type StoryState,
} from '../data/story-state.js';

export interface GameState {
  character: Character;
  currentHP: number;
  maxHP: number;
  location: string;
  inCombat: boolean;
  enemies: CombatEnemy[];
  inventory: string[];
  gold: number;
  questLog: string[];
  flags: Set<string>;
  turnCount: number;
  messageHistory: ConversationMessage[];
}

export interface CombatEnemy {
  name: string;
  hp: number;
  maxHp: number;
  ac: number;
  attackBonus: number;
  damage: string;
  isAlive: boolean;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface DiceResult {
  type: string;
  roll: number;
  modifier: number;
  total: number;
  dc?: number;
  success?: boolean;
}

const BASE_SYSTEM_PROMPT = `You are an expert Dungeon Master running a solo D&D 5th Edition adventure in a SHARED PERSISTENT WORLD. Multiple heroes adventure in this same realm, and their actions affect the world for everyone.

## Your Role
- Narrate the world vividly with sensory details
- Voice NPCs with distinct personalities
- Describe combat cinematically
- Present challenges fairly but create tension
- Celebrate player successes dramatically
- Make failures interesting, not punishing
- REFERENCE the shared world - mention events from other heroes' adventures, use established NPCs and locations

## Shared World (IMPORTANT)
This character exists in a world where OTHER HEROES have also adventured. When relevant:
- Reference events from other characters' adventures as rumors or news
- Use established NPCs and locations from the world state
- If the player visits a location another hero discovered, acknowledge its history
- NPCs might mention "another adventurer" who passed through
- The world has continuity - destroyed locations stay destroyed, freed prisoners stay freed

## Game Mechanics
When the player attempts something requiring a check, you MUST request a roll using this exact format:
[ROLL: type | modifier | DC]

Examples:
- [ROLL: Perception | +3 | 12]
- [ROLL: Attack | +5 | 15]
- [ROLL: Strength Save | +2 | 14]
- [ROLL: Stealth | +7 | 13]

The system will make the roll and tell you the result. Then narrate the outcome.

For DAMAGE, use: [DAMAGE: dice]
Example: [DAMAGE: 1d8+3]

For HEALING, use: [HEAL: amount]
Example: [HEAL: 2d4+2]

## GOLD & REWARDS (IMPORTANT!)
When the player gains or spends gold, you MUST use the GOLD tag:
[GOLD: +amount] for gaining gold
[GOLD: -amount] for spending gold

Examples:
- [GOLD: +15] - Found 15 gold pieces
- [GOLD: -50] - Paid 50 gold for a room
- [GOLD: +100] - Reward for completing quest

When the player earns experience points, use:
[XP: amount]

Examples:
- [XP: 50] - Defeated enemies
- [XP: 100] - Completed a quest
- [XP: 25] - Clever problem solving

Award XP for:
- Combat victories: 25-100 XP based on difficulty
- Quest completion: 50-200 XP
- Clever solutions: 10-50 XP
- Major story moments: 50-150 XP

## World Event Tracking
When something SIGNIFICANT happens that should affect the shared world, include:
[WORLD_EVENT: brief title | description | impact level (minor/significant/major)]

Examples:
- [WORLD_EVENT: Goblin Camp Destroyed | The player cleared the goblin encampment near Silverdale | significant]
- [WORLD_EVENT: Dragon Sighted | A red dragon was seen flying over the mountains | major]

## STORY CONTINUITY TRACKING (CRITICAL!)
You MUST maintain story consistency. Use these tags to track story elements:

### NPCs - When introducing or updating an NPC:
[NPC: Name | role | status | description]
Examples:
- [NPC: Sera | victim | freed | Young woman rescued from kidnappers, dark hair, grateful to Kalidan]
- [NPC: Marcus | enemy | dead | Scarred kidnapper, worked for a slave ring]
- [NPC: The Captain | enemy | unknown | Leader of the slave operation, mentioned by kidnappers]

### Locations - When arriving at a new location:
[LOCATION: Name | type | status | description]
Examples:
- [LOCATION: Abandoned Warehouse | warehouse | dangerous | Kidnapper hideout on the outskirts of town]
- [LOCATION: Pier Seven | docks | dangerous | Where the slave ship "Tide's Fortune" is moored]

### Discoveries - When the player learns something important:
[DISCOVERY: title | importance | content]
Examples:
- [DISCOVERY: Slave Ring Operation | major | Kidnappers work for "The Captain", ship at Pier 7, targeting young women]
- [DISCOVERY: Anchor Brand | significant | Slavers wear bronze medallions with anchor symbol]

### Story Items - When the player obtains plot-relevant items:
[STORY_ITEM: name | significance]
Examples:
- [STORY_ITEM: Bronze Medallion | Identifies members of the slave ring, anchor symbol with "Tide's Fortune"]
- [STORY_ITEM: Dock Map | Shows Pier 7 marked with X, notes about "new moon tide"]

### Quests - When a new quest/objective emerges:
[QUEST: name | description | objective1; objective2; objective3]
Example:
- [QUEST: Dismantle the Slave Ring | Stop the Captain's operation | Find Pier 7; Investigate the ship; Rescue any captives; Defeat the Captain]

### Quest Completion:
[QUEST_COMPLETE: quest_name]

### Current Situation - Update at end of each response:
[SITUATION: brief description of current state]
Example:
- [SITUATION: Kalidan has freed Sera and killed one kidnapper. Three more are approaching the warehouse. He is setting an ambush.]

### Active Threats:
[THREAT: description]
Example:
- [THREAT: Three kidnappers approaching the warehouse with torches]

### Events - Log significant story moments:
[EVENT: what happened]
Example:
- [EVENT: Killed Marcus the kidnapper, discovered evidence of larger slave ring]

ALWAYS include relevant tags at the end of your response to maintain story continuity!

## Combat Flow
1. Describe the enemies and situation
2. Ask what the player does
3. Request attack rolls when they attack
4. Request damage on hits
5. Narrate enemy turns (roll their attacks yourself conceptually, the system handles mechanics)
6. Track HP and announce when enemies fall

## Player Character Info
The player's character sheet will be provided. Reference their abilities, class features, and equipment naturally in the narrative.

## Style Guidelines
- Use second person ("You see...", "You feel...")
- Keep responses 2-4 paragraphs for exploration, shorter in combat
- End with a question or clear prompt for action
- Be generous with XP and loot for heroic play
- Create memorable moments

## Starting the Adventure
Begin at a location from the shared world (like the Crossroads Inn or Silverdale). Reference recent world events. Draw the player in with a hook connected to the world.

Remember: This is a LIVING WORLD. Other heroes exist. Their deeds matter. Create continuity and connection.`;

export class AIDungeonMaster {
  private client: Anthropic;
  private gameState: GameState;
  private storyState: StoryState;
  private model = 'claude-sonnet-4-20250514';
  private systemPrompt: string;
  private adventureTheme: string = 'adventure';

  constructor(apiKey: string, character: Character, theme?: string) {
    this.client = new Anthropic({ apiKey });
    this.gameState = this.initializeGameState(character);
    this.adventureTheme = theme || 'adventure';

    // Load or create story state
    const existingStory = loadStoryState(character.id);
    this.storyState = existingStory || createEmptyStoryState(
      character.id,
      character.name,
      this.adventureTheme
    );

    this.systemPrompt = this.buildSystemPrompt();
  }

  private buildSystemPrompt(): string {
    const worldContext = getWorldContextForAI();
    const storyContext = getStoryContextForAI(this.storyState);
    return `${BASE_SYSTEM_PROMPT}\n\n${worldContext}\n\n${storyContext}`;
  }

  private initializeGameState(character: Character): GameState {
    return {
      character,
      currentHP: character.maxHitPoints,
      maxHP: character.maxHitPoints,
      location: 'Unknown',
      inCombat: false,
      enemies: [],
      inventory: [],
      gold: character.currency.gp,
      questLog: [],
      flags: new Set(),
      turnCount: 0,
      messageHistory: [],
    };
  }

  getGameState(): GameState {
    return this.gameState;
  }

  restoreState(savedState: {
    currentHP: number;
    gold: number;
    inventory: string[];
    questLog: string[];
    flags: Set<string>;
    turnCount: number;
    messageHistory: ConversationMessage[];
    location: string;
  }): void {
    this.gameState.currentHP = savedState.currentHP;
    this.gameState.gold = savedState.gold;
    this.gameState.inventory = savedState.inventory;
    this.gameState.questLog = savedState.questLog;
    this.gameState.flags = savedState.flags;
    this.gameState.turnCount = savedState.turnCount;
    this.gameState.messageHistory = savedState.messageHistory;
    this.gameState.location = savedState.location;
  }

  private buildCharacterSummary(): string {
    const char = this.gameState.character;
    const mods = {
      str: getAbilityModifier(char.abilityScores.strength),
      dex: getAbilityModifier(char.abilityScores.dexterity),
      con: getAbilityModifier(char.abilityScores.constitution),
      int: getAbilityModifier(char.abilityScores.intelligence),
      wis: getAbilityModifier(char.abilityScores.wisdom),
      cha: getAbilityModifier(char.abilityScores.charisma),
    };

    return `
## Player Character: ${char.name}
- **Race:** ${char.race.raceId}
- **Class:** ${char.class.classId} (Level ${char.level})
- **HP:** ${this.gameState.currentHP}/${this.gameState.maxHP}
- **AC:** ${char.armorClass}
- **Speed:** ${char.speed} ft

### Ability Scores
- STR: ${char.abilityScores.strength} (${formatModifier(mods.str)})
- DEX: ${char.abilityScores.dexterity} (${formatModifier(mods.dex)})
- CON: ${char.abilityScores.constitution} (${formatModifier(mods.con)})
- INT: ${char.abilityScores.intelligence} (${formatModifier(mods.int)})
- WIS: ${char.abilityScores.wisdom} (${formatModifier(mods.wis)})
- CHA: ${char.abilityScores.charisma} (${formatModifier(mods.cha)})

### Proficiencies
- **Skills:** ${char.skillProficiencies.join(', ') || 'None'}
- **Saves:** ${char.savingThrowProficiencies.join(', ')}

### Class Features
${char.classFeatures.map(f => `- ${f.name}`).join('\n')}

### Equipment
- Main weapon equipped
- ${char.background.name} background
- Gold: ${this.gameState.gold} gp
`;
  }

  private parseRollRequest(text: string): { type: string; modifier: number; dc: number } | null {
    const match = text.match(/\[ROLL:\s*([^|]+)\s*\|\s*([+-]?\d+)\s*\|\s*(\d+)\s*\]/i);
    if (!match) return null;

    return {
      type: match[1].trim(),
      modifier: parseInt(match[2], 10),
      dc: parseInt(match[3], 10),
    };
  }

  private parseDamageRequest(text: string): string | null {
    const match = text.match(/\[DAMAGE:\s*([^\]]+)\s*\]/i);
    if (!match) return null;

    // Extract just the dice notation from complex strings
    // AI might generate: "2d8+3 (doubled for critical) + 1d4 radiant = 18 total"
    // We want to extract clean dice notations like "2d8+3" and "1d4"
    const content = match[1].trim();

    // Find all dice notations in the string
    const dicePattern = /(\d+)?d(\d+)([+-]\d+)?/gi;
    const diceMatches = content.match(dicePattern);

    if (diceMatches && diceMatches.length > 0) {
      // Return the first valid dice notation
      return diceMatches[0];
    }

    return null;
  }

  private parseHealRequest(text: string): string | null {
    const match = text.match(/\[HEAL:\s*([^\]]+)\s*\]/i);
    if (!match) return null;

    const content = match[1].trim();

    // Extract clean dice notation
    const dicePattern = /(\d+)?d(\d+)([+-]\d+)?/gi;
    const diceMatches = content.match(dicePattern);

    if (diceMatches && diceMatches.length > 0) {
      return diceMatches[0];
    }

    // Check if it's just a number
    const numMatch = content.match(/^(\d+)$/);
    if (numMatch) {
      return numMatch[1];
    }

    return null;
  }

  private performRoll(type: string, modifier: number, dc: number): DiceResult {
    const diceRoll = roll('1d20');
    const total = diceRoll.total + modifier;
    const success = total >= dc;

    return {
      type,
      roll: diceRoll.rolls[0],
      modifier,
      total,
      dc,
      success,
    };
  }

  private performDamage(dice: string): { roll: number; damage: number } {
    try {
      const result = roll(dice);
      return { roll: result.total, damage: result.total };
    } catch (error) {
      // If parsing fails, return a reasonable default damage
      console.error(`Failed to parse damage dice: ${dice}`);
      const fallbackDamage = Math.floor(Math.random() * 8) + 1; // 1d8 fallback
      return { roll: fallbackDamage, damage: fallbackDamage };
    }
  }

  private performHeal(dice: string): number {
    try {
      let healAmount: number;

      // Check if it's just a number
      if (/^\d+$/.test(dice)) {
        healAmount = parseInt(dice, 10);
      } else {
        const result = roll(dice);
        healAmount = result.total;
      }

      const healed = Math.min(healAmount, this.gameState.maxHP - this.gameState.currentHP);
      this.gameState.currentHP += healed;
      return healed;
    } catch (error) {
      console.error(`Failed to parse heal dice: ${dice}`);
      const fallbackHeal = Math.floor(Math.random() * 4) + 1; // 1d4 fallback
      const healed = Math.min(fallbackHeal, this.gameState.maxHP - this.gameState.currentHP);
      this.gameState.currentHP += healed;
      return healed;
    }
  }

  private parseGoldChanges(text: string): number[] {
    const changes: number[] = [];
    const regex = /\[GOLD:\s*([+-]?\d+)\s*\]/gi;
    let match;

    while ((match = regex.exec(text)) !== null) {
      changes.push(parseInt(match[1], 10));
    }

    return changes;
  }

  private parseXPGains(text: string): number[] {
    const gains: number[] = [];
    const regex = /\[XP:\s*(\d+)\s*\]/gi;
    let match;

    while ((match = regex.exec(text)) !== null) {
      gains.push(parseInt(match[1], 10));
    }

    return gains;
  }

  private applyGoldChange(amount: number): string {
    const before = this.gameState.gold;
    this.gameState.gold = Math.max(0, this.gameState.gold + amount);
    const after = this.gameState.gold;

    if (amount > 0) {
      return `**+${amount} gold!** (${before} → ${after})`;
    } else {
      return `**${amount} gold** (${before} → ${after})`;
    }
  }

  private applyXPGain(amount: number): { text: string; leveledUp: boolean; newLevel?: number } {
    const char = this.gameState.character;
    const before = char.experiencePoints;
    char.experiencePoints += amount;

    // D&D 5e level thresholds
    const xpThresholds = [
      0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000,
      85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
    ];

    // Check for level up
    const oldLevel = char.level;
    let newLevel = oldLevel;

    for (let i = xpThresholds.length - 1; i >= 0; i--) {
      if (char.experiencePoints >= xpThresholds[i]) {
        newLevel = i + 1;
        break;
      }
    }

    if (newLevel > oldLevel) {
      char.level = newLevel;
      // Increase HP on level up (simplified: add average hit die + CON mod)
      const conMod = Math.floor((char.abilityScores.constitution - 10) / 2);
      const hitDieAvg = Math.floor(char.class.hitDie / 2) + 1;
      const hpGain = hitDieAvg + conMod;
      char.maxHitPoints += hpGain;
      this.gameState.maxHP = char.maxHitPoints;
      this.gameState.currentHP = char.maxHitPoints; // Full heal on level up

      return {
        text: `**+${amount} XP!** (${before} → ${char.experiencePoints})`,
        leveledUp: true,
        newLevel: newLevel,
      };
    }

    return {
      text: `**+${amount} XP!** (${before} → ${char.experiencePoints})`,
      leveledUp: false,
    };
  }

  async startAdventure(theme?: string): Promise<string> {
    const startPrompt = theme
      ? `Begin a ${theme} themed adventure for this character.`
      : `Begin an exciting adventure for this character. Choose an interesting setting and hook.`;

    return this.chat(startPrompt, true);
  }

  async chat(playerInput: string, isStart: boolean = false): Promise<string> {
    // Add player message to history
    if (!isStart) {
      this.gameState.messageHistory.push({
        role: 'user',
        content: playerInput,
      });
    }

    // Build messages array
    const messages: Anthropic.MessageParam[] = this.gameState.messageHistory.map(m => ({
      role: m.role,
      content: m.content,
    }));

    // Add current player input
    messages.push({
      role: 'user',
      content: isStart
        ? `${this.buildCharacterSummary()}\n\n${playerInput}`
        : playerInput,
    });

    // Call Claude
    let response = await this.client.messages.create({
      model: this.model,
      max_tokens: 1024,
      system: this.systemPrompt,
      messages,
    });

    let aiResponse = response.content[0].type === 'text' ? response.content[0].text : '';

    // Process any roll requests
    let rollRequest = this.parseRollRequest(aiResponse);
    while (rollRequest) {
      const result = this.performRoll(rollRequest.type, rollRequest.modifier, rollRequest.dc);

      const rollResultText = `\n\n🎲 **${result.type} Check:** Rolled ${result.roll} ${formatModifier(result.modifier)} = **${result.total}** vs DC ${result.dc} — ${result.success ? '✅ SUCCESS!' : '❌ FAILURE'}`;

      // Ask AI to continue based on the roll result
      messages.push({ role: 'assistant', content: aiResponse });
      messages.push({
        role: 'user',
        content: `[ROLL RESULT: ${result.type} - Rolled ${result.roll}, modifier ${formatModifier(result.modifier)}, total ${result.total} vs DC ${result.dc} = ${result.success ? 'SUCCESS' : 'FAILURE'}. Continue narrating the outcome.]`
      });

      response = await this.client.messages.create({
        model: this.model,
        max_tokens: 1024,
        system: this.systemPrompt,
        messages,
      });

      const continuation = response.content[0].type === 'text' ? response.content[0].text : '';
      aiResponse = aiResponse.replace(/\[ROLL:[^\]]+\]/i, rollResultText) + '\n\n' + continuation;

      rollRequest = this.parseRollRequest(continuation);
    }

    // Process damage
    const damageRequest = this.parseDamageRequest(aiResponse);
    if (damageRequest) {
      const { damage } = this.performDamage(damageRequest);
      aiResponse = aiResponse.replace(/\[DAMAGE:[^\]]+\]/i, `**${damage} damage!**`);
    }

    // Process healing
    const healRequest = this.parseHealRequest(aiResponse);
    if (healRequest) {
      const healed = this.performHeal(healRequest);
      aiResponse = aiResponse.replace(/\[HEAL:[^\]]+\]/i, `**Healed ${healed} HP!** (Now at ${this.gameState.currentHP}/${this.gameState.maxHP})`);
    }

    // Process gold changes
    const goldChanges = this.parseGoldChanges(aiResponse);
    for (const change of goldChanges) {
      const goldText = this.applyGoldChange(change);
      aiResponse = aiResponse.replace(/\[GOLD:\s*[+-]?\d+\s*\]/i, `💰 ${goldText}`);
    }

    // Process XP gains
    const xpGains = this.parseXPGains(aiResponse);
    let levelUpMessage = '';
    for (const xp of xpGains) {
      const result = this.applyXPGain(xp);
      aiResponse = aiResponse.replace(/\[XP:\s*\d+\s*\]/i, `✨ ${result.text}`);
      if (result.leveledUp && result.newLevel) {
        levelUpMessage = `\n\n🎉 **LEVEL UP!** You are now level ${result.newLevel}! Your HP has been fully restored!\n`;
      }
    }

    // Append level up message if applicable
    if (levelUpMessage) {
      aiResponse += levelUpMessage;
    }

    // Process world events - record them to the shared world state
    const worldEvents = this.parseWorldEvents(aiResponse);
    for (const event of worldEvents) {
      this.recordWorldEvent(event.title, event.description, event.impact);
      // Remove the tag from the response (player doesn't need to see it)
      aiResponse = aiResponse.replace(/\[WORLD_EVENT:[^\]]+\]/gi, '');
    }

    // Process story state updates - parse tags and update persistent story state
    const storyUpdates = parseStoryUpdates(aiResponse, this.storyState.currentTurn + 1);
    this.storyState = mergeStoryUpdates(this.storyState, storyUpdates);
    this.storyState.currentTurn++;
    saveStoryState(this.storyState);

    // Refresh system prompt with updated story context for next turn
    this.systemPrompt = this.buildSystemPrompt();

    // Clean story tags from display text
    const cleanedResponse = cleanStoryTags(aiResponse);

    // Store cleaned AI response in history
    this.gameState.messageHistory.push({
      role: 'assistant',
      content: cleanedResponse,
    });

    this.gameState.turnCount++;
    return cleanedResponse;
  }

  private parseWorldEvents(text: string): { title: string; description: string; impact: 'minor' | 'significant' | 'major' }[] {
    const events: { title: string; description: string; impact: 'minor' | 'significant' | 'major' }[] = [];
    const regex = /\[WORLD_EVENT:\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*(minor|significant|major)\s*\]/gi;
    let match;

    while ((match = regex.exec(text)) !== null) {
      events.push({
        title: match[1].trim(),
        description: match[2].trim(),
        impact: match[3].trim().toLowerCase() as 'minor' | 'significant' | 'major',
      });
    }

    return events;
  }

  private recordWorldEvent(title: string, description: string, impact: 'minor' | 'significant' | 'major'): void {
    // Import dynamically to avoid circular deps, or use the already imported function
    const { addWorldEvent } = require('../data/world-state.js');
    const char = this.gameState.character;

    addWorldEvent(
      char.id,
      char.name,
      title,
      description,
      this.gameState.location || 'Unknown',
      impact
    );
  }

  takeDamage(amount: number): { newHP: number; unconscious: boolean } {
    this.gameState.currentHP = Math.max(0, this.gameState.currentHP - amount);
    return {
      newHP: this.gameState.currentHP,
      unconscious: this.gameState.currentHP === 0,
    };
  }

  heal(amount: number): number {
    const before = this.gameState.currentHP;
    this.gameState.currentHP = Math.min(this.gameState.maxHP, this.gameState.currentHP + amount);
    return this.gameState.currentHP - before;
  }

  addGold(amount: number): void {
    this.gameState.gold += amount;
  }

  addToInventory(item: string): void {
    this.gameState.inventory.push(item);
  }

  addQuest(quest: string): void {
    this.gameState.questLog.push(quest);
  }

  setFlag(flag: string): void {
    this.gameState.flags.add(flag);
  }

  hasFlag(flag: string): boolean {
    return this.gameState.flags.has(flag);
  }

  getStatus(): string {
    return `HP: ${this.gameState.currentHP}/${this.gameState.maxHP} | Gold: ${this.gameState.gold} | Turn: ${this.gameState.turnCount}`;
  }

  getStoryState(): StoryState {
    return this.storyState;
  }

  getStorySummary(): string {
    const s = this.storyState;
    let summary = `\n═══ STORY SUMMARY ═══\n`;
    summary += `Adventure: ${s.adventureTheme}\n`;
    summary += `Turn: ${s.currentTurn}\n\n`;

    if (s.currentSituation) {
      summary += `📍 Current Situation:\n${s.currentSituation}\n\n`;
    }

    if (s.immediateGoal) {
      summary += `🎯 Immediate Goal:\n${s.immediateGoal}\n\n`;
    }

    const activeQuests = s.quests.filter(q => q.status === 'active');
    if (activeQuests.length > 0) {
      summary += `📜 Active Quests:\n`;
      for (const quest of activeQuests) {
        summary += `  • ${quest.name}\n`;
        const incomplete = quest.objectives.filter(o => !o.completed);
        for (const obj of incomplete) {
          summary += `    [ ] ${obj.description}\n`;
        }
      }
      summary += '\n';
    }

    const livingNPCs = s.npcs.filter(n => n.status !== 'dead');
    const deadNPCs = s.npcs.filter(n => n.status === 'dead');
    if (livingNPCs.length > 0) {
      summary += `👥 Known NPCs:\n`;
      for (const npc of livingNPCs) {
        summary += `  • ${npc.name} (${npc.role}) - ${npc.status}\n`;
      }
      summary += '\n';
    }
    if (deadNPCs.length > 0) {
      summary += `💀 Fallen:\n`;
      for (const npc of deadNPCs) {
        summary += `  • ${npc.name} (${npc.role})\n`;
      }
      summary += '\n';
    }

    if (s.locations.length > 0) {
      summary += `🗺️ Known Locations:\n`;
      for (const loc of s.locations) {
        summary += `  • ${loc.name} (${loc.type}) - ${loc.status}\n`;
      }
      summary += '\n';
    }

    if (s.importantItems.length > 0) {
      summary += `🔑 Story Items:\n`;
      for (const item of s.importantItems) {
        summary += `  • ${item.name}: ${item.significance}\n`;
      }
      summary += '\n';
    }

    if (s.activeThreats.length > 0) {
      summary += `⚠️ Active Threats:\n`;
      for (const threat of s.activeThreats) {
        summary += `  • ${threat}\n`;
      }
      summary += '\n';
    }

    const majorDiscoveries = s.discoveries.filter(d => d.importance === 'major' || d.importance === 'critical');
    if (majorDiscoveries.length > 0) {
      summary += `🔍 Key Discoveries:\n`;
      for (const disc of majorDiscoveries) {
        summary += `  • ${disc.title}: ${disc.content}\n`;
      }
    }

    return summary;
  }
}

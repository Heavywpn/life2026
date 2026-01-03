/**
 * Main game loop for AI-driven D&D adventure
 */

import * as readline from 'readline';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
import { AIDungeonMaster } from './ai-dungeon-master.js';
import type { Character } from '../models/character.types.js';
import type { InventoryItem, Trophy } from '../models/item.types.js';
import { showWelcomeBanner, hpBar, colors } from '../ui/display.js';
import { getSaveManager, type AdventureSession } from '../data/save-manager.js';

let rl: readline.Interface | null = null;

// Session tracking for rewards
interface SessionStats {
  startTime: number;
  goldEarned: number;
  xpEarned: number;
  itemsFound: InventoryItem[];
  monstersDefeated: number;
  adventureTheme: string;
}

function createReadline(): readline.Interface {
  if (rl) {
    rl.close();
  }
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return rl;
}

function prompt(question: string): Promise<string> {
  if (!rl) {
    rl = createReadline();
  }
  return new Promise((resolve) => {
    rl!.question(question, (answer) => {
      resolve(answer);
    });
  });
}

function displayStatus(dm: AIDungeonMaster): void {
  const state = dm.getGameState();
  const char = state.character;
  const hpDisplay = hpBar(state.currentHP, state.maxHP, 15);
  console.log();
  console.log(chalk.gray('─'.repeat(60)));
  console.log(
    `${chalk.bold(char.name)} (Lvl ${chalk.cyan(char.level)}) | ` +
    `HP: ${hpDisplay} ${state.currentHP}/${state.maxHP} | ` +
    `Gold: ${chalk.yellow(state.gold)} | ` +
    `XP: ${chalk.magenta(char.experiencePoints)}`
  );
  console.log(chalk.gray('─'.repeat(60)));
}

function formatAIResponse(text: string): string {
  // Add some formatting to AI responses
  return text
    // Bold text between **
    .replace(/\*\*([^*]+)\*\*/g, chalk.bold('$1'))
    // Italic text between *
    .replace(/\*([^*]+)\*/g, chalk.italic('$1'))
    // Dice results
    .replace(/🎲/g, chalk.yellow('🎲'))
    // Success/failure markers
    .replace(/✅/g, chalk.green('✅'))
    .replace(/❌/g, chalk.red('❌'));
}

function wordWrap(text: string, width: number = 80): string {
  const paragraphs = text.split('\n\n');
  return paragraphs.map(paragraph => {
    const words = paragraph.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      // Account for ANSI codes in length calculation
      const strippedLine = currentLine.replace(/\x1b\[[0-9;]*m/g, '');
      const strippedWord = word.replace(/\x1b\[[0-9;]*m/g, '');

      if (strippedLine.length + strippedWord.length + 1 > width) {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = currentLine ? `${currentLine} ${word}` : word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines.join('\n');
  }).join('\n\n');
}

function saveCharacterProgress(
  character: Character,
  dm: AIDungeonMaster,
  session: SessionStats,
  completed: boolean
): void {
  const saveManager = getSaveManager();
  const state = dm.getGameState();

  // Update character with session results
  character.currentHitPoints = state.currentHP;
  character.currency.gp = state.gold;

  // Add session play time
  const sessionTime = Math.floor((Date.now() - session.startTime) / 1000);
  character.totalPlayTime = (character.totalPlayTime || 0) + sessionTime;

  // Update campaign stats
  character.campaignsCompleted = (character.campaignsCompleted || 0) + (completed ? 1 : 0);
  character.totalGoldEarned = (character.totalGoldEarned || 0) + session.goldEarned;
  character.totalMonstersDefeated = (character.totalMonstersDefeated || 0) + session.monstersDefeated;

  // Add experience from session
  character.experiencePoints += session.xpEarned;

  // Add any items found to inventory
  for (const item of session.itemsFound) {
    const existing = character.inventory.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      character.inventory.push(item);
    }
  }

  // Add adventure completion trophy if completed
  if (completed && character.base) {
    const trophy: Trophy = {
      id: uuidv4(),
      name: `${session.adventureTheme} Survivor`,
      description: `Completed a ${session.adventureTheme} adventure`,
      campaignName: session.adventureTheme,
      obtainedAt: new Date().toISOString(),
    };
    character.base.trophies.push(trophy);
  }

  character.updatedAt = new Date().toISOString();

  // Save to disk
  saveManager.saveCharacter(character);
}

function saveAdventureSession(
  character: Character,
  dm: AIDungeonMaster,
  session: SessionStats
): void {
  const saveManager = getSaveManager();
  const state = dm.getGameState();

  const adventureSession: AdventureSession = {
    version: '1.0.0',
    savedAt: new Date().toISOString(),
    sessionId: `${character.id}-adventure`,
    characterId: character.id,
    characterName: character.name,
    adventureTheme: session.adventureTheme,
    turnCount: state.turnCount,
    currentHP: state.currentHP,
    maxHP: state.maxHP,
    gold: state.gold,
    inventory: state.inventory,
    questLog: state.questLog,
    flags: Array.from(state.flags),
    messageHistory: state.messageHistory,
    location: state.location,
  };

  saveManager.saveAdventureSession(adventureSession);
}

export async function runGame(
  character: Character,
  apiKey: string,
  continueSession?: AdventureSession
): Promise<void> {
  console.clear();
  showWelcomeBanner();

  // Create readline interface fresh (after Inquirer prompts are done)
  createReadline();

  console.log(chalk.cyan('\n  Initializing AI Dungeon Master...\n'));

  const dm = new AIDungeonMaster(apiKey, character);

  // Initialize session tracking
  const session: SessionStats = {
    startTime: Date.now(),
    goldEarned: 0,
    xpEarned: 0,
    itemsFound: [],
    monstersDefeated: 0,
    adventureTheme: continueSession?.adventureTheme || 'adventure',
  };

  const startingGold = character.currency.gp;

  let adventureCompleted = false;

  try {
    // Check if we're continuing a saved session
    if (continueSession) {
      console.log(chalk.green(`\n  ═══ CONTINUING ADVENTURE ═══\n`));
      console.log(chalk.gray(`  Theme: ${continueSession.adventureTheme}`));
      console.log(chalk.gray(`  Turn: ${continueSession.turnCount}`));
      console.log(chalk.gray('─'.repeat(60)));

      // Restore game state
      dm.restoreState({
        currentHP: continueSession.currentHP,
        gold: continueSession.gold,
        inventory: continueSession.inventory,
        questLog: continueSession.questLog,
        flags: new Set(continueSession.flags),
        turnCount: continueSession.turnCount,
        messageHistory: continueSession.messageHistory,
        location: continueSession.location,
      });

      // Show last few messages for context
      const lastMessages = continueSession.messageHistory.slice(-2);
      if (lastMessages.length > 0) {
        console.log(chalk.cyan('\n  Last in your adventure:\n'));
        for (const msg of lastMessages) {
          if (msg.role === 'assistant') {
            console.log(wordWrap(formatAIResponse(msg.content.slice(0, 500))) + '\n');
          }
        }
      }
    } else {
      // Ask for adventure theme for new games
      console.log(chalk.white('  What kind of adventure calls to you?\n'));
      console.log(chalk.gray('  Examples: dark fantasy, high adventure, mystery, horror,'));
      console.log(chalk.gray('  pirates, underdark, dragon hunting, political intrigue'));
      console.log(chalk.gray('  Or press Enter for a surprise!\n'));

      const theme = await prompt(chalk.yellow('  ⚔️  Adventure theme: '));
      session.adventureTheme = theme || 'mysterious adventure';

      console.log(chalk.cyan('\n  The Dungeon Master prepares your tale...\n'));
      console.log(chalk.gray('─'.repeat(60)));

      // Start the adventure
      const opening = await dm.startAdventure(theme || undefined);
      console.log('\n' + wordWrap(formatAIResponse(opening)) + '\n');
    }

    // Main game loop
    while (true) {
      displayStatus(dm);

      const input = await prompt(chalk.green('\n  What do you do? ') + chalk.gray('(or "help" for commands)\n  > '));

      if (!input.trim()) continue;

      const command = input.toLowerCase().trim();

      // Handle special commands
      if (command === 'quit' || command === 'exit' || command === 'q') {
        // Calculate session rewards before quitting
        const state = dm.getGameState();
        session.goldEarned = Math.max(0, state.gold - startingGold);
        session.xpEarned = state.turnCount * 10; // Simple XP: 10 per turn

        console.log(chalk.yellow('\n  ═══ ADVENTURE PAUSED ═══\n'));
        console.log(chalk.cyan('  Session Summary:'));
        console.log(`    Time played: ${Math.floor((Date.now() - session.startTime) / 60000)} minutes`);
        console.log(`    Turns taken: ${state.turnCount}`);
        console.log(`    Gold earned: ${session.goldEarned} gp`);
        console.log(`    XP earned: ${session.xpEarned}`);
        console.log();

        // Save character progress and adventure session
        if (character.id && !character.id.startsWith('quick-')) {
          saveCharacterProgress(character, dm, session, adventureCompleted);
          saveAdventureSession(character, dm, session);
          console.log(chalk.green('  Character and adventure progress saved!'));
          console.log(chalk.gray('  You can continue this adventure next time.\n'));
        }

        console.log(chalk.gray('  Your tale will continue another day...\n'));
        break;
      }

      if (command === 'save') {
        const state = dm.getGameState();
        session.goldEarned = Math.max(0, state.gold - startingGold);
        session.xpEarned = state.turnCount * 10;

        if (character.id && !character.id.startsWith('quick-')) {
          saveCharacterProgress(character, dm, session, false);
          saveAdventureSession(character, dm, session);
          console.log(chalk.green('\n  Game and adventure saved!\n'));
        } else {
          console.log(chalk.yellow('\n  Quick-start characters cannot be saved.'));
          console.log(chalk.gray('  Create a character with "dnd new-character" for persistence.\n'));
        }
        continue;
      }

      if (command === 'help') {
        showHelp();
        continue;
      }

      if (command === 'status' || command === 'stats') {
        showDetailedStatus(dm);
        continue;
      }

      if (command === 'inventory' || command === 'inv' || command === 'i') {
        showInventory(dm, character);
        continue;
      }

      if (command === 'quests' || command === 'journal') {
        showQuests(dm);
        continue;
      }

      if (command === 'story') {
        showStorySummary(dm);
        continue;
      }

      if (command === 'character' || command === 'char' || command === 'c') {
        showCharacterSheet(character, dm);
        continue;
      }

      // Check for victory/completion in player input
      if (command.includes('complete') || command.includes('victory') || command.includes('finish')) {
        adventureCompleted = true;
      }

      // Send to AI DM
      console.log(chalk.gray('\n  The DM considers your action...\n'));

      try {
        const response = await dm.chat(input);
        console.log(wordWrap(formatAIResponse(response)) + '\n');

        // Check for combat victory in response
        const lowerResponse = response.toLowerCase();
        if (lowerResponse.includes('defeated') || lowerResponse.includes('slain') ||
            lowerResponse.includes('falls dead') || lowerResponse.includes('victory')) {
          session.monstersDefeated++;
        }

        // Check for loot in response
        if (lowerResponse.includes('gold') && lowerResponse.includes('find')) {
          // AI mentioned finding gold - state will track this
        }

        // Check for unconsciousness
        const state = dm.getGameState();
        if (state.currentHP <= 0) {
          console.log(chalk.red.bold('\n  ═══ YOU HAVE FALLEN UNCONSCIOUS ═══\n'));
          console.log(chalk.yellow('  Your adventure ends here... for now.\n'));

          // Save even on defeat
          session.goldEarned = Math.max(0, state.gold - startingGold);
          session.xpEarned = Math.max(10, state.turnCount * 5); // Less XP for defeat

          if (character.id && !character.id.startsWith('quick-')) {
            // Restore to half HP for next adventure
            character.currentHitPoints = Math.floor(character.maxHitPoints / 2);
            saveCharacterProgress(character, dm, session, false);
            console.log(chalk.gray('  You wake up at your base, wounded but alive...\n'));
          }
          break;
        }

        // Check for adventure completion
        if (lowerResponse.includes('adventure complete') ||
            lowerResponse.includes('quest complete') ||
            lowerResponse.includes('triumphant return')) {
          adventureCompleted = true;
          session.xpEarned += 100; // Bonus XP for completion
          console.log(chalk.green.bold('\n  ═══ ADVENTURE COMPLETE! ═══\n'));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(chalk.red(`\n  Error: ${error.message}\n`));
          if (error.message.includes('API')) {
            console.log(chalk.yellow('  Check your ANTHROPIC_API_KEY in .env\n'));
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(chalk.red(`\n  Failed to start adventure: ${error.message}\n`));
    }
  }

  if (rl) {
    rl.close();
    rl = null;
  }
}

function showHelp(): void {
  console.log(chalk.cyan('\n  ═══ COMMANDS ═══\n'));
  console.log('  ' + chalk.yellow('help') + '       - Show this help');
  console.log('  ' + chalk.yellow('status') + '     - Show detailed character status');
  console.log('  ' + chalk.yellow('character') + '  - Show full character sheet');
  console.log('  ' + chalk.yellow('inventory') + '  - Show your inventory');
  console.log('  ' + chalk.yellow('quests') + '     - Show your quest log');
  console.log('  ' + chalk.yellow('story') + '      - Show story summary (NPCs, locations, discoveries)');
  console.log('  ' + chalk.yellow('save') + '       - Save your progress');
  console.log('  ' + chalk.yellow('quit') + '       - Save and exit the game\n');
  console.log(chalk.gray('  Otherwise, just type what you want to do!'));
  console.log(chalk.gray('  Examples:'));
  console.log(chalk.gray('    "I search the room for traps"'));
  console.log(chalk.gray('    "I attack the goblin with my sword"'));
  console.log(chalk.gray('    "I try to persuade the guard to let us pass"'));
  console.log(chalk.gray('    "I cast fireball at the group of enemies"\n'));
}

function showStorySummary(dm: AIDungeonMaster): void {
  console.log(chalk.cyan(dm.getStorySummary()));
}

function showDetailedStatus(dm: AIDungeonMaster): void {
  const state = dm.getGameState();
  const char = state.character;

  // D&D 5e XP thresholds for level display
  const xpThresholds = [
    0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000,
    85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
  ];
  const currentXP = char.experiencePoints;
  const nextLevelXP = char.level < 20 ? xpThresholds[char.level] : xpThresholds[19];
  const currentLevelXP = xpThresholds[char.level - 1] || 0;
  const xpProgress = char.level < 20
    ? Math.floor(((currentXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100)
    : 100;

  console.log(chalk.cyan('\n  ═══ CHARACTER STATUS ═══\n'));
  console.log(`  ${chalk.bold(char.name)}`);
  console.log(`  Level ${chalk.cyan(char.level)} ${char.race.raceId} ${char.class.classId}`);
  console.log();
  console.log(`  HP: ${hpBar(state.currentHP, state.maxHP, 20)} ${state.currentHP}/${state.maxHP}`);
  console.log(`  AC: ${char.armorClass}  |  Speed: ${char.speed} ft`);
  console.log();
  console.log(`  XP: ${chalk.magenta(currentXP)} / ${nextLevelXP} (${xpProgress}% to next level)`);
  console.log(`  Gold: ${chalk.yellow(state.gold + ' gp')}`);
  console.log(`  Turn: ${state.turnCount}`);
  console.log();
}

function showInventory(dm: AIDungeonMaster, character: Character): void {
  const state = dm.getGameState();

  console.log(chalk.cyan('\n  ═══ INVENTORY ═══\n'));

  // Show equipped items from character
  console.log(chalk.yellow('  Equipped:'));
  character.inventory.filter(i => i.equipped).forEach(item => {
    console.log(`    [E] ${item.name}`);
  });
  console.log();

  // Show other items
  console.log(chalk.yellow('  Backpack:'));
  const unequipped = character.inventory.filter(i => !i.equipped);
  if (unequipped.length === 0 && state.inventory.length === 0) {
    console.log(chalk.gray('    (Empty)'));
  } else {
    unequipped.forEach(item => {
      console.log(`    - ${item.name} x${item.quantity}`);
    });
    // Also show any items tracked by the DM
    state.inventory.forEach((item) => {
      console.log(`    - ${item}`);
    });
  }
  console.log();

  console.log(`  Gold: ${chalk.yellow(state.gold + ' gp')}\n`);
}

function showQuests(dm: AIDungeonMaster): void {
  const state = dm.getGameState();

  console.log(chalk.cyan('\n  ═══ QUEST LOG ═══\n'));

  if (state.questLog.length === 0) {
    console.log(chalk.gray('  No active quests.\n'));
  } else {
    state.questLog.forEach((quest, i) => {
      console.log(`  ${chalk.yellow('◆')} ${quest}`);
    });
    console.log();
  }
}

function showCharacterSheet(character: Character, dm: AIDungeonMaster): void {
  const state = dm.getGameState();

  console.log(chalk.cyan('\n  ═══ CHARACTER SHEET ═══\n'));
  console.log(`  ${chalk.bold(character.name)}`);
  console.log(`  Level ${character.level} ${character.race.raceId} ${character.class.classId}`);
  console.log(`  ${character.background.name} Background`);
  console.log();

  console.log(chalk.yellow('  Ability Scores:'));
  const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;
  const abbrev = { strength: 'STR', dexterity: 'DEX', constitution: 'CON', intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA' };
  for (const ability of abilities) {
    const score = character.abilityScores[ability];
    const mod = Math.floor((score - 10) / 2);
    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
    console.log(`    ${abbrev[ability]}: ${score} (${modStr})`);
  }
  console.log();

  console.log(chalk.yellow('  Combat:'));
  console.log(`    HP: ${state.currentHP}/${state.maxHP}`);
  console.log(`    AC: ${character.armorClass}`);
  console.log(`    Speed: ${character.speed} ft`);
  console.log(`    Proficiency Bonus: +${character.proficiencyBonus}`);
  console.log();

  console.log(chalk.yellow('  Proficiencies:'));
  console.log(`    Skills: ${character.skillProficiencies.join(', ')}`);
  console.log(`    Saves: ${character.savingThrowProficiencies.join(', ')}`);
  console.log();

  console.log(chalk.yellow('  Features:'));
  character.classFeatures.forEach(f => {
    console.log(`    - ${f.name}`);
  });
  console.log();

  if (character.campaignsCompleted) {
    console.log(chalk.yellow('  Career Stats:'));
    console.log(`    Campaigns: ${character.campaignsCompleted}`);
    console.log(`    XP: ${character.experiencePoints}`);
    console.log(`    Monsters Defeated: ${character.totalMonstersDefeated || 0}`);
    console.log(`    Total Gold Earned: ${character.totalGoldEarned || 0}`);
    console.log();
  }
}

// Keep quickStart for backwards compatibility but mark as deprecated
export async function quickStart(apiKey: string): Promise<void> {
  // Create a quick character for immediate play
  const quickCharacter: Character = {
    id: 'quick-' + Date.now(),
    name: 'Brave Adventurer',
    level: 1,
    experiencePoints: 0,
    race: {
      raceId: 'human',
      abilityScoreIncreases: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
      traits: [],
      size: 'Medium',
      speed: 30,
      languages: ['Common'],
      proficiencies: { weapons: [], armor: [], skills: [], tools: [] },
    },
    class: {
      classId: 'fighter',
      level: 1,
      hitDie: 10,
      features: [
        { id: 'second-wind', name: 'Second Wind', description: 'Heal 1d10+level as bonus action', level: 1 },
        { id: 'fighting-style', name: 'Fighting Style: Defense', description: '+1 AC while wearing armor', level: 1 },
      ],
      proficiencies: {
        armor: ['light', 'medium', 'heavy', 'shield'],
        weapons: ['simple', 'martial'],
        tools: [],
        skills: ['athletics', 'intimidation'],
        savingThrows: ['strength', 'constitution'],
      },
    },
    abilityScores: {
      strength: 16,
      dexterity: 14,
      constitution: 15,
      intelligence: 10,
      wisdom: 12,
      charisma: 10,
    },
    maxHitPoints: 12,
    currentHitPoints: 12,
    temporaryHitPoints: 0,
    armorClass: 17,
    initiative: 2,
    speed: 30,
    proficiencyBonus: 2,
    skillProficiencies: ['athletics', 'intimidation'],
    skillExpertise: [],
    savingThrowProficiencies: ['strength', 'constitution'],
    languageProficiencies: ['Common'],
    inventory: [
      { id: 'longsword', name: 'Longsword', quantity: 1, equipped: true },
      { id: 'shield', name: 'Shield', quantity: 1, equipped: true },
      { id: 'chain-mail', name: 'Chain Mail', quantity: 1, equipped: true },
    ],
    equippedItems: {},
    currency: { cp: 0, sp: 0, ep: 0, gp: 15, pp: 0 },
    carryingCapacity: 240,
    currentWeight: 0,
    classFeatures: [
      { id: 'second-wind', name: 'Second Wind', description: 'Heal 1d10+level as bonus action', level: 1 },
      { id: 'fighting-style', name: 'Fighting Style: Defense', description: '+1 AC while wearing armor', level: 1 },
    ],
    featureUses: {},
    background: {
      id: 'soldier',
      name: 'Soldier',
      description: 'War has been your life',
      skillProficiencies: ['athletics', 'intimidation'],
      equipment: [],
      feature: { name: 'Military Rank', description: 'Soldiers recognize your authority' },
      personalityTraits: [],
      ideals: [],
      bonds: [],
      flaws: [],
    },
    personalityTraits: ['I face problems head-on'],
    ideals: ['Honor guides my actions'],
    bonds: ['I fight for those who cannot'],
    flaws: ['I am slow to trust'],
    conditions: [],
    deathSaves: { successes: 0, failures: 0 },
    exhaustionLevel: 0,
    inspiration: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalPlayTime: 0,
  };

  await runGame(quickCharacter, apiKey);
}

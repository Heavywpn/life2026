/**
 * Menu system using Inquirer.js
 */

import inquirer from 'inquirer';
import type { Ability, Skill } from '../models/common.types.js';
import type { RaceId, SubraceId } from '../models/race.types.js';
import type { ClassId } from '../models/class.types.js';
import { ABILITIES, ABILITY_ABBREVIATIONS, SKILL_NAMES } from '../models/common.types.js';

export type MainMenuChoice =
  | { type: 'new-game' }
  | { type: 'continue' }
  | { type: 'load-game' }
  | { type: 'quick-adventure' }
  | { type: 'roll-dice' }
  | { type: 'settings' }
  | { type: 'quit' };

export async function showMainMenu(): Promise<MainMenuChoice> {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Welcome, Adventurer! What would you like to do?',
      choices: [
        { name: '🤖 AI Adventure - Play with an AI Dungeon Master!', value: 'quick-adventure' },
        { name: '🆕 New Game - Create a character and start fresh', value: 'new-game' },
        { name: '📂 Continue - Resume your last adventure', value: 'continue' },
        { name: '💾 Load Game - Load a saved character', value: 'load-game' },
        { name: '🎲 Roll Dice - Test your luck', value: 'roll-dice' },
        { name: '⚙️  Settings', value: 'settings' },
        { name: '🚪 Quit', value: 'quit' },
      ],
    },
  ]);

  return { type: choice };
}

export async function promptCharacterName(): Promise<string> {
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your character\'s name?',
      validate: (input: string) => {
        if (!input.trim()) return 'Please enter a name';
        if (input.length < 2) return 'Name must be at least 2 characters';
        if (input.length > 30) return 'Name must be 30 characters or less';
        return true;
      },
    },
  ]);
  return name.trim();
}

export async function promptRaceSelection(
  races: { id: RaceId; name: string; description: string }[]
): Promise<RaceId> {
  const { race } = await inquirer.prompt([
    {
      type: 'list',
      name: 'race',
      message: 'Choose your race:',
      choices: races.map(r => ({
        name: `${r.name} - ${r.description}`,
        value: r.id,
      })),
      pageSize: 12,
    },
  ]);
  return race;
}

export async function promptSubraceSelection(
  subraces: { id: SubraceId; name: string; description?: string }[]
): Promise<SubraceId> {
  const { subrace } = await inquirer.prompt([
    {
      type: 'list',
      name: 'subrace',
      message: 'Choose your subrace:',
      choices: subraces.map(s => ({
        name: s.description ? `${s.name} - ${s.description}` : s.name,
        value: s.id,
      })),
    },
  ]);
  return subrace;
}

export async function promptClassSelection(
  classes: { id: ClassId; name: string; description: string; hitDie: number }[]
): Promise<ClassId> {
  const { classId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'classId',
      message: 'Choose your class:',
      choices: classes.map(c => ({
        name: `${c.name} (d${c.hitDie}) - ${c.description}`,
        value: c.id,
      })),
      pageSize: 12,
    },
  ]);
  return classId;
}

export async function promptAbilityScoreMethod(): Promise<'standard' | 'roll' | 'pointBuy'> {
  const { method } = await inquirer.prompt([
    {
      type: 'list',
      name: 'method',
      message: 'How would you like to generate ability scores?',
      choices: [
        { name: 'Standard Array (15, 14, 13, 12, 10, 8) - Balanced and reliable', value: 'standard' },
        { name: 'Roll 4d6 Drop Lowest - Classic and exciting!', value: 'roll' },
        { name: 'Point Buy (27 points) - Full customization', value: 'pointBuy' },
      ],
    },
  ]);
  return method;
}

export async function promptAbilityAssignment(
  scores: number[],
  abilities: Ability[] = ABILITIES
): Promise<Record<Ability, number>> {
  const result: Partial<Record<Ability, number>> = {};
  const remainingScores = [...scores];

  for (const ability of abilities) {
    const { score } = await inquirer.prompt([
      {
        type: 'list',
        name: 'score',
        message: `Assign a score to ${ABILITY_ABBREVIATIONS[ability]} (${ability}):`,
        choices: remainingScores.map(s => ({
          name: String(s),
          value: s,
        })),
      },
    ]);

    result[ability] = score;
    const index = remainingScores.indexOf(score);
    remainingScores.splice(index, 1);
  }

  return result as Record<Ability, number>;
}

export async function promptSkillSelection(
  skills: Skill[],
  count: number
): Promise<Skill[]> {
  const { selected } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selected',
      message: `Choose ${count} skill proficiencies:`,
      choices: skills.map(s => ({
        name: SKILL_NAMES[s],
        value: s,
      })),
      validate: (input: Skill[]) => {
        if (input.length !== count) {
          return `Please select exactly ${count} skills`;
        }
        return true;
      },
    },
  ]);
  return selected;
}

export async function promptBackgroundSelection(
  backgrounds: { id: string; name: string; description: string }[]
): Promise<string> {
  const { background } = await inquirer.prompt([
    {
      type: 'list',
      name: 'background',
      message: 'Choose your background:',
      choices: backgrounds.map(b => ({
        name: `${b.name} - ${b.description}`,
        value: b.id,
      })),
      pageSize: 15,
    },
  ]);
  return background;
}

export async function promptConfirm(message: string): Promise<boolean> {
  const { confirmed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message,
      default: false,
    },
  ]);
  return confirmed;
}

export async function promptDiceNotation(): Promise<string> {
  const { notation } = await inquirer.prompt([
    {
      type: 'input',
      name: 'notation',
      message: 'Enter dice notation (e.g., 2d6+4, 1d20, 4d6kh3):',
      validate: (input: string) => {
        if (!input.trim()) return 'Please enter dice notation';
        // Basic validation
        if (!/^(\d+)?d\d+/i.test(input)) {
          return 'Invalid dice notation. Examples: 2d6, 1d20+5, 4d6kh3';
        }
        return true;
      },
    },
  ]);
  return notation.trim().toLowerCase();
}

export type CombatActionChoice =
  | 'attack'
  | 'cast-spell'
  | 'dash'
  | 'disengage'
  | 'dodge'
  | 'help'
  | 'hide'
  | 'use-item'
  | 'end-turn';

export async function promptCombatAction(
  canCastSpells: boolean,
  hasItems: boolean
): Promise<CombatActionChoice> {
  const choices: { name: string; value: CombatActionChoice }[] = [
    { name: '⚔️  Attack - Strike with your weapon', value: 'attack' },
  ];

  if (canCastSpells) {
    choices.push({ name: '✨ Cast Spell - Channel magical power', value: 'cast-spell' });
  }

  choices.push(
    { name: '🏃 Dash - Double your movement', value: 'dash' },
    { name: '🛡️  Dodge - Impose disadvantage on attacks against you', value: 'dodge' },
    { name: '🤝 Help - Aid an ally\'s next attack or check', value: 'help' },
    { name: '🕳️  Hide - Attempt to conceal yourself', value: 'hide' },
    { name: '↩️  Disengage - Move without provoking opportunity attacks', value: 'disengage' },
  );

  if (hasItems) {
    choices.push({ name: '🧪 Use Item - Use an item from your inventory', value: 'use-item' });
  }

  choices.push({ name: '⏭️  End Turn - Pass your action', value: 'end-turn' });

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose your action:',
      choices,
    },
  ]);

  return action;
}

export async function promptTargetSelection(
  targets: { id: string; name: string; hp: number; maxHp: number }[]
): Promise<string> {
  const { target } = await inquirer.prompt([
    {
      type: 'list',
      name: 'target',
      message: 'Select target:',
      choices: targets.map(t => ({
        name: `${t.name} (${t.hp}/${t.maxHp} HP)`,
        value: t.id,
      })),
    },
  ]);
  return target;
}

export async function promptSpellSelection(
  spells: { id: string; name: string; level: number; description: string }[]
): Promise<string> {
  const { spell } = await inquirer.prompt([
    {
      type: 'list',
      name: 'spell',
      message: 'Choose a spell to cast:',
      choices: spells.map(s => ({
        name: `${s.name} (Level ${s.level}) - ${s.description.slice(0, 50)}...`,
        value: s.id,
      })),
      pageSize: 10,
    },
  ]);
  return spell;
}

export async function promptRoomChoice(
  choices: { id: string; text: string }[]
): Promise<string> {
  const { choice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What do you do?',
      choices: choices.map(c => ({
        name: c.text,
        value: c.id,
      })),
    },
  ]);
  return choice;
}

export async function promptSaveSlot(
  slots: { id: string; name: string; level: number; class: string; lastPlayed: string }[]
): Promise<string> {
  const choices = slots.map(s => ({
    name: `${s.name} - Level ${s.level} ${s.class} (${s.lastPlayed})`,
    value: s.id,
  }));

  const { slot } = await inquirer.prompt([
    {
      type: 'list',
      name: 'slot',
      message: 'Select a save:',
      choices,
    },
  ]);
  return slot;
}

export async function promptAnyKey(message: string = 'Press Enter to continue...'): Promise<void> {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'continue',
      message,
    },
  ]);
}

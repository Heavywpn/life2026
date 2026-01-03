/**
 * Full character creation wizard
 */

import inquirer from 'inquirer';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
import type { Character, Background } from '../models/character.types.js';
import type { SelectedRace } from '../models/race.types.js';
import type { SelectedClass, ClassFeature } from '../models/class.types.js';
import type { Ability, Skill, AbilityScores } from '../models/common.types.js';
import type { InventoryItem } from '../models/item.types.js';
import { ABILITIES, SKILL_NAMES, ABILITY_ABBREVIATIONS } from '../models/common.types.js';
import { rollAbilityScores, STANDARD_ARRAY, getAbilityModifier } from './dice.js';
import {
  loadRaces,
  loadClasses,
  loadBackgrounds,
  loadWeapons,
  loadArmor,
  type RaceData,
  type ClassData,
  type BackgroundData,
  type WeaponData,
  type ArmorData,
} from '../data/data-loader.js';
import { colors, showTitle } from '../ui/display.js';
import { getSaveManager } from '../data/save-manager.js';

interface CreationState {
  name: string;
  race: RaceData;
  subrace?: { id: string; name: string; abilityScoreIncreases: Record<string, number> };
  class: ClassData;
  abilityScores: AbilityScores;
  background: BackgroundData;
  selectedSkills: Skill[];
  fightingStyle?: { id: string; name: string; description: string };
  equipment: string[];
  personalityTrait: string;
  ideal: string;
  bond: string;
  flaw: string;
}

export async function runCharacterCreation(): Promise<Character | null> {
  console.clear();
  showTitle('Character Creation');

  const races = loadRaces();
  const classes = loadClasses();
  const backgrounds = loadBackgrounds();

  if (races.length === 0 || classes.length === 0) {
    console.log(chalk.red('\n  Error: Could not load game data. Check your data/ directory.\n'));
    return null;
  }

  const state: Partial<CreationState> = {};

  // Step 1: Name
  console.log(chalk.cyan('\n  Step 1: Name Your Character\n'));
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
  state.name = name.trim();

  // Step 2: Race
  console.log(chalk.cyan('\n  Step 2: Choose Your Race\n'));
  const { raceId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'raceId',
      message: 'Select your race:',
      choices: races.map(r => ({
        name: `${r.name} - ${r.description.slice(0, 60)}...`,
        value: r.id,
      })),
      pageSize: 10,
    },
  ]);

  state.race = races.find(r => r.id === raceId)!;

  // Show race details
  console.log(chalk.gray(`\n  ${state.race.name}: ${state.race.description}`));
  console.log(chalk.yellow(`  Speed: ${state.race.speed} ft`));
  if (state.race.darkvision) {
    console.log(chalk.yellow(`  Darkvision: ${state.race.darkvision} ft`));
  }
  console.log(chalk.green(`  Ability Bonuses: ${formatAbilityBonuses(state.race.abilityScoreIncreases)}`));

  // Subrace selection if available
  if (state.race.subraces && state.race.subraces.length > 0) {
    console.log(chalk.cyan('\n  Choose your subrace:\n'));
    const { subraceId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'subraceId',
        message: 'Select your subrace:',
        choices: state.race.subraces.map(s => ({
          name: `${s.name} (${formatAbilityBonuses(s.abilityScoreIncreases)})`,
          value: s.id,
        })),
      },
    ]);

    const subrace = state.race.subraces.find(s => s.id === subraceId)!;
    state.subrace = {
      id: subrace.id,
      name: subrace.name,
      abilityScoreIncreases: subrace.abilityScoreIncreases,
    };
  }

  // Step 3: Class
  console.log(chalk.cyan('\n  Step 3: Choose Your Class\n'));
  const { classId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'classId',
      message: 'Select your class:',
      choices: classes.map(c => ({
        name: `${c.name} (d${c.hitDie}) - ${c.description.slice(0, 50)}...`,
        value: c.id,
      })),
      pageSize: 10,
    },
  ]);

  state.class = classes.find(c => c.id === classId)!;

  // Show class details
  console.log(chalk.gray(`\n  ${state.class.name}: ${state.class.description}`));
  console.log(chalk.yellow(`  Hit Die: d${state.class.hitDie}`));
  console.log(chalk.yellow(`  Primary Ability: ${state.class.primaryAbility.join(' or ')}`));

  // Fighting Style for Fighter/Paladin
  const fightingStyleFeature = state.class.features.find(f => f.id === 'fighting-style' && f.choices);
  if (fightingStyleFeature && fightingStyleFeature.choices) {
    console.log(chalk.cyan('\n  Choose your Fighting Style:\n'));
    const { fightingStyleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'fightingStyleId',
        message: 'Select a fighting style:',
        choices: fightingStyleFeature.choices.map(c => ({
          name: `${c.name} - ${c.description}`,
          value: c.id,
        })),
      },
    ]);
    state.fightingStyle = fightingStyleFeature.choices.find(c => c.id === fightingStyleId);
  }

  // Step 4: Ability Scores
  console.log(chalk.cyan('\n  Step 4: Ability Scores\n'));
  const { method } = await inquirer.prompt([
    {
      type: 'list',
      name: 'method',
      message: 'How would you like to generate ability scores?',
      choices: [
        { name: 'Standard Array (15, 14, 13, 12, 10, 8) - Balanced', value: 'standard' },
        { name: 'Roll 4d6 Drop Lowest - Classic', value: 'roll' },
      ],
    },
  ]);

  let scores: number[];
  if (method === 'standard') {
    scores = [...STANDARD_ARRAY];
    console.log(chalk.cyan(`\n  Using Standard Array: ${scores.join(', ')}`));
  } else {
    console.log(chalk.yellow('\n  Rolling 4d6 drop lowest for each ability...'));
    scores = rollAbilityScores();
    console.log(chalk.green(`  Rolled: ${scores.sort((a, b) => b - a).join(', ')}`));

    const { reroll } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'reroll',
        message: 'Would you like to reroll?',
        default: false,
      },
    ]);

    if (reroll) {
      scores = rollAbilityScores();
      console.log(chalk.green(`  New rolls: ${scores.sort((a, b) => b - a).join(', ')}`));
    }
  }

  // Assign scores to abilities
  console.log(chalk.cyan('\n  Assign your scores to abilities:'));
  console.log(chalk.gray(`  Tip: ${state.class.primaryAbility.join(' and ')} are important for ${state.class.name}s\n`));

  const sortedScores = [...scores].sort((a, b) => b - a);
  const remainingScores = [...sortedScores];
  const abilityScores: Partial<AbilityScores> = {};

  for (const ability of ABILITIES) {
    const { score } = await inquirer.prompt([
      {
        type: 'list',
        name: 'score',
        message: `Assign to ${ABILITY_ABBREVIATIONS[ability]} (${ability}):`,
        choices: remainingScores.map(s => ({ name: String(s), value: s })),
      },
    ]);

    abilityScores[ability] = score;
    remainingScores.splice(remainingScores.indexOf(score), 1);
  }

  // Apply racial bonuses
  for (const [ability, bonus] of Object.entries(state.race.abilityScoreIncreases)) {
    abilityScores[ability as Ability] = (abilityScores[ability as Ability] || 10) + bonus;
  }
  if (state.subrace) {
    for (const [ability, bonus] of Object.entries(state.subrace.abilityScoreIncreases)) {
      abilityScores[ability as Ability] = (abilityScores[ability as Ability] || 10) + bonus;
    }
  }

  state.abilityScores = abilityScores as AbilityScores;

  console.log(chalk.green('\n  Final Ability Scores (with racial bonuses):'));
  for (const ability of ABILITIES) {
    const score = state.abilityScores[ability];
    const mod = getAbilityModifier(score);
    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
    console.log(`    ${ABILITY_ABBREVIATIONS[ability]}: ${score} (${modStr})`);
  }

  // Step 5: Background
  console.log(chalk.cyan('\n  Step 5: Choose Your Background\n'));
  const { backgroundId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'backgroundId',
      message: 'Select your background:',
      choices: backgrounds.map(b => ({
        name: `${b.name} - ${b.description.slice(0, 50)}...`,
        value: b.id,
      })),
      pageSize: 10,
    },
  ]);

  state.background = backgrounds.find(b => b.id === backgroundId)!;
  console.log(chalk.gray(`\n  ${state.background.name}: ${state.background.description}`));
  console.log(chalk.yellow(`  Skills: ${state.background.skillProficiencies.join(', ')}`));
  console.log(chalk.yellow(`  Feature: ${state.background.feature.name}`));

  // Step 6: Skills
  console.log(chalk.cyan('\n  Step 6: Choose Class Skills\n'));
  const classSkillOptions = state.class.skillChoices.options.filter(
    s => !state.background!.skillProficiencies.includes(s)
  );

  const { selectedSkills } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedSkills',
      message: `Choose ${state.class.skillChoices.count} skill proficiencies:`,
      choices: classSkillOptions.map(s => ({
        name: SKILL_NAMES[s as Skill] || s,
        value: s,
      })),
      validate: (input: string[]) => {
        if (input.length !== state.class!.skillChoices.count) {
          return `Please select exactly ${state.class!.skillChoices.count} skills`;
        }
        return true;
      },
    },
  ]);

  state.selectedSkills = [
    ...state.background.skillProficiencies.map(s => s as Skill),
    ...selectedSkills.map((s: string) => s as Skill),
  ];

  // Step 7: Personality
  console.log(chalk.cyan('\n  Step 7: Personality\n'));
  const { personalityTrait } = await inquirer.prompt([
    {
      type: 'list',
      name: 'personalityTrait',
      message: 'Choose a personality trait:',
      choices: state.background.personalityTraits.map((t, i) => ({
        name: t.slice(0, 70) + (t.length > 70 ? '...' : ''),
        value: t,
      })),
      pageSize: 8,
    },
  ]);
  state.personalityTrait = personalityTrait;

  const { ideal } = await inquirer.prompt([
    {
      type: 'list',
      name: 'ideal',
      message: 'Choose an ideal:',
      choices: state.background.ideals.map(i => ({
        name: i.slice(0, 70) + (i.length > 70 ? '...' : ''),
        value: i,
      })),
    },
  ]);
  state.ideal = ideal;

  const { bond } = await inquirer.prompt([
    {
      type: 'list',
      name: 'bond',
      message: 'Choose a bond:',
      choices: state.background.bonds.map(b => ({
        name: b.slice(0, 70) + (b.length > 70 ? '...' : ''),
        value: b,
      })),
    },
  ]);
  state.bond = bond;

  const { flaw } = await inquirer.prompt([
    {
      type: 'list',
      name: 'flaw',
      message: 'Choose a flaw:',
      choices: state.background.flaws.map(f => ({
        name: f.slice(0, 70) + (f.length > 70 ? '...' : ''),
        value: f,
      })),
    },
  ]);
  state.flaw = flaw;

  // Build the character
  const character = buildCharacter(state as CreationState);

  // Show summary
  console.clear();
  showTitle('Character Complete!');
  showCharacterSummary(character);

  // Save confirmation
  const { shouldSave } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldSave',
      message: 'Save this character?',
      default: true,
    },
  ]);

  if (shouldSave) {
    const saveManager = getSaveManager();
    const saveId = saveManager.saveCharacter(character);
    console.log(chalk.green(`\n  Character saved! ID: ${saveId}\n`));
    return character;
  }

  return null;
}

function formatAbilityBonuses(bonuses: Record<string, number>): string {
  return Object.entries(bonuses)
    .map(([ability, bonus]) => `+${bonus} ${ability.slice(0, 3).toUpperCase()}`)
    .join(', ');
}

function buildCharacter(state: CreationState): Character {
  const id = uuidv4();
  const conMod = getAbilityModifier(state.abilityScores.constitution);
  const dexMod = getAbilityModifier(state.abilityScores.dexterity);

  // Calculate HP (max at level 1)
  const maxHP = state.class.hitDie + conMod;

  // Calculate AC (base 10 + DEX, will improve with armor)
  const baseAC = 10 + dexMod;

  // Build class features for level 1
  const classFeatures: ClassFeature[] = state.class.features
    .filter(f => f.level <= 1)
    .map(f => ({
      id: f.id,
      name: f.name,
      description: f.description,
      level: f.level,
    }));

  // Add fighting style as a feature if selected
  if (state.fightingStyle) {
    classFeatures.push({
      id: `fighting-style-${state.fightingStyle.id}`,
      name: `Fighting Style: ${state.fightingStyle.name}`,
      description: state.fightingStyle.description,
      level: 1,
    });
  }

  // Build selected race
  const selectedRace: SelectedRace = {
    raceId: state.race.id as any,
    subraceId: state.subrace?.id as any,
    abilityScoreIncreases: {
      ...state.race.abilityScoreIncreases,
      ...(state.subrace?.abilityScoreIncreases || {}),
    } as any,
    traits: state.race.traits as any,
    size: state.race.size as any,
    speed: state.race.speed,
    languages: state.race.languages,
    proficiencies: {
      weapons: state.race.weaponProficiencies || [],
      armor: [],
      skills: (state.race.skillProficiencies || []) as Skill[],
      tools: [],
    },
  };

  // Build selected class
  const selectedClass: SelectedClass = {
    classId: state.class.id as any,
    level: 1,
    hitDie: state.class.hitDie as any,
    features: classFeatures,
    proficiencies: {
      armor: state.class.armorProficiencies as any,
      weapons: state.class.weaponProficiencies,
      tools: [],
      skills: state.selectedSkills,
      savingThrows: state.class.savingThrowProficiencies as Ability[],
    },
  };

  // Build background
  const background: Background = {
    id: state.background.id,
    name: state.background.name,
    description: state.background.description,
    skillProficiencies: state.background.skillProficiencies as Skill[],
    toolProficiencies: state.background.toolProficiencies,
    equipment: state.background.equipment,
    feature: state.background.feature,
    personalityTraits: state.background.personalityTraits,
    ideals: state.background.ideals,
    bonds: state.background.bonds,
    flaws: state.background.flaws,
  };

  // Starting equipment (simplified - give basic gear)
  const startingInventory: InventoryItem[] = [
    {
      id: 'longsword',
      name: 'Longsword',
      quantity: 1,
      equipped: true,
      description: 'A versatile blade',
    },
    {
      id: 'shield',
      name: 'Shield',
      quantity: 1,
      equipped: true,
      description: '+2 AC bonus',
    },
    {
      id: 'chain-mail',
      name: 'Chain Mail',
      quantity: 1,
      equipped: true,
      description: 'Heavy armor, AC 16',
    },
    {
      id: 'backpack',
      name: 'Adventurer\'s Pack',
      quantity: 1,
      equipped: false,
      description: 'Contains basic adventuring gear',
    },
  ];

  const character: Character = {
    id,
    name: state.name,
    race: selectedRace,
    class: selectedClass,
    level: 1,
    experiencePoints: 0,
    abilityScores: state.abilityScores,
    maxHitPoints: maxHP,
    currentHitPoints: maxHP,
    temporaryHitPoints: 0,
    armorClass: 18, // Chain mail (16) + shield (2)
    initiative: dexMod,
    speed: state.race.speed,
    proficiencyBonus: 2,
    skillProficiencies: state.selectedSkills,
    skillExpertise: [],
    savingThrowProficiencies: state.class.savingThrowProficiencies as Ability[],
    languageProficiencies: state.race.languages,
    inventory: startingInventory,
    equippedItems: {
      mainHand: startingInventory.find(i => i.id === 'longsword'),
      offHand: startingInventory.find(i => i.id === 'shield'),
      armor: startingInventory.find(i => i.id === 'chain-mail'),
    },
    currency: { cp: 0, sp: 0, ep: 0, gp: 15, pp: 0 },
    carryingCapacity: state.abilityScores.strength * 15,
    currentWeight: 0,
    classFeatures,
    featureUses: {},
    background,
    personalityTraits: [state.personalityTrait],
    ideals: [state.ideal],
    bonds: [state.bond],
    flaws: [state.flaw],
    conditions: [],
    deathSaves: { successes: 0, failures: 0 },
    exhaustionLevel: 0,
    inspiration: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    totalPlayTime: 0,
  };

  return character;
}

function showCharacterSummary(char: Character): void {
  console.log(chalk.bold.white(`\n  ${char.name}`));
  console.log(chalk.gray(`  Level ${char.level} ${char.race.raceId} ${char.class.classId}`));
  console.log();

  console.log(chalk.cyan('  Combat Stats:'));
  console.log(`    HP: ${char.maxHitPoints}  |  AC: ${char.armorClass}  |  Speed: ${char.speed} ft`);
  console.log();

  console.log(chalk.cyan('  Ability Scores:'));
  for (const ability of ABILITIES) {
    const score = char.abilityScores[ability];
    const mod = getAbilityModifier(score);
    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
    console.log(`    ${ABILITY_ABBREVIATIONS[ability]}: ${score} (${modStr})`);
  }
  console.log();

  console.log(chalk.cyan('  Proficiencies:'));
  console.log(`    Skills: ${char.skillProficiencies.join(', ')}`);
  console.log(`    Saves: ${char.savingThrowProficiencies.join(', ')}`);
  console.log();

  console.log(chalk.cyan('  Class Features:'));
  char.classFeatures.forEach(f => {
    console.log(`    - ${f.name}`);
  });
  console.log();

  console.log(chalk.cyan('  Background:'));
  console.log(`    ${char.background.name}: ${char.background.feature.name}`);
  console.log();
}

export { showCharacterSummary };

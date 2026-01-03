/**
 * Common types used across the D&D game
 */

export type Ability = 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma';

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export const ABILITIES: Ability[] = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

export const ABILITY_ABBREVIATIONS: Record<Ability, string> = {
  strength: 'STR',
  dexterity: 'DEX',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom: 'WIS',
  charisma: 'CHA',
};

export type Skill =
  | 'acrobatics'
  | 'animalHandling'
  | 'arcana'
  | 'athletics'
  | 'deception'
  | 'history'
  | 'insight'
  | 'intimidation'
  | 'investigation'
  | 'medicine'
  | 'nature'
  | 'perception'
  | 'performance'
  | 'persuasion'
  | 'religion'
  | 'sleightOfHand'
  | 'stealth'
  | 'survival';

export const SKILL_ABILITIES: Record<Skill, Ability> = {
  acrobatics: 'dexterity',
  animalHandling: 'wisdom',
  arcana: 'intelligence',
  athletics: 'strength',
  deception: 'charisma',
  history: 'intelligence',
  insight: 'wisdom',
  intimidation: 'charisma',
  investigation: 'intelligence',
  medicine: 'wisdom',
  nature: 'intelligence',
  perception: 'wisdom',
  performance: 'charisma',
  persuasion: 'charisma',
  religion: 'intelligence',
  sleightOfHand: 'dexterity',
  stealth: 'dexterity',
  survival: 'wisdom',
};

export const SKILL_NAMES: Record<Skill, string> = {
  acrobatics: 'Acrobatics',
  animalHandling: 'Animal Handling',
  arcana: 'Arcana',
  athletics: 'Athletics',
  deception: 'Deception',
  history: 'History',
  insight: 'Insight',
  intimidation: 'Intimidation',
  investigation: 'Investigation',
  medicine: 'Medicine',
  nature: 'Nature',
  perception: 'Perception',
  performance: 'Performance',
  persuasion: 'Persuasion',
  religion: 'Religion',
  sleightOfHand: 'Sleight of Hand',
  stealth: 'Stealth',
  survival: 'Survival',
};

export type DamageType =
  | 'bludgeoning'
  | 'piercing'
  | 'slashing'
  | 'acid'
  | 'cold'
  | 'fire'
  | 'force'
  | 'lightning'
  | 'necrotic'
  | 'poison'
  | 'psychic'
  | 'radiant'
  | 'thunder';

export type Condition =
  | 'blinded'
  | 'charmed'
  | 'deafened'
  | 'frightened'
  | 'grappled'
  | 'incapacitated'
  | 'invisible'
  | 'paralyzed'
  | 'petrified'
  | 'poisoned'
  | 'prone'
  | 'restrained'
  | 'stunned'
  | 'unconscious'
  | 'exhaustion';

export type Size = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';

export type Alignment =
  | 'lawful good'
  | 'neutral good'
  | 'chaotic good'
  | 'lawful neutral'
  | 'true neutral'
  | 'chaotic neutral'
  | 'lawful evil'
  | 'neutral evil'
  | 'chaotic evil'
  | 'unaligned';

export type ArmorType = 'light' | 'medium' | 'heavy' | 'shield';

export type WeaponCategory = 'simple' | 'martial';

export type WeaponProperty =
  | 'ammunition'
  | 'finesse'
  | 'heavy'
  | 'light'
  | 'loading'
  | 'reach'
  | 'special'
  | 'thrown'
  | 'two-handed'
  | 'versatile';

export interface Currency {
  cp: number;  // Copper pieces
  sp: number;  // Silver pieces
  ep: number;  // Electrum pieces
  gp: number;  // Gold pieces
  pp: number;  // Platinum pieces
}

export function emptyCurrency(): Currency {
  return { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 };
}

export function currencyToGold(currency: Currency): number {
  return (
    currency.cp / 100 +
    currency.sp / 10 +
    currency.ep / 2 +
    currency.gp +
    currency.pp * 10
  );
}

export interface DeathSaves {
  successes: number;
  failures: number;
}

export function emptyDeathSaves(): DeathSaves {
  return { successes: 0, failures: 0 };
}

// XP thresholds for leveling
export const XP_THRESHOLDS: number[] = [
  0,       // Level 1
  300,     // Level 2
  900,     // Level 3
  2700,    // Level 4
  6500,    // Level 5
  14000,   // Level 6
  23000,   // Level 7
  34000,   // Level 8
  48000,   // Level 9
  64000,   // Level 10
  85000,   // Level 11
  100000,  // Level 12
  120000,  // Level 13
  140000,  // Level 14
  165000,  // Level 15
  195000,  // Level 16
  225000,  // Level 17
  265000,  // Level 18
  305000,  // Level 19
  355000,  // Level 20
];

export function getLevelFromXP(xp: number): number {
  for (let level = 19; level >= 0; level--) {
    if (xp >= XP_THRESHOLDS[level]) {
      return level + 1;
    }
  }
  return 1;
}

export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel >= 20) return Infinity;
  return XP_THRESHOLDS[currentLevel];
}

// Proficiency bonus by level
export function getProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2;
}

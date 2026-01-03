/**
 * Monster type definitions for D&D 5e
 */

import type {
  AbilityScores,
  Ability,
  Skill,
  DamageType,
  Condition,
  Size,
  Alignment,
} from './common.types.js';

export type CreatureType =
  | 'aberration'
  | 'beast'
  | 'celestial'
  | 'construct'
  | 'dragon'
  | 'elemental'
  | 'fey'
  | 'fiend'
  | 'giant'
  | 'humanoid'
  | 'monstrosity'
  | 'ooze'
  | 'plant'
  | 'undead';

export interface MonsterSpeed {
  walk?: number;
  fly?: number;
  swim?: number;
  climb?: number;
  burrow?: number;
  hover?: boolean;
}

export interface MonsterSenses {
  darkvision?: number;
  blindsight?: number;
  tremorsense?: number;
  truesight?: number;
  passivePerception: number;
}

export interface MonsterTrait {
  name: string;
  description: string;
}

export interface MonsterAction {
  name: string;
  description: string;
  attackBonus?: number;
  damage?: string;
  damageType?: DamageType;
  reach?: number;
  range?: { normal: number; long?: number };
  savingThrow?: {
    ability: Ability;
    dc: number;
    onSuccess: 'none' | 'half' | 'special';
  };
  recharge?: string;  // "5-6", "short rest", etc.
  multiattack?: boolean;
}

export interface LegendaryAction {
  name: string;
  description: string;
  cost: number;  // Legendary action cost (usually 1-3)
}

export interface LairAction {
  description: string;
  initiativeCount: number;  // Usually 20
}

export interface Monster {
  id: string;
  name: string;
  size: Size;
  type: CreatureType;
  subtype?: string;
  alignment: Alignment;

  // Combat stats
  armorClass: number;
  armorType?: string;
  hitPoints: number;
  hitDice: string;
  speed: MonsterSpeed;

  // Ability scores
  abilityScores: AbilityScores;

  // Saves and skills
  savingThrows?: Partial<Record<Ability, number>>;
  skills?: Partial<Record<Skill, number>>;

  // Resistances and immunities
  damageVulnerabilities?: DamageType[];
  damageResistances?: DamageType[];
  damageImmunities?: DamageType[];
  conditionImmunities?: Condition[];

  // Senses and languages
  senses: MonsterSenses;
  languages: string[];
  telepathy?: number;

  // Challenge rating
  challengeRating: number;
  experiencePoints: number;

  // Special traits
  traits?: MonsterTrait[];

  // Actions
  actions: MonsterAction[];
  bonusActions?: MonsterAction[];
  reactions?: MonsterAction[];
  legendaryActions?: LegendaryAction[];
  legendaryActionsPerRound?: number;
  lairActions?: LairAction[];
  regionalEffects?: string[];

  // Description
  description?: string;
  habitat?: string[];
}

// XP by Challenge Rating
export const CR_XP: Record<string, number> = {
  '0': 10,
  '1/8': 25,
  '1/4': 50,
  '1/2': 100,
  '1': 200,
  '2': 450,
  '3': 700,
  '4': 1100,
  '5': 1800,
  '6': 2300,
  '7': 2900,
  '8': 3900,
  '9': 5000,
  '10': 5900,
  '11': 7200,
  '12': 8400,
  '13': 10000,
  '14': 11500,
  '15': 13000,
  '16': 15000,
  '17': 18000,
  '18': 20000,
  '19': 22000,
  '20': 25000,
  '21': 33000,
  '22': 41000,
  '23': 50000,
  '24': 62000,
  '25': 75000,
  '26': 90000,
  '27': 105000,
  '28': 120000,
  '29': 135000,
  '30': 155000,
};

// Encounter difficulty XP thresholds per character level
export const ENCOUNTER_THRESHOLDS: Record<number, { easy: number; medium: number; hard: number; deadly: number }> = {
  1: { easy: 25, medium: 50, hard: 75, deadly: 100 },
  2: { easy: 50, medium: 100, hard: 150, deadly: 200 },
  3: { easy: 75, medium: 150, hard: 225, deadly: 400 },
  4: { easy: 125, medium: 250, hard: 375, deadly: 500 },
  5: { easy: 250, medium: 500, hard: 750, deadly: 1100 },
  6: { easy: 300, medium: 600, hard: 900, deadly: 1400 },
  7: { easy: 350, medium: 750, hard: 1100, deadly: 1700 },
  8: { easy: 450, medium: 900, hard: 1400, deadly: 2100 },
  9: { easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
  10: { easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
  11: { easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
  12: { easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
  13: { easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
  14: { easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
  15: { easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
  16: { easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
  17: { easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
  18: { easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
  19: { easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
  20: { easy: 2800, medium: 5700, hard: 8500, deadly: 12700 },
};

// Encounter multipliers for number of monsters
export const ENCOUNTER_MULTIPLIERS: { count: [number, number]; multiplier: number }[] = [
  { count: [1, 1], multiplier: 1 },
  { count: [2, 2], multiplier: 1.5 },
  { count: [3, 6], multiplier: 2 },
  { count: [7, 10], multiplier: 2.5 },
  { count: [11, 14], multiplier: 3 },
  { count: [15, Infinity], multiplier: 4 },
];

export function getEncounterMultiplier(monsterCount: number): number {
  for (const { count, multiplier } of ENCOUNTER_MULTIPLIERS) {
    if (monsterCount >= count[0] && monsterCount <= count[1]) {
      return multiplier;
    }
  }
  return 1;
}

export function calculateEncounterDifficulty(
  monsters: { cr: number; count: number }[],
  partyLevels: number[]
): 'trivial' | 'easy' | 'medium' | 'hard' | 'deadly' {
  // Calculate total monster XP
  let totalXP = 0;
  let totalMonsters = 0;
  for (const m of monsters) {
    const xp = CR_XP[String(m.cr)] || 0;
    totalXP += xp * m.count;
    totalMonsters += m.count;
  }

  // Apply encounter multiplier
  const adjustedXP = totalXP * getEncounterMultiplier(totalMonsters);

  // Calculate party thresholds
  let easyThreshold = 0;
  let mediumThreshold = 0;
  let hardThreshold = 0;
  let deadlyThreshold = 0;

  for (const level of partyLevels) {
    const thresholds = ENCOUNTER_THRESHOLDS[level] || ENCOUNTER_THRESHOLDS[1];
    easyThreshold += thresholds.easy;
    mediumThreshold += thresholds.medium;
    hardThreshold += thresholds.hard;
    deadlyThreshold += thresholds.deadly;
  }

  // Determine difficulty
  if (adjustedXP >= deadlyThreshold) return 'deadly';
  if (adjustedXP >= hardThreshold) return 'hard';
  if (adjustedXP >= mediumThreshold) return 'medium';
  if (adjustedXP >= easyThreshold) return 'easy';
  return 'trivial';
}

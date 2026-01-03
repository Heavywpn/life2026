/**
 * Spell type definitions for D&D 5e
 */

import type { Ability, DamageType, Condition } from './common.types.js';
import type { ClassId } from './class.types.js';

export type SpellSchool =
  | 'abjuration'
  | 'conjuration'
  | 'divination'
  | 'enchantment'
  | 'evocation'
  | 'illusion'
  | 'necromancy'
  | 'transmutation';

export type CastingTime =
  | '1 action'
  | '1 bonus action'
  | '1 reaction'
  | '1 minute'
  | '10 minutes'
  | '1 hour'
  | '8 hours'
  | '12 hours'
  | '24 hours';

export interface SpellRange {
  type: 'self' | 'touch' | 'ranged' | 'sight' | 'unlimited';
  distance?: number;  // In feet
}

export interface SpellComponents {
  verbal: boolean;
  somatic: boolean;
  material: boolean;
  materialDescription?: string;
  materialCost?: number;  // GP value if component has cost
  materialConsumed?: boolean;
}

export interface SpellDuration {
  type: 'instantaneous' | 'concentration' | 'timed';
  time?: string;  // e.g., "1 minute", "1 hour"
  upTo?: boolean;  // "up to 1 minute"
}

export type AreaShape = 'cone' | 'cube' | 'cylinder' | 'line' | 'sphere';

export interface AreaOfEffect {
  shape: AreaShape;
  size: number;  // Feet
  height?: number;  // For cylinders
}

export interface SpellDamage {
  dice: string;
  type: DamageType;
  scaling?: {
    type: 'cantrip' | 'slot';
    dicePerLevel?: string;  // Additional dice per level
  };
}

export interface SpellHealing {
  dice: string;
  scaling?: {
    type: 'slot';
    dicePerLevel?: string;
  };
}

export interface SpellSave {
  ability: Ability;
  onSuccess: 'none' | 'half' | 'special';
  onFailure: string;
}

export interface Spell {
  id: string;
  name: string;
  level: number;  // 0 for cantrips
  school: SpellSchool;
  castingTime: CastingTime;
  reactionTrigger?: string;
  range: SpellRange;
  components: SpellComponents;
  duration: SpellDuration;
  concentration: boolean;
  ritual: boolean;
  description: string;
  atHigherLevels?: string;

  // Mechanical effects
  damage?: SpellDamage;
  healing?: SpellHealing;
  savingThrow?: SpellSave;
  attackRoll?: boolean;
  conditions?: Condition[];
  areaOfEffect?: AreaOfEffect;

  // Class access
  classes: ClassId[];
}

// Helper to get cantrip damage dice by character level
export function getCantripDice(baseLevel: number, characterLevel: number): number {
  if (characterLevel >= 17) return 4;
  if (characterLevel >= 11) return 3;
  if (characterLevel >= 5) return 2;
  return 1;
}

// Helper to calculate spell save DC
export function getSpellSaveDC(
  proficiencyBonus: number,
  spellcastingAbilityMod: number
): number {
  return 8 + proficiencyBonus + spellcastingAbilityMod;
}

// Helper to calculate spell attack bonus
export function getSpellAttackBonus(
  proficiencyBonus: number,
  spellcastingAbilityMod: number
): number {
  return proficiencyBonus + spellcastingAbilityMod;
}

// Spell slot table for full casters (wizard, cleric, druid, bard, sorcerer)
export const FULL_CASTER_SLOTS: Record<number, number[]> = {
  1: [2],
  2: [3],
  3: [4, 2],
  4: [4, 3],
  5: [4, 3, 2],
  6: [4, 3, 3],
  7: [4, 3, 3, 1],
  8: [4, 3, 3, 2],
  9: [4, 3, 3, 3, 1],
  10: [4, 3, 3, 3, 2],
  11: [4, 3, 3, 3, 2, 1],
  12: [4, 3, 3, 3, 2, 1],
  13: [4, 3, 3, 3, 2, 1, 1],
  14: [4, 3, 3, 3, 2, 1, 1],
  15: [4, 3, 3, 3, 2, 1, 1, 1],
  16: [4, 3, 3, 3, 2, 1, 1, 1],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
};

// Spell slot table for half casters (paladin, ranger)
export const HALF_CASTER_SLOTS: Record<number, number[]> = {
  1: [],
  2: [2],
  3: [3],
  4: [3],
  5: [4, 2],
  6: [4, 2],
  7: [4, 3],
  8: [4, 3],
  9: [4, 3, 2],
  10: [4, 3, 2],
  11: [4, 3, 3],
  12: [4, 3, 3],
  13: [4, 3, 3, 1],
  14: [4, 3, 3, 1],
  15: [4, 3, 3, 2],
  16: [4, 3, 3, 2],
  17: [4, 3, 3, 3, 1],
  18: [4, 3, 3, 3, 1],
  19: [4, 3, 3, 3, 2],
  20: [4, 3, 3, 3, 2],
};

// Warlock pact magic slots (all same level)
export const WARLOCK_SLOTS: Record<number, { slots: number; level: number }> = {
  1: { slots: 1, level: 1 },
  2: { slots: 2, level: 1 },
  3: { slots: 2, level: 2 },
  4: { slots: 2, level: 2 },
  5: { slots: 2, level: 3 },
  6: { slots: 2, level: 3 },
  7: { slots: 2, level: 4 },
  8: { slots: 2, level: 4 },
  9: { slots: 2, level: 5 },
  10: { slots: 2, level: 5 },
  11: { slots: 3, level: 5 },
  12: { slots: 3, level: 5 },
  13: { slots: 3, level: 5 },
  14: { slots: 3, level: 5 },
  15: { slots: 3, level: 5 },
  16: { slots: 3, level: 5 },
  17: { slots: 4, level: 5 },
  18: { slots: 4, level: 5 },
  19: { slots: 4, level: 5 },
  20: { slots: 4, level: 5 },
};

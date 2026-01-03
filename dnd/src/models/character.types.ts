/**
 * Character type definitions for D&D 5e
 */

import type {
  AbilityScores,
  Ability,
  Skill,
  Condition,
  Currency,
  DeathSaves,
} from './common.types.js';
import type { SelectedRace, RaceId, SubraceId } from './race.types.js';
import type { SelectedClass, ClassId, ClassFeature } from './class.types.js';
import type { InventoryItem, EquippedItems, CharacterBase } from './item.types.js';

export interface Background {
  id: string;
  name: string;
  description: string;
  skillProficiencies: Skill[];
  toolProficiencies?: string[];
  languages?: number;  // Number of additional languages to choose
  equipment: string[];
  feature: {
    name: string;
    description: string;
  };
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

export interface SpellSlots {
  1: { total: number; used: number };
  2: { total: number; used: number };
  3: { total: number; used: number };
  4: { total: number; used: number };
  5: { total: number; used: number };
  6: { total: number; used: number };
  7: { total: number; used: number };
  8: { total: number; used: number };
  9: { total: number; used: number };
}

export interface CharacterSpellcasting {
  spellcastingAbility: Ability;
  spellSaveDC: number;
  spellAttackBonus: number;
  cantripsKnown: string[];
  spellsKnown: string[];
  preparedSpells: string[];
  spellSlots: SpellSlots;
  concentration?: string;  // Spell ID if concentrating
}

export interface ActiveCondition {
  condition: Condition;
  duration?: number;  // Rounds remaining, undefined = indefinite
  source?: string;
}

export interface Character {
  // Identity
  id: string;
  name: string;
  playerName?: string;

  // Race & Class
  race: SelectedRace;
  class: SelectedClass;

  // Core Stats
  level: number;
  experiencePoints: number;
  abilityScores: AbilityScores;

  // Combat Stats
  maxHitPoints: number;
  currentHitPoints: number;
  temporaryHitPoints: number;
  armorClass: number;
  initiative: number;
  speed: number;
  proficiencyBonus: number;

  // Proficiencies
  skillProficiencies: Skill[];
  skillExpertise: Skill[];  // Double proficiency
  savingThrowProficiencies: Ability[];
  languageProficiencies: string[];

  // Equipment
  inventory: InventoryItem[];
  equippedItems: EquippedItems;
  currency: Currency;
  carryingCapacity: number;
  currentWeight: number;

  // Spellcasting (if applicable)
  spellcasting?: CharacterSpellcasting;

  // Class Features
  classFeatures: ClassFeature[];
  featureUses: Record<string, { current: number; max: number }>;

  // Background
  background: Background;
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
  backstory?: string;

  // Status
  conditions: ActiveCondition[];
  deathSaves: DeathSaves;
  exhaustionLevel: number;

  // Inspiration
  inspiration: boolean;

  // Appearance
  age?: number;
  height?: string;
  weight?: string;
  eyes?: string;
  skin?: string;
  hair?: string;
  appearance?: string;

  // Tracking
  createdAt: string;
  updatedAt: string;
  totalPlayTime: number;  // Seconds

  // Home Base (for persistent characters)
  base?: CharacterBase;

  // Campaign History
  campaignsCompleted?: number;
  totalMonstersDefeated?: number;
  totalGoldEarned?: number;
}

// Helper functions
export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function getSkillModifier(
  character: Character,
  skill: Skill,
  skillAbility: Ability
): number {
  const abilityMod = getAbilityModifier(character.abilityScores[skillAbility]);
  const isProficient = character.skillProficiencies.includes(skill);
  const hasExpertise = character.skillExpertise.includes(skill);

  if (hasExpertise) {
    return abilityMod + character.proficiencyBonus * 2;
  } else if (isProficient) {
    return abilityMod + character.proficiencyBonus;
  }
  return abilityMod;
}

export function getSavingThrowModifier(
  character: Character,
  ability: Ability
): number {
  const abilityMod = getAbilityModifier(character.abilityScores[ability]);
  const isProficient = character.savingThrowProficiencies.includes(ability);

  return isProficient ? abilityMod + character.proficiencyBonus : abilityMod;
}

export function getPassivePerception(character: Character): number {
  const perceptionMod = getSkillModifier(character, 'perception', 'wisdom');
  return 10 + perceptionMod;
}

export function getPassiveInsight(character: Character): number {
  const insightMod = getSkillModifier(character, 'insight', 'wisdom');
  return 10 + insightMod;
}

export function getPassiveInvestigation(character: Character): number {
  const investigationMod = getSkillModifier(character, 'investigation', 'intelligence');
  return 10 + investigationMod;
}

// Character creation state
export interface CharacterCreationState {
  step: CharacterCreationStep;
  name?: string;
  raceId?: RaceId;
  subraceId?: SubraceId;
  classId?: ClassId;
  abilityScores?: AbilityScores;
  abilityScoreMethod?: 'standard' | 'roll' | 'pointBuy';
  backgroundId?: string;
  selectedSkills?: Skill[];
  equipment?: string[];
  spells?: string[];
}

export type CharacterCreationStep =
  | 'name'
  | 'race'
  | 'subrace'
  | 'class'
  | 'abilities'
  | 'background'
  | 'skills'
  | 'equipment'
  | 'spells'
  | 'details'
  | 'review';

/**
 * Class type definitions for D&D 5e
 */

import type { Ability, Skill, ArmorType, WeaponCategory } from './common.types.js';

export interface ClassFeature {
  id: string;
  name: string;
  description: string;
  level: number;
  choices?: FeatureChoice[];
  uses?: FeatureUses;
}

export interface FeatureChoice {
  id: string;
  name: string;
  description: string;
}

export interface FeatureUses {
  count: number | string;  // number or formula like "wisdom modifier"
  recharge: 'short' | 'long' | 'none';
}

export interface SpellSlotProgression {
  [level: number]: {
    cantripsKnown?: number;
    spellsKnown?: number;
    slots: number[];  // [1st, 2nd, 3rd, ...] level spell slots
  };
}

export interface ClassSpellcasting {
  ability: Ability;
  type: 'prepared' | 'known';
  ritual: boolean;
  focus?: string;
  spellSlots: SpellSlotProgression;
}

export interface Subclass {
  id: string;
  name: string;
  description: string;
  features: ClassFeature[];
}

export interface ClassDefinition {
  id: string;
  name: string;
  description: string;
  hitDie: number;
  primaryAbility: Ability[];
  savingThrowProficiencies: Ability[];
  armorProficiencies: ArmorType[];
  weaponProficiencies: (WeaponCategory | string)[];
  toolProficiencies?: {
    fixed?: string[];
    choice?: { count: number; options: string[] };
  };
  skillChoices: {
    count: number;
    options: Skill[];
  };
  startingEquipment: StartingEquipmentChoice[];
  features: ClassFeature[];
  spellcasting?: ClassSpellcasting;
  subclassLevel: number;
  subclassName: string;
  subclasses: Subclass[];
}

export interface StartingEquipmentChoice {
  choose: number;
  from: StartingEquipmentOption[];
}

export interface StartingEquipmentOption {
  items: string[];
  description: string;
}

export type ClassId =
  | 'barbarian'
  | 'bard'
  | 'cleric'
  | 'druid'
  | 'fighter'
  | 'monk'
  | 'paladin'
  | 'ranger'
  | 'rogue'
  | 'sorcerer'
  | 'warlock'
  | 'wizard';

export interface SelectedClass {
  classId: ClassId;
  subclassId?: string;
  level: number;
  hitDie: number;
  features: ClassFeature[];
  proficiencies: {
    armor: ArmorType[];
    weapons: (WeaponCategory | string)[];
    tools: string[];
    skills: Skill[];
    savingThrows: Ability[];
  };
  spellcasting?: {
    ability: Ability;
    spellSaveDC: number;
    spellAttackBonus: number;
    cantripsKnown: number;
    spellsKnown?: number;
    spellSlots: number[];
    preparedSpells?: string[];
    knownSpells?: string[];
  };
}

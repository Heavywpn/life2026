/**
 * Race type definitions for D&D 5e
 */

import type { AbilityScores, Skill, Size, ArmorType, WeaponProperty } from './common.types.js';

export interface RacialTrait {
  name: string;
  description: string;
}

export interface Subrace {
  id: string;
  name: string;
  abilityScoreIncreases: Partial<AbilityScores>;
  traits: RacialTrait[];
  armorProficiencies?: ArmorType[];
  weaponProficiencies?: string[];
  skillProficiencies?: Skill[];
  spells?: SubraceSpell[];
}

export interface SubraceSpell {
  name: string;
  level: number;
  unlockLevel: number;  // Character level when this becomes available
}

export interface RaceDefinition {
  id: string;
  name: string;
  description: string;
  abilityScoreIncreases: Partial<AbilityScores>;
  size: Size;
  speed: number;
  languages: string[];
  traits: RacialTrait[];
  darkvision?: number;
  weaponProficiencies?: string[];
  armorProficiencies?: ArmorType[];
  skillProficiencies?: Skill[];
  toolProficiencies?: {
    fixed?: string[];
    choice?: { count: number; options: string[] };
  };
  subraces?: Subrace[];
  spells?: SubraceSpell[];
}

export type RaceId =
  | 'human'
  | 'elf'
  | 'dwarf'
  | 'halfling'
  | 'half-elf'
  | 'half-orc'
  | 'gnome'
  | 'tiefling'
  | 'dragonborn';

export type SubraceId =
  // Elf subraces
  | 'high-elf'
  | 'wood-elf'
  | 'dark-elf'
  // Dwarf subraces
  | 'hill-dwarf'
  | 'mountain-dwarf'
  // Halfling subraces
  | 'lightfoot'
  | 'stout'
  // Gnome subraces
  | 'forest-gnome'
  | 'rock-gnome';

export interface SelectedRace {
  raceId: RaceId;
  subraceId?: SubraceId;
  // Combined bonuses from race + subrace
  abilityScoreIncreases: Partial<AbilityScores>;
  traits: RacialTrait[];
  size: Size;
  speed: number;
  darkvision?: number;
  languages: string[];
  proficiencies: {
    weapons: string[];
    armor: ArmorType[];
    skills: Skill[];
    tools: string[];
  };
}

/**
 * Data loader for game content (races, classes, backgrounds, items)
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_PATH = join(__dirname, '../../data');

export interface RaceData {
  id: string;
  name: string;
  description: string;
  abilityScoreIncreases: Record<string, number>;
  size: string;
  speed: number;
  darkvision?: number;
  languages: string[];
  traits: { name: string; description: string }[];
  skillProficiencies?: string[];
  weaponProficiencies?: string[];
  subraces?: SubraceData[];
}

export interface SubraceData {
  id: string;
  name: string;
  abilityScoreIncreases: Record<string, number>;
  traits: { name: string; description: string }[];
  weaponProficiencies?: string[];
  armorProficiencies?: string[];
}

export interface ClassData {
  id: string;
  name: string;
  description: string;
  hitDie: number;
  primaryAbility: string[];
  savingThrowProficiencies: string[];
  armorProficiencies: string[];
  weaponProficiencies: string[];
  skillChoices: {
    count: number;
    options: string[];
  };
  startingEquipment: {
    choose: number;
    from: { items: string[]; description: string }[];
  }[];
  features: ClassFeatureData[];
  subclassLevel?: number;
  subclassName?: string;
  subclasses?: SubclassData[];
  spellcasting?: {
    ability: string;
    cantripsKnown?: number;
    spellsKnown?: number;
  };
}

export interface ClassFeatureData {
  id: string;
  name: string;
  description: string;
  level: number;
  uses?: { count: number; recharge: 'short' | 'long' };
  choices?: { id: string; name: string; description: string }[];
}

export interface SubclassData {
  id: string;
  name: string;
  description: string;
  features: ClassFeatureData[];
}

export interface BackgroundData {
  id: string;
  name: string;
  description: string;
  skillProficiencies: string[];
  toolProficiencies?: string[];
  languages?: number;
  equipment: string[];
  feature: { name: string; description: string };
  personalityTraits: string[];
  ideals: string[];
  bonds: string[];
  flaws: string[];
}

export interface WeaponData {
  id: string;
  name: string;
  type: 'weapon';
  category: 'simple' | 'martial';
  damage: string;
  damageType: string;
  properties: string[];
  versatileDamage?: string;
  range?: { normal: number; long: number };
  weight: number;
  value: { gp?: number; sp?: number; cp?: number };
  rarity: string;
  description: string;
}

export interface ArmorData {
  id: string;
  name: string;
  type: 'armor';
  armorType: 'light' | 'medium' | 'heavy' | 'shield';
  baseAC: number;
  maxDexBonus?: number;
  stealthDisadvantage: boolean;
  strengthRequirement?: number;
  weight: number;
  value: { gp?: number; sp?: number; cp?: number };
  rarity: string;
  description: string;
}

// Cache for loaded data
let racesCache: RaceData[] | null = null;
let classesCache: ClassData[] | null = null;
let backgroundsCache: BackgroundData[] | null = null;
let weaponsCache: WeaponData[] | null = null;
let armorCache: ArmorData[] | null = null;

function loadJsonFile<T>(path: string): T {
  const content = readFileSync(path, 'utf-8');
  return JSON.parse(content) as T;
}

function loadJsonDirectory<T>(dirPath: string): T[] {
  if (!existsSync(dirPath)) return [];

  const files = readdirSync(dirPath).filter(f => f.endsWith('.json'));
  const items: T[] = [];

  for (const file of files) {
    const data = loadJsonFile<T | T[]>(join(dirPath, file));
    if (Array.isArray(data)) {
      items.push(...data);
    } else {
      items.push(data);
    }
  }

  return items;
}

export function loadRaces(): RaceData[] {
  if (racesCache) return racesCache;
  racesCache = loadJsonDirectory<RaceData>(join(DATA_PATH, 'races'));
  return racesCache;
}

export function loadClasses(): ClassData[] {
  if (classesCache) return classesCache;
  classesCache = loadJsonDirectory<ClassData>(join(DATA_PATH, 'classes'));
  return classesCache;
}

export function loadBackgrounds(): BackgroundData[] {
  if (backgroundsCache) return backgroundsCache;
  const bgPath = join(DATA_PATH, 'backgrounds/backgrounds.json');
  if (existsSync(bgPath)) {
    backgroundsCache = loadJsonFile<BackgroundData[]>(bgPath);
  } else {
    backgroundsCache = [];
  }
  return backgroundsCache;
}

export function loadWeapons(): WeaponData[] {
  if (weaponsCache) return weaponsCache;
  const weaponPath = join(DATA_PATH, 'items/weapons.json');
  if (existsSync(weaponPath)) {
    weaponsCache = loadJsonFile<WeaponData[]>(weaponPath);
  } else {
    weaponsCache = [];
  }
  return weaponsCache;
}

export function loadArmor(): ArmorData[] {
  if (armorCache) return armorCache;
  const armorPath = join(DATA_PATH, 'items/armor.json');
  if (existsSync(armorPath)) {
    armorCache = loadJsonFile<ArmorData[]>(armorPath);
  } else {
    armorCache = [];
  }
  return armorCache;
}

export function getRaceById(id: string): RaceData | undefined {
  return loadRaces().find(r => r.id === id);
}

export function getClassById(id: string): ClassData | undefined {
  return loadClasses().find(c => c.id === id);
}

export function getBackgroundById(id: string): BackgroundData | undefined {
  return loadBackgrounds().find(b => b.id === id);
}

export function getWeaponById(id: string): WeaponData | undefined {
  return loadWeapons().find(w => w.id === id);
}

export function getArmorById(id: string): ArmorData | undefined {
  return loadArmor().find(a => a.id === id);
}

// Clear cache (useful for testing)
export function clearDataCache(): void {
  racesCache = null;
  classesCache = null;
  backgroundsCache = null;
  weaponsCache = null;
  armorCache = null;
}

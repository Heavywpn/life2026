/**
 * Item and equipment type definitions for D&D 5e
 */

import type { Currency, DamageType, WeaponCategory, WeaponProperty, ArmorType, Ability } from './common.types.js';

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary' | 'artifact';

export interface BaseItem {
  id: string;
  name: string;
  description: string;
  weight: number;
  value: Currency;
  rarity: ItemRarity;
}

export interface Weapon extends BaseItem {
  type: 'weapon';
  category: WeaponCategory;
  damage: string;  // e.g., "1d8"
  damageType: DamageType;
  properties: WeaponProperty[];
  range?: { normal: number; long: number };
  versatileDamage?: string;  // e.g., "1d10" for versatile weapons
}

export interface Armor extends BaseItem {
  type: 'armor';
  armorType: ArmorType;
  baseAC: number;
  maxDexBonus?: number;  // undefined = no limit, 0 = no dex bonus
  stealthDisadvantage: boolean;
  strengthRequirement?: number;
}

export interface MagicEffect {
  type: 'bonus' | 'damage' | 'healing' | 'condition' | 'other';
  description: string;
  value?: number | string;
}

export interface MagicItem extends BaseItem {
  type: 'magic';
  attunement: boolean;
  attunementRequirements?: string;
  charges?: {
    current: number;
    max: number;
    recharge: string;  // e.g., "1d6 at dawn"
  };
  effects: MagicEffect[];
  baseItem?: string;  // ID of base weapon/armor if applicable
}

export interface Consumable extends BaseItem {
  type: 'consumable';
  consumableType: 'potion' | 'scroll' | 'food' | 'ammunition' | 'other';
  uses: number;
  effect: string;
}

export interface AdventuringGear extends BaseItem {
  type: 'gear';
  gearType: 'tool' | 'kit' | 'container' | 'general';
}

export type Item = Weapon | Armor | MagicItem | Consumable | AdventuringGear;

export interface InventoryItem {
  item?: Item;  // Full item data (optional for flexibility)
  id: string;   // Item ID for reference
  name: string; // Display name
  quantity: number;
  equipped?: boolean;
  attuned?: boolean;
  description?: string;
}

/**
 * Character's home base - stores equipment between adventures
 */
export interface CharacterBase {
  name: string;
  location: string;
  stash: InventoryItem[];      // Items stored at base
  goldVault: number;           // Gold stored safely
  trophies: Trophy[];          // Memorable items from adventures
  upgrades: BaseUpgrade[];     // Purchased base improvements
}

export interface Trophy {
  id: string;
  name: string;
  description: string;
  campaignName: string;
  obtainedAt: string;
}

export interface BaseUpgrade {
  id: string;
  name: string;
  description: string;
  effect: string;
  purchasedAt: string;
}

export type EquipmentSlot =
  | 'mainHand'
  | 'offHand'
  | 'armor'
  | 'head'
  | 'neck'
  | 'ring1'
  | 'ring2'
  | 'hands'
  | 'waist'
  | 'feet'
  | 'cloak';

export interface EquippedItems {
  mainHand?: InventoryItem;
  offHand?: InventoryItem;
  armor?: InventoryItem;
  head?: InventoryItem;
  neck?: InventoryItem;
  ring1?: InventoryItem;
  ring2?: InventoryItem;
  hands?: InventoryItem;
  waist?: InventoryItem;
  feet?: InventoryItem;
  cloak?: InventoryItem;
}

// Starting equipment packs
export type EquipmentPack =
  | 'burglar'
  | 'diplomat'
  | 'dungeoneer'
  | 'entertainer'
  | 'explorer'
  | 'priest'
  | 'scholar';

export interface EquipmentPackContents {
  id: EquipmentPack;
  name: string;
  items: { itemId: string; quantity: number }[];
  value: Currency;
}

// Helper to calculate AC
export function calculateAC(
  armor: Armor | undefined,
  shield: boolean,
  dexModifier: number,
  otherBonuses: number = 0
): number {
  let ac = 10 + dexModifier;  // Unarmored default

  if (armor) {
    if (armor.maxDexBonus !== undefined) {
      const effectiveDex = Math.min(dexModifier, armor.maxDexBonus);
      ac = armor.baseAC + effectiveDex;
    } else {
      ac = armor.baseAC + dexModifier;
    }
  }

  if (shield) {
    ac += 2;
  }

  return ac + otherBonuses;
}

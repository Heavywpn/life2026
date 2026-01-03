/**
 * Adventure type definitions for D&D 5e
 */

import type { Skill, Ability, DamageType } from './common.types.js';
import type { Monster } from './monster.types.js';

export interface AdventureMetadata {
  title: string;
  author?: string;
  levelRange: { min: number; max: number };
  partySize: { min: number; max: number };
  estimatedDuration?: string;
  tags: string[];
  description: string;
}

export interface Adventure {
  id: string;
  metadata: AdventureMetadata;
  introduction: string;
  rooms: Map<string, Room>;
  startingRoom: string;
  quests: Quest[];
  npcs: NPC[];
  lootTables: LootTable[];
}

export interface Room {
  id: string;
  name: string;
  description: string;
  firstVisitDescription?: string;  // Shown only on first visit

  // Skill checks available in this room
  skillChecks?: RoomSkillCheck[];

  // Choices/exits
  choices: RoomChoice[];

  // Combat encounter
  encounter?: EncounterDefinition;

  // Trap
  trap?: TrapDefinition;

  // NPC present
  npcId?: string;

  // Loot in room
  loot?: LootDefinition;

  // Environmental effects
  environment?: RoomEnvironment;

  // Triggers/flags
  setsFlags?: string[];
  requiresFlags?: string[];

  // Is this room hidden until discovered?
  hidden?: boolean;
}

export interface RoomSkillCheck {
  skill: Skill;
  dc: number;
  description: string;
  successText: string;
  failureText?: string;
  revealsChoice?: string;  // ID of hidden choice to reveal
  setsFlag?: string;
  grantsXP?: number;
  triggersEncounter?: string;
}

export interface RoomChoice {
  id: string;
  text: string;
  targetRoom: string;
  hidden?: boolean;

  // Requirements
  requiresFlags?: string[];
  requiresSkillCheck?: {
    skill: Skill;
    dc: number;
    failureRoom?: string;  // Where to go on failure
    failureText?: string;
  };
  requiresItem?: string;

  // Consequences
  setsFlags?: string[];
  removesItem?: string;
  triggersEncounter?: boolean;
  triggersTrap?: boolean;
  dialogue?: string;
}

export interface EncounterDefinition {
  id: string;
  name: string;
  description?: string;
  monsters: EncounterMonster[];
  environment?: string;
  tactics?: string;

  // Rewards
  xpReward?: number;  // Override calculated XP
  lootTableId?: string;
  guaranteedLoot?: string[];

  // Flags
  setsFlags?: string[];
  requiresFlags?: string[];

  // Can encounter be avoided/skipped?
  optional?: boolean;
  avoidSkill?: Skill;
  avoidDC?: number;
}

export interface EncounterMonster {
  monsterId: string;
  count: number;
  name?: string;  // Override monster name (e.g., "Goblin Boss" instead of "Goblin")
  maxHP?: number;  // Override HP
}

export interface TrapDefinition {
  id: string;
  name: string;
  description: string;

  // Detection
  detectionSkill: Skill;
  detectionDC: number;
  detectedText: string;

  // Disarm
  disarmSkill?: Skill;
  disarmDC?: number;
  disarmedText?: string;

  // Trigger and effects
  triggerCondition: string;
  savingThrow: {
    ability: Ability;
    dc: number;
  };
  damage: string;
  damageType: DamageType;
  onSaveHalf: boolean;
  additionalEffects?: string;

  // State
  triggered?: boolean;
  disarmed?: boolean;
}

export interface NPC {
  id: string;
  name: string;
  description: string;
  race?: string;
  occupation?: string;
  personality: string;
  motivation: string;
  secrets?: string[];

  // Dialogue
  greeting: string;
  dialogueOptions: DialogueOption[];

  // Quest giver?
  questId?: string;

  // Shop?
  shop?: NPCShop;

  // Combat stats if hostile
  hostileStats?: {
    monsterId: string;
    alwaysHostile?: boolean;
    hostileCondition?: string;
  };
}

export interface DialogueOption {
  id: string;
  text: string;
  response: string;
  requiresFlags?: string[];
  setsFlags?: string[];
  endsConversation?: boolean;
  leadsTo?: string[];  // Other dialogue option IDs
  startsQuest?: string;
  completeQuest?: string;
  giveItem?: string;
  requiresItem?: string;
}

export interface NPCShop {
  name: string;
  greeting: string;
  inventory: ShopItem[];
  buybackRate: number;  // 0.5 = 50% of value
}

export interface ShopItem {
  itemId: string;
  quantity: number | 'unlimited';
  priceOverride?: number;  // GP
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  questGiverId?: string;
  objectives: QuestObjective[];
  rewards: QuestReward;
  status: 'available' | 'active' | 'completed' | 'failed';
  requiredForMainQuest?: boolean;
}

export interface QuestObjective {
  id: string;
  description: string;
  type: 'kill' | 'collect' | 'explore' | 'talk' | 'escort' | 'custom';
  target?: string;
  targetCount?: number;
  currentCount: number;
  completed: boolean;
  optional?: boolean;
}

export interface QuestReward {
  xp: number;
  gold?: number;
  items?: string[];
  reputation?: { faction: string; amount: number };
}

export interface LootTable {
  id: string;
  name: string;
  entries: LootEntry[];
}

export interface LootEntry {
  itemId: string;
  quantity: number | { min: number; max: number };
  weight: number;  // Relative probability
  minCR?: number;  // Only appears at this CR or higher
}

export interface LootDefinition {
  tableId?: string;
  fixed?: { itemId: string; quantity: number }[];
  gold?: { min: number; max: number };
}

export interface RoomEnvironment {
  lighting: 'bright' | 'dim' | 'dark';
  difficultTerrain?: boolean;
  hazard?: {
    name: string;
    description: string;
    damage?: string;
    damageType?: DamageType;
    saveDC?: number;
    saveAbility?: Ability;
  };
}

// Adventure progress/state
export interface AdventureProgress {
  adventureId: string;
  currentRoomId: string;
  visitedRooms: string[];
  flags: Set<string>;
  encounteredNPCs: string[];
  completedEncounters: string[];
  disarmedTraps: string[];
  quests: Map<string, Quest>;
  startedAt: string;
  playTime: number;  // Seconds
}

// Procedural dungeon
export interface ProceduralDungeonConfig {
  theme: DungeonTheme;
  size: 'small' | 'medium' | 'large';
  partyLevel: number;
  partySize: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'deadly';
  seed?: number;
  hasBoss?: boolean;
  treasureLevel?: 'poor' | 'standard' | 'rich';
}

export type DungeonTheme =
  | 'cave'
  | 'crypt'
  | 'dungeon'
  | 'forest'
  | 'ruins'
  | 'sewer'
  | 'temple'
  | 'tower'
  | 'mansion';

export interface GeneratedDungeon {
  id: string;
  name: string;
  theme: DungeonTheme;
  rooms: Room[];
  encounters: EncounterDefinition[];
  traps: TrapDefinition[];
  treasures: LootDefinition[];
  bossEncounter?: EncounterDefinition;
  totalXP: number;
  estimatedGold: number;
}

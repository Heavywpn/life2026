/**
 * Combat type definitions for D&D 5e
 */

import type { DamageType, Condition, Ability } from './common.types.js';
import type { Character } from './character.types.js';
import type { Monster } from './monster.types.js';
import type { Spell } from './spell.types.js';
import type { Weapon } from './item.types.js';
import type { DiceRoll } from '../core/dice.js';

export interface CombatParticipant {
  id: string;
  name: string;
  initiative: number;
  initiativeBonus: number;

  // One of these will be set
  character?: Character;
  monster?: Monster;

  // Combat state
  currentHP: number;
  maxHP: number;
  temporaryHP: number;
  armorClass: number;

  // Conditions
  conditions: ActiveCombatCondition[];

  // Concentration
  concentratingOn?: string;  // Spell name

  // Reactions
  reactionUsed: boolean;

  // Legendary actions (for monsters)
  legendaryActionsRemaining?: number;

  // Is this participant controlled by player?
  isPlayer: boolean;
  isAlly: boolean;

  // Death saves (for player characters only)
  deathSaves?: {
    successes: number;
    failures: number;
  };
}

export interface ActiveCombatCondition {
  condition: Condition;
  duration: number | 'indefinite';  // Rounds remaining
  source: string;  // Who/what applied this
  endTrigger?: 'start' | 'end';  // Start or end of whose turn?
  saveDC?: number;
  saveAbility?: Ability;
}

export interface CombatEnvironment {
  name: string;
  description?: string;
  lightLevel: 'bright' | 'dim' | 'darkness';
  difficultTerrain: boolean;
  hazards?: EnvironmentHazard[];
  coverAvailable: boolean;
}

export interface EnvironmentHazard {
  name: string;
  description: string;
  damage?: string;
  damageType?: DamageType;
  saveDC?: number;
  saveAbility?: Ability;
}

export interface CombatState {
  id: string;
  round: number;
  turnIndex: number;
  initiativeOrder: CombatParticipant[];
  environment?: CombatEnvironment;
  isActive: boolean;
  startedAt: string;
  log: CombatLogEntry[];
}

export interface CombatLogEntry {
  round: number;
  turn: number;
  actor: string;
  action: string;
  target?: string;
  result: string;
  timestamp: string;
}

export type CombatActionType =
  | 'attack'
  | 'cast-spell'
  | 'dash'
  | 'disengage'
  | 'dodge'
  | 'help'
  | 'hide'
  | 'ready'
  | 'search'
  | 'use-item'
  | 'other';

export interface CombatAction {
  type: CombatActionType;
  actor: CombatParticipant;
  target?: CombatParticipant | CombatParticipant[];
  spell?: Spell;
  weapon?: Weapon;
  item?: string;
  description?: string;
}

export interface AttackResult {
  attacker: string;
  target: string;
  attackRoll: DiceRoll;
  targetAC: number;
  hit: boolean;
  critical: boolean;
  criticalFail: boolean;
  damage?: DiceRoll;
  damageType?: DamageType;
  bonusDamage?: { roll: DiceRoll; type: DamageType }[];
  totalDamage: number;
  targetCurrentHP: number;
  targetDown: boolean;
}

export interface SpellResult {
  caster: string;
  spell: string;
  spellLevel: number;
  slotUsed: number;
  targets: SpellTargetResult[];
  concentration: boolean;
  description: string;
}

export interface SpellTargetResult {
  target: string;
  savingThrow?: {
    ability: Ability;
    dc: number;
    roll: DiceRoll;
    success: boolean;
  };
  damage?: DiceRoll;
  damageType?: DamageType;
  healing?: DiceRoll;
  conditionApplied?: Condition;
  effect?: string;
}

export interface TurnActions {
  action: boolean;
  bonusAction: boolean;
  movement: number;  // Feet remaining
  reaction: boolean;
  freeAction: boolean;
}

export interface CombatTurn {
  participant: CombatParticipant;
  actionsRemaining: TurnActions;
  actionsLog: string[];
}

// Combat summary at end
export interface CombatSummary {
  combatId: string;
  rounds: number;
  duration: number;  // Seconds (real time)
  victory: boolean;
  xpEarned: number;
  monstersDefeated: string[];
  playersDown: string[];
  loot?: string[];
}

// Helper functions
export function isDown(participant: CombatParticipant): boolean {
  return participant.currentHP <= 0;
}

export function isDead(participant: CombatParticipant): boolean {
  if (!participant.isPlayer) {
    return participant.currentHP <= 0;
  }
  // Players can have death saves
  return participant.deathSaves?.failures === 3;
}

export function isStable(participant: CombatParticipant): boolean {
  if (!participant.isPlayer) return false;
  return participant.currentHP === 0 && participant.deathSaves?.successes === 3;
}

export function getCurrentTurnParticipant(combat: CombatState): CombatParticipant | undefined {
  if (!combat.isActive || combat.initiativeOrder.length === 0) {
    return undefined;
  }
  return combat.initiativeOrder[combat.turnIndex];
}

export function getNextTurnParticipant(combat: CombatState): CombatParticipant | undefined {
  if (!combat.isActive || combat.initiativeOrder.length === 0) {
    return undefined;
  }
  const nextIndex = (combat.turnIndex + 1) % combat.initiativeOrder.length;
  return combat.initiativeOrder[nextIndex];
}

export function sortByInitiative(participants: CombatParticipant[]): CombatParticipant[] {
  return [...participants].sort((a, b) => {
    // Higher initiative goes first
    if (b.initiative !== a.initiative) {
      return b.initiative - a.initiative;
    }
    // Tie-breaker: higher dex bonus goes first
    return b.initiativeBonus - a.initiativeBonus;
  });
}

/**
 * D&D 5e Dice Rolling System
 * Supports standard notation: 2d6+4, 1d20, 4d6kh3 (keep highest 3), 2d20kl1 (keep lowest 1)
 */

export interface DiceRoll {
  notation: string;
  dice: number;
  sides: number;
  rolls: number[];
  keptRolls: number[];
  modifier: number;
  total: number;
  criticalHit: boolean;
  criticalFail: boolean;
}

export interface RollOptions {
  advantage?: boolean;
  disadvantage?: boolean;
}

// Dice notation regex: XdY[kh/kl Z][+/-M]
// Examples: 2d6, 1d20+5, 4d6kh3, 2d20kl1+2
const DICE_REGEX = /^(\d+)?d(\d+)(?:k([hl])(\d+))?([+-]\d+)?$/i;

/**
 * Roll a single die with the given number of sides
 */
export function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Parse and roll dice notation
 * @param notation - Dice notation string (e.g., "2d6+4", "4d6kh3")
 * @returns DiceRoll result object
 */
export function roll(notation: string): DiceRoll {
  const cleanNotation = notation.toLowerCase().replace(/\s/g, '');
  const match = cleanNotation.match(DICE_REGEX);

  if (!match) {
    throw new Error(`Invalid dice notation: ${notation}`);
  }

  const [, diceCountStr, sidesStr, keepType, keepCountStr, modifierStr] = match;

  const diceCount = parseInt(diceCountStr || '1', 10);
  const sides = parseInt(sidesStr, 10);
  const keepCount = keepCountStr ? parseInt(keepCountStr, 10) : diceCount;
  const modifier = modifierStr ? parseInt(modifierStr, 10) : 0;

  // Roll all dice
  const rolls: number[] = [];
  for (let i = 0; i < diceCount; i++) {
    rolls.push(rollDie(sides));
  }

  // Determine which rolls to keep
  let keptRolls: number[];
  if (keepType === 'h') {
    // Keep highest
    keptRolls = [...rolls].sort((a, b) => b - a).slice(0, keepCount);
  } else if (keepType === 'l') {
    // Keep lowest
    keptRolls = [...rolls].sort((a, b) => a - b).slice(0, keepCount);
  } else {
    keptRolls = rolls;
  }

  const rollSum = keptRolls.reduce((sum, r) => sum + r, 0);
  const total = rollSum + modifier;

  // Check for critical hit/fail (only on d20 with single die kept)
  const criticalHit = sides === 20 && keptRolls.length === 1 && keptRolls[0] === 20;
  const criticalFail = sides === 20 && keptRolls.length === 1 && keptRolls[0] === 1;

  return {
    notation,
    dice: diceCount,
    sides,
    rolls,
    keptRolls,
    modifier,
    total,
    criticalHit,
    criticalFail,
  };
}

/**
 * Roll a d20 with optional modifier
 */
export function rollD20(modifier: number = 0): DiceRoll {
  const notation = modifier === 0 ? '1d20' : `1d20${modifier >= 0 ? '+' : ''}${modifier}`;
  return roll(notation);
}

/**
 * Roll with advantage (roll 2d20, keep highest)
 */
export function rollWithAdvantage(modifier: number = 0): DiceRoll {
  const notation = modifier === 0 ? '2d20kh1' : `2d20kh1${modifier >= 0 ? '+' : ''}${modifier}`;
  return roll(notation);
}

/**
 * Roll with disadvantage (roll 2d20, keep lowest)
 */
export function rollWithDisadvantage(modifier: number = 0): DiceRoll {
  const notation = modifier === 0 ? '2d20kl1' : `2d20kl1${modifier >= 0 ? '+' : ''}${modifier}`;
  return roll(notation);
}

/**
 * Roll for initiative
 */
export function rollInitiative(dexModifier: number = 0): DiceRoll {
  return rollD20(dexModifier);
}

/**
 * Roll damage with optional critical multiplier
 * @param notation - Base damage notation (e.g., "2d6+4")
 * @param critical - If true, doubles the dice (not modifier)
 */
export function rollDamage(notation: string, critical: boolean = false): DiceRoll {
  if (!critical) {
    return roll(notation);
  }

  // Parse and double dice for critical
  const cleanNotation = notation.toLowerCase().replace(/\s/g, '');
  const match = cleanNotation.match(DICE_REGEX);

  if (!match) {
    throw new Error(`Invalid dice notation: ${notation}`);
  }

  const [, diceCountStr, sidesStr, , , modifierStr] = match;
  const diceCount = parseInt(diceCountStr || '1', 10);
  const doubledNotation = `${diceCount * 2}d${sidesStr}${modifierStr || ''}`;

  return roll(doubledNotation);
}

/**
 * Roll ability scores using 4d6 drop lowest method
 * Returns array of 6 scores
 */
export function rollAbilityScores(): number[] {
  const scores: number[] = [];
  for (let i = 0; i < 6; i++) {
    const result = roll('4d6kh3');
    scores.push(result.total);
  }
  return scores;
}

/**
 * Standard array for ability score assignment
 */
export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

/**
 * Point buy system - returns points remaining and validates
 */
export function calculatePointBuyCost(score: number): number {
  if (score < 8 || score > 15) {
    throw new Error('Point buy scores must be between 8 and 15');
  }
  const costs: Record<number, number> = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9,
  };
  return costs[score];
}

export function validatePointBuy(scores: number[]): { valid: boolean; pointsUsed: number; pointsRemaining: number } {
  const POINT_BUY_TOTAL = 27;
  const pointsUsed = scores.reduce((sum, score) => sum + calculatePointBuyCost(score), 0);
  return {
    valid: pointsUsed <= POINT_BUY_TOTAL,
    pointsUsed,
    pointsRemaining: POINT_BUY_TOTAL - pointsUsed,
  };
}

/**
 * Calculate ability modifier from score
 */
export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

/**
 * Format modifier as string (+X or -X)
 */
export function formatModifier(modifier: number): string {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

/**
 * Format a dice roll result for display
 */
export function formatRoll(result: DiceRoll): string {
  const parts: string[] = [];

  // Show individual rolls
  if (result.rolls.length > 1) {
    const rollsStr = result.rolls.map((r, i) => {
      const kept = result.keptRolls.includes(r);
      return kept ? `${r}` : `~~${r}~~`;
    }).join(', ');
    parts.push(`[${rollsStr}]`);
  } else {
    parts.push(`[${result.rolls[0]}]`);
  }

  // Show modifier
  if (result.modifier !== 0) {
    parts.push(result.modifier > 0 ? `+ ${result.modifier}` : `- ${Math.abs(result.modifier)}`);
  }

  // Show total
  parts.push(`= ${result.total}`);

  // Add critical indicators
  if (result.criticalHit) {
    parts.push('CRITICAL HIT!');
  } else if (result.criticalFail) {
    parts.push('CRITICAL FAIL!');
  }

  return parts.join(' ');
}

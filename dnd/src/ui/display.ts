/**
 * Terminal display utilities for the D&D CLI
 */

import chalk from 'chalk';
import boxen from 'boxen';

// Color scheme
export const colors = {
  title: chalk.bold.yellow,
  header: chalk.bold.white,
  subheader: chalk.bold.cyan,
  success: chalk.green,
  danger: chalk.red,
  warning: chalk.yellow,
  info: chalk.cyan,
  muted: chalk.gray,
  gold: chalk.yellow,
  silver: chalk.white,
  damage: chalk.red,
  healing: chalk.green,
  magic: chalk.magenta,
  critical: chalk.bold.red,
  miss: chalk.gray,
};

// HP color based on percentage
export function hpColor(current: number, max: number): (text: string) => string {
  const percentage = current / max;
  if (percentage > 0.5) return chalk.green;
  if (percentage > 0.25) return chalk.yellow;
  return chalk.red;
}

// HP bar visualization
export function hpBar(current: number, max: number, width: number = 20): string {
  const percentage = Math.max(0, Math.min(1, current / max));
  const filled = Math.round(percentage * width);
  const empty = width - filled;

  const bar = '█'.repeat(filled) + '░'.repeat(empty);
  const color = hpColor(current, max);

  return color(bar);
}

// Display functions
export function showTitle(text: string): void {
  console.log();
  console.log(colors.title('═'.repeat(60)));
  console.log(colors.title(`  ${text}`));
  console.log(colors.title('═'.repeat(60)));
  console.log();
}

export function showHeader(text: string): void {
  console.log();
  console.log(colors.header(`── ${text} ──`));
  console.log();
}

export function showSubheader(text: string): void {
  console.log(colors.subheader(`  ${text}`));
}

export function showBox(content: string, title?: string): void {
  console.log(boxen(content, {
    title: title,
    padding: 1,
    margin: { top: 1, bottom: 1, left: 2, right: 2 },
    borderStyle: 'round',
    borderColor: 'cyan',
  }));
}

export function showDivider(): void {
  console.log(colors.muted('─'.repeat(50)));
}

export function showError(message: string): void {
  console.log(colors.danger(`✗ ${message}`));
}

export function showSuccess(message: string): void {
  console.log(colors.success(`✓ ${message}`));
}

export function showWarning(message: string): void {
  console.log(colors.warning(`⚠ ${message}`));
}

export function showInfo(message: string): void {
  console.log(colors.info(`ℹ ${message}`));
}

// Ability score display
export function formatAbilityScore(name: string, score: number, modifier: number): string {
  const modStr = modifier >= 0 ? `+${modifier}` : `${modifier}`;
  return `${name.toUpperCase().padEnd(3)} ${String(score).padStart(2)} (${modStr})`;
}

// Dice roll display
export function showDiceRoll(
  notation: string,
  rolls: number[],
  keptRolls: number[],
  modifier: number,
  total: number,
  critical?: 'hit' | 'fail'
): void {
  let rollsDisplay = rolls.map(r => {
    if (keptRolls.includes(r)) {
      return chalk.white.bold(r);
    }
    return chalk.gray.strikethrough(r);
  }).join(', ');

  let modDisplay = '';
  if (modifier !== 0) {
    modDisplay = modifier > 0 ? ` + ${modifier}` : ` - ${Math.abs(modifier)}`;
  }

  let resultLine = `  🎲 ${notation}: [${rollsDisplay}]${modDisplay} = ${colors.header(String(total))}`;

  if (critical === 'hit') {
    resultLine += colors.critical(' CRITICAL HIT!');
  } else if (critical === 'fail') {
    resultLine += colors.danger(' CRITICAL FAIL!');
  }

  console.log(resultLine);
}

// Combat display
export function showCombatHeader(round: number): void {
  console.log();
  console.log(colors.warning(`══════════════════════════════════════════════════════════`));
  console.log(colors.warning(`                    ⚔️  ROUND ${round}  ⚔️`));
  console.log(colors.warning(`══════════════════════════════════════════════════════════`));
  console.log();
}

export function showInitiativeOrder(
  participants: { name: string; initiative: number; hp: number; maxHp: number; isPlayer: boolean }[],
  currentIndex: number
): void {
  console.log(colors.header('Initiative Order:'));
  participants.forEach((p, i) => {
    const marker = i === currentIndex ? colors.gold('▶ ') : '  ';
    const hpDisplay = `[${hpBar(p.hp, p.maxHp, 10)}] ${p.hp}/${p.maxHp}`;
    const nameColor = p.isPlayer ? chalk.cyan : chalk.red;
    console.log(`${marker}${String(p.initiative).padStart(2)} ${nameColor(p.name.padEnd(20))} ${hpDisplay}`);
  });
  console.log();
}

export function showAttackResult(
  attacker: string,
  target: string,
  roll: number,
  targetAC: number,
  hit: boolean,
  damage?: number,
  damageType?: string,
  critical?: boolean
): void {
  const hitMiss = hit ? colors.success('HIT') : colors.miss('MISS');
  console.log(`  ${attacker} attacks ${target}: ${roll} vs AC ${targetAC} - ${hitMiss}`);
  if (hit && damage !== undefined) {
    const dmgColor = critical ? colors.critical : colors.damage;
    const critText = critical ? ' (CRITICAL!)' : '';
    console.log(`    ${dmgColor(`${damage} ${damageType || ''} damage`)}${critText}`);
  }
}

// Loot display
export function showLoot(items: { name: string; quantity: number }[], gold?: number): void {
  console.log(colors.gold('✦ LOOT ✦'));
  if (gold && gold > 0) {
    console.log(`  ${colors.gold(`${gold} gold pieces`)}`);
  }
  items.forEach(item => {
    const qty = item.quantity > 1 ? ` (x${item.quantity})` : '';
    console.log(`  • ${item.name}${qty}`);
  });
}

// Room description
export function showRoomDescription(name: string, description: string): void {
  console.log();
  console.log(colors.title(`📍 ${name}`));
  console.log();
  // Word wrap description at 70 characters
  const words = description.split(' ');
  let line = '';
  for (const word of words) {
    if (line.length + word.length + 1 > 70) {
      console.log(`  ${line}`);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) {
    console.log(`  ${line}`);
  }
  console.log();
}

// Choices display
export function showChoices(choices: { text: string; hidden?: boolean }[]): void {
  console.log(colors.header('What do you do?'));
  choices.filter(c => !c.hidden).forEach((choice, i) => {
    console.log(`  ${colors.info(`[${i + 1}]`)} ${choice.text}`);
  });
  console.log();
}

// ASCII art dice faces
const DICE_FACES: Record<number, string[]> = {
  1: [
    '┌─────┐',
    '│     │',
    '│  ●  │',
    '│     │',
    '└─────┘',
  ],
  2: [
    '┌─────┐',
    '│ ●   │',
    '│     │',
    '│   ● │',
    '└─────┘',
  ],
  3: [
    '┌─────┐',
    '│ ●   │',
    '│  ●  │',
    '│   ● │',
    '└─────┘',
  ],
  4: [
    '┌─────┐',
    '│ ● ● │',
    '│     │',
    '│ ● ● │',
    '└─────┘',
  ],
  5: [
    '┌─────┐',
    '│ ● ● │',
    '│  ●  │',
    '│ ● ● │',
    '└─────┘',
  ],
  6: [
    '┌─────┐',
    '│ ● ● │',
    '│ ● ● │',
    '│ ● ● │',
    '└─────┘',
  ],
};

export function showD6Face(value: number): void {
  const face = DICE_FACES[value];
  if (face) {
    face.forEach(line => console.log(`  ${line}`));
  }
}

export function showD6Faces(values: number[]): void {
  const faces = values.map(v => DICE_FACES[Math.min(6, Math.max(1, v))] || DICE_FACES[1]);

  // Print faces side by side
  for (let row = 0; row < 5; row++) {
    const line = faces.map(f => f[row]).join('  ');
    console.log(`  ${line}`);
  }
}

// Welcome banner
export function showWelcomeBanner(): void {
  const banner = `
   ____  ___   ____    ____ _     ___
  |  _ \\( _ ) |  _ \\  / ___| |   |_ _|
  | | | / _ \\/\\ | | || |   | |    | |
  | |_| | (_>  < |_| || |___| |___ | |
  |____/ \\___/\\/____/  \\____|_____|___|

        ⚔️  ADVENTURE AWAITS  ⚔️
`;
  console.log(colors.gold(banner));
}

// Clear screen
export function clearScreen(): void {
  console.clear();
}

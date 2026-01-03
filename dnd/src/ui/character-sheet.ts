/**
 * Character sheet display for terminal
 */

import chalk from 'chalk';
import type { Character } from '../models/character.types.js';
import type { Ability, Skill } from '../models/common.types.js';
import { ABILITY_ABBREVIATIONS, SKILL_ABILITIES, SKILL_NAMES } from '../models/common.types.js';
import { getAbilityModifier, getSkillModifier, getSavingThrowModifier } from '../models/character.types.js';
import { formatModifier } from '../core/dice.js';
import { hpBar, colors } from './display.js';

const BOX_WIDTH = 66;

function line(char: string = '─'): string {
  return char.repeat(BOX_WIDTH);
}

function padCenter(text: string, width: number): string {
  const stripped = text.replace(/\x1b\[[0-9;]*m/g, '');
  const padding = Math.max(0, width - stripped.length);
  const left = Math.floor(padding / 2);
  const right = padding - left;
  return ' '.repeat(left) + text + ' '.repeat(right);
}

function padRight(text: string, width: number): string {
  const stripped = text.replace(/\x1b\[[0-9;]*m/g, '');
  const padding = Math.max(0, width - stripped.length);
  return text + ' '.repeat(padding);
}

export function displayCharacterSheet(character: Character): void {
  const modifiers: Record<Ability, number> = {
    strength: getAbilityModifier(character.abilityScores.strength),
    dexterity: getAbilityModifier(character.abilityScores.dexterity),
    constitution: getAbilityModifier(character.abilityScores.constitution),
    intelligence: getAbilityModifier(character.abilityScores.intelligence),
    wisdom: getAbilityModifier(character.abilityScores.wisdom),
    charisma: getAbilityModifier(character.abilityScores.charisma),
  };

  console.log();
  console.log(chalk.yellow('╔' + '═'.repeat(BOX_WIDTH) + '╗'));

  // Character name and basic info
  const title = `${character.name} - Level ${character.level} ${character.race.raceId} ${character.class.classId}`;
  console.log(chalk.yellow('║') + chalk.bold.white(padCenter(title.toUpperCase(), BOX_WIDTH)) + chalk.yellow('║'));

  console.log(chalk.yellow('╠' + '═'.repeat(BOX_WIDTH) + '╣'));

  // HP and core stats
  const hpDisplay = `HP: ${hpBar(character.currentHitPoints, character.maxHitPoints, 12)} ${character.currentHitPoints}/${character.maxHitPoints}`;
  const statsLine = `AC: ${character.armorClass}    Speed: ${character.speed}ft    Prof: +${character.proficiencyBonus}`;
  console.log(chalk.yellow('║') + '  ' + padRight(hpDisplay, 32) + padRight(statsLine, 32) + chalk.yellow('║'));

  if (character.temporaryHitPoints > 0) {
    console.log(chalk.yellow('║') + '  ' + padRight(chalk.cyan(`Temp HP: ${character.temporaryHitPoints}`), BOX_WIDTH) + chalk.yellow('║'));
  }

  console.log(chalk.yellow('╠' + '═'.repeat(BOX_WIDTH) + '╣'));

  // Ability scores
  console.log(chalk.yellow('║') + chalk.bold('  ABILITY SCORES' + ' '.repeat(BOX_WIDTH - 16)) + chalk.yellow('║'));

  const abilities: Ability[] = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
  const abilityLine = abilities.map(ability => {
    const score = character.abilityScores[ability];
    const mod = modifiers[ability];
    return `${ABILITY_ABBREVIATIONS[ability]} ${String(score).padStart(2)} (${formatModifier(mod)})`;
  }).join('  ');

  console.log(chalk.yellow('║') + '  ' + padRight(abilityLine, BOX_WIDTH) + chalk.yellow('║'));

  console.log(chalk.yellow('╠' + '═'.repeat(BOX_WIDTH) + '╣'));

  // Saving throws
  const savesProficient = character.savingThrowProficiencies;
  const savesLine = abilities.map(ability => {
    const mod = getSavingThrowModifier(character, ability);
    const profMarker = savesProficient.includes(ability) ? chalk.green('●') : chalk.gray('○');
    return `${profMarker} ${ABILITY_ABBREVIATIONS[ability]} ${formatModifier(mod)}`;
  }).join('  ');

  console.log(chalk.yellow('║') + chalk.bold('  SAVING THROWS' + ' '.repeat(BOX_WIDTH - 15)) + chalk.yellow('║'));
  console.log(chalk.yellow('║') + '  ' + padRight(savesLine, BOX_WIDTH) + chalk.yellow('║'));

  console.log(chalk.yellow('╠' + '═'.repeat(BOX_WIDTH) + '╣'));

  // Skills (in two columns)
  console.log(chalk.yellow('║') + chalk.bold('  SKILLS' + ' '.repeat(BOX_WIDTH - 8)) + chalk.yellow('║'));

  const allSkills: Skill[] = Object.keys(SKILL_NAMES) as Skill[];
  const halfLength = Math.ceil(allSkills.length / 2);
  const leftSkills = allSkills.slice(0, halfLength);
  const rightSkills = allSkills.slice(halfLength);

  for (let i = 0; i < halfLength; i++) {
    const leftSkill = leftSkills[i];
    const rightSkill = rightSkills[i];

    let leftStr = '';
    if (leftSkill) {
      const leftMod = getSkillModifier(character, leftSkill, SKILL_ABILITIES[leftSkill]);
      const leftProf = character.skillProficiencies.includes(leftSkill);
      const leftExp = character.skillExpertise.includes(leftSkill);
      const leftMarker = leftExp ? chalk.yellow('★') : leftProf ? chalk.green('●') : chalk.gray('○');
      leftStr = `${leftMarker} ${SKILL_NAMES[leftSkill].padEnd(18)} ${formatModifier(leftMod)}`;
    }

    let rightStr = '';
    if (rightSkill) {
      const rightMod = getSkillModifier(character, rightSkill, SKILL_ABILITIES[rightSkill]);
      const rightProf = character.skillProficiencies.includes(rightSkill);
      const rightExp = character.skillExpertise.includes(rightSkill);
      const rightMarker = rightExp ? chalk.yellow('★') : rightProf ? chalk.green('●') : chalk.gray('○');
      rightStr = `${rightMarker} ${SKILL_NAMES[rightSkill].padEnd(18)} ${formatModifier(rightMod)}`;
    }

    console.log(chalk.yellow('║') + '  ' + padRight(leftStr, 28) + '  ' + padRight(rightStr, 28) + '  ' + chalk.yellow('║'));
  }

  console.log(chalk.yellow('╠' + '═'.repeat(BOX_WIDTH) + '╣'));

  // Equipment
  console.log(chalk.yellow('║') + chalk.bold('  EQUIPMENT' + ' '.repeat(BOX_WIDTH - 11)) + chalk.yellow('║'));

  if (character.equippedItems.mainHand) {
    console.log(chalk.yellow('║') + '  ' + padRight(`Main Hand: ${character.equippedItems.mainHand.name}`, BOX_WIDTH) + chalk.yellow('║'));
  }
  if (character.equippedItems.offHand) {
    console.log(chalk.yellow('║') + '  ' + padRight(`Off Hand: ${character.equippedItems.offHand.name}`, BOX_WIDTH) + chalk.yellow('║'));
  }
  if (character.equippedItems.armor) {
    console.log(chalk.yellow('║') + '  ' + padRight(`Armor: ${character.equippedItems.armor.name}`, BOX_WIDTH) + chalk.yellow('║'));
  }

  // Currency
  const { gp, sp, cp, ep, pp } = character.currency;
  const currencyStr = [
    pp > 0 ? `${pp} PP` : '',
    gp > 0 ? `${gp} GP` : '',
    ep > 0 ? `${ep} EP` : '',
    sp > 0 ? `${sp} SP` : '',
    cp > 0 ? `${cp} CP` : '',
  ].filter(Boolean).join(', ') || '0 GP';

  console.log(chalk.yellow('║') + '  ' + padRight(chalk.yellow(`Gold: ${currencyStr}`), BOX_WIDTH) + chalk.yellow('║'));

  // Class features
  if (character.classFeatures.length > 0) {
    console.log(chalk.yellow('╠' + '═'.repeat(BOX_WIDTH) + '╣'));
    console.log(chalk.yellow('║') + chalk.bold('  CLASS FEATURES' + ' '.repeat(BOX_WIDTH - 16)) + chalk.yellow('║'));

    for (const feature of character.classFeatures.slice(0, 5)) {
      console.log(chalk.yellow('║') + '  ' + padRight(`• ${feature.name}`, BOX_WIDTH) + chalk.yellow('║'));
    }

    if (character.classFeatures.length > 5) {
      console.log(chalk.yellow('║') + '  ' + padRight(chalk.gray(`... and ${character.classFeatures.length - 5} more`), BOX_WIDTH) + chalk.yellow('║'));
    }
  }

  // Spellcasting
  if (character.spellcasting) {
    console.log(chalk.yellow('╠' + '═'.repeat(BOX_WIDTH) + '╣'));
    console.log(chalk.yellow('║') + chalk.bold('  SPELLCASTING' + ' '.repeat(BOX_WIDTH - 14)) + chalk.yellow('║'));

    const spellInfo = `Spell Save DC: ${character.spellcasting.spellSaveDC}  |  Spell Attack: +${character.spellcasting.spellAttackBonus}`;
    console.log(chalk.yellow('║') + '  ' + padRight(spellInfo, BOX_WIDTH) + chalk.yellow('║'));

    // Spell slots
    const slots = character.spellcasting.spellSlots;
    const slotDisplay: string[] = [];
    for (let level = 1; level <= 9; level++) {
      const slotInfo = slots[level as keyof typeof slots];
      if (slotInfo.total > 0) {
        const used = slotInfo.used;
        const total = slotInfo.total;
        const remaining = total - used;
        const slotIcons = '●'.repeat(remaining) + '○'.repeat(used);
        slotDisplay.push(`${level}: ${slotIcons}`);
      }
    }

    if (slotDisplay.length > 0) {
      console.log(chalk.yellow('║') + '  ' + padRight(`Slots: ${slotDisplay.join('  ')}`, BOX_WIDTH) + chalk.yellow('║'));
    }

    // Cantrips
    if (character.spellcasting.cantripsKnown.length > 0) {
      const cantrips = character.spellcasting.cantripsKnown.slice(0, 4).join(', ');
      console.log(chalk.yellow('║') + '  ' + padRight(`Cantrips: ${cantrips}`, BOX_WIDTH) + chalk.yellow('║'));
    }
  }

  // Background
  console.log(chalk.yellow('╠' + '═'.repeat(BOX_WIDTH) + '╣'));
  console.log(chalk.yellow('║') + chalk.bold('  BACKGROUND' + ' '.repeat(BOX_WIDTH - 12)) + chalk.yellow('║'));
  console.log(chalk.yellow('║') + '  ' + padRight(character.background.name, BOX_WIDTH) + chalk.yellow('║'));

  if (character.personalityTraits.length > 0) {
    console.log(chalk.yellow('║') + '  ' + padRight(chalk.gray(`Personality: ${character.personalityTraits[0]}`), BOX_WIDTH) + chalk.yellow('║'));
  }

  console.log(chalk.yellow('╚' + '═'.repeat(BOX_WIDTH) + '╝'));
  console.log();
}

export function displayMiniCharacterCard(character: Character): void {
  const hpPct = character.currentHitPoints / character.maxHitPoints;
  const hpColor = hpPct > 0.5 ? chalk.green : hpPct > 0.25 ? chalk.yellow : chalk.red;

  console.log(chalk.cyan('┌' + '─'.repeat(40) + '┐'));
  console.log(chalk.cyan('│') + chalk.bold(` ${character.name}`.padEnd(40)) + chalk.cyan('│'));
  console.log(chalk.cyan('│') + ` Level ${character.level} ${character.race.raceId} ${character.class.classId}`.padEnd(40) + chalk.cyan('│'));
  console.log(chalk.cyan('│') + ` HP: ${hpColor(`${character.currentHitPoints}/${character.maxHitPoints}`)}  AC: ${character.armorClass}`.padEnd(40) + chalk.cyan('│'));
  console.log(chalk.cyan('└' + '─'.repeat(40) + '┘'));
}

/**
 * D&D CLI RPG - Command Line Interface
 */

import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { config } from 'dotenv';
import { roll, rollAbilityScores, STANDARD_ARRAY, getAbilityModifier } from './core/dice.js';
import { runGame } from './core/game-loop.js';
import { runCharacterCreation, showCharacterSummary } from './core/character-creator.js';
import {
  showWelcomeBanner,
  showTitle,
  showHeader,
  showDiceRoll,
  showError,
  showSuccess,
  colors,
  hpBar,
} from './ui/display.js';
import {
  promptDiceNotation,
  promptConfirm,
} from './ui/menus.js';
import { getSaveManager } from './data/save-manager.js';
import { loadWorldState, getWorldSummary, getRecentEvents } from './data/world-state.js';
import type { Character } from './models/character.types.js';
import type { InventoryItem } from './models/item.types.js';
import { ABILITIES, ABILITY_ABBREVIATIONS } from './models/common.types.js';

// Load environment variables
config();

const program = new Command();

program
  .name('dnd')
  .description('D&D 5e CLI RPG - A text-based adventure game')
  .version('1.0.0');

// Main play command - starts the game
program
  .command('play')
  .description('Start or continue a game')
  .option('-c, --character <id>', 'Load specific character')
  .action(async (options) => {
    showWelcomeBanner();

    const saveManager = getSaveManager();
    const savedCharacters = saveManager.listCharacterSaves();

    // Build menu choices dynamically
    const menuChoices: { name: string; value: string }[] = [];

    if (savedCharacters.length > 0) {
      menuChoices.push({
        name: `⚔️  Start Adventure - Choose a character and begin!`,
        value: 'start-adventure',
      });
    }

    menuChoices.push(
      { name: '🆕 Create Character - Build a new hero', value: 'new-character' },
    );

    if (savedCharacters.length > 0) {
      menuChoices.push(
        { name: '📋 View Characters - See your heroes', value: 'view-characters' },
        { name: '🏠 Manage Base - Access your stash', value: 'manage-base' },
      );
    }

    menuChoices.push(
      { name: '🌍 View World - The Shattered Kingdoms', value: 'view-world' },
      { name: '🎲 Roll Dice - Test your luck', value: 'roll-dice' },
      { name: '🚪 Quit', value: 'quit' },
    );

    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'Welcome, Adventurer! What would you like to do?',
        choices: menuChoices,
      },
    ]);

    switch (choice) {
      case 'start-adventure':
        await startAdventure(savedCharacters);
        break;

      case 'new-character':
        const character = await runCharacterCreation();
        if (character) {
          const { startNow } = await inquirer.prompt([
            {
              type: 'confirm',
              name: 'startNow',
              message: 'Start an adventure with this character now?',
              default: true,
            },
          ]);
          if (startNow) {
            await launchAdventure(character);
          }
        }
        break;

      case 'view-characters':
        await viewCharacters(savedCharacters);
        break;

      case 'manage-base':
        await manageBase(savedCharacters);
        break;

      case 'view-world':
        await viewWorld();
        break;

      case 'roll-dice':
        await rollDiceInteractive();
        break;

      case 'quit':
        console.log(colors.muted('\nFarewell, adventurer! May your dice roll true.\n'));
        process.exit(0);
    }
  });

// Character selection and adventure start
async function startAdventure(savedCharacters: any[]): Promise<void> {
  console.log(chalk.cyan('\n  Select a character for your adventure:\n'));

  const { characterId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'characterId',
      message: 'Choose your hero:',
      choices: savedCharacters.map(c => ({
        name: `${c.characterName} - Level ${c.level} ${c.raceName} ${c.className}`,
        value: c.id,
      })),
    },
  ]);

  const saveManager = getSaveManager();
  const save = saveManager.loadCharacter(characterId);

  if (!save) {
    showError('Failed to load character!');
    return;
  }

  await launchAdventure(save.character);
}

async function launchAdventure(character: Character): Promise<void> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    showError('ANTHROPIC_API_KEY not found!');
    console.log(colors.info('\nCreate a .env file with your API key:'));
    console.log(colors.muted('  echo "ANTHROPIC_API_KEY=your-key-here" > .env\n'));
    return;
  }

  const saveManager = getSaveManager();

  // Check for saved adventure session
  const savedSession = saveManager.loadAdventureSession(character.id);

  if (savedSession) {
    console.log(chalk.yellow(`\n  Found saved adventure for ${character.name}!`));
    console.log(chalk.gray(`  Theme: ${savedSession.adventureTheme}`));
    console.log(chalk.gray(`  Turn: ${savedSession.turnCount}`));
    console.log(chalk.gray(`  Saved: ${new Date(savedSession.savedAt).toLocaleString()}\n`));

    const { adventureChoice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'adventureChoice',
        message: 'What would you like to do?',
        choices: [
          { name: '▶️  Continue Adventure - Pick up where you left off', value: 'continue' },
          { name: '🆕 New Adventure - Start a fresh story', value: 'new' },
          { name: '← Back', value: 'back' },
        ],
      },
    ]);

    if (adventureChoice === 'back') {
      return;
    }

    if (adventureChoice === 'continue') {
      await runGame(character, apiKey, savedSession);
      return;
    }

    // New adventure - delete old session
    saveManager.deleteAdventureSession(character.id);
  }

  await runGame(character, apiKey);
}

async function viewCharacters(savedCharacters: any[]): Promise<void> {
  console.clear();
  showTitle('Your Heroes');

  const { characterId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'characterId',
      message: 'Select a character to view:',
      choices: [
        ...savedCharacters.map(c => ({
          name: `${c.characterName} - Level ${c.level} ${c.raceName} ${c.className}`,
          value: c.id,
        })),
        { name: chalk.gray('← Back'), value: 'back' },
      ],
    },
  ]);

  if (characterId === 'back') return;

  const saveManager = getSaveManager();
  const save = saveManager.loadCharacter(characterId);

  if (!save) {
    showError('Failed to load character!');
    return;
  }

  const char = save.character;
  console.clear();
  showTitle(char.name);

  // Show full character details
  console.log(chalk.gray(`  Level ${char.level} ${char.race.raceId} ${char.class.classId}`));
  console.log();

  // Stats
  console.log(chalk.cyan('  Combat Stats:'));
  console.log(`    HP: ${hpBar(char.currentHitPoints, char.maxHitPoints, 15)} ${char.currentHitPoints}/${char.maxHitPoints}`);
  console.log(`    AC: ${char.armorClass}  |  Speed: ${char.speed} ft  |  Initiative: ${char.initiative >= 0 ? '+' : ''}${char.initiative}`);
  console.log();

  // Ability scores
  console.log(chalk.cyan('  Ability Scores:'));
  for (const ability of ABILITIES) {
    const score = char.abilityScores[ability];
    const mod = getAbilityModifier(score);
    const modStr = mod >= 0 ? `+${mod}` : `${mod}`;
    console.log(`    ${ABILITY_ABBREVIATIONS[ability]}: ${score} (${modStr})`);
  }
  console.log();

  // Proficiencies
  console.log(chalk.cyan('  Skill Proficiencies:'));
  console.log(`    ${char.skillProficiencies.join(', ')}`);
  console.log();

  // Class features
  console.log(chalk.cyan('  Class Features:'));
  char.classFeatures.forEach(f => {
    console.log(`    - ${f.name}`);
  });
  console.log();

  // Equipment
  console.log(chalk.cyan('  Equipment:'));
  char.inventory.forEach(item => {
    const equipped = item.equipped ? chalk.green(' [E]') : '';
    console.log(`    - ${item.name}${equipped}`);
  });
  console.log();

  // Currency
  console.log(chalk.cyan('  Currency:'));
  console.log(`    ${chalk.yellow(char.currency.gp + ' gp')} | ${char.currency.sp} sp | ${char.currency.cp} cp`);
  console.log();

  // Campaign history
  if (char.campaignsCompleted) {
    console.log(chalk.cyan('  Campaign History:'));
    console.log(`    Campaigns Completed: ${char.campaignsCompleted}`);
    console.log(`    Monsters Defeated: ${char.totalMonstersDefeated || 0}`);
    console.log(`    Total Gold Earned: ${char.totalGoldEarned || 0}`);
    console.log();
  }

  // Base info
  if (char.base) {
    console.log(chalk.cyan('  Home Base:'));
    console.log(`    ${char.base.name} (${char.base.location})`);
    console.log(`    Stashed Items: ${char.base.stash.length}`);
    console.log(`    Gold Vault: ${char.base.goldVault} gp`);
    console.log();
  }

  // Actions
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: '⚔️  Start Adventure', value: 'adventure' },
        { name: '🏠 Manage Base', value: 'base' },
        { name: '🗑️  Delete Character', value: 'delete' },
        { name: chalk.gray('← Back'), value: 'back' },
      ],
    },
  ]);

  switch (action) {
    case 'adventure':
      await launchAdventure(char);
      break;
    case 'base':
      await manageCharacterBase(char);
      break;
    case 'delete':
      const { confirm } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Are you sure you want to delete ${char.name}? This cannot be undone!`,
          default: false,
        },
      ]);
      if (confirm) {
        saveManager.deleteCharacterSave(characterId);
        console.log(chalk.yellow(`\n  ${char.name} has been deleted.\n`));
      }
      break;
  }
}

async function manageBase(savedCharacters: any[]): Promise<void> {
  console.log(chalk.cyan('\n  Select a character to manage their base:\n'));

  const { characterId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'characterId',
      message: 'Choose a character:',
      choices: [
        ...savedCharacters.map(c => ({
          name: `${c.characterName} - Level ${c.level} ${c.raceName} ${c.className}`,
          value: c.id,
        })),
        { name: chalk.gray('← Back'), value: 'back' },
      ],
    },
  ]);

  if (characterId === 'back') return;

  const saveManager = getSaveManager();
  const save = saveManager.loadCharacter(characterId);

  if (!save) {
    showError('Failed to load character!');
    return;
  }

  await manageCharacterBase(save.character);
}

async function manageCharacterBase(character: Character): Promise<void> {
  const saveManager = getSaveManager();

  // Initialize base if not exists
  if (!character.base) {
    console.log(chalk.cyan('\n  Your character doesn\'t have a base yet!\n'));

    const { createBase } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'createBase',
        message: 'Would you like to establish a home base?',
        default: true,
      },
    ]);

    if (!createBase) return;

    const { baseName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'baseName',
        message: 'Name your base:',
        default: `${character.name}'s Hideout`,
      },
    ]);

    const { location } = await inquirer.prompt([
      {
        type: 'list',
        name: 'location',
        message: 'Where is your base located?',
        choices: [
          { name: 'A modest room at a tavern', value: 'Tavern' },
          { name: 'An abandoned tower outside town', value: 'Tower' },
          { name: 'A hidden cave in the wilderness', value: 'Cave' },
          { name: 'A small cottage in the woods', value: 'Cottage' },
          { name: 'A rented warehouse in the city', value: 'Warehouse' },
        ],
      },
    ]);

    character.base = {
      name: baseName,
      location,
      stash: [],
      goldVault: 0,
      trophies: [],
      upgrades: [],
    };

    character.updatedAt = new Date().toISOString();
    saveManager.saveCharacter(character);
    console.log(chalk.green(`\n  ${baseName} has been established in the ${location}!\n`));
  }

  // Base management menu
  console.clear();
  showTitle(`${character.base.name}`);
  console.log(chalk.gray(`  Location: ${character.base.location}`));
  console.log();

  console.log(chalk.cyan('  Gold Vault:'));
  console.log(`    ${chalk.yellow(character.base.goldVault + ' gp')}`);
  console.log();

  console.log(chalk.cyan('  Stashed Items:'));
  if (character.base.stash.length === 0) {
    console.log(chalk.gray('    (Empty)'));
  } else {
    character.base.stash.forEach(item => {
      console.log(`    - ${item.name} x${item.quantity}`);
    });
  }
  console.log();

  console.log(chalk.cyan('  Trophies:'));
  if (character.base.trophies.length === 0) {
    console.log(chalk.gray('    (None yet - complete adventures to earn trophies!)'));
  } else {
    character.base.trophies.forEach(trophy => {
      console.log(`    - ${trophy.name} (${trophy.campaignName})`);
    });
  }
  console.log();

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: '💰 Deposit Gold', value: 'deposit' },
        { name: '💸 Withdraw Gold', value: 'withdraw' },
        { name: '📦 Stash Items', value: 'stash' },
        { name: '📤 Retrieve Items', value: 'retrieve' },
        { name: chalk.gray('← Back'), value: 'back' },
      ],
    },
  ]);

  switch (action) {
    case 'deposit':
      if (character.currency.gp <= 0) {
        console.log(chalk.yellow('\n  You don\'t have any gold to deposit!\n'));
        break;
      }
      const { depositAmount } = await inquirer.prompt([
        {
          type: 'number',
          name: 'depositAmount',
          message: `How much gold to deposit? (You have ${character.currency.gp} gp)`,
          validate: (input: number) => {
            if (input <= 0) return 'Enter a positive amount';
            if (input > character.currency.gp) return 'You don\'t have that much gold!';
            return true;
          },
        },
      ]);
      character.currency.gp -= depositAmount;
      character.base!.goldVault += depositAmount;
      character.updatedAt = new Date().toISOString();
      saveManager.saveCharacter(character);
      console.log(chalk.green(`\n  Deposited ${depositAmount} gp into your vault!\n`));
      break;

    case 'withdraw':
      if (character.base!.goldVault <= 0) {
        console.log(chalk.yellow('\n  Your vault is empty!\n'));
        break;
      }
      const { withdrawAmount } = await inquirer.prompt([
        {
          type: 'number',
          name: 'withdrawAmount',
          message: `How much gold to withdraw? (Vault has ${character.base!.goldVault} gp)`,
          validate: (input: number) => {
            if (input <= 0) return 'Enter a positive amount';
            if (input > character.base!.goldVault) return 'Not enough gold in vault!';
            return true;
          },
        },
      ]);
      character.base!.goldVault -= withdrawAmount;
      character.currency.gp += withdrawAmount;
      character.updatedAt = new Date().toISOString();
      saveManager.saveCharacter(character);
      console.log(chalk.green(`\n  Withdrew ${withdrawAmount} gp from your vault!\n`));
      break;

    case 'stash':
      const inventoryItems = character.inventory.filter(i => !i.equipped);
      if (inventoryItems.length === 0) {
        console.log(chalk.yellow('\n  No unequipped items to stash!\n'));
        break;
      }
      const { itemsToStash } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'itemsToStash',
          message: 'Select items to stash:',
          choices: inventoryItems.map(i => ({
            name: `${i.name} x${i.quantity}`,
            value: i.id,
          })),
        },
      ]);
      for (const itemId of itemsToStash) {
        const itemIndex = character.inventory.findIndex(i => i.id === itemId);
        if (itemIndex >= 0) {
          const item = character.inventory.splice(itemIndex, 1)[0];
          character.base!.stash.push(item);
        }
      }
      character.updatedAt = new Date().toISOString();
      saveManager.saveCharacter(character);
      console.log(chalk.green(`\n  Items stashed!\n`));
      break;

    case 'retrieve':
      if (character.base!.stash.length === 0) {
        console.log(chalk.yellow('\n  Your stash is empty!\n'));
        break;
      }
      const { itemsToRetrieve } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'itemsToRetrieve',
          message: 'Select items to retrieve:',
          choices: character.base!.stash.map(i => ({
            name: `${i.name} x${i.quantity}`,
            value: i.id,
          })),
        },
      ]);
      for (const itemId of itemsToRetrieve) {
        const itemIndex = character.base!.stash.findIndex(i => i.id === itemId);
        if (itemIndex >= 0) {
          const item = character.base!.stash.splice(itemIndex, 1)[0];
          character.inventory.push(item);
        }
      }
      character.updatedAt = new Date().toISOString();
      saveManager.saveCharacter(character);
      console.log(chalk.green(`\n  Items retrieved!\n`));
      break;
  }
}

async function viewWorld(): Promise<void> {
  const world = loadWorldState();

  console.clear();
  showTitle(world.realmName);
  console.log(chalk.gray(`  Year ${world.currentYear} ${world.currentEra}`));
  console.log();

  // World threat
  if (world.worldThreat) {
    console.log(chalk.red.bold(`  ⚠️  WORLD THREAT: ${world.worldThreat.name}`));
    console.log(chalk.red(`     ${world.worldThreat.description}`));
    console.log(chalk.yellow(`     Status: ${world.worldThreat.level.toUpperCase()}`));
    console.log(chalk.gray(`     First reported by: ${world.worldThreat.introducedBy}`));
    console.log();
  }

  // Stats
  console.log(chalk.cyan('  World Statistics:'));
  console.log(`    Known Locations: ${world.locations.length}`);
  console.log(`    Notable NPCs: ${world.npcs.length}`);
  console.log(`    Recorded Events: ${world.events.length}`);
  console.log(`    Discovered Lore: ${world.lore.length}`);
  console.log();

  // Recent events
  const recentEvents = getRecentEvents(5);
  if (recentEvents.length > 0) {
    console.log(chalk.cyan('  Recent Events:'));
    for (const event of recentEvents) {
      const date = new Date(event.date).toLocaleDateString();
      const impact = event.impact === 'major' ? chalk.red(`[${event.impact}]`) :
                     event.impact === 'significant' ? chalk.yellow(`[${event.impact}]`) :
                     chalk.gray(`[${event.impact}]`);
      console.log(`    ${impact} ${event.title}`);
      console.log(chalk.gray(`       ${event.description.slice(0, 60)}...`));
      console.log(chalk.gray(`       - ${event.characterName}, ${date}`));
      console.log();
    }
  }

  // Menu
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to explore?',
      choices: [
        { name: '📍 View Locations', value: 'locations' },
        { name: '👥 View NPCs', value: 'npcs' },
        { name: '📜 View Lore', value: 'lore' },
        { name: '⚔️  View All Events', value: 'events' },
        { name: chalk.gray('← Back'), value: 'back' },
      ],
    },
  ]);

  switch (action) {
    case 'locations':
      console.log(chalk.cyan('\n  ═══ KNOWN LOCATIONS ═══\n'));
      for (const loc of world.locations) {
        const statusColor = loc.status === 'safe' ? chalk.green :
                           loc.status === 'dangerous' ? chalk.red :
                           loc.status === 'liberated' ? chalk.cyan :
                           chalk.yellow;
        console.log(`  ${chalk.bold(loc.name)} (${loc.type})`);
        console.log(`    Status: ${statusColor(loc.status)}`);
        console.log(chalk.gray(`    ${loc.description.slice(0, 70)}...`));
        console.log(chalk.gray(`    Discovered by: ${loc.discoveredBy}`));
        console.log();
      }
      break;

    case 'npcs':
      console.log(chalk.cyan('\n  ═══ NOTABLE NPCS ═══\n'));
      for (const npc of world.npcs) {
        const dispColor = npc.disposition === 'friendly' ? chalk.green :
                         npc.disposition === 'hostile' ? chalk.red :
                         npc.disposition === 'deceased' ? chalk.gray :
                         chalk.yellow;
        console.log(`  ${chalk.bold(npc.name)}${npc.title ? `, ${npc.title}` : ''}`);
        console.log(`    Disposition: ${dispColor(npc.disposition)}`);
        console.log(chalk.gray(`    ${npc.description.slice(0, 70)}...`));
        console.log(chalk.gray(`    First met by: ${npc.metBy}`));
        console.log();
      }
      break;

    case 'lore':
      console.log(chalk.cyan('\n  ═══ DISCOVERED LORE ═══\n'));
      for (const lore of world.lore) {
        console.log(`  ${chalk.bold(lore.title)} [${lore.category}]`);
        console.log(chalk.gray(`    ${lore.content.slice(0, 100)}...`));
        console.log(chalk.gray(`    Discovered by: ${lore.discoveredBy}`));
        console.log();
      }
      break;

    case 'events':
      console.log(chalk.cyan('\n  ═══ WORLD EVENTS ═══\n'));
      const allEvents = world.events.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      for (const event of allEvents) {
        const date = new Date(event.date).toLocaleDateString();
        const impact = event.impact === 'major' ? chalk.red(`[${event.impact}]`) :
                       event.impact === 'significant' ? chalk.yellow(`[${event.impact}]`) :
                       chalk.gray(`[${event.impact}]`);
        console.log(`  ${impact} ${chalk.bold(event.title)}`);
        console.log(chalk.gray(`    ${event.description}`));
        console.log(chalk.gray(`    By ${event.characterName} - ${date}`));
        console.log();
      }
      break;
  }

  await inquirer.prompt([
    { type: 'input', name: 'continue', message: 'Press Enter to continue...' },
  ]);
}

// Roll dice command
program
  .command('roll [dice]')
  .description('Roll dice (e.g., 2d6+4, 1d20, 4d6kh3)')
  .option('-a, --advantage', 'Roll with advantage (2d20 keep highest)')
  .option('-d, --disadvantage', 'Roll with disadvantage (2d20 keep lowest)')
  .option('-c, --count <n>', 'Number of times to roll', '1')
  .action(async (dice, options) => {
    if (!dice) {
      await rollDiceInteractive();
      return;
    }

    const count = parseInt(options.count, 10) || 1;

    // Handle advantage/disadvantage for d20 rolls
    let notation = dice;
    if (options.advantage && dice.includes('d20')) {
      notation = dice.replace(/(\d*)d20/i, '2d20kh1');
      console.log(colors.info('Rolling with Advantage!'));
    } else if (options.disadvantage && dice.includes('d20')) {
      notation = dice.replace(/(\d*)d20/i, '2d20kl1');
      console.log(colors.warning('Rolling with Disadvantage...'));
    }

    console.log();
    for (let i = 0; i < count; i++) {
      try {
        const result = roll(notation);
        showDiceRoll(
          result.notation,
          result.rolls,
          result.keptRolls,
          result.modifier,
          result.total,
          result.criticalHit ? 'hit' : result.criticalFail ? 'fail' : undefined
        );
      } catch (error) {
        if (error instanceof Error) {
          showError(error.message);
        }
        return;
      }
    }
    console.log();
  });

// Character management commands
program
  .command('new-character')
  .alias('create')
  .description('Create a new character')
  .action(async () => {
    await runCharacterCreation();
  });

program
  .command('characters')
  .alias('list')
  .description('List all saved characters')
  .action(() => {
    const saveManager = getSaveManager();
    const saves = saveManager.listCharacterSaves();

    showHeader('Saved Characters');

    if (saves.length === 0) {
      console.log(colors.muted('  No characters found.'));
      console.log(colors.info('\n  Use "dnd new-character" to create one!\n'));
      return;
    }

    saves.forEach((save, index) => {
      console.log(`  ${index + 1}. ${chalk.bold(save.characterName)}`);
      console.log(`     Level ${save.level} ${save.raceName} ${save.className}`);
      console.log(`     Last played: ${new Date(save.lastPlayed).toLocaleDateString()}`);
      console.log();
    });
  });

// Stats command
program
  .command('stats')
  .description('Show game statistics')
  .action(() => {
    const saveManager = getSaveManager();
    const saves = saveManager.listCharacterSaves();

    showHeader('Game Statistics');

    const totalPlayTime = saves.reduce((sum, s) => sum + s.playTime, 0);
    const hours = Math.floor(totalPlayTime / 3600);
    const minutes = Math.floor((totalPlayTime % 3600) / 60);

    console.log(`  Total play time: ${hours}h ${minutes}m`);
    console.log(`  Characters created: ${saves.length}`);
    console.log();
  });

// Interactive dice rolling
async function rollDiceInteractive(): Promise<void> {
  showHeader('Dice Roller');
  console.log(colors.muted('  Enter dice notation (e.g., 2d6+4, 1d20, 4d6kh3)'));
  console.log(colors.muted('  Type "quit" to exit\n'));

  while (true) {
    try {
      const notation = await promptDiceNotation();

      if (notation === 'quit' || notation === 'exit' || notation === 'q') {
        break;
      }

      const result = roll(notation);
      console.log();
      showDiceRoll(
        result.notation,
        result.rolls,
        result.keptRolls,
        result.modifier,
        result.total,
        result.criticalHit ? 'hit' : result.criticalFail ? 'fail' : undefined
      );
      console.log();
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  }
}

export { program };

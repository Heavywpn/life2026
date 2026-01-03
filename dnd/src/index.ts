#!/usr/bin/env node
/**
 * D&D CLI RPG - Entry Point
 *
 * A text-based D&D 5e role-playing game for the terminal.
 * Features character creation, combat, adventures, and more!
 *
 * Usage:
 *   npm run dev play       - Start the game
 *   npm run dev roll 2d6   - Roll dice
 *   npm run dev --help     - Show all commands
 */

import { program } from './cli.js';

// Run the CLI
program.parse();

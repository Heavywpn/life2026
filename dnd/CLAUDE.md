# D&D CLI RPG

## Overview
A text-based D&D 5e role-playing game for the terminal. Features full character creation, AI-driven adventures with Claude, persistent characters across campaigns, a shared world where all characters exist, and home base management.

## Quick Start

```bash
npm install
npm run dev play           # Start the game (main menu)
npm run dev roll 2d6+4     # Roll dice
npm run dev new-character  # Create a character
npm run dev characters     # List saved characters
npm run dev --help         # Show all commands
```

## Key Features

### Persistent Characters
- Full character creation: race, class, abilities, background, personality
- Characters save to `saves/characters/` and persist between sessions
- Progress carries over: HP, gold, XP, inventory, equipment
- Campaign history tracks monsters defeated, gold earned, campaigns completed

### Shared World (The Shattered Kingdoms)
- All characters exist in the same persistent realm
- World events from one character's adventures affect all others
- AI DM references other heroes' deeds, uses established NPCs/locations
- View world state: locations, NPCs, lore, and recorded events

### Home Base System
- Each character can establish a home base
- **Gold Vault**: Store gold safely between adventures
- **Item Stash**: Store equipment for use in future campaigns
- **Trophies**: Earned for completing adventures

### AI Adventures
- Claude-powered Dungeon Master creates dynamic stories
- Dice rolls, combat, skill checks handled automatically
- Session saves: gold earned, XP, monsters defeated
- Type `save` during play to save progress
- Quit auto-saves your character

## Project Structure

```
dnd/
├── src/                   # TypeScript source
│   ├── index.ts          # Entry point
│   ├── cli.ts            # Commander.js CLI commands
│   ├── core/             # Game engine
│   │   └── dice.ts       # Dice notation parser & roller
│   ├── models/           # TypeScript type definitions
│   ├── data/             # Data loaders and save system
│   ├── adventure/        # Adventure parser and procedural gen
│   └── ui/               # Terminal UI components
├── data/                  # Game data (JSON)
│   ├── classes/          # Class definitions
│   ├── races/            # Race definitions
│   ├── spells/           # Spell database
│   ├── items/            # Weapons, armor, gear
│   └── monsters/         # Monster stat blocks
├── adventures/           # Hand-crafted adventures (Markdown)
└── saves/                # Character and campaign saves
```

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev play` | Main game loop - start or continue |
| `npm run dev roll <dice>` | Roll dice (e.g., `2d6+4`, `1d20`, `4d6kh3`) |
| `npm run dev new-character` | Create a new character |
| `npm run dev characters` | List saved characters |
| `npm run dev adventure <path>` | Start a specific adventure |
| `npm run dev generate --dungeon` | Generate procedural dungeon |

## Dice Notation

The dice system supports standard RPG notation:
- `2d6` - Roll 2 six-sided dice
- `1d20+5` - Roll d20 with +5 modifier
- `4d6kh3` - Roll 4d6, keep highest 3 (ability scores)
- `2d20kl1` - Roll 2d20, keep lowest 1 (disadvantage)

## Adding Content

### New Race
Create `data/races/<race>.json`:
```json
{
  "id": "race-id",
  "name": "Race Name",
  "description": "Description",
  "abilityScoreIncreases": { "dexterity": 2 },
  "size": "Medium",
  "speed": 30,
  "traits": [...]
}
```

### New Class
Create `data/classes/<class>.json`:
```json
{
  "id": "class-id",
  "name": "Class Name",
  "hitDie": 10,
  "features": [...],
  "spellcasting": { ... }
}
```

### New Adventure
Create `adventures/<name>.md`:
```markdown
# Adventure Title

## Metadata
- Level: 1-3
- Party Size: 4

## Room: entrance
### Cave Entrance
**Description:** A dark cave...

**Perception DC 12:** You notice...

**Choices:**
- [Enter] -> main-chamber
- [Search] -> hidden-path (Investigation DC 14)
```

## Architecture Patterns

- **Dice System**: All random mechanics use `src/core/dice.ts`
- **Type Safety**: Full TypeScript with Zod validation
- **Data-Driven**: Game content in JSON files, loaded at runtime
- **CLI Framework**: Commander.js for command routing
- **UI Components**: Chalk for colors, Inquirer for menus

## Development

```bash
npm run dev           # Run with tsx (hot reload)
npm run build         # Compile TypeScript
npm run start         # Run compiled JS
```

## Save File Locations

- Characters: `saves/characters/<id>.json`
- Campaigns: `saves/campaigns/<id>.json`

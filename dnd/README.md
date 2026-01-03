# D&D CLI RPG

A text-based Dungeons & Dragons 5th Edition role-playing game for the terminal. Create characters, explore dungeons, battle monsters, and embark on epic adventures!

```
   ____  ___   ____    ____ _     ___
  |  _ \( _ ) |  _ \  / ___| |   |_ _|
  | | | / _ \/\ | | || |   | |    | |
  | |_| | (_>  < |_| || |___| |___ | |
  |____/ \___/\/____/  \____|_____|___|

        ⚔️  ADVENTURE AWAITS  ⚔️
```

## Features

- **Full Character Creation**: Choose from 9 races and 12 classes with authentic D&D 5e rules
- **Dice Rolling System**: Complete notation support (`2d6+4`, `4d6kh3`, advantage/disadvantage)
- **Turn-Based Combat**: Initiative, attacks, spells, conditions, and tactical decisions
- **Hand-Crafted Adventures**: Markdown-based adventures with branching paths and skill checks
- **Procedural Dungeons**: Endless randomly-generated dungeons with balanced encounters
- **Persistent Saves**: Save and load characters and campaign progress

## Quick Start

```bash
# Install dependencies
npm install

# Start the game!
npm run dev play

# Or roll some dice
npm run dev roll 2d6+4
```

## Commands

| Command | Description |
|---------|-------------|
| `play` | Start or continue a game |
| `roll <dice>` | Roll dice (e.g., `2d6+4`, `1d20`, `4d6kh3`) |
| `new-character` | Create a new character |
| `characters` | List saved characters |
| `adventure <file>` | Play a specific adventure |
| `generate --dungeon` | Generate a random dungeon |

### Dice Notation

- `2d6` - Roll 2 six-sided dice
- `1d20+5` - Roll d20 with modifier
- `4d6kh3` - Roll 4d6, keep highest 3 (ability scores)
- `2d20kl1` - Roll with disadvantage
- `-a` flag - Roll with advantage
- `-d` flag - Roll with disadvantage

## Game Content

### Races
Human, Elf (High/Wood/Dark), Dwarf (Hill/Mountain), Halfling (Lightfoot/Stout), and more!

### Classes
Fighter, Wizard, Rogue, and more coming soon! Each with authentic 5e features and subclasses.

### Adventures
Start with "The Goblin Cave" - a beginner adventure to test your skills!

## Project Structure

```
dnd/
├── src/           # TypeScript game engine
├── data/          # Game data (classes, races, items, monsters)
├── adventures/    # Markdown adventure files
└── saves/         # Character and campaign saves
```

## Development

```bash
npm run dev          # Run with hot reload
npm run build        # Compile TypeScript
npm run start        # Run compiled version
```

## Creating Adventures

Adventures are written in Markdown with special syntax:

```markdown
## Room: tavern-entrance
### The Rusty Sword Tavern

**Description:** A warm glow spills from the windows...

**Perception DC 12:** You notice a hooded figure watching you.

**Choices:**
- [Enter the tavern] -> tavern-interior
- [Investigate the figure] -> mysterious-stranger
```

## License

MIT - Feel free to use, modify, and share!

---

*May your dice roll true, adventurer!* 🎲

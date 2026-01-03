/**
 * Shared World State - All characters exist in the same realm
 * Events from one character's adventures affect the world for all
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SAVES_PATH = join(__dirname, '../../saves');
const WORLD_FILE = join(SAVES_PATH, 'world.json');

export interface WorldLocation {
  id: string;
  name: string;
  type: 'city' | 'town' | 'village' | 'dungeon' | 'wilderness' | 'landmark' | 'ruin';
  description: string;
  discoveredBy: string;  // Character name
  discoveredAt: string;  // ISO date
  status: 'safe' | 'dangerous' | 'destroyed' | 'liberated' | 'corrupted';
  notes: string[];
}

export interface WorldEvent {
  id: string;
  title: string;
  description: string;
  characterName: string;
  characterId: string;
  adventureTheme: string;
  date: string;
  impact: 'minor' | 'significant' | 'major' | 'world-changing';
  location?: string;
  consequences: string[];
}

export interface WorldNPC {
  id: string;
  name: string;
  title?: string;
  description: string;
  disposition: 'friendly' | 'neutral' | 'hostile' | 'deceased';
  metBy: string;  // Character name
  metAt: string;  // ISO date
  notes: string[];
}

export interface WorldFaction {
  id: string;
  name: string;
  description: string;
  type: 'guild' | 'kingdom' | 'cult' | 'order' | 'tribe' | 'merchant' | 'criminal';
  status: 'active' | 'weakened' | 'destroyed' | 'rising';
  characterRelations: Record<string, 'allied' | 'friendly' | 'neutral' | 'unfriendly' | 'hostile'>;
}

export interface SharedLore {
  id: string;
  title: string;
  content: string;
  discoveredBy: string;
  discoveredAt: string;
  category: 'legend' | 'history' | 'prophecy' | 'secret' | 'rumor';
}

export interface WorldState {
  version: string;
  realmName: string;
  createdAt: string;
  updatedAt: string;

  // The shared world
  locations: WorldLocation[];
  events: WorldEvent[];
  npcs: WorldNPC[];
  factions: WorldFaction[];
  lore: SharedLore[];

  // Character connections
  characterMeetings: {
    character1: string;
    character2: string;
    description: string;
    date: string;
  }[];

  // World timeline
  currentYear: number;
  currentEra: string;

  // Global state
  worldThreat?: {
    name: string;
    description: string;
    level: 'looming' | 'active' | 'critical' | 'resolved';
    introducedBy: string;
  };
}

const DEFAULT_WORLD: WorldState = {
  version: '1.0.0',
  realmName: 'The Shattered Kingdoms',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  locations: [
    {
      id: 'crossroads-inn',
      name: 'The Crossroads Inn',
      type: 'landmark',
      description: 'A famous inn where adventurers gather to share tales and find work. Located at the intersection of the King\'s Road and the Old Trade Way.',
      discoveredBy: 'Common Knowledge',
      discoveredAt: new Date().toISOString(),
      status: 'safe',
      notes: ['A good place to hear rumors', 'The innkeeper knows everyone'],
    },
    {
      id: 'silverdale',
      name: 'Silverdale',
      type: 'town',
      description: 'A prosperous market town known for its silver mines and skilled craftsmen.',
      discoveredBy: 'Common Knowledge',
      discoveredAt: new Date().toISOString(),
      status: 'safe',
      notes: [],
    },
    {
      id: 'ironhold',
      name: 'Ironhold',
      type: 'city',
      description: 'The capital city, seat of the High King. Massive walls protect its ancient streets.',
      discoveredBy: 'Common Knowledge',
      discoveredAt: new Date().toISOString(),
      status: 'safe',
      notes: [],
    },
  ],
  events: [],
  npcs: [
    {
      id: 'martha-innkeeper',
      name: 'Martha Goodbarrel',
      title: 'Innkeeper of the Crossroads',
      description: 'A stout halfling woman with a warm smile and sharp ears. She knows every rumor in the realm.',
      disposition: 'friendly',
      metBy: 'Common Knowledge',
      metAt: new Date().toISOString(),
      notes: ['Serves the best ale in the region', 'Has contacts everywhere'],
    },
  ],
  factions: [
    {
      id: 'adventurers-guild',
      name: 'The Adventurers Guild',
      description: 'An organization that connects heroes with those in need. Posts bounties and quests at taverns throughout the realm.',
      type: 'guild',
      status: 'active',
      characterRelations: {},
    },
    {
      id: 'crown',
      name: 'The Crown of Ironhold',
      description: 'The royal government, led by High King Aldric III.',
      type: 'kingdom',
      status: 'active',
      characterRelations: {},
    },
  ],
  lore: [
    {
      id: 'shattered-kingdoms',
      title: 'The Shattering',
      content: 'Three centuries ago, the Great Empire fell in a cataclysm known as The Shattering. The realm split into the kingdoms we know today, and strange magic seeped into the land.',
      discoveredBy: 'Common Knowledge',
      discoveredAt: new Date().toISOString(),
      category: 'history',
    },
  ],
  characterMeetings: [],
  currentYear: 347,
  currentEra: 'After the Shattering',
  worldThreat: undefined,
};

let worldStateCache: WorldState | null = null;

export function loadWorldState(): WorldState {
  if (worldStateCache) return worldStateCache;

  if (!existsSync(SAVES_PATH)) {
    mkdirSync(SAVES_PATH, { recursive: true });
  }

  if (!existsSync(WORLD_FILE)) {
    saveWorldState(DEFAULT_WORLD);
    worldStateCache = DEFAULT_WORLD;
    return DEFAULT_WORLD;
  }

  try {
    const content = readFileSync(WORLD_FILE, 'utf-8');
    worldStateCache = JSON.parse(content) as WorldState;
    return worldStateCache;
  } catch (error) {
    console.error('Failed to load world state, using default:', error);
    worldStateCache = DEFAULT_WORLD;
    return DEFAULT_WORLD;
  }
}

export function saveWorldState(state: WorldState): void {
  if (!existsSync(SAVES_PATH)) {
    mkdirSync(SAVES_PATH, { recursive: true });
  }

  state.updatedAt = new Date().toISOString();
  writeFileSync(WORLD_FILE, JSON.stringify(state, null, 2));
  worldStateCache = state;
}

export function clearWorldCache(): void {
  worldStateCache = null;
}

// Helper functions for modifying world state

export function addWorldEvent(
  characterId: string,
  characterName: string,
  title: string,
  description: string,
  adventureTheme: string,
  impact: WorldEvent['impact'] = 'minor',
  location?: string,
  consequences: string[] = []
): WorldEvent {
  const world = loadWorldState();

  const event: WorldEvent = {
    id: uuidv4(),
    title,
    description,
    characterName,
    characterId,
    adventureTheme,
    date: new Date().toISOString(),
    impact,
    location,
    consequences,
  };

  world.events.push(event);
  saveWorldState(world);

  return event;
}

export function discoverLocation(
  characterName: string,
  name: string,
  type: WorldLocation['type'],
  description: string,
  status: WorldLocation['status'] = 'dangerous'
): WorldLocation {
  const world = loadWorldState();

  // Check if location already exists
  const existing = world.locations.find(l => l.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    existing.notes.push(`Also visited by ${characterName}`);
    saveWorldState(world);
    return existing;
  }

  const location: WorldLocation = {
    id: uuidv4(),
    name,
    type,
    description,
    discoveredBy: characterName,
    discoveredAt: new Date().toISOString(),
    status,
    notes: [],
  };

  world.locations.push(location);
  saveWorldState(world);

  return location;
}

export function meetNPC(
  characterName: string,
  npcName: string,
  description: string,
  disposition: WorldNPC['disposition'] = 'neutral',
  title?: string
): WorldNPC {
  const world = loadWorldState();

  // Check if NPC already exists
  const existing = world.npcs.find(n => n.name.toLowerCase() === npcName.toLowerCase());
  if (existing) {
    existing.notes.push(`Also met by ${characterName}`);
    saveWorldState(world);
    return existing;
  }

  const npc: WorldNPC = {
    id: uuidv4(),
    name: npcName,
    title,
    description,
    disposition,
    metBy: characterName,
    metAt: new Date().toISOString(),
    notes: [],
  };

  world.npcs.push(npc);
  saveWorldState(world);

  return npc;
}

export function addLore(
  characterName: string,
  title: string,
  content: string,
  category: SharedLore['category']
): SharedLore {
  const world = loadWorldState();

  const lore: SharedLore = {
    id: uuidv4(),
    title,
    content,
    discoveredBy: characterName,
    discoveredAt: new Date().toISOString(),
    category,
  };

  world.lore.push(lore);
  saveWorldState(world);

  return lore;
}

export function recordCharacterMeeting(
  char1Name: string,
  char2Name: string,
  description: string
): void {
  const world = loadWorldState();

  world.characterMeetings.push({
    character1: char1Name,
    character2: char2Name,
    description,
    date: new Date().toISOString(),
  });

  saveWorldState(world);
}

export function updateLocationStatus(
  locationName: string,
  newStatus: WorldLocation['status'],
  note?: string
): boolean {
  const world = loadWorldState();

  const location = world.locations.find(l =>
    l.name.toLowerCase() === locationName.toLowerCase()
  );

  if (!location) return false;

  location.status = newStatus;
  if (note) {
    location.notes.push(note);
  }

  saveWorldState(world);
  return true;
}

export function setWorldThreat(
  characterName: string,
  name: string,
  description: string,
  level: 'looming' | 'active' | 'critical' | 'resolved' = 'looming'
): void {
  const world = loadWorldState();

  world.worldThreat = {
    name,
    description,
    level,
    introducedBy: characterName,
  };

  saveWorldState(world);
}

export function getRecentEvents(limit: number = 5): WorldEvent[] {
  const world = loadWorldState();
  return world.events
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getCharacterEvents(characterId: string): WorldEvent[] {
  const world = loadWorldState();
  return world.events.filter(e => e.characterId === characterId);
}

export function getWorldSummary(): string {
  const world = loadWorldState();

  let summary = `\n═══ THE REALM: ${world.realmName} ═══\n`;
  summary += `Year ${world.currentYear} ${world.currentEra}\n\n`;

  if (world.worldThreat) {
    summary += `⚠️  WORLD THREAT: ${world.worldThreat.name}\n`;
    summary += `   ${world.worldThreat.description}\n`;
    summary += `   Status: ${world.worldThreat.level.toUpperCase()}\n\n`;
  }

  summary += `Known Locations: ${world.locations.length}\n`;
  summary += `Notable NPCs: ${world.npcs.length}\n`;
  summary += `World Events: ${world.events.length}\n`;
  summary += `Discovered Lore: ${world.lore.length}\n`;

  const recentEvents = getRecentEvents(3);
  if (recentEvents.length > 0) {
    summary += `\nRecent Events:\n`;
    for (const event of recentEvents) {
      summary += `  • ${event.title} (by ${event.characterName})\n`;
    }
  }

  return summary;
}

export function getWorldContextForAI(): string {
  const world = loadWorldState();

  let context = `SHARED WORLD CONTEXT - ${world.realmName}, Year ${world.currentYear} ${world.currentEra}\n\n`;

  if (world.worldThreat) {
    context += `ACTIVE WORLD THREAT: ${world.worldThreat.name} - ${world.worldThreat.description} (${world.worldThreat.level})\n\n`;
  }

  // Recent events that the AI should know about
  const recentEvents = getRecentEvents(5);
  if (recentEvents.length > 0) {
    context += `RECENT EVENTS IN THE REALM:\n`;
    for (const event of recentEvents) {
      context += `- ${event.title}: ${event.description} (${event.characterName}'s adventure)\n`;
    }
    context += '\n';
  }

  // Important locations
  context += `KNOWN LOCATIONS:\n`;
  for (const loc of world.locations.slice(0, 10)) {
    context += `- ${loc.name} (${loc.type}, ${loc.status}): ${loc.description.slice(0, 100)}...\n`;
  }
  context += '\n';

  // Notable NPCs
  context += `NOTABLE NPCS:\n`;
  for (const npc of world.npcs.slice(0, 10)) {
    const title = npc.title ? `, ${npc.title}` : '';
    context += `- ${npc.name}${title} (${npc.disposition}): ${npc.description.slice(0, 80)}...\n`;
  }

  return context;
}

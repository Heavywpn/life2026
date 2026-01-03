/**
 * Story State - Tracks narrative elements for AI consistency
 * The AI writes to this to maintain story continuity
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SAVES_PATH = join(__dirname, '../../saves/stories');

export interface StoryNPC {
  id: string;
  name: string;
  description: string;
  role: string;  // ally, enemy, neutral, quest_giver, victim, etc.
  status: 'alive' | 'dead' | 'unknown' | 'captured' | 'freed';
  location?: string;
  relationship: 'friendly' | 'neutral' | 'hostile' | 'unknown';
  notes: string[];
  firstMet: string;  // Turn or description
}

export interface StoryLocation {
  id: string;
  name: string;
  description: string;
  type: string;  // warehouse, tavern, dungeon, street, etc.
  status: 'safe' | 'dangerous' | 'cleared' | 'unknown';
  npcsPresent: string[];  // NPC ids
  discovered: string;  // When discovered
  notes: string[];
}

export interface StoryQuest {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'failed' | 'abandoned';
  objectives: {
    description: string;
    completed: boolean;
  }[];
  rewards?: string;
  givenBy?: string;  // NPC id
  notes: string[];
}

export interface StoryDiscovery {
  id: string;
  title: string;
  content: string;
  importance: 'minor' | 'significant' | 'major' | 'critical';
  turnDiscovered: number;
  relatedTo: string[];  // NPC ids, quest ids, etc.
}

export interface StoryItem {
  id: string;
  name: string;
  description: string;
  significance: string;  // Why it matters to the story
  obtainedFrom?: string;
  turnObtained: number;
}

export interface StoryEvent {
  turn: number;
  summary: string;
  npcsInvolved: string[];
  locationId?: string;
}

export interface StoryState {
  version: string;
  characterId: string;
  characterName: string;
  adventureTheme: string;

  // Story summary - updated each turn
  currentSituation: string;
  lastMajorEvent: string;
  immediateGoal: string;

  // Tracked elements
  npcs: StoryNPC[];
  locations: StoryLocation[];
  quests: StoryQuest[];
  discoveries: StoryDiscovery[];
  importantItems: StoryItem[];

  // Timeline
  events: StoryEvent[];
  currentTurn: number;

  // Plot threads
  activeThreats: string[];
  unresolved: string[];  // Loose plot threads

  // Last updated
  updatedAt: string;
}

export function createEmptyStoryState(characterId: string, characterName: string, theme: string): StoryState {
  return {
    version: '1.0.0',
    characterId,
    characterName,
    adventureTheme: theme,
    currentSituation: '',
    lastMajorEvent: '',
    immediateGoal: '',
    npcs: [],
    locations: [],
    quests: [],
    discoveries: [],
    importantItems: [],
    events: [],
    currentTurn: 0,
    activeThreats: [],
    unresolved: [],
    updatedAt: new Date().toISOString(),
  };
}

export function loadStoryState(characterId: string): StoryState | null {
  if (!existsSync(SAVES_PATH)) {
    mkdirSync(SAVES_PATH, { recursive: true });
  }

  const filePath = join(SAVES_PATH, `${characterId}.json`);

  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as StoryState;
  } catch (error) {
    console.error('Failed to load story state:', error);
    return null;
  }
}

export function saveStoryState(state: StoryState): void {
  if (!existsSync(SAVES_PATH)) {
    mkdirSync(SAVES_PATH, { recursive: true });
  }

  state.updatedAt = new Date().toISOString();
  const filePath = join(SAVES_PATH, `${state.characterId}.json`);
  writeFileSync(filePath, JSON.stringify(state, null, 2));
}

export function getStoryContextForAI(state: StoryState): string {
  let context = `\n═══ STORY STATE - MAINTAIN CONSISTENCY ═══\n`;
  context += `Adventure: ${state.adventureTheme}\n`;
  context += `Current Turn: ${state.currentTurn}\n\n`;

  if (state.currentSituation) {
    context += `CURRENT SITUATION:\n${state.currentSituation}\n\n`;
  }

  if (state.immediateGoal) {
    context += `IMMEDIATE GOAL:\n${state.immediateGoal}\n\n`;
  }

  // Active quests
  const activeQuests = state.quests.filter(q => q.status === 'active');
  if (activeQuests.length > 0) {
    context += `ACTIVE QUESTS:\n`;
    for (const quest of activeQuests) {
      context += `- ${quest.name}: ${quest.description}\n`;
      const incomplete = quest.objectives.filter(o => !o.completed);
      for (const obj of incomplete) {
        context += `  [ ] ${obj.description}\n`;
      }
    }
    context += '\n';
  }

  // Important NPCs
  const relevantNPCs = state.npcs.filter(n => n.status !== 'dead' || n.role === 'enemy');
  if (relevantNPCs.length > 0) {
    context += `KEY NPCs:\n`;
    for (const npc of relevantNPCs) {
      context += `- ${npc.name} (${npc.role}, ${npc.status}): ${npc.description}`;
      if (npc.location) context += ` [Location: ${npc.location}]`;
      context += '\n';
    }
    context += '\n';
  }

  // Current location
  const currentLoc = state.locations.find(l => l.status !== 'cleared');
  if (currentLoc) {
    context += `CURRENT LOCATION:\n`;
    context += `- ${currentLoc.name} (${currentLoc.type}): ${currentLoc.description}\n\n`;
  }

  // Key discoveries
  const majorDiscoveries = state.discoveries.filter(d => d.importance === 'major' || d.importance === 'critical');
  if (majorDiscoveries.length > 0) {
    context += `KEY DISCOVERIES:\n`;
    for (const disc of majorDiscoveries) {
      context += `- ${disc.title}: ${disc.content}\n`;
    }
    context += '\n';
  }

  // Active threats
  if (state.activeThreats.length > 0) {
    context += `ACTIVE THREATS:\n`;
    for (const threat of state.activeThreats) {
      context += `- ${threat}\n`;
    }
    context += '\n';
  }

  // Important items
  if (state.importantItems.length > 0) {
    context += `STORY ITEMS IN POSSESSION:\n`;
    for (const item of state.importantItems) {
      context += `- ${item.name}: ${item.significance}\n`;
    }
    context += '\n';
  }

  // Recent events (last 5)
  if (state.events.length > 0) {
    const recentEvents = state.events.slice(-5);
    context += `RECENT EVENTS:\n`;
    for (const event of recentEvents) {
      context += `- Turn ${event.turn}: ${event.summary}\n`;
    }
  }

  return context;
}

// Parse AI response for story updates
export function parseStoryUpdates(text: string, currentTurn: number): Partial<StoryState> {
  const updates: Partial<StoryState> = {
    npcs: [],
    locations: [],
    discoveries: [],
    importantItems: [],
    events: [],
    quests: [],
  };

  // Parse NPC tags: [NPC: name | role | status | description]
  const npcRegex = /\[NPC:\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^\]]+)\]/gi;
  let match;
  while ((match = npcRegex.exec(text)) !== null) {
    updates.npcs!.push({
      id: match[1].trim().toLowerCase().replace(/\s+/g, '-'),
      name: match[1].trim(),
      role: match[2].trim(),
      status: match[3].trim().toLowerCase() as StoryNPC['status'],
      description: match[4].trim(),
      relationship: 'unknown',
      notes: [],
      firstMet: `Turn ${currentTurn}`,
    });
  }

  // Parse location tags: [LOCATION: name | type | status | description]
  const locRegex = /\[LOCATION:\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^\]]+)\]/gi;
  while ((match = locRegex.exec(text)) !== null) {
    updates.locations!.push({
      id: match[1].trim().toLowerCase().replace(/\s+/g, '-'),
      name: match[1].trim(),
      type: match[2].trim(),
      status: match[3].trim().toLowerCase() as StoryLocation['status'],
      description: match[4].trim(),
      npcsPresent: [],
      discovered: `Turn ${currentTurn}`,
      notes: [],
    });
  }

  // Parse discovery tags: [DISCOVERY: title | importance | content]
  const discRegex = /\[DISCOVERY:\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^\]]+)\]/gi;
  while ((match = discRegex.exec(text)) !== null) {
    updates.discoveries!.push({
      id: match[1].trim().toLowerCase().replace(/\s+/g, '-'),
      title: match[1].trim(),
      importance: match[2].trim().toLowerCase() as StoryDiscovery['importance'],
      content: match[3].trim(),
      turnDiscovered: currentTurn,
      relatedTo: [],
    });
  }

  // Parse item tags: [STORY_ITEM: name | significance]
  const itemRegex = /\[STORY_ITEM:\s*([^|]+)\s*\|\s*([^\]]+)\]/gi;
  while ((match = itemRegex.exec(text)) !== null) {
    updates.importantItems!.push({
      id: match[1].trim().toLowerCase().replace(/\s+/g, '-'),
      name: match[1].trim(),
      description: '',
      significance: match[2].trim(),
      turnObtained: currentTurn,
    });
  }

  // Parse quest tags: [QUEST: name | description | objective1; objective2; ...]
  const questRegex = /\[QUEST:\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^\]]+)\]/gi;
  while ((match = questRegex.exec(text)) !== null) {
    const objectives = match[3].split(';').map(o => ({
      description: o.trim(),
      completed: false,
    }));
    updates.quests!.push({
      id: match[1].trim().toLowerCase().replace(/\s+/g, '-'),
      name: match[1].trim(),
      description: match[2].trim(),
      status: 'active',
      objectives,
      notes: [],
    });
  }

  // Parse quest completion: [QUEST_COMPLETE: quest_name]
  const questCompleteRegex = /\[QUEST_COMPLETE:\s*([^\]]+)\]/gi;
  while ((match = questCompleteRegex.exec(text)) !== null) {
    // This will be handled in the merge function
    updates.quests!.push({
      id: match[1].trim().toLowerCase().replace(/\s+/g, '-'),
      name: match[1].trim(),
      description: '',
      status: 'completed',
      objectives: [],
      notes: [],
    });
  }

  // Parse situation update: [SITUATION: description]
  const sitRegex = /\[SITUATION:\s*([^\]]+)\]/i;
  const sitMatch = text.match(sitRegex);
  if (sitMatch) {
    updates.currentSituation = sitMatch[1].trim();
  }

  // Parse threat: [THREAT: description]
  const threatRegex = /\[THREAT:\s*([^\]]+)\]/gi;
  updates.activeThreats = [];
  while ((match = threatRegex.exec(text)) !== null) {
    updates.activeThreats.push(match[1].trim());
  }

  // Parse event summary: [EVENT: summary]
  const eventRegex = /\[EVENT:\s*([^\]]+)\]/gi;
  while ((match = eventRegex.exec(text)) !== null) {
    updates.events!.push({
      turn: currentTurn,
      summary: match[1].trim(),
      npcsInvolved: [],
    });
  }

  return updates;
}

// Merge updates into existing state
export function mergeStoryUpdates(state: StoryState, updates: Partial<StoryState>): StoryState {
  const newState = { ...state };

  // Merge NPCs (update existing or add new)
  if (updates.npcs) {
    for (const npc of updates.npcs) {
      const existing = newState.npcs.find(n => n.id === npc.id);
      if (existing) {
        Object.assign(existing, npc);
      } else {
        newState.npcs.push(npc);
      }
    }
  }

  // Merge locations
  if (updates.locations) {
    for (const loc of updates.locations) {
      const existing = newState.locations.find(l => l.id === loc.id);
      if (existing) {
        Object.assign(existing, loc);
      } else {
        newState.locations.push(loc);
      }
    }
  }

  // Merge discoveries (no duplicates)
  if (updates.discoveries) {
    for (const disc of updates.discoveries) {
      if (!newState.discoveries.find(d => d.id === disc.id)) {
        newState.discoveries.push(disc);
      }
    }
  }

  // Merge items
  if (updates.importantItems) {
    for (const item of updates.importantItems) {
      if (!newState.importantItems.find(i => i.id === item.id)) {
        newState.importantItems.push(item);
      }
    }
  }

  // Update quests
  if (updates.quests) {
    for (const quest of updates.quests) {
      const existing = newState.quests.find(q => q.id === quest.id);
      if (existing) {
        if (quest.status === 'completed') {
          existing.status = 'completed';
        } else {
          Object.assign(existing, quest);
        }
      } else if (quest.status !== 'completed') {
        newState.quests.push(quest);
      }
    }
  }

  // Add events
  if (updates.events) {
    newState.events.push(...updates.events);
  }

  // Update situation
  if (updates.currentSituation) {
    newState.currentSituation = updates.currentSituation;
  }

  // Update threats
  if (updates.activeThreats && updates.activeThreats.length > 0) {
    newState.activeThreats = updates.activeThreats;
  }

  return newState;
}

// Remove story tags from text for display
export function cleanStoryTags(text: string): string {
  return text
    .replace(/\[NPC:[^\]]+\]/gi, '')
    .replace(/\[LOCATION:[^\]]+\]/gi, '')
    .replace(/\[DISCOVERY:[^\]]+\]/gi, '')
    .replace(/\[STORY_ITEM:[^\]]+\]/gi, '')
    .replace(/\[QUEST:[^\]]+\]/gi, '')
    .replace(/\[QUEST_COMPLETE:[^\]]+\]/gi, '')
    .replace(/\[SITUATION:[^\]]+\]/gi, '')
    .replace(/\[THREAT:[^\]]+\]/gi, '')
    .replace(/\[EVENT:[^\]]+\]/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

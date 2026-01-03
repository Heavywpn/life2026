/**
 * Save/Load system for character and campaign persistence
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import type { Character } from '../models/character.types.js';

const SAVE_VERSION = '1.0.0';

export interface CharacterSave {
  version: string;
  savedAt: string;
  slotId: string;
  slotName: string;
  character: Character;
  playTime: number;
}

export interface CampaignSave {
  version: string;
  savedAt: string;
  campaignId: string;
  campaignName: string;
  characterId: string;
  currentAdventure?: string;
  currentRoom?: string;
  visitedRooms: string[];
  flags: string[];
  quests: Record<string, { status: string; objectives: Record<string, number> }>;
  statistics: {
    totalPlayTime: number;
    encountersCompleted: number;
    monstersDefeated: number;
    totalXPGained: number;
    questsCompleted: number;
  };
}

export interface AdventureSession {
  version: string;
  savedAt: string;
  sessionId: string;
  characterId: string;
  characterName: string;
  adventureTheme: string;
  turnCount: number;
  currentHP: number;
  maxHP: number;
  gold: number;
  inventory: string[];
  questLog: string[];
  flags: string[];
  messageHistory: { role: 'user' | 'assistant'; content: string }[];
  location: string;
}

export interface SaveInfo {
  id: string;
  name: string;
  characterName: string;
  level: number;
  className: string;
  raceName: string;
  lastPlayed: string;
  playTime: number;
}

export class SaveManager {
  private basePath: string;
  private characterPath: string;
  private campaignPath: string;
  private adventurePath: string;

  constructor(basePath: string = './saves') {
    this.basePath = basePath;
    this.characterPath = join(basePath, 'characters');
    this.campaignPath = join(basePath, 'campaigns');
    this.adventurePath = join(basePath, 'adventures');

    // Ensure directories exist
    this.ensureDirectories();
  }

  private ensureDirectories(): void {
    if (!existsSync(this.characterPath)) {
      mkdirSync(this.characterPath, { recursive: true });
    }
    if (!existsSync(this.campaignPath)) {
      mkdirSync(this.campaignPath, { recursive: true });
    }
    if (!existsSync(this.adventurePath)) {
      mkdirSync(this.adventurePath, { recursive: true });
    }
  }

  // Character saves

  saveCharacter(character: Character, slotName?: string): string {
    const slotId = character.id || uuidv4();
    const save: CharacterSave = {
      version: SAVE_VERSION,
      savedAt: new Date().toISOString(),
      slotId,
      slotName: slotName || character.name,
      character: {
        ...character,
        id: slotId,
        updatedAt: new Date().toISOString(),
      },
      playTime: character.totalPlayTime || 0,
    };

    const filePath = join(this.characterPath, `${slotId}.json`);
    writeFileSync(filePath, JSON.stringify(save, null, 2));

    return slotId;
  }

  loadCharacter(slotId: string): CharacterSave | null {
    const filePath = join(this.characterPath, `${slotId}.json`);

    if (!existsSync(filePath)) {
      return null;
    }

    try {
      const content = readFileSync(filePath, 'utf-8');
      const save = JSON.parse(content) as CharacterSave;

      // Version migration could happen here
      return save;
    } catch (error) {
      console.error(`Failed to load character save: ${slotId}`, error);
      return null;
    }
  }

  listCharacterSaves(): SaveInfo[] {
    const saves: SaveInfo[] = [];

    if (!existsSync(this.characterPath)) {
      return saves;
    }

    const files = readdirSync(this.characterPath).filter(f => f.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = join(this.characterPath, file);
        const content = readFileSync(filePath, 'utf-8');
        const save = JSON.parse(content) as CharacterSave;

        saves.push({
          id: save.slotId,
          name: save.slotName,
          characterName: save.character.name,
          level: save.character.level,
          className: save.character.class.classId,
          raceName: save.character.race.raceId,
          lastPlayed: save.savedAt,
          playTime: save.playTime,
        });
      } catch (error) {
        // Skip corrupted saves
        console.error(`Failed to read save file: ${file}`, error);
      }
    }

    // Sort by last played (most recent first)
    saves.sort((a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime());

    return saves;
  }

  deleteCharacterSave(slotId: string): boolean {
    const filePath = join(this.characterPath, `${slotId}.json`);

    if (!existsSync(filePath)) {
      return false;
    }

    try {
      const { unlinkSync } = require('fs');
      unlinkSync(filePath);
      return true;
    } catch (error) {
      console.error(`Failed to delete save: ${slotId}`, error);
      return false;
    }
  }

  // Campaign saves

  saveCampaign(campaign: CampaignSave): string {
    const campaignId = campaign.campaignId || uuidv4();
    const save: CampaignSave = {
      ...campaign,
      version: SAVE_VERSION,
      savedAt: new Date().toISOString(),
      campaignId,
    };

    const filePath = join(this.campaignPath, `${campaignId}.json`);
    writeFileSync(filePath, JSON.stringify(save, null, 2));

    return campaignId;
  }

  loadCampaign(campaignId: string): CampaignSave | null {
    const filePath = join(this.campaignPath, `${campaignId}.json`);

    if (!existsSync(filePath)) {
      return null;
    }

    try {
      const content = readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as CampaignSave;
    } catch (error) {
      console.error(`Failed to load campaign save: ${campaignId}`, error);
      return null;
    }
  }

  listCampaignSaves(): { id: string; name: string; characterId: string; lastPlayed: string }[] {
    const saves: { id: string; name: string; characterId: string; lastPlayed: string }[] = [];

    if (!existsSync(this.campaignPath)) {
      return saves;
    }

    const files = readdirSync(this.campaignPath).filter(f => f.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = join(this.campaignPath, file);
        const content = readFileSync(filePath, 'utf-8');
        const save = JSON.parse(content) as CampaignSave;

        saves.push({
          id: save.campaignId,
          name: save.campaignName,
          characterId: save.characterId,
          lastPlayed: save.savedAt,
        });
      } catch (error) {
        console.error(`Failed to read campaign save: ${file}`, error);
      }
    }

    saves.sort((a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime());

    return saves;
  }

  // Adventure session saves (for continuing AI adventures)

  saveAdventureSession(session: AdventureSession): string {
    const sessionId = session.sessionId || `${session.characterId}-adventure`;
    const save: AdventureSession = {
      ...session,
      version: SAVE_VERSION,
      savedAt: new Date().toISOString(),
      sessionId,
    };

    const filePath = join(this.adventurePath, `${session.characterId}.json`);
    writeFileSync(filePath, JSON.stringify(save, null, 2));

    return sessionId;
  }

  loadAdventureSession(characterId: string): AdventureSession | null {
    const filePath = join(this.adventurePath, `${characterId}.json`);

    if (!existsSync(filePath)) {
      return null;
    }

    try {
      const content = readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as AdventureSession;
    } catch (error) {
      console.error(`Failed to load adventure session: ${characterId}`, error);
      return null;
    }
  }

  hasAdventureSession(characterId: string): boolean {
    const filePath = join(this.adventurePath, `${characterId}.json`);
    return existsSync(filePath);
  }

  deleteAdventureSession(characterId: string): boolean {
    const filePath = join(this.adventurePath, `${characterId}.json`);

    if (!existsSync(filePath)) {
      return false;
    }

    try {
      const { unlinkSync } = require('fs');
      unlinkSync(filePath);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Auto-save support

  getAutoSavePath(characterId: string): string {
    return join(this.characterPath, `${characterId}-autosave.json`);
  }

  autoSave(character: Character): void {
    const autoSavePath = this.getAutoSavePath(character.id);
    const save: CharacterSave = {
      version: SAVE_VERSION,
      savedAt: new Date().toISOString(),
      slotId: `${character.id}-autosave`,
      slotName: `${character.name} (Auto-save)`,
      character,
      playTime: character.totalPlayTime || 0,
    };

    writeFileSync(autoSavePath, JSON.stringify(save, null, 2));
  }

  loadAutoSave(characterId: string): CharacterSave | null {
    const autoSavePath = this.getAutoSavePath(characterId);

    if (!existsSync(autoSavePath)) {
      return null;
    }

    try {
      const content = readFileSync(autoSavePath, 'utf-8');
      return JSON.parse(content) as CharacterSave;
    } catch (error) {
      return null;
    }
  }

  // Export/Import

  exportSave(slotId: string): string | null {
    const save = this.loadCharacter(slotId);
    if (!save) return null;

    return Buffer.from(JSON.stringify(save)).toString('base64');
  }

  importSave(base64Data: string): { success: boolean; slotId?: string; error?: string } {
    try {
      const jsonStr = Buffer.from(base64Data, 'base64').toString('utf-8');
      const save = JSON.parse(jsonStr) as CharacterSave;

      // Generate new ID to avoid conflicts
      const newSlotId = uuidv4();
      save.slotId = newSlotId;
      save.character.id = newSlotId;

      const filePath = join(this.characterPath, `${newSlotId}.json`);
      writeFileSync(filePath, JSON.stringify(save, null, 2));

      return { success: true, slotId: newSlotId };
    } catch (error) {
      return { success: false, error: 'Invalid save data' };
    }
  }
}

// Singleton instance
let saveManager: SaveManager | null = null;

export function getSaveManager(basePath?: string): SaveManager {
  if (!saveManager) {
    saveManager = new SaveManager(basePath);
  }
  return saveManager;
}

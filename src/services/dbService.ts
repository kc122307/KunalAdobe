import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { ProjectMetadata } from '../types/editor';

interface StudioDB extends DBSchema {
  projects: {
    key: string;
    value: ProjectMetadata;
    indexes: { 'by-updated': number };
  };
  uploads: {
    key: string;
    value: {
      id: string;
      name: string;
      dataUrl: string;
      createdAt: number;
    };
  };
}

const DB_NAME = 'AdobeExpressStudioDB';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<StudioDB>> | null = null;

function getDB(): Promise<IDBPDatabase<StudioDB>> {
  if (!dbPromise) {
    dbPromise = openDB<StudioDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('projects')) {
          const projectStore = db.createObjectStore('projects', { keyPath: 'id' });
          projectStore.createIndex('by-updated', 'updatedAt');
        }
        if (!db.objectStoreNames.contains('uploads')) {
          db.createObjectStore('uploads', { keyPath: 'id' });
        }
      },
    });
  }
  return dbPromise;
}

export const dbService = {
  async getAllProjects(): Promise<ProjectMetadata[]> {
    const db = await getDB();
    const projects = await db.getAllFromIndex('projects', 'by-updated');
    return projects.reverse(); // newest first
  },

  async getProject(id: string): Promise<ProjectMetadata | undefined> {
    const db = await getDB();
    return db.get('projects', id);
  },

  async saveProject(project: ProjectMetadata): Promise<void> {
    const db = await getDB();
    await db.put('projects', {
      ...project,
      updatedAt: Date.now()
    });
  },

  async deleteProject(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('projects', id);
  },

  async saveUpload(upload: { id: string; name: string; dataUrl: string; createdAt: number }): Promise<void> {
    const db = await getDB();
    await db.put('uploads', upload);
  },

  async getAllUploads(): Promise<{ id: string; name: string; dataUrl: string; createdAt: number }[]> {
    const db = await getDB();
    const uploads = await db.getAll('uploads');
    return uploads.reverse();
  },

  async deleteUpload(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('uploads', id);
  }
};


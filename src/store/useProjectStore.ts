import { create } from 'zustand';
import { ProjectMetadata } from '../types/editor';
import { dbService } from '../services/dbService';
import { fabricServiceInstance } from '../services/fabricService';
import { exportService } from '../services/exportService';
import { useEditorStore } from './useEditorStore';

interface ProjectState {
  projects: ProjectMetadata[];
  isSaving: boolean;
  lastSaved: number | null;
  loadProjects: () => Promise<void>;
  saveCurrentProject: () => Promise<void>;
  loadProject: (id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  duplicateProject: (id: string) => Promise<void>;
  createNewProject: (width: number, height: number, name?: string, presetId?: string) => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  isSaving: false,
  lastSaved: null,

  loadProjects: async () => {
    try {
      const projects = await dbService.getAllProjects();
      set({ projects });
    } catch (err) {
      console.error('Failed to load projects from IndexedDB:', err);
    }
  },

  saveCurrentProject: async () => {
    const canvas = fabricServiceInstance.getCanvas();
    if (!canvas) return;

    set({ isSaving: true });
    try {
      const { projectId, projectName, canvasWidth, canvasHeight } = useEditorStore.getState();
      const thumbnail = exportService.generateThumbnail(canvas);
      const canvasJson = JSON.stringify(canvas.toJSON(['id', 'name', 'locked', 'selectable']));

      const project: ProjectMetadata = {
        id: projectId,
        name: projectName || 'Untitled Design',
        width: canvasWidth,
        height: canvasHeight,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        thumbnail,
        canvasJson,
      };

      await dbService.saveProject(project);
      await get().loadProjects();
      set({ lastSaved: Date.now() });
    } catch (err) {
      console.error('Error saving project:', err);
    } finally {
      set({ isSaving: false });
    }
  },

  loadProject: async (id: string) => {
    try {
      const project = await dbService.getProject(id);
      if (!project || !project.canvasJson) return;

      const editor = useEditorStore.getState();
      editor.setProjectId(project.id);
      editor.setProjectName(project.name);
      editor.setCanvasDimensions(project.width, project.height);

      fabricServiceInstance.resizeCanvas(project.width, project.height);
      fabricServiceInstance.loadFromJson(project.canvasJson, () => {
        editor.incrementLayersVersion();
      });
    } catch (err) {
      console.error('Error loading project:', err);
    }
  },

  deleteProject: async (id: string) => {
    try {
      await dbService.deleteProject(id);
      await get().loadProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  },

  duplicateProject: async (id: string) => {
    try {
      const source = await dbService.getProject(id);
      if (!source) return;

      const newId = 'proj-' + Date.now();
      const duplicate: ProjectMetadata = {
        ...source,
        id: newId,
        name: `${source.name} (Copy)`,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await dbService.saveProject(duplicate);
      await get().loadProjects();
    } catch (err) {
      console.error('Error duplicating project:', err);
    }
  },

  createNewProject: (width: number, height: number, name = 'Untitled Design', presetId = 'custom') => {
    const editor = useEditorStore.getState();
    const newId = 'proj-' + Date.now();
    editor.setProjectId(newId);
    editor.setProjectName(name);
    editor.setCanvasDimensions(width, height, presetId);

    const canvas = fabricServiceInstance.getCanvas();
    if (canvas) {
      canvas.clear();
      canvas.setWidth(width);
      canvas.setHeight(height);
      canvas.backgroundColor = '#ffffff';
      canvas.renderAll();
      fabricServiceInstance.saveHistoryState();
      editor.incrementLayersVersion();
    }
  },
}));


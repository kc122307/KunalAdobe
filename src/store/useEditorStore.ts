import { create } from 'zustand';
import { SidebarTab, ImageFilterValues, TextProperties, ShapeProperties } from '../types/editor';
import { fabric } from 'fabric';

interface EditorState {
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;

  // Project meta
  projectId: string;
  projectName: string;
  setProjectName: (name: string) => void;
  setProjectId: (id: string) => void;

  // Canvas dimensions
  canvasWidth: number;
  canvasHeight: number;
  presetId: string;
  setCanvasDimensions: (width: number, height: number, presetId?: string) => void;

  // Zoom & Pan
  zoom: number;
  setZoom: (zoom: number | ((prev: number) => number)) => void;

  // Selection
  selectedObject: fabric.Object | null;
  selectedType: string | null;
  setSelectedObject: (obj: fabric.Object | null) => void;

  // History state
  canUndo: boolean;
  canRedo: boolean;
  setHistoryState: (canUndo: boolean, canRedo: boolean) => void;

  // Layers
  layersVersion: number;
  incrementLayersVersion: () => void;
  isLayerPanelOpen: boolean;
  toggleLayerPanel: () => void;

  // Grid
  isGridVisible: boolean;
  toggleGrid: () => void;

  // Modals
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
  isResizeModalOpen: boolean;
  setIsResizeModalOpen: (open: boolean) => void;
  isNewProjectModalOpen: boolean;
  setIsNewProjectModalOpen: (open: boolean) => void;

  // Contextual Properties
  imageFilters: ImageFilterValues;
  setImageFilters: (filters: Partial<ImageFilterValues>) => void;
  resetImageFilters: () => void;

  textProps: TextProperties;
  setTextProps: (props: Partial<TextProperties>) => void;

  shapeProps: ShapeProperties;
  setShapeProps: (props: Partial<ShapeProperties>) => void;
}

const defaultImageFilters: ImageFilterValues = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  blur: 0,
  grayscale: false,
  sepia: false,
  invert: false,
  opacity: 1,
};

const defaultTextProps: TextProperties = {
  text: '',
  fontFamily: 'Inter',
  fontSize: 48,
  fill: '#ffffff',
  textAlign: 'center',
  fontWeight: 'bold',
  fontStyle: 'normal',
  underline: false,
  linethrough: false,
  charSpacing: 0,
  lineHeight: 1.1,
  stroke: '',
  strokeWidth: 0,
  textTransform: 'none',
};

const defaultShapeProps: ShapeProperties = {
  fill: '#3b82f6',
  stroke: '#ffffff',
  strokeWidth: 0,
  opacity: 1,
  rx: 8,
  ry: 8,
};

export const useEditorStore = create<EditorState>((set) => ({
  activeTab: 'templates',
  setActiveTab: (tab) => set({ activeTab: tab }),

  projectId: 'proj-' + Date.now(),
  projectName: 'Untitled Design',
  setProjectName: (name) => set({ projectName: name }),
  setProjectId: (id) => set({ projectId: id }),

  canvasWidth: 1080,
  canvasHeight: 1080,
  presetId: 'instagram-post',
  setCanvasDimensions: (width, height, presetId = 'custom') =>
    set({ canvasWidth: width, canvasHeight: height, presetId }),

  zoom: 1,
  setZoom: (zoomOrFn) =>
    set((state) => ({
      zoom:
        typeof zoomOrFn === 'function'
          ? Math.min(Math.max((zoomOrFn as any)(state.zoom), 0.15), 3.0)
          : Math.min(Math.max(zoomOrFn, 0.15), 3.0),
    })),

  selectedObject: null,
  selectedType: null,
  setSelectedObject: (obj) => {
    if (!obj) {
      set({ selectedObject: null, selectedType: null });
      return;
    }

    const type = obj.type || 'object';

    // Extract current properties from fabric object
    if (type === 'textbox' || type === 'text' || type === 'i-text') {
      const textObj = obj as fabric.Textbox;
      set({
        selectedObject: obj,
        selectedType: 'text',
        textProps: {
          text: textObj.text || '',
          fontFamily: textObj.fontFamily || 'Inter',
          fontSize: textObj.fontSize || 48,
          fill: (textObj.fill as string) || '#ffffff',
          textAlign: textObj.textAlign || 'center',
          fontWeight: textObj.fontWeight || 'normal',
          fontStyle: textObj.fontStyle || 'normal',
          underline: !!textObj.underline,
          linethrough: !!textObj.linethrough,
          charSpacing: textObj.charSpacing || 0,
          lineHeight: textObj.lineHeight || 1.1,
          stroke: (textObj.stroke as string) || '',
          strokeWidth: textObj.strokeWidth || 0,
        },
      });
    } else if (type === 'image') {
      const imgObj = obj as fabric.Image;
      set({
        selectedObject: obj,
        selectedType: 'image',
        imageFilters: {
          ...defaultImageFilters,
          opacity: imgObj.opacity !== undefined ? imgObj.opacity : 1,
        },
      });
    } else {
      // Shape / Path / Group
      set({
        selectedObject: obj,
        selectedType: 'shape',
        shapeProps: {
          fill: (obj.fill as string) || '#3b82f6',
          stroke: (obj.stroke as string) || '#ffffff',
          strokeWidth: obj.strokeWidth || 0,
          opacity: obj.opacity !== undefined ? obj.opacity : 1,
          rx: (obj as any).rx || 0,
          ry: (obj as any).ry || 0,
        },
      });
    }
  },

  canUndo: false,
  canRedo: false,
  setHistoryState: (canUndo, canRedo) => set({ canUndo, canRedo }),

  layersVersion: 0,
  incrementLayersVersion: () => set((state) => ({ layersVersion: state.layersVersion + 1 })),
  isLayerPanelOpen: true,
  toggleLayerPanel: () => set((state) => ({ isLayerPanelOpen: !state.isLayerPanelOpen })),

  isGridVisible: false,
  toggleGrid: () => set((state) => ({ isGridVisible: !state.isGridVisible })),

  isExportModalOpen: false,
  setIsExportModalOpen: (open) => set({ isExportModalOpen: open }),
  isResizeModalOpen: false,
  setIsResizeModalOpen: (open) => set({ isResizeModalOpen: open }),
  isNewProjectModalOpen: false,
  setIsNewProjectModalOpen: (open) => set({ isNewProjectModalOpen: open }),

  imageFilters: defaultImageFilters,
  setImageFilters: (filters) =>
    set((state) => ({ imageFilters: { ...state.imageFilters, ...filters } })),
  resetImageFilters: () => set({ imageFilters: defaultImageFilters }),

  textProps: defaultTextProps,
  setTextProps: (props) =>
    set((state) => ({ textProps: { ...state.textProps, ...props } })),

  shapeProps: defaultShapeProps,
  setShapeProps: (props) =>
    set((state) => ({ shapeProps: { ...state.shapeProps, ...props } })),
}));


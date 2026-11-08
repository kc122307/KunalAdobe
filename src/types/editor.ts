export type SidebarTab =
  | 'templates'
  | 'text'
  | 'elements'
  | 'uploads'
  | 'background'
  | 'ai'
  | 'layers'
  | 'projects';

export interface CanvasPreset {
  id: string;
  name: string;
  category: 'social' | 'print' | 'banner' | 'presentation' | 'custom';
  width: number;
  height: number;
  unit?: 'px' | 'mm' | 'in';
  aspectRatio: string;
  description: string;
}

export interface LayerItem {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  locked: boolean;
  zIndex: number;
}

export interface ProjectMetadata {
  id: string;
  name: string;
  width: number;
  height: number;
  createdAt: number;
  updatedAt: number;
  thumbnail?: string;
  canvasJson?: string;
}

export interface StockImage {
  id: string;
  title: string;
  category: 'tech' | 'nature' | 'business' | 'food' | 'abstract' | 'people';
  url: string;
  author: string;
}

export interface TemplateData {
  id: string;
  title: string;
  category: 'instagram' | 'youtube' | 'poster' | 'banner' | 'flyer' | 'presentation';
  width: number;
  height: number;
  thumbnail: string;
  description: string;
  backgroundColor?: string;
  gradient?: {
    type: 'linear' | 'radial';
    coords: { x1: number; y1: number; x2: number; y2: number };
    colorStops: { offset: number; color: string }[];
  };
  elements: any[];
}

export interface ImageFilterValues {
  brightness: number;  // -1 to 1
  contrast: number;    // -1 to 1
  saturation: number;  // -1 to 1
  blur: number;        // 0 to 1
  grayscale: boolean;
  sepia: boolean;
  invert: boolean;
  opacity: number;     // 0 to 1
}

export interface TextProperties {
  text: string;
  fontFamily: string;
  fontSize: number;
  fill: string;
  textAlign: string;
  fontWeight: string | number;
  fontStyle: string;
  underline: boolean;
  linethrough: boolean;
  charSpacing: number;
  lineHeight: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  stroke?: string;
  strokeWidth?: number;
  backgroundColor?: string;
  textTransform?: 'none' | 'uppercase' | 'lowercase';
}

export interface ShapeProperties {
  fill: string;
  stroke: string;
  strokeWidth: number;
  strokeDashArray?: number[];
  opacity: number;
  rx?: number; // rounded corners
  ry?: number;
  shadowColor?: string;
  shadowBlur?: number;
}


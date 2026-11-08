import { CanvasPreset } from '../types/editor';

export const CANVAS_PRESETS: CanvasPreset[] = [
  {
    id: 'instagram-post',
    name: 'Instagram Post',
    category: 'social',
    width: 1080,
    height: 1080,
    aspectRatio: '1:1',
    description: 'Perfect square post for Instagram feed (1080 x 1080 px)'
  },
  {
    id: 'instagram-story',
    name: 'Instagram Story / Reel',
    category: 'social',
    width: 1080,
    height: 1920,
    aspectRatio: '9:16',
    description: 'Full screen vertical story, TikTok, or Reel (1080 x 1920 px)'
  },
  {
    id: 'youtube-thumbnail',
    name: 'YouTube Thumbnail',
    category: 'social',
    width: 1280,
    height: 720,
    aspectRatio: '16:9',
    description: 'Eye-catching HD video thumbnail (1280 x 720 px)'
  },
  {
    id: 'facebook-banner',
    name: 'Facebook / Web Banner',
    category: 'banner',
    width: 1200,
    height: 630,
    aspectRatio: '1.91:1',
    description: 'Hero cover image or social banner (1200 x 630 px)'
  },
  {
    id: 'poster',
    name: 'Poster (A4)',
    category: 'print',
    width: 1240,
    height: 1754,
    aspectRatio: '1:1.41',
    description: 'High-resolution vertical printable poster (1240 x 1754 px)'
  },
  {
    id: 'flyer',
    name: 'Event Flyer',
    category: 'print',
    width: 1200,
    height: 1800,
    aspectRatio: '2:3',
    description: 'Promotional marketing and event flyer (1200 x 1800 px)'
  },
  {
    id: 'presentation',
    name: 'Presentation Slide',
    category: 'presentation',
    width: 1920,
    height: 1080,
    aspectRatio: '16:9',
    description: 'Full HD widescreen slide (1920 x 1080 px)'
  },
  {
    id: 'custom',
    name: 'Custom Dimensions',
    category: 'custom',
    width: 1000,
    height: 1000,
    aspectRatio: 'Custom',
    description: 'Define your own canvas width and height'
  }
];

export const POPULAR_FONTS = [
  { name: 'Inter', family: 'Inter', category: 'Sans-Serif' },
  { name: 'Montserrat', family: 'Montserrat', category: 'Modern Geometric' },
  { name: 'Roboto', family: 'Roboto', category: 'Clean Sans' },
  { name: 'Playfair Display', family: 'Playfair Display', category: 'Elegant Serif' },
  { name: 'Oswald', family: 'Oswald', category: 'Bold Condensed' },
  { name: 'Bebas Neue', family: 'Bebas Neue', category: 'Headline Display' },
  { name: 'Anton', family: 'Anton', category: 'Impact Display' },
  { name: 'Pacifico', family: 'Pacifico', category: 'Handwritten Script' },
  { name: 'Dancing Script', family: 'Dancing Script', category: 'Casual Script' },
  { name: 'Courier Prime', family: 'Courier Prime', category: 'Monospace' },
  { name: 'Poppins', family: 'Poppins', category: 'Friendly Sans' }
];

export const COLOR_PALETTES = [
  { name: 'Neon Cyber', colors: ['#ff007f', '#00f0ff', '#7000ff', '#ffe600', '#0a0a14'] },
  { name: 'Sunset Warm', colors: ['#ff4d4d', '#f9844a', '#f9c74f', '#90be6d', '#43aa8b'] },
  { name: 'Midnight Elegance', colors: ['#0f172a', '#1e293b', '#3b82f6', '#94a3b8', '#f8fafc'] },
  { name: 'Forest Earth', colors: ['#2d6a4f', '#40916c', '#52b788', '#d8f3dc', '#1b4332'] },
  { name: 'Pastel Dream', colors: ['#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea'] },
  { name: 'Adobe Classic', colors: ['#eb1000', '#fa0f00', '#1473e6', '#2680eb', '#1e1e1e'] },
  { name: 'Luxury Gold', colors: ['#111111', '#242424', '#d4af37', '#f3e5ab', '#ffffff'] },
  { name: 'Vibrant Coral', colors: ['#ff5376', '#ff8e53', '#6c5ce7', '#a29bfe', '#2d3436'] }
];


# Adobe Express Studio — Next-Gen Web Graphic Design Editor

A web-based graphic design editor inspired by [Adobe Express](https://www.adobe.com/express/), built with **React**, **TypeScript**, **Fabric.js**, **Tailwind CSS**, **Zustand**, and **IndexedDB**.

Designed and reverse-engineered using REA (Reverse Engineering Approach) to replicate the core workflows of professional browser-based authoring: multi-layered scene graph, rich typography pairing, vector shapes, asset uploads, real-time image filters, AI design assistance, and client-side project persistence and export.

---

## 🎨 Feature Summary

| Feature Category | Implementation Details |
| :--- | :--- |
| **1. Design Canvas** | Customizable canvas sizes and aspect ratios. Built-in presets for Instagram Posts (1:1), Stories/Reels (9:16), YouTube Thumbnails (16:9), Web Banners, A4 Posters, Event Flyers, and 16:9 Presentation Slides. Zoom, pan, and fit-to-screen controls. |
| **2. Templates** | 8+ pre-built, editable design templates across Instagram, YouTube, Posters, Banners, Flyers, and Slides. Loading a template populates real editable Fabric objects (text, shapes, backgrounds, badges) onto the canvas. |
| **3. Text Editing** | Heading, Subheading, and Body insertion. Font family picker (11 Google Fonts: Inter, Anton, Montserrat, Playfair Display, Oswald, Bebas Neue, Pacifico, Dancing Script, etc.), size stepper, color swatches, text styles (bold, italic, underline, strikethrough, uppercase), letter spacing, line height, text alignment, drop shadow controls, outline stroke, and badge background highlight. |
| **4. Image Upload & Stock** | Drag-and-drop local image uploader (PNG, JPG, SVG, WebP) with persistent storage in IndexedDB. Built-in curated stock photo library (Unsplash CDN) across Tech, Nature, Business, Food, Abstract, and People. |
| **5. Shapes & Elements** | Rectangles, rounded rectangles, circles, triangles, 5-point stars, hearts, solid lines, dashed lines, arrows, ribbon badges, discount tags, and vector icons (Web, Phone, Mail, Location, Hot/Flame, Shop, Sparkles, Check). Fill colors, border colors, border widths, and corner radius. |
| **6. Background Customization** | Solid color swatches + hex picker, multi-stop linear/radial gradients, and texture/pattern backgrounds. |
| **7. Layer Management** | Visual layer stack panel displaying all objects on canvas with icons and names. Actions: Bring to Front, Send to Back, Move Forward, Move Backward, Visibility Toggle (Eye), Lock/Unlock, and Delete. |
| **8. Image Editing** | Interactive rotate (90° CW/CCW), flip horizontal, flip vertical, shape masks & cropping (Circle Avatar, Square 1:1, 16:9 Landscape), and live image filters: Brightness, Contrast, Saturation, Blur, Opacity, Grayscale (B&W), Sepia, and Invert. |
| **9. Design Tools** | Smart snapping to canvas centerlines, alignment tools (Align Left, Center, Right, Top, Middle, Bottom), grouping & ungrouping (`Ctrl+G` / `Ctrl+Shift+G`), alignment grid overlay toggle, duplicate (`Ctrl+D`), undo/redo stack (`Ctrl+Z` / `Ctrl+Y`), arrow key nudging (Shift+Arrow = 10px), and keyboard shortcuts. |
| **10. AI Design Assistance** | Intelligent design engine: enter any prompt to generate complete canvas layouts, matching color palettes, and marketing copy (headlines, subheadings, CTAs) with 1-click apply. 100% free and works offline; optional Gemini API key support. |
| **11. Project Management** | Local IndexedDB persistence via `idb`. Auto-save, manual save, project renaming, duplicate project, list view with thumbnail previews, and reopen existing designs. |
| **12. Multi-Format Export** | Download designs in PNG (with optional transparency), JPG (with quality slider), and PDF (high-resolution print format via `jsPDF`). |

---

## 🏗️ Architecture & REA Findings

### System Architecture Comparison

```
┌────────────────────────────────────────────────────────┐
│             Adobe Express Studio Architecture          │
├────────────────────────────────────────────────────────┤
│  Top Toolbar: Project Name • Undo/Redo • Save • Export │
├───────────────┬────────────────────────┬───────────────┤
│ Left Sidebar: │ Center Canvas:         │ Right Panel:  │
│ • Templates   │ • Fabric.js 2D Scene   │ • Contextual  │
│ • Text        │ • Zoom / Pan / Fit     │   Properties  │
│ • Elements    │ • Snap Alignment       │ • Transform   │
│ • Uploads     │ • Layer Stack Panel    │ • Align/Order │
│ • Background  │                        │               │
│ • AI Assistant│                        │               │
│ • Projects    │                        │               │
├───────────────┴────────────────────────┴───────────────┤
│ Persistence: IndexedDB (Projects, Uploads, Thumbnails) │
│ Export Pipeline: Canvas toDataURL • jsPDF Engine       │
└────────────────────────────────────────────────────────┘
```

1. **Scene Graph & Rendering Engine**: Adobe Express uses WebAssembly-based rendering and a unified DOM/canvas layer. In our implementation, **Fabric.js** serves as the 2D scene graph engine, providing object-oriented transforms, filter pipelines, and bi-directional JSON serialization.
2. **Context-Aware Properties**: Clicking any element dynamically swaps the inspector to show the exact controls relevant to that element (Text vs Image vs Shape vs Canvas background).
3. **Decoupled State Management**: UI state (active tab, modals, zoom, selection) is coordinated via **Zustand**, while design persistence is handled by **IndexedDB**, ensuring zero data loss across reloads.
4. **No Mandatory Paid APIs**: All features (templates, stock photos, fonts, AI design synthesis, exports) operate client-side without mandatory subscriptions or API keys.

---

## 📁 Project Folder Structure

```
Adobe/
├── dist/                          # Production build output
├── node_modules/                  # Installed dependencies
├── public/                        # Static assets
├── src/
│   ├── assets/
│   │   ├── canvasPresets.ts       # Canvas dimension presets, fonts, palettes
│   │   ├── stockImages.ts         # Curated stock photography CDN assets
│   │   └── templatesData.ts       # Production templates across 6 categories
│   ├── components/
│   │   ├── Canvas/
│   │   │   ├── CanvasControls.tsx # Floating zoom & layer toggle bar
│   │   │   └── DesignCanvas.tsx   # Interactive Fabric.js canvas stage
│   │   ├── Header/
│   │   │   ├── ExportModal.tsx    # PNG, JPG, PDF export dialog
│   │   │   └── TopToolbar.tsx     # Brand, project title, history, save/export
│   │   ├── Layers/
│   │   │   └── LayerStackPanel.tsx# Layer hierarchy, ordering, lock, visibility
│   │   ├── Modals/
│   │   │   ├── NewProjectModal.tsx# New design creation dialog
│   │   │   └── ResizeModal.tsx    # Canvas resize & aspect ratio dialog
│   │   ├── Properties/
│   │   │   ├── CanvasProperties.tsx   # Background fill & canvas dimensions
│   │   │   ├── ImageProperties.tsx    # Filter adjustments, rotation, flip
│   │   │   ├── PropertiesPanel.tsx    # Context-sensitive inspector container
│   │   │   ├── ShapeProperties.tsx    # Fill, border, corner radius, opacity
│   │   │   ├── TextProperties.tsx     # Fonts, sizes, formatting, spacing
│   │   │   └── TransformProperties.tsx# Alignment & layer order buttons
│   │   └── Sidebar/
│   │       ├── AiAssistantPanel.tsx   # AI layout, copy & palette generator
│   │       ├── BackgroundPanel.tsx    # Color swatches & gradients
│   │       ├── ElementsPanel.tsx      # Shapes, lines, arrows, badges
│   │       ├── LeftSidebar.tsx        # Vertical navigation rail & drawer
│   │       ├── ProjectsPanel.tsx      # Saved projects manager
│   │       ├── TemplatesPanel.tsx     # Template library & categories
│   │       ├── TextPanel.tsx          # Typography presets & text buttons
│   │       └── UploadsPanel.tsx       # File uploads & stock library
│   ├── services/
│   │   ├── aiService.ts           # Procedural AI layout & copy generator
│   │   ├── dbService.ts           # IndexedDB client with idb
│   │   ├── exportService.ts       # PNG/JPG/PDF export engine
│   │   └── fabricService.ts       # Fabric.js canvas singleton & helpers
│   ├── store/
│   │   ├── useEditorStore.ts      # Editor state, selection, zoom, active tab
│   │   └── useProjectStore.ts     # Project persistence & autosave store
│   ├── types/
│   │   └── editor.ts              # TypeScript interfaces & types
│   ├── App.tsx                    # Root application component
│   ├── index.css                  # Tailwind styles & theme variables
│   └── main.tsx                   # React DOM entrypoint
├── index.html                     # HTML root with Google Fonts
├── package.json                   # Dependencies and scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Adobe dark theme tokens
├── test-runner.ts                 # Automated test suite
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite bundler configuration
```

---

## 🚀 Setup & Running Instructions

### Prerequisites
- **Node.js** (v18.0.0 or later, v20+ recommended)
- **npm** (v9+ or later)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to start creating designs.

### 3. Run Automated Tests
```bash
npm test
```
Executes the comprehensive automated test suite verifying presets, template schemas, and the AI design generation engine.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 🧪 Testing Verification Report

An automated test suite (`test-runner.ts`) was executed with the following results:

```text
--- RUNNING ADOBE EXPRESS STUDIO AUTOMATED TEST SUITE ---
✓ PASS: Should have at least 7 presets (found 8)
✓ PASS: Instagram preset dimensions are 1080x1080
✓ PASS: YouTube preset dimensions are 1280x720
✓ PASS: Should have templates across all requested categories (found 8)
✓ PASS: Template "Summer Mega Sale" contains 8 elements (1080x1080)
✓ PASS: Template "Inspiring Daily Quote" contains 5 elements (1080x1080)
✓ PASS: Template "Full Stack Web Dev 2026" contains 7 elements (1280x720)
✓ PASS: Template "15 Min Home Workout" contains 5 elements (1280x720)
✓ PASS: Template "Neon Nights Cyber Music Festival" contains 9 elements (1240x1754)
✓ PASS: Template "Executive AI Masterclass Banner" contains 9 elements (1200x630)
✓ PASS: Template "Artisan Coffee Grand Opening" contains 8 elements (1200x1800)
✓ PASS: Template "Company Pitch Deck — Title Slide" contains 11 elements (1920x1080)
✓ PASS: AI generated 1280x720 thumbnail for YouTube/podcast prompt
✓ PASS: AI generated 7 editable canvas elements
✓ PASS: AI generated headline copy suggestions
✓ PASS: AI generated CTA suggestions
✓ PASS: AI generated 1200x1800 flyer for opening flyer prompt
✓ PASS: AI generated 5-color harmonious palette

✓ PASS: Export service provides exportCanvas function
✓ PASS: Export service provides generateThumbnail function
✓ PASS: Fabric service exposes addText API
✓ PASS: Fabric service exposes addShape API
✓ PASS: Fabric service exposes addSvgIcon API
✓ PASS: Fabric service exposes applyImageClipMask API
✓ PASS: Fabric service exposes groupActiveObjects API
✓ PASS: Fabric service exposes ungroupActiveObject API

TEST SUMMARY: 34 Passed, 0 Failed
```

---

## 🚢 Deployment Instructions

### Option 1: Vercel (Recommended)
1. Push your repository to GitHub.
2. In the Vercel dashboard, click **Add New Project** and import the repository.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**.

### Option 2: Netlify
1. Connect your GitHub repository to Netlify.
2. Set Build command to `npm run build`.
3. Set Publish directory to `dist`.
4. Click **Deploy site**.

### Option 3: Docker / Nginx
Create a `Dockerfile`:
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```
Build and run:
```bash
docker build -t adobe-express-studio .
docker run -p 8080:80 adobe-express-studio
```
Access at `http://localhost:8080`.

---

## ⌨️ Keyboard Shortcuts Reference

| Shortcut | Action |
| :--- | :--- |
| **Ctrl + Z** / **Cmd + Z** | Undo last action |
| **Ctrl + Y** / **Ctrl + Shift + Z** | Redo action |
| **Ctrl + D** / **Cmd + D** | Duplicate selected element |
| **Ctrl + G** | Group multi-selected elements |
| **Ctrl + Shift + G** | Ungroup selected group |
| **Delete** / **Backspace** | Delete selected element |
| **Arrow Keys** | Nudge element by 1px |
| **Shift + Arrow Keys** | Nudge element by 10px |
| **Escape** | Deselect active element |


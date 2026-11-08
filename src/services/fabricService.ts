import { fabric } from 'fabric';
import { ImageFilterValues, TemplateData } from '../types/editor';

// Configure Fabric default controls styling to match Adobe Spectrum (blue outline, white round handles)
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.cornerColor = '#3b82f6';
fabric.Object.prototype.cornerStrokeColor = '#ffffff';
fabric.Object.prototype.borderColor = '#3b82f6';
fabric.Object.prototype.cornerSize = 10;
fabric.Object.prototype.cornerStyle = 'circle';
fabric.Object.prototype.borderScaleFactor = 2;
fabric.Object.prototype.borderDashArray = [4, 4];

export class FabricService {
  private canvas: fabric.Canvas | null = null;
  private history: string[] = [];
  private historyIndex: number = -1;
  private isHistoryProcessing: boolean = false;
  private onSelectionChange?: (selected: fabric.Object | null) => void;
  private onCanvasModified?: () => void;
  private onHistoryChange?: (canUndo: boolean, canRedo: boolean) => void;

  public setCanvas(canvas: fabric.Canvas) {
    this.canvas = canvas;
    this.setupEventListeners();
  }

  public getCanvas(): fabric.Canvas | null {
    return this.canvas;
  }

  public setCallbacks(callbacks: {
    onSelectionChange?: (selected: fabric.Object | null) => void;
    onCanvasModified?: () => void;
    onHistoryChange?: (canUndo: boolean, canRedo: boolean) => void;
  }) {
    this.onSelectionChange = callbacks.onSelectionChange;
    this.onCanvasModified = callbacks.onCanvasModified;
    this.onHistoryChange = callbacks.onHistoryChange;
  }

  private setupEventListeners() {
    if (!this.canvas) return;

    this.canvas.on('selection:created', (e) => {
      this.onSelectionChange?.(e.selected ? e.selected[0] : null);
    });

    this.canvas.on('selection:updated', (e) => {
      this.onSelectionChange?.(e.selected ? e.selected[0] : null);
    });

    this.canvas.on('selection:cleared', () => {
      this.onSelectionChange?.(null);
    });

    this.canvas.on('object:modified', () => {
      this.saveHistoryState();
      this.onCanvasModified?.();
    });

    this.canvas.on('object:added', () => {
      if (!this.isHistoryProcessing) {
        this.saveHistoryState();
        this.onCanvasModified?.();
      }
    });

    this.canvas.on('object:removed', () => {
      if (!this.isHistoryProcessing) {
        this.saveHistoryState();
        this.onCanvasModified?.();
      }
    });

    this.canvas.on('path:created', () => {
      if (!this.isHistoryProcessing) {
        this.saveHistoryState();
        this.onCanvasModified?.();
      }
    });

    // Snapping / Alignment guidelines
    this.setupSnappingGuides();
  }

  // Snapping and alignment guide lines
  private setupSnappingGuides() {
    if (!this.canvas) return;

    const snapDistance = 10;
    this.canvas.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj || !this.canvas) return;

      const canvasWidth = this.canvas.getWidth();
      const canvasHeight = this.canvas.getHeight();
      const objCenter = obj.getCenterPoint();

      // Snap to canvas horizontal center
      if (Math.abs(objCenter.x - canvasWidth / 2) < snapDistance) {
        obj.setPositionByOrigin(new fabric.Point(canvasWidth / 2, objCenter.y), 'center', 'center');
      }

      // Snap to canvas vertical center
      if (Math.abs(objCenter.y - canvasHeight / 2) < snapDistance) {
        obj.setPositionByOrigin(new fabric.Point(objCenter.x, canvasHeight / 2), 'center', 'center');
      }

      obj.setCoords();
    });
  }

  // History State Stack (Undo / Redo)
  public saveHistoryState() {
    if (!this.canvas || this.isHistoryProcessing) return;

    const json = JSON.stringify(this.canvas.toJSON(['id', 'name', 'locked', 'selectable']));

    // Truncate redo history if we made a new change after undoing
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }

    this.history.push(json);
    // Keep max 50 steps
    if (this.history.length > 50) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }

    this.updateHistoryButtons();
  }

  public undo() {
    if (!this.canvas || this.historyIndex <= 0) return;

    this.isHistoryProcessing = true;
    this.historyIndex--;
    const state = this.history[this.historyIndex];

    this.canvas.loadFromJSON(state, () => {
      this.canvas?.renderAll();
      this.isHistoryProcessing = false;
      this.updateHistoryButtons();
      this.onCanvasModified?.();
    });
  }

  public redo() {
    if (!this.canvas || this.historyIndex >= this.history.length - 1) return;

    this.isHistoryProcessing = true;
    this.historyIndex++;
    const state = this.history[this.historyIndex];

    this.canvas.loadFromJSON(state, () => {
      this.canvas?.renderAll();
      this.isHistoryProcessing = false;
      this.updateHistoryButtons();
      this.onCanvasModified?.();
    });
  }

  private updateHistoryButtons() {
    const canUndo = this.historyIndex > 0;
    const canRedo = this.historyIndex < this.history.length - 1;
    this.onHistoryChange?.(canUndo, canRedo);
  }

  // Resize canvas dimensions
  public resizeCanvas(width: number, height: number) {
    if (!this.canvas) return;
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);
    this.canvas.renderAll();
    this.saveHistoryState();
  }

  // Add Text Elements
  public addText(type: 'heading' | 'subheading' | 'body' | 'preset', options?: Partial<fabric.ITextOptions>) {
    if (!this.canvas) return;

    let defaultText = 'Heading';
    let fontSize = 54;
    let fontWeight: string | number = 'bold';
    let fontFamily = 'Inter';
    let fill = '#ffffff';

    if (type === 'heading') {
      defaultText = 'Add a Heading';
      fontSize = 64;
      fontWeight = 'bold';
      fontFamily = 'Anton';
    } else if (type === 'subheading') {
      defaultText = 'Add a Subheading';
      fontSize = 36;
      fontWeight = 600;
      fontFamily = 'Montserrat';
      fill = '#e2e8f0';
    } else if (type === 'body') {
      defaultText = 'Add body text with detailed description or message.';
      fontSize = 24;
      fontWeight = 'normal';
      fontFamily = 'Inter';
      fill = '#94a3b8';
    }

    const textObj = new fabric.Textbox(defaultText, {
      left: this.canvas.getWidth() / 2,
      top: this.canvas.getHeight() / 2,
      originX: 'center',
      originY: 'center',
      fontFamily,
      fontSize,
      fontWeight,
      fill,
      textAlign: 'center',
      width: Math.min(this.canvas.getWidth() * 0.7, 500),
      splitByGrapheme: false,
      name: `${type.toUpperCase()} Text`,
      ...options,
    });

    this.canvas.add(textObj);
    this.canvas.setActiveObject(textObj);
    textObj.selectAll();
    textObj.enterEditing();
    this.canvas.renderAll();
  }

  // Add Shapes
  public addShape(
    shapeType: 'rect' | 'circle' | 'triangle' | 'star' | 'line' | 'arrow' | 'heart' | 'badge',
    options?: any
  ) {
    if (!this.canvas) return;

    const centerX = this.canvas.getWidth() / 2;
    const centerY = this.canvas.getHeight() / 2;
    let shapeObj: fabric.Object;

    const baseProps = {
      left: centerX,
      top: centerY,
      originX: 'center',
      originY: 'center',
      fill: '#3b82f6',
      stroke: '#ffffff',
      strokeWidth: 0,
      ...options,
    };

    switch (shapeType) {
      case 'rect':
        shapeObj = new fabric.Rect({
          ...baseProps,
          width: 240,
          height: 160,
          rx: options?.rx || 8,
          ry: options?.ry || 8,
          name: 'Rectangle'
        });
        break;

      case 'circle':
        shapeObj = new fabric.Circle({
          ...baseProps,
          radius: 100,
          name: 'Circle'
        });
        break;

      case 'triangle':
        shapeObj = new fabric.Triangle({
          ...baseProps,
          width: 200,
          height: 180,
          name: 'Triangle'
        });
        break;

      case 'star': {
        // 5-point star path
        const starPath =
          'M 100,0 L 125,65 L 195,68 L 140,110 L 160,175 L 100,135 L 40,175 L 60,110 L 5,68 L 75,65 Z';
        shapeObj = new fabric.Path(starPath, {
          ...baseProps,
          scaleX: 1.2,
          scaleY: 1.2,
          name: 'Star'
        });
        break;
      }

      case 'heart': {
        const heartPath =
          'M 140 20 C 73 -25 20 74 140 160 C 260 74 207 -25 140 20 Z';
        shapeObj = new fabric.Path(heartPath, {
          ...baseProps,
          fill: '#f43f5e',
          scaleX: 1.2,
          scaleY: 1.2,
          name: 'Heart'
        });
        break;
      }

      case 'line':
        shapeObj = new fabric.Line([centerX - 150, centerY, centerX + 150, centerY], {
          stroke: '#3b82f6',
          strokeWidth: 6,
          strokeLineCap: 'round',
          name: 'Line',
          ...options
        });
        break;

      case 'arrow': {
        const line = new fabric.Line([0, 0, 160, 0], {
          stroke: options?.fill || '#3b82f6',
          strokeWidth: 6,
          originX: 'center',
          originY: 'center',
        });
        const arrowHead = new fabric.Triangle({
          left: 80,
          top: 0,
          angle: 90,
          width: 24,
          height: 24,
          fill: options?.fill || '#3b82f6',
          originX: 'center',
          originY: 'center',
        });
        shapeObj = new fabric.Group([line, arrowHead], {
          left: centerX,
          top: centerY,
          originX: 'center',
          originY: 'center',
          name: 'Arrow',
        });
        break;
      }

      case 'badge': {
        // Ribbon / Discount Badge shape
        const badgePath =
          'M 0 0 L 180 0 L 150 50 L 180 100 L 0 100 L 30 50 Z';
        shapeObj = new fabric.Path(badgePath, {
          ...baseProps,
          fill: '#e11d48',
          scaleX: 1.4,
          scaleY: 1,
          name: 'Banner Ribbon'
        });
        break;
      }

      default:
        shapeObj = new fabric.Rect({
          ...baseProps,
          width: 200,
          height: 200,
          name: 'Shape'
        });
    }

    this.canvas.add(shapeObj);
    this.canvas.setActiveObject(shapeObj);
    this.canvas.renderAll();
  }

  // Add SVG Vector Icon directly to canvas
  public addSvgIcon(svgString: string, name: string = 'Vector Icon', fill: string = '#3b82f6') {
    if (!this.canvas) return;

    fabric.loadSVGFromString(svgString, (objects, options) => {
      if (!this.canvas) return;
      const obj = fabric.util.groupSVGElements(objects, options);

      // Scale icon to a standard size (~120px)
      const maxDim = Math.max(obj.width || 100, obj.height || 100);
      const scale = 120 / maxDim;

      obj.set({
        left: this.canvas.getWidth() / 2,
        top: this.canvas.getHeight() / 2,
        originX: 'center',
        originY: 'center',
        scaleX: scale,
        scaleY: scale,
        fill: fill,
        name: name,
      });

      // Recolor child paths if applicable
      if ((obj as any)._objects) {
        (obj as any)._objects.forEach((child: fabric.Object) => {
          child.set('fill', fill);
        });
      }

      this.canvas.add(obj);
      this.canvas.setActiveObject(obj);
      this.canvas.renderAll();
      this.saveHistoryState();
      this.onCanvasModified?.();
    });
  }

  // Add Image from URL or uploaded File dataURL
  public addImage(url: string, name?: string) {
    if (!this.canvas) return;

    fabric.Image.fromURL(
      url,
      (img) => {
        if (!this.canvas) return;

        // Auto scale to fit comfortably inside canvas (max 60% of canvas dimension)
        const maxWidth = this.canvas.getWidth() * 0.65;
        const maxHeight = this.canvas.getHeight() * 0.65;
        const scale = Math.min(maxWidth / (img.width || 1), maxHeight / (img.height || 1), 1);

        img.set({
          left: this.canvas.getWidth() / 2,
          top: this.canvas.getHeight() / 2,
          originX: 'center',
          originY: 'center',
          scaleX: scale,
          scaleY: scale,
          name: name || 'Image',
          crossOrigin: 'anonymous',
        });

        this.canvas.add(img);
        this.canvas.setActiveObject(img);
        this.canvas.renderAll();
      },
      { crossOrigin: 'anonymous' }
    );
  }

  // Background Management
  public setBackgroundColor(color: string) {
    if (!this.canvas) return;
    this.canvas.backgroundColor = color;
    this.canvas.renderAll();
    this.saveHistoryState();
    this.onCanvasModified?.();
  }

  public setBackgroundGradient(stops: { offset: number; color: string }[], angle: number = 45) {
    if (!this.canvas) return;

    const width = this.canvas.getWidth();
    const height = this.canvas.getHeight();

    // Calculate coords based on angle
    const angleRad = (angle * Math.PI) / 180;
    const x2 = Math.cos(angleRad) * width;
    const y2 = Math.sin(angleRad) * height;

    const gradient = new fabric.Gradient({
      type: 'linear',
      coords: {
        x1: 0,
        y1: 0,
        x2: Math.max(x2, 0),
        y2: Math.max(y2, 0),
      },
      colorStops: stops,
    });

    this.canvas.backgroundColor = gradient as any;
    this.canvas.renderAll();
    this.saveHistoryState();
    this.onCanvasModified?.();
  }

  // Layer Reordering
  public bringForward() {
    const active = this.canvas?.getActiveObject();
    if (active && this.canvas) {
      this.canvas.bringForward(active);
      this.canvas.renderAll();
      this.onCanvasModified?.();
    }
  }

  public sendBackwards() {
    const active = this.canvas?.getActiveObject();
    if (active && this.canvas) {
      this.canvas.sendBackwards(active);
      this.canvas.renderAll();
      this.onCanvasModified?.();
    }
  }

  public bringToFront() {
    const active = this.canvas?.getActiveObject();
    if (active && this.canvas) {
      this.canvas.bringToFront(active);
      this.canvas.renderAll();
      this.onCanvasModified?.();
    }
  }

  public sendToBack() {
    const active = this.canvas?.getActiveObject();
    if (active && this.canvas) {
      this.canvas.sendToBack(active);
      this.canvas.renderAll();
      this.onCanvasModified?.();
    }
  }

  // Layer Lock & Visibility
  public toggleLock(targetObject?: fabric.Object) {
    const obj = targetObject || this.canvas?.getActiveObject();
    if (!obj || !this.canvas) return;

    const isLocked = !obj.lockMovementX;
    obj.set({
      lockMovementX: isLocked,
      lockMovementY: isLocked,
      lockRotation: isLocked,
      lockScalingX: isLocked,
      lockScalingY: isLocked,
      hasControls: !isLocked,
    });
    this.canvas.renderAll();
    this.onCanvasModified?.();
  }

  public toggleVisibility(targetObject?: fabric.Object) {
    const obj = targetObject || this.canvas?.getActiveObject();
    if (!obj || !this.canvas) return;

    obj.visible = !obj.visible;
    if (!obj.visible && this.canvas.getActiveObject() === obj) {
      this.canvas.discardActiveObject();
    }
    this.canvas.renderAll();
    this.onCanvasModified?.();
  }

  // Group and Ungroup Objects
  public groupActiveObjects() {
    if (!this.canvas) return;
    const activeObj = this.canvas.getActiveObject();
    if (activeObj && activeObj.type === 'activeSelection') {
      const activeSel = activeObj as fabric.ActiveSelection;
      const group = activeSel.toGroup();
      this.canvas.setActiveObject(group);
      this.canvas.renderAll();
      this.saveHistoryState();
      this.onCanvasModified?.();
    }
  }

  public ungroupActiveObject() {
    if (!this.canvas) return;
    const activeObj = this.canvas.getActiveObject();
    if (activeObj && activeObj.type === 'group') {
      const group = activeObj as fabric.Group;
      const sel = group.toActiveSelection();
      this.canvas.setActiveObject(sel);
      this.canvas.renderAll();
      this.saveHistoryState();
      this.onCanvasModified?.();
    }
  }

  // Duplicate Object
  public duplicateActiveObject() {
    const active = this.canvas?.getActiveObject();
    if (!active || !this.canvas) return;

    active.clone((cloned: fabric.Object) => {
      if (!this.canvas) return;
      this.canvas.discardActiveObject();
      cloned.set({
        left: (cloned.left || 0) + 30,
        top: (cloned.top || 0) + 30,
        evented: true,
      });

      if (cloned.type === 'activeSelection') {
        const activeSel = cloned as fabric.ActiveSelection;
        activeSel.canvas = this.canvas;
        activeSel.forEachObject((obj) => {
          this.canvas?.add(obj);
        });
        cloned.setCoords();
      } else {
        this.canvas.add(cloned);
      }

      this.canvas.setActiveObject(cloned);
      this.canvas.renderAll();
    });
  }

  // Delete Object
  public deleteActiveObject() {
    if (!this.canvas) return;
    const active = this.canvas.getActiveObject();
    if (!active) return;

    if (active.type === 'activeSelection') {
      const activeSel = active as fabric.ActiveSelection;
      activeSel.forEachObject((obj) => {
        this.canvas?.remove(obj);
      });
      this.canvas.discardActiveObject();
    } else {
      this.canvas.remove(active);
    }

    this.canvas.renderAll();
  }

  // Alignment Tools
  public alignActiveObject(alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') {
    const active = this.canvas?.getActiveObject();
    if (!active || !this.canvas) return;

    const canvasWidth = this.canvas.getWidth();
    const canvasHeight = this.canvas.getHeight();
    const bound = active.getBoundingRect();

    switch (alignment) {
      case 'left':
        active.set('left', active.originX === 'center' ? bound.width / 2 : 0);
        break;
      case 'center':
        active.set('left', active.originX === 'center' ? canvasWidth / 2 : canvasWidth / 2 - bound.width / 2);
        break;
      case 'right':
        active.set('left', active.originX === 'center' ? canvasWidth - bound.width / 2 : canvasWidth - bound.width);
        break;
      case 'top':
        active.set('top', active.originY === 'center' ? bound.height / 2 : 0);
        break;
      case 'middle':
        active.set('top', active.originY === 'center' ? canvasHeight / 2 : canvasHeight / 2 - bound.height / 2);
        break;
      case 'bottom':
        active.set('top', active.originY === 'center' ? canvasHeight - bound.height / 2 : canvasHeight - bound.height);
        break;
    }

    active.setCoords();
    this.canvas.renderAll();
    this.saveHistoryState();
  }

  // Flip Object
  public flipActiveObject(direction: 'horizontal' | 'vertical') {
    const active = this.canvas?.getActiveObject();
    if (!active || !this.canvas) return;

    if (direction === 'horizontal') {
      active.set('flipX', !active.flipX);
    } else {
      active.set('flipY', !active.flipY);
    }

    this.canvas.renderAll();
    this.saveHistoryState();
  }

  // Rotate Object
  public rotateActiveObject(angleDelta: number) {
    const active = this.canvas?.getActiveObject();
    if (!active || !this.canvas) return;

    const currentAngle = active.angle || 0;
    active.rotate((currentAngle + angleDelta) % 360);
    this.canvas.renderAll();
    this.saveHistoryState();
  }

  // Image Filters Pipeline
  public applyFiltersToActiveImage(filterValues: ImageFilterValues) {
    const active = this.canvas?.getActiveObject();
    if (!active || active.type !== 'image' || !this.canvas) return;

    const img = active as fabric.Image;
    img.filters = [];

    // Brightness
    if (filterValues.brightness !== 0) {
      img.filters.push(
        new fabric.Image.filters.Brightness({
          brightness: filterValues.brightness,
        })
      );
    }

    // Contrast
    if (filterValues.contrast !== 0) {
      img.filters.push(
        new fabric.Image.filters.Contrast({
          contrast: filterValues.contrast,
        })
      );
    }

    // Saturation
    if (filterValues.saturation !== 0) {
      img.filters.push(
        new fabric.Image.filters.Saturation({
          saturation: filterValues.saturation,
        })
      );
    }

    // Blur
    if (filterValues.blur > 0) {
      img.filters.push(
        new fabric.Image.filters.Blur({
          blur: filterValues.blur,
        })
      );
    }

    // Grayscale
    if (filterValues.grayscale) {
      img.filters.push(new fabric.Image.filters.Grayscale());
    }

    // Sepia
    if (filterValues.sepia) {
      img.filters.push(new fabric.Image.filters.Sepia());
    }

    // Invert
    if (filterValues.invert) {
      img.filters.push(new fabric.Image.filters.Invert());
    }

    // Opacity
    img.set('opacity', filterValues.opacity);

    img.applyFilters();
    this.canvas.renderAll();
  }

  // Image Mask / Cropping Shapes
  public applyImageClipMask(shape: 'circle' | 'square' | 'wide' | 'reset') {
    const active = this.canvas?.getActiveObject();
    if (!active || active.type !== 'image' || !this.canvas) return;
    const img = active as fabric.Image;

    if (shape === 'reset') {
      img.clipPath = undefined;
      this.canvas.renderAll();
      this.saveHistoryState();
      this.onCanvasModified?.();
      return;
    }

    const w = img.width || 200;
    const h = img.height || 200;
    const minDim = Math.min(w, h);

    if (shape === 'circle') {
      img.clipPath = new fabric.Circle({
        radius: minDim / 2,
        originX: 'center',
        originY: 'center',
      });
    } else if (shape === 'square') {
      img.clipPath = new fabric.Rect({
        width: minDim,
        height: minDim,
        originX: 'center',
        originY: 'center',
      });
    } else if (shape === 'wide') {
      img.clipPath = new fabric.Rect({
        width: w,
        height: Math.min(h, w * (9 / 16)),
        originX: 'center',
        originY: 'center',
      });
    }

    this.canvas.renderAll();
    this.saveHistoryState();
    this.onCanvasModified?.();
  }

  // Load a complete Template
  public loadTemplate(template: TemplateData) {
    if (!this.canvas) return;

    this.canvas.clear();
    this.canvas.setWidth(template.width);
    this.canvas.setHeight(template.height);

    if (template.backgroundColor) {
      this.canvas.backgroundColor = template.backgroundColor;
    }

    // Add elements
    template.elements.forEach((spec) => {
      let obj: fabric.Object | null = null;

      if (spec.type === 'textbox') {
        obj = new fabric.Textbox(spec.text, {
          ...spec,
          splitByGrapheme: false,
        });
      } else if (spec.type === 'rect') {
        obj = new fabric.Rect(spec);
      } else if (spec.type === 'circle') {
        obj = new fabric.Circle(spec);
      } else if (spec.type === 'triangle') {
        obj = new fabric.Triangle(spec);
      } else if (spec.type === 'path') {
        obj = new fabric.Path(spec.path, spec);
      }

      if (obj && this.canvas) {
        this.canvas.add(obj);
      }
    });

    this.canvas.renderAll();
    this.history = [];
    this.historyIndex = -1;
    this.saveHistoryState();
    this.onCanvasModified?.();
  }

  // Freehand Drawing Mode (Brush / Pen Tool)
  public setDrawingMode(enabled: boolean, color: string = '#3b82f6', width: number = 6) {
    if (!this.canvas) return;
    this.canvas.isDrawingMode = enabled;
    if (enabled) {
      if (!this.canvas.freeDrawingBrush) {
        this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);
      }
      this.canvas.freeDrawingBrush.color = color;
      this.canvas.freeDrawingBrush.width = width;
    }
    this.canvas.renderAll();
  }

  public setBrushColor(color: string) {
    if (this.canvas && this.canvas.freeDrawingBrush) {
      this.canvas.freeDrawingBrush.color = color;
    }
  }

  public setBrushWidth(width: number) {
    if (this.canvas && this.canvas.freeDrawingBrush) {
      this.canvas.freeDrawingBrush.width = width;
    }
  }

  // QR Code Generation
  public addQrCode(urlOrText: string) {
    if (!urlOrText || !urlOrText.trim()) return;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(
      urlOrText.trim()
    )}`;
    this.addImage(qrUrl, 'QR Code');
  }

  // Export & Import Project Files (.json)
  public exportProjectFile(fileName: string = 'adobe-express-design.json') {
    if (!this.canvas) return;
    const json = JSON.stringify(this.canvas.toJSON(['id', 'name', 'locked', 'selectable']), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName.endsWith('.json') ? fileName : `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Load from Raw JSON
  public loadFromJson(jsonString: string, callback?: () => void) {
    if (!this.canvas) return;

    this.isHistoryProcessing = true;
    this.canvas.loadFromJSON(jsonString, () => {
      this.canvas?.renderAll();
      this.isHistoryProcessing = false;
      this.history = [jsonString];
      this.historyIndex = 0;
      this.updateHistoryButtons();
      this.onCanvasModified?.();
      callback?.();
    });
  }

  // Get all layers for the layer stack panel
  public getLayers() {
    if (!this.canvas) return [];
    const objects = this.canvas.getObjects();
    return objects
      .map((obj, index) => {
        let name = (obj as any).name;
        if (!name) {
          if (obj.type === 'textbox') {
            const txt = (obj as fabric.Textbox).text || '';
            name = `Text: "${txt.slice(0, 16)}${txt.length > 16 ? '...' : ''}"`;
          } else if (obj.type === 'image') {
            name = 'Image Layer';
          } else {
            name = `${obj.type?.toUpperCase()} Layer`;
          }
        }

        return {
          id: (obj as any).id || `layer-${index}`,
          name,
          type: obj.type || 'object',
          visible: obj.visible !== false,
          locked: !!obj.lockMovementX,
          fabricObject: obj,
          zIndex: index,
        };
      })
      .reverse(); // top layer first
  }
}

export const fabricServiceInstance = new FabricService();


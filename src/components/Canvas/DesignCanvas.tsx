import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useEditorStore } from '../../store/useEditorStore';
import { fabricServiceInstance } from '../../services/fabricService';
import { CanvasControls } from './CanvasControls';

export const DesignCanvas: React.FC = () => {
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    canvasWidth,
    canvasHeight,
    zoom,
    setZoom,
    isGridVisible,
    setSelectedObject,
    setHistoryState,
    incrementLayersVersion,
  } = useEditorStore();

  useEffect(() => {
    if (!canvasElRef.current) return;

    // Initialize Fabric.js Canvas
    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      selection: true,
      stopContextMenu: true,
      fireRightClick: true,
    });

    fabricServiceInstance.setCanvas(canvas);

    fabricServiceInstance.setCallbacks({
      onSelectionChange: (selected) => {
        setSelectedObject(selected);
      },
      onCanvasModified: () => {
        incrementLayersVersion();
      },
      onHistoryChange: (canUndo, canRedo) => {
        setHistoryState(canUndo, canRedo);
      },
    });

    // Save initial blank state
    fabricServiceInstance.saveHistoryState();

    // Auto fit canvas to screen initially
    fitToScreen(canvasWidth, canvasHeight);

    // Global keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input, textarea, or fabric active text editing
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      const activeObj = canvas.getActiveObject();
      if (activeObj && (activeObj as any).isEditing) {
        return;
      }

      // Undo: Ctrl+Z / Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        fabricServiceInstance.undo();
        return;
      }

      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z')
      ) {
        e.preventDefault();
        fabricServiceInstance.redo();
        return;
      }

      // Duplicate: Ctrl+D / Cmd+D
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        fabricServiceInstance.duplicateActiveObject();
        return;
      }

      // Group: Ctrl+G, Ungroup: Ctrl+Shift+G
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        if (e.shiftKey) {
          fabricServiceInstance.ungroupActiveObject();
        } else {
          fabricServiceInstance.groupActiveObjects();
        }
        return;
      }

      // Delete: Delete or Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (canvas.getActiveObject()) {
          e.preventDefault();
          fabricServiceInstance.deleteActiveObject();
          incrementLayersVersion();
        }
        return;
      }

      // Arrow keys nudge
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        if (activeObj) {
          e.preventDefault();
          const step = e.shiftKey ? 10 : 1;
          if (e.key === 'ArrowUp') activeObj.top = (activeObj.top || 0) - step;
          if (e.key === 'ArrowDown') activeObj.top = (activeObj.top || 0) + step;
          if (e.key === 'ArrowLeft') activeObj.left = (activeObj.left || 0) - step;
          if (e.key === 'ArrowRight') activeObj.left = (activeObj.left || 0) + step;

          activeObj.setCoords();
          canvas.renderAll();
          fabricServiceInstance.saveHistoryState();
        }
      }

      // Escape: deselect
      if (e.key === 'Escape') {
        canvas.discardActiveObject();
        canvas.renderAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      canvas.dispose();
    };
  }, []);

  const fitToScreen = (width = canvasWidth, height = canvasHeight) => {
    if (!containerRef.current) return;
    const padding = 80;
    const containerW = containerRef.current.clientWidth - padding;
    const containerH = containerRef.current.clientHeight - padding;
    if (containerW <= 0 || containerH <= 0) return;

    const scaleW = containerW / width;
    const scaleH = containerH / height;
    const calculatedZoom = Math.min(scaleW, scaleH, 0.95);
    setZoom(Number(calculatedZoom.toFixed(2)));
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 h-full overflow-hidden bg-[#121212] flex items-center justify-center canvas-checkerboard select-none"
    >
      {/* Zoomed Canvas Container */}
      <div
        className="relative transition-transform duration-75 origin-center ease-out"
        style={{
          transform: `scale(${zoom})`,
        }}
      >
        <canvas ref={canvasElRef} id="design-canvas" />

        {/* Alignment Grid Overlay */}
        {isGridVisible && (
          <div
            className="absolute inset-0 pointer-events-none rounded"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(59, 130, 246, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.25) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        )}
      </div>

      {/* Floating Canvas Controls Toolbar (Zoom, Fit, Snap) */}
      <CanvasControls onFitToScreen={() => fitToScreen()} />
    </div>
  );
};


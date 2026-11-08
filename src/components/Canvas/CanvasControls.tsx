import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { ZoomIn, ZoomOut, Maximize2, Layers, Grid } from 'lucide-react';

interface CanvasControlsProps {
  onFitToScreen: () => void;
}

export const CanvasControls: React.FC<CanvasControlsProps> = ({ onFitToScreen }) => {
  const {
    zoom,
    setZoom,
    canvasWidth,
    canvasHeight,
    isLayerPanelOpen,
    toggleLayerPanel,
    isGridVisible,
    toggleGrid,
    setIsResizeModalOpen,
  } = useEditorStore();

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3.0));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.15));
  };

  const zoomPercent = Math.round(zoom * 100);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-[#1e1e1e]/90 backdrop-blur-md border border-[#333333] shadow-2xl rounded-full z-20 text-xs text-white">
      {/* Canvas Dimensions Badge (clickable to resize) */}
      <button
        onClick={() => setIsResizeModalOpen(true)}
        className="px-2.5 py-1 rounded-full bg-[#2a2a2a] hover:bg-[#383838] transition-colors text-gray-300 hover:text-white font-medium mr-1 flex items-center gap-1.5"
        title="Change Canvas Size"
      >
        <span>{canvasWidth} × {canvasHeight} px</span>
      </button>

      <div className="h-4 w-px bg-[#333333]" />

      {/* Zoom Controls */}
      <button
        onClick={handleZoomOut}
        className="p-1.5 rounded-full hover:bg-[#333333] text-gray-400 hover:text-white transition-colors"
        title="Zoom Out (Ctrl + -)"
      >
        <ZoomOut className="w-3.5 h-3.5" />
      </button>

      <span className="w-12 text-center font-mono font-medium text-gray-200">
        {zoomPercent}%
      </span>

      <button
        onClick={handleZoomIn}
        className="p-1.5 rounded-full hover:bg-[#333333] text-gray-400 hover:text-white transition-colors"
        title="Zoom In (Ctrl + +)"
      >
        <ZoomIn className="w-3.5 h-3.5" />
      </button>

      {/* Fit to Screen */}
      <button
        onClick={onFitToScreen}
        className="p-1.5 rounded-full hover:bg-[#333333] text-gray-400 hover:text-white transition-colors ml-0.5"
        title="Fit to Screen"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>

      {/* Alignment Grid Toggle */}
      <button
        onClick={toggleGrid}
        className={`p-1.5 rounded-full transition-colors ${
          isGridVisible ? 'bg-blue-600/30 text-blue-400' : 'hover:bg-[#333333] text-gray-400 hover:text-white'
        }`}
        title="Toggle Alignment Grid"
      >
        <Grid className="w-3.5 h-3.5" />
      </button>

      <div className="h-4 w-px bg-[#333333] mx-1" />

      {/* Toggle Layers Panel */}
      <button
        onClick={toggleLayerPanel}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
          isLayerPanelOpen
            ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
            : 'hover:bg-[#333333] text-gray-400 hover:text-white'
        }`}
        title="Toggle Layer Stack"
      >
        <Layers className="w-3.5 h-3.5" />
        <span className="text-[11px] font-medium">Layers</span>
      </button>
    </div>
  );
};


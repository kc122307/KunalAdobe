import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { useEditorStore } from '../../store/useEditorStore';
import { fabricServiceInstance } from '../../services/fabricService';
import {
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  ChevronUp,
  ChevronDown,
  X,
  Type,
  Image as ImageIcon,
  Square,
  Sparkles,
} from 'lucide-react';

export const LayerStackPanel: React.FC = () => {
  const {
    isLayerPanelOpen,
    toggleLayerPanel,
    layersVersion,
    incrementLayersVersion,
    selectedObject,
    setSelectedObject,
  } = useEditorStore();

  const [layers, setLayers] = useState<any[]>([]);

  useEffect(() => {
    const list = fabricServiceInstance.getLayers();
    setLayers(list);
  }, [layersVersion, selectedObject]);

  if (!isLayerPanelOpen) return null;

  const handleSelectLayer = (fabricObj: fabric.Object) => {
    const canvas = fabricServiceInstance.getCanvas();
    if (canvas) {
      canvas.setActiveObject(fabricObj);
      canvas.renderAll();
      setSelectedObject(fabricObj);
    }
  };

  const handleToggleVisibility = (e: React.MouseEvent, fabricObj: fabric.Object) => {
    e.stopPropagation();
    fabricServiceInstance.toggleVisibility(fabricObj);
    incrementLayersVersion();
  };

  const handleToggleLock = (e: React.MouseEvent, fabricObj: fabric.Object) => {
    e.stopPropagation();
    fabricServiceInstance.toggleLock(fabricObj);
    incrementLayersVersion();
  };

  const handleDelete = (e: React.MouseEvent, fabricObj: fabric.Object) => {
    e.stopPropagation();
    const canvas = fabricServiceInstance.getCanvas();
    if (canvas) {
      canvas.remove(fabricObj);
      canvas.discardActiveObject();
      canvas.renderAll();
      incrementLayersVersion();
    }
  };

  const handleMoveUp = (e: React.MouseEvent, fabricObj: fabric.Object) => {
    e.stopPropagation();
    const canvas = fabricServiceInstance.getCanvas();
    if (canvas) {
      canvas.bringForward(fabricObj);
      canvas.renderAll();
      incrementLayersVersion();
    }
  };

  const handleMoveDown = (e: React.MouseEvent, fabricObj: fabric.Object) => {
    e.stopPropagation();
    const canvas = fabricServiceInstance.getCanvas();
    if (canvas) {
      canvas.sendBackwards(fabricObj);
      canvas.renderAll();
      incrementLayersVersion();
    }
  };

  const getLayerIcon = (type: string) => {
    switch (type) {
      case 'textbox':
      case 'text':
      case 'i-text':
        return <Type className="w-3.5 h-3.5 text-blue-400" />;
      case 'image':
        return <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Square className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="absolute bottom-16 right-80 z-30 w-72 bg-[#1e1e1e]/95 backdrop-blur-md border border-[#333333] shadow-2xl rounded-2xl overflow-hidden select-none animate-in fade-in zoom-in-95 duration-150">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#252525] border-b border-[#333333]">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-semibold text-white">Layers ({layers.length})</h3>
        </div>
        <button
          onClick={toggleLayerPanel}
          className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-[#333333] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Layer List */}
      <div className="max-h-64 overflow-y-auto p-1.5 space-y-1">
        {layers.length === 0 ? (
          <div className="p-4 text-center text-xs text-gray-500">
            No layers on canvas. Add text, shapes, or images to get started.
          </div>
        ) : (
          layers.map((layer) => {
            const isSelected = selectedObject === layer.fabricObject;
            return (
              <div
                key={layer.id}
                onClick={() => handleSelectLayer(layer.fabricObject)}
                className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer group ${
                  isSelected
                    ? 'bg-blue-600/20 border border-blue-500 text-white'
                    : 'bg-[#252525] hover:bg-[#2e2e2e] border border-transparent text-gray-300'
                }`}
              >
                {/* Left: Type Icon + Name */}
                <div className="flex items-center gap-2 truncate flex-1 mr-2">
                  {getLayerIcon(layer.type)}
                  <span className="truncate font-medium text-[11px]">{layer.name}</span>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Reorder Up */}
                  <button
                    onClick={(e) => handleMoveUp(e, layer.fabricObject)}
                    className="p-1 rounded hover:bg-[#383838] text-gray-400 hover:text-white"
                    title="Move Layer Up"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>

                  {/* Reorder Down */}
                  <button
                    onClick={(e) => handleMoveDown(e, layer.fabricObject)}
                    className="p-1 rounded hover:bg-[#383838] text-gray-400 hover:text-white"
                    title="Move Layer Down"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Visibility */}
                  <button
                    onClick={(e) => handleToggleVisibility(e, layer.fabricObject)}
                    className="p-1 rounded hover:bg-[#383838] text-gray-400 hover:text-white"
                    title={layer.visible ? 'Hide Layer' : 'Show Layer'}
                  >
                    {layer.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-gray-500" />}
                  </button>

                  {/* Lock */}
                  <button
                    onClick={(e) => handleToggleLock(e, layer.fabricObject)}
                    className="p-1 rounded hover:bg-[#383838] text-gray-400 hover:text-white"
                    title={layer.locked ? 'Unlock Layer' : 'Lock Layer'}
                  >
                    {layer.locked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={(e) => handleDelete(e, layer.fabricObject)}
                    className="p-1 rounded hover:bg-[#383838] text-gray-400 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Layer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};


import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { fabricServiceInstance } from '../../services/fabricService';
import {
  FlipHorizontal,
  FlipVertical,
  RotateCw,
  RotateCcw,
  Sparkles,
  RotateCcw as ResetIcon,
  Crop,
  Circle as CircleIcon,
  Square as SquareIcon,
  RectangleHorizontal,
} from 'lucide-react';

export const ImageProperties: React.FC = () => {
  const { selectedObject, imageFilters, setImageFilters, resetImageFilters } = useEditorStore();

  if (!selectedObject || selectedObject.type !== 'image') return null;

  const handleFilterChange = (key: keyof typeof imageFilters, value: any) => {
    const nextFilters = { ...imageFilters, [key]: value };
    setImageFilters({ [key]: value });
    fabricServiceInstance.applyFiltersToActiveImage(nextFilters);
  };

  const handleResetFilters = () => {
    resetImageFilters();
    fabricServiceInstance.applyFiltersToActiveImage({
      brightness: 0,
      contrast: 0,
      saturation: 0,
      blur: 0,
      grayscale: false,
      sepia: false,
      invert: false,
      opacity: 1,
    });
  };

  return (
    <div className="space-y-4">
      {/* Transform: Rotate & Flip */}
      <div>
        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
          Transform & Orientation
        </label>
        <div className="grid grid-cols-4 gap-1.5 bg-[#252525] p-1.5 rounded-xl border border-[#333333]">
          <button
            onClick={() => fabricServiceInstance.rotateActiveObject(-90)}
            className="p-2 rounded-lg hover:bg-[#333333] text-gray-300 hover:text-white transition-colors flex flex-col items-center"
            title="Rotate 90° CCW"
          >
            <RotateCcw className="w-4 h-4 mb-0.5" />
            <span className="text-[9px]">-90°</span>
          </button>
          <button
            onClick={() => fabricServiceInstance.rotateActiveObject(90)}
            className="p-2 rounded-lg hover:bg-[#333333] text-gray-300 hover:text-white transition-colors flex flex-col items-center"
            title="Rotate 90° CW"
          >
            <RotateCw className="w-4 h-4 mb-0.5" />
            <span className="text-[9px]">+90°</span>
          </button>
          <button
            onClick={() => fabricServiceInstance.flipActiveObject('horizontal')}
            className="p-2 rounded-lg hover:bg-[#333333] text-gray-300 hover:text-white transition-colors flex flex-col items-center"
            title="Flip Horizontal"
          >
            <FlipHorizontal className="w-4 h-4 mb-0.5" />
            <span className="text-[9px]">Flip H</span>
          </button>
          <button
            onClick={() => fabricServiceInstance.flipActiveObject('vertical')}
            className="p-2 rounded-lg hover:bg-[#333333] text-gray-300 hover:text-white transition-colors flex flex-col items-center"
            title="Flip Vertical"
          >
            <FlipVertical className="w-4 h-4 mb-0.5" />
            <span className="text-[9px]">Flip V</span>
          </button>
        </div>
      </div>

      {/* Crop & Mask Shape */}
      <div className="pt-2 border-t border-[#2d2d2d]">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <Crop className="w-3.5 h-3.5 text-blue-400" />
            Crop / Mask Shape
          </label>
          <button
            onClick={() => fabricServiceInstance.applyImageClipMask('reset')}
            className="text-[10px] text-gray-400 hover:text-white"
          >
            Reset
          </button>
        </div>
        <div className="grid grid-cols-3 gap-1.5 bg-[#252525] p-1.5 rounded-xl border border-[#333333]">
          <button
            onClick={() => fabricServiceInstance.applyImageClipMask('circle')}
            className="p-2 rounded-lg hover:bg-[#333333] text-gray-300 hover:text-white transition-colors flex flex-col items-center"
            title="Circle / Avatar Crop"
          >
            <CircleIcon className="w-4 h-4 mb-0.5 text-blue-400" />
            <span className="text-[9px]">Circle</span>
          </button>
          <button
            onClick={() => fabricServiceInstance.applyImageClipMask('square')}
            className="p-2 rounded-lg hover:bg-[#333333] text-gray-300 hover:text-white transition-colors flex flex-col items-center"
            title="Square 1:1 Crop"
          >
            <SquareIcon className="w-4 h-4 mb-0.5 text-purple-400" />
            <span className="text-[9px]">Square</span>
          </button>
          <button
            onClick={() => fabricServiceInstance.applyImageClipMask('wide')}
            className="p-2 rounded-lg hover:bg-[#333333] text-gray-300 hover:text-white transition-colors flex flex-col items-center"
            title="16:9 Landscape Crop"
          >
            <RectangleHorizontal className="w-4 h-4 mb-0.5 text-emerald-400" />
            <span className="text-[9px]">16:9</span>
          </button>
        </div>
      </div>

      {/* Realtime Image Adjustments */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Adjustments
          </label>
          <button
            onClick={handleResetFilters}
            className="text-[10px] text-gray-400 hover:text-blue-400 flex items-center gap-1 transition-colors"
          >
            <ResetIcon className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Brightness */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Brightness</span>
            <span className="text-gray-300 font-mono">
              {Math.round(imageFilters.brightness * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="-1"
            max="1"
            step="0.05"
            value={imageFilters.brightness}
            onChange={(e) => handleFilterChange('brightness', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Contrast */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Contrast</span>
            <span className="text-gray-300 font-mono">
              {Math.round(imageFilters.contrast * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="-1"
            max="1"
            step="0.05"
            value={imageFilters.contrast}
            onChange={(e) => handleFilterChange('contrast', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Saturation */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Saturation</span>
            <span className="text-gray-300 font-mono">
              {Math.round(imageFilters.saturation * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="-1"
            max="1"
            step="0.05"
            value={imageFilters.saturation}
            onChange={(e) => handleFilterChange('saturation', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Blur */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Blur</span>
            <span className="text-gray-300 font-mono">
              {Math.round(imageFilters.blur * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={imageFilters.blur}
            onChange={(e) => handleFilterChange('blur', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Opacity */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Opacity</span>
            <span className="text-gray-300 font-mono">
              {Math.round(imageFilters.opacity * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.05"
            max="1"
            step="0.05"
            value={imageFilters.opacity}
            onChange={(e) => handleFilterChange('opacity', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Filter Toggles */}
      <div className="pt-2">
        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
          Color Effects
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleFilterChange('grayscale', !imageFilters.grayscale)}
            className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
              imageFilters.grayscale
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-[#252525] text-gray-400 border-[#333333] hover:text-white'
            }`}
          >
            B & W
          </button>

          <button
            onClick={() => handleFilterChange('sepia', !imageFilters.sepia)}
            className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
              imageFilters.sepia
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-[#252525] text-gray-400 border-[#333333] hover:text-white'
            }`}
          >
            Sepia
          </button>

          <button
            onClick={() => handleFilterChange('invert', !imageFilters.invert)}
            className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
              imageFilters.invert
                ? 'bg-blue-600 text-white border-blue-500'
                : 'bg-[#252525] text-gray-400 border-[#333333] hover:text-white'
            }`}
          >
            Invert
          </button>
        </div>
      </div>
    </div>
  );
};


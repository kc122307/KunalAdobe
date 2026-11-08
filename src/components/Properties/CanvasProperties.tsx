import React, { useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { fabricServiceInstance } from '../../services/fabricService';
import { Scaling, Palette, Sliders } from 'lucide-react';

export const CanvasProperties: React.FC = () => {
  const {
    canvasWidth,
    canvasHeight,
    setIsResizeModalOpen,
  } = useEditorStore();

  const [bgColor, setBgColor] = useState<string>('#ffffff');

  const swatches = [
    '#ffffff', '#000000', '#0f172a', '#1e293b', '#18181b',
    '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4',
    '#3b82f6', '#8b5cf6', '#ec4899', '#fafaf9', '#fef3c7'
  ];

  const handleApplyColor = (color: string) => {
    setBgColor(color);
    fabricServiceInstance.setBackgroundColor(color);
  };

  return (
    <div className="space-y-5">
      {/* Canvas Dimensions Overview */}
      <div className="bg-[#252525] p-3.5 rounded-xl border border-[#333333]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Artboard Size
          </span>
          <button
            onClick={() => setIsResizeModalOpen(true)}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
          >
            <Scaling className="w-3.5 h-3.5" />
            Resize
          </button>
        </div>
        <div className="text-base font-semibold text-white">
          {canvasWidth} × {canvasHeight} <span className="text-xs text-gray-400 font-normal">pixels</span>
        </div>
      </div>

      {/* Canvas Background Color */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Background Fill
          </span>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => handleApplyColor(e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border border-[#444444] bg-transparent"
            />
            <span className="text-[11px] font-mono text-gray-400 uppercase">{bgColor}</span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-1.5">
          {swatches.map((color) => (
            <button
              key={color}
              onClick={() => handleApplyColor(color)}
              style={{ backgroundColor: color }}
              className={`w-full aspect-square rounded-lg border transition-transform hover:scale-105 ${
                bgColor === color ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-[#383838]'
              }`}
              title={color}
            />
          ))}
        </div>
      </div>

      <div className="pt-2 text-[11px] text-gray-500 border-t border-[#2d2d2d] leading-relaxed">
        Click any element on the artboard to edit its fonts, colors, filters, or layers.
      </div>
    </div>
  );
};


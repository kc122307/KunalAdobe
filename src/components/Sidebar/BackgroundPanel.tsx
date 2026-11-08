import React, { useState } from 'react';
import { fabricServiceInstance } from '../../services/fabricService';
import { Palette, Sparkles, Image as ImageIcon } from 'lucide-react';

export const BackgroundPanel: React.FC = () => {
  const [currentColor, setCurrentColor] = useState<string>('#ffffff');

  const solidSwatches = [
    '#ffffff', '#000000', '#0f172a', '#1e293b', '#18181b',
    '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4',
    '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
    '#fafaf9', '#f3f4f6', '#fef3c7', '#dcfce7', '#e0f2fe'
  ];

  const gradientPresets = [
    {
      name: 'Sunset Orange',
      stops: [
        { offset: 0, color: '#f97316' },
        { offset: 1, color: '#ec4899' },
      ],
      angle: 45,
    },
    {
      name: 'Cyber Neon',
      stops: [
        { offset: 0, color: '#00f0ff' },
        { offset: 1, color: '#7000ff' },
      ],
      angle: 90,
    },
    {
      name: 'Deep Space',
      stops: [
        { offset: 0, color: '#0f172a' },
        { offset: 1, color: '#1e1b4b' },
      ],
      angle: 135,
    },
    {
      name: 'Emerald Aurora',
      stops: [
        { offset: 0, color: '#064e3b' },
        { offset: 1, color: '#10b981' },
      ],
      angle: 45,
    },
    {
      name: 'Pastel Dream',
      stops: [
        { offset: 0, color: '#ffb7b2' },
        { offset: 1, color: '#b5ead7' },
      ],
      angle: 45,
    },
    {
      name: 'Dark Velvet',
      stops: [
        { offset: 0, color: '#1a102f' },
        { offset: 1, color: '#381647' },
      ],
      angle: 180,
    },
  ];

  const handleApplySolid = (color: string) => {
    setCurrentColor(color);
    fabricServiceInstance.setBackgroundColor(color);
  };

  const handleApplyGradient = (stops: { offset: number; color: string }[], angle: number) => {
    fabricServiceInstance.setBackgroundGradient(stops, angle);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-semibold text-white">Background</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Solid Color Picker */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Solid Color
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentColor}
                onChange={(e) => handleApplySolid(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border border-[#444444] bg-transparent"
              />
              <span className="text-xs font-mono text-gray-400 uppercase">{currentColor}</span>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {solidSwatches.map((color) => (
              <button
                key={color}
                onClick={() => handleApplySolid(color)}
                style={{ backgroundColor: color }}
                className={`w-full aspect-square rounded-xl border transition-transform hover:scale-110 shadow-sm ${
                  currentColor === color ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-[#383838]'
                }`}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Gradient Backgrounds */}
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2.5">
            Gradients
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            {gradientPresets.map((grad, i) => {
              const bgGradient = `linear-gradient(${grad.angle}deg, ${grad.stops[0].color}, ${grad.stops[1].color})`;
              return (
                <button
                  key={i}
                  onClick={() => handleApplyGradient(grad.stops, grad.angle)}
                  className="group flex flex-col p-2 rounded-xl bg-[#252525] hover:bg-[#2e2e2e] border border-[#333333] hover:border-blue-500 transition-all text-left"
                >
                  <div
                    style={{ background: bgGradient }}
                    className="w-full h-14 rounded-lg shadow-inner group-hover:scale-[1.02] transition-transform"
                  />
                  <span className="text-[11px] font-medium text-gray-300 mt-2 truncate">
                    {grad.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


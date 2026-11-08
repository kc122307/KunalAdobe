import React from 'react';
import { fabricServiceInstance } from '../../services/fabricService';
import { Type, Sparkles } from 'lucide-react';

export const TextPanel: React.FC = () => {
  const handleAddText = (type: 'heading' | 'subheading' | 'body') => {
    fabricServiceInstance.addText(type);
  };

  const textPresets = [
    {
      label: 'FLASH SALE',
      sub: '50% OFF TODAY',
      font: 'Anton',
      color: '#facc15',
      letterSpacing: 100,
      textTransform: 'uppercase',
    },
    {
      label: 'CYBER FUTURE',
      sub: 'NEXT GENERATION AI',
      font: 'Courier Prime',
      color: '#00f0ff',
      letterSpacing: 200,
      textTransform: 'uppercase',
    },
    {
      label: 'Artisan & Fine',
      sub: 'ESTABLISHED 2026',
      font: 'Playfair Display',
      color: '#f8fafc',
      letterSpacing: 50,
      textTransform: 'none',
    },
    {
      label: 'NEON NIGHTS',
      sub: 'ELECTRONIC SOUNDS',
      font: 'Montserrat',
      color: '#ec4899',
      letterSpacing: 150,
      textTransform: 'uppercase',
    },
    {
      label: 'Inspiring Quote',
      sub: 'DAILY MOTIVATION',
      font: 'Dancing Script',
      color: '#38bdf8',
      letterSpacing: 0,
      textTransform: 'none',
    },
  ];

  const handleApplyPreset = (preset: typeof textPresets[0]) => {
    fabricServiceInstance.addText('preset', {
      text: `${preset.label}\n${preset.sub}`,
      fontFamily: preset.font,
      fill: preset.color,
      fontSize: 58,
      fontWeight: 'bold',
      charSpacing: preset.letterSpacing,
      lineHeight: 1.1,
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-semibold text-white">Add Text</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* Basic Text Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => handleAddText('heading')}
            className="w-full py-4 px-4 bg-[#252525] hover:bg-[#2e2e2e] border border-[#333333] hover:border-[#444444] rounded-xl text-left transition-all group flex items-center justify-between"
          >
            <div>
              <span className="font-['Anton'] text-2xl text-white group-hover:text-blue-400 block transition-colors">
                Add a heading
              </span>
              <span className="text-[11px] text-gray-500">64px • Anton • Bold</span>
            </div>
            <Type className="w-5 h-5 text-gray-500 group-hover:text-blue-400" />
          </button>

          <button
            onClick={() => handleAddText('subheading')}
            className="w-full py-3.5 px-4 bg-[#252525] hover:bg-[#2e2e2e] border border-[#333333] hover:border-[#444444] rounded-xl text-left transition-all group flex items-center justify-between"
          >
            <div>
              <span className="font-['Montserrat'] font-semibold text-lg text-gray-200 group-hover:text-blue-400 block transition-colors">
                Add a subheading
              </span>
              <span className="text-[11px] text-gray-500">36px • Montserrat • Semi-Bold</span>
            </div>
            <Type className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
          </button>

          <button
            onClick={() => handleAddText('body')}
            className="w-full py-3 px-4 bg-[#252525] hover:bg-[#2e2e2e] border border-[#333333] hover:border-[#444444] rounded-xl text-left transition-all group flex items-center justify-between"
          >
            <div>
              <span className="font-['Inter'] text-sm text-gray-400 group-hover:text-blue-400 block transition-colors">
                Add a little bit of body text
              </span>
              <span className="text-[11px] text-gray-500">24px • Inter • Regular</span>
            </div>
            <Type className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
          </button>
        </div>

        {/* Text Style Presets */}
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Stylized Text Combinations
            </h3>
          </div>

          <div className="space-y-2.5">
            {textPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset)}
                className="w-full p-3.5 rounded-xl bg-[#252525] hover:bg-[#2c2c2c] border border-[#333333] hover:border-blue-500/50 text-center transition-all group shadow-sm"
              >
                <div
                  style={{
                    fontFamily: preset.font,
                    color: preset.color,
                    letterSpacing: `${preset.letterSpacing / 100}px`,
                  }}
                  className="text-xl font-bold leading-tight group-hover:scale-105 transition-transform"
                >
                  {preset.label}
                </div>
                <div className="text-[10px] text-gray-400 tracking-widest mt-1 font-mono">
                  {preset.sub}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


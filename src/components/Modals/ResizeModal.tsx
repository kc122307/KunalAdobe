import React, { useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { fabricServiceInstance } from '../../services/fabricService';
import { CANVAS_PRESETS } from '../../assets/canvasPresets';
import { X, Scaling, Check, Lock, Unlock } from 'lucide-react';

export const ResizeModal: React.FC = () => {
  const {
    isResizeModalOpen,
    setIsResizeModalOpen,
    canvasWidth,
    canvasHeight,
    setCanvasDimensions,
  } = useEditorStore();

  const [width, setWidth] = useState<number>(canvasWidth);
  const [height, setHeight] = useState<number>(canvasHeight);
  const [lockRatio, setLockRatio] = useState<boolean>(false);
  const [ratio, setRatio] = useState<number>(canvasWidth / canvasHeight);

  if (!isResizeModalOpen) return null;

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockRatio && ratio) {
      setHeight(Math.round(val / ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockRatio && ratio) {
      setWidth(Math.round(val * ratio));
    }
  };

  const handleApply = () => {
    if (width > 0 && height > 0) {
      fabricServiceInstance.resizeCanvas(width, height);
      setCanvasDimensions(width, height);
      setIsResizeModalOpen(false);
    }
  };

  const selectPreset = (presetW: number, presetH: number) => {
    setWidth(presetW);
    setHeight(presetH);
    setRatio(presetW / presetH);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] border border-[#333333] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d2d2d]">
          <div className="flex items-center gap-2">
            <Scaling className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-white text-base">Resize Canvas</h3>
          </div>
          <button
            onClick={() => setIsResizeModalOpen(false)}
            className="p-1 rounded-lg hover:bg-[#2d2d2d] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Custom Dimensions Input */}
          <div className="bg-[#252525] p-4 rounded-xl border border-[#333333]">
            <span className="text-xs font-semibold text-gray-300 block mb-3 uppercase tracking-wider">
              Custom Dimensions
            </span>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="text-[11px] text-gray-400 block mb-1">Width (px)</label>
                <input
                  type="number"
                  min="100"
                  max="5000"
                  value={width}
                  onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#181818] border border-[#3a3a3a] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setLockRatio(!lockRatio);
                  setRatio(width / height);
                }}
                className={`mt-4 p-2 rounded-lg border transition-colors ${
                  lockRatio
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                    : 'border-[#3a3a3a] text-gray-400 hover:text-white hover:bg-[#2d2d2d]'
                }`}
                title={lockRatio ? 'Unlock Aspect Ratio' : 'Lock Aspect Ratio'}
              >
                {lockRatio ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              </button>

              <div className="flex-1">
                <label className="text-[11px] text-gray-400 block mb-1">Height (px)</label>
                <input
                  type="number"
                  min="100"
                  max="5000"
                  value={height}
                  onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#181818] border border-[#3a3a3a] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Canvas Size Presets */}
          <div>
            <span className="text-xs font-semibold text-gray-300 block mb-3 uppercase tracking-wider">
              Standard Presets
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              {CANVAS_PRESETS.map((preset) => {
                const isSelected = width === preset.width && height === preset.height;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => selectPreset(preset.width, preset.height)}
                    className={`flex items-start justify-between p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-[#333333] bg-[#252525] text-gray-300 hover:border-[#444444] hover:bg-[#2a2a2a]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{preset.name}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {preset.width} × {preset.height} px ({preset.aspectRatio})
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#181818] border-t border-[#2d2d2d] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setIsResizeModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#252525] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
          >
            Apply Resize
          </button>
        </div>
      </div>
    </div>
  );
};


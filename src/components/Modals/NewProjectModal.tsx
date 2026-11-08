import React, { useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { useProjectStore } from '../../store/useProjectStore';
import { CANVAS_PRESETS } from '../../assets/canvasPresets';
import { X, PlusCircle, Check } from 'lucide-react';

export const NewProjectModal: React.FC = () => {
  const { isNewProjectModalOpen, setIsNewProjectModalOpen } = useEditorStore();
  const { createNewProject } = useProjectStore();

  const [name, setName] = useState<string>('My Awesome Design');
  const [selectedPreset, setSelectedPreset] = useState(CANVAS_PRESETS[0]);
  const [customWidth, setCustomWidth] = useState<number>(1080);
  const [customHeight, setCustomHeight] = useState<number>(1080);

  if (!isNewProjectModalOpen) return null;

  const handleCreate = () => {
    const width = selectedPreset.id === 'custom' ? customWidth : selectedPreset.width;
    const height = selectedPreset.id === 'custom' ? customHeight : selectedPreset.height;

    createNewProject(width, height, name || 'Untitled Design', selectedPreset.id);
    setIsNewProjectModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] border border-[#333333] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d2d2d]">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-white text-base">Create New Design</h3>
          </div>
          <button
            onClick={() => setIsNewProjectModalOpen(false)}
            className="p-1 rounded-lg hover:bg-[#2d2d2d] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Project Title Input */}
          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Summer Promo Poster"
              className="w-full px-4 py-2.5 bg-[#181818] border border-[#3a3a3a] rounded-xl text-white text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Canvas Size Presets */}
          <div>
            <label className="block text-xs font-medium text-gray-300 uppercase tracking-wider mb-2.5">
              Select Canvas Size
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {CANVAS_PRESETS.map((preset) => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedPreset(preset)}
                    className={`flex items-start justify-between p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/10 text-white shadow-sm'
                        : 'border-[#333333] bg-[#252525] text-gray-300 hover:border-[#444444] hover:bg-[#2a2a2a]'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">{preset.name}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {preset.width} × {preset.height} px ({preset.aspectRatio})
                      </div>
                      <div className="text-[10px] text-gray-500 mt-1 line-clamp-1">{preset.description}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom dimensions if custom selected */}
          {selectedPreset.id === 'custom' && (
            <div className="bg-[#252525] p-4 rounded-xl border border-[#333333] flex items-center gap-3">
              <div className="flex-1">
                <label className="text-[11px] text-gray-400 block mb-1">Width (px)</label>
                <input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#181818] border border-[#3a3a3a] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="text-[11px] text-gray-400 block mb-1">Height (px)</label>
                <input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#181818] border border-[#3a3a3a] rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#181818] border-t border-[#2d2d2d] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={() => setIsNewProjectModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#252525] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreate}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-600/20"
          >
            Create Design
          </button>
        </div>
      </div>
    </div>
  );
};


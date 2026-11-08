import React, { useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { useProjectStore } from '../../store/useProjectStore';
import { fabricServiceInstance } from '../../services/fabricService';
import {
  Undo2,
  Redo2,
  Download,
  Save,
  Scaling,
  Plus,
  Sparkles,
  Check,
  Loader2,
  FolderOpen
} from 'lucide-react';

export const TopToolbar: React.FC = () => {
  const {
    projectName,
    setProjectName,
    canUndo,
    canRedo,
    setIsExportModalOpen,
    setIsResizeModalOpen,
    setIsNewProjectModalOpen,
    setActiveTab,
  } = useEditorStore();

  const { saveCurrentProject, isSaving, lastSaved } = useProjectStore();
  const [isEditingName, setIsEditingName] = useState(false);

  return (
    <header className="h-14 bg-[#1e1e1e] border-b border-[#2d2d2d] px-4 flex items-center justify-between z-30 select-none">
      {/* Left: Brand + Project Title */}
      <div className="flex items-center gap-4">
        {/* Adobe Express Studio Brand Badge */}
        <div className="flex items-center gap-2.5 pr-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#eb1000] via-[#ff4b00] to-[#ff8400] flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="font-extrabold text-white text-sm tracking-tighter">Ex</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-white text-sm tracking-tight">Adobe</span>
            <span className="text-gray-400 text-xs ml-1 font-medium">Express</span>
          </div>
        </div>

        <div className="h-5 w-px bg-[#333333]" />

        {/* Project Title (Inline Editable) */}
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <input
              type="text"
              autoFocus
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditingName(false);
              }}
              className="bg-[#2a2a2a] px-2.5 py-1 text-sm font-medium text-white rounded-md border border-blue-500 focus:outline-none min-w-[160px]"
            />
          ) : (
            <button
              onClick={() => setIsEditingName(true)}
              className="text-sm font-medium text-gray-200 hover:text-white px-2 py-1 rounded hover:bg-[#2a2a2a] transition-colors truncate max-w-[200px]"
              title="Click to rename project"
            >
              {projectName || 'Untitled Design'}
            </button>
          )}

          {/* Cloud Auto-Saved Indicator */}
          <div className="flex items-center gap-1 text-[11px] text-gray-400">
            {isSaving ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                <span className="text-blue-400">Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-gray-400 hidden md:inline">Saved</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Center: Undo / Redo & Resize Controls */}
      <div className="flex items-center gap-1.5 bg-[#252525] p-1 rounded-xl border border-[#333333]">
        <button
          onClick={() => fabricServiceInstance.undo()}
          disabled={!canUndo}
          className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-[#333333] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Undo (Ctrl + Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          onClick={() => fabricServiceInstance.redo()}
          disabled={!canRedo}
          className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-[#333333] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Redo (Ctrl + Y)"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-[#383838] mx-1" />

        {/* Resize Canvas */}
        <button
          onClick={() => setIsResizeModalOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-[#333333] transition-colors"
          title="Resize canvas dimensions"
        >
          <Scaling className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">Resize</span>
        </button>
      </div>

      {/* Right: New, Projects, Save, Export Actions */}
      <div className="flex items-center gap-2">
        {/* Projects Tab */}
        <button
          onClick={() => setActiveTab('projects')}
          className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-[#2a2a2a] transition-colors"
          title="My Projects"
        >
          <FolderOpen className="w-4 h-4" />
        </button>

        {/* New Design Button */}
        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#2a2a2a] border border-[#383838] transition-colors"
          title="Create New Design"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New</span>
        </button>

        {/* Manual Save */}
        <button
          onClick={() => saveCurrentProject()}
          disabled={isSaving}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#2a2a2a] border border-[#383838] transition-colors"
          title="Save project to browser storage"
        >
          <Save className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden md:inline">Save</span>
        </button>

        {/* Export / Download Button */}
        <button
          onClick={() => setIsExportModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
};


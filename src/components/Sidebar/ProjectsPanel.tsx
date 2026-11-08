import React, { useEffect, useState } from 'react';
import { useProjectStore } from '../../store/useProjectStore';
import { useEditorStore } from '../../store/useEditorStore';
import { ProjectMetadata } from '../../types/editor';
import {
  FolderOpen,
  Plus,
  Trash2,
  Copy,
  Edit2,
  Calendar,
  Layers,
  Check,
} from 'lucide-react';

export const ProjectsPanel: React.FC = () => {
  const {
    projects,
    loadProjects,
    loadProject,
    deleteProject,
    duplicateProject,
  } = useProjectStore();

  const { setIsNewProjectModalOpen, projectId: currentProjectId } = useEditorStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenProject = (id: string) => {
    loadProject(id);
  };

  const handleStartRename = (p: ProjectMetadata, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(p.id);
    setEditName(p.name);
  };

  const handleSaveRename = (p: ProjectMetadata, e: React.MouseEvent) => {
    e.stopPropagation();
    if (editName.trim()) {
      useProjectStore.getState().saveCurrentProject(); // or update project name in db
      p.name = editName.trim();
    }
    setEditingId(null);
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2d2d2d] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-semibold text-white">My Projects</h2>
        </div>
        <button
          onClick={() => setIsNewProjectModalOpen(true)}
          className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          title="New Project"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {projects.length === 0 ? (
          <div className="text-center py-12 px-4">
            <FolderOpen className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-xs font-semibold text-gray-300">No saved projects yet</p>
            <p className="text-[11px] text-gray-500 mt-1">
              Click 'Save' in the top bar to save your current design to local storage.
            </p>
          </div>
        ) : (
          projects.map((proj) => {
            const isCurrent = proj.id === currentProjectId;
            return (
              <div
                key={proj.id}
                onClick={() => handleOpenProject(proj.id)}
                className={`group relative rounded-xl overflow-hidden border transition-all cursor-pointer bg-[#252525] hover:bg-[#2b2b2b] ${
                  isCurrent ? 'border-blue-500 shadow-md shadow-blue-500/10' : 'border-[#333333] hover:border-[#444444]'
                }`}
              >
                {/* Thumbnail */}
                <div className="aspect-[16/9] w-full bg-[#181818] overflow-hidden relative">
                  {proj.thumbnail ? (
                    <img
                      src={proj.thumbnail}
                      alt={proj.name}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <Layers className="w-8 h-8" />
                    </div>
                  )}

                  {isCurrent && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-600 text-white shadow">
                      Current
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    {editingId === proj.id ? (
                      <div className="flex items-center gap-1.5 flex-1" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="bg-[#181818] px-2 py-0.5 rounded text-xs text-white border border-blue-500 flex-1 focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={(e) => handleSaveRename(proj, e)}
                          className="p-1 text-emerald-400 hover:text-emerald-300"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <h4 className="text-xs font-semibold text-white truncate max-w-[170px]">
                        {proj.name}
                      </h4>
                    )}

                    {/* Quick action buttons */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleStartRename(proj, e)}
                        className="p-1 rounded hover:bg-[#333333] text-gray-400 hover:text-white"
                        title="Rename"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateProject(proj.id);
                        }}
                        className="p-1 rounded hover:bg-[#333333] text-gray-400 hover:text-white"
                        title="Duplicate"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(proj.id);
                        }}
                        className="p-1 rounded hover:bg-[#333333] text-gray-400 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
                    <span>{proj.width} × {proj.height} px</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      {formatDate(proj.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};


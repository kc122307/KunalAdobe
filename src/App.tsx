import React, { useEffect } from 'react';
import { TopToolbar } from './components/Header/TopToolbar';
import { LeftSidebar } from './components/Sidebar/LeftSidebar';
import { DesignCanvas } from './components/Canvas/DesignCanvas';
import { PropertiesPanel } from './components/Properties/PropertiesPanel';
import { LayerStackPanel } from './components/Layers/LayerStackPanel';
import { ExportModal } from './components/Header/ExportModal';
import { ResizeModal } from './components/Modals/ResizeModal';
import { NewProjectModal } from './components/Modals/NewProjectModal';
import { useProjectStore } from './store/useProjectStore';

export const App: React.FC = () => {
  const { loadProjects } = useProjectStore();

  useEffect(() => {
    // Load existing projects from IndexedDB on startup
    loadProjects();
  }, [loadProjects]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#141414] text-white font-sans select-none">
      {/* Top Application Toolbar */}
      <TopToolbar />

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar Navigation & Panel Drawer */}
        <LeftSidebar />

        {/* Central Design Canvas Stage */}
        <DesignCanvas />

        {/* Floating / Docked Layer Management Stack */}
        <LayerStackPanel />

        {/* Right Contextual Properties & Customization Inspector */}
        <PropertiesPanel />
      </div>

      {/* Application Modals */}
      <ExportModal />
      <ResizeModal />
      <NewProjectModal />
    </div>
  );
};

export default App;


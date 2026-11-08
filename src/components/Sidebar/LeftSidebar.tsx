import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { SidebarTab } from '../../types/editor';
import {
  LayoutTemplate,
  Type,
  Shapes,
  UploadCloud,
  Palette,
  Sparkles,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { TemplatesPanel } from './TemplatesPanel';
import { TextPanel } from './TextPanel';
import { ElementsPanel } from './ElementsPanel';
import { UploadsPanel } from './UploadsPanel';
import { BackgroundPanel } from './BackgroundPanel';
import { AiAssistantPanel } from './AiAssistantPanel';
import { ProjectsPanel } from './ProjectsPanel';

export const LeftSidebar: React.FC = () => {
  const { activeTab, setActiveTab } = useEditorStore();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(true);

  const tabs = [
    { id: 'templates' as SidebarTab, label: 'Templates', icon: LayoutTemplate },
    { id: 'text' as SidebarTab, label: 'Text', icon: Type },
    { id: 'elements' as SidebarTab, label: 'Elements', icon: Shapes },
    { id: 'uploads' as SidebarTab, label: 'Uploads', icon: UploadCloud },
    { id: 'background' as SidebarTab, label: 'Background', icon: Palette },
    { id: 'ai' as SidebarTab, label: 'AI Assistant', icon: Sparkles, badge: 'AI' },
    { id: 'projects' as SidebarTab, label: 'Projects', icon: FolderOpen },
  ];

  const handleTabClick = (tabId: SidebarTab) => {
    if (activeTab === tabId && isDrawerOpen) {
      // Toggle drawer if same tab clicked
      setIsDrawerOpen(false);
    } else {
      setActiveTab(tabId);
      setIsDrawerOpen(true);
    }
  };

  return (
    <div className="flex h-full z-20 select-none">
      {/* Primary Vertical Navigation Rail */}
      <div className="w-18 bg-[#181818] border-r border-[#2d2d2d] flex flex-col items-center py-3 px-1.5 space-y-1.5 shrink-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id && isDrawerOpen;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative w-15 h-15 rounded-xl flex flex-col items-center justify-center p-1.5 transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-[#252525]'
              }`}
            >
              {tab.badge && (
                <span className="absolute top-1.5 right-1.5 px-1 py-0.2 rounded text-[8px] font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-white uppercase tracking-wider">
                  {tab.badge}
                </span>
              )}
              <Icon
                className={`w-5 h-5 mb-1 group-hover:scale-110 transition-transform ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                }`}
              />
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}

        <div className="mt-auto">
          {/* Collapse / Expand Rail Toggle */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#252525] transition-colors"
            title={isDrawerOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
          >
            {isDrawerOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Flyout Secondary Drawer Panel */}
      {isDrawerOpen && (
        <aside className="w-80 bg-[#1e1e1e] border-r border-[#2d2d2d] flex flex-col h-full shadow-2xl overflow-hidden animate-in slide-in-from-left duration-150">
          {activeTab === 'templates' && <TemplatesPanel />}
          {activeTab === 'text' && <TextPanel />}
          {activeTab === 'elements' && <ElementsPanel />}
          {activeTab === 'uploads' && <UploadsPanel />}
          {activeTab === 'background' && <BackgroundPanel />}
          {activeTab === 'ai' && <AiAssistantPanel />}
          {activeTab === 'projects' && <ProjectsPanel />}
        </aside>
      )}
    </div>
  );
};


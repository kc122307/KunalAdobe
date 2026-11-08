import React, { useState } from 'react';
import { TEMPLATES } from '../../assets/templatesData';
import { TemplateData } from '../../types/editor';
import { fabricServiceInstance } from '../../services/fabricService';
import { useEditorStore } from '../../store/useEditorStore';
import { Sparkles, LayoutTemplate } from 'lucide-react';

export const TemplatesPanel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { setCanvasDimensions, setProjectName } = useEditorStore();

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'poster', label: 'Posters' },
    { id: 'banner', label: 'Banners' },
    { id: 'flyer', label: 'Flyers' },
    { id: 'presentation', label: 'Slides' },
  ];

  const filteredTemplates =
    selectedCategory === 'all'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === selectedCategory);

  const handleSelectTemplate = (template: TemplateData) => {
    setCanvasDimensions(template.width, template.height, template.category);
    setProjectName(template.title);
    fabricServiceInstance.loadTemplate(template);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2 mb-3">
          <LayoutTemplate className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-semibold text-white">Templates</h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#333333]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="grid grid-cols-1 gap-3.5">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleSelectTemplate(template)}
              className="group relative rounded-xl overflow-hidden border border-[#333333] hover:border-blue-500 bg-[#252525] cursor-pointer transition-all hover:shadow-xl hover:shadow-blue-500/10 flex flex-col"
            >
              {/* Preview image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#181818]">
                <img
                  src={template.thumbnail}
                  alt={template.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-medium bg-black/60 backdrop-blur-sm text-gray-300 uppercase tracking-wider">
                  {template.width} × {template.height}
                </span>
              </div>

              {/* Info */}
              <div className="p-3">
                <h4 className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {template.title}
                </h4>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                  {template.description}
                </p>
              </div>

              {/* Hover Overlay Button */}
              <div className="absolute inset-0 bg-blue-600/30 opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-opacity flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium text-xs shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Use Template
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


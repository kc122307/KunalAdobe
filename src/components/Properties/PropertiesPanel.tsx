import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { TextProperties } from './TextProperties';
import { ShapeProperties } from './ShapeProperties';
import { ImageProperties } from './ImageProperties';
import { CanvasProperties } from './CanvasProperties';
import { TransformProperties } from './TransformProperties';
import { Sliders, Type, Shapes, Image as ImageIcon, Layout } from 'lucide-react';

export const PropertiesPanel: React.FC = () => {
  const { selectedObject, selectedType } = useEditorStore();

  const getHeaderInfo = () => {
    if (!selectedObject) {
      return {
        title: 'Artboard Settings',
        icon: Layout,
        color: 'text-gray-400',
      };
    }

    switch (selectedType) {
      case 'text':
        return {
          title: 'Text Properties',
          icon: Type,
          color: 'text-blue-400',
        };
      case 'image':
        return {
          title: 'Image Adjustments',
          icon: ImageIcon,
          color: 'text-emerald-400',
        };
      case 'shape':
      default:
        return {
          title: 'Element Properties',
          icon: Shapes,
          color: 'text-amber-400',
        };
    }
  };

  const header = getHeaderInfo();
  const Icon = header.icon;

  return (
    <aside className="w-76 bg-[#1e1e1e] border-l border-[#2d2d2d] flex flex-col h-full z-20 shadow-2xl select-none overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2d2d2d] flex items-center gap-2 shrink-0">
        <Icon className={`w-4 h-4 ${header.color}`} />
        <h2 className="text-xs font-semibold text-white tracking-wide uppercase">
          {header.title}
        </h2>
      </div>

      {/* Body Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!selectedObject && <CanvasProperties />}

        {selectedType === 'text' && <TextProperties />}

        {selectedType === 'shape' && <ShapeProperties />}

        {selectedType === 'image' && <ImageProperties />}

        {/* Global Transform & Order Controls when an object is selected */}
        {selectedObject && <TransformProperties />}
      </div>
    </aside>
  );
};


import React from 'react';
import { useEditorStore } from '../../store/useEditorStore';

export const ShapeProperties: React.FC = () => {
  const { selectedObject, shapeProps, setShapeProps } = useEditorStore();

  if (!selectedObject) return null;

  const updateProp = (key: string, value: any) => {
    selectedObject.set(key as any, value);
    selectedObject.canvas?.renderAll();
    setShapeProps({ [key]: value });
  };

  const swatches = [
    '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
    '#ef4444', '#f97316', '#facc15', '#10b981', '#06b6d4',
    '#ffffff', '#000000', '#1e293b', '#334155', 'transparent'
  ];

  const currentFill = (selectedObject.fill as string) || '#3b82f6';
  const currentStroke = (selectedObject.stroke as string) || '#ffffff';
  const isRect = selectedObject.type === 'rect';

  return (
    <div className="space-y-4">
      {/* Fill Color */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Fill Color
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={currentFill === 'transparent' ? '#000000' : currentFill}
              onChange={(e) => updateProp('fill', e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border border-[#444444] bg-transparent"
            />
            <span className="text-[11px] font-mono text-gray-400 uppercase">
              {currentFill}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {swatches.map((color) => (
            <button
              key={color}
              onClick={() => updateProp('fill', color)}
              style={{ backgroundColor: color === 'transparent' ? '#1c1c1c' : color }}
              className={`w-full aspect-square rounded-lg border transition-transform hover:scale-105 ${
                currentFill === color ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-[#383838]'
              } ${color === 'transparent' ? 'relative overflow-hidden' : ''}`}
            >
              {color === 'transparent' && (
                <div className="w-full h-px bg-rose-500 rotate-45 transform origin-center" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Border / Stroke */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Border Color
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={currentStroke === 'transparent' ? '#000000' : currentStroke}
              onChange={(e) => updateProp('stroke', e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border border-[#444444] bg-transparent"
            />
            <span className="text-[11px] font-mono text-gray-400 uppercase">
              {currentStroke}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-1.5 mb-3">
          {['#ffffff', '#000000', '#3b82f6', '#f43f5e', '#facc15'].map((color) => (
            <button
              key={color}
              onClick={() => updateProp('stroke', color)}
              style={{ backgroundColor: color }}
              className={`w-full aspect-square rounded-lg border transition-transform hover:scale-105 ${
                currentStroke === color ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-[#383838]'
              }`}
            />
          ))}
        </div>

        {/* Border Width Slider */}
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Border Width</span>
          <span className="text-gray-300 font-mono">{selectedObject.strokeWidth || 0}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="30"
          value={selectedObject.strokeWidth || 0}
          onChange={(e) => updateProp('strokeWidth', parseInt(e.target.value))}
          className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Rounded Corner Radius (if Rectangle) */}
      {isRect && (
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Corner Radius</span>
            <span className="text-gray-300 font-mono">{(selectedObject as any).rx || 0}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={(selectedObject as any).rx || 0}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              selectedObject.set({ rx: val, ry: val } as any);
              selectedObject.canvas?.renderAll();
              setShapeProps({ rx: val, ry: val });
            }}
            className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      )}

      {/* Opacity */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Opacity</span>
          <span className="text-gray-300 font-mono">
            {Math.round((selectedObject.opacity !== undefined ? selectedObject.opacity : 1) * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.05"
          value={selectedObject.opacity !== undefined ? selectedObject.opacity : 1}
          onChange={(e) => updateProp('opacity', parseFloat(e.target.value))}
          className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};


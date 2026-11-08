import React from 'react';
import { fabric } from 'fabric';
import { useEditorStore } from '../../store/useEditorStore';
import { POPULAR_FONTS } from '../../assets/canvasPresets';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  CaseUpper,
  Minus,
  Plus,
} from 'lucide-react';

export const TextProperties: React.FC = () => {
  const { selectedObject, textProps, setTextProps } = useEditorStore();

  if (!selectedObject || !(selectedObject instanceof fabric.Textbox || selectedObject instanceof fabric.Text || (selectedObject as any).text !== undefined)) {
    return null;
  }

  const textObj = selectedObject as fabric.Textbox;

  const updateProp = (key: string, value: any) => {
    textObj.set(key as any, value);
    textObj.canvas?.renderAll();
    setTextProps({ [key]: value });
  };

  const handleFontSizeChange = (delta: number) => {
    const current = textObj.fontSize || 36;
    const next = Math.max(8, Math.min(240, current + delta));
    updateProp('fontSize', next);
  };

  const toggleBold = () => {
    const isBold = textObj.fontWeight === 'bold' || textObj.fontWeight === 700 || textObj.fontWeight === '700';
    updateProp('fontWeight', isBold ? 'normal' : 'bold');
  };

  const toggleItalic = () => {
    const isItalic = textObj.fontStyle === 'italic';
    updateProp('fontStyle', isItalic ? 'normal' : 'italic');
  };

  const toggleUnderline = () => {
    updateProp('underline', !textObj.underline);
  };

  const toggleLinethrough = () => {
    updateProp('linethrough', !textObj.linethrough);
  };

  const toggleUppercase = () => {
    const current = textObj.text || '';
    if (current === current.toUpperCase()) {
      updateProp('text', current.toLowerCase());
    } else {
      updateProp('text', current.toUpperCase());
    }
  };

  const swatches = [
    '#ffffff', '#000000', '#f43f5e', '#ef4444', '#f97316',
    '#facc15', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6'
  ];

  const isBold = textObj.fontWeight === 'bold' || textObj.fontWeight === 700 || textObj.fontWeight === '700';
  const isItalic = textObj.fontStyle === 'italic';

  return (
    <div className="space-y-4">
      {/* Font Family */}
      <div>
        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
          Font Family
        </label>
        <select
          value={textProps.fontFamily || 'Inter'}
          onChange={(e) => updateProp('fontFamily', e.target.value)}
          className="w-full px-3 py-2 bg-[#252525] border border-[#383838] rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
        >
          {POPULAR_FONTS.map((font) => (
            <option key={font.family} value={font.family} style={{ fontFamily: font.family }}>
              {font.name} ({font.category})
            </option>
          ))}
        </select>
      </div>

      {/* Font Size & Stepper */}
      <div>
        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
          Font Size
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleFontSizeChange(-4)}
            className="p-2 rounded-lg bg-[#252525] hover:bg-[#333333] border border-[#383838] text-gray-300 hover:text-white transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <input
            type="number"
            min="8"
            max="240"
            value={Math.round(textObj.fontSize || 36)}
            onChange={(e) => updateProp('fontSize', parseInt(e.target.value) || 12)}
            className="flex-1 py-1.5 px-3 bg-[#252525] border border-[#383838] rounded-lg text-center font-mono text-xs text-white focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={() => handleFontSizeChange(4)}
            className="p-2 rounded-lg bg-[#252525] hover:bg-[#333333] border border-[#383838] text-gray-300 hover:text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Text Styles & Alignment Toolbar */}
      <div>
        <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
          Formatting & Alignment
        </label>
        <div className="flex flex-col gap-2">
          {/* Styles */}
          <div className="grid grid-cols-5 gap-1 bg-[#252525] p-1 rounded-xl border border-[#333333]">
            <button
              onClick={toggleBold}
              className={`p-1.5 rounded-lg transition-colors flex justify-center ${
                isBold ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-[#333333]'
              }`}
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleItalic}
              className={`p-1.5 rounded-lg transition-colors flex justify-center ${
                isItalic ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-[#333333]'
              }`}
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleUnderline}
              className={`p-1.5 rounded-lg transition-colors flex justify-center ${
                textObj.underline ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-[#333333]'
              }`}
              title="Underline"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleLinethrough}
              className={`p-1.5 rounded-lg transition-colors flex justify-center ${
                textObj.linethrough ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-[#333333]'
              }`}
              title="Strikethrough"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={toggleUppercase}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#333333] transition-colors flex justify-center"
              title="Toggle Uppercase"
            >
              <CaseUpper className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Alignment */}
          <div className="grid grid-cols-4 gap-1 bg-[#252525] p-1 rounded-xl border border-[#333333]">
            {['left', 'center', 'right', 'justify'].map((align) => {
              const isActive = (textObj.textAlign || 'left') === align;
              const Icon =
                align === 'left'
                  ? AlignLeft
                  : align === 'center'
                  ? AlignCenter
                  : align === 'right'
                  ? AlignRight
                  : AlignJustify;
              return (
                <button
                  key={align}
                  onClick={() => updateProp('textAlign', align)}
                  className={`p-1.5 rounded-lg transition-colors flex justify-center ${
                    isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-[#333333]'
                  }`}
                  title={`Align ${align}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Text Color */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Text Color
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="color"
              value={(textObj.fill as string) || '#ffffff'}
              onChange={(e) => updateProp('fill', e.target.value)}
              className="w-5 h-5 rounded cursor-pointer border border-[#444444] bg-transparent"
            />
            <span className="text-[11px] font-mono text-gray-400 uppercase">
              {(textObj.fill as string) || '#ffffff'}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {swatches.map((color) => (
            <button
              key={color}
              onClick={() => updateProp('fill', color)}
              style={{ backgroundColor: color }}
              className={`w-full aspect-square rounded-lg border transition-transform hover:scale-105 ${
                textObj.fill === color ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-[#383838]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Spacing (Letter spacing and Line height) */}
      <div className="space-y-3 pt-2">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Letter Spacing</span>
            <span className="text-gray-300 font-mono">{textObj.charSpacing || 0}</span>
          </div>
          <input
            type="range"
            min="-50"
            max="400"
            step="10"
            value={textObj.charSpacing || 0}
            onChange={(e) => updateProp('charSpacing', parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Line Spacing</span>
            <span className="text-gray-300 font-mono">{(textObj.lineHeight || 1.1).toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.7"
            max="2.5"
            step="0.1"
            value={textObj.lineHeight || 1.1}
            onChange={(e) => updateProp('lineHeight', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Text Shadow */}
      <div className="pt-2 border-t border-[#2d2d2d]">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Drop Shadow
          </label>
          <button
            onClick={() => {
              if (textObj.shadow) {
                updateProp('shadow', null);
              } else {
                updateProp(
                  'shadow',
                  new fabric.Shadow({
                    color: 'rgba(0,0,0,0.6)',
                    blur: 15,
                    offsetX: 5,
                    offsetY: 5,
                  })
                );
              }
            }}
            className={`text-[10px] px-2 py-0.5 rounded font-semibold transition-colors ${
              textObj.shadow ? 'bg-blue-600 text-white' : 'bg-[#252525] text-gray-400 hover:text-white'
            }`}
          >
            {textObj.shadow ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {textObj.shadow && (
          <div className="space-y-2 bg-[#252525] p-2.5 rounded-xl border border-[#333333]">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Shadow Blur</span>
              <span className="text-gray-300 font-mono">{(textObj.shadow as fabric.Shadow).blur || 10}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={(textObj.shadow as fabric.Shadow).blur || 10}
              onChange={(e) => {
                const s = (textObj.shadow as fabric.Shadow) || new fabric.Shadow({ color: 'rgba(0,0,0,0.6)' });
                s.blur = parseInt(e.target.value);
                updateProp('shadow', s);
              }}
              className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Text Outline / Stroke */}
      <div className="pt-2 border-t border-[#2d2d2d]">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Outline Stroke
          </label>
          <span className="text-xs font-mono text-gray-400">{textObj.strokeWidth || 0}px</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="color"
            value={(textObj.stroke as string) || '#000000'}
            onChange={(e) => updateProp('stroke', e.target.value)}
            className="w-5 h-5 rounded cursor-pointer border border-[#444444] bg-transparent"
          />
          <input
            type="range"
            min="0"
            max="16"
            value={textObj.strokeWidth || 0}
            onChange={(e) => updateProp('strokeWidth', parseInt(e.target.value))}
            className="flex-1 h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Text Background Highlight */}
      <div className="pt-2 border-t border-[#2d2d2d]">
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Badge Background
          </label>
          <button
            onClick={() => updateProp('textBackgroundColor', '')}
            className="text-[10px] text-gray-400 hover:text-rose-400"
          >
            Clear
          </button>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {['#f43f5e', '#ef4444', '#facc15', '#10b981', '#3b82f6', '#000000', '#ffffff', '#1e293b', '#6366f1', '#ec4899'].map((c) => (
            <button
              key={c}
              onClick={() => updateProp('textBackgroundColor', c)}
              style={{ backgroundColor: c }}
              className={`w-full aspect-square rounded-lg border transition-transform hover:scale-105 ${
                textObj.textBackgroundColor === c ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-[#383838]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Text Opacity */}
      <div className="pt-2 border-t border-[#2d2d2d]">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Opacity</span>
          <span className="text-gray-300 font-mono">
            {Math.round((textObj.opacity !== undefined ? textObj.opacity : 1) * 100)}%
          </span>
        </div>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.05"
          value={textObj.opacity !== undefined ? textObj.opacity : 1}
          onChange={(e) => updateProp('opacity', parseFloat(e.target.value))}
          className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};


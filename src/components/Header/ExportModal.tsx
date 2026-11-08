import React, { useState } from 'react';
import { useEditorStore } from '../../store/useEditorStore';
import { fabricServiceInstance } from '../../services/fabricService';
import { exportService, ExportOptions } from '../../services/exportService';
import { X, Download, FileImage, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExportModal: React.FC = () => {
  const { isExportModalOpen, setIsExportModalOpen, projectName, canvasWidth, canvasHeight } = useEditorStore();
  const [format, setFormat] = useState<'png' | 'jpeg' | 'pdf'>('png');
  const [multiplier, setMultiplier] = useState<number>(2); // 2x default for crisp retina export
  const [quality, setQuality] = useState<number>(0.92);
  const [transparent, setTransparent] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isExportModalOpen) return null;

  const handleExport = async () => {
    const canvas = fabricServiceInstance.getCanvas();
    if (!canvas) return;

    setIsExporting(true);
    try {
      const options: ExportOptions = {
        format,
        multiplier,
        quality,
        transparent: format === 'png' ? transparent : false,
        fileName: projectName.trim() ? projectName.replace(/\s+/g, '_').toLowerCase() : 'my_design',
      };

      await exportService.exportCanvas(canvas, options);

      // Trigger celebratory confetti on download!
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      } catch (e) {
        // ignore if not supported
      }

      setIsExportModalOpen(false);
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const outputWidth = Math.round(canvasWidth * multiplier);
  const outputHeight = Math.round(canvasHeight * multiplier);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1e1e1e] border border-[#333333] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2d2d2d]">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-white text-base">Export Design</h3>
          </div>
          <button
            onClick={() => setIsExportModalOpen(false)}
            className="p-1 rounded-lg hover:bg-[#2d2d2d] text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Format Selection Cards */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2.5">
              File Format
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setFormat('png')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  format === 'png'
                    ? 'border-blue-500 bg-blue-500/10 text-white font-medium shadow-sm'
                    : 'border-[#333333] bg-[#252525] text-gray-400 hover:text-gray-200 hover:border-[#444444]'
                }`}
              >
                <FileImage className={`w-6 h-6 mb-1.5 ${format === 'png' ? 'text-blue-400' : 'text-gray-400'}`} />
                <span className="text-xs font-semibold">PNG</span>
                <span className="text-[10px] text-gray-500">Best for Web & Social</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('jpeg')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  format === 'jpeg'
                    ? 'border-blue-500 bg-blue-500/10 text-white font-medium shadow-sm'
                    : 'border-[#333333] bg-[#252525] text-gray-400 hover:text-gray-200 hover:border-[#444444]'
                }`}
              >
                <FileImage className={`w-6 h-6 mb-1.5 ${format === 'jpeg' ? 'text-blue-400' : 'text-gray-400'}`} />
                <span className="text-xs font-semibold">JPG</span>
                <span className="text-[10px] text-gray-500">Smaller file size</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  format === 'pdf'
                    ? 'border-blue-500 bg-blue-500/10 text-white font-medium shadow-sm'
                    : 'border-[#333333] bg-[#252525] text-gray-400 hover:text-gray-200 hover:border-[#444444]'
                }`}
              >
                <FileText className={`w-6 h-6 mb-1.5 ${format === 'pdf' ? 'text-blue-400' : 'text-gray-400'}`} />
                <span className="text-xs font-semibold">PDF</span>
                <span className="text-[10px] text-gray-500">Best for Printing</span>
              </button>
            </div>
          </div>

          {/* Scale / Resolution Multiplier */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-medium text-gray-400 uppercase tracking-wider">Resolution Scale</span>
              <span className="font-mono text-gray-300">
                {outputWidth} × {outputHeight} px ({multiplier}x)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setMultiplier(val)}
                  className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                    multiplier === val
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-[#252525] text-gray-300 border-[#333333] hover:border-[#444444]'
                  }`}
                >
                  {val}x {val === 1 ? '(Standard)' : val === 2 ? '(High-Res)' : '(Ultra 300DPI)'}
                </button>
              ))}
            </div>
          </div>

          {/* Options depending on format */}
          {format === 'png' && (
            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#252525] border border-[#333333] cursor-pointer hover:border-[#444444] transition-colors">
              <input
                type="checkbox"
                checked={transparent}
                onChange={(e) => setTransparent(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 bg-[#1e1e1e] border-[#444444]"
              />
              <div className="text-xs">
                <span className="font-medium text-gray-200 block">Transparent Background</span>
                <span className="text-gray-500">Export without canvas background fill</span>
              </div>
            </label>
          )}

          {format === 'jpeg' && (
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-medium text-gray-400">JPEG Quality</span>
                <span className="font-mono text-gray-300">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#333333] rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#181818] border-t border-[#2d2d2d] flex items-center justify-between">
          <div className="text-xs text-gray-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Ready to download</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsExportModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#252525] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isExporting}
              onClick={handleExport}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Generating...' : `Download ${format.toUpperCase()}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


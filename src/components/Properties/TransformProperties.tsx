import React from 'react';
import { fabricServiceInstance } from '../../services/fabricService';
import { useEditorStore } from '../../store/useEditorStore';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  BringToFront,
  SendToBack,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Lock,
  Unlock,
  Group as GroupIcon,
  Ungroup as UngroupIcon,
} from 'lucide-react';

export const TransformProperties: React.FC = () => {
  const { selectedObject, incrementLayersVersion } = useEditorStore();
  const isLocked = !!selectedObject?.lockMovementX;

  const handleAlign = (alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    fabricServiceInstance.alignActiveObject(alignment);
  };

  const handleDuplicate = () => {
    fabricServiceInstance.duplicateActiveObject();
    incrementLayersVersion();
  };

  const handleDelete = () => {
    fabricServiceInstance.deleteActiveObject();
    incrementLayersVersion();
  };

  const handleToggleLock = () => {
    fabricServiceInstance.toggleLock();
    incrementLayersVersion();
  };

  return (
    <div className="space-y-4 pt-3 border-t border-[#2d2d2d]">
      {/* Alignment Grid */}
      <div>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
          Align to Canvas
        </span>
        <div className="grid grid-cols-6 gap-1 bg-[#252525] p-1 rounded-xl border border-[#333333]">
          <button
            onClick={() => handleAlign('left')}
            className="p-1.5 rounded-lg hover:bg-[#333333] text-gray-400 hover:text-white transition-colors flex justify-center"
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAlign('center')}
            className="p-1.5 rounded-lg hover:bg-[#333333] text-gray-400 hover:text-white transition-colors flex justify-center"
            title="Align Horizontal Center"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAlign('right')}
            className="p-1.5 rounded-lg hover:bg-[#333333] text-gray-400 hover:text-white transition-colors flex justify-center"
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAlign('top')}
            className="p-1.5 rounded-lg hover:bg-[#333333] text-gray-400 hover:text-white transition-colors flex justify-center"
            title="Align Top"
          >
            <AlignStartVertical className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAlign('middle')}
            className="p-1.5 rounded-lg hover:bg-[#333333] text-gray-400 hover:text-white transition-colors flex justify-center"
            title="Align Vertical Middle"
          >
            <AlignCenterVertical className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAlign('bottom')}
            className="p-1.5 rounded-lg hover:bg-[#333333] text-gray-400 hover:text-white transition-colors flex justify-center"
            title="Align Bottom"
          >
            <AlignEndVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Layer Stacking Order */}
      <div>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
          Layer Order
        </span>
        <div className="grid grid-cols-4 gap-1.5 bg-[#252525] p-1 rounded-xl border border-[#333333]">
          <button
            onClick={() => {
              fabricServiceInstance.bringToFront();
              incrementLayersVersion();
            }}
            className="p-1.5 rounded-lg hover:bg-[#333333] text-gray-400 hover:text-white transition-colors flex flex-col items-center justify-center"
            title="Bring to Front"
          >
            <BringToFront className="w-4 h-4 mb-0.5" />
            <span className="text-[9px]">Front</span>
          </button>
          <button
            onClick={() => {
              fabricServiceInstance.bringForward();
              incrementLayersVersion();
            }}
            className="p-1.5 rounded-lg hover:bg-[#333333] text-gray-400 hover:text-white transition-colors flex flex-col items-center justify-center"
            title="Bring Forward"
          >
            <ArrowUp className="w-4 h-4 mb-0.5" />
            <span className="text-[9px]">Forward</span>
          </button>
          <button
            onClick={() => {
              fabricServiceInstance.sendBackwards();
              incrementLayersVersion();
            }}
            className="p-1.5 rounded-lg hover:bg-[#333333] text-gray-400 hover:text-white transition-colors flex flex-col items-center justify-center"
            title="Send Backward"
          >
            <ArrowDown className="w-4 h-4 mb-0.5" />
            <span className="text-[9px]">Backward</span>
          </button>
          <button
            onClick={() => {
              fabricServiceInstance.sendToBack();
              incrementLayersVersion();
            }}
            className="p-1.5 rounded-lg hover:bg-[#333333] text-gray-400 hover:text-white transition-colors flex flex-col items-center justify-center"
            title="Send to Back"
          >
            <SendToBack className="w-4 h-4 mb-0.5" />
            <span className="text-[9px]">Back</span>
          </button>
        </div>
      </div>

      {/* Group / Ungroup if multiple or group selected */}
      {(selectedObject?.type === 'activeSelection' || selectedObject?.type === 'group') && (
        <div className="pt-2">
          {selectedObject.type === 'activeSelection' ? (
            <button
              onClick={() => {
                fabricServiceInstance.groupActiveObjects();
                incrementLayersVersion();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#252525] hover:bg-blue-600/20 border border-[#333333] hover:border-blue-500 rounded-xl text-xs font-semibold text-blue-400 hover:text-white transition-all shadow-sm"
            >
              <GroupIcon className="w-4 h-4" />
              <span>Group Elements (Ctrl+G)</span>
            </button>
          ) : (
            <button
              onClick={() => {
                fabricServiceInstance.ungroupActiveObject();
                incrementLayersVersion();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#252525] hover:bg-amber-600/20 border border-[#333333] hover:border-amber-500 rounded-xl text-xs font-semibold text-amber-400 hover:text-white transition-all shadow-sm"
            >
              <UngroupIcon className="w-4 h-4" />
              <span>Ungroup Elements (Ctrl+Shift+G)</span>
            </button>
          )}
        </div>
      )}

      {/* Object Actions: Duplicate, Lock, Delete */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={handleDuplicate}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#252525] hover:bg-[#303030] border border-[#333333] rounded-xl text-xs font-medium text-gray-300 hover:text-white transition-colors"
          title="Duplicate Element (Ctrl+D)"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Duplicate</span>
        </button>

        <button
          onClick={handleToggleLock}
          className={`p-2 border rounded-xl transition-colors ${
            isLocked
              ? 'border-amber-500 bg-amber-500/20 text-amber-400'
              : 'border-[#333333] bg-[#252525] hover:bg-[#303030] text-gray-400 hover:text-white'
          }`}
          title={isLocked ? 'Unlock Element' : 'Lock Element'}
        >
          {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </button>

        <button
          onClick={handleDelete}
          className="p-2 bg-[#252525] hover:bg-rose-900/30 border border-[#333333] hover:border-rose-500/50 rounded-xl text-gray-400 hover:text-rose-400 transition-colors"
          title="Delete Element (Delete / Backspace)"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};


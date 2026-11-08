import React from 'react';
import { fabricServiceInstance } from '../../services/fabricService';
import {
  Shapes,
  Square,
  Circle,
  Triangle,
  Star,
  Heart,
  Minus,
  MoveRight,
  Bookmark,
  Award,
  Globe,
  Phone,
  Mail,
  MapPin,
  Flame,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const ElementsPanel: React.FC = () => {
  const shapes = [
    {
      id: 'rect',
      label: 'Rectangle',
      icon: Square,
      action: () => fabricServiceInstance.addShape('rect', { rx: 0, ry: 0, fill: '#3b82f6' }),
    },
    {
      id: 'rounded-rect',
      label: 'Rounded Rect',
      icon: Square,
      action: () => fabricServiceInstance.addShape('rect', { rx: 24, ry: 24, fill: '#6366f1' }),
    },
    {
      id: 'circle',
      label: 'Circle',
      icon: Circle,
      action: () => fabricServiceInstance.addShape('circle', { fill: '#ec4899' }),
    },
    {
      id: 'triangle',
      label: 'Triangle',
      icon: Triangle,
      action: () => fabricServiceInstance.addShape('triangle', { fill: '#f59e0b' }),
    },
    {
      id: 'star',
      label: '5-Point Star',
      icon: Star,
      action: () => fabricServiceInstance.addShape('star', { fill: '#eab308' }),
    },
    {
      id: 'heart',
      label: 'Heart',
      icon: Heart,
      action: () => fabricServiceInstance.addShape('heart', { fill: '#f43f5e' }),
    },
  ];

  const lines = [
    {
      id: 'line',
      label: 'Solid Line',
      icon: Minus,
      action: () => fabricServiceInstance.addShape('line'),
    },
    {
      id: 'dashed-line',
      label: 'Dashed Line',
      icon: Minus,
      action: () => fabricServiceInstance.addShape('line', { strokeDashArray: [12, 12] }),
    },
    {
      id: 'arrow',
      label: 'Arrow',
      icon: MoveRight,
      action: () => fabricServiceInstance.addShape('arrow'),
    },
  ];

  const decorative = [
    {
      id: 'badge',
      label: 'Banner Ribbon',
      icon: Bookmark,
      action: () => fabricServiceInstance.addShape('badge', { fill: '#e11d48' }),
    },
    {
      id: 'sale-badge',
      label: 'Sale Badge Circle',
      icon: Award,
      action: () => {
        fabricServiceInstance.addShape('circle', {
          radius: 90,
          fill: '#facc15',
          stroke: '#ffffff',
          strokeWidth: 4,
        });
      },
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <Shapes className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-semibold text-white">Shapes & Elements</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Basic Shapes */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
            Geometric Shapes
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            {shapes.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#252525] hover:bg-[#2e2e2e] border border-[#333333] hover:border-blue-500/50 text-gray-300 hover:text-white transition-all group"
                >
                  <Icon className="w-6 h-6 mb-1.5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-medium text-center truncate w-full">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lines and Connectors */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
            Lines & Arrows
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            {lines.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#252525] hover:bg-[#2e2e2e] border border-[#333333] hover:border-blue-500/50 text-gray-300 hover:text-white transition-all group"
                >
                  <Icon className="w-6 h-6 mb-1.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-medium text-center truncate w-full">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Decorative Elements & Badges */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
            Badges & Ribbons
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {decorative.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#252525] hover:bg-[#2e2e2e] border border-[#333333] hover:border-blue-500/50 text-gray-300 hover:text-white transition-all group"
                >
                  <Icon className="w-7 h-7 mb-2 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium text-center">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vector Marketing & Contact Icons */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
            Vector Icons
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              {
                id: 'globe',
                label: 'Web',
                icon: Globe,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>',
              },
              {
                id: 'phone',
                label: 'Phone',
                icon: Phone,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
              },
              {
                id: 'mail',
                label: 'Mail',
                icon: Mail,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
              },
              {
                id: 'map-pin',
                label: 'Location',
                icon: MapPin,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>',
              },
              {
                id: 'flame',
                label: 'Hot/Sale',
                icon: Flame,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
              },
              {
                id: 'shop',
                label: 'Shop',
                icon: ShoppingBag,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
              },
              {
                id: 'sparkle',
                label: 'Sparkle',
                icon: Sparkles,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
              },
              {
                id: 'check',
                label: 'Check',
                icon: CheckCircle2,
                svg: '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
              },
            ].map((iconItem) => {
              const Icon = iconItem.icon;
              return (
                <button
                  key={iconItem.id}
                  onClick={() => fabricServiceInstance.addSvgIcon(iconItem.svg, iconItem.label)}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#252525] hover:bg-[#2e2e2e] border border-[#333333] hover:border-blue-500/50 text-gray-300 hover:text-white transition-all group"
                  title={`Add ${iconItem.label} Icon`}
                >
                  <Icon className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform text-gray-300 group-hover:text-white" />
                  <span className="text-[10px] font-medium text-center truncate w-full">
                    {iconItem.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


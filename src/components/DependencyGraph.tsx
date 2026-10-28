import React, { useState } from 'react';
import { DependencyNode } from '../types';
import { useApp } from '../context/AppContext';
import { ZoomIn, ZoomOut, RotateCcw, AlertTriangle, Layers, Activity } from 'lucide-react';

interface DependencyGraphProps {
  nodes: DependencyNode[];
  edges: { source: string; target: string; label?: string }[];
  impactMode?: boolean;
}

export const DependencyGraph: React.FC<DependencyGraphProps> = ({
  nodes,
  edges,
  impactMode = false,
}) => {
  const { setCursorState, setCursorLabel } = useApp();
  const [selectedNode, setSelectedNode] = useState<DependencyNode | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activePulseIndex, setActivePulseIndex] = useState<number>(0);

  // Auto calculate layout coordinates if not explicitly provided
  const processedNodes = nodes.map((node, index) => {
    if (node.x !== undefined && node.y !== undefined) return node;

    // Distribute in layers visually
    const total = nodes.length;
    const radius = 180;
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const cx = 350 + radius * Math.cos(angle);
    const cy = 250 + radius * Math.sin(angle);

    return {
      ...node,
      x: index === 0 ? 350 : cx,
      y: index === 0 ? 250 : cy,
    };
  });

  const getNodeColor = (node: DependencyNode) => {
    if (impactMode && node.status === 'OPERATIONAL') {
      return { border: '#262933', bg: '#0F1115', text: '#525866', ring: 'none' };
    }
    switch (node.status) {
      case 'CRITICAL':
        return { border: '#D9383A', bg: 'rgba(217, 56, 58, 0.2)', text: '#FFFFFF', ring: 'rgba(217, 56, 58, 0.6)' };
      case 'DEGRADED':
      case 'AFFECTED':
        return { border: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)', text: '#FDE68A', ring: 'rgba(245, 158, 11, 0.4)' };
      case 'OPERATIONAL':
      default:
        return { border: '#10B981', bg: 'rgba(16, 185, 129, 0.15)', text: '#A7F3D0', ring: 'rgba(16, 185, 129, 0.3)' };
    }
  };

  return (
    <div className="relative w-full h-[520px] bg-[#0D0F12] hairline-border rounded-2xl overflow-hidden select-none">
      
      {/* Top Graph Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#161920]/90 backdrop-blur-md px-3 py-1.5 rounded-full hairline-border pointer-events-auto">
          <Activity className="w-4 h-4 text-[#D9383A] animate-pulse" />
          <span className="text-xs font-mono text-neutral-300 font-medium">
            Dependency Propagation Matrix
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-[#D9383A]/20 text-[#D9383A] rounded-full">
            {nodes.length} Connected Nodes
          </span>
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1 bg-[#161920]/90 backdrop-blur-md p-1 rounded-full hairline-border pointer-events-auto">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.6))}
            className="p-1.5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-full transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.6))}
            className="p-1.5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-full transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 hover:bg-white/10 text-neutral-300 hover:text-white rounded-full transition-colors"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div 
        className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
        style={{ transform: `scale(${zoomLevel})` }}
        onMouseEnter={() => { setCursorState('TRACE'); setCursorLabel('TRACE'); }}
        onMouseLeave={() => { setCursorState('DEFAULT'); setCursorLabel(''); }}
      >
        <svg className="w-full h-full" viewBox="0 0 700 500">
          <defs>
            {/* Edge line gradient */}
            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D9383A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
            </linearGradient>
            
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Draw Edge Connections */}
          {edges.map((edge, i) => {
            const sourceNode = processedNodes.find(n => n.id === edge.source);
            const targetNode = processedNodes.find(n => n.id === edge.target);

            if (!sourceNode || !targetNode) return null;

            const isDimmed = impactMode && sourceNode.status === 'OPERATIONAL' && targetNode.status === 'OPERATIONAL';

            return (
              <g key={`edge-${i}`}>
                {/* Connector Line */}
                <line
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isDimmed ? '#1F242F' : 'url(#edgeGrad)'}
                  strokeWidth={isDimmed ? 1 : 2}
                  strokeDasharray={isDimmed ? '4 4' : 'none'}
                  className="transition-all duration-300"
                />

                {/* Animated propagation pulse along the wire */}
                {!isDimmed && (
                  <circle r="4" fill="#D9383A" filter="url(#glow)">
                    <animateMotion
                      path={`M${sourceNode.x},${sourceNode.y} L${targetNode.x},${targetNode.y}`}
                      dur={`${2.5 + (i % 3) * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {edge.label && (
                  <text
                    x={((sourceNode.x || 0) + (targetNode.x || 0)) / 2}
                    y={((sourceNode.y || 0) + (targetNode.y || 0)) / 2 - 8}
                    fill="#94A3B8"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="opacity-70"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Draw Nodes */}
          {processedNodes.map((node) => {
            const color = getNodeColor(node);
            const isSelected = selectedNode?.id === node.id;
            const isDimmed = impactMode && node.status === 'OPERATIONAL';

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onClick={() => setSelectedNode(node)}
                className="cursor-pointer group"
              >
                {/* Node Outer Pulse Ring */}
                {node.status === 'CRITICAL' && !isDimmed && (
                  <circle
                    r="32"
                    fill="none"
                    stroke="#D9383A"
                    strokeWidth="1.5"
                    className="animate-ping opacity-50"
                  />
                )}

                {/* Node Base Circle */}
                <circle
                  r="22"
                  fill={color.bg}
                  stroke={color.border}
                  strokeWidth={isSelected ? 3 : 2}
                  className="transition-all duration-300 group-hover:scale-110"
                  filter={node.status === 'CRITICAL' ? 'url(#glow)' : undefined}
                />

                {/* Node Type Symbol / Counter */}
                <text
                  textAnchor="middle"
                  dy="4"
                  fill={color.text}
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {node.affectedCount ? node.affectedCount : node.type[0]}
                </text>

                {/* Node Label Text */}
                <text
                  textAnchor="middle"
                  dy="40"
                  fill={isDimmed ? '#475569' : '#F1F5F9'}
                  fontSize="12"
                  fontWeight="600"
                  fontFamily="sans-serif"
                  className="transition-colors group-hover:fill-[#D9383A]"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <div className="absolute bottom-4 left-4 right-4 bg-[#161920]/95 backdrop-blur-md p-4 rounded-xl hairline-border flex items-center justify-between gap-4 z-30 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#D9383A] bg-[#D9383A]/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#D9383A]" />
            </div>
            <div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                NODE INSPECTION // {selectedNode.type}
              </div>
              <h4 className="text-sm font-bold text-white">
                {selectedNode.label}
              </h4>
              {selectedNode.details && (
                <p className="text-xs text-neutral-300 font-mono mt-0.5">
                  {selectedNode.details}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {selectedNode.affectedCount && (
              <span className="px-3 py-1 bg-neutral-800 text-white font-mono text-xs rounded-full">
                {selectedNode.affectedCount} Impacted
              </span>
            )}
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-neutral-400 hover:text-white px-2 py-1 font-mono"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* Legend Footer */}
      <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-3 bg-[#161920]/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-mono text-neutral-400 hairline-border">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#D9383A]" /> Critical
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#F59E0B]" /> Affected
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" /> Operational
        </span>
      </div>
    </div>
  );
};

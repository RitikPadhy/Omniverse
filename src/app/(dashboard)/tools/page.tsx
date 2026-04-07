"use client";

import { useState, useEffect, useRef } from "react";

const NODES = [
  { id: "ats-scanner", label: "ATS Scanner", x: 0, y: 0, radius: 32, color: "#8b7cf6" },
  { id: "keywords", label: "ats-keyword-optimization.md", x: 0, y: 0, radius: 22, color: "#6db870" },
  { id: "pitfalls", label: "ats-parsing-pitfalls.md", x: 0, y: 0, radius: 22, color: "#e8913a" },
];

const EDGES = [
  { from: "ats-scanner", to: "keywords" },
  { from: "ats-scanner", to: "pitfalls" },
];

function GraphView({ width, height }: { width: number; height: number }) {
  const cx = width / 2;
  const cy = height / 2;

  const nodes = NODES.map((n, i) => {
    if (i === 0) return { ...n, x: cx, y: cy };
    const angle = i === 1 ? -Math.PI / 4 : Math.PI / 4;
    const dist = Math.min(width, height) * 0.3;
    return { ...n, x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist };
  });

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg width={width} height={height} className="select-none">
      {/* Edges */}
      {EDGES.map((e) => {
        const from = nodeMap[e.from];
        const to = nodeMap[e.to];
        return (
          <line
            key={`${e.from}-${e.to}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#2a2a2a"
            strokeWidth={2}
          />
        );
      })}
      {/* Nodes */}
      {nodes.map((n) => (
        <g key={n.id}>
          {/* Glow */}
          <circle cx={n.x} cy={n.y} r={n.radius + 8} fill={n.color} opacity={0.08} />
          {/* Node circle */}
          <circle
            cx={n.x}
            cy={n.y}
            r={n.radius}
            fill="#1a1a1a"
            stroke={n.color}
            strokeWidth={2}
          />
          {/* Label */}
          <text
            x={n.x}
            y={n.y + n.radius + 18}
            textAnchor="middle"
            fill="#e5e5e5"
            fontSize={11}
            fontFamily="var(--font-sans)"
          >
            {n.label}
          </text>
          {/* Inner icon text */}
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fill={n.color}
            fontSize={n.id === "ats-scanner" ? 13 : 10}
            fontFamily="var(--font-mono)"
            fontWeight={600}
          >
            {n.id === "ats-scanner" ? "ATS" : ".md"}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function ToolsPage() {
  const [graphOpen, setGraphOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 600, h: 400 });

  useEffect(() => {
    if (!graphOpen || !containerRef.current) return;
    const measure = () => {
      if (containerRef.current) {
        setDims({ w: containerRef.current.clientWidth, h: containerRef.current.clientHeight });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [graphOpen]);

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">My tools</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* ATS Scanner tool card */}
        <div className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-card-hover">
          <h3 className="text-sm font-medium text-foreground">ATS Scanner</h3>
          <p className="mt-1 text-xs text-muted">
            Scan resumes against job descriptions for ATS compatibility scoring.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded bg-accent-green/10 px-2 py-0.5 text-[10px] font-medium text-accent-green">
                Active
              </span>
              <span className="text-[10px] text-muted">Used 2 min ago</span>
            </div>
            <button
              onClick={() => setGraphOpen(true)}
              className="rounded-md bg-accent-purple px-3 py-1 text-[11px] font-medium text-white transition-colors hover:bg-accent-purple/80"
            >
              Graphical View
            </button>
          </div>
        </div>

        {/* Empty state */}
        <div className="flex items-center justify-center rounded-lg border border-dashed border-border p-8">
          <p className="text-sm text-muted">
            Build a new tool &rarr;
          </p>
        </div>
      </div>

      {/* Graph dialog overlay */}
      {graphOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setGraphOpen(false)}
        >
          <div
            className="flex h-[80%] w-[80%] flex-col overflow-hidden rounded-xl border border-border bg-[#0e0e0e] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">ATS Scanner — Knowledge Graph</span>
                <span className="rounded bg-accent-purple/10 px-2 py-0.5 text-[10px] font-medium text-accent-purple">
                  3 nodes
                </span>
              </div>
              <button
                onClick={() => setGraphOpen(false)}
                className="text-muted transition-colors hover:text-foreground"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Graph area */}
            <div ref={containerRef} className="flex-1">
              {dims.w > 0 && <GraphView width={dims.w} height={dims.h} />}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 border-t border-border px-5 py-2.5">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-purple" />
                <span className="text-[10px] text-muted">Tool</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-green" />
                <span className="text-[10px] text-muted">Keyword Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent-orange" />
                <span className="text-[10px] text-muted">Parsing Pitfalls</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Node3D {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  color: string;
}

const WHITE = "#e5e5e5";
const DIST = 150;

const NODES_3D: Node3D[] = [
  { id: "overview", label: "index.md", x: 0, y: 0, z: 0, baseRadius: 14, color: WHITE },
  { id: "keywords", label: "ats-keyword-optimization.md", x: -DIST, y: 0, z: 0, baseRadius: 8, color: WHITE },
  { id: "pitfalls", label: "ats-parsing-pitfalls.md", x: DIST, y: 0, z: 0, baseRadius: 8, color: WHITE },
];

const EDGES = [
  { from: "overview", to: "keywords" },
  { from: "overview", to: "pitfalls" },
];

function rotateY(x: number, z: number, angle: number) {
  return {
    x: x * Math.cos(angle) - z * Math.sin(angle),
    z: x * Math.sin(angle) + z * Math.cos(angle),
  };
}

function project(x: number, y: number, z: number, fov: number) {
  const scale = fov / (fov + z);
  return { sx: x * scale, sy: y * scale, scale };
}

function GraphView({ width, height }: { width: number; height: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const cx = width / 2;
    const cy = height / 2;
    const fov = 500;

    const angle = 0;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Transform nodes
    const projected = NODES_3D.map((n) => {
      const r = rotateY(n.x, n.z, angle);
      const p = project(r.x, n.y, r.z, fov);
      return { ...n, sx: cx + p.sx, sy: cy + p.sy, scale: p.scale, rz: r.z };
    });

    // Sort by depth (back to front)
    const sorted = [...projected].sort((a, b) => b.rz - a.rz);
    const nodeMap = Object.fromEntries(projected.map((n) => [n.id, n]));

    // Draw edges
    for (const e of EDGES) {
      const from = nodeMap[e.from];
      const to = nodeMap[e.to];
      const avgDepth = (from.scale + to.scale) / 2;
      ctx.beginPath();
      ctx.moveTo(from.sx, from.sy);
      ctx.lineTo(to.sx, to.sy);
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * avgDepth})`;
      ctx.lineWidth = 1.5 * avgDepth;
      ctx.stroke();
    }

    // Draw nodes (sorted back-to-front)
    for (const n of sorted) {
      const r = n.baseRadius * n.scale;
      const alpha = 0.3 + 0.7 * n.scale;

      // Outer glow
      const glow = ctx.createRadialGradient(n.sx, n.sy, r * 0.5, n.sx, n.sy, r * 4);
      glow.addColorStop(0, n.color + "30");
      glow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(n.sx, n.sy, r * 4, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Sphere body gradient
      const grad = ctx.createRadialGradient(
        n.sx - r * 0.3, n.sy - r * 0.3, r * 0.1,
        n.sx, n.sy, r
      );
      grad.addColorStop(0, n.color);
      grad.addColorStop(0.7, n.color + "cc");
      grad.addColorStop(1, n.color + "44");

      ctx.beginPath();
      ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Specular highlight
      const spec = ctx.createRadialGradient(
        n.sx - r * 0.25, n.sy - r * 0.3, 0,
        n.sx - r * 0.25, n.sy - r * 0.3, r * 0.6
      );
      spec.addColorStop(0, "rgba(255,255,255,0.35)");
      spec.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2);
      ctx.fillStyle = spec;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Label
      const fontSize = Math.max(9, 11 * n.scale);
      ctx.font = `500 ${fontSize}px system-ui, -apple-system, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillStyle = `rgba(229, 229, 229, ${alpha * 0.9})`;
      ctx.fillText(n.label, n.sx, n.sy + r + fontSize + 4);
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [width, height]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height }}
      className="select-none"
    />
  );
}

export default function AgentsPage() {
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
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-foreground">Agents</h2>
        <p className="mt-1 text-sm text-muted">
          Create agents by combining skills and MCPs, then test them.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* ATS Scanner agent card */}
        <div className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-card-hover">
          <h3 className="text-sm font-medium text-foreground">ATS Scanner</h3>
          <p className="mt-1 text-xs text-muted">
            Agent that combines resume-scanning skills with PDF and web MCPs for ATS compatibility scoring.
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded bg-accent-purple/10 px-2 py-0.5 text-[10px] font-medium text-accent-purple">
                3 Skills
              </span>
              <span className="rounded bg-accent-orange/10 px-2 py-0.5 text-[10px] font-medium text-accent-orange">
                2 MCPs
              </span>
              <span className="rounded bg-accent-green/10 px-2 py-0.5 text-[10px] font-medium text-accent-green">
                Active
              </span>
              <span className="text-[10px] text-muted">2 min ago</span>
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
            Build a new agent &rarr;
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
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-foreground" />
                <span className="text-[10px] text-muted">index.md (main)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-foreground opacity-60" />
                <span className="text-[10px] text-muted">Linked notes</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

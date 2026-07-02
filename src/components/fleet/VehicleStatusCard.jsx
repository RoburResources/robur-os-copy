import { useState, useRef, useCallback } from "react";
import { MoreHorizontal, Wrench, TrendingUp, CheckCircle, Move, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

const TRUCK_IMG = "https://media.base44.com/images/public/6a434fcdf106195f32f0ac41/1503300fd_image.png";

const statusItems = [
  { label: "Engine", value: "Good" },
  { label: "Tyres", value: "Good" },
  { label: "Brakes", value: "Good" },
  { label: "Hydraulics", value: "Good" },
];

function ProgressBar({ label, percent }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-robur-steel">{label}</span>
        <span className="text-xs font-semibold text-robur-charcoal">{percent}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-robur-charcoal/10 overflow-hidden">
        <div className="h-full rounded-full bg-robur-yellow" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function EditableImage() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });

  const onPointerDown = useCallback((e) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, posX: pos.x, posY: pos.y };
  }, [pos]);

  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    setPos({
      x: dragStart.current.posX + (e.clientX - dragStart.current.x),
      y: dragStart.current.posY + (e.clientY - dragStart.current.y),
    });
  }, [dragging]);

  const onPointerUp = useCallback(() => setDragging(false), []);

  const reset = () => { setPos({ x: 0, y: 0 }); setZoom(1); };

  return (
    <div className="relative mx-5 mt-3 rounded-xl overflow-hidden group/img">
      <div
        className="relative h-36 cursor-grab active:cursor-grabbing select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <img
          src={TRUCK_IMG}
          alt="Truck 03"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
            transition: dragging ? "none" : "transform 0.1s ease-out",
          }}
        />
      </div>

      {/* Image controls */}
      <div className="absolute top-1.5 right-1.5 flex items-center gap-1 opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-md">
        <button
          onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
          className="p-1 rounded hover:bg-robur-charcoal/10"
          title="Zoom out"
        >
          <ZoomOut className="h-3.5 w-3.5 text-robur-charcoal" strokeWidth={1.5} />
        </button>
        <span className="text-[10px] font-medium text-robur-charcoal w-8 text-center">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
          className="p-1 rounded hover:bg-robur-charcoal/10"
          title="Zoom in"
        >
          <ZoomIn className="h-3.5 w-3.5 text-robur-charcoal" strokeWidth={1.5} />
        </button>
        <div className="w-px h-4 bg-robur-charcoal/15" />
        <button onClick={reset} className="p-1 rounded hover:bg-robur-charcoal/10" title="Reset">
          <RotateCcw className="h-3.5 w-3.5 text-robur-charcoal" strokeWidth={1.5} />
        </button>
      </div>
      <div className="absolute top-1.5 left-1.5 flex items-center gap-1 opacity-0 group-hover/img:opacity-100 transition-opacity bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md">
        <Move className="h-3 w-3 text-robur-steel" strokeWidth={1.5} />
        <span className="text-[10px] font-medium text-robur-steel">Drag to reposition</span>
      </div>
    </div>
  );
}

export default function VehicleStatusCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-[#F9F7F5] shadow-[0_4px_16px_rgba(0,0,0,0.18),0_12px_40px_rgba(0,0,0,0.12)]">
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-5">
        <div>
          <h3 className="text-sm font-bold text-robur-charcoal">Vehicle Status</h3>
          <p className="text-xs text-robur-steel mt-0.5">Truck 03 (ABC 234)</p>
        </div>
        <MoreHorizontal className="h-4 w-4 text-robur-steel" strokeWidth={1.5} />
      </div>

      {/* Truck image */}
      <EditableImage />

      {/* Status list + service footer */}
      <div className="px-5 pt-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          {statusItems.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-robur-yellow" />
              <span className="text-xs font-medium text-robur-charcoal">{s.label}</span>
              <span className="text-xs text-robur-steel">— {s.value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[#F0EBE7] px-3 py-2">
          <Wrench className="h-4 w-4 text-robur-charcoal" strokeWidth={1.5} />
          <div>
            <p className="text-[10px] text-robur-steel">Next Service</p>
            <p className="text-xs font-bold text-robur-charcoal">in 5,200 km</p>
          </div>
        </div>
      </div>

      {/* Bottom data modules */}
      <div className="grid grid-cols-2 gap-3 px-5 pb-5 pt-3">
        <div className="rounded-xl bg-[#F0EBE7] p-3 space-y-3">
          <ProgressBar label="Fuel" percent={62} />
          <ProgressBar label="AdBlue" percent={62} />
        </div>
        <div className="rounded-xl bg-[#F0EBE7] p-3 flex flex-col justify-between">
          <div>
            <p className="text-[10px] text-robur-steel mb-1">Odometer</p>
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-robur-charcoal" strokeWidth={1.5} />
              <span className="text-sm font-bold text-robur-charcoal">128,640 km</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 pt-2">
            <CheckCircle className="h-3.5 w-3.5 text-robur-yellow" strokeWidth={2} />
            <span className="text-[10px] font-medium text-robur-charcoal">All systems normal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
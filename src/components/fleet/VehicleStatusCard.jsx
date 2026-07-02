import { MoreHorizontal, Wrench, TrendingUp, CheckCircle } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const TRUCK_IMG = "https://media.base44.com/images/public/6a434fcdf106195f32f0ac41/7f9e77d19_image.png";

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

function TruckImage() {
  return (
    <div className="relative mt-4 overflow-hidden">
      <div className="relative h-[200px] select-none">
        <img
          src={TRUCK_IMG}
          alt="Truck 03"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.85) 100%)" }}
        />
      </div>
    </div>
  );
}

export default function VehicleStatusCard() {
  return (
    <GlassCard level={2} className="overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-5">
        <div>
          <h3 className="text-sm font-bold text-robur-charcoal">Vehicle Status</h3>
          <p className="text-xs text-robur-steel mt-0.5">Truck 03 (ABC 234)</p>
        </div>
        <MoreHorizontal className="h-4 w-4 text-robur-steel" strokeWidth={1.5} />
      </div>

      {/* Truck image */}
      <TruckImage />

      {/* Status list */}
      <div className="px-5 pt-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {statusItems.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-robur-yellow shrink-0 group-hover:scale-125 transition-transform" />
              <span className="text-xs font-medium text-robur-charcoal">{s.label}</span>
              <span className="text-xs text-robur-steel">— {s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next service pill — full width */}
      <div className="px-5 pt-3">
        <div className="flex items-center gap-3 rounded-xl bg-robur-charcoal/[0.03] px-4 py-3 group-hover:bg-robur-charcoal/[0.06] transition-colors">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-robur-yellow/10 group-hover:scale-110 transition-transform">
            <Wrench className="h-4 w-4 text-robur-yellow" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-robur-steel">Next Service</p>
            <p className="text-xs font-bold text-robur-charcoal">in 5,200 km</p>
          </div>
          <span className="rounded-md bg-robur-yellow/10 px-2 py-0.5 text-[9px] font-bold text-robur-yellow">DUE SOON</span>
        </div>
      </div>

      {/* Bottom data modules */}
      <div className="grid grid-cols-2 gap-3 px-5 pb-5 pt-3">
        <div className="rounded-xl bg-robur-charcoal/[0.03] p-3 space-y-3">
          <ProgressBar label="Fuel" percent={62} />
          <ProgressBar label="AdBlue" percent={62} />
        </div>
        <div className="rounded-xl bg-robur-charcoal/[0.03] p-3 flex flex-col justify-between">
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
    </GlassCard>
  );
}
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

const components = [
  { name: "Engine", status: "Good" },
  { name: "Tyres", status: "Good" },
  { name: "Brakes", status: "Good" },
  { name: "Hydraulics", status: "Good" },
  { name: "Electrical", status: "Good" },
  { name: "Safety Systems", status: "Good" },
];

export default function VehicleHealth({ vehicle }) {
  const health = vehicle?.health_pct ?? 0;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (health / 100) * circumference;

  return (
    <GlassCard level={2} className="p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel mb-4">Vehicle Health</h3>
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <svg width="120" height="120">
            <circle cx="60" cy="60" r={radius} stroke="rgba(94,103,112,0.1)" strokeWidth="8" fill="none" />
            <circle
              cx="60" cy="60" r={radius}
              stroke={health > 50 ? "#FFC400" : "#EF4444"}
              strokeWidth="8" fill="none"
              strokeDasharray={circumference} strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-robur-charcoal">{health}<span className="text-sm">%</span></span>
            <span className="text-[9px] font-medium text-robur-steel">Health Score</span>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2">
          {components.map((c) => (
            <div key={c.name} className="rounded-lg bg-robur-charcoal/[0.03] px-2.5 py-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium text-robur-steel">{c.name}</span>
                <span className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  health > 50 ? "bg-robur-yellow" : "bg-red-400"
                )} />
              </div>
              <p className="text-[10px] font-semibold text-robur-charcoal mt-0.5">{c.status}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-robur-steel mt-3">{vehicle?.vehicle_id} · {vehicle?.type}</p>
    </GlassCard>
  );
}
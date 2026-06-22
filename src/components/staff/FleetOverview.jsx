import GlassCard from "@/components/ui/GlassCard";
import StatusDot from "@/components/ui/StatusDot";
import { Truck } from "lucide-react";

const vehicles = [
  { id: "ROB-101", type: "Scania P410", driver: "James D.", status: "active", job: "Bin Exchange · Tottenham" },
  { id: "ROB-108", type: "Volvo FH16", driver: "Mark S.", status: "active", job: "Tip Run · Wyndham" },
  { id: "ROB-115", type: "Scania G410", driver: "Sarah L.", status: "warning", job: "En Route · CBD" },
  { id: "ROB-122", type: "Kenworth T410", driver: "Tom R.", status: "idle", job: "At Depot" },
  { id: "ROB-130", type: "Isuzu FVZ", driver: "David W.", status: "active", job: "Collection · Sunshine" },
  { id: "ROB-142", type: "Scania P410", driver: "Chris M.", status: "critical", job: "Maintenance" },
];

export default function FleetOverview() {
  const activeCount = vehicles.filter((v) => v.status === "active").length;

  return (
    <GlassCard level={2} className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Fleet Status</h3>
        <span className="text-xs font-medium text-emerald-500">{activeCount}/{vehicles.length} active</span>
      </div>

      <div className="space-y-1.5">
        {vehicles.map((v) => (
          <div
            key={v.id}
            className="group flex items-center gap-3 rounded-xl p-2.5 hover:bg-robur-charcoal/[0.03] transition-colors cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-robur-charcoal/5">
              <Truck className="h-4 w-4 text-robur-charcoal" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-robur-charcoal">{v.id}</span>
                <span className="text-[10px] text-robur-steel/50">·</span>
                <span className="text-[10px] text-robur-steel">{v.driver}</span>
              </div>
              <p className="text-[10px] text-robur-steel/60 truncate">{v.job}</p>
            </div>
            <StatusDot status={v.status} size="sm" />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
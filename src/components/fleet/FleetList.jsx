import GlassCard from "@/components/ui/GlassCard";
import StatusDot from "@/components/ui/StatusDot";
import { Search, Truck, Wrench, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FleetList({ vehicles, selectedVehicle, onSelect, loading }) {
  return (
    <GlassCard level={2} className="p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Fleet Overview</h3>
        <span className="text-[10px] text-robur-steel/50">{vehicles.length} assets</span>
      </div>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-robur-steel/50" />
        <input
          placeholder="Search fleet..."
          className="w-full rounded-lg border border-robur-light/30 bg-white/60 pl-9 pr-3 py-2 text-xs text-robur-charcoal placeholder:text-robur-steel/40 focus:outline-none focus:ring-2 focus:ring-robur-yellow/30"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 -mr-1 pr-1">
        {loading ? (
          <p className="text-xs text-robur-steel text-center py-8">Loading fleet...</p>
        ) : vehicles.length === 0 ? (
          <p className="text-xs text-robur-steel text-center py-8">No vehicles found</p>
        ) : (
          vehicles.map((v) => (
            <button
              key={v.id}
              onClick={() => onSelect(v)}
              className={cn(
                "w-full text-left rounded-xl p-3 transition-all border",
                selectedVehicle?.id === v.id
                  ? "bg-robur-yellow/10 border-robur-yellow/40"
                  : "bg-white/40 border-transparent hover:bg-robur-charcoal/[0.03] hover:border-robur-light/20"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-robur-charcoal/5">
                  <Truck className="h-4 w-4 text-robur-charcoal" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-robur-charcoal">{v.vehicle_id}</span>
                    <StatusDot status={v.status === "active" ? "active" : "idle"} size="xs" label={v.status === "active" ? "Active" : "Idle"} />
                  </div>
                  <p className="text-[10px] text-robur-steel truncate">{v.type} · {v.driver}</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-robur-light" />
              </div>
            </button>
          ))
        )}
      </div>
    </GlassCard>
  );
}
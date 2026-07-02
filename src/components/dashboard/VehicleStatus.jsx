import GlassCard from "@/components/ui/GlassCard";
import StatusDot from "@/components/ui/StatusDot";
import { Truck, Fuel, Gauge } from "lucide-react";

export default function VehicleStatus() {
  return (
    <GlassCard level={2} hover className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Your Vehicle</h3>
        <StatusDot status="active" label="Active" />
      </div>

      <div className="flex items-center gap-4 mb-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-robur-charcoal/5">
          <Truck className="h-7 w-7 text-robur-charcoal" strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-semibold text-robur-charcoal tracking-tight">ROB-142</p>
          <p className="text-xs text-robur-steel">Scania P410 · Hook Lift</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-robur-charcoal/[0.03] p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Fuel className="h-3.5 w-3.5 text-robur-steel" strokeWidth={1.5} />
            <span className="text-[10px] font-medium text-robur-steel">Fuel</span>
          </div>
          <p className="text-lg font-bold text-robur-charcoal">72%</p>
          <div className="mt-1.5 h-1 rounded-full bg-robur-light/40 overflow-hidden">
            <div className="h-full w-[72%] rounded-full bg-robur-yellow" />
          </div>
        </div>
        <div className="rounded-xl bg-robur-charcoal/[0.03] p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Gauge className="h-3.5 w-3.5 text-robur-steel" strokeWidth={1.5} />
            <span className="text-[10px] font-medium text-robur-steel">Odometer</span>
          </div>
          <p className="text-lg font-bold text-robur-charcoal">142,830</p>
          <p className="text-[10px] text-robur-steel mt-0.5">km total</p>
        </div>
      </div>
    </GlassCard>
  );
}
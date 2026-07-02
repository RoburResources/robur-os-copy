import GlassCard from "@/components/ui/GlassCard";
import { AlertCircle, Clock, Wrench, ShieldCheck, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

const reminders = [
  { label: "Next Service", value: "Jul 15", flag: "DUE SOON", icon: Wrench },
  { label: "RUC / Inspection", value: "Aug 2", flag: "UPCOMING", icon: ShieldCheck },
  { label: "Grease Check", value: "Jul 28", flag: "UPCOMING", icon: Clock },
  { label: "Fire Extinguisher Check", value: "Sep 1", flag: "UPCOMING", icon: Flame },
];

export default function ServiceReminders({ vehicle }) {
  return (
    <GlassCard level={2} className="p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel mb-4">Service Reminders</h3>
      <div className="space-y-2">
        {reminders.map((r) => (
          <div key={r.label} className="flex items-center gap-3 rounded-xl bg-robur-charcoal/[0.03] p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/60">
              <r.icon className="h-4 w-4 text-robur-steel" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-robur-charcoal">{r.label}</p>
              <p className="text-[10px] text-robur-steel">{r.value}</p>
            </div>
            <span className={cn(
              "rounded-md px-2 py-0.5 text-[9px] font-bold",
              r.flag === "DUE SOON" ? "bg-robur-yellow/10 text-robur-yellow" : "bg-robur-charcoal/5 text-robur-steel"
            )}>
              {r.flag}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
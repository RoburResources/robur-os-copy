import GlassCard from "./GlassCard";
import { cn } from "@/lib/utils";

export default function MetricCard({ label, value, change, changeType = "up", icon: Icon, className }) {
  return (
    <GlassCard level={2} hover className={cn("p-5 h-full", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-robur-steel">{label}</p>
          <p className="text-2xl font-bold tracking-tight text-robur-charcoal">{value}</p>
          {change && (
            <span className={cn(
              "text-xs font-medium",
              changeType === "up" ? "text-emerald-500" : "text-red-400"
            )}>
              {changeType === "up" ? "↑" : "↓"} {change}
            </span>
          )}
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-robur-charcoal/5">
            <Icon className="h-5 w-5 text-robur-steel" strokeWidth={1.5} />
          </div>
        )}
      </div>
    </GlassCard>
  );
}
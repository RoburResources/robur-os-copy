import GlassCard from "@/components/ui/GlassCard";
import { AlertTriangle, Info, CheckCircle2, X } from "lucide-react";

const alerts = [
  { type: "warning", title: "ROB-142 Overdue Service", text: "Service due 3 days ago. Schedule immediately.", time: "12 min ago" },
  { type: "critical", title: "Geelong Rd Closure", text: "Road closed 6:00–18:00. Rerouting affected jobs.", time: "45 min ago" },
  { type: "info", title: "New Job Assigned", text: "JOB-2845 added for tomorrow. Hansen Yuncken CBD.", time: "1h ago" },
  { type: "success", title: "JOB-2839 Completed", text: "Bin exchange at Visy Recycling signed off.", time: "2h ago" },
];

const alertConfig = {
  warning: { icon: AlertTriangle, color: "text-robur-yellow", bg: "bg-robur-yellow/10", border: "border-robur-yellow/20" },
  critical: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50", border: "border-red-200" },
  info: { icon: Info, color: "text-robur-steel", bg: "bg-robur-charcoal/5", border: "border-robur-charcoal/10" },
  success: { icon: CheckCircle2, color: "text-robur-yellow", bg: "bg-robur-yellow/10", border: "border-robur-yellow/20" },
};

export default function AlertsPanel() {
  return (
    <GlassCard level={2} className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Alerts</h3>
        <span className="text-xs font-medium text-red-500">2 critical</span>
      </div>

      <div className="space-y-2">
        {alerts.map((alert, i) => {
          const config = alertConfig[alert.type];
          const Icon = config.icon;
          return (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-xl border ${config.border} ${config.bg} p-3`}
            >
              <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${config.color}`} strokeWidth={1.5} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-robur-charcoal">{alert.title}</p>
                <p className="text-[10px] text-robur-steel mt-0.5">{alert.text}</p>
                <span className="text-[10px] text-robur-steel/40 mt-1 block">{alert.time}</span>
              </div>
              <button className="shrink-0 rounded-md p-1 hover:bg-white/50 transition-colors">
                <X className="h-3 w-3 text-robur-steel/30" />
              </button>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
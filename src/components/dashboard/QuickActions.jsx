import GlassCard from "@/components/ui/GlassCard";
import { Camera, AlertTriangle, CheckSquare, Phone, FileText, Navigation } from "lucide-react";

const actions = [
  { label: "Pre-Start", icon: CheckSquare, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Report Issue", icon: AlertTriangle, color: "text-robur-yellow", bg: "bg-amber-50" },
  { label: "Photo Log", icon: Camera, color: "text-robur-steel", bg: "bg-slate-50" },
  { label: "Navigate", icon: Navigation, color: "text-sky-500", bg: "bg-sky-50" },
  { label: "Call Depot", icon: Phone, color: "text-robur-charcoal", bg: "bg-slate-50" },
  { label: "Docket", icon: FileText, color: "text-violet-500", bg: "bg-violet-50" },
];

export default function QuickActions() {
  return (
    <GlassCard level={1} className="p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel mb-4">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-2 rounded-xl p-3 hover:bg-robur-charcoal/[0.03] active:scale-95 transition-all"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.bg}`}>
              <action.icon className={`h-5 w-5 ${action.color}`} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-medium text-robur-steel">{action.label}</span>
          </button>
        ))}
      </div>
    </GlassCard>
  );
}
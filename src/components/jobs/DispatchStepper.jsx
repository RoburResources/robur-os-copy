import GlassCard from "@/components/ui/GlassCard";
import { Check, Truck, MapPin, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { key: "created", label: "Create" },
  { key: "scheduled", label: "Schedule" },
  { key: "assigned", label: "Assign" },
  { key: "dispatched", label: "Dispatch" },
  { key: "en_route", label: "En Route" },
  { key: "completed", label: "Complete" },
];

export default function DispatchStepper({ job, onAdvance }) {
  const currentIndex = steps.findIndex((s) => s.key === job?.status);

  return (
    <GlassCard level={2} className="p-5">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel mb-4">Schedule & Dispatch</h3>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, i) => {
          const isComplete = i < currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div key={step.key} className="flex flex-col items-center relative flex-1">
              {i > 0 && (
                <div className={cn("absolute right-1/2 top-3 h-px w-full", isComplete ? "bg-emerald-400" : "bg-robur-light/30")} />
              )}
              <div
                className={cn(
                  "relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-all",
                  isComplete
                    ? "bg-emerald-400 text-white"
                    : isCurrent
                    ? "bg-robur-yellow text-robur-charcoal ring-4 ring-robur-yellow/20"
                    : "bg-robur-charcoal/5 text-robur-steel"
                )}
              >
                {isComplete ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </div>
              <span className={cn("text-[9px] font-medium mt-1.5 text-center", isComplete || isCurrent ? "text-robur-charcoal" : "text-robur-steel/50")}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Assigned Assets & Route */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-robur-charcoal/[0.03] p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Truck className="h-3.5 w-3.5 text-robur-steel/50" strokeWidth={1.5} />
            <span className="text-[10px] font-medium uppercase tracking-wide text-robur-steel">Assigned Asset</span>
          </div>
          <p className="text-sm font-bold text-robur-charcoal">{job?.vehicle_id || "Unassigned"}</p>
          {job?.vehicle_id && <p className="text-[10px] text-robur-steel mt-0.5">En route to site</p>}
        </div>
        <div className="rounded-xl bg-robur-charcoal/[0.03] p-3">
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin className="h-3.5 w-3.5 text-robur-steel/50" strokeWidth={1.5} />
            <span className="text-[10px] font-medium uppercase tracking-wide text-robur-steel">Route Stop</span>
          </div>
          <p className="text-sm font-bold text-robur-charcoal">Stop 1 / 1</p>
          <p className="text-[10px] text-robur-steel mt-0.5 truncate">{job?.site_address}</p>
        </div>
      </div>

      {job?.status !== "completed" && (
        <button
          onClick={() => onAdvance(job)}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-robur-charcoal py-2.5 text-xs font-semibold text-white hover:bg-robur-charcoal/90 transition-colors"
        >
          <Send className="h-3.5 w-3.5" strokeWidth={2} />
          Dispatch Job
        </button>
      )}
    </GlassCard>
  );
}
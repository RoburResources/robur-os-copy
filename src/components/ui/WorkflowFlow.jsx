import GlassCard from "@/components/ui/GlassCard";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WorkflowFlow({ steps, currentStep = 0 }) {
  return (
    <GlassCard level={2} className="p-4 mb-6">
      <div className="flex items-center justify-between gap-1 overflow-x-auto">
        {steps.map((step, i) => {
          const isComplete = i < currentStep;
          const isCurrent = i === currentStep;
          return (
            <div key={step} className="flex items-center gap-1 shrink-0">
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-all",
                  isComplete ? "bg-emerald-400 text-white"
                  : isCurrent ? "bg-robur-yellow text-robur-charcoal ring-4 ring-robur-yellow/20"
                  : "bg-robur-charcoal/5 text-robur-steel"
                )}>
                  {isComplete ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </div>
                <span className={cn(
                  "text-[10px] font-medium whitespace-nowrap",
                  isComplete || isCurrent ? "text-robur-charcoal" : "text-robur-steel/50"
                )}>
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 text-robur-light shrink-0 mx-0.5" />
              )}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { num: 1, label: "Select Service" },
  { num: 2, label: "Choose Action" },
  { num: 3, label: "Select Location" },
  { num: 4, label: "Complete Booking" },
];

export default function BookingStepper({ currentStep }) {
  return (
    <div className="flex items-center gap-1">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold transition-all",
                step.num < currentStep
                  ? "bg-emerald-400 text-white"
                  : step.num === currentStep
                  ? "bg-robur-yellow text-robur-charcoal"
                  : "bg-robur-charcoal/5 text-robur-steel"
              )}
            >
              {step.num < currentStep ? (
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              ) : (
                step.num
              )}
            </div>
            <span
              className={cn(
                "text-xs font-medium hidden sm:inline",
                step.num <= currentStep
                  ? "text-robur-charcoal"
                  : "text-robur-steel/60"
              )}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "h-px w-6 sm:w-10 mx-1",
                step.num < currentStep
                  ? "bg-emerald-400"
                  : "bg-robur-charcoal/10"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
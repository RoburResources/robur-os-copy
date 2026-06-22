import { cn } from "@/lib/utils";

const variants = {
  active: "bg-emerald-400 status-active",
  warning: "bg-robur-yellow status-warning",
  critical: "bg-red-400 status-critical",
  idle: "bg-robur-light",
};

export default function StatusDot({ status = "active", size = "sm", label }) {
  const sizes = { xs: "w-1.5 h-1.5", sm: "w-2 h-2", md: "w-2.5 h-2.5", lg: "w-3 h-3" };

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn("rounded-full animate-pulse-soft", sizes[size], variants[status])} />
      {label && <span className="text-xs font-medium text-robur-steel">{label}</span>}
    </span>
  );
}
import { Search, Bell, ChevronDown } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function TopBar({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-robur-charcoal">{title}</h1>
        {subtitle && <p className="text-sm text-robur-steel mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <GlassCard level={2} className="flex items-center gap-2 px-3.5 py-2 cursor-pointer hover:bg-white/90 transition-colors">
          <Search className="h-4 w-4 text-robur-steel" strokeWidth={1.5} />
          <span className="text-sm text-robur-steel/60 hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline-flex h-5 items-center rounded bg-robur-charcoal/5 px-1.5 text-[10px] font-medium text-robur-steel">
            ⌘K
          </kbd>
        </GlassCard>

        {/* Notifications */}
        <GlassCard level={2} className="relative flex h-9 w-9 items-center justify-center cursor-pointer hover:bg-white/90 transition-colors">
          <Bell className="h-4 w-4 text-robur-steel" strokeWidth={1.5} />
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-robur-yellow text-[8px] font-bold text-robur-charcoal">
            3
          </span>
        </GlassCard>

        {/* Avatar */}
        <GlassCard level={2} className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-white/90 transition-colors">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-robur-charcoal">
            <span className="text-xs font-semibold text-white">JD</span>
          </div>
          <ChevronDown className="h-3 w-3 text-robur-steel" />
        </GlassCard>
      </div>
    </div>
  );
}
import GlassCard from "@/components/ui/GlassCard";
import {
  Sparkles,
  Search,
  X,
  Crosshair,
  Info,
  ArrowRight,
} from "lucide-react";

export default function LocationPanel({
  address,
  onAddressChange,
  onSearchAddress,
  onUseCurrentLocation,
  notes,
  onNotesChange,
  onContinue,
  searching,
}) {
  return (
    <GlassCard level={3} className="p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-robur-yellow/15">
          <Sparkles className="h-3.5 w-3.5 text-robur-yellow" />
        </div>
        <h3 className="text-sm font-semibold text-robur-charcoal">New Bin</h3>
      </div>

      <label className="text-[11px] font-medium text-robur-steel mb-1.5">
        Site address
      </label>
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-robur-steel/50" />
        <input
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearchAddress()}
          placeholder="Enter site address"
          className="w-full rounded-xl border border-robur-light/30 bg-white/60 pl-9 pr-9 py-2.5 text-sm text-robur-charcoal placeholder:text-robur-steel/40 focus:outline-none focus:ring-2 focus:ring-robur-yellow/30 focus:border-transparent"
        />
        {address && (
          <button
            onClick={() => onAddressChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-robur-steel hover:text-robur-charcoal"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <button
        onClick={onUseCurrentLocation}
        className="flex items-center gap-2 text-xs font-medium text-robur-steel hover:text-robur-charcoal mb-4 transition-colors"
      >
        <Crosshair className="h-3.5 w-3.5" /> Use current location
      </button>

      <div className="flex items-start gap-2 p-3 rounded-xl bg-robur-charcoal/[0.03] mb-4">
        <Info className="h-3.5 w-3.5 text-robur-steel mt-0.5 shrink-0" />
        <p className="text-[11px] text-robur-steel leading-relaxed">
          Place the bin on a flat, accessible area. Avoid drains, slopes or
          overhead obstructions.
        </p>
      </div>

      <label className="text-[11px] font-medium text-robur-steel mb-1.5">
        Placement notes (optional)
      </label>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="e.g. Please place near the driveway entrance."
        rows={3}
        className="w-full rounded-xl border border-robur-light/30 bg-white/60 px-3 py-2.5 text-sm text-robur-charcoal placeholder:text-robur-steel/40 focus:outline-none focus:ring-2 focus:ring-robur-yellow/30 focus:border-transparent mb-5 resize-none"
      />

      <button
        onClick={onContinue}
        disabled={!address}
        className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-robur-yellow py-3 text-sm font-semibold text-robur-charcoal transition-all hover:bg-robur-yellow/90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {searching ? "Searching..." : "Continue"}
        <ArrowRight className="h-4 w-4" />
      </button>
    </GlassCard>
  );
}
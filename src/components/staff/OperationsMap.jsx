import GlassCard from "@/components/ui/GlassCard";
import { Maximize2, Layers, Navigation } from "lucide-react";

export default function OperationsMap() {
  return (
    <GlassCard level={1} className="relative overflow-hidden" style={{ height: "320px" }}>
      {/* Map placeholder - greyscale satellite style */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200&q=80"
          alt="Satellite map view"
          className="w-full h-full object-cover grayscale brightness-110 contrast-95"
        />
        {/* Map overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
      </div>

      {/* Floating glass controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <GlassCard level={3} className="px-3 py-1.5">
          <span className="text-[10px] font-semibold text-robur-charcoal uppercase tracking-wider">Live Fleet Map</span>
        </GlassCard>
        <div className="flex gap-1.5">
          <GlassCard level={3} className="flex h-7 w-7 items-center justify-center cursor-pointer hover:bg-white transition-colors">
            <Layers className="h-3.5 w-3.5 text-robur-steel" strokeWidth={1.5} />
          </GlassCard>
          <GlassCard level={3} className="flex h-7 w-7 items-center justify-center cursor-pointer hover:bg-white transition-colors">
            <Maximize2 className="h-3.5 w-3.5 text-robur-steel" strokeWidth={1.5} />
          </GlassCard>
        </div>
      </div>

      {/* Vehicle markers */}
      <div className="absolute top-1/3 left-1/4">
        <div className="relative">
          <div className="h-6 w-6 rounded-full bg-robur-yellow flex items-center justify-center shadow-lg glow-yellow">
            <Navigation className="h-3 w-3 text-robur-charcoal" strokeWidth={2} />
          </div>
          <GlassCard level={3} className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5">
            <span className="text-[8px] font-bold text-robur-charcoal">ROB-101</span>
          </GlassCard>
        </div>
      </div>
      <div className="absolute top-1/2 right-1/3">
        <div className="h-6 w-6 rounded-full bg-robur-yellow flex items-center justify-center shadow-lg glow-yellow">
          <Navigation className="h-3 w-3 text-robur-charcoal" strokeWidth={2} />
        </div>
      </div>
      <div className="absolute bottom-1/3 left-1/2">
        <div className="h-6 w-6 rounded-full bg-robur-steel flex items-center justify-center shadow-lg">
          <Navigation className="h-3 w-3 text-white" strokeWidth={2} />
        </div>
      </div>

      {/* Bottom stats */}
      <div className="absolute bottom-3 left-3 right-3 flex gap-2">
        <GlassCard level={3} className="flex-1 px-3 py-2 text-center">
          <p className="text-lg font-bold text-robur-charcoal">5</p>
          <p className="text-[9px] text-robur-steel">On Road</p>
        </GlassCard>
        <GlassCard level={3} className="flex-1 px-3 py-2 text-center">
          <p className="text-lg font-bold text-robur-charcoal">1</p>
          <p className="text-[9px] text-robur-steel">At Depot</p>
        </GlassCard>
        <GlassCard level={3} className="flex-1 px-3 py-2 text-center">
          <p className="text-lg font-bold text-robur-charcoal">1</p>
          <p className="text-[9px] text-red-500">Maint.</p>
        </GlassCard>
      </div>
    </GlassCard>
  );
}
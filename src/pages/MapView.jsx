import TopBar from "@/components/layout/TopBar";
import GlassCard from "@/components/ui/GlassCard";
import StatusDot from "@/components/ui/StatusDot";
import { motion } from "framer-motion";
import { Maximize2, Layers, Navigation, Truck, ChevronRight } from "lucide-react";

const vehicles = [
  { id: "ROB-101", driver: "James D.", location: "Tottenham", status: "active", top: "28%", left: "35%" },
  { id: "ROB-108", driver: "Mark S.", location: "Wyndham", status: "active", top: "55%", left: "22%" },
  { id: "ROB-115", driver: "Sarah L.", location: "CBD", status: "warning", top: "40%", left: "55%" },
  { id: "ROB-130", driver: "David W.", location: "Sunshine", status: "active", top: "35%", left: "42%" },
  { id: "ROB-122", driver: "Tom R.", location: "Laverton Depot", status: "idle", top: "60%", left: "30%" },
];

export default function MapView() {
  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Live Map" subtitle="Real-time fleet tracking" />

      <div className="grid grid-cols-12 gap-5">
        {/* Map */}
        <motion.div
          className="col-span-12 lg:col-span-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard level={1} className="relative overflow-hidden" style={{ height: "calc(100vh - 180px)" }}>
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1400&q=80"
                alt="Satellite map"
                className="w-full h-full object-cover grayscale brightness-110 contrast-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
            </div>

            {/* Floating controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <GlassCard level={3} className="px-3 py-1.5">
                <span className="text-[10px] font-semibold text-robur-charcoal uppercase tracking-wider">Melbourne Metro</span>
              </GlassCard>
              <div className="flex gap-1.5">
                <GlassCard level={3} className="flex h-8 w-8 items-center justify-center cursor-pointer hover:bg-white transition-colors">
                  <Layers className="h-4 w-4 text-robur-steel" strokeWidth={1.5} />
                </GlassCard>
                <GlassCard level={3} className="flex h-8 w-8 items-center justify-center cursor-pointer hover:bg-white transition-colors">
                  <Maximize2 className="h-4 w-4 text-robur-steel" strokeWidth={1.5} />
                </GlassCard>
              </div>
            </div>

            {/* Vehicle markers */}
            {vehicles.map((v) => (
              <div key={v.id} className="absolute" style={{ top: v.top, left: v.left }}>
                <div className="relative group cursor-pointer">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center shadow-lg ${
                    v.status === "active" ? "bg-robur-yellow glow-yellow" : v.status === "warning" ? "bg-amber-400" : "bg-robur-steel"
                  }`}>
                    <Navigation className={`h-4 w-4 ${v.status === "idle" ? "text-white" : "text-robur-charcoal"}`} strokeWidth={2} />
                  </div>
                  <GlassCard level={4} className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] font-bold text-robur-charcoal">{v.id} · {v.driver}</span>
                  </GlassCard>
                </div>
              </div>
            ))}
          </GlassCard>
        </motion.div>

        {/* Vehicle List */}
        <motion.div
          className="col-span-12 lg:col-span-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard level={2} className="p-5" style={{ height: "calc(100vh - 180px)", overflowY: "auto" }}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel mb-4">Vehicles</h3>
            <div className="space-y-2">
              {vehicles.map((v) => (
                <div key={v.id} className="group flex items-center gap-3 rounded-xl p-3 hover:bg-robur-charcoal/[0.03] transition-colors cursor-pointer">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-robur-charcoal/5">
                    <Truck className="h-5 w-5 text-robur-charcoal" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-robur-charcoal">{v.id}</span>
                      <StatusDot status={v.status} size="xs" />
                    </div>
                    <p className="text-[10px] text-robur-steel">{v.driver} · {v.location}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-robur-light opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
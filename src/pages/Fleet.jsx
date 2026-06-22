import TopBar from "@/components/layout/TopBar";
import GlassCard from "@/components/ui/GlassCard";
import MetricCard from "@/components/ui/MetricCard";
import StatusDot from "@/components/ui/StatusDot";
import { motion } from "framer-motion";
import { Truck, Fuel, Wrench, CheckCircle2, ChevronRight, Gauge, Calendar } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const fleet = [
  { id: "ROB-101", type: "Scania P410", category: "Hook Lift", driver: "James D.", status: "active", fuel: 72, odo: "142,830", nextService: "Jul 15", rego: "BX-42-YR" },
  { id: "ROB-108", type: "Volvo FH16", category: "Tipper", driver: "Mark S.", status: "active", fuel: 58, odo: "98,420", nextService: "Jul 2", rego: "CR-18-PQ" },
  { id: "ROB-115", type: "Scania G410", category: "Hook Lift", driver: "Sarah L.", status: "warning", fuel: 34, odo: "165,210", nextService: "Jun 28", rego: "DL-55-MN" },
  { id: "ROB-122", type: "Kenworth T410", category: "Prime Mover", driver: "Tom R.", status: "idle", fuel: 90, odo: "78,640", nextService: "Aug 1", rego: "EF-33-KL" },
  { id: "ROB-130", type: "Isuzu FVZ", category: "Tipper", driver: "David W.", status: "active", fuel: 65, odo: "112,890", nextService: "Jul 20", rego: "GH-77-ST" },
  { id: "ROB-142", type: "Scania P410", category: "Hook Lift", driver: "Chris M.", status: "critical", fuel: 45, odo: "198,320", nextService: "Overdue", rego: "JK-91-UV" },
  { id: "ROB-155", type: "Volvo FM", category: "Side Loader", driver: "Unassigned", status: "idle", fuel: 82, odo: "55,120", nextService: "Sep 5", rego: "LM-12-WX" },
];

const fuelColor = (pct) => {
  if (pct > 60) return "bg-emerald-400";
  if (pct > 30) return "bg-robur-yellow";
  return "bg-red-400";
};

export default function Fleet() {
  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Fleet Management" subtitle="7 vehicles · 5 active today" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div {...fadeIn} transition={{ delay: 0 }}>
          <MetricCard label="Total Fleet" value="7" icon={Truck} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.05 }}>
          <MetricCard label="On Road" value="5" change="71% utilisation" changeType="up" icon={CheckCircle2} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <MetricCard label="Avg Fuel" value="63%" icon={Fuel} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
          <MetricCard label="Maintenance" value="1" change="1 overdue" changeType="down" icon={Wrench} />
        </motion.div>
      </div>

      <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
        <GlassCard level={2} className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-robur-light/30">
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Vehicle</th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Driver</th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Status</th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Fuel</th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Odometer</th>
                  <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Next Service</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {fleet.map((v) => (
                  <tr key={v.id} className="border-b border-robur-light/15 hover:bg-robur-charcoal/[0.02] transition-colors cursor-pointer group">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-robur-charcoal/5">
                          <Truck className="h-4 w-4 text-robur-charcoal" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-robur-charcoal">{v.id}</p>
                          <p className="text-[10px] text-robur-steel">{v.type} · {v.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-robur-charcoal">{v.driver}</td>
                    <td className="px-5 py-4">
                      <StatusDot
                        status={v.status}
                        size="sm"
                        label={v.status === "active" ? "Active" : v.status === "idle" ? "Idle" : v.status === "warning" ? "Low Fuel" : "Maintenance"}
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-robur-light/30 overflow-hidden">
                          <div className={`h-full rounded-full ${fuelColor(v.fuel)}`} style={{ width: `${v.fuel}%` }} />
                        </div>
                        <span className="text-[10px] font-medium text-robur-steel">{v.fuel}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Gauge className="h-3 w-3 text-robur-steel/40" strokeWidth={1.5} />
                        <span className="text-xs text-robur-charcoal">{v.odo} km</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-robur-steel/40" strokeWidth={1.5} />
                        <span className={`text-xs ${v.nextService === "Overdue" ? "font-semibold text-red-400" : "text-robur-charcoal"}`}>
                          {v.nextService}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <ChevronRight className="h-4 w-4 text-robur-light opacity-0 group-hover:opacity-100 transition-opacity" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
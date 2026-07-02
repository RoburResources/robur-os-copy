import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import GlassCard from "@/components/ui/GlassCard";
import WorkflowFlow from "@/components/ui/WorkflowFlow";
import { motion } from "framer-motion";
import { Truck, MapPin, Clock, User, Navigation, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

const flowSteps = ["Job Received", "Pre-Start", "En Route", "On Site", "Complete", "End"];

const movements = [
  { id: "DMT-1024", driver: "Sarah L.", vehicle: "Truck 03", job: "JOB-1024", site: "12 Hammersley Rd, Tottenham", stage: 2, eta: "8 min", contact: "0412 345 678" },
  { id: "DMT-1025", driver: "James D.", vehicle: "Truck 01", job: "JOB-1025", site: "55 Sunshine Rd, Sunshine", stage: 3, eta: "On site", contact: "0422 111 222" },
  { id: "DMT-1026", driver: "Mark S.", vehicle: "Truck 02", job: "JOB-1026", site: "200 Collins St, Melbourne", stage: 0, eta: "—", contact: "0433 555 666" },
  { id: "DMT-1027", driver: "Tom R.", vehicle: "Truck 04", job: "JOB-1027", site: "Wyndham Transfer Station", stage: 1, eta: "—", contact: "0444 777 888" },
  { id: "DMT-1023", driver: "Sarah L.", vehicle: "Truck 03", job: "JOB-1023", site: "Altona Industrial Park", stage: 4, eta: "Done", contact: "0455 999 000" },
];

export default function DMTWorkflow() {
  const [selected, setSelected] = useState(movements[0]);

  const advance = () => {
    if (selected.stage >= flowSteps.length - 1) return;
    const updated = { ...selected, stage: selected.stage + 1, eta: selected.stage + 1 === 4 ? "Done" : "Updated" };
    setSelected(updated);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="DMT Workflow" subtitle="Driver Management · Movement Ticket Sequence" />
      <WorkflowFlow steps={flowSteps} currentStep={selected.stage} />

      <div className="grid grid-cols-12 gap-4" style={{ minHeight: "calc(100vh - 340px)" }}>
        {/* Movement List */}
        <motion.div className="col-span-12 lg:col-span-4" {...fadeIn}>
          <GlassCard level={2} className="p-4 h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Active Movements</h3>
              <span className="text-[10px] text-robur-steel/50">{movements.length} active</span>
            </div>
            <div className="space-y-1.5 overflow-y-auto" style={{ maxHeight: "calc(100vh - 420px)" }}>
              {movements.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className={cn(
                    "w-full text-left rounded-xl p-3 transition-all border",
                    selected.id === m.id
                      ? "bg-robur-yellow/10 border-robur-yellow/40"
                      : "bg-white/40 border-transparent hover:bg-robur-charcoal/[0.03] hover:border-robur-light/20"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-robur-charcoal">{m.id}</span>
                    <span className={cn(
                      "rounded-md px-1.5 py-0.5 text-[9px] font-semibold",
                      m.stage < 2 ? "bg-robur-charcoal/5 text-robur-steel"
                      : m.stage < 4 ? "bg-robur-yellow/20 text-robur-charcoal"
                      : "bg-robur-yellow/10 text-robur-yellow"
                    )}>
                      {flowSteps[m.stage]}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-robur-charcoal truncate">{m.driver} · {m.vehicle}</p>
                  <p className="text-[10px] text-robur-steel truncate">{m.site}</p>
                </button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Detail */}
        <motion.div className="col-span-12 lg:col-span-8" {...fadeIn} transition={{ delay: 0.05 }}>
          <GlassCard level={2} className="p-5 h-full">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-robur-charcoal">{selected.id}</span>
                  <span className="rounded-md bg-robur-yellow/20 px-2 py-0.5 text-[10px] font-semibold text-robur-charcoal">
                    Stage {selected.stage + 1} / {flowSteps.length}
                  </span>
                </div>
                <p className="text-xs text-robur-steel">{selected.job} · {selected.driver}</p>
              </div>
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-robur-yellow" strokeWidth={2} />
                <span className="text-xs font-semibold text-robur-charcoal">{selected.eta}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <DetailField icon={Truck} label="Vehicle" value={selected.vehicle} />
              <DetailField icon={User} label="Driver" value={selected.driver} />
              <DetailField icon={MapPin} label="Site" value={selected.site} />
              <DetailField icon={Clock} label="ETA" value={selected.eta} />
            </div>

            {/* Stage Progress */}
            <div className="rounded-xl bg-robur-charcoal/[0.03] p-4 mb-5">
              <p className="text-[10px] font-medium uppercase tracking-wide text-robur-steel mb-3">Stage Progress</p>
              <div className="flex items-center gap-1.5">
                {flowSteps.map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5 flex-1">
                    <div className={cn(
                      "h-1.5 flex-1 rounded-full transition-all",
                      i <= selected.stage ? "bg-robur-yellow" : "bg-robur-light/30"
                    )} />
                    {i === selected.stage && (
                      <span className="text-[9px] font-bold text-robur-charcoal whitespace-nowrap">{step}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {selected.stage < flowSteps.length - 1 && (
              <button
                onClick={advance}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-robur-yellow py-3 text-xs font-semibold text-robur-charcoal hover:bg-robur-yellow/90 transition-colors"
              >
                Advance to {flowSteps[selected.stage + 1]}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            )}
            {selected.stage >= flowSteps.length - 1 && (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-robur-yellow/10 py-3 text-xs font-semibold text-robur-yellow">
                <CheckCircle className="h-4 w-4" /> Workflow Complete
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

function DetailField({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-robur-charcoal/[0.03] p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3 w-3 text-robur-steel/50" strokeWidth={1.5} />
        <span className="text-[10px] font-medium uppercase tracking-wide text-robur-steel">{label}</span>
      </div>
      <p className="text-xs font-semibold text-robur-charcoal leading-snug">{value}</p>
    </div>
  );
}
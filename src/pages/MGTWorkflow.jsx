import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import GlassCard from "@/components/ui/GlassCard";
import WorkflowFlow from "@/components/ui/WorkflowFlow";
import { motion } from "framer-motion";
import { FileText, Clock, User, Check, X, ArrowRight, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

const flowSteps = ["Submit", "Review", "Approve", "Archive"];

const approvals = [
  { id: "MGT-1024", submitter: "Sarah L.", type: "Movement Goods Ticket", stage: 1, amount: "$2,340", details: "Soil removal · Tottenham site", docs: 3 },
  { id: "MGT-1025", submitter: "James D.", type: "Material Delivery", stage: 0, amount: "$1,890", details: "Concrete delivery · Collins St", docs: 2 },
  { id: "MGT-1026", submitter: "Operations", type: "Subcontractor Invoice", stage: 2, amount: "$5,600", details: "Excavation work · Altona", docs: 5 },
  { id: "MGT-1023", submitter: "Mark S.", type: "Tip Run Authorisation", stage: 3, amount: "$890", details: "Wyndham transfer station", docs: 2 },
];

export default function MGTWorkflow() {
  const [selected, setSelected] = useState(approvals[0]);
  const [items, setItems] = useState(approvals);

  const advance = () => {
    if (selected.stage >= flowSteps.length - 1) return;
    const updated = { ...selected, stage: selected.stage + 1 };
    setSelected(updated);
    setItems(items.map((i) => (i.id === selected.id ? updated : i)));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="MGT Workflow" subtitle="Management Approvals · Movement Goods Tickets" />
      <WorkflowFlow steps={flowSteps} currentStep={selected.stage} />

      <div className="grid grid-cols-12 gap-4" style={{ minHeight: "calc(100vh - 340px)" }}>
        {/* Pending Approvals List */}
        <motion.div className="col-span-12 lg:col-span-4" {...fadeIn}>
          <GlassCard level={2} className="p-4 h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Approval Queue</h3>
              <span className="text-[10px] text-robur-steel/50">{items.filter(i => i.stage < 3).length} pending</span>
            </div>
            <div className="space-y-1.5 overflow-y-auto" style={{ maxHeight: "calc(100vh - 420px)" }}>
              {items.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelected(a)}
                  className={cn(
                    "w-full text-left rounded-xl p-3 transition-all border",
                    selected.id === a.id
                      ? "bg-robur-yellow/10 border-robur-yellow/40"
                      : "bg-white/40 border-transparent hover:bg-robur-charcoal/[0.03] hover:border-robur-light/20"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-robur-charcoal">{a.id}</span>
                    <span className={cn(
                      "rounded-md px-1.5 py-0.5 text-[9px] font-semibold",
                      a.stage < 2 ? "bg-amber-50 text-amber-600"
                      : a.stage === 2 ? "bg-blue-50 text-blue-600"
                      : "bg-emerald-50 text-emerald-600"
                    )}>
                      {flowSteps[a.stage]}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-robur-charcoal truncate">{a.type}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] text-robur-steel">{a.submitter}</span>
                    <span className="text-[10px] font-semibold text-robur-charcoal">{a.amount}</span>
                  </div>
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
                <p className="text-xs text-robur-steel">{selected.type} · {selected.details}</p>
              </div>
              <span className="text-lg font-black text-robur-charcoal">{selected.amount}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <DetailField icon={User} label="Submitter" value={selected.submitter} />
              <DetailField icon={Clock} label="Stage" value={flowSteps[selected.stage]} />
              <DetailField icon={FileText} label="Documents" value={`${selected.docs} attached`} />
            </div>

            {/* Attached Documents */}
            <div className="rounded-xl bg-robur-charcoal/[0.03] p-4 mb-5">
              <p className="text-[10px] font-medium uppercase tracking-wide text-robur-steel mb-3">Attached Documents</p>
              <div className="space-y-2">
                {Array.from({ length: selected.docs }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-white/60 p-2">
                    <FileText className="h-3.5 w-3.5 text-robur-steel/50" strokeWidth={1.5} />
                    <span className="text-[11px] font-medium text-robur-charcoal">{selected.id}-DOC-{i + 1}</span>
                    <span className="ml-auto text-[9px] text-robur-steel">PDF</span>
                  </div>
                ))}
              </div>
            </div>

            {selected.stage < flowSteps.length - 1 ? (
              <div className="flex gap-3">
                <button
                  onClick={advance}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-robur-charcoal py-3 text-xs font-semibold text-white hover:bg-robur-charcoal/90 transition-colors"
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Approve & Advance
                </button>
                <button className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-xs font-semibold text-red-500 hover:bg-red-100 transition-colors">
                  <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Reject
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 py-3 text-xs font-semibold text-emerald-600">
                <FileCheck className="h-4 w-4" /> Archived · Workflow Complete
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
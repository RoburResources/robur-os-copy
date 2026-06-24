import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import GlassCard from "@/components/ui/GlassCard";
import WorkflowFlow from "@/components/ui/WorkflowFlow";
import { motion } from "framer-motion";
import { BarChart3, Database, FileText, Send, TrendingUp, CheckCircle, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

const flowSteps = ["Aggregate", "Analyse", "Report", "Distribute"];

const kpis = [
  { label: "Total Movements", value: "247", change: "↑ 12% vs last week" },
  { label: "Total Tonnage", value: "1,840 t", change: "↑ 8% vs last week" },
  { label: "Avg Turnaround", value: "38 min", change: "↓ 4 min faster" },
  { label: "Compliance Rate", value: "98.5%", change: "↑ 0.3pp" },
];

const insights = [
  { metric: "Peak Hour", value: "07:00–08:00", detail: "32% of movements", trend: "up" },
  { metric: "Top Material", value: "Mixed Soil", detail: "42% of tonnage", trend: "up" },
  { metric: "Top Site", value: "Tottenham", detail: "28% of movements", trend: "up" },
  { metric: "Anomalies", value: "2 flagged", detail: "Under-weight loads", trend: "down" },
];

const reports = [
  { name: "Weekly Operations Summary", date: "Jun 23, 2026", status: "ready" },
  { name: "Tonnage by Site Report", date: "Jun 22, 2026", status: "ready" },
  { name: "Driver Performance Report", date: "Jun 21, 2026", status: "ready" },
  { name: "Compliance & Audit Report", date: "Jun 20, 2026", status: "distributed" },
];

const tonnageData = [
  { day: "Mon", value: 285 },
  { day: "Tue", value: 320 },
  { day: "Wed", value: 295 },
  { day: "Thu", value: 340 },
  { day: "Fri", value: 310 },
  { day: "Sat", value: 190 },
  { day: "Sun", value: 100 },
];
const maxTonnage = Math.max(...tonnageData.map((d) => d.value));

export default function DSSWorkflow() {
  const [distributed, setDistributed] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="DSS Workflow" subtitle="Decision Support · Aggregate → Analyse → Report → Distribute" />
      <WorkflowFlow steps={flowSteps} currentStep={distributed ? 3 : 2} />

      {/* KPI Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => (
          <motion.div key={k.label} {...fadeIn} transition={{ delay: i * 0.05 }}>
            <GlassCard level={2} className="p-4">
              <p className="text-[10px] font-medium uppercase tracking-wide text-robur-steel">{k.label}</p>
              <p className="text-2xl font-black text-robur-charcoal mt-1">{k.value}</p>
              <p className="text-[10px] text-emerald-500 mt-1">{k.change}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Tonnage Chart */}
        <motion.div className="col-span-12 lg:col-span-7" {...fadeIn} transition={{ delay: 0.2 }}>
          <GlassCard level={2} className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-4 w-4 text-robur-yellow" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Weekly Tonnage Trend</h3>
            </div>
            <div className="flex items-end justify-between gap-2 h-40">
              {tonnageData.map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full flex items-end justify-center" style={{ height: "120px" }}>
                    <div
                      className="w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-robur-charcoal to-robur-charcoal/70 hover:from-robur-yellow hover:to-robur-yellow/70 transition-colors"
                      style={{ height: `${(d.value / maxTonnage) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-robur-steel">{d.day}</span>
                  <span className="text-[9px] font-bold text-robur-charcoal">{d.value}t</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Analysis Insights */}
        <motion.div className="col-span-12 lg:col-span-5" {...fadeIn} transition={{ delay: 0.25 }}>
          <GlassCard level={2} className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Database className="h-4 w-4 text-robur-yellow" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Analysis Insights</h3>
            </div>
            <div className="space-y-2">
              {insights.map((ins) => (
                <div key={ins.metric} className="flex items-center gap-3 rounded-xl bg-robur-charcoal/[0.03] p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/60">
                    <TrendingUp className={cn("h-4 w-4", ins.trend === "up" ? "text-emerald-500" : "text-red-400")} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-medium uppercase tracking-wide text-robur-steel">{ins.metric}</p>
                    <p className="text-xs font-bold text-robur-charcoal">{ins.value}</p>
                    <p className="text-[10px] text-robur-steel">{ins.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Generated Reports */}
        <motion.div className="col-span-12" {...fadeIn} transition={{ delay: 0.3 }}>
          <GlassCard level={2} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-robur-yellow" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Generated Reports</h3>
              </div>
              <button
                onClick={() => setDistributed(true)}
                disabled={distributed}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-bold transition-colors",
                  distributed
                    ? "bg-emerald-100 text-emerald-600 cursor-default"
                    : "bg-robur-yellow text-robur-charcoal hover:bg-robur-yellow/90"
                )}
              >
                {distributed ? <><CheckCircle className="h-3.5 w-3.5" /> Distributed</> : <><Send className="h-3.5 w-3.5" /> Distribute Pack</>}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {reports.map((r) => (
                <div key={r.name} className="flex items-center gap-3 rounded-xl bg-robur-charcoal/[0.03] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/60">
                    <FileText className="h-4 w-4 text-robur-charcoal" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-robur-charcoal truncate">{r.name}</p>
                    <p className="text-[10px] text-robur-steel">{r.date}</p>
                  </div>
                  {r.status === "distributed" ? (
                    <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">Sent</span>
                  ) : (
                    <button className="flex items-center gap-1 rounded-md bg-robur-charcoal/5 px-2 py-1 text-[9px] font-semibold text-robur-steel hover:bg-robur-charcoal/10 transition-colors">
                      <Download className="h-3 w-3" strokeWidth={2} /> PDF
                    </button>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
import TopBar from "@/components/layout/TopBar";
import MetricCard from "@/components/ui/MetricCard";
import GlassCard from "@/components/ui/GlassCard";
import RevenueChart from "@/components/finance/RevenueChart";
import VehicleStatusCard from "@/components/fleet/VehicleStatusCard";
import { motion } from "framer-motion";
import { DollarSign, Truck, Package, CheckCircle, ArrowRight, TrendingUp, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

const alerts = [
  { severity: "critical", message: "Truck 04 service overdue", time: "2h ago" },
  { severity: "warning", message: "3 invoices awaiting payment", time: "5h ago" },
  { severity: "info", message: "Job JOB-1024 completed", time: "1h ago" },
];

const activity = [
  { action: "Job Completed", detail: "JOB-1024 · Tottenham", time: "1h ago" },
  { action: "Vehicle Dispatched", detail: "Truck 03 to Sunshine", time: "2h ago" },
  { action: "Invoice Sent", detail: "INV-4471 to Cleanaway", time: "3h ago" },
  { action: "Docket Processed", detail: "WB-10247 validated", time: "4h ago" },
];

export default function ExecutiveDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Executive Dashboard" subtitle="Strategic overview · June 2026" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div {...fadeIn} transition={{ delay: 0 }}>
          <MetricCard label="Monthly Revenue" value="$392K" change="↑ 7.4% vs May" changeType="up" icon={DollarSign} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.05 }}>
          <MetricCard label="Fleet Utilisation" value="72%" change="↑ 5% vs last week" changeType="up" icon={Truck} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <MetricCard label="Active Jobs" value="18" change="3 ahead of schedule" changeType="up" icon={Package} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
          <MetricCard label="On-Time Rate" value="94%" change="↑ 2pp vs May" changeType="up" icon={CheckCircle} />
        </motion.div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <motion.div className="col-span-12 lg:col-span-8" {...fadeIn} transition={{ delay: 0.2 }}>
          <RevenueChart />
        </motion.div>

        <motion.div className="col-span-12 lg:col-span-4" {...fadeIn} transition={{ delay: 0.25 }}>
          <GlassCard level={2} className="p-5 h-full">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-4 w-4 text-robur-yellow" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Priority Alerts</h3>
            </div>
            <div className="space-y-3">
              {alerts.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={cn("mt-1 h-2 w-2 rounded-full shrink-0",
                    a.severity === "critical" ? "bg-red-400" : a.severity === "warning" ? "bg-robur-yellow" : "bg-blue-400"
                  )} />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-robur-charcoal">{a.message}</p>
                    <p className="text-[10px] text-robur-steel">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div className="col-span-12 lg:col-span-5" {...fadeIn} transition={{ delay: 0.3 }}>
          <VehicleStatusCard />
        </motion.div>

        <motion.div className="col-span-12 lg:col-span-7" {...fadeIn} transition={{ delay: 0.3 }}>
          <GlassCard level={2} className="p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {activity.map((a, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-robur-charcoal/[0.03] p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/60">
                    <TrendingUp className="h-4 w-4 text-robur-charcoal" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-robur-charcoal">{a.action}</p>
                    <p className="text-[10px] text-robur-steel">{a.detail}</p>
                  </div>
                  <span className="text-[10px] text-robur-steel/60">{a.time}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div className="col-span-12 lg:col-span-5" {...fadeIn} transition={{ delay: 0.35 }}>
          <GlassCard level={2} className="p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel mb-4">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Job Management", path: "/jobs", icon: Package },
                { label: "Fleet Status", path: "/fleet", icon: Truck },
                { label: "Payments", path: "/finance", icon: DollarSign },
                { label: "Documents", path: "/documents", icon: CheckCircle },
              ].map((q) => (
                <Link key={q.path} to={q.path} className="group rounded-xl bg-robur-charcoal/[0.03] p-4 hover:bg-robur-yellow/10 transition-colors">
                  <q.icon className="h-5 w-5 text-robur-charcoal mb-2" strokeWidth={1.5} />
                  <p className="text-xs font-semibold text-robur-charcoal">{q.label}</p>
                  <ArrowRight className="h-3 w-3 text-robur-steel mt-1 group-hover:text-robur-yellow transition-colors" />
                </Link>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
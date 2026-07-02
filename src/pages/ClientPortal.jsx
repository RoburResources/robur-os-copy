import TopBar from "@/components/layout/TopBar";
import GlassCard from "@/components/ui/GlassCard";
import MetricCard from "@/components/ui/MetricCard";
import StatusDot from "@/components/ui/StatusDot";
import { motion } from "framer-motion";
import { Package, FileText, Clock, CalendarDays, ChevronRight, MapPin, CheckCircle2 } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const upcomingJobs = [
  { date: "Mon, 23 Jun", type: "Bin Exchange", size: "30yd", location: "Tottenham Site", time: "7:00 – 9:00 AM" },
  { date: "Wed, 25 Jun", type: "Collection", size: "15yd", location: "Tottenham Site", time: "8:00 – 10:00 AM" },
  { date: "Fri, 27 Jun", type: "Bin Exchange", size: "30yd", location: "Tottenham Site", time: "7:00 – 9:00 AM" },
];

const serviceHistory = [
  { date: "Jun 20", type: "Bin Exchange", status: "active", ref: "JOB-2839", amount: "$450" },
  { date: "Jun 18", type: "Collection", status: "active", ref: "JOB-2831", amount: "$280" },
  { date: "Jun 15", type: "Tip Run", status: "active", ref: "JOB-2824", amount: "$620" },
  { date: "Jun 12", type: "Bin Exchange", status: "active", ref: "JOB-2818", amount: "$450" },
  { date: "Jun 10", type: "Collection", status: "active", ref: "JOB-2812", amount: "$280" },
];

const invoices = [
  { id: "INV-1284", amount: "$12,450", status: "Paid", date: "Jun 15", due: "Paid" },
  { id: "INV-1275", amount: "$8,900", status: "Pending", date: "Jun 1", due: "Due Jun 30" },
  { id: "INV-1268", amount: "$15,200", status: "Paid", date: "May 15", due: "Paid" },
];

const statusStyles = {
  Paid: "bg-robur-yellow/10 text-robur-yellow",
  Pending: "bg-robur-charcoal/5 text-robur-steel",
  Overdue: "bg-red-50 text-red-500",
};

export default function ClientPortal() {
  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Client Portal" subtitle="Metro Recycling Pty Ltd · Account overview" />

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div {...fadeIn} transition={{ delay: 0 }}>
          <MetricCard label="Active Collections" value="3" icon={Package} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.05 }}>
          <MetricCard label="This Month" value="$2,080" icon={FileText} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <MetricCard label="Next Service" value="Tomorrow" icon={CalendarDays} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
          <MetricCard label="Services YTD" value="42" icon={CheckCircle2} />
        </motion.div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Upcoming Jobs */}
        <motion.div className="col-span-12 lg:col-span-7" {...fadeIn} transition={{ delay: 0.2 }}>
          <GlassCard level={2} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Upcoming Services</h3>
              <span className="text-xs font-medium text-robur-yellow">{upcomingJobs.length} scheduled</span>
            </div>
            <div className="space-y-2">
              {upcomingJobs.map((job, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 rounded-xl border border-robur-light/30 p-3 hover:border-robur-yellow/30 transition-colors cursor-pointer"
                >
                  <div className="flex flex-col items-center rounded-lg bg-robur-charcoal px-3 py-2 text-center">
                    <span className="text-[10px] font-medium text-robur-light/60">{job.date.split(", ")[0]}</span>
                    <span className="text-lg font-bold text-white">{job.date.split(" ")[1]}</span>
                    <span className="text-[10px] text-robur-light/40">{job.date.split(" ")[2]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-robur-charcoal">{job.type} · {job.size}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-[10px] text-robur-steel/60">
                        <MapPin className="h-3 w-3" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-robur-steel/60">
                        <Clock className="h-3 w-3" /> {job.time}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-robur-light opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Invoices */}
        <motion.div className="col-span-12 lg:col-span-5" {...fadeIn} transition={{ delay: 0.25 }}>
          <GlassCard level={2} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Invoices</h3>
              <button className="text-xs font-medium text-robur-yellow hover:underline">View All</button>
            </div>
            <div className="space-y-2">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-center justify-between rounded-xl p-3 hover:bg-robur-charcoal/[0.03] transition-colors cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-robur-charcoal">{inv.id}</span>
                      <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${statusStyles[inv.status]}`}>
                        {inv.status}
                      </span>
                    </div>
                    <span className="text-[10px] text-robur-steel/50">{inv.due}</span>
                  </div>
                  <span className="text-sm font-bold text-robur-charcoal">{inv.amount}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Service History */}
        <motion.div className="col-span-12" {...fadeIn} transition={{ delay: 0.3 }}>
          <GlassCard level={2} className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Service History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-robur-light/30">
                    <th className="pb-2 pr-4 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Date</th>
                    <th className="pb-2 pr-4 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Reference</th>
                    <th className="pb-2 pr-4 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Service</th>
                    <th className="pb-2 pr-4 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Status</th>
                    <th className="pb-2 text-right text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceHistory.map((s, i) => (
                    <tr key={i} className="border-b border-robur-light/15 hover:bg-robur-charcoal/[0.02] transition-colors cursor-pointer">
                      <td className="py-3 pr-4 text-xs text-robur-steel">{s.date}</td>
                      <td className="py-3 pr-4 text-xs font-medium text-robur-charcoal">{s.ref}</td>
                      <td className="py-3 pr-4 text-xs text-robur-charcoal">{s.type}</td>
                      <td className="py-3 pr-4">
                        <StatusDot status={s.status} label="Complete" />
                      </td>
                      <td className="py-3 text-right text-xs font-semibold text-robur-charcoal">{s.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
import TopBar from "@/components/layout/TopBar";
import GlassCard from "@/components/ui/GlassCard";
import StatusDot from "@/components/ui/StatusDot";
import { motion } from "framer-motion";
import { Package, MapPin, Clock, User, ChevronRight, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const jobs = [
  { id: "JOB-2841", client: "Metro Recycling", type: "Bin Exchange", size: "30yd", location: "Tottenham", time: "7:15 AM", status: "active", driver: "James D.", priority: "High" },
  { id: "JOB-2842", client: "Cleanaway", type: "Collection", size: "15yd", location: "Sunshine", time: "9:00 AM", status: "active", driver: "Mark S.", priority: "Normal" },
  { id: "JOB-2843", client: "Hansen Yuncken", type: "Delivery", size: "30yd", location: "Melbourne CBD", time: "1:00 PM", status: "idle", driver: "Sarah L.", priority: "Normal" },
  { id: "JOB-2844", client: "Visy Recycling", type: "Tip Run", size: "20yd", location: "Wyndham", time: "11:30 AM", status: "active", driver: "Tom R.", priority: "High" },
  { id: "JOB-2845", client: "Boral Resources", type: "Bin Exchange", size: "30yd", location: "Altona", time: "2:30 PM", status: "idle", driver: "David W.", priority: "Normal" },
  { id: "JOB-2846", client: "SUEZ", type: "Collection", size: "10yd", location: "Footscray", time: "3:00 PM", status: "idle", driver: "Unassigned", priority: "Low" },
];

const priorityColors = {
  High: "bg-red-50 text-red-500",
  Normal: "bg-robur-charcoal/5 text-robur-steel",
  Low: "bg-slate-50 text-robur-steel/60",
};

export default function Jobs() {
  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Job Board" subtitle="Today · 6 jobs scheduled" />

      {/* Filters */}
      <motion.div {...fadeIn} transition={{ delay: 0 }} className="flex items-center gap-3 mb-6">
        <GlassCard level={2} className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-white/90 transition-colors">
          <Filter className="h-3.5 w-3.5 text-robur-steel" strokeWidth={1.5} />
          <span className="text-xs font-medium text-robur-steel">All Jobs</span>
        </GlassCard>
        <GlassCard level={1} className="px-3 py-2 cursor-pointer hover:bg-white/90 transition-colors">
          <span className="text-xs font-medium text-robur-steel/60">Active</span>
        </GlassCard>
        <GlassCard level={1} className="px-3 py-2 cursor-pointer hover:bg-white/90 transition-colors">
          <span className="text-xs font-medium text-robur-steel/60">Pending</span>
        </GlassCard>
        <GlassCard level={1} className="px-3 py-2 cursor-pointer hover:bg-white/90 transition-colors">
          <span className="text-xs font-medium text-robur-steel/60">Completed</span>
        </GlassCard>
        <div className="flex-1" />
        <Button className="bg-robur-yellow text-robur-charcoal hover:bg-robur-yellow/90 font-semibold text-xs gap-1.5 rounded-xl shadow-none h-9">
          <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          New Job
        </Button>
      </motion.div>

      {/* Job Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job, i) => (
          <motion.div key={job.id} {...fadeIn} transition={{ delay: 0.05 + i * 0.03 }}>
            <GlassCard level={2} hover className="p-4 cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-robur-charcoal">{job.id}</span>
                  <StatusDot status={job.status} size="xs" />
                </div>
                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${priorityColors[job.priority]}`}>
                  {job.priority}
                </span>
              </div>

              <p className="text-sm font-semibold text-robur-charcoal mb-1">{job.client}</p>
              <span className="inline-block rounded-md bg-robur-charcoal/5 px-2 py-0.5 text-[10px] font-medium text-robur-steel mb-3">
                {job.type} · {job.size}
              </span>

              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-robur-steel/40" strokeWidth={1.5} />
                  <span className="text-[10px] text-robur-steel">{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3 text-robur-steel/40" strokeWidth={1.5} />
                  <span className="text-[10px] text-robur-steel">{job.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="h-3 w-3 text-robur-steel/40" strokeWidth={1.5} />
                  <span className="text-[10px] text-robur-steel">{job.driver}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-robur-light/20 flex items-center justify-end">
                <ChevronRight className="h-4 w-4 text-robur-light opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
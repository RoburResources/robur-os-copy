import GlassCard from "@/components/ui/GlassCard";
import StatusDot from "@/components/ui/StatusDot";
import { Package, Clock, MapPin, ChevronRight } from "lucide-react";

const jobs = [
  { id: "JOB-2841", client: "Metro Recycling", type: "Bin Exchange", size: "30yd", location: "Tottenham", eta: "7:15 AM", status: "active", driver: "James D." },
  { id: "JOB-2842", client: "Cleanaway", type: "Collection", size: "15yd", location: "Sunshine", eta: "9:00 AM", status: "active", driver: "Mark S." },
  { id: "JOB-2843", client: "Hansen Yuncken", type: "Delivery", size: "30yd", location: "Melbourne CBD", eta: "1:00 PM", status: "idle", driver: "Sarah L." },
  { id: "JOB-2844", client: "Visy Recycling", type: "Tip Run", size: "20yd", location: "Wyndham", eta: "11:30 AM", status: "active", driver: "Tom R." },
];

export default function ActiveJobs() {
  return (
    <GlassCard level={2} className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Active Jobs</h3>
        <span className="text-xs font-medium text-robur-yellow">{jobs.length} in progress</span>
      </div>

      <div className="space-y-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="group rounded-xl border border-robur-light/30 p-3 hover:border-robur-yellow/30 hover:bg-robur-charcoal/[0.02] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Package className="h-3.5 w-3.5 text-robur-steel" strokeWidth={1.5} />
                <span className="text-xs font-bold text-robur-charcoal">{job.id}</span>
                <StatusDot status={job.status} size="xs" />
              </div>
              <span className="rounded-md bg-robur-charcoal/5 px-2 py-0.5 text-[10px] font-medium text-robur-steel">
                {job.type} · {job.size}
              </span>
            </div>
            <p className="text-sm font-medium text-robur-charcoal">{job.client}</p>
            <div className="flex items-center gap-4 mt-1.5">
              <span className="flex items-center gap-1 text-[10px] text-robur-steel/60">
                <MapPin className="h-3 w-3" /> {job.location}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-robur-steel/60">
                <Clock className="h-3 w-3" /> ETA {job.eta}
              </span>
            </div>
            <div className="mt-2 pt-2 border-t border-robur-light/20 flex items-center justify-between">
              <span className="text-[10px] font-medium text-robur-steel/50">Assigned: {job.driver}</span>
              <ChevronRight className="h-3 w-3 text-robur-light opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
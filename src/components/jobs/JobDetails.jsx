import GlassCard from "@/components/ui/GlassCard";
import { MapPin, User, Phone, Clock, FileText, ArrowRight, Truck } from "lucide-react";

export default function JobDetails({ job }) {
  if (!job) {
    return (
      <GlassCard level={2} className="p-6 flex items-center justify-center h-full">
        <p className="text-xs text-robur-steel">Select a job to view details</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard level={2} className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-robur-charcoal">{job.job_id}</span>
            <span className="rounded-md bg-robur-charcoal/5 px-1.5 py-0.5 text-[10px] font-medium text-robur-steel">
              {job.job_type}
            </span>
            {job.priority === "high" && (
              <span className="rounded-md bg-red-50 px-1.5 py-0.5 text-[10px] font-medium text-red-500">High</span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-robur-charcoal">{job.title}</h3>
          <p className="text-xs text-robur-steel">{job.client}</p>
        </div>
        <button className="flex items-center gap-1 rounded-lg bg-robur-yellow px-3 py-2 text-[11px] font-bold text-robur-charcoal hover:bg-robur-yellow/90 transition-colors">
          View Job <ArrowRight className="h-3 w-3" strokeWidth={2} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <DetailRow icon={MapPin} label="Site" value={job.site_address} />
        <DetailRow icon={Clock} label="Schedule" value={job.scheduled_time} />
        <DetailRow icon={User} label="Contact" value={job.contact_name} />
        <DetailRow icon={Phone} label="Phone" value={job.contact_phone} />
        <DetailRow icon={Truck} label="Asset" value={job.vehicle_id || "Unassigned"} />
        <DetailRow icon={FileText} label="Notes" value={job.notes || "—"} />
      </div>
    </GlassCard>
  );
}

function DetailRow({ icon: Icon, label, value }) {
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
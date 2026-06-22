import GlassCard from "@/components/ui/GlassCard";
import StatusDot from "@/components/ui/StatusDot";
import { Clock, MapPin, ChevronRight } from "lucide-react";

const schedule = [
  { time: "6:30 AM", title: "Pre-start Check", location: "Depot · Laverton", status: "active", type: "check" },
  { time: "7:15 AM", title: "Bin Exchange · 30yd", location: "Metro Recycling, Tottenham", status: "active", type: "job" },
  { time: "9:00 AM", title: "Collection · 15yd", location: "Cleanaway Site, Sunshine", status: "idle", type: "job" },
  { time: "11:30 AM", title: "Tip Run", location: "Resource Recovery, Wyndham", status: "idle", type: "tip" },
  { time: "1:00 PM", title: "Bin Delivery · 30yd", location: "Hansen Yuncken, CBD", status: "idle", type: "job" },
];

export default function TodaySchedule() {
  return (
    <GlassCard level={2} className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Today's Schedule</h3>
        <span className="text-xs font-medium text-robur-yellow">5 tasks</span>
      </div>

      <div className="space-y-1">
        {schedule.map((item, i) => (
          <div
            key={i}
            className="group flex items-center gap-3 rounded-xl p-2.5 hover:bg-robur-charcoal/[0.03] transition-colors cursor-pointer"
          >
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <StatusDot status={item.status} size="md" />
              {i < schedule.length - 1 && (
                <div className="w-px h-6 bg-robur-light/40 mt-1" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-robur-steel/50" strokeWidth={1.5} />
                <span className="text-[10px] font-medium text-robur-steel/60">{item.time}</span>
              </div>
              <p className="text-sm font-medium text-robur-charcoal mt-0.5 truncate">{item.title}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="h-3 w-3 text-robur-steel/40" strokeWidth={1.5} />
                <span className="text-[10px] text-robur-steel/50 truncate">{item.location}</span>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-robur-light opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
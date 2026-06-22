import GlassCard from "@/components/ui/GlassCard";
import { MessageSquare, ChevronRight } from "lucide-react";

const messages = [
  { from: "Operations", initials: "OP", time: "8 min ago", text: "Route updated — avoid Geelong Rd due to roadworks.", color: "bg-robur-yellow" },
  { from: "Fleet Manager", initials: "FM", time: "35 min ago", text: "Service booked for ROB-142 on Friday.", color: "bg-robur-steel" },
  { from: "Dispatch", initials: "DS", time: "1h ago", text: "New job added to your schedule at 1 PM.", color: "bg-robur-charcoal" },
];

export default function RecentMessages() {
  return (
    <GlassCard level={2} className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Messages</h3>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-robur-yellow text-[10px] font-bold text-robur-charcoal">
          3
        </div>
      </div>

      <div className="space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="group flex items-start gap-3 rounded-xl p-2.5 hover:bg-robur-charcoal/[0.03] transition-colors cursor-pointer"
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${msg.color}`}>
              <span className="text-[10px] font-bold text-white">{msg.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-robur-charcoal">{msg.from}</p>
                <span className="text-[10px] text-robur-steel/50">{msg.time}</span>
              </div>
              <p className="text-xs text-robur-steel mt-0.5 line-clamp-2">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl py-2 text-xs font-medium text-robur-steel hover:bg-robur-charcoal/[0.03] transition-colors">
        <MessageSquare className="h-3 w-3" strokeWidth={1.5} />
        View All Messages
      </button>
    </GlassCard>
  );
}
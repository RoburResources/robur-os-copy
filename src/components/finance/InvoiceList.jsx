import GlassCard from "@/components/ui/GlassCard";
import StatusDot from "@/components/ui/StatusDot";
import { FileText, ChevronRight } from "lucide-react";

const invoices = [
  { id: "INV-1284", client: "Metro Recycling", amount: "$12,450", status: "active", due: "Due in 5 days", type: "Paid" },
  { id: "INV-1283", client: "Hansen Yuncken", amount: "$8,900", status: "warning", due: "Overdue 3 days", type: "Overdue" },
  { id: "INV-1282", client: "Cleanaway", amount: "$15,200", status: "idle", due: "Due in 14 days", type: "Pending" },
  { id: "INV-1281", client: "Visy Recycling", amount: "$6,780", status: "active", due: "Paid Jun 15", type: "Paid" },
  { id: "INV-1280", client: "Boral Resources", amount: "$22,100", status: "active", due: "Paid Jun 12", type: "Paid" },
];

const typeColors = {
  Paid: "bg-emerald-50 text-emerald-600",
  Overdue: "bg-red-50 text-red-500",
  Pending: "bg-robur-charcoal/5 text-robur-steel",
};

export default function InvoiceList() {
  return (
    <GlassCard level={2} className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Recent Invoices</h3>
        <button className="text-xs font-medium text-robur-yellow hover:underline">View All</button>
      </div>

      <div className="space-y-1.5">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="group flex items-center gap-3 rounded-xl p-2.5 hover:bg-robur-charcoal/[0.03] transition-colors cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-robur-charcoal/5">
              <FileText className="h-4 w-4 text-robur-steel" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-robur-charcoal">{inv.client}</span>
                <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium ${typeColors[inv.type]}`}>
                  {inv.type}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-robur-steel/50">{inv.id}</span>
                <span className="text-[10px] text-robur-steel/30">·</span>
                <span className="text-[10px] text-robur-steel/50">{inv.due}</span>
              </div>
            </div>
            <span className="text-sm font-bold text-robur-charcoal">{inv.amount}</span>
            <ChevronRight className="h-4 w-4 text-robur-light opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
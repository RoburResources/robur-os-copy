import GlassCard from "@/components/ui/GlassCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 285000, margin: 82000 },
  { month: "Feb", revenue: 310000, margin: 91000 },
  { month: "Mar", revenue: 298000, margin: 85000 },
  { month: "Apr", revenue: 340000, margin: 102000 },
  { month: "May", revenue: 365000, margin: 112000 },
  { month: "Jun", revenue: 392000, margin: 125000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <GlassCard level={4} className="px-3 py-2">
      <p className="text-[10px] font-medium text-robur-steel mb-1">{label} 2026</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-xs font-semibold text-robur-charcoal">
          {p.dataKey === "revenue" ? "Revenue" : "Margin"}: ${(p.value / 1000).toFixed(0)}K
        </p>
      ))}
    </GlassCard>
  );
};

export default function RevenueChart() {
  return (
    <GlassCard level={2} className="p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Revenue & Margin</h3>
          <p className="text-2xl font-bold text-robur-charcoal mt-1 group-hover:translate-x-0.5 transition-transform">$1.99M <span className="text-sm font-medium text-robur-steel">YTD</span></p>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-robur-steel">
            <span className="h-2 w-2 rounded-full bg-robur-yellow shadow-[0_0_8px_rgba(255,196,0,0.6)] group-hover:shadow-[0_0_12px_rgba(255,196,0,0.9)] transition-shadow" /> Revenue
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-robur-steel">
            <span className="h-2 w-2 rounded-full bg-robur-charcoal" /> Margin
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <filter id="yellowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFC400" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#FFC400" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="marginGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22262B" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#22262B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#C9CCD4" strokeOpacity={0.3} vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#5E6770" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#5E6770" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="revenue" stroke="#FFC400" strokeWidth={2} fill="url(#revenueGrad)" filter="url(#yellowGlow)" />
          <Area type="monotone" dataKey="margin" stroke="#22262B" strokeWidth={1.5} fill="url(#marginGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
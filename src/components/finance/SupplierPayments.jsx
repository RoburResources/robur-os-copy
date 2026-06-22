import GlassCard from "@/components/ui/GlassCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Fuel", amount: 42000 },
  { name: "Parts", amount: 18500 },
  { name: "Tyres", amount: 12000 },
  { name: "Insurance", amount: 28000 },
  { name: "Leasing", amount: 35000 },
  { name: "Other", amount: 8500 },
];

const colors = ["#FFC400", "#22262B", "#5E6770", "#C9CCD4", "#FFC400", "#5E6770"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-4 rounded-lg px-3 py-2">
      <p className="text-xs font-semibold text-robur-charcoal">
        {payload[0].payload.name}: ${(payload[0].value / 1000).toFixed(1)}K
      </p>
    </div>
  );
};

export default function SupplierPayments() {
  return (
    <GlassCard level={2} className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Supplier Payments</h3>
          <p className="text-lg font-bold text-robur-charcoal mt-1">$144K <span className="text-xs font-medium text-robur-steel">this month</span></p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#C9CCD4" strokeOpacity={0.3} vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#5E6770" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "#5E6770" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 196, 0, 0.05)" }} />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={colors[i % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
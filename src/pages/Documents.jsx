import { useState } from "react";
import TopBar from "@/components/layout/TopBar";
import GlassCard from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import {
  FileText,
  Table,
  FileCheck,
  Package,
  Send,
  Check,
  ChevronRight,
  Mail,
  Lock,
  History,
  Archive,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

const extractedData = [
  { label: "Docket No", value: "WB-10247" },
  { label: "Date", value: "03/05/2026" },
  { label: "Time In", value: "07:42" },
  { label: "Time Out", value: "08:15" },
  { label: "Vehicle", value: "Truck 03" },
  { label: "Driver", value: "Sarah L." },
  { label: "Material", value: "Mixed Soil" },
  { label: "Gross", value: "24.5 t" },
  { label: "Tare", value: "11.2 t" },
  { label: "Net", value: "13.3 t" },
  { label: "Site", value: "Tottenham" },
];

const generatedDocs = [
  { name: "DMT Driver Movement Ticket", code: "DMT", color: "bg-robur-charcoal/5 text-robur-charcoal" },
  { name: "MGT Movement Goods Ticket", code: "MGT", color: "bg-robur-charcoal/5 text-robur-charcoal" },
  { name: "Data Summary Sheet", code: "DSS", color: "bg-robur-yellow/10 text-robur-yellow" },
];

const summaryPackTypes = ["DMT", "MGT", "DSS", "Exception Report"];
const deliveryChannels = [
  { label: "Email", icon: Mail },
  { label: "Secure Storage", icon: Lock },
  { label: "Audit Trail", icon: History },
  { label: "Retention", icon: Archive },
];

export default function Documents() {
  const [generated, setGenerated] = useState([true, true, true]);
  const [packSent, setPackSent] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Document Workflow" subtitle="Source → Extract → Generate → Pack → Archive" />

      {/* Flow steps */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-6">
        {/* Step 1: Source Docket */}
        <motion.div {...fadeIn}>
          <StepCard stepNum={1} title="Source Docket" subtitle="Weighbridge Docket · PDF/Image">
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="relative w-full max-w-[140px] aspect-[3/4] rounded-lg bg-gradient-to-br from-robur-charcoal to-robur-charcoal/80 p-3 flex flex-col gap-1.5">
                <div className="h-1 w-12 bg-robur-yellow/60 rounded" />
                <div className="h-px w-full bg-white/10" />
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-white/15 rounded" />
                  <div className="h-1.5 w-2/3 bg-white/15 rounded" />
                  <div className="h-1.5 w-3/4 bg-white/15 rounded" />
                </div>
                <div className="mt-auto flex items-center gap-1">
                  <FileText className="h-3 w-3 text-robur-yellow" strokeWidth={2} />
                  <span className="text-[8px] font-medium text-robur-yellow">WB-10247</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-md bg-robur-charcoal/5 px-2 py-0.5 text-[9px] font-medium text-robur-steel">PDF</span>
                <span className="rounded-md bg-robur-charcoal/5 px-2 py-0.5 text-[9px] font-medium text-robur-steel">Image</span>
              </div>
            </div>
          </StepCard>
        </motion.div>

        {/* Step 2: Extracted Data */}
        <motion.div {...fadeIn} transition={{ delay: 0.05 }}>
          <StepCard stepNum={2} title="Extracted Data" subtitle="OCR & validation">
            <div className="space-y-1 mb-3">
              {extractedData.slice(0, 6).map((d) => (
                <div key={d.label} className="flex justify-between text-[10px]">
                  <span className="text-robur-steel">{d.label}</span>
                  <span className="font-semibold text-robur-charcoal">{d.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-robur-yellow/10 px-2 py-1">
              <Check className="h-3 w-3 text-robur-yellow" strokeWidth={3} />
              <span className="text-[10px] font-semibold text-robur-yellow">Validated</span>
            </div>
          </StepCard>
        </motion.div>

        {/* Step 3: Generated Documents */}
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <StepCard stepNum={3} title="Generated Documents" subtitle="Auto-generated outputs">
            <div className="space-y-2">
              {generatedDocs.map((doc, i) => (
                <div key={doc.code} className="rounded-lg bg-robur-charcoal/[0.03] p-2.5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={cn("flex h-7 w-7 items-center justify-center rounded-md text-[9px] font-black", doc.color)}>
                      {doc.code}
                    </div>
                    <span className="text-[10px] font-medium text-robur-charcoal leading-tight">{doc.name}</span>
                  </div>
                  <button
                    onClick={() => setGenerated((prev) => prev.map((g, idx) => (idx === i ? true : g)))}
                    disabled={generated[i]}
                    className={cn(
                      "w-full rounded-md py-1 text-[9px] font-semibold transition-colors",
                      generated[i]
                        ? "bg-robur-yellow/20 text-robur-yellow cursor-default"
                        : "bg-robur-yellow text-robur-charcoal hover:bg-robur-yellow/90"
                    )}
                  >
                    {generated[i] ? "✓ Generated" : "Generate"}
                  </button>
                </div>
              ))}
            </div>
          </StepCard>
        </motion.div>

        {/* Step 4: Daily Summary Pack */}
        <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
          <StepCard stepNum={4} title="Daily Summary Pack" subtitle="Compiled & ready">
            <div className="space-y-1.5 mb-3">
              {summaryPackTypes.map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-md bg-robur-charcoal/[0.03] px-2 py-1.5">
                  <FileCheck className="h-3 w-3 text-robur-steel/50" strokeWidth={1.5} />
                  <span className="text-[10px] font-medium text-robur-charcoal">{t}</span>
                  <Check className="h-3 w-3 text-robur-yellow ml-auto" strokeWidth={2.5} />
                </div>
              ))}
            </div>
            <button
              onClick={() => setPackSent(true)}
              disabled={packSent}
              className={cn(
                "w-full flex items-center justify-center gap-1.5 rounded-lg py-2 text-[10px] font-semibold transition-colors",
                packSent ? "bg-robur-yellow/20 text-robur-yellow" : "bg-robur-yellow text-robur-charcoal hover:bg-robur-yellow/90"
              )}
            >
              {packSent ? <><Check className="h-3 w-3" strokeWidth={2.5} /> Pack Sent</> : <><Send className="h-3 w-3" strokeWidth={2} /> Generate & Send</>}
            </button>
          </StepCard>
        </motion.div>

        {/* Step 5: Delivery & Archive */}
        <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
          <StepCard stepNum={5} title="Delivery & Archive" subtitle="Completed workflow">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {deliveryChannels.map((ch) => (
                <div key={ch.label} className="flex flex-col items-center gap-1.5 rounded-lg bg-robur-charcoal/[0.03] p-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/60">
                    <ch.icon className="h-4 w-4 text-robur-charcoal" strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] font-medium text-robur-steel text-center">{ch.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-1.5 rounded-md bg-robur-yellow/10 py-1.5">
              <Check className="h-3.5 w-3.5 text-robur-yellow" strokeWidth={3} />
              <span className="text-[10px] font-bold text-robur-yellow">Completed</span>
            </div>
          </StepCard>
        </motion.div>
      </div>

      {/* Flow connectors */}
      <div className="hidden lg:flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-robur-yellow" />
            <ChevronRight className="h-4 w-4 text-robur-light" />
          </div>
        ))}
        <div className="h-2 w-2 rounded-full bg-robur-yellow" />
      </div>

      {/* Recent Dockets */}
      <motion.div {...fadeIn} transition={{ delay: 0.25 }}>
        <GlassCard level={2} className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-robur-yellow" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Recent Dockets</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-robur-light/30">
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Docket No</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Date</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Vehicle</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Material</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Net</th>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-robur-steel/60">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { no: "WB-10247", date: "03/05/2026", vehicle: "Truck 03", material: "Mixed Soil", net: "13.3 t", status: "Completed" },
                  { no: "WB-10246", date: "03/05/2026", vehicle: "Truck 01", material: "Concrete", net: "18.7 t", status: "Completed" },
                  { no: "WB-10245", date: "02/05/2026", vehicle: "Truck 04", material: "Green Waste", net: "9.2 t", status: "Completed" },
                  { no: "WB-10244", date: "02/05/2026", vehicle: "Truck 02", material: "Mixed Soil", net: "15.1 t", status: "Completed" },
                ].map((d) => (
                  <tr key={d.no} className="border-b border-robur-light/15 hover:bg-robur-charcoal/[0.02] transition-colors">
                    <td className="px-3 py-2.5 text-xs font-bold text-robur-charcoal">{d.no}</td>
                    <td className="px-3 py-2.5 text-xs text-robur-steel">{d.date}</td>
                    <td className="px-3 py-2.5 text-xs text-robur-steel">{d.vehicle}</td>
                    <td className="px-3 py-2.5 text-xs text-robur-steel">{d.material}</td>
                    <td className="px-3 py-2.5 text-xs font-semibold text-robur-charcoal">{d.net}</td>
                    <td className="px-3 py-2.5">
                      <span className="inline-flex items-center gap-1 rounded-md bg-robur-yellow/10 px-2 py-0.5 text-[10px] font-semibold text-robur-yellow">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} /> {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

function StepCard({ stepNum, title, subtitle, children }) {
  return (
    <GlassCard level={2} className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-robur-yellow text-[11px] font-bold text-robur-charcoal">
          {stepNum}
        </div>
        <div>
          <h3 className="text-xs font-bold text-robur-charcoal leading-tight">{title}</h3>
          <p className="text-[9px] text-robur-steel">{subtitle}</p>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </GlassCard>
  );
}
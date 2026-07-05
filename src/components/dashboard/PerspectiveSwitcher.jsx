import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, Building, Truck } from "lucide-react";
import HoverSection from "@/components/ui/HoverSection";

const PERSPECTIVES = [
  { id: "executive", label: "Executive", icon: LayoutDashboard },
  { id: "staff", label: "Staff", icon: Users },
  { id: "client", label: "Client", icon: Building },
  { id: "driver", label: "Driver", icon: Truck },
];

export default function PerspectiveSwitcher({ value, onChange }) {
  return (
    <div className="flex items-center gap-1 glass-2 rounded-xl p-1">
      {PERSPECTIVES.map((p) => {
        const active = value === p.id;
        const Icon = p.icon;
        return (
          <HoverSection
            key={p.id}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer"
            onClick={() => onChange(p.id)}
          >
            {active && (
              <motion.div
                layoutId="perspective-active"
                className="absolute inset-0 rounded-lg bg-robur-yellow"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              className={`relative z-10 h-3.5 w-3.5 transition-colors ${active ? "text-robur-charcoal" : "text-robur-steel"}`}
              strokeWidth={2}
            />
            <span
              className={`relative z-10 text-xs font-semibold transition-colors ${active ? "text-robur-charcoal" : "text-robur-steel"}`}
            >
              {p.label}
            </span>
          </HoverSection>
        );
      })}
    </div>
  );
}
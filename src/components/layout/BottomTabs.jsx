import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Jobs", icon: Package, path: "/jobs" },
  { label: "Map", icon: MapPin, path: "/map" },
  { label: "Clients", icon: Users, path: "/clients" },
];

export default function BottomTabs() {
  const location = useLocation();

  return (
    <nav
      className="glass-2 fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-robur-light/20"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {tabs.map((tab) => {
        const isActive =
          location.pathname === tab.path ||
          (tab.path === "/" && location.pathname.startsWith("/dashboard"));
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className="flex flex-1 flex-col items-center gap-1 py-2.5"
          >
            <tab.icon
              className={cn(
                "h-5 w-5 transition-colors",
                isActive
                  ? "text-robur-yellow"
                  : "text-robur-steel"
              )}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <span
              className={cn(
                "text-[10px] font-medium transition-colors",
                isActive ? "text-robur-charcoal" : "text-robur-steel"
              )}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
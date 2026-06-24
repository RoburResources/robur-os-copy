import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Truck,
  Users,
  FileText,
  MapPin,
  BarChart3,
  Settings,
  Package,
  Bell,
  LogOut,
  Activity,
  Calendar,
} from "lucide-react";
import { base44 } from "@/api/base44Client";

const navSections = [
  {
    label: "Operations",
    items: [
      { label: "Driver", icon: LayoutDashboard, path: "/" },
      { label: "Ops Centre", icon: Activity, path: "/operations" },
      { label: "Fleet", icon: Truck, path: "/fleet" },
      { label: "Jobs", icon: Package, path: "/jobs" },
      { label: "Map", icon: MapPin, path: "/map" },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Clients", icon: Users, path: "/clients" },
      { label: "Finance", icon: BarChart3, path: "/finance" },
      { label: "Reports", icon: FileText, path: "/reports" },
      { label: "Bookings", icon: Calendar, path: "/booking" },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="glass-sidebar fixed left-0 top-0 z-40 flex h-screen w-64 flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-white/5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-robur-yellow">
          <span className="text-sm font-black text-robur-charcoal">R</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white tracking-tight">Robur Resources</p>
          <p className="text-[10px] font-medium text-robur-steel">Operations Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-robur-steel/60">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-robur-yellow/10 text-robur-yellow"
                        : "text-robur-light/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4" strokeWidth={isActive ? 2 : 1.5} />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="ml-auto h-1.5 w-1.5 rounded-full bg-robur-yellow" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/5 p-3 space-y-0.5">
        <Link
          to="/notifications"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-robur-light/70 hover:bg-white/5 hover:text-white transition-all"
        >
          <Bell className="h-4 w-4" strokeWidth={1.5} />
          <span>Notifications</span>
          <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-robur-yellow text-[10px] font-bold text-robur-charcoal">
            3
          </span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-robur-light/70 hover:bg-white/5 hover:text-white transition-all"
        >
          <Settings className="h-4 w-4" strokeWidth={1.5} />
          <span>Settings</span>
        </Link>
        <button
          onClick={() => base44.auth.logout()}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-robur-light/40 hover:bg-white/5 hover:text-red-400 transition-all"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
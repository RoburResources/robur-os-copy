import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Gauge,
  Activity,
  LayoutDashboard,
  Truck,
  Package,
  FileStack,
  Users,
  CreditCard,
  ClipboardList,
  FileCheck,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { base44 } from "@/api/base44Client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const navSections = [
  {
    label: "Overview",
    items: [
      { label: "Executive", icon: Gauge, path: "/" },
      { label: "Operations", icon: Activity, path: "/operations" },
      { label: "Driver", icon: LayoutDashboard, path: "/driver" },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Fleet", icon: Truck, path: "/fleet" },
      { label: "Jobs", icon: Package, path: "/jobs" },
      { label: "Documents", icon: FileStack, path: "/documents" },
    ],
  },
  {
    label: "Business",
    items: [
      { label: "Clients", icon: Users, path: "/clients" },
      { label: "Payments", icon: CreditCard, path: "/finance" },
    ],
  },
  {
    label: "Workflows",
    items: [
      { label: "DMT", icon: ClipboardList, path: "/dmt" },
      { label: "MGT", icon: FileCheck, path: "/mgt" },
      { label: "DSS", icon: BarChart3, path: "/dss" },
    ],
  },
];

export default function Sidebar({ hovered = false, onHoverChange }) {
  const location = useLocation();
  const [deleting, setDeleting] = useState(false);
  const collapsed = !hovered;

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await base44.auth.deleteAccount?.();
      base44.auth.logout();
    } catch (err) {
      console.error(err);
      setDeleting(false);
    }
  };

  return (
    <aside
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      className={cn(
        "glass-sidebar fixed left-4 top-4 bottom-4 z-40 flex flex-col rounded-3xl transition-all duration-300 overflow-hidden",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-16 items-center gap-3 border-b border-robur-charcoal/10",
          collapsed ? "justify-center px-2" : "px-6"
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-robur-yellow">
          <span className="text-sm font-black text-robur-charcoal">R</span>
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold text-robur-charcoal tracking-tight">Robur Resources</p>
            <p className="text-[10px] font-medium text-robur-steel">Operations Platform</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-robur-steel">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center rounded-xl py-2.5 text-sm font-medium transition-all duration-200",
                      collapsed ? "justify-center px-2" : "gap-3 px-3",
                      isActive
                        ? "bg-robur-yellow/20 text-robur-charcoal"
                        : "text-robur-steel hover:bg-robur-charcoal/5 hover:text-robur-charcoal"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" strokeWidth={isActive ? 2 : 1.5} />
                    {!collapsed && <span>{item.label}</span>}
                    {!collapsed && isActive && (
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
      <div className="border-t border-robur-charcoal/10 p-3 space-y-0.5">
        <Link
          to="/notifications"
          title={collapsed ? "Notifications" : undefined}
          className={cn(
            "flex items-center rounded-xl py-2.5 text-sm font-medium text-robur-steel hover:bg-robur-charcoal/5 hover:text-robur-charcoal transition-all",
            collapsed ? "justify-center px-2" : "gap-3 px-3"
          )}
        >
          <div className="relative shrink-0">
            <Bell className="h-4 w-4" strokeWidth={1.5} />
            <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-robur-yellow text-[8px] font-bold text-robur-charcoal">
              3
            </span>
          </div>
          {!collapsed && <span>Notifications</span>}
          {!collapsed && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-robur-yellow text-[10px] font-bold text-robur-charcoal">
              3
            </span>
          )}
        </Link>
        <Link
          to="/settings"
          title={collapsed ? "Settings" : undefined}
          className={cn(
            "flex items-center rounded-xl py-2.5 text-sm font-medium text-robur-steel hover:bg-robur-charcoal/5 hover:text-robur-charcoal transition-all",
            collapsed ? "justify-center px-2" : "gap-3 px-3"
          )}
        >
          <Settings className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          {!collapsed && <span>Settings</span>}
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              title={collapsed ? "Delete Account" : undefined}
              className={cn(
                "flex w-full items-center rounded-xl py-2.5 text-sm font-medium text-robur-steel/60 hover:bg-robur-charcoal/5 hover:text-red-500 transition-all",
                collapsed ? "justify-center px-2" : "gap-3 px-3"
              )}
            >
              <Trash2 className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              {!collapsed && <span>Delete Account</span>}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account?</AlertDialogTitle>
              <AlertDialogDescription>
                This action is permanent and cannot be undone. All your data
                will be permanently removed from Robur Resources.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <button
          onClick={() => base44.auth.logout()}
          title={collapsed ? "Sign Out" : undefined}
          className={cn(
            "flex w-full items-center rounded-xl py-2.5 text-sm font-medium text-robur-steel/60 hover:bg-robur-charcoal/5 hover:text-red-500 transition-all",
            collapsed ? "justify-center px-2" : "gap-3 px-3"
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
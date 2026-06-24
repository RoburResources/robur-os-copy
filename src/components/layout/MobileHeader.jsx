import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const routeTitles = {
  "/": "Executive",
  "/operations": "Operations",
  "/driver": "Driver",
  "/fleet": "Fleet",
  "/jobs": "Jobs",
  "/clients": "Clients",
  "/finance": "Payments",
  "/documents": "Documents",
  "/dmt": "DMT Workflow",
  "/mgt": "MGT Workflow",
  "/dss": "DSS Workflow",
  "/settings": "Settings",
  "/notifications": "Notifications",
};

export default function MobileHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isRoot = location.pathname === "/";
  const title = routeTitles[location.pathname] || "Robur";

  return (
    <header
      className="glass-2 fixed left-0 right-0 top-0 z-50 flex h-14 items-center px-4"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          {!isRoot ? (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-0.5 text-sm font-medium text-robur-steel"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} />
              Back
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-robur-yellow">
                <span className="text-xs font-black text-robur-charcoal">R</span>
              </div>
              <span className="text-sm font-bold text-robur-charcoal">
                Robur
              </span>
            </div>
          )}
        </div>
        <h1
          className={cn(
            "text-sm font-bold text-robur-charcoal",
            !isRoot && "absolute left-1/2 -translate-x-1/2"
          )}
        >
          {title}
        </h1>
        <div className="w-16" />
      </div>
    </header>
  );
}
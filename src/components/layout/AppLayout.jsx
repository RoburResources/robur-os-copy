import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import BottomTabs from "./BottomTabs";
import MobileHeader from "./MobileHeader";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AppLayout() {
  const isMobile = useIsMobile();
  const [sidebarHovered, setSidebarHovered] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Blurred background image to test glass card effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/6a434fcdf106195f32f0ac41/059ef1d21_image.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ filter: "blur(36px) saturate(1.25)" }}
        />
      </div>

      {isMobile ? (
        <>
          <MobileHeader />
          <main
            className="min-h-screen"
            style={{
              paddingTop: "calc(3.5rem + env(safe-area-inset-top))",
              paddingBottom: "calc(4.5rem + env(safe-area-inset-bottom))",
            }}
          >
            <div className="p-4">
              <Outlet />
            </div>
          </main>
          <BottomTabs />
        </>
      ) : (
        <>
          <Sidebar
            hovered={sidebarHovered}
            onHoverChange={setSidebarHovered}
          />
          <main
            className={cn(
              "min-h-screen pl-2.5 pr-8 py-8 transition-all duration-300",
              sidebarHovered ? "ml-[272px]" : "ml-[88px]"
            )}
          >
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
}
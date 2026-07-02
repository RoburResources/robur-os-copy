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
    <div className="min-h-screen bg-transparent">
      {/* Blurred background image to test glass card effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/6a434fcdf106195f32f0ac41/059ef1d21_image.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ filter: "blur(32px) saturate(1.15) brightness(1.05)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.25) 20%, rgba(255,210,110,0.18) 45%, rgba(255,190,80,0.12) 60%, rgba(120,118,115,0.20) 85%, rgba(90,90,90,0.28) 100%)" }}
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
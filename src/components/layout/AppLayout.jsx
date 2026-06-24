import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomTabs from "./BottomTabs";
import MobileHeader from "./MobileHeader";
import { useIsMobile } from "@/hooks/use-mobile";

export default function AppLayout() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50">
      {/* Ambient background shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-robur-yellow/5 blur-3xl" />
        <div className="absolute top-1/3 -left-20 h-60 w-60 rounded-full bg-robur-steel/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-robur-yellow/3 blur-2xl" />
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
          <Sidebar />
          <main className="ml-64 min-h-screen p-8">
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
}
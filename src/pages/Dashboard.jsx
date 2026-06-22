import TopBar from "@/components/layout/TopBar";
import WeatherHero from "@/components/dashboard/WeatherHero";
import VehicleStatus from "@/components/dashboard/VehicleStatus";
import TodaySchedule from "@/components/dashboard/TodaySchedule";
import RecentMessages from "@/components/dashboard/RecentMessages";
import QuickActions from "@/components/dashboard/QuickActions";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Good Morning, James" subtitle="Monday, 23 June 2026 · 5 tasks today" />

      <div className="grid grid-cols-12 gap-5">
        {/* Weather Hero - Full Width */}
        <motion.div className="col-span-12 lg:col-span-8" {...fadeIn} transition={{ delay: 0 }}>
          <WeatherHero />
        </motion.div>

        {/* Vehicle Status */}
        <motion.div className="col-span-12 lg:col-span-4" {...fadeIn} transition={{ delay: 0.05 }}>
          <VehicleStatus />
        </motion.div>

        {/* Today's Schedule */}
        <motion.div className="col-span-12 lg:col-span-5" {...fadeIn} transition={{ delay: 0.1 }}>
          <TodaySchedule />
        </motion.div>

        {/* Messages */}
        <motion.div className="col-span-12 lg:col-span-4" {...fadeIn} transition={{ delay: 0.15 }}>
          <RecentMessages />
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="col-span-12 lg:col-span-3" {...fadeIn} transition={{ delay: 0.2 }}>
          <QuickActions />
        </motion.div>
      </div>
    </div>
  );
}
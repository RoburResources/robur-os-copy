import TopBar from "@/components/layout/TopBar";
import MetricCard from "@/components/ui/MetricCard";
import FleetOverview from "@/components/staff/FleetOverview";
import ActiveJobs from "@/components/staff/ActiveJobs";
import AlertsPanel from "@/components/staff/AlertsPanel";
import OperationsMap from "@/components/staff/OperationsMap";
import { motion } from "framer-motion";
import { Truck, Package, Clock, AlertTriangle } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function StaffDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Operations Centre" subtitle="Real-time overview · Monday, 23 June 2026" />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div {...fadeIn} transition={{ delay: 0 }}>
          <MetricCard label="Active Fleet" value="5/7" change="1 more than yesterday" changeType="up" icon={Truck} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.05 }}>
          <MetricCard label="Jobs Today" value="18" change="3 ahead of schedule" changeType="up" icon={Package} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <MetricCard label="Avg Completion" value="42 min" change="8 min faster" changeType="up" icon={Clock} />
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.15 }}>
          <MetricCard label="Open Alerts" value="4" change="2 critical" changeType="down" icon={AlertTriangle} />
        </motion.div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-5">
        {/* Map */}
        <motion.div className="col-span-12 lg:col-span-7" {...fadeIn} transition={{ delay: 0.2 }}>
          <OperationsMap />
        </motion.div>

        {/* Fleet Status */}
        <motion.div className="col-span-12 lg:col-span-5" {...fadeIn} transition={{ delay: 0.25 }}>
          <FleetOverview />
        </motion.div>

        {/* Active Jobs */}
        <motion.div className="col-span-12 lg:col-span-7" {...fadeIn} transition={{ delay: 0.3 }}>
          <ActiveJobs />
        </motion.div>

        {/* Alerts */}
        <motion.div className="col-span-12 lg:col-span-5" {...fadeIn} transition={{ delay: 0.35 }}>
          <AlertsPanel />
        </motion.div>
      </div>
    </div>
  );
}
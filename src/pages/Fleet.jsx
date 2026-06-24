import { useState, useEffect } from "react";
import TopBar from "@/components/layout/TopBar";
import FleetList from "@/components/fleet/FleetList";
import VehicleHealth from "@/components/fleet/VehicleHealth";
import ServiceReminders from "@/components/fleet/ServiceReminders";
import AssetDetails from "@/components/fleet/AssetDetails";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 } };

export default function Fleet() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    base44.entities.Vehicle.list()
      .then((data) => {
        setVehicles(data);
        if (data.length > 0) setSelectedVehicle(data.find((v) => v.vehicle_id === "Truck 03") || data[0]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <TopBar title="Fleet Management" subtitle="Monitor assets, performance and maintenance" />

      <div className="grid grid-cols-12 gap-4" style={{ minHeight: "calc(100vh - 220px)" }}>
        <motion.div className="col-span-12 lg:col-span-3" {...fadeIn}>
          <FleetList
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            onSelect={setSelectedVehicle}
            loading={loading}
          />
        </motion.div>

        <motion.div className="col-span-12 lg:col-span-5 space-y-4" {...fadeIn} transition={{ delay: 0.05 }}>
          <VehicleHealth vehicle={selectedVehicle} />
          <ServiceReminders vehicle={selectedVehicle} />
        </motion.div>

        <motion.div className="col-span-12 lg:col-span-4" {...fadeIn} transition={{ delay: 0.1 }}>
          <AssetDetails vehicle={selectedVehicle} />
        </motion.div>
      </div>
    </div>
  );
}
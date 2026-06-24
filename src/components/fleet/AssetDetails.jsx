import { useState } from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import SatelliteMap from "@/components/maps/SatelliteMap";
import GlassCard from "@/components/ui/GlassCard";
import { Gauge, Fuel, Droplet, Activity, ArrowRight, Maximize2 } from "lucide-react";

const vehicleIcon = L.divIcon({
  className: "",
  html: `<div style="width:32px;height:32px;background:#FFC400;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 4px rgba(255,196,0,0.2),0 4px 12px rgba(0,0,0,0.4);border:2px solid white">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22262B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
  </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function ProgressBar({ label, value, icon: Icon, color }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Icon className="h-3 w-3 text-robur-steel/50" strokeWidth={1.5} />
          <span className="text-[10px] font-medium uppercase tracking-wide text-robur-steel">{label}</span>
        </div>
        <span className="text-xs font-bold text-robur-charcoal">{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-robur-light/30 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function AssetDetails({ vehicle }) {
  const [map, setMap] = useState(null);

  if (!vehicle) {
    return (
      <GlassCard level={2} className="p-6 flex items-center justify-center h-full">
        <p className="text-xs text-robur-steel">Select a vehicle</p>
      </GlassCard>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Asset Details */}
      <GlassCard level={2} className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-robur-charcoal">{vehicle.vehicle_id}</span>
              <span className="rounded-md bg-robur-charcoal/5 px-1.5 py-0.5 text-[10px] font-medium text-robur-steel">
                {vehicle.category}
              </span>
            </div>
            <p className="text-xs text-robur-steel">{vehicle.type} · {vehicle.driver}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Gauge className="h-3 w-3 text-robur-steel/40" strokeWidth={1.5} />
              <span className="text-[10px] text-robur-steel">{vehicle.odometer?.toLocaleString()} km · {vehicle.rego}</span>
            </div>
          </div>
          <button className="flex items-center gap-1 rounded-lg bg-robur-yellow px-3 py-2 text-[11px] font-bold text-robur-charcoal hover:bg-robur-yellow/90 transition-colors">
            View <ArrowRight className="h-3 w-3" strokeWidth={2} />
          </button>
        </div>
        <div className="space-y-3">
          <ProgressBar label="Fuel" value={vehicle.fuel_pct} icon={Fuel} color={vehicle.fuel_pct > 50 ? "bg-emerald-400" : vehicle.fuel_pct > 25 ? "bg-robur-yellow" : "bg-red-400"} />
          <ProgressBar label="AdBlue" value={vehicle.adblue_pct} icon={Droplet} color="bg-blue-400" />
          <ProgressBar label="Utilisation" value={vehicle.utilisation_pct} icon={Activity} color="bg-robur-charcoal" />
        </div>
      </GlassCard>

      {/* Live Fleet Map */}
      <GlassCard level={2} className="overflow-hidden flex-1 flex flex-col min-h-[180px]">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Live Fleet Map</h3>
          <GlassCard level={3} className="h-7 w-7 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
            <Maximize2 className="h-3.5 w-3.5 text-robur-steel" strokeWidth={1.5} />
          </GlassCard>
        </div>
        <div className="relative flex-1 min-h-[150px]">
          <SatelliteMap
            center={{ lat: vehicle.latitude, lng: vehicle.longitude }}
            zoom={14}
            onMapReady={setMap}
            className="h-full w-full"
          >
            <Marker position={[vehicle.latitude, vehicle.longitude]} icon={vehicleIcon} />
          </SatelliteMap>
        </div>
      </GlassCard>
    </div>
  );
}
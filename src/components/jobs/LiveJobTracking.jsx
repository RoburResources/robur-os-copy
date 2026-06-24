import { useState } from "react";
import { Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import SatelliteMap from "@/components/maps/SatelliteMap";
import GlassCard from "@/components/ui/GlassCard";
import { Navigation, Maximize2 } from "lucide-react";

const vehicleIcon = L.divIcon({
  className: "",
  html: `<div style="width:36px;height:36px;background:#FFC400;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 4px rgba(255,196,0,0.25),0 4px 12px rgba(0,0,0,0.4);border:2px solid white">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22262B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const siteIcon = L.divIcon({
  className: "",
  html: `<div style="width:30px;height:30px;background:#22262B;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 4px 12px rgba(0,0,0,0.4)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFC400" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

export default function LiveJobTracking({ job }) {
  const [map, setMap] = useState(null);
  if (!job || !job.latitude || !job.longitude) {
    return (
      <GlassCard level={2} className="p-6 flex items-center justify-center h-full">
        <p className="text-xs text-robur-steel">No tracking data</p>
      </GlassCard>
    );
  }

  const jobPos = { lat: job.latitude, lng: job.longitude };
  const vehiclePos = { lat: job.latitude + 0.008, lng: job.longitude - 0.006 };

  return (
    <GlassCard level={2} className="overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Live Tracking</h3>
        <GlassCard level={3} className="h-7 w-7 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
          <Maximize2 className="h-3.5 w-3.5 text-robur-steel" strokeWidth={1.5} />
        </GlassCard>
      </div>
      <div className="relative flex-1 min-h-[200px]">
        <SatelliteMap center={jobPos} zoom={14} onMapReady={setMap} className="h-full w-full">
          <Polyline
            positions={[[vehiclePos.lat, vehiclePos.lng], [jobPos.lat, jobPos.lng]]}
            pathOptions={{ color: "#FFC400", dashArray: "6 6", weight: 2, opacity: 0.7 }}
          />
          <Marker position={[vehiclePos.lat, vehiclePos.lng]} icon={vehicleIcon} />
          <Marker position={[jobPos.lat, jobPos.lng]} icon={siteIcon} />
        </SatelliteMap>
        <div className="absolute bottom-3 left-3 z-[1000]">
          <GlassCard level={3} className="px-3 py-2 flex items-center gap-2">
            <Navigation className="h-3 w-3 text-robur-yellow" strokeWidth={2} />
            <span className="text-[10px] font-semibold text-robur-charcoal">{job.vehicle_id} · En route</span>
          </GlassCard>
        </div>
      </div>
    </GlassCard>
  );
}
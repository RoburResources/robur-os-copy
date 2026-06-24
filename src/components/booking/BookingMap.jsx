import { useState } from "react";
import { Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import SatelliteMap, { MapViewController } from "@/components/maps/SatelliteMap";
import GlassCard from "@/components/ui/GlassCard";
import { Navigation, Plus, Minus, Maximize2 } from "lucide-react";

const binIcon = L.divIcon({
  className: "",
  html: `<div style="
    width: 48px; height: 48px;
    background: #FFC400;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 0 0 3px rgba(255,196,0,0.3), 0 8px 24px rgba(0,0,0,0.5);
    border: 2px solid white;
    cursor: grab;
  ">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22262B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  </div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

const ghostIcon = L.divIcon({
  className: "",
  html: `<div style="
    width: 48px; height: 48px;
    border: 2px dashed #5E6770;
    border-radius: 12px;
    background: rgba(94,103,112,0.1);
  "></div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});

export default function BookingMap({
  binPosition,
  onBinDrag,
  mapCenter,
  initialPosition,
}) {
  const [map, setMap] = useState(null);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <SatelliteMap
        center={binPosition}
        zoom={18}
        onMapReady={setMap}
        className="h-full w-full"
      >
        <MapViewController center={mapCenter} zoom={18} />

        {initialPosition && (
          <>
            <Polyline
              positions={[
                [initialPosition.lat, initialPosition.lng],
                [binPosition.lat, binPosition.lng],
              ]}
              pathOptions={{
                color: "#5E6770",
                dashArray: "6 6",
                weight: 2,
                opacity: 0.6,
              }}
            />
            <Marker
              position={[initialPosition.lat, initialPosition.lng]}
              icon={ghostIcon}
              interactive={false}
            />
          </>
        )}

        <Marker
          position={[binPosition.lat, binPosition.lng]}
          icon={binIcon}
          draggable={true}
          eventHandlers={{
            dragend: (e) => onBinDrag(e.target.getLatLng()),
          }}
        />
      </SatelliteMap>

      {/* Floating controls */}
      <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-1.5">
        <GlassCard level={3} className="h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
          <Navigation className="h-4 w-4 text-robur-steel" strokeWidth={1.5} />
        </GlassCard>
        <GlassCard
          level={3}
          className="h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
          onClick={() => map?.zoomIn()}
        >
          <Plus className="h-4 w-4 text-robur-steel" strokeWidth={2} />
        </GlassCard>
        <GlassCard
          level={3}
          className="h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
          onClick={() => map?.zoomOut()}
        >
          <Minus className="h-4 w-4 text-robur-steel" strokeWidth={2} />
        </GlassCard>
        <GlassCard level={3} className="h-9 w-9 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
          <Maximize2 className="h-4 w-4 text-robur-steel" strokeWidth={1.5} />
        </GlassCard>
      </div>

      {/* Legend */}
      <GlassCard level={3} className="absolute bottom-4 left-4 p-3 z-[1000]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 border-2 border-dashed border-robur-steel rounded" />
            <div>
              <p className="text-[10px] font-semibold text-robur-charcoal">
                Move bin
              </p>
              <p className="text-[9px] text-robur-steel">Drag to position</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-robur-yellow rounded" />
            <div>
              <p className="text-[10px] font-semibold text-robur-charcoal">
                Placed bin
              </p>
              <p className="text-[9px] text-robur-steel">Ready for placement</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
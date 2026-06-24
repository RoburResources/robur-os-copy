import { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

const SATELLITE_TILES =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

function MapController({ onReady }) {
  const map = useMap();
  useEffect(() => {
    if (onReady) onReady(map);
  }, [map, onReady]);
  return null;
}

export function MapViewController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.setView([center.lat, center.lng], zoom || map.getZoom());
  }, [map, center, zoom]);
  return null;
}

export default function SatelliteMap({
  center,
  zoom,
  children,
  onMapReady,
  className,
  ...props
}) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      className={className}
      zoomControl={false}
      {...props}
    >
      <TileLayer
        url={SATELLITE_TILES}
        attribution='&copy; Esri, Maxar, Earthstar Geographics'
      />
      {onMapReady && <MapController onReady={onMapReady} />}
      {children}
    </MapContainer>
  );
}
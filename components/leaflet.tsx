"use client";
import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";
import { LatLngBounds, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Lugar } from "@/data/routes";

interface LeafletProps {
  routes: Lugar[];
}

function FitActiveRoutes({ routes }: LeafletProps) {
  const map = useMap();
  const activePoints = useMemo(
    () => routes.filter((route) => route.active).flatMap((route) => route.route),
    [routes],
  );

  useEffect(() => {
    if (!activePoints.length) return;

    const bounds = new LatLngBounds(activePoints);
    map.fitBounds(bounds, {
      animate: true,
      duration: 0.8,
      paddingTopLeft: [440, 40],
      paddingBottomRight: [40, 40],
      maxZoom: 15,
    });
  }, [activePoints, map]);

  return null;
}

export default function Leaflet({ routes }: LeafletProps) {
  const position: LatLngExpression = [10.7202, 122.5621];

  return (
    <MapContainer
      center={position}
      zoom={13}
      className="h-full w-full"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FitActiveRoutes routes={routes} />

      {routes.map((route) => (
        <Polyline
          key={route.id}
          pathOptions={{
            color: route.color,
            opacity: route.active ? 0.9 : 0,
            weight: route.active ? 5 : 0,
            lineCap: "round",
            lineJoin: "round",
          }}
          positions={route.route}
        />
      ))}
    </MapContainer>
  );
}

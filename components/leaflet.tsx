"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Lugar } from "@/data/routes";

interface LeafletProps {
  routes: Lugar[];
}

export default function Leaflet({ routes }: LeafletProps) {
  const position: LatLngExpression = [10.7202, 122.5621];

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-full w-full bg-gray-200" />;

  return (
    <MapContainer
      key={routes.length}
      center={position}
      zoom={13}
      className="h-full w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {routes.map((route) => (
        <Polyline
          key={route.id}
          pathOptions={{
            color: route.active ? "blue" : "transparent", // Hide if not active
            weight: 5,
          }}
          positions={route.route}
        />
      ))}
    </MapContainer>
  );
}

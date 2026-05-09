"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Leaflet() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div style={{ height: "100%", width: "100%", background: "#e0e0e0" }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[10.7202, 122.5621]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polyline
          pathOptions={{ color: "blue", weight: 5 }}
          positions={[
            [10.7202, 122.5621],
            [10.7245, 122.558],
            [10.7245, 125.558],
          ]}
        />
      </MapContainer>
    </div>
  );
}

"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Weather from "../components/weather";
import RouteBar from "@/components/routebar";
import { ILOILO_ROUTES, Lugar } from "@/data/routes"; // Import your type and data

const Leaflet = dynamic(() => import("../components/leaflet"), {
  ssr: false,
  loading: () => <p>Loading Map...</p>,
});

export default function Homepage() {
  // Create the "Live" version of your routes
  const [routes, setRoutes] = useState<Lugar[]>(ILOILO_ROUTES);

  // Function to toggle the active state of a specific route
  const handleToggle = (id: string) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) =>
        route.id === id ? { ...route, active: !route.active } : route,
      ),
    );
  };

  return (
    <section className="text-black text-sm">
      <div className="h-screen w-screen fixed">
        {/* Pass the live state to Leaflet */}
        <Leaflet routes={routes} />
      </div>

      <div className="fixed bottom-10 left-10">
        <Weather />
      </div>

      <div className="fixed right-10 top-10 bottom-10">
        {/* Pass the live state AND the toggle function to RouteBar */}
        <RouteBar routes={routes} onToggle={handleToggle} />
      </div>
    </section>
  );
}

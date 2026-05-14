// @refresh reset

"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Weather from "../components/weather";
import RouteBar from "@/components/routebar";
import { ILOILO_ROUTES, Lugar } from "@/data/routes"; // Import your type and data

const Leaflet = dynamic(() => import("@/components/leaflet"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-200" />,
});

export default function Homepage() {
  const [routes, setRoutes] = useState<Lugar[]>(ILOILO_ROUTES);

  const handleToggle = (id: string) => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((route) =>
        route.id === id ? { ...route, active: !route.active } : route,
      ),
    );
  };

  return (
    <section className="text-black text-sm">
      <div className="h-screen w-screen fixed ">
        <Leaflet routes={routes} />
      </div>

      {/* <div className="fixed bottom-10 left-10">
        <Weather className="bg-white w-100 h-50 rounded-xl p-5 shadow-lg" />
      </div> */}

      <div className="fixed bottom-0 left-0 right-0  m-2 rounded-md shadow-2xl overflow-auto h-60">
        <RouteBar routes={routes} onToggle={handleToggle} />
      </div>
    </section>
  );
}

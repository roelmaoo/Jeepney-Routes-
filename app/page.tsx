"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Weather from "../components/weather";
import RouteBar from "@/components/routebar";
import { ILOILO_ROUTES, Lugar } from "@/data/routes";

const Leaflet = dynamic(() => import("@/components/leaflet"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-100 animate-pulse" />,
});

export default function Homepage() {
  const [routes, setRoutes] = useState<Lugar[]>(ILOILO_ROUTES);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleToggle = (id: string) => {
    setRoutes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    );
  };

  return (
    <section className="relative h-screen w-screen overflow-hidden text-gray-900">
      <div className="absolute inset-0 z-0">
        <Leaflet routes={routes} />
      </div>

      {/* Top Right: Weather & Nav */}
      <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-4">
        <Weather className="w-80 bg-white/95 backdrop-blur border border-gray-200 rounded-2xl shadow-sm" />
        <div className="flex gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest bg-white/80 px-4 py-2 rounded-lg border border-gray-200">
          <button className="hover:text-black">About</button>
          <button className="hover:text-black">Help</button>
        </div>
      </div>

      {/* Bottom Drawer: Full Width */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-y-0" : "translate-y-[calc(100%-48px)]"}`}
      >
        <div className="flex justify-center">
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="bg-white border-t border-x border-gray-200 px-8 py-2 rounded-t-2xl shadow-sm hover:bg-gray-50"
          >
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-gray-400"
            >
              {/* isDrawerOpen === true (Drawer is visible): Arrow should point DOWN
      isDrawerOpen === false (Drawer is hidden): Arrow should point UP
    */}
              <path d={isDrawerOpen ? "M2 3L10 11 18 3" : "M18 9L10 1 2 9"} />
            </svg>
          </button>
        </div>

        {/* Drawer Content - Full Width Grid */}
        <div className="bg-white border-t border-gray-200 h-72 shadow-2xl overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Transport Routes
                </h2>
                <p className="text-sm text-gray-500">
                  Toggle active routes to display on the map
                </p>
              </div>
              <span className="text-sm font-semibold text-gray-400">
                {routes.length} Available Routes
              </span>
            </div>

            {/* Full Width container for RouteBar */}
            <div className="w-full">
              <RouteBar routes={routes} onToggle={handleToggle} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

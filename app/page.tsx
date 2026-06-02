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
      {/* Map Layer */}
      <div className="absolute inset-0 z-0">
        <Leaflet routes={routes} />
      </div>

      {/* Top Left: Copyright UI */}
      <div className="absolute top-6 left-6 z-20">
        <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm text-[10px] font-medium text-gray-400 uppercase tracking-wider">
          © 2026 Iloilo Transit
        </div>
      </div>

      {/* Top Right: Weather Only */}
      <div className="absolute top-6 right-6 z-20">
        <Weather className="w-80 bg-white/95 backdrop-blur border border-gray-200 rounded-2xl shadow-sm" />
      </div>

      {/* Bottom Drawer: Routes */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-y-0" : "translate-y-[calc(100%-48px)]"}`}
      >
        {/* Toggle Handle */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="bg-white border-t border-x border-gray-200 px-8 py-2 rounded-t-2xl shadow-sm hover:bg-gray-50 transition-colors"
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
              <path d={isDrawerOpen ? "M2 3L10 11 18 3" : "M18 9L10 1 2 9"} />
            </svg>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="bg-white border-t border-gray-200 h-80 shadow-2xl overflow-y-auto">
          <div className="p-8 w-full">
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Transport Network
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Iloilo City Public Transit System
                </p>
              </div>
              {/* Stats Summary */}
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Active
                  </p>
                  <p className="text-lg font-bold">
                    {routes.filter((r) => r.active).length}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Total
                  </p>
                  <p className="text-lg font-bold">{routes.length}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions / Search Bar Placeholder */}
            <div className="mb-8 flex gap-2">
              <input
                type="text"
                placeholder="Search routes..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
                Reset
              </button>
            </div>

            {/* Main List */}
            <div className="w-full">
              <RouteBar routes={routes} onToggle={handleToggle} />
            </div>

            {/* Footer Attribution */}
            <div className="mt-12 pt-6 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest">
              <p>Data last updated: June 2026</p>
              <p>Source: LTO Iloilo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

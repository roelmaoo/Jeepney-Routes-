"use client";

import dynamic from "next/dynamic";

//page imports
import Weather from "../components/weather";
import RouteBar from "@/components/routebar";

const Leaflet = dynamic(() => import("../components/leaflet"), {
  ssr: false,
  loading: () => <p>Loading Map...</p>, // Optional: what to show while it's loading
});

export default function Homepage() {
  return (
    <>
      <section className="text-black text-sm">
        <div className="h-screen w-screen fixed">
          <Leaflet />
        </div>

        <div className="fixed bottom-10 left-10">
          <Weather />
        </div>

        <div className="fixed right-10 top-10 bottom-10">
          <RouteBar />
        </div>
      </section>
    </>
  );
}

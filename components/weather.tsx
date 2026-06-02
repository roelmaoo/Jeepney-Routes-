"use client";

import { useEffect, useState } from "react";

export default function Weather({ className }: { className?: string }) {
  interface WeatherResponse {
    current: {
      time: string;
      temperature_2m: number;
    };
  }

  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=10.7202&longitude=122.5621&current=temperature_2m&timezone=Asia%2FManila",
        );
        const data = await response.json();
        if (!data.error) setWeatherData(data);
      } catch (error) {
        console.error("Network Error:", error);
      }
    };
    fetchData();
  }, []);

  const formatLocalTime = (isoString?: string) => {
    if (!isoString) return "--:--";
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-PH", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm ${className}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Iloilo City</h2>
          <p className="text-sm text-gray-500 font-medium">Philippines</p>
        </div>
        <div className="bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
            {formatLocalTime(weatherData?.current.time)}
          </span>
        </div>
      </div>

      <div className="mt-8 flex items-baseline gap-1">
        <span className="text-6xl font-extrabold tracking-tighter text-gray-900">
          {weatherData ? Math.round(weatherData.current.temperature_2m) : "--"}
        </span>
        <span className="text-3xl font-light text-gray-400">°C</span>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <p className="text-sm font-medium">Live Data</p>
        </div>
      </div>
    </div>
  );
}

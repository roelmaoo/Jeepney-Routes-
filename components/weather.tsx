"use client";

import { useEffect, useState } from "react";

export default function Weather({ className }: { className?: string }) {
  // 1. Updated interface to match Open-Meteo's JSON response format
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
        // Open-Meteo endpoint with Iloilo's coordinates. No API key needed!
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=10.7202&longitude=122.5621&current=temperature_2m",
        );

        const data = await response.json();

        if (data.error) {
          console.log("API Error:", data.reason);
        } else {
          setWeatherData(data);
        }
      } catch (error) {
        console.log("Network Error:", error);
      }
    };

    fetchData();
  }, []);

  const formatLocalTime = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            xmlns="https://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-sun text-yellow-400"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
            <path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" />
            <path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
            <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
            <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
            <path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" />
            <path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
            <path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
            <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.783z" />
          </svg>

          <div className="flex flex-col leading-4">
            <p className="text-xl font-semibold">Iloilo City, Iloilo</p>
            <p className="text-[#686868]">Philippines</p>
          </div>
        </div>

        <div>
          <p className="text-4xl font-semibold">
            {weatherData
              ? Math.round(weatherData.current.temperature_2m)
              : "--"}
            °
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Time: {formatLocalTime(weatherData?.current.time)}
      </p>
    </div>
  );
}

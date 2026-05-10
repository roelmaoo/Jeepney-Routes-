"use client";

import { useState, useEffect } from "react";

export default function Weather() {
  interface WeatherResponse {
    location: {
      name: string;
      region: string;
      localtime: string;
      country: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
      };
    };
  }

  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const weatherAPIkey = process.env?.NEXT_PUBLIC_WEATHER_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${weatherAPIkey}&q=iloilo&aqi=no`,
        );

        const data = await response.json();

        if (data.error) {
          console.log("API Error:", data.error.message);
        } else {
          setWeatherData(data);
        }
      } catch (error) {
        console.log("Network Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white w-100 h-50 rounded-xl p-5 shadow-lg flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
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
            <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
          </svg>

          <div className="flex flex-col leading-4">
            <p className="text-xl font-semibold">
              {weatherData?.location.region}, {weatherData?.location.name}
            </p>
            <p className="text-[#686868]">{weatherData?.location.country}</p>
          </div>
        </div>

        <div>
          <p className="text-4xl font-semibold">
            {weatherData?.current.temp_c}°
          </p>
        </div>
      </div>
      <p>{weatherData?.location.localtime}</p>
      <p>test</p>
    </div>
  );
}

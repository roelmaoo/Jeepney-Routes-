"use client";

import { FormEvent, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Weather from "../components/weather";
import RouteBar from "@/components/routebar";
import { ILOILO_PLACES, ILOILO_ROUTES, Lugar, PlaceSuggestion } from "@/data/routes";

const Leaflet = dynamic(() => import("@/components/leaflet"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-zinc-100" />,
});

const normalize = (value: string) => value.trim().toLowerCase();

export default function Homepage() {
  const [routes, setRoutes] = useState<Lugar[]>(ILOILO_ROUTES);
  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceSuggestion | null>(null);

  const searchTerm = normalize(query);

  const matchingPlaces = useMemo(() => {
    if (!searchTerm) return ILOILO_PLACES.slice(0, 4);

    return ILOILO_PLACES.filter((place) => {
      const searchable = [
        place.label,
        place.area,
        place.description,
        ...place.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(searchTerm);
    }).slice(0, 5);
  }, [searchTerm]);

  const matchingRouteIds = useMemo(() => {
    const ids = new Set<string>();

    if (selectedPlace) {
      selectedPlace.routeIds.forEach((id) => ids.add(id));
      return Array.from(ids);
    }

    if (!searchTerm) return [];

    matchingPlaces.forEach((place) => place.routeIds.forEach((id) => ids.add(id)));
    routes.forEach((route) => {
      const searchable = `${route.name} ${route.description}`.toLowerCase();
      if (searchable.includes(searchTerm)) ids.add(route.id);
    });

    return Array.from(ids);
  }, [matchingPlaces, routes, searchTerm, selectedPlace]);

  const orderedRoutes = useMemo(() => {
    if (!matchingRouteIds.length) return routes;

    const priority = new Set(matchingRouteIds);
    return [...routes].sort((a, b) => Number(priority.has(b.id)) - Number(priority.has(a.id)));
  }, [matchingRouteIds, routes]);

  const activeCount = routes.filter((route) => route.active).length;

  const setActiveRoutes = (routeIds: string[]) => {
    const activeIds = new Set(routeIds);
    setRoutes((prev) => prev.map((route) => ({ ...route, active: activeIds.has(route.id) })));
  };

  const handleToggle = (id: string) => {
    setRoutes((prev) =>
      prev.map((route) => (route.id === id ? { ...route, active: !route.active } : route)),
    );
  };

  const handlePlaceSelect = (place: PlaceSuggestion) => {
    setSelectedPlace(place);
    setQuery(place.label);
    setActiveRoutes(place.routeIds);
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (matchingPlaces.length) {
      handlePlaceSelect(matchingPlaces[0]);
      return;
    }

    if (matchingRouteIds.length) setActiveRoutes(matchingRouteIds);
  };

  const handleReset = () => {
    setQuery("");
    setSelectedPlace(null);
    setRoutes((prev) => prev.map((route) => ({ ...route, active: false })));
  };

  return (
    <main className="relative h-dvh w-screen overflow-hidden overscroll-none bg-zinc-950 text-zinc-950">
      <div className="absolute inset-0 z-0">
        <Leaflet routes={routes} />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_top_left,rgba(24,24,27,0.12),transparent_35%),linear-gradient(to_top,rgba(24,24,27,0.2),transparent_45%)]" />

      <section className="absolute inset-x-3 bottom-3 z-30 max-h-[86dvh] overflow-hidden rounded-[2rem] border border-white/60 bg-white/90 shadow-2xl shadow-zinc-950/20 backdrop-blur-2xl md:inset-y-4 md:left-4 md:right-auto md:w-[430px] md:max-h-none">
        <div className="flex h-full max-h-[86dvh] flex-col md:max-h-none">
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-zinc-300 md:hidden" />

          <div className="space-y-5 border-b border-zinc-200/80 p-4 pb-5 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Iloilo Jeepney Routes
                </div>
                <h1 className="mt-3 text-2xl font-black tracking-[-0.04em] text-zinc-950 sm:text-3xl">
                  Find the jeepney for your next stop.
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  Search a place in Iloilo and we&apos;ll highlight suggested routes on the map.
                </p>
              </div>
              <div className="hidden shrink-0 sm:block">
                <Weather className="w-28 rounded-3xl p-3 shadow-none [&_h2]:text-sm [&_p]:text-xs [&_.mt-8]:mt-3 [&_.mt-6]:mt-3 [&_.pt-6]:pt-3 [&_span.text-6xl]:text-3xl [&_span.text-3xl]:text-lg" />
              </div>
            </div>

            <form onSubmit={handleSearch} className="rounded-[1.6rem] border border-zinc-200 bg-white p-2 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-zinc-950 text-white">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m21 21-4.3-4.3m1.3-5.2a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setSelectedPlace(null);
                  }}
                  placeholder="Search Molo, Mohon, City Proper..."
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-zinc-950 outline-none placeholder:text-zinc-400"
                />
                <button
                  type="submit"
                  className="rounded-2xl bg-zinc-100 px-3 py-2 text-xs font-bold text-zinc-700 transition hover:bg-zinc-200"
                >
                  Go
                </button>
              </div>
            </form>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-3xl border border-zinc-200 bg-white p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">Routes</p>
                <p className="mt-1 text-xl font-black">{routes.length}</p>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-white p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">Active</p>
                <p className="mt-1 text-xl font-black">{activeCount}</p>
              </div>
              <button
                onClick={handleReset}
                className="rounded-3xl border border-zinc-950 bg-zinc-950 p-3 text-left text-white transition hover:bg-zinc-800"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">Reset</p>
                <p className="mt-1 text-sm font-black">Clear map</p>
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
            <div className="mb-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">
                    {searchTerm ? "Place matches" : "Popular places"}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-500">Tap a place to view jeepney suggestions.</p>
                </div>
              </div>

              {matchingPlaces.length ? (
                <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:overflow-visible">
                  {matchingPlaces.map((place) => (
                    <button
                      key={place.id}
                      onClick={() => handlePlaceSelect(place)}
                      className={`min-w-[220px] rounded-3xl border p-4 text-left transition active:scale-[0.99] md:min-w-0 ${
                        selectedPlace?.id === place.id
                          ? "border-zinc-950 bg-zinc-950 text-white"
                          : "border-zinc-200 bg-white hover:border-zinc-400"
                      }`}
                    >
                      <p className="text-sm font-black tracking-tight">{place.label}</p>
                      <p className={selectedPlace?.id === place.id ? "mt-1 text-xs text-zinc-300" : "mt-1 text-xs text-zinc-500"}>
                        {place.area}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {place.routeIds.map((routeId) => {
                          const route = routes.find((item) => item.id === routeId);
                          return (
                            <span
                              key={routeId}
                              className="rounded-full px-2 py-1 text-[10px] font-bold"
                              style={{
                                backgroundColor: selectedPlace?.id === place.id ? "rgba(255,255,255,0.12)" : `${route?.color}18`,
                                color: selectedPlace?.id === place.id ? "white" : route?.color,
                              }}
                            >
                              Route {routeId}
                            </span>
                          );
                        })}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-4 text-sm text-zinc-500">
                  No place match yet. Try “Molo”, “Mohon”, “Villa”, or “City Proper”.
                </div>
              )}
            </div>

            {selectedPlace && (
              <div className="mb-5 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
                <p className="font-black">Suggested for {selectedPlace.label}</p>
                <p className="mt-1 text-emerald-800">{selectedPlace.description}</p>
              </div>
            )}

            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-[0.16em] text-zinc-400">
                Jeepney routes
              </h2>
              {matchingRouteIds.length > 0 && (
                <button
                  onClick={() => setActiveRoutes(matchingRouteIds)}
                  className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-bold text-zinc-700 hover:bg-zinc-200"
                >
                  Show suggested
                </button>
              )}
            </div>
            <RouteBar
              routes={orderedRoutes}
              onToggle={handleToggle}
              recommendedRouteIds={matchingRouteIds}
            />

            <p className="px-1 pb-3 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Prototype route data. Verify signage and terminal updates before riding.
            </p>
          </div>
        </div>
      </section>

      <div className="absolute right-3 top-3 z-20 hidden rounded-full border border-white/70 bg-white/90 px-4 py-2 text-xs font-bold text-zinc-500 shadow-lg backdrop-blur-xl md:block">
        © 2026 Iloilo Transit
      </div>
    </main>
  );
}

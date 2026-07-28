"use client";

import { FormEvent, useMemo, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import RouteBar from "@/components/routebar";
import { ILOILO_PLACES, ILOILO_ROUTES, Lugar, PlaceSuggestion } from "@/data/routes";
import { cn } from "@/lib/utils";

const Leaflet = dynamic(() => import("@/components/leaflet"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse bg-muted" />
  ),
});

const normalize = (value: string) => value.trim().toLowerCase();

export default function Homepage() {
  const [routes, setRoutes] = useState<Lugar[]>(ILOILO_ROUTES);
  const [query, setQuery] = useState("");
  const [selectedPlace, setSelectedPlace] = useState<PlaceSuggestion | null>(
    null
  );
  const [drawerOpen, setDrawerOpen] = useState(true);

  const searchTerm = normalize(query);

  const matchingPlaces = useMemo(() => {
    if (!searchTerm) return ILOILO_PLACES.slice(0, 6);

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
    }).slice(0, 8);
  }, [searchTerm]);

  const matchingRouteIds = useMemo(() => {
    const ids = new Set<string>();

    if (selectedPlace) {
      selectedPlace.routeIds.forEach((id) => ids.add(id));
      return Array.from(ids);
    }

    if (!searchTerm) return [];

    matchingPlaces.forEach((place) =>
      place.routeIds.forEach((id) => ids.add(id))
    );
    routes.forEach((route) => {
      const searchable = `${route.name} ${route.shortName} ${route.description}`.toLowerCase();
      if (searchable.includes(searchTerm)) ids.add(route.id);
    });

    return Array.from(ids);
  }, [matchingPlaces, routes, searchTerm, selectedPlace]);

  const orderedRoutes = useMemo(() => {
    if (!matchingRouteIds.length) return routes;

    const priority = new Set(matchingRouteIds);
    return [...routes].sort(
      (a, b) => Number(priority.has(b.id)) - Number(priority.has(a.id))
    );
  }, [matchingRouteIds, routes]);

  const activeCount = routes.filter((route) => route.active).length;

  const setActiveRoutes = useCallback((routeIds: string[]) => {
    const activeIds = new Set(routeIds);
    setRoutes((prev) =>
      prev.map((route) => ({ ...route, active: activeIds.has(route.id) }))
    );
  }, []);

  const handleToggle = useCallback((id: string) => {
    setRoutes((prev) =>
      prev.map((route) =>
        route.id === id ? { ...route, active: !route.active } : route
      )
    );
  }, []);

  const handlePlaceSelect = useCallback(
    (place: PlaceSuggestion) => {
      setSelectedPlace(place);
      setQuery(place.label);
      setActiveRoutes(place.routeIds);
    },
    [setActiveRoutes]
  );

  const handleSearch = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (matchingPlaces.length) {
        handlePlaceSelect(matchingPlaces[0]);
        return;
      }

      if (matchingRouteIds.length) setActiveRoutes(matchingRouteIds);
    },
    [matchingPlaces, matchingRouteIds, handlePlaceSelect, setActiveRoutes]
  );

  const handleReset = useCallback(() => {
    setQuery("");
    setSelectedPlace(null);
    setRoutes((prev) => prev.map((route) => ({ ...route, active: false })));
  }, []);

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-background">
      {/* Map */}
      <div className="absolute inset-0 z-0">
        <Leaflet routes={routes} />
      </div>

      {/* Toggle button - always visible */}
      <button
        onClick={() => setDrawerOpen((prev) => !prev)}
        className={cn(
          "absolute z-40 flex items-center justify-center rounded-md border border-border bg-card shadow-sm transition-all hover:bg-accent",
          drawerOpen
            ? "right-3 top-3 h-9 w-9 md:right-auto md:left-[419px] md:top-4"
            : "left-3 top-3 h-9 w-9"
        )}
        aria-label={drawerOpen ? "Close drawer" : "Open drawer"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "transition-transform",
            drawerOpen ? "rotate-180 md:rotate-0" : ""
          )}
        >
          {drawerOpen ? (
            <>
              {/* X icon on mobile, chevron-left on desktop */}
              <path d="M18 6L6 18M6 6l12 12" className="md:hidden" />
              <path d="M15 18l-6-6 6-6" className="hidden md:block" />
            </>
          ) : (
            <>
              {/* Menu icon */}
              <path d="M4 6h16M4 12h16M4 18h16" />
            </>
          )}
        </svg>
      </button>

      {/* Copyright badge */}
      <div
        className={cn(
          "absolute top-3 z-20 hidden rounded-md border border-border bg-card/90 px-3 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur-sm md:block",
          drawerOpen ? "left-[430px]" : "left-14"
        )}
      >
        © 2026 Iloilo Transit
      </div>

      {/* Drawer */}
      <section
        className={cn(
          "absolute z-30 bg-card shadow-xl drawer-transition",
          // Mobile: bottom sheet
          "inset-x-0 bottom-0 max-h-[75dvh] md:max-h-none md:inset-x-auto md:inset-y-0 md:left-0 md:right-auto md:w-[420px] md:bottom-auto",
          // Slide animation
          drawerOpen
            ? "translate-y-0"
            : "translate-y-full md:translate-y-0 md:-translate-x-full"
        )}
      >
        <div className="flex h-full max-h-[75dvh] flex-col md:max-h-dvh md:border-r md:border-border">
          {/* Mobile drag handle */}
          <div className="flex shrink-0 justify-center py-2 md:hidden">
            <div className="h-1 w-10 rounded-full bg-muted-foreground/20" />
          </div>

          {/* Header */}
          <div className="shrink-0 border-b border-border px-4 pb-4 pt-2 md:px-5 md:pt-5">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-primary-foreground">
                J
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Iloilo Jeepney Routes
              </span>
            </div>

            <h1 className="mt-3 text-lg font-bold tracking-tight text-foreground md:text-xl">
              Find your route
            </h1>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              Search a place or landmark to find suggested jeepney routes.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} className="mt-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <svg
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m21 21-4.3-4.3m1.3-5.2a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setSelectedPlace(null);
                    }}
                    placeholder="Search Molo, SM City, La Paz..."
                    className="h-9 w-full rounded-md border border-border bg-background pl-8 pr-3 text-[13px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring"
                  />
                </div>
                <button
                  type="submit"
                  className="h-9 rounded-md bg-primary px-3 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Stats row */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground">Routes</span>
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-bold tabular-nums text-foreground">
                  {routes.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground">Active</span>
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-bold tabular-nums text-foreground">
                  {activeCount}
                </span>
              </div>
              {activeCount > 0 && (
                <button
                  onClick={handleReset}
                  className="ml-auto rounded-md border border-border px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Scrollable content */}
          <div className="min-h-0 flex-1 overflow-y-auto">
            {/* Places section */}
            <div className="border-b border-border px-4 py-3 md:px-5">
              <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {searchTerm ? "Place matches" : "Popular places"}
              </h2>

              {matchingPlaces.length ? (
                <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:flex-wrap">
                  {matchingPlaces.map((place) => (
                    <button
                      key={place.id}
                      onClick={() => handlePlaceSelect(place)}
                      className={cn(
                        "shrink-0 rounded-md border px-2.5 py-1.5 text-left transition-colors",
                        selectedPlace?.id === place.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:border-foreground/20"
                      )}
                    >
                      <p className="whitespace-nowrap text-[12px] font-medium">
                        {place.label}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-[12px] text-muted-foreground">
                  No matches. Try &quot;Molo&quot;, &quot;SM City&quot;, or &quot;La Paz&quot;.
                </p>
              )}

              {/* Selected place info */}
              {selectedPlace && (
                <div className="mt-2.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2">
                  <p className="text-[12px] font-semibold text-emerald-900">
                    {selectedPlace.label}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-emerald-700">
                    {selectedPlace.description}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {selectedPlace.routeIds.map((routeId) => {
                      const route = routes.find((r) => r.id === routeId);
                      return (
                        <span
                          key={routeId}
                          className="rounded-md px-1.5 py-0.5 text-[10px] font-bold text-white"
                          style={{ backgroundColor: route?.color }}
                        >
                          R{routeId}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Routes section */}
            <div className="px-4 py-3 md:px-5">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  All routes ({routes.length})
                </h2>
                {matchingRouteIds.length > 0 && (
                  <button
                    onClick={() => setActiveRoutes(matchingRouteIds)}
                    className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    Show suggested ({matchingRouteIds.length})
                  </button>
                )}
              </div>

              <RouteBar
                routes={orderedRoutes}
                onToggle={handleToggle}
                recommendedRouteIds={matchingRouteIds}
              />
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-3 md:px-5">
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                Route data sourced from the Enhanced Local Public Transport Route
                Plan (ELPTRP) of Iloilo City. Verify signage and terminal
                updates before riding.
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground/60">
                © 2026 Iloilo Transit
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

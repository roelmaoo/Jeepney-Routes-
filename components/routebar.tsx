import { Lugar } from "@/data/routes";

interface RouteBarProps {
  routes: Lugar[];
  onToggle: (id: string) => void;
  recommendedRouteIds?: string[];
}

export default function RouteBar({
  routes,
  onToggle,
  recommendedRouteIds = [],
}: RouteBarProps) {
  const recommended = new Set(recommendedRouteIds);

  return (
    <div className="space-y-3">
      {routes.map((route) => {
        const isRecommended = recommended.has(route.id);

        return (
          <button
            key={route.id}
            onClick={() => onToggle(route.id)}
            className={`group w-full rounded-3xl border p-4 text-left transition-all duration-200 active:scale-[0.99] ${
              route.active
                ? "border-zinc-950 bg-zinc-950 text-white shadow-xl shadow-zinc-950/15"
                : isRecommended
                  ? "border-zinc-300 bg-white shadow-sm hover:border-zinc-500"
                  : "border-zinc-200 bg-white/75 hover:bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className="mt-1 h-3 w-3 shrink-0 rounded-full ring-4 ring-white/60"
                style={{ backgroundColor: route.color }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold leading-snug tracking-tight">
                    {route.name}
                  </p>
                  {isRecommended && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] ${
                        route.active
                          ? "bg-white/15 text-white"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      Suggested
                    </span>
                  )}
                </div>
                <p
                  className={`mt-1 text-xs leading-relaxed ${
                    route.active ? "text-zinc-300" : "text-zinc-500"
                  }`}
                >
                  {route.description}
                </p>
              </div>
              <div
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs font-bold ${
                  route.active
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-zinc-200 bg-zinc-50 text-zinc-500 group-hover:text-zinc-950"
                }`}
                aria-hidden="true"
              >
                {route.active ? "✓" : "+"}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

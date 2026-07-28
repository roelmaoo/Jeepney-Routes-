import { Lugar } from "@/data/routes";
import { cn } from "@/lib/utils";

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
    <div className="divide-y divide-border rounded-lg border border-border bg-card">
      {routes.map((route) => {
        const isRecommended = recommended.has(route.id);

        return (
          <button
            key={route.id}
            onClick={() => onToggle(route.id)}
            className={cn(
              "group flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors",
              route.active
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            )}
          >
            {/* Route indicator dot */}
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[11px] font-bold tabular-nums",
                route.active
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "text-white"
              )}
              style={{
                backgroundColor: route.active
                  ? undefined
                  : route.color,
              }}
            >
              {route.id}
            </div>

            {/* Route info */}
            <div className="min-w-0 flex-1">
              <p
                className={cn(
                  "text-[13px] font-semibold leading-tight",
                  route.active ? "text-primary-foreground" : "text-foreground"
                )}
              >
                {route.shortName}
              </p>
              <p
                className={cn(
                  "mt-0.5 truncate text-[11px] leading-snug",
                  route.active
                    ? "text-primary-foreground/60"
                    : "text-muted-foreground"
                )}
              >
                {route.description}
              </p>
            </div>

            {/* Suggested badge */}
            {isRecommended && !route.active && (
              <span className="shrink-0 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                Match
              </span>
            )}

            {/* Toggle indicator */}
            <div
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded border text-[10px]",
                route.active
                  ? "border-primary-foreground/30 bg-primary-foreground text-primary"
                  : "border-border text-muted-foreground group-hover:border-foreground/30"
              )}
            >
              {route.active ? (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}

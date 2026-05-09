import { Lugar } from "@/data/routes";

interface RouteBarProps {
  routes: Lugar[];
  onToggle: (id: string) => void;
}

export default function RouteBar({ routes, onToggle }: RouteBarProps) {
  return (
    <div className="flex flex-col h-full bg-[#f8f8f8] shadow-2xl w-100 rounded-2xl overflow-auto">
      {/* ... (keep your input section) */}
      
      <div className="flex flex-col gap-5 overflow-auto p-5">
        {routes.map((route) => (
          <button
            key={route.id}
            onClick={() => onToggle(route.id)} // This triggers the update!
            className={`flex flex-col text-left cursor-pointer hover:scale-101 transition-all min-h-50 rounded-xl p-5 ${
              route.active ? "bg-white border-2 border-blue-500" : "bg-gray-200"
            }`}
          >
            <p className="text-lg font-semibold">{route.name}</p>
            <p className="text-gray-700">{route.description}</p>
            <p className="text-xs mt-2">Active: {route.active.toString()}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
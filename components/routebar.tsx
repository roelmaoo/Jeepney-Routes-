import { Lugar } from "@/data/routes";

interface RouteBarProps {
  routes: Lugar[];
  onToggle: (id: string) => void;
}

export default function RouteBar({ routes, onToggle }: RouteBarProps) {
  return (
    <div className="flex flex-col h-full bg-[#F3F3F3] shadow-2xl w-100 rounded-2xl overflow-auto">
      <div className="flex flex-col gap-5 overflow-auto p-5">
        {routes.map((route) => (
          <button
            key={route.id}
            tabIndex={-1}
            onClick={() => onToggle(route.id)}
            className={`flex flex-col text-left cursor-pointer hover:outline-2 hover:outline-blue-500 min-h-50 rounded-xl p-5 ${
              route.active ? "bg-blue-300/10 " : "bg-white"
            }`}
          >
            <p className="text-lg ">{route.name}</p>
            <p className="text-gray-700">{route.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

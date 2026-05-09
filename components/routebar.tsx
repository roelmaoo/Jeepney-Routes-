import { ILOILO_ROUTES } from "@/data/routes";

export default function RouteBar() {
  return (
    <div className="flex flex-col h-full bg-[#f8f8f8] shadow-2xl w-100 rounded-2xl overflow-auto">
      <div className="p-5">
        <input
          className="bg-white w-full text-black p-3 pl-5 rounded-full 
            placeholder:text-gray-400 focus:outline-none focus:ring focus:ring-gray-400 focus:border-transparent
            "
          type="text"
          placeholder="Enter Jeepney Name..."
        />
      </div>

      <div
        className="flex flex-col gap-5 overflow-auto p-5 
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-thumb]:bg-gray-400
        [&::-webkit-scrollbar-thumb]:rounded-2xl"
      >
        {ILOILO_ROUTES.map((route) => (
          <div
            key={route.id}
            className="flex flex-col 
          bg-white min-h-50 rounded-xl p-5
            [&::-webkit-scrollbar]:w-0"
          >
            <div
              className="flex flex-col overflow-y-auto gap-5
            [&::-webkit-scrollbar]:w-0"
            >
              <p className="text-lg font-semibold">{route.name}</p>
              <p className="text-gray-700">{route.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Home, BarChart3, Bell } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white shadow-lg h-screen p-5 hidden md:flex flex-col justify-between fixed">
      <div>
        <h1 className="text-2xl font-bold text-blue-700 mb-8">Vyapar AI</h1>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <Home size={18}/> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <BarChart3 size={18}/> Insights
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600">
            <Bell size={18}/> Alerts
          </a>
        </nav>
      </div>
      <p className="text-xs text-gray-400">© 2025 Vyapar AI</p>
    </aside>
  );
}

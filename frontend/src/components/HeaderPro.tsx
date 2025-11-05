import { useEffect, useState } from "react";
import { Menu, Moon, Sun, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  onMenuClick: () => void;
  onSearchChange?: (query: string) => void;
};

export default function HeaderPro({ onMenuClick, onSearchChange }: Props) {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [search, setSearch] = useState("");

  // Apply and remember theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSearch = () => {
    if (onSearchChange) onSearchChange(search);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 transition-colors shadow-sm">
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Mobile menu */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          onClick={onMenuClick}
        >
          <Menu size={20} />
        </button>

        {/* Brand */}
        <h1 className="hidden sm:block text-lg font-bold text-slate-900 dark:text-white transition">
          Vyapar AI
        </h1>

        {/* Search bar with glassmorphic + gradient button */}
        <div className="flex-1 max-w-xl ml-2 flex items-center gap-2 bg-white/50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-full shadow-inner backdrop-blur-md px-3 py-1.5 transition-all focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-blue-500">
          <Input
            type="text"
            placeholder="Search items, lots, expiry, suppliers…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="bg-transparent border-none focus-visible:ring-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
          />
          <Button
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full px-4 hover:from-blue-600 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
          >
            <Search className="w-4 h-4 mr-1" /> Search
          </Button>
        </div>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </Button>

        {/* Avatar menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full outline-none ring-0">
              <Avatar>
                <AvatarImage src="" alt="User" />
                <AvatarFallback>MV</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Logged in as Madhavan</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

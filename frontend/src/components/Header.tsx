import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(false);

  return (
    <header className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Inventory Dashboard</h2>
      <button
        onClick={() => setDark(!dark)}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        {dark ? <Sun size={18}/> : <Moon size={18}/>}
      </button>
    </header>
  );
}

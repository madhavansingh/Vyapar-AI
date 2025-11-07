import { Menu, Search, Mic, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSpeechToText } from "@/components/utils/useSpeechToText";

export default function HeaderPro({
  onMenuClick,
  onSearchChange,
}: {
  onMenuClick: () => void;
  onSearchChange?: (value: string) => void;
}) {
  const [query, setQuery] = useState("");
  const { listening, startListening, stopListening } = useSpeechToText(handleVoiceInput);

  function handleVoiceInput(text: string) {
    if (!text) return;
    let cleaned = text.trim().toLowerCase();

    // 🎙️ Handle phrases like “search bread” or “find milk”
    if (cleaned.startsWith("search ")) cleaned = cleaned.replace("search ", "");
    if (cleaned.startsWith("find ")) cleaned = cleaned.replace("find ", "");

    setQuery(cleaned);
    onSearchChange?.(cleaned);
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange?.(value);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-sm border-b border-slate-200/40 dark:border-slate-800/40 flex flex-wrap items-center justify-between px-4 py-3 gap-3">
      {/* Left — Menu + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-bold text-slate-800 dark:text-white">
          Vyapar AI
        </h1>
      </div>

      {/* Center — Search Bar (Always visible, responsive) */}
      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1 flex-1 sm:flex-none w-full sm:w-72 max-w-lg border border-slate-200/40 dark:border-slate-700/40">
        <Search size={16} className="text-slate-500 dark:text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Search inventory..."
          className="bg-transparent flex-1 px-2 py-1 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 outline-none"
        />
        <button
          onClick={listening ? stopListening : startListening}
          className={`ml-2 p-1.5 rounded-full transition ${
            listening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {listening ? <Loader2 size={16} className="animate-spin" /> : <Mic size={16} />}
        </button>
      </div>

      {/* Right — Tagline */}
      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium sm:block hidden">
        Smarter Business, Simplified.
      </div>
    </header>
  );
}

import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Home, Package, Bell, Settings, X } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  open?: boolean;
  onClose?: () => void;
};

export default function SidebarPro({ open = false, onClose }: Props) {
  const links = [
    { name: "Dashboard", path: "/", icon: <Home size={18} /> },
    { name: "Inventory", path: "/inventory", icon: <Package size={18} /> },
    { name: "Alerts", path: "/alerts", icon: <Bell size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
  ];

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="hidden md:flex fixed top-0 left-0 h-full w-56 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border-r border-slate-200/40 dark:border-slate-800/40 shadow-xl flex-col justify-between p-5 z-30"
      >
        <div>
          <h1 className="text-xl font-bold mb-8 text-slate-800 dark:text-white tracking-tight">
            Vyapar AI
          </h1>
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                    isActive
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/60"
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">&copy; 2025 Vyapar AI</p>
      </motion.aside>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Mobile Drawer */}
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="md:hidden fixed top-0 left-0 h-full w-64 bg-white/85 dark:bg-slate-900/80 backdrop-blur-md border-r border-slate-200/40 dark:border-slate-800/40 shadow-2xl flex flex-col p-5 z-50"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-bold text-slate-800 dark:text-white">Vyapar AI</h1>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/60"
                }`
              }
            >
              {link.icon}
              {link.name}
            </NavLink>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}

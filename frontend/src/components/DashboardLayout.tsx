import { Outlet } from "react-router-dom";
import { useState } from "react";
import SidebarPro from "./SidebarPro";
import HeaderPro from "./HeaderPro";

export default function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Sidebar */}
      <SidebarPro open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 md:ml-56 flex flex-col">
        {/* Header with Search */}
        <HeaderPro
          onMenuClick={() => setMenuOpen(true)}
          onSearchChange={setSearchQuery}
        />

        {/* Page Content — pass searchQuery to each routed component */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
}

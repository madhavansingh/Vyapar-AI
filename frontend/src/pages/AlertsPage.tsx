import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import HeaderPro from "../components/HeaderPro";
import SidebarPro from "../components/SidebarPro";

interface AlertItem {
  id: number;
  itemName: string;
  expiryDate: string;
  daysLeft: number;
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔁 Fetch alerts every 30 seconds
  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/alerts");
      const data = await res.json();
      setAlerts(data.alerts || []);
    } catch (err) {
      console.error("Failed to fetch alerts:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100">
      {/* Sidebar */}
      <SidebarPro
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        alertCount={alerts.length}
      />

      {/* Main Section */}
      <div className="flex-1 md:ml-56 relative">
        <HeaderPro onMenuClick={() => setMenuOpen(true)} />

        <main className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
            <AlertTriangle className="text-orange-500" /> Alerts
          </h1>

          {alerts.length > 0 ? (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className="border-l-4 border-orange-500 bg-orange-50/80 dark:bg-orange-950/40"
                >
                  <CardContent className="p-4">
                    <p className="font-medium">
                      ⚠️ {alert.itemName} expiring in {alert.daysLeft} day
                      {alert.daysLeft !== 1 ? "s" : ""} (
                      {new Date(alert.expiryDate).toLocaleDateString()})
                    </p>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 text-slate-600 dark:text-slate-400">
              ✅ No alerts currently — all items are in good condition.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

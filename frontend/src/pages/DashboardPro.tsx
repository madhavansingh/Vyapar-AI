import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Package, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SidebarPro from "../components/SidebarPro";
import VoiceAssistant from "../components/VoiceAssistant";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  expiry: string;
  createdAt: string;
}

interface AlertItem {
  id: number;
  itemName: string;
  expiryDate: string;
  daysLeft: number;
}

export default function DashboardPro() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  //  Fetch inventory + alerts initially and auto-refresh every 30s
  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAll = async () => {
    await fetchInventory();
    await fetchAlerts();
  };

  const fetchInventory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/inventory");
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/alerts");
      const data = await res.json();
      setAlerts(data.alerts || []);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  };

  const totalItems = items.length;
  const totalStock = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 transition-all duration-500">
      {/* Sidebar */}
      <SidebarPro open={menuOpen} onClose={() => setMenuOpen(false)} alertCount={alerts.length} />

      {/* Main Section */}
      <div className="flex-1 md:ml-56 relative">
        {/* ✅ HeaderPro is handled globally in DashboardLayout — not included here */}

        {/* 📊 Stats Section */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <StatCard icon={<Package />} label="Total Items" value={totalItems} color="from-blue-400 to-blue-600" />
          <StatCard icon={<TrendingUp />} label="Total Stock" value={totalStock} color="from-green-400 to-green-600" />
          <StatCard icon={<AlertTriangle />} label="Expiring Soon" value={alerts.length} color="from-orange-400 to-orange-600" />
        </motion.section>

        {/* 🧾 Tabs Section */}
        <main className="p-6 pb-28">
          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="grid grid-cols-2 bg-white/60 dark:bg-slate-800/60 shadow-md rounded-xl backdrop-blur-md">
              <TabsTrigger value="inventory">📦 Inventory</TabsTrigger>
              <TabsTrigger value="alerts">⚠️ Alerts ({alerts.length})</TabsTrigger>
            </TabsList>

            {/* 📦 Inventory Tab */}
            <TabsContent value="inventory" className="mt-6">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {items.length > 0 ? (
                  items.map((item) => (
                    <Card key={item.id} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md hover:shadow-xl transition-all">
                      <CardContent className="p-5">
                        <h2 className="text-lg font-semibold capitalize">{item.name}</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          Expiry: {item.expiry}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                          Added on {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-slate-500 dark:text-slate-400 col-span-full">
                    No inventory items available.
                  </p>
                )}
              </motion.div>
            </TabsContent>

            {/* ⚠️ Alerts Tab */}
            <TabsContent value="alerts" className="mt-6">
              {alerts.length > 0 ? (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {alerts.map((alertItem) => (
                    <Card
                      key={alertItem.id}
                      className="border-l-4 border-orange-500 bg-orange-50/80 dark:bg-orange-950/40"
                    >
                      <CardContent className="p-4">
                        <p className="font-medium">
                          ⚠️ {alertItem.itemName} expiring in {alertItem.daysLeft} day(s) (
                          {new Date(alertItem.expiryDate).toLocaleDateString()})
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              ) : (
                <p className="text-slate-600 dark:text-slate-400 text-center py-10">
                  ✅ No alerts right now. Your inventory is all good!
                </p>
              )}
            </TabsContent>
          </Tabs>
        </main>

        {/* 🎙️ Voice Assistant Floating Button */}
        <VoiceAssistant />
      </div>
    </div>
  );
}

// 📊 Animated Stat Card Component

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 1, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={`bg-gradient-to-br ${color} text-white shadow-md hover:shadow-2xl transition-all rounded-xl backdrop-blur-md`}
      >
        <CardContent className="p-5 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">{label}</p>
            <motion.h2 className="text-3xl font-bold">{rounded}</motion.h2>
          </div>
          <div className="bg-white/20 p-3 rounded-full">{icon}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}


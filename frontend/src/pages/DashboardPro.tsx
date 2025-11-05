import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Package, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SidebarPro from "../components/SidebarPro";
import HeaderPro from "../components/HeaderPro";
import VoiceAssistant from "../components/VoiceAssistant"; // 👈 NEW: import voice bot

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  expiry: string;
  createdAt: string;
}

export default function DashboardPro() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔹 Fetch inventory
  useEffect(() => {
    fetch("http://127.0.0.1:3000/inventory")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setFilteredItems(data.items || []);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔍 Search function
  const handleSearch = (query: string) => {
    if (!query.trim()) return setFilteredItems(items);
    const result = items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(result);
  };

  const totalItems = filteredItems.length;
  const expiringSoon = filteredItems.filter((i) => i.expiry.includes("2")).length;
  const totalStock = filteredItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 transition-all duration-500">
      {/* Sidebar */}
      <SidebarPro open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main Section */}
      <div className="flex-1 md:ml-56 relative">
        {/* Header */}
        <HeaderPro onMenuClick={() => setMenuOpen(true)} onSearchChange={handleSearch} />

        {/* Stats Section */}
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <StatCard
            icon={<Package />}
            label="Total Items"
            value={totalItems}
            color="from-blue-400 to-blue-600"
          />
          <StatCard
            icon={<TrendingUp />}
            label="Total Stock"
            value={totalStock}
            color="from-green-400 to-green-600"
          />
          <StatCard
            icon={<AlertTriangle />}
            label="Expiring Soon"
            value={expiringSoon}
            color="from-orange-400 to-orange-600"
          />
        </motion.section>

        {/* Tabs Section */}
        <main className="p-6 pb-28"> {/* space for mic button */}
          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="grid grid-cols-2 bg-white/60 dark:bg-slate-800/60 shadow-md rounded-xl backdrop-blur-md">
              <TabsTrigger value="inventory">📦 Inventory</TabsTrigger>
              <TabsTrigger value="alerts">⚠️ Alerts</TabsTrigger>
            </TabsList>

            {/* Inventory Tab */}
            <TabsContent value="inventory" className="mt-6">
              <motion.div
                className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <Card
                      key={item.id}
                      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md hover:shadow-xl transition-all"
                    >
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
                    No matching items found.
                  </p>
                )}
              </motion.div>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="mt-6">
              {expiringSoon > 0 ? (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {filteredItems
                    .filter((i) => i.expiry.includes("2"))
                    .map((alertItem) => (
                      <Card
                        key={alertItem.id}
                        className="border-l-4 border-orange-500 bg-orange-50/80 dark:bg-orange-950/40"
                      >
                        <CardContent className="p-4">
                          <p className="font-medium">
                            ⚠️ {alertItem.name} expiring soon ({alertItem.expiry})
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

// ✅ Stat Card Component
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
        className={`bg-gradient-to-br ${color} text-white shadow-md hover:shadow-2xl transition-all rounded-xl backdrop-blur-md`}
      >
        <CardContent className="p-5 flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">{label}</p>
            <h2 className="text-3xl font-bold">{value}</h2>
          </div>
          <div className="bg-white/20 p-3 rounded-full">{icon}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

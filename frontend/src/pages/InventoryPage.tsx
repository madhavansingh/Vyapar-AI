import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  expiry: string;
  createdAt: string;
}

export default function InventoryPage() {
  const { searchQuery } = useOutletContext<{ searchQuery: string }>();
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/inventory")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .catch((err) => console.error(err));
  }, []);

  const filtered = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">📦 Inventory</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
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
          <p className="text-slate-500 dark:text-slate-400">No matching results.</p>
        )}
      </div>
    </div>
  );
}

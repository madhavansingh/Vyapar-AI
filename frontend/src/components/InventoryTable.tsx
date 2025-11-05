import { useEffect, useState } from "react";

export default function InventoryTable() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:3000/inventory")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []));
  }, []);

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search inventory..."
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md p-2 w-full mb-4 bg-white/70 dark:bg-slate-800/70"
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow"
          >
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Quantity: {item.quantity}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Expiry: {item.expiry}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
  quantity: number;
  expiry: string;
  createdAt: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:3000/inventory");
      const data = await res.json();
      setItems(data.items || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Vyapar AI</h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            + Add Item
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">Inventory Dashboard</h2>

        {loading ? (
          <p className="text-gray-500">Loading inventory...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-600">No items found in inventory.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all border border-gray-100"
              >
                <h3 className="text-lg font-bold text-indigo-700 capitalize">
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-2">
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </p>
                <p className="text-gray-600">
                  Expiry: <span className="font-medium">{item.expiry}</span>
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Added on {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

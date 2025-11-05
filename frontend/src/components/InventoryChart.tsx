import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getInventory } from "../services/api";

export default function InventoryChart() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => { getInventory().then(res => setData(res.items || [])); }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-4 mt-6">
      <h3 className="text-lg font-semibold mb-3">Stock Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#3b82f6" radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

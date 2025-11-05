import { useEffect, useState } from "react";
import { getAlerts } from "../services/api";
import { AlertTriangle } from "lucide-react";

export default function AlertCard() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    getAlerts().then((data) => setAlerts(data.alerts || []));
  }, []);

  if (alerts.length === 0)
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-4 mt-4">
        <p>No near-expiry items 🎉</p>
      </div>
    );

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mt-4">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="text-yellow-600" size={20} />
        <h2 className="font-semibold text-yellow-800">Near Expiry Items</h2>
      </div>
      <ul className="list-disc ml-5 text-sm">
        {alerts.map((a) => (
          <li key={a.id}>
            <span className="font-medium">{a.name}</span> — {a.expiry} (Qty:{" "}
            {a.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from "react";
import { addItem } from "../services/api";
import { Plus } from "lucide-react";

export default function AddItemModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);
  const [expiry, setExpiry] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    await addItem(name, quantity, expiry);
    alert("Item added successfully!");
    setOpen(false);
    setName("");
    setQuantity(0);
    setExpiry("");
  }

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
      >
        <Plus size={18} /> Add Item
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-xl p-6 w-[320px]"
          >
            <h2 className="text-lg font-semibold mb-4">Add New Item</h2>

            <input
              type="text"
              placeholder="Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />
            <input
              type="text"
              placeholder="Expiry (e.g. 3 days)"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

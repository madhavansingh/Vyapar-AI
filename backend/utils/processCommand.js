import fetch from "node-fetch";

// Temporary local DB simulation
let inventory = [
  { id: 1, name: "bread", quantity: 20, expiry: "2025-11-10", createdAt: new Date() },
  { id: 2, name: "milk", quantity: 15, expiry: "2025-11-08", createdAt: new Date() },
];

// Helper: detect command type
export async function processCommand(message) {
  const text = message.toLowerCase();

  // 🧮 Add command
  if (text.includes("add")) {
    const match = text.match(/(\d+)\s*(\w+)/);
    if (match) {
      const quantity = parseInt(match[1]);
      const itemName = match[2];
      const existing = inventory.find((i) => i.name === itemName);
      if (existing) existing.quantity += quantity;
      else
        inventory.push({
          id: inventory.length + 1,
          name: itemName,
          quantity,
          expiry: "2025-12-01",
          createdAt: new Date(),
        });

      return `✅ ${quantity} ${itemName} added to inventory.`;
    }
  }

  // 📦 Check stock command
  if (text.includes("kitna") || text.includes("how much") || text.includes("stock")) {
    const words = text.split(" ");
    const itemName = words.find((w) => inventory.some((i) => i.name === w));
    const found = inventory.find((i) => i.name === itemName);
    if (found) {
      return `📦 You have ${found.quantity} ${found.name} in stock.`;
    } else {
      return `I couldn't find ${itemName} in your inventory.`;
    }
  }

  // ⚠️ Expiry check
  if (text.includes("expiry") || text.includes("expire")) {
    const today = new Date();
    const expiring = inventory.filter(
      (i) => new Date(i.expiry) < new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
    );
    if (expiring.length > 0) {
      return `⚠️ ${expiring.length} items are near expiry: ${expiring
        .map((i) => i.name)
        .join(", ")}.`;
    } else {
      return `✅ All items are fresh, none near expiry.`;
    }
  }

  // Default reply
  return `🤖 I heard "${message}". Please say like “add 10 milk” or “bread kitna hai?”`;
}

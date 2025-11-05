import fetch from "node-fetch";

export async function processCommand(message: string) {
  try {
    console.log("🧠 Processing message:", message);

    // Simple placeholder logic (we'll upgrade this in phase 6.2)
    if (message.toLowerCase().includes("add")) {
      return "✅ Added item to your inventory.";
    } else if (message.toLowerCase().includes("check")) {
      return "📦 You currently have 10 bread in stock.";
    } else {
      return "🤖 I’m still learning! Try saying 'add bread' or 'check milk'.";
    }
  } catch (err) {
    console.error("processCommand error:", err);
    return "⚠️ Vyapar AI faced an error processing your request.";
  }
}

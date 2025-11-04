import axios from "axios";

export const parseCommand = async (inputText: string) => {
  const prompt = `
You are Vyapar AI, an inventory assistant for small shopkeepers in India.
Understand commands in Hindi, Hinglish, or English and output a *single JSON object only*.

Examples:
"10 litre doodh add karo expiry 2 din mein" ->
{ "intent": "add_item", "item": "milk", "quantity": 10, "expiry": "2 days" }

"Kitna stock hai bread ka?" ->
{ "intent": "check_stock", "item": "bread" }

Message:
"${inputText}"
Return only JSON.
`;

  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt,
        stream: false, // 👈 tells Ollama to send one complete JSON block
      },
      { timeout: 60000 } // 60 s timeout to avoid “AI response timeout”
    );

    // Ollama’s reply text lives in response.data.response
    const text = (response.data.response || "").trim();

    // Try to parse JSON; if it fails, wrap the raw text
    try {
      return JSON.parse(text);
    } catch {
      console.log("⚠️ Couldn’t parse JSON, raw output:", text);
      return { intent: "unknown", raw: text };
    }
  } catch (err: any) {
    console.error("❌ Local AI error:", err.message);
    return { intent: "error", error: err.message };
  }
};

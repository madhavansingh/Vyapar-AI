import { Router } from "express";
import { parseCommand } from "../services/aiService";

const router = Router(); // 👈 this line must exist before router.post or router.get

// ✅ Webhook verification (GET)
router.get("/", (req, res) => {
  const verify_token = process.env.WHATSAPP_VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === verify_token) {
    console.log("✅ Webhook verified!");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 📩 Webhook message handling (POST)
router.post("/", async (req, res) => {
  console.log("📩 Incoming message event:", req.body);

  try {
    const messageText =
      req.body?.message || "10 packet milk add karo expiry 3 din me";

    console.log("🗣️ Received message:", messageText);

    // 🧠 AI call wrapped in timeout so it never hangs forever
    const aiResult = await Promise.race([
      parseCommand(messageText),
      new Promise((_resolve, reject) =>
        setTimeout(() => reject(new Error("AI response timeout")), 15000)
      ),
    ]);

    console.log("🧠 AI UNDERSTOOD:", aiResult);

    return res.status(200).json({
      success: true,
      aiResult,
    });
  } catch (error: any) {
    console.error("❌ Error handling webhook:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router; // 👈 don’t delete this line

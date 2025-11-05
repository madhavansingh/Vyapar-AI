import express from "express";
import { processCommand } from "../utils/processCommand";

const router = express.Router();

/**
 * 🧠 Vyapar AI Route
 * Handles text or voice messages sent from the VoiceAssistant (frontend)
 * Example request: { "message": "add 10 bread" }
 */
router.post("/process", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ reply: "⚠️ No message provided." });
    }

    console.log("🎙️ Received message:", message);

    // Process message through AI logic
    const reply = await processCommand(message);

    // Send response back to frontend
    res.json({ reply });
  } catch (error) {
    console.error("❌ Error in /ai/process:", error);
    res.status(500).json({ reply: "⚠️ Error processing request. Please try again." });
  }
});

export default router;

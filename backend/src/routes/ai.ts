import express from "express";
import { processCommand } from "../utils/processCommand";

const router = express.Router();

router.post("/process", async (req, res) => {
  const { message } = req.body;
  console.log("🗣️ Voice command received:", message);

  try {
    const reply = await processCommand(message);
    res.json({ reply });
  } catch (err) {
    console.error("AI processing failed:", err);
    res.status(500).json({ reply: "Error processing request." });
  }
});

export default router;

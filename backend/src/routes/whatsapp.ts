import { Router } from "express";
import { parseCommand } from "../services/aiService";
import prisma from "../utils/db";

const router = Router(); // ✅ must exist before using router.get/post

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
        setTimeout(() => reject(new Error("AI response timeout")), 60000)
      ),
    ]);

    console.log("🧠 AI UNDERSTOOD:", aiResult);

    // ✅ Handle AI intent logic
    let dbResponse: any = null;

    if (aiResult.intent === "add_item") {
      dbResponse = await prisma.inventoryItem.create({
        data: {
          name: aiResult.item || "unknown",
          quantity: aiResult.quantity || 0,
          expiry: aiResult.expiry || "unknown",
        },
      });
      console.log("📦 Item added to inventory:", dbResponse);
    }

    if (aiResult.intent === "check_stock") {
      dbResponse = await prisma.inventoryItem.findFirst({
  where: {
    name: {
      equals: aiResult.item.toLowerCase(),
    },
  },
});



      if (dbResponse) {
        console.log("🔍 Stock found:", dbResponse);
      } else {
        console.log("⚠️ No stock found for", aiResult.item);
      }
    }

    // ✅ Send final response
    return res.status(200).json({
      success: true,
      aiResult,
      dbResponse,
    });
  } catch (error: any) {
    console.error("❌ Error handling webhook:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

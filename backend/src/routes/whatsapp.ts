import { Router } from "express";

const router = Router();

// webhook verify (GET)
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

// webhook event (POST)
router.post("/", (req, res) => {
  console.log("📩 Incoming event:", JSON.stringify(req.body, null, 2));
  res.status(200).send("EVENT_RECEIVED");
});

export default router;

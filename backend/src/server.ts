import express from "express";
import dotenv from "dotenv";
import whatsappRouter from "./routes/whatsapp";
import inventoryRouter from "./routes/inventory"; // ✅ New route import

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" })); // ✅ Needed to parse JSON bodies

// 🧠 Health check
app.get("/", (_, res) => {
  res.send("Vyapar AI backend running ✅");
});

// 🧪 Test route
app.post("/test", (req, res) => {
  console.log("✅ /test route hit with body:", req.body);
  res.json({ received: true, body: req.body });
});

// 📡 WhatsApp AI webhook
app.use("/webhook", whatsappRouter);
console.log("📡 Webhook router mounted at /webhook");

// 📦 Inventory + Alerts API
app.use("/inventory", inventoryRouter);
console.log("📦 Inventory router mounted at /inventory");

// 🚀 Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import cors from "cors";  // ✅ import this

import whatsappRouter from "./routes/whatsapp";
import inventoryRouter from "./routes/inventory";

dotenv.config();

const app = express();

// ✅ FIX: Enable CORS properly
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));

// 🧠 Health check
app.get("/", (_, res) => {
  res.send("Vyapar AI backend running ✅");
});

// 🧪 Test route
app.post("/test", (req, res) => {
  console.log("✅ /test route hit with body:", req.body);
  res.json({ received: true, body: req.body });
});

// 📡 Webhook + Inventory
app.use("/webhook", whatsappRouter);
app.use("/inventory", inventoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

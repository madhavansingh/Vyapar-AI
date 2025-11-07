import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import whatsappRouter from "./routes/whatsapp";
import inventoryRouter from "./routes/inventory";
import aiRouter from "./routes/ai";
import { startExpiryWatcher } from "./utils/checkExpiry";
import alertsRouter from "./routes/alerts";

dotenv.config();

const app = express();

// ✅ Enable CORS for frontend connection
app.use(cors({
  origin: "http://localhost:5173", // your React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Parse JSON requests
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

// 📡 Routers
app.use("/webhook", whatsappRouter);
app.use("/inventory", inventoryRouter);
app.use("/ai", aiRouter); // 🧠 Added this line

// ⏰ Start expiry watcher
startExpiryWatcher();

app.use("/alerts", alertsRouter);

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Vyapar AI Backend running on port ${PORT}`));

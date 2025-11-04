import express from "express";
import dotenv from "dotenv";
import whatsappRouter from "./routes/whatsapp";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

app.use("/webhook", whatsappRouter);

app.get("/", (_, res) => {
  res.send("Vyapar AI backend running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

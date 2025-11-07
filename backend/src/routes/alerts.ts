// 📁 backend/src/routes/alerts.ts
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Get all alerts from database (created by Smart Expiry Watcher)
router.get("/", async (_req, res) => {
  try {
    const alerts = await prisma.alerts.findMany({
      orderBy: { daysLeft: "asc" },
    });
    res.json({ alerts });
  } catch (err) {
    console.error("❌ Error fetching alerts:", err);
    res.status(500).json({ error: "Failed to fetch alerts" });
  }
});

export default router;

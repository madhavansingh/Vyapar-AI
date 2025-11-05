import { Router } from "express";
import prisma from "../utils/db";

const router = Router();

// ✅ 1. Get all inventory items
router.get("/", async (_req, res) => {
  try {
    const items = await prisma.inventoryItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, items });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ 2. Get near-expiry items (<=3 days)
router.get("/alerts", async (_req, res) => {
  try {
    const all = await prisma.inventoryItem.findMany();
    const alerts = all.filter((item) => {
      const match = item.expiry?.match(/\d+/);
      if (!match) return false;
      const days = parseInt(match[0]);
      return days <= 3;
    });
    res.json({ success: true, alerts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ 3. Add new item manually (for testing)
router.post("/add", async (req, res) => {
  try {
    const { name, quantity, expiry } = req.body;
    const item = await prisma.inventoryItem.create({
      data: { name, quantity: Number(quantity), expiry },
    });
    res.json({ success: true, item });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

import { PrismaClient } from "@prisma/client";
import cron from "node-cron";

const prisma = new PrismaClient();

/**
 * Smart Expiry Watcher — runs daily and stores upcoming expiries in Alerts table
 */
export async function startExpiryWatcher() {
  console.log("🕒 Smart Expiry Watcher initialized...");

  // Run every day at 9 AM
  cron.schedule("0 9 * * *", async () => {
    await runExpiryCheck();
  });

  // Run immediately once after startup
  setTimeout(runExpiryCheck, 3000);
}

async function runExpiryCheck() {
  try {
    console.log("⚡ Running expiry check...");

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7); // checks next 7 days

    // 🧾 Find items expiring soon
    const expiringItems = await prisma.inventory.findMany({
      where: {
        expiry: {
          gte: today.toISOString(),
          lte: nextWeek.toISOString(),
        },
      },
    });

    console.log("🧾 Expiring soon:", expiringItems);

    // 🔄 Clear previous alerts
    await prisma.alerts.deleteMany();

    // 💾 Save new alerts to database
    for (const item of expiringItems) {
      await prisma.alerts.create({
        data: {
          itemName: item.name,
          expiryDate: item.expiry,
          daysLeft: Math.ceil(
            (new Date(item.expiry).getTime() - today.getTime()) /
              (1000 * 60 * 60 * 24)
          ),
        },
      });
    }

    console.log(`✅ Alerts updated: ${expiringItems.length} expiring soon.`);
  } catch (err) {
    console.error("❌ Error during expiry check:", err);
  }
}

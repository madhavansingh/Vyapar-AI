import { PrismaClient } from "@prisma/client";
import cron from "node-cron";

const prisma = new PrismaClient();

export async function startExpiryWatcher() {
  console.log("🕒 Smart Expiry Watcher initialized...");

  cron.schedule("0 9 * * *", async () => {
    try {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      const expiringItems = await prisma.inventory.findMany({
        where: {
          expiry: {
            gte: today.toISOString(),
            lte: nextWeek.toISOString(),
          },
        },
      });

      await prisma.alerts.deleteMany();

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

      console.log(
        `✅ Expiry check complete: ${expiringItems.length} items expiring soon.`
      );
    } catch (err) {
      console.error("❌ Error during expiry check:", err);
    }
  });
}

(async () => {
  await new Promise((r) => setTimeout(r, 3000));
  console.log("⚡ Running initial expiry check manually...");
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const expiringItems = await prisma.inventory.findMany({
    where: {
      expiry: {
        gte: today.toISOString(),
        lte: nextWeek.toISOString(),
      },
    },
  });

  console.log("🧾 Expiring soon:", expiringItems);
})();

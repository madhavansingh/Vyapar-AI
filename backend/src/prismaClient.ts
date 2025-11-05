import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected to database");
  } catch (err) {
    console.error("❌ Error connecting to database:", err);
  }
})();

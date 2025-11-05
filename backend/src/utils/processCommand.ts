import { prisma } from "../prismaClient";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

// Hindi → English mapping for item names
const itemMap: Record<string, string> = {
  "ब्रेड": "bread",
  "ब्रीड": "bread",
  "मिल्क": "milk",
  "लिक": "milk",
  "राइस": "rice",
  "चावल": "rice",
  "दूध": "milk",
  "शुगर": "sugar",
  "चीनी": "sugar",
};

// Parse expiry date (e.g. "10 November", "10 नवंबर")
function parseExpiry(text: string): string | null {
  const match = text.match(/(\d{1,2})\s?(nov|dec|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|नवंबर|दिसंबर|जनवरी|फरवरी|मार्च|अप्रैल|मई|जून|जुलाई|अगस्त|सितंबर|अक्टूबर)/i);
  if (!match) return null;

  const monthMap: Record<string, string> = {
    "nov": "November", "नवंबर": "November",
    "dec": "December", "दिसंबर": "December",
    "jan": "January", "जनवरी": "January",
    "feb": "February", "फरवरी": "February",
    "mar": "March", "मार्च": "March",
    "apr": "April", "अप्रैल": "April",
    "may": "May", "मई": "May",
    "jun": "June", "जून": "June",
    "jul": "July", "जुलाई": "July",
    "aug": "August", "अगस्त": "August",
    "sep": "September", "सितंबर": "September",
    "oct": "October", "अक्टूबर": "October",
  };

  const day = match[1];
  const monthKey = match[2].toLowerCase();
  const month = monthMap[monthKey];
  if (!month) return null;

  const date = dayjs(`${day} ${month} ${new Date().getFullYear()}`, "D MMMM YYYY");
  return date.isValid() ? date.format("YYYY-MM-DD") : null;
}

export async function processCommand(text: string): Promise<string> {
  text = text.toLowerCase().trim();

  // 1️⃣ Identify the item
  const foundItem = Object.keys(itemMap).find((key) => text.includes(key));
  const itemName = foundItem ? itemMap[foundItem] : null;
  if (!itemName) return "❌ कोई वैध आइटम नहीं मिला। (No valid item found)";

  // 2️⃣ Check for quantity
  const quantityMatch = text.match(/(\d+)/);
  const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;

  // 3️⃣ Parse expiry if mentioned
  const expiryDate = parseExpiry(text);

  // 4️⃣ Add item
  if (text.includes("add") || text.includes("एड")) {
    await prisma.inventory.upsert({
      where: { name: itemName },
      update: {
        quantity: { increment: quantity },
        expiry: expiryDate || undefined,
      },
      create: {
        name: itemName,
        quantity,
        expiry: expiryDate || null,
      },
    });

    return expiryDate
      ? `✅ Added ${quantity} unit(s) of ${itemName} with expiry ${dayjs(expiryDate).format("DD MMMM YYYY")}.`
      : `✅ Added ${quantity} unit(s) of ${itemName}.`;
  }

  // 5️⃣ Check stock
  if (text.includes("check") || text.includes("चेक")) {
    const item = await prisma.inventory.findUnique({ where: { name: itemName } });
    if (!item) return `❌ No stock found for ${itemName}.`;

    return item.expiry
      ? `📦 ${itemName} stock: ${item.quantity} unit(s), expiry on ${dayjs(item.expiry).format("DD MMMM YYYY")}.`
      : `📦 ${itemName} stock: ${item.quantity} unit(s), expiry not set.`;
  }

  // 6️⃣ Remove quantity
  if (text.includes("घटाओ") || text.includes("remove") || text.includes("minus")) {
    const item = await prisma.inventory.findUnique({ where: { name: itemName } });
    if (!item) return `❌ No item found for ${itemName}.`;

    const newQty = Math.max(item.quantity - quantity, 0);
    await prisma.inventory.update({ where: { name: itemName }, data: { quantity: newQty } });
    return `➖ Removed ${quantity} from ${itemName}. Remaining: ${newQty}.`;
  }

  // 7️⃣ Expiry inquiry
  if (text.includes("expiry") || text.includes("एक्सपायरी")) {
    const item = await prisma.inventory.findUnique({ where: { name: itemName } });
    if (!item) return `❌ No data found for ${itemName}.`;
    return item.expiry
      ? `🕒 ${itemName} expires on ${dayjs(item.expiry).format("DD MMMM YYYY")}.`
      : `ℹ️ No expiry date set for ${itemName}.`;
  }

  // 8️⃣ Report
  if (text.includes("report") || text.includes("रिपोर्ट")) {
    const items = await prisma.inventory.findMany();
    if (!items.length) return "📋 Inventory is empty.";
    return items
      .map(
        (i) =>
          `• ${i.name}: ${i.quantity} unit(s)${i.expiry ? `, expiry ${dayjs(i.expiry).format("DD MMMM")}` : ""}`
      )
      .join("\n");
  }

  return "🤖 I didn’t catch that. Try 'add bread expiry 10 November' or 'check milk expiry'.";
}

import express from "express";
import cors from "cors";
import aiRouter from "./routes/ai.js";
import inventoryRouter from "./routes/inventory.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/inventory", inventoryRouter);
app.use("/ai", aiRouter); // 👈 new route added here

app.listen(3000, () => console.log("🚀 Vyapar AI Backend running on port 3000"));

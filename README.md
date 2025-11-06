# 🧠 Vyapar AI — Intelligent Voice-Powered Inventory & Supply Management  

Vyapar AI is a next-generation **AI-powered business assistant** that transforms how shop owners, distributors, and retailers manage their inventory.  
It enables **voice-based inventory control, expiry tracking, WhatsApp automation, and smart QR dashboards**, all through natural conversation.  

---

## 🌍 Vision  
To empower small and medium-scale businesses with an **AI assistant that understands human language**, simplifies stock management, prevents waste, and promotes **sustainability and smart commerce**.  

---

## 💡 Core Features  

### 🎙️ 1. Voice-Powered Inventory Management  
- Add, update, or check stock using **natural voice commands** in Hindi, Hinglish, or English.  
- Example:  
  > “Add 20 milk packets expiry 15 November”  
  > “Check bread stock”  
  > “Reduce 5 rice packets”  

### 📦 2. Real-Time Inventory Intelligence  
- Automatically updates stock in real-time.  
- Displays total items, expiring soon, and total stock on an intuitive dashboard.  
- Voice confirmation and AI response for every action.  

### 🧠 3. Smart AI Understanding  
- AI parses voice into structured actions.  
- Detects commands like **Add**, **Check**, **Reduce**, or **Report**.  
- Learns user habits and builds personalized insights.  

### ⏰ 4. Smart Expiry Management  
- Tracks expiry dates for all products.  
- Alerts users when items are nearing expiration.  
- Suggests actions like discounts, donations, or wholesale redirection.  

### 🧾 5. Voice + WhatsApp Automation *(Phase 7)*  
- Manage stock directly from **WhatsApp messages or voice notes**.  
- Send: “Add 10 bread expiry tomorrow” → AI updates instantly.  
- Automatic WhatsApp replies with inventory status or reports.  

### 🧭 6. QR Code Dashboard *(Phase 8)*  
- Every business gets a **unique QR code**.  
- Scanning the QR displays a real-time inventory dashboard.  
- Ideal for retailers, NGOs, and buyers to check stock availability instantly.  

### 🌱 7. Sustainable Business Chain  
- Connects near-expiry inventory to:  
  - **NGOs** for food redistribution  
  - **Bhandaras & Gurudwaras** for donations  
  - **Wholesale buyers** for discounted sales  
- Turns potential waste into **social impact and revenue**.  

---

## 🧩 Technical Architecture  

### 🏗️ System Workflow
1. **User speaks** to Vyapar AI or sends a voice note on WhatsApp.  
2. The **voice is transcribed** to text via Web Speech / API.  
3. Vyapar AI processes the intent using **NLP & Llama/OpenAI** models.  
4. The **backend (Express + Prisma)** performs corresponding database actions.  
5. The system **responds via voice and text** with updated inventory details.  

---

## ⚙️ Tech Stack  

| Layer | Technology |
|-------|-------------|
| 🎨 Frontend | React + TypeScript + Tailwind + ShadCN UI |
| 🧠 AI Layer | Llama / OpenAI (Multilingual Voice Understanding) |
| 🗄️ Backend | Node.js (Express) + Prisma ORM |
| 💾 Database | SQLite (Local) / PostgreSQL (Cloud) |
| 🔊 Voice | Web Speech API (STT & TTS) |
| 💬 Automation | WhatsApp Business API (Phase 7) |
| 🧾 QR System | Dynamic QR via API (Phase 8) |

---

## 🧱 Database Design  

**Table: Inventory**

| Field | Type | Description |
|--------|------|-------------|
| id | Int | Primary key |
| name | String (unique) | Item name |
| quantity | Int | Number of units |
| expiry | String | Expiry date (optional) |
| createdAt | DateTime | Date added |

---

## 🚀 Project Roadmap  

### **Phase 1:**  
🔹 Setup backend and frontend structure for Vyapar AI.  

### **Phase 2:**  
🔹 Integrate offline AI (Llama) for local natural language understanding.  

### **Phase 3:**  
🔹 Add Prisma + SQLite integration.  
🔹 Enable structured inventory storage and retrieval.  

### **Phase 4:**  
🔹 Build Inventory and Smart Expiry Alert APIs.  

### **Phase 5:**  
🔹 Connect backend APIs with frontend dashboard.  
🔹 Display inventory data and alerts dynamically.  

### **Phase 6 – AI Integration:**  
✅ **6.1:** Voice input + AI response integration.  
✅ **6.2:** Full voice inventory commands (Add, Check, Reduce, Expiry).  
🔹 **6.3 (Upcoming):** Auto-expiry alerts & daily voice summaries.  

### **Phase 7 – WhatsApp Automation:**  
🔹 Connect WhatsApp Business API for command input and AI replies.  

### **Phase 8 – QR Dashboard:**  
🔹 Generate personalized QR codes linking to real-time inventory dashboards.  

### **Phase 9 – Smart Insights (Future):**  
🔹 Predictive AI analytics for restock suggestions and sales trends.  

---

## 🧠 Example Voice Commands  

| Command | Action |
|----------|--------|
| “Add 10 bread expiry 10 December” | Adds 10 bread with expiry |
| “Reduce 5 milk” | Decreases milk stock |
| “Check rice stock” | Displays quantity of rice |
| “Show expiry items” | Lists all items near expiry |
| “Give report” | Reads out complete stock summary |

---

## 🪄 Key Benefits  

### For Shop Owners  
- Manage stock hands-free via voice or WhatsApp.  
- Never miss expiry dates again.  
- Real-time insights in your local language.  

### For Communities  
- Reduce food and product waste.  
- Support NGOs and religious institutions with surplus items.  

### For Environment  
- Promote sustainable commerce through smart redistribution.  

---

## 💬 Example Conversation  

> 🧑‍💼: “Add 20 milk packets expiry 15 November”  
>  
> 🤖 Vyapar AI: “✅ Added 20 unit(s) of milk expiring on 15 November.”  
>  
> 🧑‍💼: “Check expiry for milk.”  
>  
> 🤖 Vyapar AI: “🕒 20 milk packets expiring on 15 November.”  

---

## 🧠 Project Goals  

- Eliminate manual inventory tracking.  
- Make AI accessible to small shop owners.  
- Build an ecosystem that combines **AI, sustainability, and commerce**.  

---

## 👨‍💻 Author  

**Madhavan Singh**  
🎓 AIML Engineer | Web Developer | Innovator  
💡 Building smart solutions that bridge AI & real-world business.  

🌐 [GitHub](https://github.com/madhavansingh) • [LinkedIn](https://linkedin.com/in/madhavansingh)  

---

## 🏁 Status  
✅ Phase 6.2 Completed — AI-powered voice commands integrated.  
🚧 Next: Phase 6.3 – Auto-Expiry Alerts (AI monitoring & voice notifications).  

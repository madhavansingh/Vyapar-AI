import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function ChatButton() {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg"
      onClick={() => alert("Chat with Vyapar AI coming soon! 🤖")}
    >
      <MessageSquare size={22} />
    </motion.button>
  );
}

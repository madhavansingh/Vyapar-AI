import { useState } from "react";
import { Mic, Loader2 } from "lucide-react";
import { useSpeechToText } from "@/components/utils/useSpeechToText";
import { useTextToSpeech } from "@/components/utils/useTextToSpeech";
import { Button } from "@/components/ui/button";

export default function VoiceAssistant() {
  const [aiResponse, setAiResponse] = useState("");
  const { speak } = useTextToSpeech();

  const handleVoiceInput = async (text: string) => {
    console.log("User said:", text);
    setAiResponse("Processing...");
    try {
      // Send voice text to backend AI route
      const res = await fetch("http://127.0.0.1:3000/ai/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setAiResponse(data.reply);
      speak(data.reply); // 🔊 AI replies with voice
    } catch (err) {
      setAiResponse("Error processing request.");
    }
  };

  const { listening, startListening, stopListening } = useSpeechToText(
    handleVoiceInput
  );

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-center gap-3 z-50">
      <Button
        onClick={listening ? stopListening : startListening}
        className={`rounded-full w-16 h-16 flex items-center justify-center text-white shadow-lg ${
          listening ? "bg-red-500 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {listening ? <Loader2 className="animate-spin" /> : <Mic size={28} />}
      </Button>
      {aiResponse && (
        <p className="text-sm bg-white/80 dark:bg-slate-800/80 px-3 py-1 rounded-md shadow-md text-slate-700 dark:text-slate-300">
          {aiResponse}
        </p>
      )}
    </div>
  );
}

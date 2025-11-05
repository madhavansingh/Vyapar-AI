import { useState } from "react";

export function useSpeechToText(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const recognition =
    typeof window !== "undefined"
      ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "hi-IN"; // You can change to "en-IN" or "auto"
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      onResult(text);
    };
    recognition.onerror = (err) => console.error("Speech error:", err);
  }

  const startListening = () => {
    setListening(true);
    recognition?.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition?.stop();
  };

  return { listening, startListening, stopListening };
}

import { useState, useEffect, useRef } from "react";

// Hindi → English word map for better recognition
const transliterationMap: Record<string, string> = {
  "ब्रेड": "bread",
  "मिल्क": "milk",
  "दूध": "milk",
  "तेल": "oil",
  "साबुन": "soap",
  "चीनी": "sugar",
  "बिस्किट": "biscuit",
  "चावल": "rice",
  "दाल": "dal",
  "अंडा": "egg",
  "नमक": "salt",
  "मसाला": "spice",
  "बटर": "butter",
  "कॉफी": "coffee",
  "चाय": "tea",
  "पानी": "water",
  "चिप्स": "chips",
  "केला": "banana",
  "सेब": "apple",
};

export function useSpeechToText(onResult: (text: string) => void) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN"; // Hindi but we’ll transliterate to English
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript.trim();
      const converted = transliterate(text);
      console.log("🎙️ Voice Input:", text, "→ Converted:", converted);
      onResult(converted);
    };

    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
  }, [onResult]);

  const startListening = () => {
    if (!recognitionRef.current) return;
    setListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return { listening, startListening, stopListening };
}

// ✅ Simple transliteration: replaces Hindi words with English equivalents
function transliterate(input: string): string {
  let output = input;
  for (const [hindi, english] of Object.entries(transliterationMap)) {
    output = output.replace(new RegExp(hindi, "g"), english);
  }
  return output.toLowerCase();
}

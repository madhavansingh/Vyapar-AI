export function useTextToSpeech() {
  const speak = (text: string, lang = "hi-IN") => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };
  return { speak };
}

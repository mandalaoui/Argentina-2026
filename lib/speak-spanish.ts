function pickSpanishVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang.startsWith("es-AR")) ??
    voices.find((v) => v.lang.startsWith("es-ES")) ??
    voices.find((v) => v.lang.startsWith("es"))
  );
}

export function speakSpanish(text: string): void {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-AR";

  const voice = pickSpanishVoice();
  if (voice) utterance.voice = voice;

  const speak = () => window.speechSynthesis.speak(utterance);

  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", speak, { once: true });
  } else {
    speak();
  }
}

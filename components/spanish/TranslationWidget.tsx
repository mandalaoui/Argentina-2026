"use client";

import { useState } from "react";
import { ArrowLeftRight, Loader2, Volume2 } from "lucide-react";
import Card from "@/components/ui/Card";
import { speakSpanish } from "@/lib/speak-spanish";
import type { TranslateLang } from "@/lib/translate";

type Direction = "he-to-es" | "es-to-he";

const directionLabels: Record<Direction, string> = {
  "he-to-es": "עברית → ספרדית",
  "es-to-he": "ספרדית → עברית",
};

function directionToLangs(direction: Direction): { from: TranslateLang; to: TranslateLang } {
  return direction === "he-to-es"
    ? { from: "he", to: "es" }
    : { from: "es", to: "he" };
}

export default function TranslationWidget() {
  const [text, setText] = useState("");
  const [direction, setDirection] = useState<Direction>("he-to-es");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleDirection = () => {
    setDirection((d) => (d === "he-to-es" ? "es-to-he" : "he-to-es"));
    setResult("");
    setError("");
  };

  const translate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setResult("");

    const { from, to } = directionToLangs(direction);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, from, to }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "התרגום נכשל");
        return;
      }

      setResult(data.translatedText);
    } catch {
      setError("אין חיבור לאינטרנט — נסו שוב מאוחר יותר");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <h2 className="text-lg font-semibold text-navy mb-3">תרגום חופשי</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={direction === "he-to-es" ? "הקלידו טקסט בעברית..." : "Escribí texto en español..."}
        dir={direction === "he-to-es" ? "rtl" : "ltr"}
        rows={3}
        className="w-full rounded-xl border border-argentina-light bg-soft-gray px-3 py-3 text-base text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-argentina/40 resize-none"
      />

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button
          onClick={toggleDirection}
          className="flex items-center gap-1.5 border border-argentina text-argentina px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-argentina-light transition-colors min-h-[44px]"
          aria-label="החלף כיוון תרגום"
        >
          <ArrowLeftRight size={16} aria-hidden="true" />
          {directionLabels[direction]}
        </button>

        <button
          onClick={translate}
          disabled={loading || !text.trim()}
          className="flex items-center gap-1.5 bg-argentina text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-argentina/90 transition-colors min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              מתרגם...
            </>
          ) : (
            "תרגם"
          )}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-3 rounded-xl bg-argentina-light border border-argentina/20 p-3">
          <p className="text-xs text-gray-500 mb-1">תוצאה:</p>
          <div className="flex items-center gap-3">
            <p
              className="text-base font-medium text-navy"
              dir={direction === "he-to-es" ? "ltr" : "rtl"}
            >
              {result}
            </p>
            {direction === "he-to-es" && (
              <button
                type="button"
                onClick={() => speakSpanish(result)}
                className="flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-white text-argentina hover:bg-argentina/10 active:scale-95 transition-all"
                aria-label={`השמע את התרגום ${result}`}
              >
                <Volume2 size={20} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

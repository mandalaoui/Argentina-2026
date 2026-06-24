"use client";

import { Volume2 } from "lucide-react";
import { speakSpanish } from "@/lib/speak-spanish";
import type { Phrase } from "@/data/phrases";

interface PhraseCardProps {
  phrase: Phrase;
}

export default function PhraseCard({ phrase }: PhraseCardProps) {
  const playAudio = () => speakSpanish(phrase.spanish);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-argentina-light bg-white p-4 shadow-sm">
      <div className="flex-1 min-w-0 text-right">
        <p className="text-base font-semibold text-navy leading-snug">
          {phrase.hebrew}
        </p>
        <p className="text-sm text-argentina mt-1 leading-snug" dir="ltr">
          {phrase.spanish}
        </p>
      </div>
      <button
        type="button"
        onClick={playAudio}
        className="flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-argentina-light text-argentina hover:bg-argentina/20 active:scale-95 transition-all"
        aria-label={`השמע את הביטוי ${phrase.spanish}`}
      >
        <Volume2 size={20} aria-hidden="true" />
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Card from "@/components/ui/Card";
import type { Phrase } from "@/data/phrases";

interface PhraseCardProps {
  phrase: Phrase;
}

export default function PhraseCard({ phrase }: PhraseCardProps) {
  const [copied, setCopied] = useState(false);

  const copySpanish = async () => {
    await navigator.clipboard.writeText(phrase.spanish);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="flex flex-col gap-2">
      <p className="text-sm font-medium text-navy">
        <span aria-hidden="true">🇮🇱 </span>
        {phrase.hebrew}
      </p>
      <p className="text-base font-semibold text-argentina" dir="ltr">
        <span aria-hidden="true">🇦🇷 </span>
        {phrase.spanish}
      </p>
      <p className="text-sm text-gray-500">
        <span aria-hidden="true">🔤 </span>
        {phrase.transliteration}
      </p>
      <button
        onClick={copySpanish}
        className="flex items-center gap-1.5 self-start border border-argentina text-argentina px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-argentina-light transition-colors min-h-[44px]"
        aria-label={`העתק את הביטוי ${phrase.spanish}`}
      >
        {copied ? (
          <>
            <Check size={16} aria-hidden="true" />
            הועתק
          </>
        ) : (
          <>
            <Copy size={16} aria-hidden="true" />
            העתק
          </>
        )}
      </button>
    </Card>
  );
}

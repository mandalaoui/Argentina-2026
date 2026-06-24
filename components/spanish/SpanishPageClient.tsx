"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Tabs from "@/components/ui/Tabs";
import Flag from "@/components/ui/Flag";
import PhraseCard from "@/components/spanish/PhraseCard";
import TranslationWidget from "@/components/spanish/TranslationWidget";
import {
  phrases,
  phraseCategories,
  categoryTabLabels,
  type PhraseCategory,
} from "@/data/phrases";

function filterPhrases(list: typeof phrases, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return list;

  return list.filter(
    (phrase) =>
      phrase.hebrew.includes(query.trim()) ||
      phrase.spanish.toLowerCase().includes(q) ||
      phrase.transliteration.includes(query.trim())
  );
}

export default function SpanishPageClient() {
  const [search, setSearch] = useState("");

  const tabs = phraseCategories.map((id) => ({
    id,
    label: categoryTabLabels[id],
  }));

  const phrasesByCategory = useMemo(() => {
    const map = new Map<PhraseCategory, typeof phrases>();
    for (const category of phraseCategories) {
      map.set(
        category,
        filterPhrases(
          phrases.filter((p) => p.category === category),
          search
        )
      );
    }
    return map;
  }, [search]);

  return (
    <main className="p-4 max-w-lg mx-auto pb-24">
      <div className="pt-2 pb-4">
        <h1 className="text-xl md:text-2xl font-bold text-navy flex items-center gap-2">
          ספרדית <Flag code="AR" size={28} />
        </h1>
        <p className="text-sm text-gray-400 mt-1">מילון ביטויים ותרגום חופשי</p>
      </div>

      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חיפוש ביטוי..."
          className="w-full rounded-xl border border-argentina-light bg-white pr-10 pl-3 py-3 text-base text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-argentina/40 min-h-[48px]"
          aria-label="חיפוש ביטויים"
        />
      </div>

      <Tabs tabs={tabs} defaultTab="basic">
        {(activeTab) => {
          const category = activeTab as PhraseCategory;
          const filtered = phrasesByCategory.get(category) ?? [];

          return (
            <div className="space-y-3">
              {filtered.length > 0 ? (
                filtered.map((phrase) => (
                  <PhraseCard key={phrase.id} phrase={phrase} />
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                  לא נמצאו ביטויים
                </p>
              )}
            </div>
          );
        }}
      </Tabs>

      <TranslationWidget />
    </main>
  );
}

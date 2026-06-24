"use client";

import { useMemo, useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import Flag from "@/components/ui/Flag";
import PhraseCard from "@/components/spanish/PhraseCard";
import CategoryGrid from "@/components/spanish/CategoryGrid";
import TranslationWidget from "@/components/spanish/TranslationWidget";
import {
  phrases,
  categoryLabels,
  categoryEmojis,
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
  const [selectedCategory, setSelectedCategory] = useState<PhraseCategory | null>(
    null
  );

  const isSearching = search.trim().length > 0;

  const filteredPhrases = useMemo(() => {
    const base = selectedCategory
      ? phrases.filter((p) => p.category === selectedCategory)
      : phrases;
    return filterPhrases(base, search);
  }, [search, selectedCategory]);

  const handleBack = () => setSelectedCategory(null);

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

      {selectedCategory ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-argentina-light text-navy hover:bg-argentina/20 transition-colors shrink-0"
              aria-label="חזרה לקטגוריות"
            >
              <ChevronRight size={22} aria-hidden="true" />
            </button>
            <h2 className="flex-1 text-base font-semibold text-navy flex items-center gap-2">
              <span aria-hidden="true">{categoryEmojis[selectedCategory]}</span>
              {categoryLabels[selectedCategory]}
            </h2>
          </div>

          <div className="space-y-3">
            {filteredPhrases.length > 0 ? (
              filteredPhrases.map((phrase) => (
                <PhraseCard key={phrase.id} phrase={phrase} />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">
                לא נמצאו ביטויים
              </p>
            )}
          </div>
        </div>
      ) : isSearching ? (
        <div className="space-y-3">
          {filteredPhrases.length > 0 ? (
            filteredPhrases.map((phrase) => (
              <PhraseCard key={phrase.id} phrase={phrase} />
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-8">
              לא נמצאו ביטויים
            </p>
          )}
        </div>
      ) : (
        <CategoryGrid onSelect={setSelectedCategory} />
      )}

      <TranslationWidget />
    </main>
  );
}

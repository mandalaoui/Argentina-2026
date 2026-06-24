"use client";

import {
  phraseCategories,
  categoryLabels,
  categoryEmojis,
  type PhraseCategory,
} from "@/data/phrases";

interface CategoryGridProps {
  onSelect: (category: PhraseCategory) => void;
}

export default function CategoryGrid({ onSelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {phraseCategories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-argentina-light bg-white p-4 min-h-[120px] shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-center"
        >
          <span className="text-3xl leading-none" aria-hidden="true">
            {categoryEmojis[category]}
          </span>
          <span className="text-sm font-semibold text-navy leading-snug">
            {categoryLabels[category]}
          </span>
        </button>
      ))}
    </div>
  );
}

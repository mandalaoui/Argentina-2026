"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { JournalMoment } from "@/types/journal";
import MomentCard from "./MomentCard";

interface Props {
  day: number;
  moments: JournalMoment[];
  onDelete: (id: string) => void;
  defaultOpen?: boolean;
}

export default function DaySection({ day, moments, onDelete, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const first = moments[0];
  const date = new Date(first.date + "T12:00:00").toLocaleDateString("he-IL", {
    day: "numeric", month: "numeric",
  });

  return (
    <div className="mb-4 border border-argentina-light rounded-2xl overflow-hidden">
      {/* Collapsible header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-argentina-light/40 hover:bg-argentina-light/70 transition-colors text-right"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold bg-argentina text-white px-2.5 py-0.5 rounded-full">
            יום {day}
          </span>
          <span className="text-xs text-gray-500">{date}</span>
          <span className="text-xs font-semibold text-navy">{first.destinationHe}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{moments.length} רגעים</span>
          <ChevronDown
            size={16}
            className={`text-argentina transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Moments */}
      {open && (
        <div className="p-3 space-y-3">
          {moments.map((m) => (
            <MomentCard key={m.id} moment={m} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

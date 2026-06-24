"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Flag from "@/components/ui/Flag";
import DayRow from "./DayRow";
import type { LocationGroup } from "@/data/trip-days";
import type { TripDay } from "@/data/trip-days";

interface Props {
  group: LocationGroup;
  days: TripDay[];
  defaultOpen?: boolean;
}

export default function LocationSection({ group, days, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-3">
      {/* Section header — Word-style triangle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 py-2 px-1 text-right group"
        aria-expanded={open}
      >
        <ChevronRight
          size={16}
          className={`text-navy transition-transform duration-200 flex-shrink-0 ${open ? "rotate-90" : ""}`}
        />
        <Flag code={group.flag} size={18} />
        <span className="font-bold text-navy text-base">{group.label}</span>
        <span className="text-xs text-gray-400 mr-1">{days.length} ימים</span>
      </button>

      {/* Days list */}
      {open && (
        <div className="mr-4 border border-argentina-light rounded-xl overflow-hidden">
          {days.map((day, i) => (
            <DayRow
              key={day.day}
              tripDay={day}
              defaultOpen={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}

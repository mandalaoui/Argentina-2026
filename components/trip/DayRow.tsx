"use client";

import { useState } from "react";
import { ChevronRight, Moon, MapPin } from "lucide-react";
import { ActivityChecklist } from "./ActivityChecklist";
import type { TripDay } from "@/data/trip-days";
import { getDayAccommodation } from "@/data/trip-days";

interface Props {
  tripDay: TripDay;
  defaultOpen?: boolean;
}

export default function DayRow({ tripDay, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const accommodation = getDayAccommodation(tripDay.destinationId);

  const dateStr = new Date(tripDay.date + "T12:00:00").toLocaleDateString("he-IL", {
    day: "numeric", month: "numeric",
  });

  return (
    <div className="border-b border-argentina-light/60 last:border-0">
      {/* Day header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-right hover:bg-argentina-light/30 transition-colors"
        aria-expanded={open}
      >
        <ChevronRight
          size={14}
          className={`text-argentina flex-shrink-0 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
        />
        <span className="text-xs font-bold text-argentina w-12 flex-shrink-0">יום {tripDay.day}</span>
        <span className="text-xs text-gray-500 w-12 flex-shrink-0">{dateStr}</span>
        <span className="text-xs font-medium text-navy truncate">{tripDay.locationLabel}</span>
      </button>

      {/* Day content */}
      {open && (
        <div className="px-4 pb-3 space-y-3">
          {/* Accommodation */}
          {accommodation && accommodation.name !== "TODO — עדיין לא נבחר" && (
            <div className="flex items-start gap-2">
              <Moon size={13} className="text-argentina mt-0.5 flex-shrink-0" />
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(accommodation.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-argentina hover:underline leading-relaxed"
              >
                {accommodation.name}
              </a>
            </div>
          )}

          {/* Activities checklist */}
          {tripDay.activities.length > 0 ? (
            <ActivityChecklist
              activities={tripDay.activities}
              storageKey={tripDay.activityStorageKey}
              compact
              emptyMessage=""
            />
          ) : (
            <p className="text-xs text-gray-400">אין פעילויות מתוכננות</p>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { ChevronRight, Moon, Utensils, Beer, Trophy } from "lucide-react";
import { ActivityChecklist } from "./ActivityChecklist";
import type { TripDay } from "@/data/trip-days";
import { getDayAccommodation } from "@/data/trip-days";
import { formatTripDayDate } from "@/lib/utils";

interface Props {
  tripDay: TripDay;
  defaultOpen?: boolean;
}

export default function DayRow({ tripDay, defaultOpen = false }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const accommodation = getDayAccommodation(tripDay.destinationId);

  const dateStr = formatTripDayDate(tripDay.date);

  return (
    <div className="border-b border-argentina-light/60 last:border-0">
      {/* Day header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full grid grid-cols-[1rem_2.75rem_2.25rem_minmax(0,1fr)] gap-x-2 items-start px-3 py-3 text-right hover:bg-argentina-light/30 transition-colors"
        aria-expanded={open}
      >
        <ChevronRight
          size={14}
          className={`text-argentina shrink-0 justify-self-center mt-0.5 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
        />
        <span className="text-sm font-bold text-argentina tabular-nums leading-snug">יום {tripDay.day}</span>
        <span className="text-xs text-gray-500 tabular-nums leading-snug">{dateStr}</span>
        <span className="min-w-0 text-sm font-medium text-navy wrap-break-word leading-snug">
          {tripDay.locationLabel}
        </span>
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2 pt-1">

          {/* Accommodation */}
          {accommodation && accommodation.name !== "TODO — עדיין לא נבחר" && (
            <div className="flex items-start gap-2">
              <span className="w-9 shrink-0 flex items-start justify-center pt-0.5">
                <Moon size={14} className="text-argentina shrink-0" />
              </span>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(accommodation.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 flex-1 text-sm text-argentina hover:underline leading-snug wrap-break-word"
              >
                {accommodation.name}
              </a>
            </div>
          )}

          {/* Argentina match */}
          {tripDay.matchNote && (
            <div className="flex items-start gap-2 bg-sun/20 rounded-xl py-2">
              <span className="w-9 shrink-0 flex items-start justify-center pt-0.5">
                <Trophy size={14} className="text-navy shrink-0" />
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold text-navy leading-snug wrap-break-word">{tripDay.matchNote}</span>
            </div>
          )}

          {/* Activities checklist */}
          {tripDay.activities.length > 0 ? (
            <ActivityChecklist
              activities={tripDay.activities}
              storageKey={tripDay.activityStorageKey}
              emptyMessage=""
            />
          ) : tripDay.day === 12 ? (
            <div className="flex items-start gap-2">
              <span className="w-9 shrink-0" aria-hidden="true" />
              <p className="min-w-0 flex-1 text-sm text-gray-400">ארוחת בוקר ונסיעה לשדה התעופה 🛫</p>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <span className="w-9 shrink-0" aria-hidden="true" />
              <p className="min-w-0 flex-1 text-sm text-gray-400">אין פעילויות מתוכננות</p>
            </div>
          )}

          {/* Meal suggestion */}
          {tripDay.meal && (
            <div className="flex items-start gap-2 border-t border-argentina-light/60 pt-2">
              <span className="w-9 shrink-0 flex items-start justify-center pt-0.5">
                <Utensils size={14} className="text-argentina shrink-0" />
              </span>
              <div className="min-w-0 flex-1">
                {tripDay.meal.mapsUrl ? (
                  <a
                    href={tripDay.meal.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-navy hover:underline wrap-break-word leading-snug"
                  >
                    {tripDay.meal.label}
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-navy wrap-break-word leading-snug">{tripDay.meal.label}</span>
                )}
                {tripDay.meal.note && (
                  <p className="text-xs text-gray-400 mt-0.5 wrap-break-word">{tripDay.meal.note}</p>
                )}
              </div>
            </div>
          )}

          {/* Bar suggestion */}
          {tripDay.bar && (
            <div className="flex items-start gap-2">
              <span className="w-9 shrink-0 flex items-start justify-center pt-0.5">
                <Beer size={14} className="text-argentina shrink-0" />
              </span>
              <div className="min-w-0 flex-1">
                {tripDay.bar.mapsUrl ? (
                  <a
                    href={tripDay.bar.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-navy hover:underline wrap-break-word leading-snug"
                  >
                    {tripDay.bar.label}
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-navy wrap-break-word leading-snug">{tripDay.bar.label}</span>
                )}
                {tripDay.bar.note && (
                  <p className="text-xs text-gray-400 mt-0.5 wrap-break-word">{tripDay.bar.note}</p>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

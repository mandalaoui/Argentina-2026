"use client";

import { useState } from "react";
import { ChevronRight, Moon, Utensils, Beer, Trophy } from "lucide-react";
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

      {open && (
        <div className="px-4 pb-4 space-y-3 pt-1">

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

          {/* Argentina match */}
          {tripDay.matchNote && (
            <div className="flex items-start gap-2 bg-sun/20 rounded-xl px-3 py-2">
              <Trophy size={13} className="text-navy mt-0.5 flex-shrink-0" />
              <span className="text-xs font-semibold text-navy">{tripDay.matchNote}</span>
            </div>
          )}

          {/* Activities checklist */}
          {tripDay.activities.length > 0 ? (
            <ActivityChecklist
              activities={tripDay.activities}
              storageKey={tripDay.activityStorageKey}
              compact
              showLinks
              emptyMessage=""
            />
          ) : tripDay.day === 12 ? (
            <p className="text-xs text-gray-400">ארוחת בוקר ונסיעה לשדה התעופה 🛫</p>
          ) : (
            <p className="text-xs text-gray-400">אין פעילויות מתוכננות</p>
          )}

          {/* Meal suggestion */}
          {tripDay.meal && (
            <div className="flex items-start gap-2 border-t border-argentina-light/60 pt-2">
              <Utensils size={13} className="text-argentina mt-0.5 flex-shrink-0" />
              <div>
                {tripDay.meal.mapsUrl ? (
                  <a
                    href={tripDay.meal.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-navy hover:underline"
                  >
                    {tripDay.meal.label}
                  </a>
                ) : (
                  <span className="text-xs font-semibold text-navy">{tripDay.meal.label}</span>
                )}
                {tripDay.meal.note && (
                  <p className="text-xs text-gray-400 mt-0.5">{tripDay.meal.note}</p>
                )}
              </div>
            </div>
          )}

          {/* Bar suggestion */}
          {tripDay.bar && (
            <div className="flex items-start gap-2">
              <Beer size={13} className="text-argentina mt-0.5 flex-shrink-0" />
              <div>
                {tripDay.bar.mapsUrl ? (
                  <a
                    href={tripDay.bar.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-navy hover:underline"
                  >
                    {tripDay.bar.label}
                  </a>
                ) : (
                  <span className="text-xs font-semibold text-navy">{tripDay.bar.label}</span>
                )}
                {tripDay.bar.note && (
                  <p className="text-xs text-gray-400 mt-0.5">{tripDay.bar.note}</p>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

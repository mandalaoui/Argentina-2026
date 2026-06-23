"use client";

import { useEffect, useState } from "react";
import { MapPin, CheckCircle2, Circle } from "lucide-react";
import type { Activity, Place } from "@/data/trip";

interface CheckState {
  completed: boolean;
  completedAt?: string;
}

function useCheckStorage(storageKey: string) {
  const [checks, setChecks] = useState<Record<string, CheckState>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setChecks(JSON.parse(saved));
    } catch {}
  }, [storageKey]);

  const toggle = (id: string) => {
    setChecks((prev) => {
      const current = prev[id];
      const next = current?.completed
        ? { completed: false }
        : { completed: true, completedAt: new Date().toISOString() };
      const updated = { ...prev, [id]: next };
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return { checks, toggle };
}

// ─── Activity list ───────────────────────────────────────────────────────────

interface ActivityChecklistProps {
  activities: Activity[];
  storageKey: string;
  emptyMessage?: string;
  compact?: boolean;
}

export function ActivityChecklist({
  activities,
  storageKey,
  emptyMessage = "אין פעילויות רשומות",
  compact = false,
}: ActivityChecklistProps) {
  const { checks, toggle } = useCheckStorage(storageKey);

  if (activities.length === 0)
    return <p className="text-sm text-gray-400">{emptyMessage}</p>;

  const iconSize = compact ? 18 : 22;

  return (
    <ul className={compact ? "space-y-1.5" : "space-y-2"}>
      {activities.map((act) => {
        const done = checks[act.id]?.completed ?? false;
        const doneAt = checks[act.id]?.completedAt;
        return (
          <li key={act.id} className={`flex items-start ${compact ? "gap-2" : "gap-3"}`}>
            <button
              onClick={() => toggle(act.id)}
              aria-label={done ? `בטל סימון ${act.nameHe}` : `סמן ${act.nameHe} כבוצע`}
              className="mt-0.5 flex-shrink-0 text-argentina hover:opacity-70 transition-opacity"
            >
              {done
                ? <CheckCircle2 size={iconSize} className="text-argentina" />
                : <Circle size={iconSize} className="text-gray-300" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className={`${compact ? "text-xs" : "text-sm"} font-medium leading-snug ${done ? "line-through text-gray-400" : "text-navy"}`}>
                {act.nameHe}
              </p>
              {act.notes && !done && (
                <p className={`${compact ? "text-[11px]" : "text-xs"} text-gray-400 mt-0.5`}>{act.notes}</p>
              )}
              {!compact && done && doneAt && (
                <p className="text-xs text-gray-400 mt-0.5">
                  בוצע: {new Date(doneAt).toLocaleDateString("he-IL", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              )}
            </div>
            {!compact && (
              <a
                href={act.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`פתח ${act.nameHe} במפה`}
                className="flex-shrink-0 p-1.5 rounded-lg text-argentina hover:bg-argentina-light transition-colors"
              >
                <MapPin size={16} />
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// ─── Places list (restaurants / bars) ────────────────────────────────────────

interface PlaceListProps {
  places: Place[];
  emptyMessage: string;
}

export function PlaceList({ places, emptyMessage }: PlaceListProps) {
  if (places.length === 0)
    return <p className="text-sm text-gray-400">{emptyMessage}</p>;

  return (
    <ul className="space-y-3">
      {places.map((p) => (
        <li key={p.id} className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-navy">{p.name}</p>
              {p.recommended && (
                <span className="text-xs bg-sun text-navy px-1.5 py-0.5 rounded-full font-medium">
                  מומלץ
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{p.type}</p>
            {p.notes && <p className="text-xs text-gray-400 mt-0.5">{p.notes}</p>}
          </div>
          <a
            href={p.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`פתח ${p.name} במפה`}
            className="flex-shrink-0 p-1.5 rounded-lg text-argentina hover:bg-argentina-light transition-colors mt-0.5"
          >
            <MapPin size={16} />
          </a>
        </li>
      ))}
    </ul>
  );
}

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
    import("@/lib/supabase-storage").then(({ dbGet }) =>
      dbGet<Record<string, CheckState>>(storageKey).then((data) => {
        if (data) setChecks(data);
      })
    );
  }, [storageKey]);

  const toggle = (id: string) => {
    setChecks((prev) => {
      const current = prev[id];
      const next = current?.completed
        ? { completed: false }
        : { completed: true, completedAt: new Date().toISOString() };
      const updated = { ...prev, [id]: next };
      import("@/lib/supabase-storage").then(({ dbSet }) => dbSet(storageKey, updated));
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
  /** @deprecated No longer affects layout — kept for call-site compatibility */
  compact?: boolean;
  /** @deprecated No longer affects layout — kept for call-site compatibility */
  showLinks?: boolean;
}

export function ActivityChecklist({
  activities,
  storageKey,
  emptyMessage = "אין פעילויות רשומות",
}: ActivityChecklistProps) {
  const { checks, toggle } = useCheckStorage(storageKey);

  if (activities.length === 0)
    return <p className="text-sm text-gray-400">{emptyMessage}</p>;

  const iconSize = 22;

  return (
    <ul className="space-y-2">
      {activities.map((act) => {
        const done = checks[act.id]?.completed ?? false;
        const doneAt = checks[act.id]?.completedAt;
        return (
          <li key={act.id} className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => toggle(act.id)}
              aria-label={done ? `בטל סימון ${act.nameHe}` : `סמן ${act.nameHe} כבוצע`}
              className="shrink-0 self-start flex items-center justify-center text-argentina hover:opacity-70 transition-opacity"
              style={{ paddingTop: "2px" }}
            >
              {done
                ? <CheckCircle2 size={iconSize} className="text-argentina shrink-0" aria-hidden />
                : <Circle size={iconSize} className="text-gray-300 shrink-0" aria-hidden />}
            </button>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium leading-snug text-navy wrap-break-word whitespace-normal ${done ? "line-through text-gray-400" : ""}`}>
                {act.nameHe}
              </p>
              {act.notes && !done && (
                <p className="text-xs text-gray-400 mt-0.5 wrap-break-word whitespace-normal">{act.notes}</p>
              )}
              {done && doneAt && (
                <p className="text-xs text-gray-400 mt-0.5 wrap-break-word whitespace-normal">
                  בוצע: {new Date(doneAt).toLocaleDateString("he-IL", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              )}
            </div>
            {act.mapsUrl && (
              <a
                href={act.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`פתח ${act.nameHe} במפה`}
                className="shrink-0 p-1.5 rounded-lg text-argentina hover:bg-argentina-light transition-colors"
              >
                <MapPin size={16} aria-hidden="true" />
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
            className="shrink-0 p-1.5 rounded-lg text-argentina hover:bg-argentina-light transition-colors mt-0.5"
          >
            <MapPin size={16} />
          </a>
        </li>
      ))}
    </ul>
  );
}

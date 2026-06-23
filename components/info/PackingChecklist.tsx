"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { packingList } from "@/data/info";

export const PACKING_STORAGE_KEY = "info-packing-checklist";

interface CheckState {
  completed: boolean;
  completedAt?: string;
}

export function usePackingStorage() {
  const [checks, setChecks] = useState<Record<string, CheckState>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PACKING_STORAGE_KEY);
      if (saved) setChecks(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = (id: string) => {
    setChecks((prev) => {
      const current = prev[id];
      const next = current?.completed
        ? { completed: false }
        : { completed: true, completedAt: new Date().toISOString() };
      const updated = { ...prev, [id]: next };
      try {
        localStorage.setItem(PACKING_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const packedCount = packingList.filter((item) => checks[item.id]?.completed).length;

  return { checks, toggle, packedCount, total: packingList.length };
}

interface PackingChecklistProps {
  checks: Record<string, CheckState>;
  onToggle: (id: string) => void;
}

export default function PackingChecklist({ checks, onToggle }: PackingChecklistProps) {
  return (
    <ul className="space-y-2">
      {packingList.map((item) => {
        const done = checks[item.id]?.completed ?? false;
        const doneAt = checks[item.id]?.completedAt;
        return (
          <li key={item.id} className="flex items-start gap-3">
            <button
              onClick={() => onToggle(item.id)}
              aria-label={done ? `בטל סימון ${item.label}` : `סמן ${item.label} כארוז`}
              className="mt-0.5 shrink-0 text-argentina hover:opacity-70 transition-opacity min-h-11 min-w-11 flex items-center justify-center -m-2"
            >
              {done
                ? <CheckCircle2 size={22} className="text-argentina" />
                : <Circle size={22} className="text-gray-300" />}
            </button>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <p className={`text-sm font-medium leading-snug ${done ? "line-through text-gray-400" : "text-navy"}`}>
                  {item.label}
                </p>
                {item.important && !done && <Badge variant="important" />}
              </div>
              {done && doneAt && (
                <p className="text-xs text-gray-400 mt-0.5">
                  ארוז: {new Date(doneAt).toLocaleDateString("he-IL", {
                    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

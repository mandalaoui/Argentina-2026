"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Lock, Eye, EyeOff, CheckCircle2, Circle, Pencil } from "lucide-react";
import { isDocumentsUnlocked, unlockDocuments, checkPassword } from "@/lib/documents-auth";

interface GiftRow {
  id: string;
  name: string;
  gift: string;
  done: boolean;
  editing: boolean; // currently unlocked for editing
}

const STORAGE_KEY = "gifts-list";

function normalizeRows(raw: Partial<GiftRow>[]): GiftRow[] {
  return raw.map((r) => ({
    id: r.id ?? Date.now().toString(),
    name: r.name ?? "",
    gift: r.gift ?? "",
    done: r.done ?? false,
    editing: false,
  }));
}

async function loadGifts(): Promise<GiftRow[]> {
  const { dbGet } = await import("@/lib/supabase-storage");
  const data = await dbGet<Partial<GiftRow>[]>(STORAGE_KEY);
  return data ? normalizeRows(data) : [];
}

async function saveGifts(rows: GiftRow[]) {
  const { dbSet } = await import("@/lib/supabase-storage");
  await dbSet(STORAGE_KEY, rows);
}

// ─── Password Gate ──────────────────────────────────────────────────────────

function GiftsPasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword(password)) {
      unlockDocuments();
      onUnlock();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col items-center gap-3 py-4">
      <Lock size={28} className="text-argentina" />
      <p className="text-sm text-gray-500">הזן סיסמה לצפייה ברשימת המתנות</p>
      <div className="relative w-full max-w-xs">
        <input
          type={show ? "text" : "password"}
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          placeholder="סיסמה"
          className="w-full border border-argentina-light rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-argentina pl-10"
          dir="rtl"
          autoFocus
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500">סיסמה שגויה</p>}
      <button
        type="submit"
        className="bg-argentina text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        כניסה
      </button>
    </form>
  );
}

// ─── Gifts Table ────────────────────────────────────────────────────────────

function GiftsTable() {
  const [rows, setRows] = useState<GiftRow[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadGifts().then((data) => {
      setRows(data);
      setMounted(true);
    });
  }, []);

  const mutate = (next: GiftRow[]) => {
    setRows(next);
    saveGifts(next); // fire-and-forget async save
  };

  const update = (id: string, field: "name" | "gift", value: string) => {
    mutate(rows.map((r) => r.id === id ? { ...r, [field]: value } : r));
  };

  const toggleDone = (id: string) => {
    mutate(rows.map((r) => r.id === id ? { ...r, done: !r.done, editing: false } : r));
  };

  const toggleEdit = (id: string) => {
    mutate(rows.map((r) => r.id === id ? { ...r, editing: !r.editing, done: false } : r));
  };

  const addRow = () => {
    const newRow: GiftRow = { id: Date.now().toString(), name: "", gift: "", done: false, editing: true };
    mutate([...rows, newRow]);
  };

  const deleteRow = (id: string) => {
    mutate(rows.filter((r) => r.id !== id));
  };

  if (!mounted) return null;

  return (
    <div>
      <div className="border border-argentina-light rounded-xl overflow-hidden mb-3">
        {/* Header */}
        <div className="grid bg-argentina-light px-3 py-2" style={{ gridTemplateColumns: "2rem 1fr 1fr 2rem" }}>
          <span />
          <span className="text-xs font-bold text-navy">שם</span>
          <span className="text-xs font-bold text-navy">מתנה</span>
          <span />
        </div>

        {/* Rows */}
        {rows.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">אין רשומות — לחץ + להוסיף</p>
        ) : (
          rows.map((row) => {
            const isEditable = !row.done && row.editing;
            return (
              <div
                key={row.id}
                className={`grid border-t border-argentina-light/60 items-center gap-1 px-2 py-2 ${row.done ? "bg-gray-50" : ""}`}
                style={{ gridTemplateColumns: "2rem 1fr 1fr 2rem" }}
              >
                {/* Done toggle */}
                <button
                  onClick={() => toggleDone(row.id)}
                  aria-label={row.done ? "בטל סימון" : "סמן כטופל"}
                  className="text-argentina hover:opacity-70 transition-opacity"
                >
                  {row.done
                    ? <CheckCircle2 size={18} className="text-argentina" />
                    : <Circle size={18} className="text-gray-300" />}
                </button>

                {/* Name */}
                {isEditable ? (
                  <input
                    value={row.name}
                    onChange={(e) => update(row.id, "name", e.target.value)}
                    placeholder="שם..."
                    className="text-sm text-navy bg-transparent focus:outline-none w-full border-b border-argentina-light/60 pb-0.5"
                    dir="rtl"
                    autoFocus
                  />
                ) : (
                  <span className={`text-sm truncate ${row.done ? "line-through text-gray-400" : "text-navy"}`}>
                    {row.name || <span className="text-gray-300 italic">שם</span>}
                  </span>
                )}

                {/* Gift */}
                {isEditable ? (
                  <input
                    value={row.gift}
                    onChange={(e) => update(row.id, "gift", e.target.value)}
                    placeholder="מתנה..."
                    className="text-sm text-navy bg-transparent focus:outline-none w-full border-b border-argentina-light/60 pb-0.5"
                    dir="rtl"
                  />
                ) : (
                  <span className={`text-sm truncate ${row.done ? "line-through text-gray-400" : "text-navy"}`}>
                    {row.gift || <span className="text-gray-300 italic">מתנה</span>}
                  </span>
                )}

                {/* Actions */}
                <div className="flex items-center gap-0.5">
                  {!row.done && (
                    <button
                      onClick={() => toggleEdit(row.id)}
                      aria-label={row.editing ? "נעל עריכה" : "ערוך שורה"}
                      className={`p-1 rounded transition-colors ${row.editing ? "text-argentina" : "text-gray-300 hover:text-argentina"}`}
                    >
                      <Pencil size={13} />
                    </button>
                  )}
                  {row.editing && (
                    <button
                      onClick={() => deleteRow(row.id)}
                      aria-label="מחק שורה"
                      className="p-1 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={addRow}
        className="flex items-center gap-1.5 text-sm text-argentina hover:underline font-medium"
      >
        <Plus size={15} />
        הוסף שורה
      </button>
    </div>
  );
}

// ─── Main export ────────────────────────────────────────────────────────────

export default function GiftsList() {
  const [unlocked, setUnlocked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setUnlocked(isDocumentsUnlocked());
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!unlocked) return <GiftsPasswordGate onUnlock={() => setUnlocked(true)} />;
  return <GiftsTable />;
}

import type { JournalMoment } from "@/types/journal";

const STORAGE_KEY = "journal-moments";

export function loadMoments(): JournalMoment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const moments: JournalMoment[] = JSON.parse(raw);
    // Sort newest first
    return moments.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
  } catch {
    return [];
  }
}

export function saveMoment(moment: JournalMoment): void {
  try {
    const existing = loadMoments();
    const updated = [moment, ...existing.filter((m) => m.id !== moment.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

export function deleteMoment(id: string): void {
  try {
    const existing = loadMoments();
    const updated = existing.filter((m) => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {}
}

/** Group moments by trip day, sorted newest day first */
export function groupMomentsByDay(
  moments: JournalMoment[]
): Map<number, JournalMoment[]> {
  const map = new Map<number, JournalMoment[]>();
  for (const m of moments) {
    if (!map.has(m.day)) map.set(m.day, []);
    map.get(m.day)!.push(m);
  }
  // Sort days descending
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

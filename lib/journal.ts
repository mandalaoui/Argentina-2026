import type { JournalMoment } from "@/types/journal";
import { dbGet, dbSet } from "./supabase-storage";

const STORAGE_KEY = "journal-moments";

function sortMoments(moments: JournalMoment[]): JournalMoment[] {
  return moments.sort(
    (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );
}

export async function loadMoments(): Promise<JournalMoment[]> {
  const data = await dbGet<JournalMoment[]>(STORAGE_KEY);
  return data ? sortMoments(data) : [];
}

export async function saveMoment(moment: JournalMoment): Promise<void> {
  const existing = await loadMoments();
  const updated = [moment, ...existing.filter((m) => m.id !== moment.id)];
  await dbSet(STORAGE_KEY, updated);
}

export async function deleteMoment(id: string): Promise<void> {
  const existing = await loadMoments();
  await dbSet(STORAGE_KEY, existing.filter((m) => m.id !== id));
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

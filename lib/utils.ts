import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Short day label from ISO date, e.g. "2026-07-03" → "3.7". Locale-independent for SSR. */
export function formatTripDayDate(isoDate: string): string {
  const [, month, day] = isoDate.split("-");
  return `${Number(day)}.${Number(month)}`;
}

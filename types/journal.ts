export interface JournalMoment {
  id: string;
  day: number;              // trip day number (1–12)
  date: string;             // ISO date "2026-07-03"
  destinationId: string;    // "buenos-aires" | "bariloche" | etc.
  destinationHe: string;    // "בואנוס איירס"
  location: string;         // reverse-geocoded or manual text
  caption: string;          // user text, may be empty
  photoPath: string | null; // Supabase path e.g. "journal/buenos-aires/1720000000.jpg"
  photoUrl: string | null;  // Supabase public URL
  uploadedAt: string;       // ISO datetime
}

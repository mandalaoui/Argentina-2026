import { destinations } from "./trip";
import type { Activity } from "./trip";

export interface DaySuggestion {
  label: string;   // e.g. "🍽️ Don Julio"
  note?: string;   // e.g. "להזמין מקום מראש"
  mapsUrl?: string;
}

export interface TripDay {
  day: number;
  date: string;
  locationLabel: string;
  destinationId: string;
  activities: Activity[];
  activityStorageKey: string;
  subTripId?: string;
  meal?: DaySuggestion;
  bar?: DaySuggestion;
  matchNote?: string;
}

export interface LocationGroup {
  label: string;
  flag: "AR" | "UY";
  days: number[];
}

// ─── helpers ────────────────────────────────────────────────────────────────

const ba    = destinations[0];
const brc   = destinations[1];
const baRet = destinations[2];

const rosario = ba.subTrips?.find((s) => s.id === "rosario")!;
const colonia = ba.subTrips?.find((s) => s.id === "colonia")!;

/** Pick specific activities by ID from a destination's activity list */
function pick(activities: Activity[], ...ids: string[]): Activity[] {
  return ids.flatMap((id) => activities.filter((a) => a.id === id));
}

const baActs  = ba.activities;
const brcActs = brc.activities;
const rosActs = rosario?.activities ?? [];
const colActs = colonia?.activities ?? [];

// ─── 12-day plan ────────────────────────────────────────────────────────────

// Custom one-off activities (not from destination lists)
const custom = (id: string, nameHe: string, mapsUrl?: string, notes?: string): Activity => ({
  id, nameHe, name: nameHe, category: "attraction", mapsUrl: mapsUrl ?? "", notes,
});

export const tripDays: TripDay[] = [

  // ─── יום 1 — הגעה ─────────────────────────────────────────────────────────
  {
    day: 1, date: "2026-07-01",
    locationLabel: "בואנוס איירס — הגעה",
    destinationId: "buenos-aires",
    activityStorageKey: "activities-buenos-aires",
    activities: [
      custom("d1-family", "ביקור משפחה — דודה נורה"),
      custom("d1-checkin", "צ'ק-אין City Express Plus Palermo", "https://maps.google.com/?q=Guatemala+4931+Buenos+Aires"),
      ...pick(baActs, "ba-florida"),
    ],
    meal: { label: "El Preferido de Palermo", note: "קלאסי ורגוע, ליד המלון", mapsUrl: "https://maps.google.com/?q=El+Preferido+de+Palermo" },
    bar:  { label: "Boticario", note: "קוקטיילים, 5 דקות מהמלון", mapsUrl: "https://maps.google.com/?q=Boticario+Buenos+Aires" },
  },

  // ─── יום 2 — רקולטה + מרכז ────────────────────────────────────────────────
  {
    day: 2, date: "2026-07-02",
    locationLabel: "רקולטה + מרכז העיר",
    destinationId: "buenos-aires",
    activityStorageKey: "activities-buenos-aires",
    activities: pick(baActs, "ba-recoleta-cemetery", "ba-ateneo", "ba-obelisco", "ba-plaza-mayo", "ba-casa-rosada"),
    meal: { label: "Fogón Asado", note: "פארייה מעולה — להזמין מקום", mapsUrl: "https://maps.google.com/?q=Fogón+Asado+Buenos+Aires" },
    bar:  { label: "Piso 15 Sky Bar", note: "בר גג עם נוף לעיר", mapsUrl: "https://maps.google.com/?q=Piso+15+Sky+Bar+Buenos+Aires" },
    matchNote: "ייתכן: ארגנטינה — שלב 32 (לבדוק שעה)",
  },

  // ─── יום 3 — סן טלמו + לה בוקה + פוארטו מאדרו ────────────────────────────
  {
    day: 3, date: "2026-07-03",
    locationLabel: "סן טלמו + לה בוקה + פוארטו מאדרו",
    destinationId: "buenos-aires",
    activityStorageKey: "activities-buenos-aires",
    activities: [
      custom("d3-mercado", "Mercado de San Telmo", "https://maps.google.com/?q=Mercado+de+San+Telmo+Buenos+Aires", "שוק אנטיקים ואוכל, אווירה ישנה"),
      custom("d3-puente", "Puente de la Mujer — פוארטו מאדרו", "https://maps.google.com/?q=Puente+de+la+Mujer+Buenos+Aires", "גשר מעוצב, טיילת"),
      ...pick(baActs, "ba-caminito", "ba-bombonera"),
    ],
    meal: { label: "Victor Audio Bar", note: "גריל ובר, אווירה טובה", mapsUrl: "https://maps.google.com/?q=Victor+Audio+Bar+Buenos+Aires" },
    bar:  { label: "Tres Monos", note: "בר ידוע בפלרמו", mapsUrl: "https://maps.google.com/?q=Tres+Monos+Buenos+Aires" },
  },

  // ─── יום 4 — רוסאריו ───────────────────────────────────────────────────────
  {
    day: 4, date: "2026-07-04",
    locationLabel: "רוסאריו — יום טיול",
    destinationId: "buenos-aires",
    activityStorageKey: "activities-rosario",
    subTripId: "rosario",
    activities: [
      custom("d4-bus-to", "אוטובוס בואנוס → רוסאריו (07:00, Retiro)", "https://maps.google.com/?q=Terminal+de+Omnibus+de+Retiro+Buenos+Aires"),
      ...pick(rosActs, "flag-monument", "parana-river", "independencia-park", "newells"),
      custom("d4-bus-back", "אוטובוס רוסאריו → בואנוס (16:30)"),
    ],
    meal: { label: "מסעדה מקומית ברוסאריו", note: "לשאול מקומיים / TripAdvisor" },
    matchNote: "ייתכן: ארגנטינה — שמינית גמר (אם עברו שלב 32)",
  },

  // ─── יום 5 — קולוניה ───────────────────────────────────────────────────────
  {
    day: 5, date: "2026-07-05",
    locationLabel: "קולוניה דל סקרמנטו — יום טיול 🇺🇾",
    destinationId: "buenos-aires",
    activityStorageKey: "activities-colonia",
    subTripId: "colonia",
    activities: [
      custom("d5-buquebus-to", "Buquebus לקולוניה (08:00 מפוארטו מאדרו)", "https://maps.google.com/?q=Terminal+Fluvial+Buquebus+Puerto+Madero"),
      ...pick(colActs, "barrio-historico", "suspiros", "lighthouse"),
      custom("d5-souvenirs", "קניית מזכרות אורוגוואיות", "https://maps.google.com/?q=Souvenirs+Uruguay+Colonia+del+Sacramento"),
      custom("d5-buquebus-back", "Buquebus חזרה לבואנוס (17:00)"),
    ],
    meal: { label: "La tapera de Enrique", note: "4.8 ⭐ — מהטובים בקולוניה", mapsUrl: "https://maps.google.com/?q=La+tapera+de+Enrique+Colonia+del+Sacramento" },
  },

  // ─── יום 6 — ברילוצ'ה הגעה ─────────────────────────────────────────────────
  {
    day: 6, date: "2026-07-06",
    locationLabel: "ברילוצ'ה — הגעה + מרכז",
    destinationId: "bariloche",
    activityStorageKey: "activities-bariloche",
    activities: [
      custom("d6-flight", "טיסה AR1670 — יציאה 07:45 מאארופרקה", "https://maps.google.com/?q=Aeroparque+Jorge+Newbery+Buenos+Aires"),
      custom("d6-arrive", "הגעה לברילוצ'ה — 10:10, צ'ק-אין"),
      custom("d6-mitre", "חנויות שוקולד ברחוב Mitre", "https://maps.google.com/?q=Mitre+Street+Bariloche", "Mamuschka, Rapa Nui, Fenoglio"),
      ...pick(brcActs, "brc-nahuel-huapi"),
    ],
    meal: { label: "El Boliche de Alberto", note: "הפארייה של ברילוצ'ה — להזמין!", mapsUrl: "https://maps.google.com/?q=El+Boliche+de+Alberto+Bariloche" },
    bar:  { label: "Cervecería Antares", note: "בירה מקומית מקובלת מאוד", mapsUrl: "https://maps.google.com/?q=Antares+Bariloche" },
  },

  // ─── יום 7 — קמפנאריו + ייאו ייאו ────────────────────────────────────────
  {
    day: 7, date: "2026-07-07",
    locationLabel: "סרו קמפנאריו + ייאו ייאו",
    destinationId: "bariloche",
    activityStorageKey: "activities-bariloche",
    activities: [
      custom("d7-bus20", "אוטובוס קו 20 מהמרכז (09:00)", "https://maps.google.com/?q=Bariloche+Bus+Terminal"),
      ...pick(brcActs, "brc-campanario", "brc-llao-llao"),
      custom("d7-sendero", "שביל קצר — Sendero Cerro Llao Llao", "https://maps.google.com/?q=Sendero+Llao+Llao+Bariloche", "הליכה 45 דקות, נוף פנורמי"),
    ],
    meal: { label: "מסעדה עם נוף לאגם ליד ייאו ייאו", note: "לאכול בחוץ אם מזג האוויר מאפשר" },
    bar:  { label: "Cervecería Berlina", note: "בירת בוטיק ברילוצ'אית", mapsUrl: "https://maps.google.com/?q=Cervecería+Berlina+Bariloche" },
    matchNote: "ייתכן: ארגנטינה — שמינית / רבע גמר (לבדוק)",
  },

  // ─── יום 8 — סירקויטו צ'יקו + פארק לאומי ─────────────────────────────────
  {
    day: 8, date: "2026-07-08",
    locationLabel: "סירקויטו צ'יקו + פארק לאומי",
    destinationId: "bariloche",
    activityStorageKey: "activities-bariloche",
    activities: [
      ...pick(brcActs, "brc-circuito-chico", "brc-nahuel-huapi"),
      custom("d8-moreno", "Lago Moreno — תצפית", "https://maps.google.com/?q=Lago+Moreno+Bariloche"),
      custom("d8-mirador", "Mirador del Lago — נוף פנורמי", "https://maps.google.com/?q=Mirador+del+Lago+Bariloche"),
    ],
    meal: { label: "פארייה מקומית בעיר", note: "לנוח אחרי יום פעיל" },
    bar:  { label: "מיקרוברוורי מקומי ברחוב Mitre", note: "לשאול בבית המלון מה מומלץ" },
  },

  // ─── יום 9 — סרו קתדראל + קניות ──────────────────────────────────────────
  {
    day: 9, date: "2026-07-09",
    locationLabel: "סרו קתדראל + קניות אחרונות",
    destinationId: "bariloche",
    activityStorageKey: "activities-bariloche",
    activities: [
      ...pick(brcActs, "brc-catedral"),
      custom("d9-choc", "קניות שוקולד אחרונות — Mamuschka", "https://maps.google.com/?q=Mamuschka+Bariloche"),
      custom("d9-civic", "Centro Cívico — כיכר מרכזית", "https://maps.google.com/?q=Centro+Cívico+Bariloche"),
      custom("d9-sunset", "טיילת שפת האגם לשקיעה", "https://maps.google.com/?q=Nahuel+Huapi+Lake+Bariloche"),
    ],
    meal: { label: "מסעדת הר בסרו קתדראל", note: "אוכלים עם נוף להרים" },
    bar:  { label: "חנויות שוקולד ברחוב Mitre", note: "Mamuschka, Rapa Nui, Fenoglio — חובה!" },
  },

  // ─── יום 10 — חזרה לבואנוס ────────────────────────────────────────────────
  {
    day: 10, date: "2026-07-10",
    locationLabel: "בואנוס איירס — חזרה + פלרמו",
    destinationId: "buenos-aires-return",
    activityStorageKey: "activities-buenos-aires",
    activities: [
      custom("d10-flight", "טיסה AR1925 — יציאה 09:00 מברילוצ'ה", "https://maps.google.com/?q=Bariloche+Airport"),
      custom("d10-arrive", "הגעה לאארופרקה — 11:05, צ'ק-אין", "https://maps.google.com/?q=Aeroparque+Jorge+Newbery+Buenos+Aires"),
      custom("d10-plaza-serrano", "Plaza Serrano — פלרמו סוהו", "https://maps.google.com/?q=Plaza+Serrano+Buenos+Aires", "קפה, חנויות, אווירה"),
      ...pick(baActs, "ba-florida"),
    ],
    meal: { label: "Don Julio", note: "אחת המסעדות הטובות בעיר — להזמין מוקדם!", mapsUrl: "https://maps.google.com/?q=Don+Julio+Buenos+Aires" },
    bar:  { label: "Presidente Bar", note: "קוקטיילים מעולים, פלרמו", mapsUrl: "https://maps.google.com/?q=Presidente+Bar+Buenos+Aires" },
    matchNote: "ייתכן: ארגנטינה — רבע גמר 🔥 (לבדוק!)",
  },

  // ─── יום 11 — יום אחרון ────────────────────────────────────────────────────
  {
    day: 11, date: "2026-07-11",
    locationLabel: "בואנוס איירס — יום אחרון",
    destinationId: "buenos-aires-return",
    activityStorageKey: "activities-buenos-aires",
    activities: [
      ...pick(baActs, "ba-colón", "ba-plaza-mayo", "ba-casa-rosada"),
      custom("d11-9julio", "אבנידה 9 de Julio — הרחוב הרחב בעולם", "https://maps.google.com/?q=Avenida+9+de+Julio+Buenos+Aires"),
      custom("d11-shopping", "קניות אחרונות — מזכרות, ביגוד, מתנות", "https://maps.google.com/?q=Palermo+Soho+Buenos+Aires"),
    ],
    meal: { label: "La Cabrera", note: "פארייה אייקונית — להזמין מקום!", mapsUrl: "https://maps.google.com/?q=La+Cabrera+Buenos+Aires" },
    bar:  { label: "Boticario", note: "לפרידה מהעיר 🥂", mapsUrl: "https://maps.google.com/?q=Boticario+Buenos+Aires" },
    matchNote: "ייתכן: ארגנטינה — רבע / חצי גמר",
  },

  // ─── יום 12 — טיסה ─────────────────────────────────────────────────────────
  {
    day: 12, date: "2026-07-12",
    locationLabel: "ארוחת בוקר + טיסה הביתה ✈️",
    destinationId: "buenos-aires-return",
    activityStorageKey: "activities-buenos-aires",
    activities: [],
  },
];

export const locationGroups: LocationGroup[] = [
  { label: "בואנוס איירס", flag: "AR", days: [1, 2, 3, 4, 5] },
  { label: "ברילוצ'ה",     flag: "AR", days: [6, 7, 8, 9] },
  { label: "בואנוס איירס", flag: "AR", days: [10, 11, 12] },
];

export function getDayAccommodation(destinationId: string) {
  return destinations.find((d) => d.id === destinationId)?.accommodation ?? null;
}

export function getTodayTripDay(): TripDay | null {
  const today =
    (process.env.NEXT_PUBLIC_DEV_TODAY_DATE) ??
    new Date().toLocaleDateString("en-CA");
  return tripDays.find((d) => d.date === today) ?? null;
}

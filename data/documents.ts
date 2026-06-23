export type DocumentCategory = "flights" | "insurance" | "passports" | "hotels" | "other";

export interface TripDocument {
  id: string;
  name: string;
  category: DocumentCategory;
  /** Display date in DD.MM.YYYY format */
  date: string;
  /** Path inside the Supabase `documents` bucket — omit when file not uploaded yet */
  storagePath?: string;
  important?: boolean;
}

export interface DocumentCategoryInfo {
  id: DocumentCategory;
  label: string;
}

export const documentCategories: DocumentCategoryInfo[] = [
  { id: "flights",    label: "טיסות" },
  { id: "insurance",  label: "ביטוח" },
  { id: "passports",  label: "דרכונים" },
  { id: "hotels",     label: "מלונות" },
  { id: "other",      label: "מסמכים נוספים" },
];

export const tripDocuments: TripDocument[] = [
  {
    id: "flight-international",
    name: "טיסות בינלאומיות — אישור (ת״א ↔ בואנוס איירס)",
    category: "flights",
    date: "30.06.2026",
    storagePath: "flights/flights-confirm.pdf",
    important: true,
  },
  {
    id: "flight-eze-brc-shimon",
    name: "טיסה בואנוס איירס → ברילוצ'ה (שמעון)",
    category: "flights",
    date: "06.07.2026",
    storagePath: "flights/Reserva de viaje 06 julio para SHIMON MANDALAOUI.pdf",
    important: true,
  },
  {
    id: "flight-eze-brc-omer",
    name: "טיסה בואנוס איירס → ברילוצ'ה (עומר)",
    category: "flights",
    date: "06.07.2026",
    storagePath: "flights/Recibo de viaje 06 julio para OMER MANDALAOUI.pdf",
    important: true,
  },
  {
    id: "flight-brc-eze",
    name: "טיסה ברילוצ'ה → בואנוס איירס",
    category: "flights",
    date: "10.07.2026",
    important: true,
  },
  {
    id: "hotel-buenos-aires",
    name: "אישור הזמנה — City Express Plus Palermo",
    category: "hotels",
    date: "01.07.2026",
    storagePath: "hotels/City Express Plus By Marriott Buenos Aires Palermo.pdf",
    important: true,
  },
];

export function getDocumentsByCategory(category: DocumentCategory): TripDocument[] {
  return tripDocuments.filter((doc) => doc.category === category);
}

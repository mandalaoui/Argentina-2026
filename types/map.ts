export type MapCity =
  | "Buenos Aires"
  | "Bariloche"
  | "Rosario"
  | "Colonia del Sacramento"
  | "Tigre";

export type MapCategory =
  | "restaurant"
  | "bar"
  | "attraction"
  | "shopping"
  | "transport"
  | "park"
  | "neighborhood"
  | "casino"
  | "dayTrip"
  | "other";

export type MapPriority = "high" | "medium" | "low";

export interface MapPlace {
  id: string;
  nameHe: string;
  nameEn: string;
  city: MapCity;
  country: "Argentina" | "Uruguay";
  area: string;
  areaHe: string;
  category: MapCategory;
  categoryHe: string;
  tags: string[];
  descriptionHe: string;
  address?: string;
  rating?: number;
  googleMapsUrl?: string;
  coordinates?: { lat: number; lng: number } | null;
  relevantDays?: number[];
  priority: MapPriority;
  source?: "google-favorites" | "manual" | "trip-plan";
}

export const CATEGORY_CONFIG: Record<MapCategory, { label: string; icon: string }> = {
  restaurant:   { label: "מסעדות",   icon: "🍽️" },
  bar:          { label: "ברים",     icon: "🍸" },
  attraction:   { label: "אטרקציות", icon: "📍" },
  shopping:     { label: "קניות",    icon: "🛍️" },
  transport:    { label: "תחבורה",   icon: "✈️" },
  park:         { label: "פארקים",   icon: "🌳" },
  neighborhood: { label: "שכונות",   icon: "🏘️" },
  casino:       { label: "קזינו",    icon: "🎰" },
  dayTrip:      { label: "טיולי יום",icon: "🧭" },
  other:        { label: "אחר",      icon: "•"  },
};

export const CITY_LABELS: Record<MapCity, string> = {
  "Buenos Aires":          "בואנוס איירס",
  "Bariloche":             "ברילוצ׳ה",
  "Rosario":               "רוסאריו",
  "Colonia del Sacramento":"קולוניה",
  "Tigre":                 "טיגרה",
};

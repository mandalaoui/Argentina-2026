import { destinations } from "./trip";
import type { Activity } from "./trip";

export interface TripDay {
  day: number;
  date: string;                  // "2026-07-01"
  locationLabel: string;         // display label for the day
  destinationId: string;         // for accommodation lookup
  activities: Activity[];        // activities shown in checklist
  activityStorageKey: string;    // shared with DestinationDrawer
  subTripId?: string;            // if this is a sub-trip day
}

export interface LocationGroup {
  label: string;                 // "בואנוס איירס"
  flag: "AR" | "UY";
  days: number[];                // [1,2,3,4,5]
}

const ba    = destinations[0];
const brc   = destinations[1];
const baRet = destinations[2];   // shares activities with ba via getter

const rosario = ba.subTrips?.find((s) => s.id === "rosario")!;
const colonia = ba.subTrips?.find((s) => s.id === "colonia")!;

export const tripDays: TripDay[] = [
  { day: 1,  date: "2026-07-01", locationLabel: "בואנוס איירס — הגעה",    destinationId: "buenos-aires",        activities: ba.activities,       activityStorageKey: "activities-buenos-aires" },
  { day: 2,  date: "2026-07-02", locationLabel: "בואנוס איירס",            destinationId: "buenos-aires",        activities: ba.activities,       activityStorageKey: "activities-buenos-aires" },
  { day: 3,  date: "2026-07-03", locationLabel: "בואנוס איירס",            destinationId: "buenos-aires",        activities: ba.activities,       activityStorageKey: "activities-buenos-aires" },
  { day: 4,  date: "2026-07-04", locationLabel: "רוסאריו — יום טיול",      destinationId: "buenos-aires",        activities: rosario?.activities ?? [], activityStorageKey: "activities-rosario", subTripId: "rosario" },
  { day: 5,  date: "2026-07-05", locationLabel: "קולוניה — יום טיול",      destinationId: "buenos-aires",        activities: colonia?.activities ?? [], activityStorageKey: "activities-colonia", subTripId: "colonia" },
  { day: 6,  date: "2026-07-06", locationLabel: "ברילוצ'ה — הגעה",         destinationId: "bariloche",           activities: brc.activities,      activityStorageKey: "activities-bariloche" },
  { day: 7,  date: "2026-07-07", locationLabel: "ברילוצ'ה",                destinationId: "bariloche",           activities: brc.activities,      activityStorageKey: "activities-bariloche" },
  { day: 8,  date: "2026-07-08", locationLabel: "ברילוצ'ה",                destinationId: "bariloche",           activities: brc.activities,      activityStorageKey: "activities-bariloche" },
  { day: 9,  date: "2026-07-09", locationLabel: "ברילוצ'ה",                destinationId: "bariloche",           activities: brc.activities,      activityStorageKey: "activities-bariloche" },
  { day: 10, date: "2026-07-10", locationLabel: "בואנוס איירס — חזרה",     destinationId: "buenos-aires-return", activities: baRet.activities,    activityStorageKey: "activities-buenos-aires" },
  { day: 11, date: "2026-07-11", locationLabel: "בואנוס איירס",            destinationId: "buenos-aires-return", activities: baRet.activities,    activityStorageKey: "activities-buenos-aires" },
  { day: 12, date: "2026-07-12", locationLabel: "בואנוס איירס — טיסה הביתה", destinationId: "buenos-aires-return", activities: baRet.activities, activityStorageKey: "activities-buenos-aires" },
];

export const locationGroups: LocationGroup[] = [
  { label: "בואנוס איירס", flag: "AR", days: [1, 2, 3, 4, 5] },
  { label: "ברילוצ'ה",     flag: "AR", days: [6, 7, 8, 9] },
  { label: "בואנוס איירס", flag: "AR", days: [10, 11, 12] },
];

export function getDayAccommodation(destinationId: string) {
  return destinations.find((d) => d.id === destinationId)?.accommodation ?? null;
}

export interface Activity {
  id: string;
  nameHe: string;
  name: string;
  category: "attraction" | "nature" | "culture" | "food" | "nightlife" | "transport";
  mapsUrl: string;
  notes?: string;
}

export interface Place {
  id: string;
  name: string;
  nameHe?: string;
  type: string;
  mapsUrl: string;
  notes: string;
  recommended?: boolean;
}

export interface SubTrip {
  id: string;
  nameHe: string;
  name: string;
  description: string;
  transport: string;
  activities: Activity[];
  tips: string[];
}

export interface Destination {
  id: string;
  name: string;
  nameHe: string;
  country: "Argentina" | "Uruguay";
  flag: "AR" | "UY";
  startDate: string;
  endDate: string;
  nights: number;
  accommodation: {
    name: string;
    address: string;
    bookingUrl: string;
    checkIn: string;
    checkOut: string;
    phone?: string;
    notes?: string;
  };
  activities: Activity[];
  restaurants: Place[];
  bars: Place[];
  tips: string[];
  subTrips?: SubTrip[];
}

export const destinations: Destination[] = [
  {
    id: "buenos-aires",
    name: "Buenos Aires",
    nameHe: "בואנוס איירס",
    country: "Argentina",
    flag: "AR",
    startDate: "2026-07-01",
    endDate: "2026-07-06",
    nights: 5,
    accommodation: {
      name: "City Express Plus by Marriott Buenos Aires Palermo",
      address: "Guatemala 4931, Buenos Aires, 1425 Argentina",
      bookingUrl: "https://hotels.com",
      checkIn: "2026-07-01T15:00:00",
      checkOut: "2026-07-06T12:00:00",
      phone: "+54 (1) 145566700",
      notes: "הצגת דרכון זר + כרטיס אשראי לא ארגנטינאי → פטור ממע״מ 21%",
    },
    activities: [
      {
        id: "ba-colón",
        nameHe: "תיאטרון קולון",
        name: "Teatro Colón",
        category: "culture",
        mapsUrl: "https://maps.google.com/?q=Teatro+Colón+Buenos+Aires",
      },
      {
        id: "ba-recoleta-cemetery",
        nameHe: "בית הקברות רקולטה",
        name: "Cementerio de la Recoleta",
        category: "culture",
        mapsUrl: "https://maps.google.com/?q=Cementerio+de+la+Recoleta",
        notes: "קברה של אוויטה פרון",
      },
      {
        id: "ba-obelisco",
        nameHe: "האובליסק",
        name: "Obelisco de Buenos Aires",
        category: "attraction",
        mapsUrl: "https://maps.google.com/?q=Obelisco+Buenos+Aires",
      },
      {
        id: "ba-plaza-mayo",
        nameHe: "פלאזה דה מאיו",
        name: "Plaza de Mayo",
        category: "culture",
        mapsUrl: "https://maps.google.com/?q=Plaza+de+Mayo+Buenos+Aires",
        notes: "לב ההיסטורי של העיר",
      },
      {
        id: "ba-casa-rosada",
        nameHe: "קאסה רוסדה",
        name: "Casa Rosada",
        category: "culture",
        mapsUrl: "https://maps.google.com/?q=Casa+Rosada+Buenos+Aires",
        notes: "ארמון הנשיאות — לצלם מבחוץ",
      },
      {
        id: "ba-bombonera",
        nameHe: "לה בומבונרה",
        name: "La Bombonera",
        category: "attraction",
        mapsUrl: "https://maps.google.com/?q=La+Bombonera+Buenos+Aires",
        notes: "מגרש בוקה ג'וניורס — טיול + חנות",
      },
      {
        id: "ba-ateneo",
        nameHe: "אל אתנאו גרנד ספלנדיד",
        name: "El Ateneo Grand Splendid",
        category: "culture",
        mapsUrl: "https://maps.google.com/?q=El+Ateneo+Grand+Splendid",
        notes: "חנות ספרים בתיאטרון עתיק — חובה",
      },
      {
        id: "ba-caminito",
        nameHe: "קמיניטו",
        name: "Caminito",
        category: "attraction",
        mapsUrl: "https://maps.google.com/?q=Caminito+Buenos+Aires",
        notes: "רחוב הצבעים בלה בוקה",
      },
      {
        id: "ba-florida",
        nameHe: "רחוב פלורידה",
        name: "Peatonal Florida",
        category: "attraction",
        mapsUrl: "https://maps.google.com/?q=Peatonal+Florida+Buenos+Aires",
        notes: "רחוב הולכי הרגל — קניות ואווירה",
      },
    ],
    restaurants: [
      {
        id: "don-julio",
        name: "Don Julio",
        type: "פארייה",
        mapsUrl: "https://maps.google.com/?q=Don+Julio+Buenos+Aires",
        notes: "מהטובים בבואנוס — להזמין מקום מראש",
        recommended: true,
      },
      {
        id: "la-cabrera",
        name: "La Cabrera",
        type: "פארייה",
        mapsUrl: "https://maps.google.com/?q=La+Cabrera+Buenos+Aires",
        notes: "מנות ענק, פופולרי מאוד — יש תורים",
        recommended: true,
      },
      {
        id: "el-ferroviario",
        name: "El Ferroviario",
        type: "פארייה מקומי",
        mapsUrl: "https://maps.google.com/?q=El+Ferroviario+Buenos+Aires",
        notes: "פחות תיירותי, מקומי",
      },
      {
        id: "el-mercado",
        name: "El Mercado",
        type: "גריל",
        mapsUrl: "https://maps.google.com/?q=El+Mercado+Buenos+Aires",
        notes: "4.7 ⭐ — מומלץ מאוד",
        recommended: true,
      },
      {
        id: "fogon-asado",
        name: "Fogón Asado",
        type: "פארייה",
        mapsUrl: "https://maps.google.com/?q=Fogón+Asado+Buenos+Aires",
        notes: "4.7 ⭐",
        recommended: true,
      },
      {
        id: "el-preferido",
        name: "El Preferido de Palermo",
        type: "ארגנטינאי",
        mapsUrl: "https://maps.google.com/?q=El+Preferido+de+Palermo",
        notes: "4.4 ⭐ — קלאסי ומקומי",
      },
    ],
    bars: [
      {
        id: "boticario",
        name: "Boticario",
        type: "בר",
        mapsUrl: "https://maps.google.com/?q=Boticario+Buenos+Aires",
        notes: "4.5 ⭐ — Palermo",
        recommended: true,
      },
      {
        id: "tres-monos",
        name: "Tres Monos",
        type: "בר",
        mapsUrl: "https://maps.google.com/?q=Tres+Monos+Buenos+Aires",
        notes: "4.4 ⭐ — Palermo Soho",
      },
      {
        id: "presidente-bar",
        name: "Presidente Bar",
        type: "בר קוקטיילים",
        mapsUrl: "https://maps.google.com/?q=Presidente+Bar+Buenos+Aires",
        notes: "4.4 ⭐",
      },
      {
        id: "victor-bar",
        name: "Victor Audio Bar",
        type: "בר",
        mapsUrl: "https://maps.google.com/?q=Victor+Audio+Bar+Buenos+Aires",
        notes: "4.7 ⭐",
        recommended: true,
      },
      {
        id: "piso15",
        name: "Piso 15 Sky Bar",
        type: "בר גג",
        mapsUrl: "https://maps.google.com/?q=Piso+15+Sky+Bar+Buenos+Aires",
        notes: "4.5 ⭐ — נוף לעיר",
      },
    ],
    tips: [
      "כסף: להחליף דולרים מזומנים לפסו בצ'יינג'ים מוסמכים — השער טוב משמעותית",
      "מונית: להשתמש באובר / קביפי בלבד — לא מונית רחוב",
      "לינה: אחסון מזוודות זמין לאחר צ'ק-אאוט",
      "בטיחות: לשמור על הטלפון ברחובות עמוסים",
      "שעות: ארגנטינאים אוכלים ערב מאוחר — מסעדות מתמלאות אחרי 21:00",
      "מע״מ: הצגת דרכון זר + כרטיס לא ארגנטינאי → פטור ממע״מ 21% במלון",
    ],
    subTrips: [
      {
        id: "rosario",
        nameHe: "רוסאריו",
        name: "Rosario",
        description: "העיר של מסי — יום שלם של אווירה, תמונות וקפה",
        transport: "TODO — אוטובוס / רכבת מבואנוס (כ-4 שעות)",
        activities: [
          {
            id: "flag-monument",
            nameHe: "מונומנט הדגל הלאומי",
            name: "National Flag Monument",
            category: "attraction",
            mapsUrl: "https://maps.google.com/?q=National+Flag+Monument+Rosario",
          },
          {
            id: "independencia-park",
            nameHe: "פארק אינדפנדנסיה",
            name: "Independencia Park",
            category: "nature",
            mapsUrl: "https://maps.google.com/?q=Independencia+Park+Rosario",
          },
          {
            id: "parana-river",
            nameHe: "טיילת נהר הפרנה",
            name: "Costanera del Paraná",
            category: "nature",
            mapsUrl: "https://maps.google.com/?q=Costanera+Rosario",
          },
          {
            id: "newells",
            nameHe: "מגרש ניואלס אולד בויס",
            name: "Newell's Old Boys",
            category: "attraction",
            mapsUrl: "https://maps.google.com/?q=Newell%27s+Old+Boys+Rosario",
            notes: "הקבוצה של מסי בילדותו",
          },
        ],
        tips: ["יום אחד מספיק בנוחות", "הסיבה האמיתית: העיר של מסי — לקחת תמונות"],
      },
      {
        id: "colonia",
        nameHe: "קולוניה דל סקרמנטו",
        name: "Colonia del Sacramento",
        description: "עיר עתיקה באורוגוואי — יום טיול מהמם",
        transport: "TODO — Buquebus מבואנוס (כ-1:15 שעות)",
        activities: [
          {
            id: "barrio-historico",
            nameHe: "הרובע ההיסטורי",
            name: "Barrio Histórico",
            category: "culture",
            mapsUrl: "https://maps.google.com/?q=Barrio+Histórico+Colonia+del+Sacramento",
            notes: "מורשת עולמית UNESCO",
          },
          {
            id: "lighthouse",
            nameHe: "המגדלור",
            name: "Faro de Colonia del Sacramento",
            category: "attraction",
            mapsUrl: "https://maps.google.com/?q=Colonia+del+Sacramento+Lighthouse",
          },
          {
            id: "suspiros",
            nameHe: "רחוב האנחות",
            name: "Calle de los Suspiros",
            category: "attraction",
            mapsUrl: "https://maps.google.com/?q=Calle+de+los+Suspiros+Colonia",
            notes: "4.7 ⭐ — רחוב אבן ציורי",
          },
        ],
        tips: [
          "לסייר ברגל — העיר קטנה ונוחה",
          "לא חייבים לתכנן סביב שקיעה — יפה בכל שעה",
          "לשתות קפה ברחובות האבן",
        ],
      },
    ],
  },

  {
    id: "bariloche",
    name: "San Carlos de Bariloche",
    nameHe: "ברילוצ'ה",
    country: "Argentina",
    flag: "AR",
    startDate: "2026-07-06",
    endDate: "2026-07-10",
    nights: 4,
    accommodation: {
      name: "TODO — עדיין לא נבחר",
      address: "TODO",
      bookingUrl: "",
      checkIn: "2026-07-06T14:00:00",
      checkOut: "2026-07-10T11:00:00",
    },
    activities: [
      {
        id: "brc-campanario",
        nameHe: "סרו קמפנאריו",
        name: "Cerro Campanario",
        category: "nature",
        mapsUrl: "https://maps.google.com/?q=Cerro+Campanario+Bariloche",
        notes: "רכבל + נוף פנורמי על האגמים — חובה",
      },
      {
        id: "brc-circuito-chico",
        nameHe: "סירקויטו צ'יקו",
        name: "Circuito Chico",
        category: "nature",
        mapsUrl: "https://maps.google.com/?q=Circuito+Chico+Bariloche",
        notes: "הלולאה הקלאסית עם אגמים ונופים — מומלץ לשכור רכב",
      },
      {
        id: "brc-catedral",
        nameHe: "סרו קתדראל",
        name: "Cerro Catedral",
        category: "nature",
        mapsUrl: "https://maps.google.com/?q=Cerro+Catedral+Bariloche",
        notes: "אתר סקי + רכבלים — גם בקיץ",
      },
      {
        id: "brc-llao-llao",
        nameHe: "ייאו ייאו",
        name: "Llao Llao",
        category: "nature",
        mapsUrl: "https://maps.google.com/?q=Llao+Llao+Hotel+Bariloche",
        notes: "המלון האייקוני — לצלם, לשתות קפה, לחוות",
      },
      {
        id: "brc-nahuel-huapi",
        nameHe: "פארק לאומי נאואל האואפי",
        name: "Nahuel Huapi National Park",
        category: "nature",
        mapsUrl: "https://maps.google.com/?q=Nahuel+Huapi+National+Park",
        notes: "אגמים, עצים, טיולי רגל",
      },
    ],
    restaurants: [
      {
        id: "brc-alberto",
        name: "El Boliche de Alberto",
        nameHe: "דון אלברטו",
        type: "פארייה",
        mapsUrl: "https://maps.google.com/?q=El+Boliche+de+Alberto+Bariloche",
        notes: "4.6 ⭐ — Villegas 347, Bariloche",
        recommended: true,
      },
    ],
    bars: [],
    tips: [
      "בגדים חמים חובה — יולי = חורף, קר ורוח",
      "מעיל, כובע וכפפות — בפרט לרכבלים",
      "שוקולד ברילוצ'ה — חנויות ברחוב Mitre — חובה",
      "מומלץ לשכור רכב לגמישות ב-Circuito Chico",
      "בירות מקומיות — לנסות Antares ו-Berlina",
    ],
  },

  {
    id: "buenos-aires-return",
    name: "Buenos Aires",
    nameHe: "בואנוס איירס (חזרה)",
    country: "Argentina",
    flag: "AR",
    startDate: "2026-07-10",
    endDate: "2026-07-12",
    nights: 2,
    accommodation: {
      name: "City Express Plus by Marriott Buenos Aires Palermo",
      address: "Guatemala 4931, Buenos Aires, 1425 Argentina",
      bookingUrl: "https://hotels.com",
      checkIn: "2026-07-10T15:00:00",
      checkOut: "2026-07-12T12:00:00",
      phone: "+54 (1) 145566700",
    },
    // Same activities, restaurants and bars as the first Buenos Aires stay
    get activities() { return destinations[0].activities; },
    get restaurants() { return destinations[0].restaurants; },
    get bars()        { return destinations[0].bars; },
    tips: [
      "קניות אחרונות — מזכרות, שוקולד, מתנות",
      "ארוחות שנשארו ברשימה",
      "מנוחה לפני טיסת הלילה",
      "צ'ק-אאוט 12:00 — הטיסה ב-12:10 → לצאת מוקדם!",
    ],
  },
];

// ─── Daily plan ──────────────────────────────────────────────────────────────

export type DayPlanEntry = string | Activity;

/** Activity IDs reference items from destinations / sub-trips; inline Activity = day-only tasks */
export const tripDayPlans: Record<string, DayPlanEntry[]> = {
  "2026-07-01": [
    {
      id: "day1-family",
      nameHe: "ביקור משפחה",
      name: "Family visit",
      category: "culture",
      mapsUrl: "https://maps.google.com/?q=Buenos+Aires",
      notes: "יום ראשון להגעה",
    },
    {
      id: "day1-checkin",
      nameHe: "צ'ק-אין למלון",
      name: "Hotel check-in",
      category: "transport",
      mapsUrl: "https://maps.google.com/?q=Guatemala+4931+Buenos+Aires",
      notes: "15:00",
    },
  ],
  "2026-07-02": ["ba-recoleta-cemetery", "ba-ateneo", "ba-caminito"],
  "2026-07-03": ["ba-colón", "ba-plaza-mayo", "ba-casa-rosada", "ba-obelisco"],
  "2026-07-04": ["barrio-historico", "lighthouse", "suspiros"],
  "2026-07-05": ["flag-monument", "independencia-park", "parana-river", "newells"],
  "2026-07-06": [
    {
      id: "day6-flight-brc",
      nameHe: "טיסה לברילוצ'ה",
      name: "Flight EZE → BRC",
      category: "transport",
      mapsUrl: "https://maps.google.com/?q=Aeropuerto+Internacional+Ezeiza",
      notes: "AR1670 — יציאה 07:45",
    },
    "brc-campanario",
  ],
  "2026-07-07": ["brc-circuito-chico", "brc-llao-llao"],
  "2026-07-08": ["brc-catedral", "brc-nahuel-huapi"],
  "2026-07-09": ["brc-circuito-chico"],
  "2026-07-10": [
    {
      id: "day10-flight-ba",
      nameHe: "טיסה חזרה לבואנוס איירס",
      name: "Flight BRC → EZE",
      category: "transport",
      mapsUrl: "https://maps.google.com/?q=Aeropuerto+San+Carlos+de+Bariloche",
      notes: "AR1925 — יציאה 09:00",
    },
    {
      id: "day10-checkin",
      nameHe: "צ'ק-אין למלון",
      name: "Hotel check-in",
      category: "transport",
      mapsUrl: "https://maps.google.com/?q=Guatemala+4931+Buenos+Aires",
    },
  ],
  "2026-07-11": ["ba-florida", "ba-bombonera"],
  "2026-07-12": [
    {
      id: "day12-checkout",
      nameHe: "צ'ק-אאוט מהמלון",
      name: "Hotel check-out",
      category: "transport",
      mapsUrl: "https://maps.google.com/?q=Guatemala+4931+Buenos+Aires",
      notes: "12:00 — הטיסה ב-12:10",
    },
    {
      id: "day12-flight-home",
      nameHe: "טיסה לישראל",
      name: "Flight EZE → TLV",
      category: "transport",
      mapsUrl: "https://maps.google.com/?q=Aeropuerto+Internacional+Ezeiza",
      notes: "UX42 — יציאה 12:10",
    },
  ],
};

const TRIP_START = "2026-07-01";
const TRIP_END   = "2026-07-12";

function getTodayDateString(): string {
  if (process.env.NODE_ENV === "development") {
    const devDate = process.env.NEXT_PUBLIC_DEV_TODAY_DATE;
    if (devDate && /^\d{4}-\d{2}-\d{2}$/.test(devDate)) {
      return devDate;
    }
  }
  return new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD local time
}

/** Hebrew long-form date for the effective "today" (respects dev override). */
export function getTodayDisplayDate(): string {
  const dateStr = getTodayDateString();
  return new Date(dateStr + "T12:00:00").toLocaleDateString("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function buildActivityRegistry(): Map<string, Activity> {
  const registry = new Map<string, Activity>();
  for (const dest of destinations) {
    for (const act of dest.activities) registry.set(act.id, act);
    for (const sub of dest.subTrips ?? []) {
      for (const act of sub.activities) registry.set(act.id, act);
    }
  }
  return registry;
}

const activityRegistry = buildActivityRegistry();

function resolveDayPlanEntries(entries: DayPlanEntry[]): Activity[] {
  return entries.flatMap((entry) => {
    if (typeof entry === "string") {
      const act = activityRegistry.get(entry);
      return act ? [act] : [];
    }
    return [entry];
  });
}

export function getPlannedActivitiesForDate(date: string): Activity[] {
  const entries = tripDayPlans[date];
  if (!entries?.length) return [];
  return resolveDayPlanEntries(entries);
}

export function getTodayPlannedActivities(): Activity[] {
  const today = getTodayDateString();
  if (today < TRIP_START || today > TRIP_END) return [];
  return getPlannedActivitiesForDate(today);
}

export function getCurrentDestination(): Destination | null {
  const today = getTodayDateString();
  return (
    destinations.find(
      (d) => d.startDate <= today && today <= d.endDate
    ) ?? null
  );
}

export function getTripDayInfo(): { day: number; total: number } | null {
  const todayStr = getTodayDateString();

  if (todayStr < TRIP_START || todayStr > TRIP_END) return null;

  const msPerDay = 1000 * 60 * 60 * 24;
  const start = new Date(TRIP_START + "T12:00:00"); // noon to avoid DST edge cases
  const now   = new Date(todayStr   + "T12:00:00");
  const end   = new Date(TRIP_END   + "T12:00:00");

  const day   = Math.round((now.getTime() - start.getTime()) / msPerDay) + 1;
  const total = Math.round((end.getTime() - start.getTime()) / msPerDay) + 1;
  return { day, total };
}

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

export function getCurrentDestination(): Destination | null {
  const today = new Date().toISOString().split("T")[0];
  return (
    destinations.find(
      (d) => d.startDate <= today && today <= d.endDate
    ) ?? null
  );
}

export function getTripDayInfo(): { day: number; total: number } | null {
  const tripStart = new Date("2026-07-01");
  const tripEnd = new Date("2026-07-12");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (today < tripStart || today > tripEnd) return null;

  const day = Math.floor((today.getTime() - tripStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const total = Math.floor((tripEnd.getTime() - tripStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return { day, total };
}

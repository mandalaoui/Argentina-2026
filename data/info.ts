export interface PackingItem {
  id: string;
  label: string;
  important?: boolean;
}

export interface AppItem {
  id: string;
  name: string;
  description: string;
  iosUrl: string;
  androidUrl: string;
  mustInstall: boolean;
}

export interface MoneyTip {
  id: string;
  title: string;
  body: string;
}

export interface CommunicationTip {
  id: string;
  title: string;
  body: string;
}

export const packingList: PackingItem[] = [
  // בגדים
  { id: "shorts", label: "מכנסיים קצרים x2" },
  { id: "pants", label: "מכנסיים ארוכים x1" },
  { id: "shirts", label: "חולצות x5" },
  { id: "socks", label: "גרביים ותחתונים x7" },
  { id: "walking-shoes", label: "נעלי הליכה נוחות" },
  { id: "evening-shoes", label: "נעלי ערב / קז'ואל" },
  { id: "winter-jacket", label: "מעיל חורף / רוח — קריטי לברילוצ'ה", important: true },
  { id: "hoodie", label: "סוודר / הוד" },
  { id: "sun-hat", label: "כובע לשמש" },
  { id: "warm-hat", label: "כובע חם (לברילוצ'ה)" },
  { id: "umbrella", label: "מטרייה קטנה / פונצ'ו" },
  // טכנולוגיה
  { id: "phone-charger", label: "מטען לטלפון" },
  { id: "powerbank", label: "מטען נייד (Power Bank)" },
  { id: "headphones", label: "אוזניות" },
  { id: "adapter", label: "מתאם חשמל — TYPE I (ארגנטינה)", important: true },
  { id: "camera", label: "מצלמה + מטען" },
  // בריאות
  { id: "meds-basic", label: "תרופות בסיסיות (כאב ראש, בטן, חום)" },
  { id: "sunscreen", label: "קרם הגנה" },
  { id: "personal-meds", label: "תרופות אישיות קבועות", important: true },
  { id: "bandages", label: "פלסטרים + חומר חיטוי" },
  { id: "mosquito", label: "תרסיס יתושים" },
  // מסמכים
  { id: "passport", label: "דרכון", important: true },
  { id: "flight-tickets", label: "כרטיסי טיסה (מודפס + דיגיטלי)", important: true },
  { id: "insurance-doc", label: "ביטוח נסיעות מודפס", important: true },
  { id: "credit-cards", label: "כרטיסי אשראי (לפחות שניים)", important: true },
  { id: "cash", label: "מזומן דולרים ($200–300)", important: true },
];

export const apps: AppItem[] = [
  {
    id: "google-maps",
    name: "Google Maps",
    description: "ניווט — להוריד offline לפני הטיול",
    iosUrl: "https://apps.apple.com/app/google-maps/id585027354",
    androidUrl: "https://play.google.com/store/apps/details?id=com.google.android.apps.maps",
    mustInstall: true,
  },
  {
    id: "google-translate",
    name: "Google Translate",
    description: "תרגום מהיר + מצלמה — להוריד ספרדית offline",
    iosUrl: "https://apps.apple.com/app/google-translate/id414706506",
    androidUrl: "https://play.google.com/store/apps/details?id=com.google.android.apps.translate",
    mustInstall: true,
  },
  {
    id: "uber",
    name: "Uber",
    description: "הזמנת מונית — הכי נוח בבואנוס",
    iosUrl: "https://apps.apple.com/app/uber/id368677368",
    androidUrl: "https://play.google.com/store/apps/details?id=com.ubercab",
    mustInstall: true,
  },
  {
    id: "cabify",
    name: "Cabify",
    description: "מונית חלופית — לפעמים זול יותר מאובר",
    iosUrl: "https://apps.apple.com/app/cabify/id476087442",
    androidUrl: "https://play.google.com/store/apps/details?id=com.cabify.rider",
    mustInstall: true,
  },
  {
    id: "wise",
    name: "Wise / Revolut",
    description: "שערי מטבע בשטח",
    iosUrl: "https://apps.apple.com/app/wise/id612261027",
    androidUrl: "https://play.google.com/store/apps/details?id=com.transferwise.android",
    mustInstall: false,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "תקשורת",
    iosUrl: "https://apps.apple.com/app/whatsapp/id310633997",
    androidUrl: "https://play.google.com/store/apps/details?id=com.whatsapp",
    mustInstall: true,
  },
];

export const moneyTips: MoneyTip[] = [
  {
    id: "blue-dollar",
    title: "Blue Dollar — שוק מקביל",
    body: "בארגנטינה קיים שוק מקביל לדולר. מומלץ להחליף דולרים מזומנים אצל צ'יינג'ים מוסמכים — השער טוב משמעותית מהרשמי.",
  },
  {
    id: "cash",
    title: "מזומן דולרים",
    body: "לצאת עם $200–300 מזומן. מחליפים לפסו בארגנטינה, לא בישראל.",
  },
  {
    id: "credit",
    title: "כרטיסי אשראי",
    body: "עובדים בכל מקום, אך לפעמים מקבלים שער רע. לשלם בדולרים כשניתן.",
  },
  {
    id: "atm",
    title: "ATM",
    body: "עמלות גבוהות מאוד — לא להשתמש כמקור ראשי.",
  },
  {
    id: "tip",
    title: "טיפ (propina)",
    body: "לא חובה חוקית, אבל 10% במסעדות זה נהוג ומקובל.",
  },
  {
    id: "vat",
    title: "פטור ממע\"מ במלון",
    body: "הצגת דרכון זר + כרטיס אשראי לא ארגנטינאי → פטור ממע\"מ 21% בלינה.",
  },
];

export const communicationTips: CommunicationTip[] = [
  {
    id: "esim",
    title: "eSIM / SIM מקומי",
    body: "מומלץ לרכוש eSIM לפני הטיול (Airalo, Holafly וכו') או SIM מקומי בשדה התעופה. פרטי הספק יתעדכנו לפני היציאה.",
  },
  {
    id: "wifi",
    title: "WiFi",
    body: "במלון יש WiFi חינם. בבתי קפה ומסעדות — WiFi לרוב זמין, אך לא תמיד יציב.",
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    body: "האפליקציה הפופולרית ביותר בארגנטינה. מומלץ להוריד לפני הטיול ולהשתמש ב-WiFi או ב-eSIM.",
  },
  {
    id: "roaming",
    title: "רואמינג ישראלי",
    body: "לפני הטיסה — לבדוק מסלול רואמינג אצל הספק. לעיתים יקר יותר מ-eSIM מקומי.",
  },
  {
    id: "hotel-phone",
    title: "טלפון המלון בבואנוס",
    body: "City Express Plus Palermo: +54 (1) 145566700 — לשמור במועדפים.",
  },
];

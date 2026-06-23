export type PhraseCategory =
  | "basic"
  | "restaurant"
  | "hotel"
  | "transport"
  | "money"
  | "emergency"
  | "football";

export interface Phrase {
  id: string;
  category: PhraseCategory;
  hebrew: string;
  spanish: string;
  transliteration: string;
}

export const categoryLabels: Record<PhraseCategory, string> = {
  basic:      "שיחות בסיסיות",
  restaurant: "מסעדות",
  hotel:      "מלון",
  transport:  "תחבורה",
  money:      "כסף",
  emergency:  "חירום",
  football:   "כדורגל",
};

export const phrases: Phrase[] = [
  // שיחות בסיסיות
  { id: "hello",        category: "basic", hebrew: "שלום",                       spanish: "Hola",                        transliteration: "אולה" },
  { id: "thanks",       category: "basic", hebrew: "תודה",                       spanish: "Gracias",                     transliteration: "גרסיאס" },
  { id: "please",       category: "basic", hebrew: "בבקשה",                      spanish: "Por favor",                   transliteration: "פור פבור" },
  { id: "yes-no",       category: "basic", hebrew: "כן / לא",                    spanish: "Sí / No",                     transliteration: "סי / נו" },
  { id: "sorry",        category: "basic", hebrew: "סליחה",                      spanish: "Perdón",                      transliteration: "פרדון" },
  { id: "no-understand",category: "basic", hebrew: "לא מבין",                    spanish: "No entiendo",                 transliteration: "נו אנטיינדו" },
  { id: "english",      category: "basic", hebrew: "אתה מדבר אנגלית?",           spanish: "¿Hablas inglés?",             transliteration: "אבלאס אינגלס?" },
  { id: "bathroom",     category: "basic", hebrew: "היכן השירותים?",             spanish: "¿Dónde está el baño?",        transliteration: "דונדה אסטה אל באניו?" },
  { id: "how-much",     category: "basic", hebrew: "כמה זה עולה?",               spanish: "¿Cuánto cuesta?",             transliteration: "קוואנטו קואסטה?" },
  // מסעדות
  { id: "menu",         category: "restaurant", hebrew: "אפשר תפריט?",           spanish: "¿Me trae la carta?",          transliteration: "מה טראה לה קארטה?" },
  { id: "bill",         category: "restaurant", hebrew: "אפשר חשבון?",           spanish: "La cuenta, por favor",        transliteration: "לה קוואנטה, פור פבור" },
  { id: "water",        category: "restaurant", hebrew: "מים בבקשה",             spanish: "Agua, por favor",             transliteration: "אגואה, פור פבור" },
  { id: "no-ice",       category: "restaurant", hebrew: "בלי קרח",               spanish: "Sin hielo",                   transliteration: "סין יאלו" },
  { id: "delicious",    category: "restaurant", hebrew: "טעים מאוד",             spanish: "Muy rico",                    transliteration: "מוי ריקו" },
  { id: "i-want",       category: "restaurant", hebrew: "אני רוצה...",           spanish: "Quiero...",                   transliteration: "קיארו..." },
  { id: "medium",       category: "restaurant", hebrew: "בינוני (עשיית בשר)",   spanish: "Punto",                       transliteration: "פונטו" },
  { id: "rare",         category: "restaurant", hebrew: "עם דם",                 spanish: "Jugoso",                      transliteration: "חוגוסו" },
  { id: "well-done",    category: "restaurant", hebrew: "עשוי מלא",              spanish: "Bien cocido",                 transliteration: "ביאן קוסידו" },
  { id: "share",        category: "restaurant", hebrew: "צלחות לשיתוף?",         spanish: "¿Para compartir?",            transliteration: "פארה קומפארטיר?" },
  // מלון
  { id: "reservation",  category: "hotel", hebrew: "יש לי הזמנה",               spanish: "Tengo una reserva",           transliteration: "טנגו אונה רסרבה" },
  { id: "checkout",     category: "hotel", hebrew: "צ'ק-אאוט מתי?",             spanish: "¿A qué hora es el check-out?",transliteration: "אה קה אורה אס אל צ'ק-אאוט?" },
  { id: "luggage",      category: "hotel", hebrew: "אפשר לאחסן מזוודות?",       spanish: "¿Puede guardar las maletas?", transliteration: "פואדה גוארדר לאס מלטס?" },
  { id: "wifi",         category: "hotel", hebrew: "יש WiFi?",                  spanish: "¿Hay WiFi?",                  transliteration: "איי וויפי?" },
  // תחבורה
  { id: "airport",      category: "transport", hebrew: "לנמל התעופה",            spanish: "Al aeropuerto",               transliteration: "אל אארופוארטו" },
  { id: "stop-here",    category: "transport", hebrew: "עצור כאן",              spanish: "Para acá",                    transliteration: "פארה אקא" },
  { id: "how-much-ride",category: "transport", hebrew: "כמה עולה הנסיעה?",      spanish: "¿Cuánto cuesta el viaje?",    transliteration: "קוואנטו קואסטה אל ויאחה?" },
  { id: "left-right",   category: "transport", hebrew: "שמאל / ימין",           spanish: "Izquierda / Derecha",         transliteration: "איסקיארדה / דרצ'ה" },
  { id: "straight",     category: "transport", hebrew: "ישר",                    spanish: "Recto",                       transliteration: "רקטו" },
  { id: "near-far",     category: "transport", hebrew: "קרוב / רחוק",           spanish: "Cerca / Lejos",               transliteration: "סרקה / לחוס" },
  // כסף
  { id: "exchange",     category: "money", hebrew: "אני רוצה להחליף כסף",       spanish: "Quiero cambiar dinero",       transliteration: "קיארו קמביאר דינרו" },
  { id: "dollar-rate",  category: "money", hebrew: "מה השער היום?",             spanish: "¿A cuánto está el dólar?",    transliteration: "אה קוואנטו אסטה אל דולאר?" },
  { id: "card",         category: "money", hebrew: "אפשר בכרטיס?",             spanish: "¿Acepta tarjeta?",            transliteration: "אסאפטה טארחטה?" },
  { id: "change",       category: "money", hebrew: "יש עודף?",                  spanish: "¿Tiene cambio?",              transliteration: "טיאנה קמביו?" },
  // חירום
  { id: "help",         category: "emergency", hebrew: "עזרה!",                  spanish: "¡Ayuda!",                     transliteration: "איודה!" },
  { id: "ambulance-call",category: "emergency", hebrew: "קראו אמבולנס",         spanish: "Llamen una ambulancia",       transliteration: "יאמן אונה אמבולנסיה" },
  { id: "stolen",       category: "emergency", hebrew: "נגנב לי",               spanish: "Me robaron",                  transliteration: "מה רובארון" },
  { id: "doctor",       category: "emergency", hebrew: "אני צריך רופא",          spanish: "Necesito un médico",          transliteration: "נסאסיטו און מדיקו" },
  { id: "hospital",     category: "emergency", hebrew: "איפה בית חולים?",       spanish: "¿Dónde hay un hospital?",     transliteration: "דונדה איי און אוספיטל?" },
  { id: "embassy",      category: "emergency", hebrew: "השגרירות הישראלית",     spanish: "La embajada de Israel",       transliteration: "לה אמבחדה דה ישראל" },
  // כדורגל
  { id: "where-from",   category: "football", hebrew: "מאיפה אתה?",             spanish: "¿De dónde eres?",             transliteration: "דה דונדה ארס?" },
  { id: "from-israel",  category: "football", hebrew: "אנחנו מישראל",            spanish: "Somos de Israel",             transliteration: "סומוס דה ישראל" },
  { id: "champion",     category: "football", hebrew: "ארגנטינה אלופת העולם!",  spanish: "¡Argentina campeona!",        transliteration: "ארחנטינה קמפאונה!" },
  { id: "score",        category: "football", hebrew: "מה התוצאה?",             spanish: "¿Cómo quedó?",                transliteration: "קומו קדו?" },
  { id: "what-player",  category: "football", hebrew: "איזה שחקן!",             spanish: "¡Qué jugador!",               transliteration: "קה חוגדור!" },
  { id: "goool",        category: "football", hebrew: "גוֹוֹוֹל!",              spanish: "¡Gooool!",                    transliteration: "גוֹוֹוֹל!" },
  { id: "world-champs", category: "football", hebrew: "אנחנו אלופי העולם",      spanish: "Somos campeones del mundo",   transliteration: "סומוס קמפאונס דל מונדו" },
];

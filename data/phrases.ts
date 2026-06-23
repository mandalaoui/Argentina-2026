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

/** Short tab labels for the Spanish page */
export const categoryTabLabels: Record<PhraseCategory, string> = {
  basic:      "שיחות",
  restaurant: "מסעדות",
  hotel:      "מלון",
  transport:  "תחבורה",
  money:      "כסף",
  emergency:  "חירום",
  football:   "כדורגל",
};

export const phraseCategories: PhraseCategory[] = [
  "basic",
  "restaurant",
  "hotel",
  "transport",
  "money",
  "emergency",
  "football",
];

export const phrases: Phrase[] = [

  // ── שיחות בסיסיות ────────────────────────────────────────────────────────
  { id: "from-israel",     category: "basic", hebrew: "אנחנו מישראל, בטיול בארגנטינה",              spanish: "Somos de Israel, estamos de viaje por Argentina",        transliteration: "סומוס דה ישראל, אסטאמוס דה ויאחה פור ארחנטינה" },
  { id: "no-spanish",      category: "basic", hebrew: "אנחנו לא מדברים ספרדית טוב, אפשר לדבר לאט?", spanish: "No hablamos bien español, ¿puede hablar más despacio?",   transliteration: "נו אבלאמוס ביאן אספאניול, פואדה אבלר מאס דספסיו?" },
  { id: "english",         category: "basic", hebrew: "אתה מדבר אנגלית?",                           spanish: "¿Hablas inglés?",                                        transliteration: "אבלאס אינגלס?" },
  { id: "recommend",       category: "basic", hebrew: "מה אתה ממליץ כאן?",                          spanish: "¿Qué me recomienda acá?",                                transliteration: "קה מה רקומיינדה אקא?" },
  { id: "how-far",         category: "basic", hebrew: "כמה רחוק זה ברגל?",                          spanish: "¿Cuánto se tarda caminando?",                            transliteration: "קוואנטו סה טרדה קמינאנדו?" },
  { id: "bathroom",        category: "basic", hebrew: "היכן השירותים בבקשה?",                       spanish: "¿Dónde está el baño, por favor?",                        transliteration: "דונדה אסטה אל באניו, פור פבור?" },
  { id: "beautiful",       category: "basic", hebrew: "איזו עיר יפה! אנחנו אוהבים פה",             spanish: "¡Qué ciudad hermosa! Nos encanta estar acá",             transliteration: "קה סיודד ארמוסה! נוס אנקנטה אסטר אקא" },
  { id: "photo",           category: "basic", hebrew: "אפשר שתצלם אותנו?",                          spanish: "¿Nos puede sacar una foto?",                             transliteration: "נוס פואדה סקר אונה פוטו?" },

  // ── מסעדות ───────────────────────────────────────────────────────────────
  { id: "reservation-rest",category: "restaurant", hebrew: "יש לנו הזמנה לשניים",                   spanish: "Tenemos una reserva para dos",                          transliteration: "טנמוס אונה רסרבה פארה דוס" },
  { id: "table-outside",   category: "restaurant", hebrew: "אפשר שולחן בחוץ?",                     spanish: "¿Tienen mesa afuera?",                                   transliteration: "טיאנן מסה אפוארה?" },
  { id: "menu",            category: "restaurant", hebrew: "אפשר לראות את התפריט?",                 spanish: "¿Nos trae la carta?",                                    transliteration: "נוס טראה לה קארטה?" },
  { id: "steak-order",     category: "restaurant", hebrew: "אני רוצה אסדו לשניים עם חזה ריבס",     spanish: "Queremos un asado para dos, con vacío y costillas",      transliteration: "קרמוס און אסדו פארה דוס, קון בסיו אי קוסטייאס" },
  { id: "rare",            category: "restaurant", hebrew: "בינוני — לא עם דם אבל גם לא יבש",      spanish: "Término medio — ni crudo ni muy hecho",                  transliteration: "טרמינו מדיו — ני קרודו ני מוי אצ'ו" },
  { id: "very-rare",       category: "restaurant", hebrew: "עם דם — ורוד מבפנים",                  spanish: "A punto rojo — bien jugoso por adentro",                transliteration: "אה פונטו רוחו — ביאן חוגוסו פור אדנטרו" },
  { id: "well-done",       category: "restaurant", hebrew: "עשוי מלא בלי ורוד",                     spanish: "Bien cocido, sin rosado adentro",                        transliteration: "ביאן קוסידו, סין רוסדו אדנטרו" },
  { id: "chimichurri",     category: "restaurant", hebrew: "אפשר צ'ימיצ'ורי בצד?",                 spanish: "¿Nos trae chimichurri aparte?",                          transliteration: "נוס טראה צ'ימיצ'ורי אפרטה?" },
  { id: "recommend-wine",  category: "restaurant", hebrew: "תמליץ לנו על יין ארגנטינאי טוב?",      spanish: "¿Nos recomienda un buen vino argentino?",                transliteration: "נוס רקומיינדה און בואן ויינו ארחנטינו?" },
  { id: "water-bottle",    category: "restaurant", hebrew: "בקבוק מים גדול, לא קר",                 spanish: "Una botella de agua grande, sin gas y sin hielo",       transliteration: "אונה בוטייה דה אגואה גרנדה, סין גס אי סין יאלו" },
  { id: "bill",            category: "restaurant", hebrew: "אפשר חשבון בבקשה? ביחד",               spanish: "La cuenta, por favor. Todo junto",                       transliteration: "לה קוואנטה, פור פבור. טודו חונטו" },
  { id: "tip",             category: "restaurant", hebrew: "הטיפ כלול בחשבון?",                     spanish: "¿La propina ya está incluida?",                          transliteration: "לה פרופינה יה אסטה אינקלואידה?" },
  { id: "takeaway",        category: "restaurant", hebrew: "אפשר לקחת את זה ללכת?",                 spanish: "¿Me lo puede poner para llevar?",                        transliteration: "מה לו פואדה פונר פארה ייבר?" },

  // ── מלון ────────────────────────────────────────────────────────────────
  { id: "checkin",         category: "hotel", hebrew: "הגענו לצ'ק-אין, שם מנדלאוי",               spanish: "Venimos a hacer el check-in, a nombre de Mandalaoui",   transliteration: "בנימוס א אסר אל צ'ק-אין, א נומברה דה מנדלאוי" },
  { id: "early-checkin",   category: "hotel", hebrew: "אפשר לבצע צ'ק-אין מוקדם? הגענו עכשיו",    spanish: "¿Podemos hacer el check-in antes? Llegamos ahora",       transliteration: "פודמוס אסר אל צ'ק-אין אנטס? ייגמוס אורה" },
  { id: "luggage-storage", category: "hotel", hebrew: "אפשר להשאיר מזוודות כמה שעות אחרי יציאה?", spanish: "¿Podemos dejar las maletas unas horas después del check-out?", transliteration: "פודמוס דחר לאס מלטס אונס אורס דספואס דל צ'ק-אאוט?" },
  { id: "room-problem",    category: "hotel", hebrew: "יש בעיה בחדר, אפשר לדבר עם המנהל?",       spanish: "Hay un problema en la habitación, ¿puedo hablar con el encargado?", transliteration: "איי און פרובלמה אן לה אביטסיון, פואדו אבלר קון אל אנקרגדו?" },
  { id: "ac",              category: "hotel", hebrew: "המזגן לא עובד בחדר שלנו",                  spanish: "El aire acondicionado no funciona en nuestra habitación", transliteration: "אל איירה אקונדיסיונדו נו פונסיונה אן נואסטרה אביטסיון" },
  { id: "taxi-hotel",      category: "hotel", hebrew: "אפשר להזמין לנו מונית לשדה התעופה?",      spanish: "¿Nos puede pedir un taxi al aeropuerto?",                transliteration: "נוס פואדה פדיר און טקסי אל אארופוארטו?" },
  { id: "wifi-pass",       category: "hotel", hebrew: "מה הסיסמה ל-WiFi?",                        spanish: "¿Cuál es la contraseña del WiFi?",                       transliteration: "קואל אס לה קונטרסניה דל וויפי?" },
  { id: "checkout-late",   category: "hotel", hebrew: "אפשר לעשות צ'ק-אאוט מאוחר עד שתיים?",    spanish: "¿Podemos hacer el check-out tarde, hasta las dos?",      transliteration: "פודמוס אסר אל צ'ק-אאוט טרדה, אסטה לס דוס?" },

  // ── תחבורה ──────────────────────────────────────────────────────────────
  { id: "uber-confirm",    category: "transport", hebrew: "אתה האובר שהזמנו? שם מנדלאוי",         spanish: "¿Sos el Uber que pedimos? A nombre de Mandalaoui",       transliteration: "סוס אל אובר קה פדימוס? אה נומברה דה מנדלאוי" },
  { id: "airport-ezeiza",  category: "transport", hebrew: "לשדה התעופה אזיסה בבקשה",              spanish: "Al aeropuerto de Ezeiza, por favor",                     transliteration: "אל אארופוארטו דה אסיסה, פור פבור" },
  { id: "aeroparque",      category: "transport", hebrew: "לאארופרקה חורחה ניוברי",               spanish: "Al Aeroparque Jorge Newbery",                            transliteration: "אל אארופרקה חורחה ניוברי" },
  { id: "address-confirm", category: "transport", hebrew: "אנחנו הולכים לכתובת הזו, נכון?",       spanish: "¿Vamos a esta dirección?",                               transliteration: "וואמוס אה אסטה דירקסיון?" },
  { id: "ac-taxi",         category: "transport", hebrew: "אפשר להדליק מיזוג? חם מאוד",           spanish: "¿Puede poner el aire? Hace mucho calor",                transliteration: "פואדה פונר אל איירה? אסה מוצ'ו קלור" },
  { id: "traffic",         category: "transport", hebrew: "כמה זמן לוקח עם פקק?",                 spanish: "¿Cuánto tarda con tráfico?",                             transliteration: "קוואנטו טרדה קון טרפיקו?" },
  { id: "buquebus",        category: "transport", hebrew: "לאיפה יוצאת הספינה לקולוניה?",         spanish: "¿Por dónde sale el barco a Colonia?",                    transliteration: "פור דונדה סלה אל ברקו אה קולוניה?" },
  { id: "walk-how-long",   category: "transport", hebrew: "כמה דקות ברגל מכאן?",                  spanish: "¿Cuántos minutos caminando desde acá?",                  transliteration: "קוואנטוס מינוטוס קמינאנדו דסדה אקא?" },

  // ── כסף ─────────────────────────────────────────────────────────────────
  { id: "blue-dollar",     category: "money", hebrew: "אתם מחליפים דולרים? מה השער הכחול היום?",  spanish: "¿Cambian dólares? ¿A cuánto está el dólar blue hoy?",   transliteration: "קמביאן דולרס? אה קוואנטו אסטה אל דולר בלו אוי?" },
  { id: "change-dollars",  category: "money", hebrew: "אני רוצה להחליף 100 דולר",                 spanish: "Quiero cambiar cien dólares",                            transliteration: "קיארו קמביאר סיאן דולרס" },
  { id: "card-payment",    category: "money", hebrew: "אפשר לשלם בכרטיס אשראי זר?",              spanish: "¿Puedo pagar con tarjeta de crédito extranjera?",        transliteration: "פואדו פגר קון טארחטה דה קרדיטו אקסטרנחרה?" },
  { id: "vat-exemption",   category: "money", hebrew: "יש פטור ממע\"מ לתיירים עם דרכון זר?",     spanish: "¿Hay exención de IVA para turistas con pasaporte extranjero?", transliteration: "איי אקסנסיון דה איבה פארה טוריסטס קון פספורטה אקסטרנחרו?" },
  { id: "receipt",         category: "money", hebrew: "אפשר קבלה בבקשה?",                        spanish: "¿Me puede dar el comprobante?",                          transliteration: "מה פואדה דר אל קומפרובנטה?" },
  { id: "expensive",       category: "money", hebrew: "זה יקר מדי, יש משהו זול יותר?",           spanish: "Es demasiado caro, ¿tiene algo más barato?",             transliteration: "אס דמסיאדו קרו, טיאנה לגו מאס ברטו?" },

  // ── חירום ────────────────────────────────────────────────────────────────
  { id: "stolen-phone",    category: "emergency", hebrew: "נגנב לי הטלפון, לאן פונים למשטרה?",   spanish: "Me robaron el celular, ¿dónde puedo hacer la denuncia?", transliteration: "מה רובארון אל סלולר, דונדה פואדו אסר לה דנונסיה?" },
  { id: "feel-bad",        category: "emergency", hebrew: "אני לא מרגיש טוב, צריך עזרה",         spanish: "No me siento bien, necesito ayuda",                      transliteration: "נו מה סיאנטו ביאן, נסאסיטו איודה" },
  { id: "ambulance",       category: "emergency", hebrew: "תקראו לאמבולנס בבקשה!",               spanish: "¡Llamen al SAME, por favor!",                            transliteration: "ייאמן אל סמה, פור פבור!" },
  { id: "lost",            category: "emergency", hebrew: "איבדנו את הדרך, אנחנו לא יודעים איפה אנחנו", spanish: "Nos perdimos, no sabemos dónde estamos",           transliteration: "נוס פרדימוס, נו סבמוס דונדה אסטמוס" },
  { id: "embassy",         category: "emergency", hebrew: "אנחנו ישראלים — איפה השגרירות הישראלית?", spanish: "Somos israelíes, ¿dónde queda la embajada de Israel?", transliteration: "סומוס ישראלים, דונדה קדה לה אמבחדה דה ישראל?" },
  { id: "insurance",       category: "emergency", hebrew: "יש לנו ביטוח נסיעות, איך מתקשרים לרופא?", spanish: "Tenemos seguro de viaje, ¿cómo contactamos a un médico?", transliteration: "טנמוס סגורו דה ויאחה, קומו קונטקטמוס א און מדיקו?" },
  { id: "safe",            category: "emergency", hebrew: "האזור הזה בטוח לטייל בלילה?",          spanish: "¿Es seguro caminar por acá de noche?",                   transliteration: "אס סגורו קמינר פור אקא דה נוצ'ה?" },

  // ── כדורגל ──────────────────────────────────────────────────────────────
  { id: "watch-match",     category: "football", hebrew: "איפה הכי טוב לראות את המשחק היום?",     spanish: "¿Dónde es el mejor lugar para ver el partido de hoy?",  transliteration: "דונדה אס אל מחור לוגר פארה בר אל פרטידו דה אוי?" },
  { id: "argentina-fan",   category: "football", hebrew: "אנחנו תומכים בארגנטינה! באנו מישראל",  spanish: "¡Somos hinchas de Argentina! Vinimos desde Israel",       transliteration: "סומוס אינצ'אס דה ארחנטינה! בינימוס דסדה ישראל" },
  { id: "messi",           category: "football", hebrew: "מסי הוא הטוב בעולם, אתה מסכים?",       spanish: "Messi es el mejor del mundo, ¿no?",                      transliteration: "מסי אס אל מחור דל מונדו, נו?" },
  { id: "champion-world",  category: "football", hebrew: "ארגנטינה אלופת העולם, מה הרגשה?",      spanish: "Argentina campeona del mundo, ¿cómo se siente?",         transliteration: "ארחנטינה קמפאונה דל מונדו, קומו סה סיאנטה?" },
  { id: "goal",            category: "football", hebrew: "גוֹוֹוֹוֹל!",                            spanish: "¡Goooool!",                                              transliteration: "גוֹוֹוֹוֹל!" },
  { id: "what-game",       category: "football", hebrew: "מה משחק! הם ממש טובים!",               spanish: "¡Qué partido! ¡Juegan muy bien!",                        transliteration: "קה פרטידו! חואגן מוי ביאן!" },
  { id: "jersey",          category: "football", hebrew: "איפה אפשר לקנות חולצה של ארגנטינה?",   spanish: "¿Dónde puedo comprar una camiseta de Argentina?",        transliteration: "דונדה פואדו קומפרר אונה קמיסטה דה ארחנטינה?" },
  { id: "rivals",          category: "football", hebrew: "ארגנטינה תנצח את ברזיל!",              spanish: "¡Argentina le va a ganar a Brasil!",                     transliteration: "ארחנטינה לה וה אה גנר אה ברסיל!" },
];

export interface Song {
  id: string;
  title: string;
  descriptionHe: string;
  whenToChantHe: string;
  lyricsSpanish: string;
  translationHe: string;
  youtubeUrl: string;
}

export const songs: Song[] = [
  {
    id: "muchachos",
    title: "Muchachos",
    descriptionHe: "השיר הבלתי-רשמי של נבחרת ארגנטינה ממונדיאל 2022 — הצ'אנט הכי מפורסם בעולם",
    whenToChantHe: "לפני משחק, בבר, בין אוהדים — תמיד עובד",
    lyricsSpanish:
      "Muchachos, ahora nos volvimos a ilusionar\nQuiero ganar la tercera, quiero ser campeón mundial\nY al Diego en el cielo lo podemos ver\nCon Don Diego y la Tota, alentándolo a Lionel",
    translationHe:
      "חבר'ה, שוב התרגשנו\nאני רוצה לזכות בשלישית, לזכות בגביע העולמי\nואת דייגו בשמיים אנחנו יכולים לראות\nעם דון דייגו ולה טוטה, מעודדים את ליאונל",
    youtubeUrl: "https://www.youtube.com/watch?v=x4I71dUo8yk",
  },
  {
    id: "vamos-argentina",
    title: "Vamos, Vamos Argentina",
    descriptionHe: "הצ'אנט הקלאסי הכי ישן — כולם יודעים אותו",
    whenToChantHe: "בכל מצב, תמיד עובד",
    lyricsSpanish:
      "Vamos, vamos Argentina\nVamos, vamos a ganar\nQue esta barra quilombera\nNo te deja, no te deja de alentar",
    translationHe:
      "קדימה, קדימה ארגנטינה\nקדימה, קדימה לנצח\nכי הפן הסוער הזה\nלא מפסיק, לא מפסיק לעודד",
    youtubeUrl: "https://www.youtube.com/results?search_query=Vamos+Vamos+Argentina",
  },
  {
    id: "brasil",
    title: "Brasil, Decime Qué Se Siente",
    descriptionHe: "הצ'אנט הפרובוקטיבי כלפי ברזיל — מהנה במיוחד",
    whenToChantHe: "כשארגנטינה מנצחת, כשמדברים על ברזיל",
    lyricsSpanish:
      "Brasil, decime qué se siente\nTener en casa a tu papá\nTe juro que aunque pasen los años\nNunca nos vamos a olvidar\nQue el Diego te gambeteó\nQue el Cani te vacunó\nLloraste en el Maracaná",
    translationHe:
      "ברזיל, תגיד לי איך זה מרגיש\nשאביך נמצא בביתך\nאני נשבע שגם אם יעברו שנים\nלעולם לא נשכח\nשדייגו פינת אותך\nשהקאני הצ'יק אותך\nבכית במאראקאנה",
    youtubeUrl: "https://www.youtube.com/results?search_query=Brasil+decime+que+se+siente",
  },
  {
    id: "dale-campeon",
    title: "Dale Campeón",
    descriptionHe: "צ'אנט אנרגטי וקצר — מושלם לתחילת משחק",
    whenToChantHe: "לפני קיקאוף, כשהקהל מתחמם",
    lyricsSpanish:
      "Dale campeón, dale campeón\nEse es el grito de esta hinchada\nDale campeón, dale campeón\nDale que hoy los aplastamos",
    translationHe:
      "קדימה אלוף, קדימה אלוף\nזו הצעקה של הפן הזה\nקדימה אלוף, קדימה אלוף\nקדימה שהיום נמחץ אותם",
    youtubeUrl: "https://www.youtube.com/results?search_query=Dale+Campeón+Argentina",
  },
  {
    id: "soy-argentino",
    title: "Soy Argentino",
    descriptionHe: "שיר זהות לאומי — רגשי יותר, לרגעים גדולים",
    whenToChantHe: "אחרי ניצחון, רגעים של גאווה",
    lyricsSpanish: "Soy argentino, es un sentimiento\nNo puedo parar",
    translationHe: "אני ארגנטינאי, זו תחושה\nאני לא יכול לעצור",
    youtubeUrl: "https://www.youtube.com/results?search_query=Soy+Argentino+cancion",
  },
];

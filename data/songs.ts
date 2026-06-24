export interface Song {
  id: string;
  title: string;
  descriptionHe: string;
  whenToChantHe: string;
  lyricsSpanish: string;
  translationHe: string;
  youtubeUrl: string;
  audioUrl?: string;
}

const AUDIO_BASE = "https://qogfwchnmrshrikscydp.supabase.co/storage/v1/object/public/audio";

export const songs: Song[] = [
  {
    id: "muchachos",
    title: "Muchachos",
    descriptionHe: "השיר הבלתי-רשמי של נבחרת ארגנטינה — הצ'אנט הכי מפורסם בעולם",
    whenToChantHe: "לפני משחק, בבר, בין אוהדים — תמיד עובד",
    lyricsSpanish:
      "En Argentina nací, tierra de Diego y Lionel\n" +
      "De los pibes de Malvinas que jamás olvidaré\n" +
      "No te lo puedo explicar\n" +
      "Porque no vas a entender\n" +
      "Las finales que perdimos, cuántos años las lloré\n\n" +
      "Pero eso se terminó, porque en el Maracaná\n" +
      "La final con los brazucas la volvió a ganar papá\n\n" +
      "Muchachos, ahora nos volvimos a ilusionar\n" +
      "Quiero ganar la tercera, quiero ser campeón mundial\n" +
      "Y al Diego, desde el cielo lo podemos ver\n" +
      "Con Don Diego y con La Tota, alentándolo a Lionel",
    translationHe:
      "נולדתי בארגנטינה, ארץ של דייגו וליאונל\n" +
      "של הבחורים ממלוינס שלעולם לא אשכח\n" +
      "לא יכול להסביר לך\n" +
      "כי לא תבין\n" +
      "את הגמרות שהפסדנו, כמה שנים בכיתי עליהן\n\n" +
      "אבל זה נגמר, כי במאראקאנה\n" +
      "את הגמר נגד הברזילאים ניצח שוב אבא\n\n" +
      "חבר'ה, שוב התרגשנו\n" +
      "רוצה לנצח בשלישית, רוצה להיות אלוף עולם\n" +
      "ואת דייגו, מהשמיים אנחנו יכולים לראות\n" +
      "עם דון דייגו ועם לה טוטה, מעודדים את ליאונל",
    youtubeUrl: "https://www.youtube.com/watch?v=x4I71dUo8yk",
    audioUrl: `${AUDIO_BASE}/muchachos.mp3`,
  },

  {
    id: "la-cuarta-estrella",
    title: "La Cuarta Estrella",
    descriptionHe: "השיר החדש של 2026 — ארגנטינה מכוונת לכוכב הרביעי",
    whenToChantHe: "לפני ובמהלך משחקי המונדיאל 2026",
    lyricsSpanish:
      "Soy hincha de La Selección\n" +
      "La aliento con el corazón\n" +
      "Ganamos la tercera con Lionel\n" +
      "Queremos ser campeones otra vez\n\n" +
      "Y treinta y dos años después\n" +
      "La Scaloneta va a vengar\n" +
      "La copa que le robaron al Diez\n" +
      "La que no nos dejaron levantar\n\n" +
      "Quiero ver la cuarta estrella\n" +
      "Brillar en la camiseta\n" +
      "Soy argento de la cuna hasta el cajón\n" +
      "Por Malvinas, por El Diego\n" +
      "Por la última de Leo\n" +
      "Argentina quiero verte bicampeón",
    translationHe:
      "אני אוהד הנבחרת\n" +
      "מעודד אותה מהלב\n" +
      "ניצחנו בשלישית עם ליאונל\n" +
      "אנחנו רוצים להיות אלופים שוב\n\n" +
      "ושלושים ושתיים שנה אחרי\n" +
      "הסקלונטה תנקום\n" +
      "את הגביע שנגנב מהעשר\n" +
      "שלא הרשו לנו להרים\n\n" +
      "רוצה לראות את הכוכב הרביעי\n" +
      "נוצץ על החולצה\n" +
      "אני ארגנטינאי מהעריסה עד הקבר\n" +
      "בשביל מלוינס, בשביל אל דייגו\n" +
      "בשביל האחרונה של ליאו\n" +
      "ארגנטינה רוצה לראותך אלופה פעמיים",
    youtubeUrl: "https://www.youtube.com/watch?v=cbliXEOfDa8",
    audioUrl: `${AUDIO_BASE}/la-cuarta-estrella.mp3`,
  },

  {
    id: "vamos-argentina",
    title: "Vamos, Vamos Argentina",
    descriptionHe: "הצ'אנט הקלאסי הכי ישן — כולם יודעים אותו",
    whenToChantHe: "בכל מצב, תמיד עובד",
    lyricsSpanish:
      "Vamos, vamos, Argentina\n" +
      "Vamos, vamos a ganar\n" +
      "Que esta barra quilombera\n" +
      "No te deja, no te deja de alentar\n\n" +
      "El equipo está en la cancha\n" +
      "El partido ya empezó\n" +
      "El estadio se estremece\n" +
      "Cada vez que la Argentina hace un gol",
    translationHe:
      "קדימה, קדימה ארגנטינה\n" +
      "קדימה, קדימה לנצח\n" +
      "כי הפן הרועש הזה\n" +
      "לא עוזב אותך, לא מפסיק לעודד\n\n" +
      "הקבוצה נמצאת במגרש\n" +
      "המשחק כבר התחיל\n" +
      "האצטדיון רועד\n" +
      "בכל פעם שארגנטינה עושה גול",
    youtubeUrl: "https://www.youtube.com/watch?v=cbliXEOfDa8&list=RDcbliXEOfDa8&start_radio=1",
    audioUrl: `${AUDIO_BASE}/vamos-argentina.mp3`,
  },

  {
    id: "brasil",
    title: "Brasil, Decime Qué Se Siente",
    descriptionHe: "הצ'אנט הפרובוקטיבי כלפי ברזיל — מהנה במיוחד",
    whenToChantHe: "כשארגנטינה מנצחת, כשמדברים על ברזיל",
    lyricsSpanish:
      "Brasil, decime que se siente\n" +
      "Tener en casa a tu papá\n" +
      "Te juro que aunque pasen los años\n" +
      "Nunca nos vamos a olvidar\n\n" +
      "Que el Diego los gambeteó\n" +
      "Que el Cani los vacunó\n" +
      "Que están llorando\n" +
      "De Italia hasta hoy\n" +
      "A Messi lo vas a ver\n" +
      "La Copa nos va a traer\n" +
      "Maradona es más grande que Pelé",
    translationHe:
      "ברזיל, תגיד לי איך זה מרגיש\n" +
      "שאביך נמצא בביתך\n" +
      "אני נשבע שגם אם יעברו שנים\n" +
      "לעולם לא נשכח\n\n" +
      "שדייגו פינת אותם\n" +
      "שהקאני הצ'יק אותם\n" +
      "שהם בוכים\n" +
      "מאיטליה ועד היום\n" +
      "את מסי אתה הולך לראות\n" +
      "הגביע הוא יביא לנו\n" +
      "מאראדונה גדול יותר מפלה",
    youtubeUrl: "https://www.youtube.com/watch?v=QOFTnepHofM",
    audioUrl: `${AUDIO_BASE}/brasil.mp3`,
  },

  {
    id: "dale-campeon",
    title: "Dale Campeón",
    descriptionHe: "צ'אנט אנרגטי וקצר — מושלם לתחילת משחק",
    whenToChantHe: "לפני קיקאוף, כשהקהל מתחמם",
    lyricsSpanish:
      "Dale campeón, dale campeón\n" +
      "Ese es el grito de esta hinchada\n" +
      "Dale campeón, dale campeón\n" +
      "Dale que hoy los aplastamos",
    translationHe:
      "קדימה אלוף, קדימה אלוף\n" +
      "זו הצעקה של הפן הזה\n" +
      "קדימה אלוף, קדימה אלוף\n" +
      "קדימה שהיום נמחץ אותם",
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

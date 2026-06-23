export type MatchStage =
  | "group"
  | "round-of-16"
  | "quarter-final"
  | "semi-final"
  | "final";

export interface Match {
  id: string;
  stage: MatchStage;
  stageLabel: string;
  date: string;       // ISO date
  time: string;       // HH:MM Argentina time (GMT-3)
  teamA: string;
  teamB: string;
  city: string;
  stadium: string;
  isArgentina?: boolean;
  result?: string;
}

export interface WatchingSpot {
  id: string;
  name: string;
  area: string;
  city: "Buenos Aires" | "Bariloche";
  mapsUrl: string;
  notes: string;
}

// משחקי ארגנטינה — לעדכן לפי לוח הטורניר האמיתי
export const argentinaMatches: Match[] = [
  {
    id: "arg-r16",
    stage: "round-of-16",
    stageLabel: "שמינית גמר",
    date: "2026-07-04",
    time: "18:00",
    teamA: "ארגנטינה",
    teamB: "TODO",
    city: "TODO",
    stadium: "TODO",
    isArgentina: true,
  },
  {
    id: "arg-qf",
    stage: "quarter-final",
    stageLabel: "רבע גמר",
    date: "2026-07-08",
    time: "21:00",
    teamA: "ארגנטינה",
    teamB: "TODO",
    city: "TODO",
    stadium: "TODO",
    isArgentina: true,
  },
];

// לוח שלבי נוקאאוט מלא — לעדכן
export const knockoutMatches: Match[] = [
  // שמינית גמר
  {
    id: "r16-1",
    stage: "round-of-16",
    stageLabel: "שמינית גמר",
    date: "2026-07-01",
    time: "15:00",
    teamA: "TODO",
    teamB: "TODO",
    city: "TODO",
    stadium: "TODO",
  },
  {
    id: "r16-2",
    stage: "round-of-16",
    stageLabel: "שמינית גמר",
    date: "2026-07-02",
    time: "18:00",
    teamA: "TODO",
    teamB: "TODO",
    city: "TODO",
    stadium: "TODO",
  },
  // רבע גמר
  {
    id: "qf-1",
    stage: "quarter-final",
    stageLabel: "רבע גמר",
    date: "2026-07-07",
    time: "18:00",
    teamA: "TODO",
    teamB: "TODO",
    city: "TODO",
    stadium: "TODO",
  },
  // חצי גמר
  {
    id: "sf-1",
    stage: "semi-final",
    stageLabel: "חצי גמר",
    date: "2026-07-11",
    time: "21:00",
    teamA: "TODO",
    teamB: "TODO",
    city: "TODO",
    stadium: "TODO",
  },
  // גמר
  {
    id: "final",
    stage: "final",
    stageLabel: "גמר",
    date: "2026-07-19",
    time: "21:00",
    teamA: "TODO",
    teamB: "TODO",
    city: "MetLife Stadium, New York",
    stadium: "MetLife Stadium",
  },
];

export const watchingSpots: WatchingSpot[] = [
  {
    id: "palermo-bars",
    name: "ברים בPalermo Soho",
    area: "Palermo Soho",
    city: "Buenos Aires",
    mapsUrl: "https://maps.google.com/?q=Palermo+Soho+Buenos+Aires",
    notes: "מוקרן בכל בר כמעט — לשאול מראש שיש הקרנה",
  },
  {
    id: "el-federal",
    name: "El Federal",
    area: "San Telmo",
    city: "Buenos Aires",
    mapsUrl: "https://maps.google.com/?q=El+Federal+San+Telmo+Buenos+Aires",
    notes: "בר מקומי ואמיתי — אווירה טובה",
  },
  {
    id: "bariloche-mitre",
    name: "ברים ברחוב Mitre",
    area: "מרכז ברילוצ'ה",
    city: "Bariloche",
    mapsUrl: "https://maps.google.com/?q=Mitre+Street+Bariloche",
    notes: "הרחוב הראשי — לשאול מקומיים איפה מקרינים",
  },
];

export function getNextArgentinaMatch(): Match | null {
  const now = new Date();
  return (
    argentinaMatches.find((m) => new Date(`${m.date}T${m.time}:00-03:00`) > now) ?? null
  );
}

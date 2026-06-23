export interface ApiMatch {
  id: number;
  status: string;
  stage: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  isArgentina: boolean;
}

const STAGE_LABELS: Record<string, string> = {
  GROUP_STAGE:    "שלב הבתים",
  LAST_32:        "שלב 32",        // 2026 WC new stage: 48→32
  LAST_16:        "שמינית גמר",
  QUARTER_FINALS: "רבע גמר",
  SEMI_FINALS:    "חצי גמר",
  THIRD_PLACE:    "משחק 3/4",
  FINAL:          "גמר",
  // legacy aliases (not returned by API but kept for static data)
  "round-of-16":  "שמינית גמר",
  "quarter-final":"רבע גמר",
  "semi-final":   "חצי גמר",
  "final":        "גמר",
};

const STAGE_ORDER: Record<string, number> = {
  GROUP_STAGE:    0,
  LAST_32:        1,
  LAST_16:        2,
  QUARTER_FINALS: 3,
  SEMI_FINALS:    4,
  THIRD_PLACE:    5,
  FINAL:          6,
};

export function stageLabelHe(stage: string): string {
  return STAGE_LABELS[stage] ?? stage;
}

export function stageOrder(stage: string): number {
  return STAGE_ORDER[stage] ?? 99;
}

// Direct server-side fetch — Next.js caches this for 8640s (max 10 req/day)
export async function fetchWorldCupMatches(): Promise<ApiMatch[]> {
  const key = process.env.FOOTBALL_DATA_API_KEY;
  if (!key) {
    console.warn("FOOTBALL_DATA_API_KEY not set");
    return [];
  }

  try {
    const res = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches",
      {
        headers: { "X-Auth-Token": key },
        next: { revalidate: 8640 }, // ~10 requests per day
      }
    );

    if (!res.ok) {
      console.error("football-data.org:", res.status, await res.text());
      return [];
    }

    const data = await res.json();

    return (data.matches ?? []).map((m: any) => ({
      id: m.id,
      status: m.status,
      stage: m.stage,
      date: m.utcDate,
      homeTeam: m.homeTeam?.shortName ?? m.homeTeam?.name ?? "TBD",
      awayTeam: m.awayTeam?.shortName ?? m.awayTeam?.name ?? "TBD",
      homeScore: m.score?.fullTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? null,
      isArgentina:
        (m.homeTeam?.name ?? "").toLowerCase().includes("argentina") ||
        (m.awayTeam?.name ?? "").toLowerCase().includes("argentina"),
    }));
  } catch (err) {
    console.error("fetchWorldCupMatches error:", err);
    return [];
  }
}

export function getNextArgentinaMatchFromApi(matches: ApiMatch[]): ApiMatch | null {
  const now = new Date();
  return (
    matches
      .filter((m) => m.isArgentina && new Date(m.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] ?? null
  );
}

export function getArgentinaMatches(matches: ApiMatch[]): ApiMatch[] {
  return matches
    .filter((m) => m.isArgentina)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getKnockoutMatches(matches: ApiMatch[]): ApiMatch[] {
  const knockouts = new Set(["LAST_32", "LAST_16", "QUARTER_FINALS", "SEMI_FINALS", "THIRD_PLACE", "FINAL"]);
  return matches
    .filter((m) => knockouts.has(m.stage))
    .sort((a, b) => {
      const stageDiff = stageOrder(a.stage) - stageOrder(b.stage);
      return stageDiff !== 0 ? stageDiff : new Date(a.date).getTime() - new Date(b.date).getTime();
    });
}

export function formatMatchTime(isoDate: string): { date: string; time: string } {
  const utc = new Date(isoDate);
  // Argentina = UTC-3
  const arg = new Date(utc.getTime() - 3 * 60 * 60 * 1000);
  const date = arg.toLocaleDateString("he-IL", {
    weekday: "long", day: "numeric", month: "long", timeZone: "UTC",
  });
  const time = arg.toLocaleTimeString("he-IL", {
    hour: "2-digit", minute: "2-digit", timeZone: "UTC",
  });
  return { date, time };
}

export function matchStatusHe(status: string): string | null {
  if (status === "IN_PLAY" || status === "PAUSED") return "🔴 משחק חי";
  if (status === "FINISHED") return "✅ הסתיים";
  return null;
}

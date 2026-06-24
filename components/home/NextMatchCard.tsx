import Card from "@/components/ui/Card";
import { getNextArgentinaMatch } from "@/data/worldcup";
import { fetchWorldCupMatches, getNextArgentinaMatchFromApi, formatMatchTime, matchStatusHe } from "@/lib/worldcup-api";
import { Trophy } from "lucide-react";
import Link from "next/link";

export default async function NextMatchCard() {
  // Try live API first, fall back to static data
  const apiMatches = await fetchWorldCupMatches();
  const apiMatch = getNextArgentinaMatchFromApi(apiMatches);
  const staticMatch = getNextArgentinaMatch();

  // Use API data if available
  if (apiMatch) {
    const { date, time } = formatMatchTime(apiMatch.date);
    const liveStatus = matchStatusHe(apiMatch.status);

    return (
      <Link href="/worldcup">
        <Card className="border-sun bg-sun/10 cursor-pointer hover:bg-sun/20 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-navy" aria-hidden="true" />
              <span className="text-sm font-semibold text-navy">המשחק הבא של ארגנטינה</span>
            </div>
            {liveStatus && (
              <span className="text-xs font-bold text-red-600 animate-pulse">{liveStatus}</span>
            )}
          </div>
          <p className="text-lg font-bold text-navy mb-1 text-center">
            {apiMatch.homeTeam} 🆚 {apiMatch.awayTeam}
          </p>
          {apiMatch.homeScore !== null && (
            <p className="text-2xl font-bold text-argentina mb-1 text-center">
              {apiMatch.homeScore} – {apiMatch.awayScore}
            </p>
          )}
          <p className="text-sm text-gray-500 text-center">{date} · {time} (שעון ארגנטינה)</p>
        </Card>
      </Link>
    );
  }

  // Fallback: static data from worldcup.ts
  if (!staticMatch) return null;

  const matchDate = new Date(`${staticMatch.date}T${staticMatch.time}:00-03:00`);
  const dateStr = matchDate.toLocaleDateString("he-IL", {
    weekday: "long", day: "numeric", month: "long",
  });
  const timeStr = matchDate.toLocaleTimeString("he-IL", {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <Link href="/worldcup">
      <Card className="border-sun bg-sun/10 cursor-pointer hover:bg-sun/20 transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <Trophy size={16} className="text-navy" aria-hidden="true" />
          <span className="text-sm font-semibold text-navy">המשחק הבא של ארגנטינה</span>
        </div>
        <p className="text-lg font-bold text-navy mb-1 text-center">
          {staticMatch.teamA} 🆚 {staticMatch.teamB}
        </p>
        <p className="text-sm text-gray-600 text-center">{staticMatch.stageLabel}</p>
        <p className="text-sm text-gray-500 mt-1 text-center">{dateStr} · {timeStr} (שעון ארגנטינה)</p>
      </Card>
    </Link>
  );
}

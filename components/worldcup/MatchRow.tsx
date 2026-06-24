import { MapPin } from "lucide-react";
import type { ApiMatch } from "@/lib/worldcup-api";
import { formatMatchTime, stageLabelHe, matchStatusHe } from "@/lib/worldcup-api";

interface Props {
  match: ApiMatch;
  highlight?: boolean;
}

export default function MatchRow({ match, highlight = false }: Props) {
  const { date, time } = formatMatchTime(match.date);
  const liveStatus = matchStatusHe(match.status);
  const isFinished = match.status === "FINISHED";

  return (
    <div className={`rounded-xl p-3 border ${
      highlight
        ? "border-sun bg-sun/10"
        : "border-argentina-light bg-white"
    }`}>
      {/* Stage + status */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400">{stageLabelHe(match.stage)}</span>
        {liveStatus && (
          <span className="text-xs font-bold text-red-600 animate-pulse">{liveStatus}</span>
        )}
      </div>

      {/* Teams + score — centered */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-semibold text-navy">
          {match.homeTeam}
        </span>

        <div className="flex-shrink-0">
          {isFinished && match.homeScore !== null ? (
            <span className="text-base font-bold text-argentina">
              {match.homeScore} – {match.awayScore}
            </span>
          ) : (
            <span className="text-xs text-gray-400 font-medium">🆚</span>
          )}
        </div>

        <span className="text-sm font-semibold text-navy">
          {match.awayTeam}
        </span>
      </div>

      {/* Date + time */}
      <p className="text-xs text-gray-400 mt-1.5 text-center">
        {date} · {time} (ארגנטינה)
      </p>
    </div>
  );
}

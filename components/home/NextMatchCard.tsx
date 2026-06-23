import Card from "@/components/ui/Card";
import { getNextArgentinaMatch } from "@/data/worldcup";
import { Trophy } from "lucide-react";
import Link from "next/link";

export default function NextMatchCard() {
  const match = getNextArgentinaMatch();

  if (!match) return null;

  const matchDate = new Date(`${match.date}T${match.time}:00-03:00`);
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
        <p className="text-lg font-bold text-navy mb-1">
          {match.teamA} 🆚 {match.teamB}
        </p>
        <p className="text-sm text-gray-600">{match.stageLabel}</p>
        <p className="text-sm text-gray-500 mt-1">{dateStr} · {timeStr} (שעון ארגנטינה)</p>
        {match.city !== "TODO" && (
          <p className="text-xs text-gray-400 mt-0.5">{match.stadium}, {match.city}</p>
        )}
      </Card>
    </Link>
  );
}

import { Trophy, MapPin, Music } from "lucide-react";
import Flag from "@/components/ui/Flag";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import Card from "@/components/ui/Card";
import SongCard from "@/components/worldcup/SongCard";
import MatchRow from "@/components/worldcup/MatchRow";
import WatchingSpotCard from "@/components/worldcup/WatchingSpotCard";
import { fetchWorldCupMatches, getNextArgentinaMatchFromApi, getArgentinaMatches, getKnockoutMatches, formatMatchTime, stageLabelHe, stageOrder } from "@/lib/worldcup-api";
import { watchingSpots } from "@/data/worldcup";
import { songs } from "@/data/songs";

export default async function WorldCupPage() {
  // Live data from football-data.org (cached 8640s)
  const allMatches = await fetchWorldCupMatches();
  const nextMatch = getNextArgentinaMatchFromApi(allMatches);
  const argMatches = getArgentinaMatches(allMatches);
  const knockoutMatches = getKnockoutMatches(allMatches);

  // Group knockout matches by stage
  const byStage = new Map<string, typeof knockoutMatches>();
  for (const m of knockoutMatches) {
    if (!byStage.has(m.stage)) byStage.set(m.stage, []);
    byStage.get(m.stage)!.push(m);
  }
  const stagesSorted = Array.from(byStage.keys()).sort((a, b) => stageOrder(a) - stageOrder(b));

  // Split watching spots by city
  const baSpts = watchingSpots.filter((s) => s.city === "Buenos Aires");
  const brcSpts = watchingSpots.filter((s) => s.city === "Bariloche");

  return (
    <main className="p-4 max-w-lg mx-auto pb-8">

      {/* Header */}
      <div className="pt-2 pb-4 flex items-center gap-2">
        <h1 className="text-2xl font-bold text-navy">מונדיאל 2026</h1>
        <Flag code="AR" size={28} />
      </div>

      {/* ── Next Argentina match ───────────────────────── */}
      {nextMatch ? (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Trophy size={14} className="text-argentina" />
            המשחק הבא של ארגנטינה
          </h2>
          <Card className="border-sun bg-sun/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500">{stageLabelHe(nextMatch.stage)}</span>
              {nextMatch.status === "IN_PLAY" && (
                <span className="text-xs font-bold text-red-600 animate-pulse">🔴 משחק חי</span>
              )}
            </div>
            <p className="text-xl font-bold text-navy">
              {nextMatch.homeTeam} 🆚 {nextMatch.awayTeam}
            </p>
            {(() => {
              const { date, time } = formatMatchTime(nextMatch.date);
              return (
                <p className="text-sm text-gray-500 mt-1">{date} · {time} (שעון ארגנטינה)</p>
              );
            })()}
          </Card>
        </div>
      ) : argMatches.length === 0 && (
        <Card className="mb-6 text-center py-4">
          <p className="text-sm text-gray-400">נתוני המשחקים יטענו בקרוב</p>
        </Card>
      )}

      {/* ── Argentina matches ─────────────────────────── */}
      {argMatches.length > 0 && (
        <div className="mb-6">
          <Accordion>
            <AccordionItem
              title="משחקי ארגנטינה"
              icon={<Flag code="AR" size={16} />}
              defaultOpen={true}
            >
              <div className="space-y-2">
                {argMatches.map((m) => (
                  <MatchRow
                    key={m.id}
                    match={m}
                    highlight={nextMatch?.id === m.id}
                  />
                ))}
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {/* ── Full knockout schedule ────────────────────── */}
      {knockoutMatches.length > 0 && (
        <div className="mb-6">
          <Accordion>
            <AccordionItem title="לוח שלבי נוקאאוט" icon={<Trophy size={16} />}>
              <div className="space-y-2">
                {stagesSorted.map((stage) => (
                  <AccordionItem
                    key={stage}
                    title={stageLabelHe(stage)}
                    defaultOpen={false}
                    nested
                  >
                    <div className="space-y-2">
                      {byStage.get(stage)!.map((m) => (
                        <MatchRow key={m.id} match={m} highlight={m.isArgentina} />
                      ))}
                    </div>
                  </AccordionItem>
                ))}
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      )}

      {/* ── Where to watch ────────────────────────────── */}
      <div className="mb-6">
        <Accordion>
          <AccordionItem title="איפה לראות את המשחק" icon={<MapPin size={16} />}>
            {baSpts.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  בואנוס איירס
                </p>
                <div className="space-y-2">
                  {baSpts.map((s) => <WatchingSpotCard key={s.id} spot={s} />)}
                </div>
              </div>
            )}
            {brcSpts.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  ברילוצ'ה
                </p>
                <div className="space-y-2">
                  {brcSpts.map((s) => <WatchingSpotCard key={s.id} spot={s} />)}
                </div>
              </div>
            )}
          </AccordionItem>
        </Accordion>
      </div>

      {/* ── Songs ─────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
          <Music size={14} className="text-argentina" />
          שירי ארגנטינה למונדיאל
        </h2>
        <div className="space-y-3">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>

    </main>
  );
}

import { Suspense } from "react";
import Link from "next/link";
import { FileText, MapPin } from "lucide-react";
import CountdownCard from "@/components/home/CountdownCard";
import TodayCard from "@/components/home/TodayCard";
import WeatherCard from "@/components/home/WeatherCard";
import CurrencyCard from "@/components/home/CurrencyCard";
import NextMatchCard from "@/components/home/NextMatchCard";
import Card from "@/components/ui/Card";
import Flag from "@/components/ui/Flag";
import JournalQuickAdd from "@/components/journal/JournalQuickAdd";
import { getTripDayInfo } from "@/data/trip";

function isOnTrip() {
  return getTripDayInfo() !== null;
}


function LoadingCard() {
  return (
    <div className="bg-white rounded-2xl border border-argentina-light p-4 animate-pulse">
      <div className="h-4 bg-gray-100 rounded w-1/3 mb-3" />
      <div className="h-8 bg-gray-100 rounded w-1/2" />
    </div>
  );
}

export default function HomePage() {
  const onTrip = isOnTrip();

  return (
    <main className="p-4 space-y-4 max-w-lg mx-auto pb-8">

      {/* Header */}
      <div className="pt-2 pb-1 flex items-start justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-navy flex items-center gap-2">
            {onTrip ? "הטיול שלנו" : "Argentina 2026"}
            <Flag code="AR" size={26} />
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {onTrip ? "מה קורה היום" : "הכנות לטיול"}
          </p>
        </div>
        <JournalQuickAdd />
      </div>

      {/* Pre-trip: countdown */}
      {!onTrip && <CountdownCard />}

      {/* During trip: today card */}
      {onTrip && <TodayCard />}

      {/* Weather */}
      <Suspense fallback={<LoadingCard />}>
        <WeatherCard />
      </Suspense>

      {/* Currency */}
      <Suspense fallback={<LoadingCard />}>
        <CurrencyCard />
      </Suspense>

      {/* Next Argentina match */}
      <NextMatchCard />

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Link href="/documents">
          <Card className="flex flex-col items-center gap-2 py-5 cursor-pointer hover:bg-argentina-light transition-colors text-center">
            <FileText size={24} className="text-argentina" aria-hidden="true" />
            <span className="text-sm font-semibold text-navy">מסמכים</span>
          </Card>
        </Link>
        <Link href="/map">
          <Card className="flex flex-col items-center gap-2 py-5 cursor-pointer hover:bg-argentina-light transition-colors text-center">
            <MapPin size={24} className="text-argentina" aria-hidden="true" />
            <span className="text-sm font-semibold text-navy">מפה</span>
          </Card>
        </Link>
      </div>

    </main>
  );
}

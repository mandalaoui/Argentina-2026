import Card from "@/components/ui/Card";
import { getTripDayInfo, getCurrentDestination } from "@/data/trip";
import { MapPin, Moon } from "lucide-react";

export default function TodayCard() {
  const dayInfo = getTripDayInfo();
  const dest = getCurrentDestination();

  if (!dayInfo || !dest) return null;

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-navy text-base">היום בטיול</h2>
        <span className="text-sm font-semibold bg-argentina text-white px-2.5 py-0.5 rounded-full">
          יום {dayInfo.day} מתוך {dayInfo.total}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1.5">
        <MapPin size={14} className="text-argentina flex-shrink-0" aria-hidden="true" />
        <span>{dest.flag} {dest.nameHe}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Moon size={14} className="text-argentina flex-shrink-0" aria-hidden="true" />
        <span>{dest.accommodation.name}</span>
      </div>
    </Card>
  );
}

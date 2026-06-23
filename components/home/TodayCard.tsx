import Card from "@/components/ui/Card";
import Flag from "@/components/ui/Flag";
import {
  getTripDayInfo,
  getCurrentDestination,
  getTodayPlannedActivities,
  getTodayDisplayDate,
} from "@/data/trip";
import { ActivityChecklist } from "@/components/trip/ActivityChecklist";
import { Calendar, MapPin, Moon } from "lucide-react";

export default function TodayCard() {
  const dayInfo = getTripDayInfo();
  const dest = getCurrentDestination();

  if (!dayInfo || !dest) return null;

  const todayStr = getTodayDisplayDate();

  const activities = getTodayPlannedActivities();

  return (
    <Card>
      {/* Day counter */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-navy text-base">היום בטיול</h2>
        <span className="text-sm font-semibold bg-argentina text-white px-2.5 py-0.5 rounded-full">
          יום {dayInfo.day} מתוך {dayInfo.total}
        </span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1.5">
        <Calendar size={14} className="text-argentina flex-shrink-0" aria-hidden="true" />
        <span>{todayStr}</span>
      </div>

      {/* Destination */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1.5">
        <MapPin size={14} className="text-argentina flex-shrink-0" aria-hidden="true" />
        <Flag code={dest.flag} size={16} />
        <span>{dest.nameHe}</span>
      </div>

      {/* Hotel */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Moon size={14} className="text-argentina flex-shrink-0" aria-hidden="true" />
        <span className="truncate">{dest.accommodation.name}</span>
      </div>

      {/* Today's planned activities */}
      <div className="border-t border-argentina-light pt-3">
        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
          מה מתוכנן להיום
        </p>
        <ActivityChecklist
          activities={activities}
          storageKey={`today-checklist-${dayInfo.day}`}
          emptyMessage="אין פעילויות מתוכננות להיום"
          compact
        />
      </div>
    </Card>
  );
}

import { MapPin } from "lucide-react";
import DestinationButtons from "@/components/trip/DestinationButtons";
import LocationSection from "@/components/trip/LocationSection";
import { tripDays, locationGroups } from "@/data/trip-days";

export default function TripPage() {
  return (
    <main className="p-4 max-w-lg mx-auto pb-8">

      {/* Header */}
      <div className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-navy">הטיול שלנו</h1>
        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-400">
          <MapPin size={13} className="text-argentina" />
          <span>01.07 – 12.07.2026 · 12 ימים</span>
        </div>
      </div>

      {/* Destination buttons */}
      <DestinationButtons />

      {/* Day-by-day timeline grouped by location */}
      <div>
        {locationGroups.map((group, i) => {
          const groupDays = tripDays.filter((d) => group.days.includes(d.day));
          return (
            <LocationSection
              key={`${group.label}-${i}`}
              group={group}
              days={groupDays}
              defaultOpen={i === 0}
            />
          );
        })}
      </div>

    </main>
  );
}

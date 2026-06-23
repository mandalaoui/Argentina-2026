import { destinations } from "@/data/trip";
import DestinationCard from "@/components/trip/DestinationCard";
import { MapPin } from "lucide-react";

export default function TripPage() {
  return (
    <main className="p-4 max-w-lg mx-auto pb-8">

      {/* Header */}
      <div className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-navy">הטיול שלנו 🇦🇷</h1>
        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-400">
          <MapPin size={13} className="text-argentina" />
          <span>01.07 – 12.07.2026 · 12 ימים</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute right-[22px] top-4 bottom-4 w-0.5 bg-argentina-light" aria-hidden="true" />

        <div className="space-y-4">
          {destinations.map((dest, i) => (
            <div key={dest.id} className="flex gap-4 items-start">
              {/* Step dot */}
              <div className="relative flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-white border-2 border-argentina z-10 mt-1 shadow-sm">
                <span className="text-lg leading-none">{dest.flag}</span>
              </div>

              {/* Card */}
              <div className="flex-1 min-w-0">
                <DestinationCard destination={dest} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}

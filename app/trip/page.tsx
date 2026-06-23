import { destinations } from "@/data/trip";
import DestinationCard from "@/components/trip/DestinationCard";
import Flag from "@/components/ui/Flag";
import { MapPin } from "lucide-react";

export default function TripPage() {
  return (
    <main className="p-4 max-w-lg mx-auto pb-8">

      {/* Header */}
      <div className="pt-2 pb-4">
        <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
          הטיול שלנו <Flag code="AR" size={28} />
        </h1>
        <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-400">
          <MapPin size={13} className="text-argentina" />
          <span>01.07 – 12.07.2026 · 12 ימים</span>
        </div>
      </div>

      {/* Destination list */}
      <div className="space-y-3">
        {destinations.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>

    </main>
  );
}

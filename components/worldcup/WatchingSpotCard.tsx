import { MapPin, ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import type { WatchingSpot } from "@/data/worldcup";

export default function WatchingSpotCard({ spot }: { spot: WatchingSpot }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-navy text-base">{spot.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{spot.area} · {spot.city}</p>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{spot.notes}</p>
        </div>
      </div>
      <a
        href={spot.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center gap-1.5 text-xs text-argentina font-medium hover:underline"
        aria-label={`פתח ${spot.name} במפה`}
      >
        <MapPin size={13} aria-hidden="true" />
        פתח במפה
      </a>
    </Card>
  );
}

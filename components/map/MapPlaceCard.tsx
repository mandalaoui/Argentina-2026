import { MapPin, ExternalLink, Star } from "lucide-react";
import type { MapPlace } from "@/types/map";
import { CATEGORY_CONFIG, CITY_LABELS } from "@/types/map";
import { getGoogleMapsUrl } from "@/lib/map-places";

interface Props {
  place: MapPlace;
  selected: boolean;
  onSelect: (place: MapPlace) => void;
}

export default function MapPlaceCard({ place, selected, onSelect }: Props) {
  const config = CATEGORY_CONFIG[place.category];
  const mapsUrl = getGoogleMapsUrl(place);
  const hasCoords = !!place.coordinates;

  return (
    <div
      className={`rounded-2xl border p-3 transition-all ${
        selected
          ? "border-argentina bg-argentina-light shadow-md"
          : "border-argentina-light bg-white hover:shadow-sm"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-base leading-none" aria-hidden="true">{config.icon}</span>
            <h3 className="font-semibold text-navy text-base leading-tight truncate">{place.nameHe}</h3>
          </div>
          <p className="text-xs text-gray-400 truncate">{place.nameEn}</p>
        </div>
        {place.rating && (
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <Star size={11} className="text-sun fill-sun" aria-hidden="true" />
            <span className="text-xs font-medium text-gray-500">{place.rating}</span>
          </div>
        )}
      </div>

      {/* Meta */}
      <p className="text-xs text-gray-500 mb-1.5">
        {config.label} · {place.areaHe} · {CITY_LABELS[place.city]}
      </p>

      {/* Description */}
      <p className="text-xs text-gray-600 mb-2 line-clamp-2">{place.descriptionHe}</p>

      {/* Actions */}
      <div className="flex gap-2">
        {hasCoords && (
          <button
            onClick={() => onSelect(place)}
            className="flex items-center gap-1 text-xs bg-argentina text-white px-2.5 py-1.5 rounded-lg font-medium min-h-[32px] hover:opacity-90 transition-opacity"
          >
            <MapPin size={12} aria-hidden="true" />
            הצג במפה
          </button>
        )}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs border border-argentina text-argentina px-2.5 py-1.5 rounded-lg font-medium min-h-[32px] hover:bg-argentina-light transition-colors"
          aria-label={`פתח ${place.nameHe} ב-Google Maps`}
        >
          <ExternalLink size={12} aria-hidden="true" />
          Google Maps
        </a>
      </div>
    </div>
  );
}

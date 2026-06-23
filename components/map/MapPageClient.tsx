"use client";

import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { Search, X } from "lucide-react";
import type { MapPlace, MapCategory, MapCity } from "@/types/map";
import { CATEGORY_CONFIG, CITY_LABELS } from "@/types/map";
import MapFilters from "./MapFilters";
import MapPlaceCard from "./MapPlaceCard";
import MapGoogleEmbed from "./MapGoogleEmbed";

const InteractiveTripMap = lazy(() => import("./InteractiveTripMap"));

interface Props {
  places: MapPlace[];
}

function groupByCity(places: MapPlace[]): Map<MapCity, Map<string, MapPlace[]>> {
  const result = new Map<MapCity, Map<string, MapPlace[]>>();
  for (const place of places) {
    if (!result.has(place.city)) result.set(place.city, new Map());
    const areaMap = result.get(place.city)!;
    if (!areaMap.has(place.areaHe)) areaMap.set(place.areaHe, []);
    areaMap.get(place.areaHe)!.push(place);
  }
  return result;
}

function matchesSearch(place: MapPlace, q: string): boolean {
  if (!q) return true;
  const lower = q.toLowerCase();
  return [
    place.nameHe, place.nameEn, place.city, place.area, place.areaHe,
    place.categoryHe, CATEGORY_CONFIG[place.category].label,
    place.descriptionHe, ...place.tags,
  ].some((s) => s?.toLowerCase().includes(lower));
}

export default function MapPageClient({ places }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<MapCategory | "all">("all");
  const [activeCity, setActiveCity] = useState<MapCity | "all">("all");
  const [selectedPlace, setSelectedPlace] = useState<MapPlace | null>(null);

  const filtered = useMemo(() => {
    return places.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (activeCity !== "all" && p.city !== activeCity) return false;
      if (!matchesSearch(p, search)) return false;
      return true;
    });
  }, [places, activeCategory, activeCity, search]);

  const grouped = useMemo(() => groupByCity(filtered), [filtered]);

  const handleSelect = useCallback((place: MapPlace) => {
    setSelectedPlace(place);
    // On mobile: scroll to map
    document.getElementById("trip-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main className="max-w-5xl mx-auto pb-8">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-2xl font-bold text-navy">מפת הטיול</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          מסעדות, ברים, אטרקציות, קניות ותחבורה — ארגנטינה ואורוגוואי
        </p>
      </div>

      {/* ── Search ─────────────────────────────────────── */}
      <div className="px-4 mb-3">
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חפש מקום, אזור, מסעדה או קטגוריה..."
            className="w-full bg-white border border-argentina-light rounded-xl pr-9 pl-9 py-2.5 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-argentina"
            dir="rtl"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-label="נקה חיפוש"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ── Filters ────────────────────────────────────── */}
      <div className="px-4 mb-3">
        <MapFilters
          activeCategory={activeCategory}
          activeCity={activeCity}
          onCategoryChange={setActiveCategory}
          onCityChange={setActiveCity}
        />
      </div>

      {/* ── Desktop: 2-column / Mobile: stacked ────────── */}
      <div className="md:flex md:gap-4 md:px-4">

        {/* ── Map (mobile: above list) ────────────────── */}
        <div id="trip-map" className="px-4 mb-3 md:px-0 md:mb-0 md:w-1/2 md:sticky md:top-16 md:h-fit">
          <Suspense fallback={
            <div className="w-full rounded-2xl bg-argentina-light animate-pulse" style={{ height: "clamp(320px, 38vh, 480px)" }} />
          }>
            <InteractiveTripMap
              places={filtered}
              selectedPlace={selectedPlace}
              onSelectPlace={setSelectedPlace}
            />
          </Suspense>

          {/* Google My Maps secondary */}
          <div className="mt-3">
            <MapGoogleEmbed />
          </div>
        </div>

        {/* ── Places list ─────────────────────────────── */}
        <div className="px-4 md:px-0 md:w-1/2 md:overflow-y-auto">
          {/* Results count */}
          <p className="text-xs text-gray-400 mb-3">
            {filtered.length === 0
              ? "לא נמצאו מקומות"
              : `נמצאו ${filtered.length} מקומות`}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 font-medium">לא נמצאו מקומות מתאימים</p>
              <p className="text-sm text-gray-400 mt-1">נסה לחפש לפי עיר, אזור או קטגוריה אחרת</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Array.from(grouped.entries()).map(([city, areaMap]) => (
                <div key={city}>
                  {/* City heading */}
                  <h2 className="text-base font-bold text-navy mb-3 flex items-center gap-2">
                    {CITY_LABELS[city]}
                    <span className="text-xs font-normal text-gray-400">
                      ({Array.from(areaMap.values()).flat().length})
                    </span>
                  </h2>

                  <div className="space-y-4">
                    {Array.from(areaMap.entries()).map(([area, areaPlaces]) => (
                      <div key={area}>
                        {/* Area sub-heading */}
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                          {area}
                        </h3>
                        <div className="space-y-2">
                          {areaPlaces.map((place) => (
                            <MapPlaceCard
                              key={place.id}
                              place={place}
                              selected={selectedPlace?.id === place.id}
                              onSelect={handleSelect}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

import { CATEGORY_CONFIG, CITY_LABELS } from "@/types/map";
import type { MapCategory, MapCity } from "@/types/map";

interface Props {
  activeCategory: MapCategory | "all";
  activeCity: MapCity | "all";
  onCategoryChange: (c: MapCategory | "all") => void;
  onCityChange: (c: MapCity | "all") => void;
}

const CATEGORIES: (MapCategory | "all")[] = [
  "all", "restaurant", "bar", "attraction", "shopping",
  "transport", "park", "neighborhood", "dayTrip",
];

const CITIES: (MapCity | "all")[] = [
  "all", "Buenos Aires", "Bariloche", "Rosario",
  "Colonia del Sacramento", "Tigre",
];

export default function MapFilters({ activeCategory, activeCity, onCategoryChange, onCityChange }: Props) {
  return (
    <div className="space-y-2">
      {/* Category filter */}
      <div className="flex overflow-x-auto gap-1.5 pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          const label = cat === "all" ? "הכל" : CATEGORY_CONFIG[cat].label;
          const icon = cat === "all" ? "" : CATEGORY_CONFIG[cat].icon;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors min-h-[32px] ${
                isActive
                  ? "bg-argentina text-white"
                  : "bg-argentina-light text-navy hover:bg-argentina/20"
              }`}
            >
              {icon && <span aria-hidden="true">{icon}</span>}
              {label}
            </button>
          );
        })}
      </div>

      {/* City filter */}
      <div className="flex overflow-x-auto gap-1.5 pb-1 scrollbar-none">
        {CITIES.map((city) => {
          const isActive = activeCity === city;
          const label = city === "all" ? "כל הערים" : CITY_LABELS[city];
          return (
            <button
              key={city}
              onClick={() => onCityChange(city)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors min-h-[32px] ${
                isActive
                  ? "bg-navy text-white"
                  : "bg-soft-gray text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

import MapPageClient from "@/components/map/MapPageClient";
import { mapPlaces } from "@/lib/map-places";

export default function MapPage() {
  return <MapPageClient places={mapPlaces} />;
}

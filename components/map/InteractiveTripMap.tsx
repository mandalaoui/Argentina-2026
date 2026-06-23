"use client";

import { useEffect, useRef } from "react";
import type { MapPlace } from "@/types/map";
import { CATEGORY_CONFIG } from "@/types/map";
import { getGoogleMapsUrl } from "@/lib/map-places";

interface Props {
  places: MapPlace[];
  selectedPlace: MapPlace | null;
  onSelectPlace: (place: MapPlace) => void;
}

export default function InteractiveTripMap({ places, selectedPlace, onSelectPlace }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const placesWithCoords = places.filter((p) => p.coordinates);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Dynamic import — Leaflet is client-only
    import("leaflet").then((L) => {
      // Fix Leaflet default icon paths in Next.js
      // @ts-ignore
      delete L.default.Icon.Default.prototype._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.default.map(containerRef.current!, {
        center: [-34.6037, -58.3816],
        zoom: 12,
        zoomControl: true,
      });

      L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      // Add markers
      placesWithCoords.forEach((place) => {
        const coords = place.coordinates!;
        const config = CATEGORY_CONFIG[place.category];

        const icon = L.default.divIcon({
          html: `<div style="
            background: white;
            border: 2px solid #74ACDF;
            border-radius: 50%;
            width: 28px; height: 28px;
            display: flex; align-items: center; justify-content: center;
            font-size: 14px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          ">${config.icon}</div>`,
          className: "",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -16],
        });

        const mapsUrl = getGoogleMapsUrl(place);
        const marker = L.default.marker([coords.lat, coords.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div dir="rtl" style="font-family: Heebo, sans-serif; min-width: 180px;">
              <p style="font-weight: 700; font-size: 14px; margin: 0 0 2px;">${place.nameHe}</p>
              <p style="color: #6B7280; font-size: 11px; margin: 0 0 4px;">${place.nameEn}</p>
              <p style="font-size: 11px; color: #2C5282; margin: 0 0 6px;">${config.label} · ${place.areaHe}</p>
              <p style="font-size: 11px; margin: 0 0 8px;">${place.descriptionHe}</p>
              <a href="${mapsUrl}" target="_blank"
                style="display: inline-block; background: #74ACDF; color: white; padding: 4px 10px;
                border-radius: 8px; font-size: 11px; text-decoration: none;">
                פתח ב-Google Maps
              </a>
            </div>
          `)
          .on("click", () => onSelectPlace(place));

        markersRef.current.push({ place, marker });
      });
    });

    // Import Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = [];
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pan to selected place + open popup
  useEffect(() => {
    if (!mapRef.current || !selectedPlace?.coordinates) return;
    const { lat, lng } = selectedPlace.coordinates;
    mapRef.current.flyTo([lat, lng], 15, { duration: 0.8 });
    const found = markersRef.current.find((m) => m.place.id === selectedPlace.id);
    if (found) found.marker.openPopup();
  }, [selectedPlace]);

  // Update markers when filtered places change
  useEffect(() => {
    if (!mapRef.current) return;
    import("leaflet").then((L) => {
      const visibleIds = new Set(placesWithCoords.map((p) => p.id));
      markersRef.current.forEach(({ place, marker }) => {
        if (visibleIds.has(place.id)) {
          if (!mapRef.current!.hasLayer(marker)) marker.addTo(mapRef.current!);
        } else {
          if (mapRef.current!.hasLayer(marker)) marker.remove();
        }
      });
    });
  }, [placesWithCoords]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden border border-argentina-light"
      style={{ height: "clamp(320px, 38vh, 480px)" }}
      aria-label="מפת מקומות הטיול"
    />
  );
}

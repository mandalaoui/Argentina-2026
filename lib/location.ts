export interface Coordinates {
  lat: number;
  lng: number;
}

/** Request GPS coordinates from the browser */
export function getCurrentLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { timeout: 10000, maximumAge: 60000 }
    );
  });
}

/** Reverse geocode using OpenStreetMap Nominatim (free, no API key) */
export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const url =
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=he`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Argentina2026TripApp" },
    });
    if (!res.ok) throw new Error("Nominatim error");
    const data = await res.json();

    const a = data.address ?? {};

    // Build a short, human-readable location string
    const parts: string[] = [];

    // Neighborhood / suburb
    if (a.neighbourhood) parts.push(a.neighbourhood);
    else if (a.suburb) parts.push(a.suburb);
    else if (a.quarter) parts.push(a.quarter);

    // City
    if (a.city) parts.push(a.city);
    else if (a.town) parts.push(a.town);
    else if (a.village) parts.push(a.village);

    // Country (only if not Argentina/Uruguay to keep it short)
    if (a.country_code && !["ar", "uy"].includes(a.country_code)) {
      parts.push(a.country);
    }

    return parts.length > 0 ? parts.join(", ") : data.display_name ?? "מיקום לא ידוע";
  } catch {
    return "מיקום לא זמין";
  }
}

/** Get location + reverse geocode in one call */
export async function getLocationString(): Promise<string> {
  const coords = await getCurrentLocation();
  return reverseGeocode(coords.lat, coords.lng);
}

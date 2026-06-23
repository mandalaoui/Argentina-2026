const CITIES = {
  buenosAires: { lat: -34.6037, lon: -58.3816, nameHe: "בואנוס איירס" },
  bariloche:   { lat: -41.1335, lon: -71.3103, nameHe: "ברילוצ'ה" },
} as const;

export type CityKey = keyof typeof CITIES;

export interface WeatherData {
  temperature: number;
  weatherCode: number;
  cityHe: string;
}

export function weatherCodeToIcon(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code <= 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 57) return "🌧️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "🌨️";
  if (code <= 82) return "🌧️";
  if (code <= 86) return "❄️";
  if (code <= 99) return "⛈️";
  return "🌡️";
}

export function weatherCodeToLabel(code: number): string {
  if (code === 0) return "שמשי";
  if (code <= 2) return "מעונן חלקית";
  if (code <= 3) return "מעונן";
  if (code <= 48) return "ערפל";
  if (code <= 57) return "גשם קל";
  if (code <= 67) return "גשם";
  if (code <= 77) return "שלג";
  if (code <= 82) return "גשם";
  if (code <= 86) return "שלג";
  if (code <= 99) return "סערה";
  return "לא ידוע";
}

export async function getWeather(city: CityKey): Promise<WeatherData> {
  const { lat, lon, nameHe } = CITIES[city];
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&timezone=auto`;
  const res = await fetch(url, { next: { revalidate: 1800 } }); // cache 30 min
  if (!res.ok) throw new Error("Weather fetch failed");
  const data = await res.json();
  return {
    temperature: Math.round(data.current.temperature_2m),
    weatherCode: data.current.weather_code,
    cityHe: nameHe,
  };
}

// Choose city based on trip date
export function getWeatherCity(): CityKey {
  const today = new Date().toISOString().split("T")[0];
  if (today >= "2026-07-06" && today <= "2026-07-10") return "bariloche";
  return "buenosAires";
}

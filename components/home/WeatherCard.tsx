import Card from "@/components/ui/Card";
import { getWeather, getWeatherCity, weatherCodeToIcon, weatherCodeToLabel } from "@/lib/weather";
import { Cloud } from "lucide-react";

export default async function WeatherCard() {
  try {
    const city = getWeatherCity();
    const weather = await getWeather(city);

    return (
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <Cloud size={16} className="text-argentina" aria-hidden="true" />
          <span className="text-sm font-semibold text-navy">מזג אוויר — {weather.cityHe}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden="true">
            {weatherCodeToIcon(weather.weatherCode)}
          </span>
          <div>
            <p className="text-3xl font-bold text-navy">{weather.temperature}°C</p>
            <p className="text-sm text-gray-500">{weatherCodeToLabel(weather.weatherCode)}</p>
          </div>
        </div>
      </Card>
    );
  } catch {
    return (
      <Card>
        <div className="flex items-center gap-2">
          <Cloud size={16} className="text-gray-400" />
          <span className="text-sm text-gray-400">מזג אוויר — לא זמין</span>
        </div>
      </Card>
    );
  }
}

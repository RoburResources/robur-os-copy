import { useState, useEffect } from "react";
import { Sun, CloudSun, Cloud, CloudRain, CloudDrizzle, CloudLightning, CloudSnow, CloudFog, Wind, Droplets, MapPin } from "lucide-react";

const PERTH_COORDS = { lat: -31.9505, lon: 115.8605 };

function getWeatherInfo(code) {
  const map = {
    0: { icon: Sun, label: "Clear sky" },
    1: { icon: CloudSun, label: "Mainly clear" },
    2: { icon: CloudSun, label: "Partly cloudy" },
    3: { icon: Cloud, label: "Overcast" },
    45: { icon: CloudFog, label: "Fog" },
    48: { icon: CloudFog, label: "Rime fog" },
    51: { icon: CloudDrizzle, label: "Light drizzle" },
    53: { icon: CloudDrizzle, label: "Drizzle" },
    55: { icon: CloudDrizzle, label: "Heavy drizzle" },
    61: { icon: CloudRain, label: "Light rain" },
    63: { icon: CloudRain, label: "Rain" },
    65: { icon: CloudRain, label: "Heavy rain" },
    71: { icon: CloudSnow, label: "Light snow" },
    73: { icon: CloudSnow, label: "Snow" },
    75: { icon: CloudSnow, label: "Heavy snow" },
    80: { icon: CloudRain, label: "Rain showers" },
    81: { icon: CloudRain, label: "Rain showers" },
    82: { icon: CloudRain, label: "Violent showers" },
    95: { icon: CloudLightning, label: "Thunderstorm" },
    96: { icon: CloudLightning, label: "Thunderstorm" },
    99: { icon: CloudLightning, label: "Thunderstorm" },
  };
  return map[code] || { icon: Cloud, label: "Unknown" };
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = () => {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${PERTH_COORDS.lat}&longitude=${PERTH_COORDS.lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=Australia/Perth`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.current) {
            setWeather({
              temp: Math.round(data.current.temperature_2m),
              code: data.current.weather_code,
              windSpeed: Math.round(data.current.wind_speed_10m),
              humidity: data.current.relative_humidity_2m,
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-[#F9F7F5] shadow-[0_4px_16px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.06)] p-5 h-full flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-robur-light border-t-robur-charcoal rounded-full animate-spin" />
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="rounded-2xl bg-[#F9F7F5] shadow-[0_4px_16px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.06)] p-5 h-full">
        <p className="text-xs text-robur-steel">Weather unavailable</p>
      </div>
    );
  }

  const { icon: WeatherIcon, label } = getWeatherInfo(weather.code);

  return (
    <div className="rounded-2xl bg-[#F9F7F5] shadow-[0_4px_16px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.06)] p-5 h-full">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="h-3.5 w-3.5 text-robur-steel" strokeWidth={1.5} />
        <h3 className="text-xs font-semibold uppercase tracking-wider text-robur-steel">Perth, WA</h3>
      </div>
      <div className="flex items-center gap-4">
        <WeatherIcon className="h-14 w-14 text-robur-charcoal" strokeWidth={1.5} />
        <div>
          <p className="text-3xl font-bold tracking-tight text-robur-charcoal">{weather.temp}°C</p>
          <p className="text-xs text-robur-steel">{label}</p>
        </div>
      </div>
      <div className="flex items-center gap-5 mt-4 pt-3 border-t border-robur-charcoal/10">
        <div className="flex items-center gap-1.5">
          <Wind className="h-3.5 w-3.5 text-robur-steel" strokeWidth={1.5} />
          <span className="text-xs font-medium text-robur-charcoal">{weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Droplets className="h-3.5 w-3.5 text-robur-steel" strokeWidth={1.5} />
          <span className="text-xs font-medium text-robur-charcoal">{weather.humidity}%</span>
        </div>
      </div>
    </div>
  );
}
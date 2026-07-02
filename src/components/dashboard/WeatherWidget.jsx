import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, CloudSun, Cloud, CloudRain, CloudDrizzle, CloudLightning, CloudSnow, CloudFog, Wind, Droplets, MapPin } from "lucide-react";
import WeatherBackground from "./WeatherBackground";

const PERTH_COORDS = { lat: -31.9505, lon: 115.8605 };

function getWeatherInfo(code) {
  const map = {
    0: { icon: Sun, label: "Clear sky", theme: "clear" },
    1: { icon: CloudSun, label: "Mainly clear", theme: "clear" },
    2: { icon: CloudSun, label: "Partly cloudy", theme: "partlycloudy" },
    3: { icon: Cloud, label: "Overcast", theme: "cloudy" },
    45: { icon: CloudFog, label: "Fog", theme: "fog" },
    48: { icon: CloudFog, label: "Rime fog", theme: "fog" },
    51: { icon: CloudDrizzle, label: "Light drizzle", theme: "rain" },
    53: { icon: CloudDrizzle, label: "Drizzle", theme: "rain" },
    55: { icon: CloudDrizzle, label: "Heavy drizzle", theme: "rain" },
    61: { icon: CloudRain, label: "Light rain", theme: "rain" },
    63: { icon: CloudRain, label: "Rain", theme: "rain" },
    65: { icon: CloudRain, label: "Heavy rain", theme: "rain" },
    71: { icon: CloudSnow, label: "Light snow", theme: "snow" },
    73: { icon: CloudSnow, label: "Snow", theme: "snow" },
    75: { icon: CloudSnow, label: "Heavy snow", theme: "snow" },
    80: { icon: CloudRain, label: "Rain showers", theme: "rain" },
    81: { icon: CloudRain, label: "Rain showers", theme: "rain" },
    82: { icon: CloudRain, label: "Violent showers", theme: "rain" },
    95: { icon: CloudLightning, label: "Thunderstorm", theme: "storm" },
    96: { icon: CloudLightning, label: "Thunderstorm", theme: "storm" },
    99: { icon: CloudLightning, label: "Thunderstorm", theme: "storm" },
  };
  return map[code] || { icon: Cloud, label: "Unknown", theme: "cloudy" };
}

const THEME_BG = {
  clear: "linear-gradient(180deg, #1565C0 0%, #1E88E5 30%, #42A5F5 60%, #90CAF9 85%, #BBDEFB 100%)",
  partlycloudy: "linear-gradient(180deg, #4E73A8 0%, #6B8FBE 40%, #94B2D6 75%, #B0C4DE 100%)",
  cloudy: "linear-gradient(180deg, #546E7A 0%, #607D8B 35%, #78909C 70%, #90A4AE 100%)",
  rain: "linear-gradient(180deg, #263238 0%, #37474F 35%, #455A64 70%, #546E7A 100%)",
  storm: "linear-gradient(180deg, #0D1B2A 0%, #1B263B 35%, #1B263B 70%, #0D1B2A 100%)",
  snow: "linear-gradient(180deg, #78909C 0%, #90A4AE 35%, #B0BEC5 70%, #CFD8DC 100%)",
  fog: "linear-gradient(180deg, #607D8B 0%, #78909C 35%, #90A4AE 70%, #B0BEC5 100%)",
};

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
      <motion.div
        className="rounded-2xl p-5 h-full flex items-center justify-center glass-2 group"
        whileHover={{ y: -4, scale: 1.008 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="h-6 w-6 border-2 border-robur-light border-t-robur-charcoal rounded-full animate-spin" />
      </motion.div>
    );
  }

  if (!weather) {
    return (
      <motion.div
        className="rounded-2xl p-5 h-full glass-2 group"
        whileHover={{ y: -4, scale: 1.008 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <p className="text-xs text-robur-steel">Weather unavailable</p>
      </motion.div>
    );
  }

  const { icon: WeatherIcon, label, theme } = getWeatherInfo(weather.code);

  return (
    <motion.div
      className="rounded-2xl p-5 h-full relative overflow-hidden glass-2 group"
      style={{ background: THEME_BG[theme] }}
      whileHover={{ y: -4, scale: 1.008 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <WeatherBackground weatherCode={weather.code} />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-3.5 w-3.5 text-white/80" strokeWidth={2} />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/80">Perth, WA</h3>
        </div>
        <div className="flex items-center gap-4">
          <WeatherIcon className="h-16 w-16 text-white drop-shadow-lg group-hover:scale-110 transition-transform" strokeWidth={1.5} />
          <div>
            <p className="text-4xl font-bold tracking-tight text-white drop-shadow">{weather.temp}°C</p>
            <p className="text-sm text-white/80 font-medium">{label}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 mt-4 pt-3 border-t border-white/20">
          <div className="flex items-center gap-1.5">
            <Wind className="h-4 w-4 text-white/80" strokeWidth={2} />
            <span className="text-xs font-semibold text-white">{weather.windSpeed} km/h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplets className="h-4 w-4 text-white/80" strokeWidth={2} />
            <span className="text-xs font-semibold text-white">{weather.humidity}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
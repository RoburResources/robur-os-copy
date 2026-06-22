import GlassCard from "@/components/ui/GlassCard";
import { CloudSun, Droplets, Wind, Thermometer } from "lucide-react";

export default function WeatherHero() {
  return (
    <GlassCard level={2} className="relative overflow-hidden p-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-robur-charcoal via-robur-charcoal to-robur-steel/80" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-robur-yellow/10 rounded-full blur-3xl" />

      <div className="relative flex items-center justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CloudSun className="h-5 w-5 text-robur-yellow" strokeWidth={1.5} />
            <span className="text-xs font-medium text-robur-light/60 uppercase tracking-wider">Melbourne, VIC</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-white tracking-tight">22°</span>
            <span className="text-lg text-robur-light/60">Partly Cloudy</span>
          </div>
          <div className="flex items-center gap-4 pt-1">
            <span className="flex items-center gap-1 text-xs text-robur-light/50">
              <Droplets className="h-3 w-3" /> 45%
            </span>
            <span className="flex items-center gap-1 text-xs text-robur-light/50">
              <Wind className="h-3 w-3" /> 12 km/h
            </span>
            <span className="flex items-center gap-1 text-xs text-robur-light/50">
              <Thermometer className="h-3 w-3" /> Feels 20°
            </span>
          </div>
        </div>

        {/* Visual weather icon */}
        <div className="hidden sm:flex items-center justify-center w-24 h-24 rounded-2xl bg-white/5">
          <CloudSun className="h-12 w-12 text-robur-yellow/80" strokeWidth={1} />
        </div>
      </div>

      {/* Forecast strip */}
      <div className="relative mt-5 pt-4 border-t border-white/10 flex items-center gap-6">
        {[
          { time: "9 AM", temp: "18°", icon: CloudSun },
          { time: "12 PM", temp: "22°", icon: CloudSun },
          { time: "3 PM", temp: "24°", icon: CloudSun },
          { time: "6 PM", temp: "20°", icon: CloudSun },
        ].map((h) => (
          <div key={h.time} className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] text-robur-light/40">{h.time}</span>
            <h.icon className="h-4 w-4 text-robur-light/50" strokeWidth={1.5} />
            <span className="text-xs font-medium text-white">{h.temp}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
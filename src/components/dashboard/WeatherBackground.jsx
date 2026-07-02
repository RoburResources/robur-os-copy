import { motion } from "framer-motion";

function SunRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-16 -right-16 h-48 w-48 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,196,0,0.25) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-2 right-2 h-20 w-1 rounded-full"
          style={{
            background: "linear-gradient(to bottom, rgba(255,196,0,0.15), transparent)",
            transformOrigin: "top center",
            rotate: `${i * 45}deg`,
          }}
          animate={{ opacity: [0.1, 0.4, 0.1], scaleY: [0.7, 1.1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function Clouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-10 w-28 rounded-full bg-white/40 blur-xl"
          style={{ top: `${8 + i * 22}%`, left: "-15%" }}
          animate={{ x: ["-10%", "130%"] }}
          transition={{ duration: 14 + i * 4, repeat: Infinity, ease: "linear", delay: i * 2.5 }}
        />
      ))}
    </div>
  );
}

function Rain({ storm = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-4 bg-robur-steel/20 rounded-full"
          style={{ left: `${(i / 18) * 100 + Math.random() * 5}%`, top: "-5%" }}
          animate={{ y: ["0%", "700%"] }}
          transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
        />
      ))}
      {storm && (
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundColor: ["rgba(255,255,255,0)", "rgba(255,255,255,0.25)", "rgba(255,255,255,0)"] }}
          transition={{ duration: 0.25, repeat: Infinity, repeatDelay: 4, repeatDelayType: "repeat" }}
        />
      )}
    </div>
  );
}

function Snow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/50"
          style={{ left: `${(i / 14) * 100 + Math.random() * 5}%`, top: "-5%" }}
          animate={{ y: ["0%", "700%"], x: [0, Math.random() * 16 - 8] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear", delay: Math.random() * 3 }}
        />
      ))}
    </div>
  );
}

export default function WeatherBackground({ weatherCode }) {
  const code = weatherCode ?? 0;

  if ([0, 1, 2].includes(code)) return <SunRays />;
  if ([3, 45, 48].includes(code)) return <Clouds />;
  if ([95, 96, 99].includes(code)) return <Rain storm />;
  if ([71, 73, 75].includes(code)) return <Snow />;
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <Rain />;

  return <SunRays />;
}
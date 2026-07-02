import { motion } from "framer-motion";

function SunRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-16 -right-10 h-44 w-44 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,235,100,0.7) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1 right-6 h-20 w-2 rounded-full"
          style={{
            background: "linear-gradient(to bottom, rgba(255,220,80,0.6), transparent)",
            transformOrigin: "top center",
            rotate: `${i * 45}deg`,
          }}
          animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [0.7, 1.15, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
      <motion.div
        className="absolute top-2 right-4 h-8 w-8 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,240,150,0.9) 0%, rgba(255,200,0,0.5) 100%)" }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// Realistic SVG cloud paths — organic bumpy silhouettes, not flat circles.
// Each path defines a distinct cloud outline with natural lumps and dips.
const CLOUD_PATHS = [
  // Large fluffy cumulus
  "M 18 62 C 6 62 2 50 10 44 C 6 36 14 26 24 28 C 26 16 42 12 50 22 C 56 10 76 12 78 28 C 92 26 96 42 86 48 C 94 54 90 62 80 62 Z",
  // Medium wispy cloud
  "M 12 50 C 4 50 2 42 8 38 C 6 30 16 26 22 32 C 26 22 40 20 44 30 C 52 22 66 26 66 36 C 78 34 82 44 74 48 C 80 52 76 56 68 56 L 20 56 C 12 56 8 54 12 50 Z",
  // Small puffy cloud
  "M 16 48 C 6 48 4 40 10 36 C 8 28 20 24 26 30 C 30 22 46 22 48 32 C 56 28 64 34 60 42 C 66 46 62 50 54 50 L 24 50 C 18 50 14 50 16 48 Z",
  // Wide spread cloud
  "M 8 56 C 0 56 2 46 10 42 C 6 32 18 26 28 30 C 30 18 50 16 56 28 C 62 18 84 20 84 34 C 98 32 104 46 94 52 C 100 56 96 60 86 60 L 22 60 C 12 60 6 60 8 56 Z",
];

function CloudShape({ variant, opacity = 0.9 }) {
  const path = CLOUD_PATHS[variant % CLOUD_PATHS.length];
  const gradId = `cloud-grad-${variant}`;
  const shadowId = `cloud-shadow-${variant}`;
  return (
    <svg
      width="120"
      height="70"
      viewBox="0 0 100 70"
      style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.12))" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={opacity} />
          <stop offset="60%" stopColor="#f0f4f8" stopOpacity={opacity} />
          <stop offset="100%" stopColor="#d8e2ec" stopOpacity={opacity * 0.85} />
        </linearGradient>
        <radialGradient id={shadowId} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={opacity * 0.5} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Soft glow underneath */}
      <ellipse cx="50" cy="40" rx="48" ry="28" fill={`url(#${shadowId})`} />
      {/* Main cloud body */}
      <path
        d={path}
        fill={`url(#${gradId})`}
      />
      {/* Highlight bumps on top for depth */}
      <path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  );
}

function Clouds() {
  const clouds = [
    { top: "6%", scale: 1, duration: 20, delay: 0, variant: 0, opacity: 0.92 },
    { top: "26%", scale: 0.65, duration: 26, delay: 5, variant: 1, opacity: 0.85 },
    { top: "48%", scale: 1.2, duration: 32, delay: 10, variant: 3, opacity: 0.9 },
    { top: "68%", scale: 0.8, duration: 38, delay: 15, variant: 2, opacity: 0.8 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: c.top, left: "-30%", scale: c.scale }}
          animate={{ left: ["-30%", "130%"] }}
          transition={{ duration: c.duration, repeat: Infinity, ease: "linear", delay: c.delay }}
        >
          <CloudShape variant={c.variant} opacity={c.opacity} />
        </motion.div>
      ))}
    </div>
  );
}

function Rain({ storm = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-6 bg-blue-100/80 rounded-full"
          style={{ left: `${(i / 30) * 100 + Math.random() * 3}%`, top: "-10%" }}
          animate={{ y: ["0%", "900%"] }}
          transition={{ duration: 0.35 + Math.random() * 0.35, repeat: Infinity, ease: "linear", delay: Math.random() * 1.2 }}
        />
      ))}
      {storm && (
        <>
          <motion.div
            className="absolute inset-0 bg-white/60"
            animate={{ opacity: [0, 0, 1, 0, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3, times: [0, 0.2, 0.35, 0.5, 1] }}
          />
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`bolt-${i}`}
              className="absolute"
              style={{ left: `${15 + i * 30}%`, top: "5%" }}
              animate={{ opacity: [0, 0, 1, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3.5 + i * 1.5, times: [0, 0.2, 0.5, 1] }}
            >
              <div className="h-20 w-1.5 bg-yellow-300 blur-[1px] shadow-[0_0_12px_rgba(255,235,0,0.9)]" style={{ clipPath: "polygon(50% 0%, 0% 50%, 40% 50%, 10% 100%, 100% 40%, 60% 40%, 80% 0%)" }} />
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}

function Snow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(22)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-2.5 w-2.5 rounded-full bg-white/90"
          style={{ left: `${(i / 22) * 100 + Math.random() * 4}%`, top: "-5%" }}
          animate={{ y: ["0%", "800%"], x: [0, Math.random() * 24 - 12, 0] }}
          transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, ease: "linear", delay: Math.random() * 3 }}
        />
      ))}
    </div>
  );
}

function Fog() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-full w-full"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 70%)" }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.15, 1] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 1 }}
        />
      ))}
    </div>
  );
}

export default function WeatherBackground({ weatherCode }) {
  const code = weatherCode ?? 0;

  if ([0, 1, 2].includes(code)) return <SunRays />;
  if ([45, 48].includes(code)) return <Fog />;
  if ([3].includes(code)) return <Clouds />;
  if ([95, 96, 99].includes(code)) return <Rain storm />;
  if ([71, 73, 75].includes(code)) return <Snow />;
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <Rain />;

  return <SunRays />;
}
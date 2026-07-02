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

const CLOUD_VARIANTS = [
  [
    { w: 40, h: 40, left: 0, top: 12 },
    { w: 55, h: 55, left: 22, top: 0 },
    { w: 48, h: 48, left: 48, top: 4 },
    { w: 38, h: 38, left: 72, top: 10 },
  ],
  [
    { w: 35, h: 35, left: 0, top: 15 },
    { w: 50, h: 50, left: 18, top: 0 },
    { w: 60, h: 60, left: 38, top: -5 },
    { w: 45, h: 45, left: 68, top: 5 },
    { w: 32, h: 32, left: 88, top: 14 },
  ],
  [
    { w: 30, h: 30, left: 0, top: 10 },
    { w: 42, h: 42, left: 18, top: 0 },
    { w: 36, h: 36, left: 48, top: 6 },
  ],
  [
    { w: 35, h: 30, left: 0, top: 8 },
    { w: 45, h: 40, left: 18, top: 0 },
    { w: 52, h: 46, left: 38, top: -2 },
    { w: 45, h: 40, left: 60, top: 0 },
    { w: 35, h: 30, left: 84, top: 8 },
  ],
];

function CloudShape({ variant }) {
  const puffs = CLOUD_VARIANTS[variant % CLOUD_VARIANTS.length];
  return (
    <div className="relative" style={{ width: 130, height: 60 }}>
      {puffs.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/80 blur-[3px]"
          style={{ width: p.w, height: p.h, left: `${p.left}%`, top: p.top }}
        />
      ))}
    </div>
  );
}

function Clouds() {
  const clouds = [
    { top: "8%", scale: 1, duration: 20, delay: 0, variant: 0 },
    { top: "28%", scale: 0.7, duration: 26, delay: 5, variant: 1 },
    { top: "50%", scale: 1.15, duration: 32, delay: 10, variant: 2 },
    { top: "70%", scale: 0.85, duration: 38, delay: 15, variant: 3 },
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
          <CloudShape variant={c.variant} />
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
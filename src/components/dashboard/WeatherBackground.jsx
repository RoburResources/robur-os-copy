import { useId } from "react";
import { motion } from "framer-motion";

// Cloud blob clusters — overlapping circles merged into organic shapes via SVG goo filter
const CLOUD_BLOBS = [
  // Large cumulus
  [
    { cx: 40, cy: 52, r: 20 }, { cx: 70, cy: 44, r: 28 }, { cx: 105, cy: 42, r: 30 },
    { cx: 140, cy: 48, r: 24 }, { cx: 165, cy: 54, r: 18 }, { cx: 56, cy: 60, r: 16 },
    { cx: 88, cy: 62, r: 18 }, { cx: 122, cy: 60, r: 16 },
  ],
  // Medium cloud
  [
    { cx: 28, cy: 48, r: 16 }, { cx: 58, cy: 40, r: 24 }, { cx: 92, cy: 38, r: 26 },
    { cx: 122, cy: 44, r: 20 }, { cx: 46, cy: 54, r: 14 }, { cx: 78, cy: 56, r: 16 },
    { cx: 108, cy: 54, r: 14 },
  ],
  // Small cloud
  [
    { cx: 24, cy: 46, r: 14 }, { cx: 50, cy: 38, r: 20 }, { cx: 80, cy: 36, r: 22 },
    { cx: 106, cy: 42, r: 18 }, { cx: 38, cy: 52, r: 12 }, { cx: 68, cy: 53, r: 14 },
  ],
  // Wide spread cloud
  [
    { cx: 18, cy: 50, r: 16 }, { cx: 48, cy: 40, r: 26 }, { cx: 84, cy: 38, r: 30 },
    { cx: 120, cy: 40, r: 28 }, { cx: 154, cy: 46, r: 22 }, { cx: 176, cy: 52, r: 16 },
    { cx: 36, cy: 56, r: 14 }, { cx: 70, cy: 58, r: 16 }, { cx: 104, cy: 58, r: 16 },
    { cx: 138, cy: 56, r: 14 },
  ],
];

function RealisticCloud({ variant = 0, opacity = 0.92, dark = false }) {
  const uid = useId().replace(/:/g, "");
  const blobs = CLOUD_BLOBS[variant % CLOUD_BLOBS.length];
  const filterId = `cf-${uid}`;
  const gradId = `cg-${uid}`;

  const topColor = dark ? "#90A4AE" : "#FFFFFF";
  const midColor = dark ? "#78909C" : "#ECEFF1";
  const bottomColor = dark ? "#546E7A" : "#B0C4DE";

  return (
    <svg width="200" height="76" viewBox="0 0 200 76" style={{ overflow: "visible" }}>
      <defs>
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8" />
        </filter>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={topColor} stopOpacity={opacity} />
          <stop offset="55%" stopColor={midColor} stopOpacity={opacity * 0.95} />
          <stop offset="100%" stopColor={bottomColor} stopOpacity={opacity * 0.7} />
        </linearGradient>
      </defs>
      {/* Soft ground shadow */}
      <ellipse cx="100" cy="72" rx="65" ry="5" fill="#000" opacity="0.06" />
      {/* Cloud body — circles merged by goo filter into organic volumetric shape */}
      <g filter={`url(#${filterId})`}>
        {blobs.map((b, i) => (
          <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={`url(#${gradId})`} />
        ))}
      </g>
    </svg>
  );
}

function Sun() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Outer corona glow — static position, slow breathing */}
      <motion.div
        className="absolute -top-12 -right-10 w-40 h-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,225,120,0.3) 0%, rgba(255,210,80,0.08) 45%, transparent 72%)" }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Sun disc — stays in position */}
      <motion.div
        className="absolute top-1 right-3 w-14 h-14 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,250,220,0.98) 0%, rgba(255,235,150,0.9) 40%, rgba(255,210,80,0.4) 75%, rgba(255,200,0,0.05) 100%)",
          boxShadow: "0 0 20px rgba(255,220,100,0.4), 0 0 40px rgba(255,210,80,0.2)",
        }}
        animate={{ opacity: [0.92, 1, 0.92] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Atmospheric horizon haze */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.06) 100%)" }} />
    </div>
  );
}

function CloudLayer({ count = 3, dark = false }) {
  const configs = count >= 5
    ? [
        { top: "2%", scale: 1.1, duration: 50, delay: 0, variant: 0 },
        { top: "18%", scale: 0.75, duration: 62, delay: 10, variant: 3 },
        { top: "35%", scale: 1.25, duration: 72, delay: 20, variant: 1 },
        { top: "55%", scale: 0.85, duration: 56, delay: 30, variant: 2 },
        { top: "76%", scale: 1.0, duration: 66, delay: 38, variant: 0 },
      ]
    : [
        { top: "8%", scale: 1, duration: 55, delay: 0, variant: 0 },
        { top: "42%", scale: 0.7, duration: 72, delay: 15, variant: 1 },
        { top: "75%", scale: 1.15, duration: 62, delay: 30, variant: 2 },
      ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {configs.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: c.top, left: "-40%", scale: c.scale }}
          animate={{ left: ["-40%", "140%"] }}
          transition={{ duration: c.duration, repeat: Infinity, ease: "linear", delay: c.delay }}
        >
          <RealisticCloud variant={c.variant} dark={dark} opacity={dark ? 0.82 : 0.92} />
        </motion.div>
      ))}
    </div>
  );
}

function Rain({ storm = false }) {
  const count = storm ? 35 : 28;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1.5px] rounded-full"
          style={{
            left: `${(i / count) * 100 + Math.random() * 4}%`,
            top: "-10%",
            height: `${14 + Math.random() * 10}px`,
            background: `linear-gradient(to bottom, transparent, rgba(180,210,240,${storm ? 0.75 : 0.55}))`,
          }}
          animate={{ y: ["0%", "1000%"] }}
          transition={{ duration: 0.45 + Math.random() * 0.25, repeat: Infinity, ease: "linear", delay: Math.random() * 1.5 }}
        />
      ))}
      {storm && (
        <>
          {/* Lightning flash illuminates the sky */}
          <motion.div
            className="absolute inset-0 bg-white"
            animate={{ opacity: [0, 0, 0.5, 0, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4, times: [0, 0.3, 0.45, 0.55, 1] }}
          />
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`bolt-${i}`}
              className="absolute"
              style={{ left: `${25 + i * 35}%`, top: "6%" }}
              animate={{ opacity: [0, 0, 1, 0] }}
              transition={{ duration: 0.25, repeat: Infinity, repeatDelay: 4.5 + i * 2, times: [0, 0.3, 0.5, 1] }}
            >
              <svg width="18" height="48" viewBox="0 0 18 48">
                <path d="M 9 0 L 3 20 L 8 20 L 2 48 L 15 18 L 10 18 L 14 0 Z" fill="rgba(255,245,100,0.95)" style={{ filter: "drop-shadow(0 0 8px rgba(255,235,0,0.8))" }} />
              </svg>
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
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${(i / 18) * 100 + Math.random() * 5}%`,
            top: "-5%",
            width: `${3 + Math.random() * 3}px`,
            height: `${3 + Math.random() * 3}px`,
            boxShadow: "0 0 4px rgba(255,255,255,0.4)",
          }}
          animate={{ y: ["0%", "950%"], x: [0, Math.random() * 30 - 15, 0] }}
          transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
        />
      ))}
    </div>
  );
}

function Fog() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-full w-[150%]"
          style={{
            background: `radial-gradient(ellipse at ${25 + i * 20}% center, rgba(255,255,255,${0.35 - i * 0.06}) 0%, transparent 65%)`,
            left: "-50%",
            top: `${i * 22}%`,
          }}
          animate={{ x: ["-8%", "8%", "-8%"], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function WeatherBackground({ weatherCode }) {
  const code = weatherCode ?? 0;

  if ([0, 1].includes(code)) return <Sun />;
  if ([2].includes(code)) return (<><Sun /><CloudLayer count={3} /></>);
  if ([45, 48].includes(code)) return <Fog />;
  if ([3].includes(code)) return <CloudLayer count={5} dark />;
  if ([95, 96, 99].includes(code)) return (<><CloudLayer count={5} dark /><Rain storm /></>);
  if ([71, 73, 75].includes(code)) return (<><CloudLayer count={3} dark /><Snow /></>);
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return (<><CloudLayer count={5} dark /><Rain /></>);

  return <Sun />;
}
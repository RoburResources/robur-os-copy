import { useId } from "react";
import { motion } from "framer-motion";

// Cloud blob clusters — overlapping circles that form the base cloud mass.
// The SVG turbulence+displacement filter warps their edges into organic,
// fluffy billows with natural diffuse falloff — no hard outlines, no shadow.
// SVG canvas is oversized with generous padding so displacement never clips.
const CLOUD_BLOBS = [
  // Large cumulus
  [
    { cx: 50, cy: 58, r: 22 }, { cx: 75, cy: 48, r: 30 }, { cx: 105, cy: 44, r: 34 },
    { cx: 135, cy: 46, r: 32 }, { cx: 165, cy: 52, r: 26 }, { cx: 190, cy: 60, r: 20 },
    { cx: 65, cy: 64, r: 20 }, { cx: 90, cy: 66, r: 22 }, { cx: 120, cy: 68, r: 22 },
    { cx: 150, cy: 66, r: 20 },
  ],
  // Medium cloud
  [
    { cx: 48, cy: 56, r: 18 }, { cx: 72, cy: 46, r: 26 }, { cx: 100, cy: 42, r: 28 },
    { cx: 128, cy: 46, r: 24 }, { cx: 152, cy: 54, r: 18 }, { cx: 62, cy: 62, r: 16 },
    { cx: 88, cy: 64, r: 18 }, { cx: 114, cy: 64, r: 16 },
  ],
  // Small cloud
  [
    { cx: 44, cy: 54, r: 16 }, { cx: 68, cy: 44, r: 22 }, { cx: 94, cy: 42, r: 24 },
    { cx: 118, cy: 48, r: 18 }, { cx: 56, cy: 60, r: 14 }, { cx: 80, cy: 62, r: 16 },
  ],
  // Wide spread cloud
  [
    { cx: 40, cy: 58, r: 20 }, { cx: 68, cy: 46, r: 30 }, { cx: 100, cy: 42, r: 34 },
    { cx: 132, cy: 42, r: 32 }, { cx: 164, cy: 48, r: 28 }, { cx: 192, cy: 56, r: 22 },
    { cx: 215, cy: 62, r: 18 }, { cx: 54, cy: 64, r: 16 }, { cx: 84, cy: 66, r: 18 },
    { cx: 116, cy: 68, r: 18 }, { cx: 148, cy: 66, r: 16 }, { cx: 178, cy: 64, r: 14 },
  ],
];

function RealisticCloud({ variant = 0, opacity = 0.92, dark = false, stormy = false }) {
  const uid = useId().replace(/:/g, "");
  const blobs = CLOUD_BLOBS[variant % CLOUD_BLOBS.length];
  const filterId = `cloudf-${uid}`;
  const gradId = `cloudg-${uid}`;
  const highlightId = `cloudh-${uid}`;

  // Vertical light-to-shadow gradient: bright illuminated top -> shadowed bottom
  // Storm clouds get electric purple/blue internal illumination
  const topColor = stormy ? "#C4B8E0" : dark ? "#B0BEC5" : "#FFFFFF";
  const midColor = stormy ? "#7B6FA8" : dark ? "#78909C" : "#E8EDF2";
  const bottomColor = stormy ? "#2D3540" : dark ? "#546E7A" : "#B8C5D6";

  return (
    <svg width="260" height="100" viewBox="0 0 260 100" style={{ overflow: "visible" }}>
      <defs>
        {/* Turbulence displacement — warps circle edges into organic fluffy
            billows with natural diffuse falloff. No hard outlines possible.
            Filter region generously oversized so displacement never clips. */}
        <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
          <feTurbulence type="fractalNoise" baseFrequency="0.014 0.022" numOctaves="3" seed={variant * 7 + 3} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="32" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="1.2" />
        </filter>
        {/* Main body gradient — light top, dark bottom for volumetric depth */}
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={topColor} stopOpacity={opacity} />
          <stop offset="35%" stopColor={midColor} stopOpacity={opacity * 0.92} />
          <stop offset="100%" stopColor={bottomColor} stopOpacity={opacity * 0.6} />
        </linearGradient>
        {/* Highlight gradient — bright top catch-light for billow texture */}
        <radialGradient id={highlightId} cx="50%" cy="15%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={stormy ? 0.3 : 0.15} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Cloud body — circles distorted by turbulence into organic fluffy shape */}
      <g filter={`url(#${filterId})`}>
        {blobs.map((b, i) => (
          <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={`url(#${gradId})`} />
        ))}
        {/* Highlight overlay on top portion */}
        {blobs.map((b, i) => (
          <circle key={`h-${i}`} cx={b.cx} cy={b.cy - b.r * 0.3} r={b.r * 0.7} fill={`url(#${highlightId})`} />
        ))}
      </g>
      {/* Storm: internal electric glow radiating from within the cloud */}
      {stormy && (
        <g filter={`url(#${filterId})`} opacity="0.4">
          {blobs.slice(2, 6).map((b, i) => (
            <circle key={`s-${i}`} cx={b.cx} cy={b.cy} r={b.r * 0.5} fill="#B4A7D6" />
          ))}
        </g>
      )}
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

function CloudLayer({ count = 3, dark = false, stormy = false }) {
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
          <RealisticCloud variant={c.variant} dark={dark} stormy={stormy} opacity={dark ? 0.85 : 0.92} />
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
  if ([95, 96, 99].includes(code)) return (<><CloudLayer count={5} dark stormy /><Rain storm /></>);
  if ([71, 73, 75].includes(code)) return (<><CloudLayer count={3} dark /><Snow /></>);
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return (<><CloudLayer count={5} dark /><Rain /></>);

  return <Sun />;
}
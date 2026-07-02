import { useId } from "react";
import { motion } from "framer-motion";

// Clouds are generated ENTIRELY from SVG fractalNoise turbulence — no circles,
// no geometric primitives, no flat surfaces. The noise is thresholded into organic
// cloud shapes with feathered, naturally diffuse edges, then vigneted so nothing
// can clip at the canvas boundary. A vertical gradient (light top -> shadow bottom)
// is masked by the noise for volumetric depth.

function RealisticCloud({ variant = 0, opacity = 0.92, dark = false, stormy = false }) {
  const uid = useId().replace(/:/g, "");
  const filterId = `cloudf-${uid}`;
  const gradId = `cloudg-${uid}`;
  const maskId = `cloudm-${uid}`;
  const vignetteId = `cloudv-${uid}`;

  const topColor = stormy ? "#C4B8E0" : dark ? "#B0BEC5" : "#FFFFFF";
  const midColor = stormy ? "#7B6FA8" : dark ? "#78909C" : "#E8EDF2";
  const bottomColor = stormy ? "#2D3540" : dark ? "#546E7A" : "#B8C5D6";

  return (
    <svg width="280" height="120" viewBox="0 0 280 120" style={{ overflow: "visible" }}>
      <defs>
        {/* Vignette: fades cloud to transparent at canvas edges so no surface
            can ever be clipped flat. The feComposite "in" below constrains
            the noise to this radial shape. */}
        <radialGradient id={vignetteId} cx="50%" cy="55%" r="58%">
          <stop offset="0%" stopColor="white" />
          <stop offset="60%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        {/* Turbulence -> threshold to cloud alpha -> soften -> constrain to vignette.
            The cloud IS the noise — no circles, no rectangles, no flat surfaces. */}
        <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.013" numOctaves="4" seed={variant * 11 + 5} result="noise" />
          <feColorMatrix in="noise" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.3 0 0 0 -0.58" result="cloud" />
          <feComponentTransfer in="cloud" result="soft">
            <feFuncA type="table" tableValues="0 0 0 0.04 0.18 0.45 0.75 1" />
          </feComponentTransfer>
          <feComposite in="soft" in2="SourceGraphic" operator="in" />
        </filter>
        {/* Vertical gradient: bright illuminated top -> shadowed bottom */}
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={topColor} stopOpacity={opacity} />
          <stop offset="40%" stopColor={midColor} stopOpacity={opacity * 0.88} />
          <stop offset="100%" stopColor={bottomColor} stopOpacity={opacity * 0.5} />
        </linearGradient>
        {/* Mask: rect with vignette gradient, filtered through turbulence.
            feComposite "in" constrains noise to the vignette area. */}
        <mask id={maskId}>
          <rect width="280" height="120" fill={`url(#${vignetteId})`} filter={`url(#${filterId})`} />
        </mask>
      </defs>
      {/* Cloud body: gradient masked by noise shape */}
      <rect width="280" height="120" fill={`url(#${gradId})`} mask={`url(#${maskId})`} />
      {/* Storm: internal electric glow overlay */}
      {stormy && (
        <rect width="280" height="120" fill="#B4A7D6" opacity="0.25" mask={`url(#${maskId})`} />
      )}
    </svg>
  );
}

function Sun() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-12 -right-10 w-40 h-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,225,120,0.3) 0%, rgba(255,210,80,0.08) 45%, transparent 72%)" }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1 right-3 w-14 h-14 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,250,220,0.98) 0%, rgba(255,235,150,0.9) 40%, rgba(255,210,80,0.4) 75%, rgba(255,200,0,0.05) 100%)",
          boxShadow: "0 0 20px rgba(255,220,100,0.4), 0 0 40px rgba(255,210,80,0.2)",
        }}
        animate={{ opacity: [0.92, 1, 0.92] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
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
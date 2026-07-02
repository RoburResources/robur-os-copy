import { motion } from "framer-motion";

function SunRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-20 -right-20 h-56 w-56 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,196,0,0.35) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1 right-3 h-24 w-1.5 rounded-full"
          style={{
            background: "linear-gradient(to bottom, rgba(255,196,0,0.3), transparent)",
            transformOrigin: "top center",
            rotate: `${i * 36}deg`,
          }}
          animate={{ opacity: [0.15, 0.5, 0.15], scaleY: [0.6, 1.1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
      <motion.div
        className="absolute top-3 right-3 h-10 w-10 rounded-full bg-robur-yellow/30 blur-md"
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Clouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/70 blur-lg"
          style={{
            top: `${5 + i * 18}%`,
            left: "-20%",
            height: `${24 + (i % 2) * 8}px`,
            width: `${100 + (i % 3) * 30}px`,
          }}
          animate={{ x: ["-15%", "135%"] }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "linear", delay: i * 2 }}
        />
      ))}
    </div>
  );
}

function Rain({ storm = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-5 bg-robur-steel/40 rounded-full"
          style={{ left: `${(i / 24) * 100 + Math.random() * 4}%`, top: "-8%" }}
          animate={{ y: ["0%", "800%"] }}
          transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity, ease: "linear", delay: Math.random() * 1.5 }}
        />
      ))}
      {storm && (
        <>
          <motion.div
            className="absolute inset-0 bg-white/30"
            animate={{ opacity: [0, 0, 1, 0, 0] }}
            transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 3.5, times: [0, 0.3, 0.45, 0.55, 1] }}
          />
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`bolt-${i}`}
              className="absolute"
              style={{ left: `${20 + i * 30}%`, top: "10%" }}
              animate={{ opacity: [0, 0, 1, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 + i * 1.5, times: [0, 0.3, 0.5, 1] }}
            >
              <div className="h-16 w-1 bg-yellow-300 blur-[2px]" style={{ clipPath: "polygon(50% 0%, 0% 50%, 40% 50%, 10% 100%, 100% 40%, 60% 40%, 80% 0%)" }} />
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
          className="absolute h-2 w-2 rounded-full bg-white/70"
          style={{ left: `${(i / 18) * 100 + Math.random() * 5}%`, top: "-5%" }}
          animate={{ y: ["0%", "700%"], x: [0, Math.random() * 20 - 10, 0] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "linear", delay: Math.random() * 3 }}
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
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, transparent 70%)" }}
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
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
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

function Clouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/80 blur-md"
          style={{
            top: `${10 + i * 20}%`,
            left: "-30%",
            height: `${28 + (i % 2) * 10}px`,
            width: `${120 + (i % 3) * 40}px`,
          }}
          animate={{ x: ["-20%", "140%"] }}
          transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "linear", delay: i * 2.5 }}
        />
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
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const levels = {
  1: "glass-1",
  2: "glass-2",
  3: "glass-3",
  4: "glass-4",
};

export default function GlassCard({ children, level = 1, className, hover = true, ...props }) {
  const hoverProps = hover
    ? {
        whileHover: { y: -4, scale: 1.008 },
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }
    : {};

  return (
    <motion.div
      className={cn(levels[level], "rounded-2xl group", className)}
      {...hoverProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}
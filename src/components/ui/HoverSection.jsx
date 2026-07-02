import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CREAMY = { type: "spring", stiffness: 320, damping: 22, mass: 0.6 };

export default function HoverSection({ children, className, hoverBg = "rgba(255,255,255,0.42)", ...props }) {
  return (
    <motion.div
      className={cn("rounded-xl", className)}
      whileHover={{ backgroundColor: hoverBg, scale: 1.01 }}
      transition={CREAMY}
      {...props}
    >
      {children}
    </motion.div>
  );
}
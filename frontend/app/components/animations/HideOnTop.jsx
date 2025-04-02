import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";

export default function HideOnTop({ children, bgColor }) { 
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const backgroundColor = bgColor?.toLowerCase() || "white"

  return (
    <motion.div
      ref={ref}
      initial={{ y: 0 }}
      animate={inView ? { y: "-100%" } : {}}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`absolute inset-0 z-10 bg-drop-${backgroundColor}`}
    >
      {children}
    </motion.div>
  );
}

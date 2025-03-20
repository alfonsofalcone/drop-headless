import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function FadeIn({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.1, once: true })

  return (
    <motion.div
    className="w-full h-full overflow-hidden" 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

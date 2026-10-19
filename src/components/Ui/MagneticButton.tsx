import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

/**
 * A link that gently pulls toward the cursor when nearby, and springs
 * back on leave — a small, deliberate touch that's genuinely rare on
 * portfolio sites since it takes more than a hover: class to build.
 */
function MagneticButton({ href, children, className = "", strength = 18 }: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set((relX / rect.width) * strength * 2);
    y.set((relY / rect.height) * strength * 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default MagneticButton;
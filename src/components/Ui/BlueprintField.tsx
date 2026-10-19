import { useEffect, useRef } from "react";
import { useReducedMotion, useMotionValue, useSpring, useMotionTemplate, motion } from "framer-motion";

/**
 * A faint dot/line grid, like blueprint or drafting paper. A brighter copy
 * of the same grid is revealed only inside a soft circle that tracks the
 * cursor — the background literally comes into focus as you explore it,
 * instead of a static decorative shape sitting behind the content.
 */
function BlueprintField() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 120, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 120, mass: 0.5 });

  const maskImage = useMotionTemplate`radial-gradient(420px circle at ${springX}px ${springY}px, black, transparent 80%)`;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  const gridStyle = {
    backgroundImage:
      "linear-gradient(to right, var(--color-secondary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-secondary) 1px, transparent 1px)",
    backgroundSize: "44px 44px",
  };

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Always-visible base layer, barely there */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07]" style={gridStyle} />

      {/* Brighter layer, only shown where the cursor is */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 opacity-[0.55] dark:opacity-[0.6]"
          style={{ ...gridStyle, WebkitMaskImage: maskImage, maskImage }}
        />
      )}
    </div>
  );
}

export default BlueprintField;
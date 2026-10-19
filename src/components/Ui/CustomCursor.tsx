"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const SEGMENT_COUNT = 7;
const DEFAULT_SIZE = 24;
const SNAP_PADDING = 12;
const BRACKET = 9; // corner leg length — stays fixed while the frame resizes

type CursorMode = "default" | "link" | "view";

const INTERACTIVE_SELECTOR =
  '[data-cursor="view"], a, button, input, textarea, [data-cursor="link"]';

function AdvancedCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // What the reticle actually springs toward. Usually mirrors the raw
  // mouse position, but gets pinned to a hovered element's rect when
  // one is active — that's what makes the "magnetic" snap possible.
  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const targetW = useMotionValue(DEFAULT_SIZE);
  const targetH = useMotionValue(DEFAULT_SIZE);

  const [mode, setMode] = useState<CursorMode>("default");
  const modeRef = useRef<CursorMode>("default");
  const elRef = useRef<HTMLElement | null>(null);

  const [reduced, setReduced] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const snapTo = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      targetX.set(r.left + r.width / 2);
      targetY.set(r.top + r.height / 2);
      targetW.set(r.width + SNAP_PADDING * 2);
      targetH.set(r.height + SNAP_PADDING * 2);
    };

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (modeRef.current === "default") {
        targetX.set(e.clientX);
        targetY.set(e.clientY);
        targetW.set(DEFAULT_SIZE);
        targetH.set(DEFAULT_SIZE);
      }
    };

    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(INTERACTIVE_SELECTOR);
      if (!el) return;
      const next: CursorMode = el.dataset.cursor === "view" ? "view" : "link";
      elRef.current = el;
      modeRef.current = next;
      setMode(next);
      snapTo(el);
    };

    const out = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (elRef.current && related && elRef.current.contains(related)) return;
      if (related?.closest(INTERACTIVE_SELECTOR)) return;
      elRef.current = null;
      modeRef.current = "default";
      setMode("default");
    };

    const scroll = () => {
      if (elRef.current) snapTo(elRef.current);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      window.removeEventListener("scroll", scroll);
    };
  }, [reduced, mouseX, mouseY, targetX, targetY, targetW, targetH]);

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden overflow-hidden md:block">
      <SnakeBody mouseX={mouseX} mouseY={mouseY} faded={mode !== "default"} />
      <Reticle targetX={targetX} targetY={targetY} targetW={targetW} targetH={targetH} mode={mode} />
      <PrecisionDot mouseX={mouseX} mouseY={mouseY} hidden={mode === "view"} />
    </div>
  );
}

/**
 * Each segment springs toward the PREVIOUS segment's live position
 * (not the raw cursor), so motion propagates down the chain the way
 * a snake's body follows its head — with real follow-through curl
 * on direction changes, not just independent lag.
 */
function SnakeBody({
  mouseX,
  mouseY,
  faded,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  faded: boolean;
}) {
  const segments = Array.from({ length: SEGMENT_COUNT });

  const xs: ReturnType<typeof useSpring>[] = [];
  const ys: ReturnType<typeof useSpring>[] = [];

  segments.forEach((_, i) => {
    const prevX = i === 0 ? mouseX : xs[i - 1];
    const prevY = i === 0 ? mouseY : ys[i - 1];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    xs.push(useSpring(prevX, { damping: 22, stiffness: 260, mass: 0.4 }));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ys.push(useSpring(prevY, { damping: 22, stiffness: 260, mass: 0.4 }));
  });

  return (
    <>
      {segments.map((_, i) => {
        const size = 8 - i * 0.9;
        const opacity = (0.5 - i * 0.065) * (faded ? 0.25 : 1);
        return (
          <motion.div
            key={i}
            style={{
              x: xs[i],
              y: ys[i],
              translateX: "-50%",
              translateY: "-50%",
              width: Math.max(size, 2),
              height: Math.max(size, 2),
              opacity: Math.max(opacity, 0),
            }}
            className="absolute left-0 top-0 rounded-full bg-accent transition-opacity duration-300"
          />
        );
      })}
    </>
  );
}

function PrecisionDot({
  mouseX,
  mouseY,
  hidden,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  hidden: boolean;
}) {
  const x = useSpring(mouseX, { damping: 30, stiffness: 700, mass: 0.15 });
  const y = useSpring(mouseY, { damping: 30, stiffness: 700, mass: 0.15 });

  return (
    <motion.div
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: hidden ? 0 : 1, scale: hidden ? 0 : 1 }}
      transition={{ duration: 0.18 }}
      className="absolute left-0 top-0 h-2 w-2 rounded-full bg-accent"
    />
  );
}

/**
 * A viewfinder-style frame — four independent corner brackets rather
 * than a filled shape, like a camera autofocus box. Legs stay a fixed
 * length while the frame itself resizes and snaps to hovered elements,
 * so it always reads as "brackets targeting something," never as a
 * stretched circle.
 */
function Reticle({
  targetX,
  targetY,
  targetW,
  targetH,
  mode,
}: {
  targetX: ReturnType<typeof useMotionValue<number>>;
  targetY: ReturnType<typeof useMotionValue<number>>;
  targetW: ReturnType<typeof useMotionValue<number>>;
  targetH: ReturnType<typeof useMotionValue<number>>;
  mode: CursorMode;
}) {
  const spring = { damping: 24, stiffness: 280, mass: 0.5 };
  const x = useSpring(targetX, spring);
  const y = useSpring(targetY, spring);
  const w = useSpring(targetW, spring);
  const h = useSpring(targetH, spring);

  const corners = [
    { pos: { top: 0, left: 0 }, border: "1.5px 0 0 1.5px", radius: "4px 0 0 0" },
    { pos: { top: 0, right: 0 }, border: "1.5px 1.5px 0 0", radius: "0 4px 0 0" },
    { pos: { bottom: 0, left: 0 }, border: "0 0 1.5px 1.5px", radius: "0 0 0 4px" },
    { pos: { bottom: 0, right: 0 }, border: "0 1.5px 1.5px 0", radius: "0 0 4px 0" },
  ];

  return (
    <motion.div
      style={{ x, y, width: w, height: h, translateX: "-50%", translateY: "-50%" }}
      animate={{ rotate: mode === "default" ? [0, 2, 0, -2, 0] : 0 }}
      transition={
        mode === "default"
          ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.3 }
      }
      className="absolute left-0 top-0 flex items-center justify-center"
    >
      {corners.map((c, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            width: BRACKET,
            height: BRACKET,
            borderStyle: "solid",
            borderColor: "var(--accent)",
            borderWidth: c.border,
            borderRadius: c.radius,
            ...c.pos,
          }}
        />
      ))}

      <AnimatePresence>
        {mode === "view" && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium tracking-wide text-accent"
          >
            View project
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path
                d="M1 9L9 1M9 1H3M9 1V7"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AdvancedCursor;
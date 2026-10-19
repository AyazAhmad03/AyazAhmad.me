import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={cn(isCenter && "text-center", className)}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-sm font-mono uppercase tracking-[0.3em] text-accent"
      >
        {eyebrow}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className={cn(
          "font-display text-3xl font-bold leading-tight md:text-5xl",
          !isCenter && "max-w-2xl"
        )}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn(
            "mt-4 text-black/60 dark:text-white/60",
            isCenter ? "mx-auto max-w-xl" : "max-w-xl"
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

export default SectionHeading;

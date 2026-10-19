import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Single source of truth for page width + centering.
 * Every section should wrap its content in this instead of
 * repeating "mx-auto max-w-6xl px-6" by hand.
 */
function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6", className)}>
      {children}
    </div>
  );
}

export default Container;

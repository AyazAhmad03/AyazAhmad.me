import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import MagneticButton from "./Ui/MagneticButton";

interface CopyableEmailProps {
  email: string;
}

function CopyableEmail({ email }: CopyableEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API can fail on non-HTTPS/unsupported browsers — mailto
      // still works as a fallback via the link itself.
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <MagneticButton
        href={`mailto:${email}`}
        strength={10}
        className="group inline-flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-text-light transition-colors duration-300 hover:text-accent dark:text-text-dark sm:text-4xl md:text-5xl"
      >
        <span
          onClick={(e) => {
            e.preventDefault();
            handleCopy();
          }}
        >
          {email}
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/10 text-text-light/40 transition-colors duration-300 group-hover:border-secondary/40 group-hover:text-secondary dark:border-white/15 dark:text-text-dark/40 sm:h-11 sm:w-11">
          {copied ? <Check size={18} /> : <Copy size={16} />}
        </span>
      </MagneticButton>

      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-7 font-mono text-xs uppercase tracking-[0.2em] text-accent"
            aria-live="polite"
          >
            Copied to clipboard
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CopyableEmail;
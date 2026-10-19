import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";
import { cn } from "../lib/utils";
import Container from "./Ui/Container";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// UX Helper: Close menu when clicking outside of it
function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  useClickOutside(navRef, () => setMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 150) {
        setActiveHref(null);
}
      const diff = currentScrollY - lastScrollY.current;

      setScrolled(currentScrollY > 20);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(currentScrollY / max, 1) : 0);

      if (currentScrollY < 50) {
        setVisible(true);
      } else if (diff > 10) {
        setVisible(false);
        setMenuOpen(false); // Auto-close mobile menu on scroll down
      } else if (diff < -10) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll(); // initialize correctly if the page loads mid-scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href)
    ).filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? 0 : "-100%", opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
        scrolled
          ? "border-secondary/12 bg-bg-light/85 backdrop-blur-md dark:border-white/10 dark:bg-bg-dark/80"
          : "border-transparent bg-transparent"
      )}
    >
      <nav ref={navRef} aria-label="Primary">
        <Container>
          <div className="flex items-center justify-between py-4">
            {/* Logo mark — corner ticks echo the cursor's viewfinder brackets */}
            <a
              href="#hero"
              className="group flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              aria-label="Home"
            >
              <motion.span
                whileHover={{ scale: 1.06, rotate: -3 }}
                whileTap={{ scale: 0.94 }}
                className="relative flex h-9 w-9 items-center justify-center font-display text-sm font-bold text-secondary"
              >
                {[
                  "top-0 left-0 border-t border-l",
                  "top-0 right-0 border-t border-r",
                  "bottom-0 left-0 border-b border-l",
                  "bottom-0 right-0 border-b border-r",
                ].map((pos) => (
                  <span
                    key={pos}
                    className={cn(
                      "absolute h-2.5 w-2.5 border-secondary/50 transition-colors duration-300 group-hover:border-secondary",
                      pos
                    )}
                  />
                ))}
                A
              </motion.span>
              <span className="hidden font-display text-lg font-semibold tracking-tight text-text-light transition-colors group-hover:text-secondary dark:text-text-dark sm:inline">
                Ayaz Ahmad
              </span>
            </a>

            {/* Desktop links — index number + underline, matching the skills catalog */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    <span
                      className={cn(
                        "font-mono text-[11px] transition-colors duration-300",
                        isActive ? "text-accent" : "text-secondary/40 group-hover:text-secondary/70"
                      )}
                    >
                      {pad(i + 1)}
                    </span>
                    <span
                      className={cn(
                        "relative transition-colors duration-300",
                        isActive
                          ? "text-text-light dark:text-text-dark"
                          : "text-text-light/70 group-hover:text-text-light dark:text-text-dark/70 dark:group-hover:text-text-dark"
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-px w-full origin-left bg-accent transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-secondary/15 text-text-light transition-colors hover:border-secondary/40 hover:bg-secondary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary dark:text-text-dark dark:hover:bg-white/5"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {theme === "dark" ? <Sun size={17} strokeWidth={2.2} /> : <Moon size={17} strokeWidth={2.2} />}
                  </motion.span>
                </AnimatePresence>
              </button>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-secondary/15 text-text-light transition-colors hover:border-secondary/40 hover:bg-secondary/5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary dark:text-text-dark dark:hover:bg-white/5 md:hidden"
              >
                <motion.div
                  animate={{ rotate: menuOpen ? 90 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {menuOpen ? <X size={17} strokeWidth={2.2} /> : <Menu size={17} strokeWidth={2.2} />}
                </motion.div>
              </button>
            </div>
          </div>
        </Container>

        {/* Scroll progress — a thin instrument gauge along the bar's own edge */}
        <div className="h-px w-full bg-secondary/8 dark:bg-white/5">
          <motion.div
            className="h-px bg-accent"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-b border-secondary/12 bg-bg-light/95 backdrop-blur-md dark:border-white/10 dark:bg-bg-dark/95 md:hidden"
            >
              <Container>
                <div className="flex flex-col py-2">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = activeHref === link.href;
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25, delay: i * 0.05 }}
                        aria-current={isActive ? "page" : undefined}
                        className="flex items-center gap-3 border-b border-secondary/8 py-3.5 text-base font-medium last:border-b-0 focus-visible:outline-none dark:border-white/5"
                      >
                        <span className={cn("font-mono text-xs", isActive ? "text-accent" : "text-secondary/40")}>
                          {pad(i + 1)}
                        </span>
                        <span
                          className={
                            isActive
                              ? "text-text-light dark:text-text-dark"
                              : "text-text-light/70 dark:text-text-dark/70"
                          }
                        >
                          {link.label}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

export default NavBar;
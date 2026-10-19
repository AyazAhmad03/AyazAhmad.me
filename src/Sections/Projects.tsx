import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projects } from "../Data/Project";
import Container from "../components/Ui/Container";
import SectionHeading from "../components/Ui/SectionHeader";

function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 26, stiffness: 300, mass: 0.5 });
  const springY = useSpring(mouseY, { damping: 26, stiffness: 300, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const hoveredProject = hovered !== null && expanded === null ? projects[hovered] : null;

  const toggleExpanded = (id: string) => {
    setExpanded((curr) => (curr === id ? null : id));
  };
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <Container>
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Portfolio" title="Selected work" />
          <p className="text-sm tracking-wide text-text-light/40 dark:text-text-dark/40">
            {String(projects.length).padStart(2, "0")} projects
          </p>
        </div>

        <div
          ref={listRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHovered(null)}
          className="relative border-t border-black/10 dark:border-white/10"
        >
          {projects.map((project, i) => {
            const isExpanded = expanded === project.id;

            return (
              <div
                key={project.id}
                className="border-b border-black/10 last:border-0 dark:border-white/10"
              >
                {/* Row click toggles the dropdown */}
                <motion.div
                  role="button"
                  tabIndex={0}
                  onMouseEnter={() => setHovered(i)}
                  onClick={() => toggleExpanded(project.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") toggleExpanded(project.id);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  aria-expanded={isExpanded}
                  className="group relative flex w-full cursor-pointer items-center justify-between gap-4 py-8 text-left md:py-10"
                >
                  <div className="flex items-center gap-5 md:gap-8">
                    <span className="font-mono text-sm text-text-light/30 dark:text-text-dark/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3
                        className={`font-display text-2xl font-bold tracking-tight transition-colors duration-300 md:text-4xl ${
                          hovered === i
                            ? "text-secondary"
                            : "text-text-light dark:text-text-dark"
                        }`}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs uppercase tracking-wide text-text-light/35 dark:text-text-dark/35 md:hidden">
                        {project.tech.slice(0, 3).join(" · ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 md:gap-6">
                    <div className="hidden items-center gap-4 md:flex">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs uppercase tracking-wide text-text-light/40 dark:text-text-dark/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <img
                      src={project.coverImage}
                      alt=""
                      className="h-12 w-16 shrink-0 rounded-md object-cover md:hidden"
                    />

                    {/* Goes straight to the live site its own hit target,
                        separate from the row's dropdown toggle */}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={stop}
                        aria-label={`Open ${project.title} live site`}
                        className={`hidden shrink-0 transition-all duration-300 md:block ${
                          hovered === i
                            ? "-translate-y-1 translate-x-1 text-secondary"
                            : "text-text-light/30 dark:text-text-dark/30"
                        }`}
                      >
                        <ExternalLink size={22} />
                      </a>
                    )}

                    {/* Dropdown toggle indicator visual only, the whole
                        row already handles the click */}
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-text-light/50 dark:border-white/15 dark:text-text-dark/50"
                    >
                      <ChevronDown size={16} />
                    </motion.span>
                  </div>
                </motion.div>

                {/* Accordion detail panel */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 md:grid-cols-[1fr_1.4fr]">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="h-48 w-full rounded-xl border border-black/10 object-cover dark:border-white/10 md:h-full"
                        />

                        <div>
                          Real write-up — falls back to blurb if 
                          <p className="text-base leading-relaxed text-text-light/70 dark:text-text-dark/70">
                            {project.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-secondary/20 bg-secondary/[0.06] px-3 py-1 text-xs text-text-light/70 dark:text-text-dark/70"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="mt-6 flex gap-5">
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={stop}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:opacity-80"
                              >
                                <ExternalLink size={15} />
                                Visit site
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={stop}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-text-light/70 hover:text-secondary dark:text-text-dark/70"
                              >
                                <SiGithub size={14} />
                                GitHub
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {!prefersReducedMotion && (
            <AnimatePresence>
              {hoveredProject && (
                <motion.div
                  style={{ x: springX, y: springY }}
                  initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                  animate={{ opacity: 1, scale: 1, rotate: -1 }}
                  exit={{ opacity: 0, scale: 0.88, rotate: 2 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute left-0 top-0 z-20 hidden h-72 w-80 -ml-40 -mt-80 md:block"
                >

                    <div className="absolute -inset-6 rounded-[2rem] bg-secondary/40 blur-[40px]" />
                  <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-2.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] dark:border-white/10 dark:bg-[#1A1A1D]">
                    <div className="relative flex-1 overflow-hidden rounded-xl">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={hoveredProject.id}
                          src={hoveredProject.coverImage}
                          alt={hoveredProject.title}
                          initial={{ opacity: 0, scale: 1.08 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="h-full w-full object-cover"
                        />
                      </AnimatePresence>
                    </div>

                    {/* Caption sits in the mount margin, not overlaid on
                        the image — reads as a print label, not a sticker. */}
                    <div className="mt-2.5 flex items-center justify-between border-t border-black/[0.06] pt-2.5 dark:border-white/10">
                      <span className="min-w-0 truncate pr-2 font-display text-sm font-medium text-text-light dark:text-text-dark">
                        {hoveredProject.title}
                      </span>
                      <span className="flex shrink-0 items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-accent">
                        View
                        <ExternalLink size={11} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </Container>
    </section>
  );
}

export default Projects;


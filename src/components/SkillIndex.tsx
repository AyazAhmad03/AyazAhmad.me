import { motion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNextdotjs,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiFigma,
  SiRedux,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiVite,
  SiHtml5,
  SiCss,
  SiSass,
  SiExpress,
  SiFirebase,
  SiVercel,
  SiPrisma,
  SiPostman,
  SiWebrtc,
  SiSolana,
} from "react-icons/si";
import type { IconType } from "react-icons";

interface SkillGroup {
  category: string;
  items: string[];
}

interface SkillIndexProps {
  groups: SkillGroup[];
}

const ICON_MAP: Record<string, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  git: SiGit,
  github: SiGithub,
  figma: SiFigma,
  redux: SiRedux,
  graphql: SiGraphql,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  docker: SiDocker,
  vite: SiVite,
  html5: SiHtml5,
  css3: SiCss,
  sass: SiSass,
  express: SiExpress,
  firebase: SiFirebase,
  vercel: SiVercel,
  prisma: SiPrisma,
  postman: SiPostman,
  webrtc: SiWebrtc,
  solana: SiSolana,
};

function normalize(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getIcon(label: string): IconType | null {
  return ICON_MAP[normalize(label)] ?? null;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// A static, catalog-style index rather than a scrolling ticker — grouped
// by the real categories in the data instead of discarding them. Each
// entry is tagged data-cursor="link" so hovering it drives the existing
// viewfinder cursor's focus state, rather than adding a second, competing
// hover effect on top of it.
function SkillIndex({ groups }: SkillIndexProps) {
  return (
    <div className="border-t border-secondary/15">
      {groups.map((group, gi) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: gi * 0.08 }}
          className="flex flex-col gap-5 border-b border-secondary/15 py-7 last:border-b-0 sm:flex-row sm:gap-10"
        >
          <div className="flex shrink-0 items-baseline gap-3 sm:w-44 sm:flex-col sm:items-start sm:gap-1.5">
            <span className="font-mono text-xs text-secondary/50">
              No. {pad(gi + 1)}
            </span>
            <h3 className="font-mono text-sm uppercase tracking-[0.25em] text-secondary">
              {group.category}
            </h3>
          </div>

          <ul className="flex flex-1 flex-wrap gap-x-7 gap-y-3.5">
            {group.items.map((item) => {
              const Icon = getIcon(item);
              return (
                <li key={item}>
                  <span
                    data-cursor="link"
                    className="group relative inline-flex items-center gap-2 text-[15px] text-text-light/70 transition-colors duration-300 hover:text-text-light dark:text-text-dark/70 dark:hover:text-text-dark"
                  >
                    {Icon && (
                      <Icon
                        aria-hidden="true"
                        className="h-4 w-4 text-text-light/40 transition-colors duration-300 group-hover:text-accent dark:text-text-dark/40"
                      />
                    )}
                    {item}
                    <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

export default SkillIndex;
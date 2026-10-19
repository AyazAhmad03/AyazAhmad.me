import { motion } from "framer-motion";
import { skills } from "../Data/Skils";
import SkillIndex from "../components/SkillIndex";
import Container from "../components/Ui/Container";

function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-secondary"
        >
          Stack
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-text-light md:text-5xl dark:text-text-dark"
        >
          The instruments of my{" "}
          <span className="italic text-text-light/40 dark:text-text-dark/40">
            craft.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-text-light/60 dark:text-text-dark/60"
        >
          Cataloged, not ranked. Hover any tool to bring it into focus.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-16"
        >
          <SkillIndex groups={skills} />
        </motion.div>
      </Container>
    </section>
  );
}

export default Skills;
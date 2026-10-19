import { motion } from "framer-motion";
import { socials } from "../Data/Socials";
import SocialLink from "../components/SocialLink";
import CopyableEmail from "../components/CopyableEmail";
import BlueprintField from "../components/Ui/BlueprintField";
import Container from "../components/Ui/Container";

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <BlueprintField />

      <Container className="relative text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-secondary"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-text-light md:text-5xl dark:text-text-dark"
        >
          Let&apos;s build something that feels premium.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-text-light/65 dark:text-text-dark/65 md:text-lg"
        >
          Open to internships, freelance work, and interesting product ideas.
          If you have a project in mind, this is the fastest way to reach me.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14"
        >
          <CopyableEmail email="ayazahmad5652@gmail.com" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex items-center justify-center gap-2 text-sm text-text-light/50 dark:text-text-dark/50"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for freelance work
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          {socials.map((social) => (
            <SocialLink key={social.label} social={social} />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 font-mono text-xs uppercase tracking-[0.2em] text-text-light/30 dark:text-text-dark/30"
        >
          Based in Delhi, IN — usually replies within 24–48 hrs
        </motion.p>
      </Container>
    </section>
  );
}

export default Contact;
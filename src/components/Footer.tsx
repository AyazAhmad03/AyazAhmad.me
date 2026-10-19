import { socials } from "../Data/Socials";

function Footer() {
    const github = socials.find((social)=> social.label === "GitHub")
  return (
    <footer className="border-t border-black/5 px-6 py-8 flex justify-center gap-2 text-center text-sm text-text-light/40 dark:border-white/10 dark:text-text-dark/40">
      <p>© {new Date().getFullYear()} </p>
        
        <a 
        href={github?.href}
        target= "_blank"
        rel="noopener noreferrer"
           className="transition-colors hover:text-secondary dark:text-accent underline"
        >Ayaz Ahmad.</a>

    </footer>
  );
}

export default Footer;
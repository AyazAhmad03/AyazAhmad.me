import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Hero from "./Sections/Hero";
import About from "./Sections/About";
import Skills from "./Sections/Skills";
import Projects from "./Sections/Projects";
import Contact from "./Sections/Contact";
import CustomCursor from "./components/Ui/CustomCursor";
import IntroSignature from "./components/IntroSignature";
// import { useLenis } from "lenis/react";

function Portfolio() {

//  useLenis()

  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone]);

  return (
    <>
      <IntroSignature onFinish={() => setIntroDone(true)} />
      <div
        className={
          "transition-opacity duration-500 " +
          (introDone ? "opacity-100" : "opacity-0 pointer-events-none")
        }
      >
        <NavBar />
        <main>
          <CustomCursor/>
          <Hero />
          <Projects />
          <Skills />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Portfolio;
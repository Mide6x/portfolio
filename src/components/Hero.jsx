import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaResearchgate,
} from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import DecryptedText from "./DecryptedText";
import Shuffle from "./Shuffle";

const Hero = () => {
  const navigate = useNavigate();
  const reduceMotion = usePrefersReducedMotion();

  const letterAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05 + 0.2,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const text = "Hi, I'm".split("");

  // Social link data to reduce repetition
  const socialLinks = [
    { href: "https://linkedin.com/in/olumideadewole", icon: FaLinkedin },
    { href: "https://youtube.com/@heymide", icon: FaYoutube },
    { href: "https://scholar.google.com/citations?user=o2yybuAAAAAJ&hl=en", icon: SiGooglescholar },
    { href: "https://www.researchgate.net/profile/Olumide-Adewole-2", icon: FaResearchgate },
    { href: "https://github.com/mide6x", icon: FaGithub },
  ];

  const hoverShake = {
    scale: 1.2,
    rotate: [0, -10, 10, -10, 0],
    transition: { duration: 0.5 },
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="w-full max-w-4xl mx-auto px-4">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8 }}
          className="space-y-6 flex flex-col items-center text-center mx-auto"
        >
          <div className="flex flex-row flex-nowrap overflow-hidden justify-center text-lg md:text-xl tracking-[0.2em] uppercase text-textSecondary whitespace-nowrap">
            {reduceMotion
              ? <span className="text-secondary font-mono inline-block">Hi, I&apos;m</span>
              : text.map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterAnimation}
                    initial="hidden"
                    animate="visible"
                    className="text-secondary font-mono inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))
            }
          </div>

          <div className="overflow-hidden mt-2 whitespace-nowrap">
            <Shuffle
              text="Olumide"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
              tag="h2"
              className="text-5xl sm:text-7xl md:text-8xl font-bold hover:text-secondary transition-colors duration-300 inline-block tracking-tight whitespace-nowrap"
              textAlign="center"
            />
          </div>

          <motion.div
            className="max-w-3xl text-textSecondary text-lg sm:text-xl font-light leading-relaxed mx-auto"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 2 }}
          >
            <DecryptedText
              text={`I’m an Artificial Intelligence Engineer, full-stack developer, and MBA student with a strong interest in building intelligent, secure, and business-focused digital systems. My work sits at the intersection of AI, software engineering, risk, and product strategy, with experience in machine learning, data science, backend systems, mobile applications, and AI-powered automation.\n\nI’m especially interested in how organisations can use intelligent systems responsibly to improve decision-making, detect fraud, manage operational risk, and build scalable products that solve real problems.`}
              animateOn="view"
              revealDirection="center"
              speed={40}
              maxIterations={15}
            />
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-6 pt-4"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 2.3 }}
          >
            {socialLinks.map(({ href, icon: Icon }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-secondary/80"
                whileHover={reduceMotion ? undefined : hoverShake}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row justify-center gap-6 w-full sm:w-auto"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduceMotion ? 0 : 4.6 }}
          >
            <motion.button
              whileHover={reduceMotion ? undefined : { scale: 1.05, boxShadow: "0 0 8px #64FFDA" }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              className="border border-secondary text-secondary px-6 py-3 rounded hover:bg-secondary/10 transition relative group w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 font-medium">Check out my work</span>
              {!reduceMotion && (
                <motion.div
                  className="absolute inset-0 bg-secondary/20 rounded"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>

            <motion.button
              onClick={() => navigate("/cv")}
              whileHover={reduceMotion ? undefined : { scale: 1.05, boxShadow: "0 0 8px #64FFDA" }}
              whileTap={reduceMotion ? undefined : { scale: 0.95 }}
              className="border border-secondary text-secondary px-6 py-3 rounded hover:bg-secondary/10 transition relative group cursor-pointer w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 font-medium">My CV</span>
              {!reduceMotion && (
                <motion.div
                  className="absolute inset-0 bg-secondary/20 rounded"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

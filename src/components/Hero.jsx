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
  const name = "Mide.".split("");

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
      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8 }}
          className="space-y-4"
        >
          <div className="flex overflow-hidden">
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

          <div className="overflow-hidden">
            {reduceMotion ? (
              <h2 className="text-6xl font-bold flex flex-wrap">
                {name.map((letter, i) => (
                  <span
                    key={i}
                    className="inline-block hover:text-secondary transition-colors duration-300"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </h2>
            ) : (
              <motion.h2
                className="text-6xl font-bold flex flex-wrap"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.5,
                }}
              >
                {name.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block hover:text-secondary transition-colors duration-300"
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.h2>
            )}
          </div>

          <motion.p
            className="max-w-xl text-textSecondary text-base sm:text-lg leading-relaxed"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 2 }}
          >
            I&apos;m an Artificial Intelligence Engineer and MBA student with a growing research interest in AI, risk, governance, and how organisations adopt intelligent systems for fraud detection and operational risk management.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 sm:gap-6 pt-2"
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
            className="mt-8 flex flex-col sm:flex-row gap-4"
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

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1, delay: reduceMotion ? 0 : 0.5 }}
          className="relative group hidden md:block"
        >
          {/* Decorative Rings (Circlet) */}
          {!reduceMotion && (
            <>
              <div className="absolute -inset-8 border-2 border-secondary/20 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-5 border border-secondary/40 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
            </>
          )}
          
          {/* Image Container */}
          <div className="relative w-72 h-72 lg:w-[400px] lg:h-[400px] rounded-full border-2 border-secondary p-1 overflow-hidden shadow-[0_0_30px_rgba(100,255,218,0.15)] bg-primary/50 backdrop-blur-sm">
            <div className="w-full h-full rounded-full overflow-hidden">
              <picture>
                <source
                  srcSet="/profile-400.webp 400w, /profile-800.webp 800w"
                  sizes="(max-width: 1024px) 288px, 400px"
                  type="image/webp"
                />
                <img
                  src="/IMG_0802.png"
                  alt="Olumide Adewole"
                  width="400"
                  height="400"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                />
              </picture>
            </div>
            
            {/* Overlay Shine Effect */}
            {!reduceMotion && (
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}
          </div>
          
          {/* Decorative Dot */}
          {!reduceMotion && (
            <div className="absolute top-2 right-2 w-5 h-5 bg-secondary rounded-full shadow-[0_0_15px_#64FFDA] animate-pulse" />
          )}
        </motion.div>

        {/* Mobile Image */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.5 }}
          className="md:hidden block order-first mb-10 justify-self-center"
        >
          <div className="relative w-56 h-56 rounded-full border-2 border-secondary p-1 overflow-hidden shadow-[0_0_20px_rgba(100,255,218,0.1)]">
            <picture>
              <source
                srcSet="/profile-400.webp"
                type="image/webp"
              />
              <img
                src="/IMG_0802.png"
                alt="Olumide Adewole"
                width="224"
                height="224"
                loading="eager"
                decoding="async"
                className="w-full h-full rounded-full object-cover shadow-lg"
              />
            </picture>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

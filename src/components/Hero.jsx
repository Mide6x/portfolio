import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaResearchgate,
} from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

const Hero = () => {
  const navigate = useNavigate();

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

  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="flex overflow-hidden">
            {text.map((letter, i) => (
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
            ))}
          </div>

          <div className="overflow-hidden">
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
          </div>

          <motion.p
            className="max-w-xl text-textSecondary text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            I&apos;m an Artificial Intelligence Engineer and MBA student with a growing research interest in AI, risk, governance, and how organisations adopt intelligent systems for fraud detection and operational risk management.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 sm:gap-6 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.3 }}
          >
            <motion.a
              href="https://linkedin.com/in/olumideadewole"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80"
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <FaLinkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://youtube.com/@heymide"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80"
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <FaYoutube className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://scholar.google.com/citations?user=o2yybuAAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80"
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <SiGooglescholar className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://www.researchgate.net/profile/Olumide-Adewole-2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80"
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <FaResearchgate className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://github.com/mide6x"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-secondary/80"
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 },
              }}
            >
              <FaGithub className="w-6 h-6" />
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px #64FFDA" }}
              whileTap={{ scale: 0.95 }}
              className="border border-secondary text-secondary px-6 py-3 rounded hover:bg-secondary/10 transition relative group w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 font-medium">Check out my work</span>
              <motion.div
                className="absolute inset-0 bg-secondary/20 rounded"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              onClick={() => navigate("/cv")}
              whileHover={{ scale: 1.05, boxShadow: "0 0 8px #64FFDA" }}
              whileTap={{ scale: 0.95 }}
              className="border border-secondary text-secondary px-6 py-3 rounded hover:bg-secondary/10 transition relative group cursor-pointer w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 font-medium">My CV</span>
              <motion.div
                className="absolute inset-0 bg-secondary/20 rounded"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative group hidden md:block"
        >
          {/* Decorative Rings (Circlet) */}
          <div className="absolute -inset-8 border-2 border-secondary/20 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-5 border border-secondary/40 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />
          
          {/* Image Container */}
          <div className="relative w-72 h-72 lg:w-[400px] lg:h-[400px] rounded-full border-2 border-secondary p-1 overflow-hidden shadow-[0_0_30px_rgba(100,255,218,0.15)] bg-primary/50 backdrop-blur-sm">
            <div className="w-full h-full rounded-full overflow-hidden">
               <img
                src="/IMG_0802.png"
                alt="Olumide Adewole"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
            
            {/* Overlay Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          
          {/* Decorative Dot */}
          <div className="absolute top-2 right-2 w-5 h-5 bg-secondary rounded-full shadow-[0_0_15px_#64FFDA] animate-pulse" />
        </motion.div>

        {/* Mobile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="md:hidden block order-first mb-10 justify-self-center"
        >
          <div className="relative w-56 h-56 rounded-full border-2 border-secondary p-1 overflow-hidden shadow-[0_0_20px_rgba(100,255,218,0.1)]">
            <img
              src="/IMG_0802.png"
              alt="Olumide Adewole"
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

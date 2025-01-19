import { motion } from 'framer-motion';
import { FaLinkedin, FaYoutube, FaGithub, FaResearchgate } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

const Hero = () => {
  const letterAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05 + 0.2,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const text = "Hi, I'm".split("");
  const name = "Mide.".split("");

  return (
    <section className="h-screen flex items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
              delay: 3.5
            }}
          >
            {name.map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block hover:text-secondary transition-colors duration-300"
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h2>
        </div>

        <motion.h3 
          className="text-5xl font-bold text-textSecondary"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 4 }}
        >
          I build AI-powered solutions.
        </motion.h3>

        <motion.p 
          className="max-w-xl text-textSecondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.2 }}
        >
          I&apos;m an Artificial Intelligence Engineer specializing in building exceptional
          digital experiences. Currently, I&apos;m focused on building AI-powered
          applications at Sabi AM and TaniAI.
        </motion.p>

        <motion.div 
          className="flex space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.4 }}
        >
          <motion.a
            href="https://linkedin.com/in/olumideadewole"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-secondary/80"
            whileHover={{ 
              scale: 1.2,
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
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
              transition: { duration: 0.5 }
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
              transition: { duration: 0.5 }
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
              transition: { duration: 0.5 }
            }}
          >
            <FaResearchgate className="w-6 h-6" />
          </motion.a>
          <motion.a
            href="https://github.com/OlumideAdewole"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:text-secondary/80"
            whileHover={{ 
              scale: 1.2,
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            <FaGithub className="w-6 h-6" />
          </motion.a>
        </motion.div>

        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 8px #64FFDA"
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 border border-secondary text-secondary px-6 py-3 rounded hover:bg-secondary/10 transition relative group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.6 }}
        >
          <span className="relative z-10">Check out my work</span>
          <motion.div
            className="absolute inset-0 bg-secondary/20 rounded"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>
    </section>
  );
}

export default Hero; 
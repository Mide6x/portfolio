import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaEnvelope,
  FaLinkedin,
  FaYoutube,
  FaGithub,
  FaResearchgate,
  FaFile,
} from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const contactInfo = [
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      text: "adewoleolumide05@gmail.com",
      link: "mailto:adewoleolumide05@gmail.com",
      category: "Direct Contact",
    },
    {
      icon: <FaFile className="w-6 h-6" />,
      text: "Curriculum Vitae",
      link: "/cv",
      category: "Professional",
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      text: "LinkedIn",
      link: "https://linkedin.com/in/olumideadewole",
      category: "Professional",
    },
    {
      icon: <FaGithub className="w-6 h-6" />,
      text: "GitHub",
      link: "https://github.com/OlumideAdewole",
      category: "Professional",
    },
    {
      icon: <SiGooglescholar className="w-6 h-6" />,
      text: "Google Scholar",
      link: "https://scholar.google.com/citations?user=o2yybuAAAAAJ&hl=en",
      category: "Academic",
    },
    {
      icon: <FaResearchgate className="w-6 h-6" />,
      text: "ResearchGate",
      link: "https://www.researchgate.net/profile/Olumide-Adewole-2",
      category: "Academic",
    },
    {
      icon: <FaYoutube className="w-6 h-6" />,
      text: "YouTube",
      link: "https://youtube.com/@heymide",
      category: "Social",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Faster animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }, // Smoother animation
  };

  const categories = ["Direct Contact", "Professional", "Academic", "Social"];

  return (
    <section id="contact" className="py-20 min-h-screen flex items-center">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full space-y-12"
      >
        <motion.div variants={itemVariants} className="flex items-center">
          <h2 className="text-3xl font-bold text-textPrimary">
            <span className="text-secondary font-mono text-xl">05.</span>{" "}
            Contact
          </h2>
          <div className="h-px bg-lightNavy flex-grow ml-4" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center space-y-6 max-w-2xl mx-auto"
        >
          <h3 className="text-4xl font-bold text-textPrimary">Get In Touch</h3>
          <p className="text-textSecondary">
            Whether you have a burning question or just want to drop a friendly
            hello, I&apos;m here and eager to chat. Let&apos;s make something
            amazing happen!
          </p>
        </motion.div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {categories.map((category) => (
            <motion.div
              key={category}
              variants={itemVariants}
              className="space-y-4"
            >
              <h4 className="text-secondary font-mono text-sm">{category}</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contactInfo
                  .filter((info) => info.category === category)
                  .map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(100, 255, 218, 0.1)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-4 bg-lightNavy p-4 rounded-lg transition-all duration-200 group" // Faster transition
                    >
                      <div className="text-secondary group-hover:text-secondary/80 transition-colors">
                        {info.icon}
                      </div>
                      <span className="text-textSecondary group-hover:text-secondary transition-colors">
                        {info.text}
                      </span>
                    </motion.a>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-center">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 8px #64FFDA",
            }}
            whileTap={{ scale: 0.95 }}
            className="border border-secondary text-secondary px-8 py-4 rounded hover:bg-secondary/10 transition relative group"
          >
            <span className="relative z-10">Ciao 👋</span>
            <motion.div
              className="absolute inset-0 bg-secondary/20 rounded"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2 }} // Faster transition
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;

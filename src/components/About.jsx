import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const researchInterests = [
    'AI in Education',
    'Ethical and Equitable Integration of AI Systems',
    'Pedagogical Innovations Using AI Tools',
    'Empirical and Theoretical Analysis of AI Impact',
  ];

  return (
    <section id="about" className="py-20 min-h-screen flex items-center">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-8"
      >
        <motion.div variants={itemVariants} className="flex items-center">
          <h2 className="text-3xl font-bold text-textPrimary">
            <span className="text-secondary font-mono text-xl">03.</span> About Me
          </h2>
          <div className="h-px bg-lightNavy flex-grow ml-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-textSecondary">
              I have a masters degree in Data Science from Pan-Atlantic University
              with a strong Distinction. My academic journey began at Ajayi Crowther
              University, where I earned my BSc. in Computer Science.
            </p>
            <p className="text-textSecondary">
              As an AI Engineer at Sabi AM, I focus on developing AI-powered solutions
              that make a real impact. My experience spans from teaching programming
              to developing innovative AI applications.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-xl font-bold text-textPrimary">Research Interests</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {researchInterests.map((interest, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start space-x-2"
                >
                  <span className="text-secondary mt-1">▹</span>
                  <span className="text-textSecondary">{interest}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-xl font-bold text-textPrimary">Education</h3>
          <div className="space-y-4">
            <div className="border border-lightNavy p-4 rounded-lg hover:bg-lightNavy/30 transition">
              <h4 className="text-secondary">Pan-Atlantic University</h4>
              <p className="text-textPrimary">MSc. Data Science</p>
              <p className="text-textSecondary">Sept 2023 – Oct 2024</p>
            </div>
            <div className="border border-lightNavy p-4 rounded-lg hover:bg-lightNavy/30 transition">
              <h4 className="text-secondary">Ajayi Crowther University</h4>
              <p className="text-textPrimary">BSc. Computer Science</p>
              <p className="text-textSecondary">Oct 2018 – Oct 2022</p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default About; 
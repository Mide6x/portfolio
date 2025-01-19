import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaPython, 
  FaJs, 
  FaReact, 
  FaGitAlt,
  FaPhp,
  FaDatabase,
  FaAws
} from 'react-icons/fa';
import { 
  SiTensorflow, 
  SiOpenai,
  SiMongodb,
  SiExpress,
  SiNodedotjs
} from 'react-icons/si';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', icon: <FaPython className="w-6 h-6" /> },
        { name: 'JavaScript', icon: <FaJs className="w-6 h-6" /> },
        { name: 'PHP', icon: <FaPhp className="w-6 h-6" /> }
      ]
    },
    {
      title: 'Web Development',
      skills: [
        { name: 'React', icon: <FaReact className="w-6 h-6" /> },
        { name: 'Node.js', icon: <SiNodedotjs className="w-6 h-6" /> },
        { name: 'Express', icon: <SiExpress className="w-6 h-6" /> },
        { name: 'MongoDB', icon: <SiMongodb className="w-6 h-6" /> }
      ]
    },
    {
      title: 'AI & Machine Learning',
      skills: [
        { name: 'TensorFlow', icon: <SiTensorflow className="w-6 h-6" /> },
        { name: 'OpenAI API', icon: <SiOpenai className="w-6 h-6" /> }
      ]
    },
    {
      title: 'Tools & Platforms',
      skills: [
        { name: 'Git', icon: <FaGitAlt className="w-6 h-6" /> },
        { name: 'AWS', icon: <FaAws className="w-6 h-6" /> },
        { name: 'SQL', icon: <FaDatabase className="w-6 h-6" /> }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section id="skills" className="py-20 min-h-screen">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-12"
      >
        <motion.div variants={itemVariants} className="flex items-center">
          <h2 className="text-3xl font-bold text-textPrimary">
            <span className="text-secondary font-mono text-xl">04.</span> Skills
          </h2>
          <div className="h-px bg-lightNavy flex-grow ml-4" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-lightNavy p-6 rounded-lg space-y-4"
            >
              <h3 className="text-xl font-bold text-textPrimary">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 text-textSecondary hover:text-secondary transition-colors"
                  >
                    <div className="text-secondary">
                      {skill.icon}
                    </div>
                    <span>{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-2xl font-bold text-textPrimary">Certifications</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-lightNavy p-6 rounded-lg hover:bg-lightestNavy transition-colors">
              <h4 className="text-secondary font-bold">British Airways Data Science Job Simulation</h4>
              <p className="text-textSecondary">Conducted customer review data analysis to build predictive models</p>
            </div>
            <div className="bg-lightNavy p-6 rounded-lg hover:bg-lightestNavy transition-colors">
              <h4 className="text-secondary font-bold">JPMorgan Chase & Co. Excel Skills</h4>
              <p className="text-textSecondary">Mastered Excel for data analysis, VBA automation, and visualization</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills; 
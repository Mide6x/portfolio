import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaExternalLinkAlt } from "react-icons/fa";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Projects = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/projects`);
        if (!response.ok) throw new Error('Failed');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.15,
        duration: reduceMotion ? 0 : 1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 1 } },
  };

  const shouldAnimate = reduceMotion || inView;

  return (
    <section id="projects" className="py-20 min-h-[80vh]">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial={reduceMotion ? "visible" : "hidden"}
        animate={shouldAnimate ? "visible" : "hidden"}
        className="space-y-12"
      >
        <motion.div variants={itemVariants} className="flex flex-col">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-wixText dark:text-wixWhite">
            Selected Projects
          </h2>
          <div className="w-16 h-1 bg-wixAccent mt-6" />
        </motion.div>

        {loading ? (
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-wixWhite dark:bg-wixDarkCard h-96 rounded-2xl border border-gray-100 dark:border-gray-800"></div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group flex flex-col justify-between bg-wixWhite dark:bg-wixDarkCard rounded-2xl p-8 shadow-soft dark:shadow-soft-dark transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-800"
                whileHover={reduceMotion ? undefined : {
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <div>
                  <div className="flex items-start justify-between mb-6">

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-wixTextSecondary hover:text-wixAccent dark:text-wixDarkTextSecondary dark:hover:text-wixWhite transition-colors p-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt size={18} />
                      </a>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-wixText dark:text-wixWhite mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-wixAccent mb-4">{project.period}</p>
                  <p className="text-wixTextSecondary dark:text-wixDarkTextSecondary text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {project.details && project.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-wixAccent mt-2 mr-3 flex-shrink-0" />
                        <span className="text-sm text-wixTextSecondary dark:text-wixDarkTextSecondary leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                  {project.tech && project.tech.map((techItem, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-3 py-1 bg-wixLight dark:bg-gray-800 text-wixText dark:text-wixDarkText rounded-full"
                    >
                      {techItem}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Projects;

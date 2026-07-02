import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaExternalLinkAlt, FaSync, FaChevronDown, FaChevronUp } from "react-icons/fa";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const getProjectIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes("veritas")) return "/veritasSocial.png";
  if (t.includes("openss")) return "/openss.svg";
  if (t.includes("landmark")) return "/landmark.jpeg";
  return null;
};

const Projects = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';

  const toggleExpand = (index) => {
    setExpanded(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/api/projects`);
      if (!response.ok) throw new Error('Failed to load projects');
      const data = await response.json();
      const filteredData = data.filter(p => !p.title.includes("Restaurants by unboxie"));
      setProjects(filteredData);
    } catch (err) {
      console.error(err);
      setError('Unable to load projects. The API server might be offline.');
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
    <section id="projects" className="pt-16 pb-6">
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
          <div className="max-w-5xl mx-auto space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-wixWhite dark:bg-wixDarkCard h-44 rounded-2xl border border-gray-100 dark:border-gray-800"></div>
            ))}
          </div>
        ) : error ? (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center p-12 text-center bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-3xl max-w-xl mx-auto shadow-sm"
          >
            <h3 className="text-xl font-bold text-wixText dark:text-wixWhite mb-2">Failed to Load Projects</h3>
            <p className="text-base text-wixTextSecondary dark:text-wixDarkTextSecondary mb-6 max-w-md">{error}</p>
            <button
              onClick={fetchProjects}
              className="flex items-center space-x-2 bg-wixAccent text-white px-6 py-3 rounded-full hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition font-bold text-sm shadow-md cursor-pointer"
            >
              <FaSync className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
          </motion.div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            {projects.map((project, index) => (
              <motion.div
                layout
                key={index}
                variants={itemVariants}
                className="bg-wixWhite dark:bg-wixDarkCard rounded-2xl p-6 md:p-8 shadow-soft dark:shadow-soft-dark border border-gray-100 dark:border-gray-800 transition-all duration-300"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      {getProjectIcon(project.title) && (
                        <img
                          src={getProjectIcon(project.title)}
                          alt={`${project.title} icon`}
                          className="w-12 h-12 object-cover rounded-md flex-shrink-0 border border-gray-100 dark:border-gray-800 shadow-sm"
                        />
                      )}
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-wixText dark:text-wixWhite leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-sm font-medium text-wixAccent mt-0.5">{project.period}</p>
                      </div>
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-wixTextSecondary hover:text-wixAccent dark:text-wixDarkTextSecondary dark:hover:text-wixWhite transition-colors p-2 flex-shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt size={18} />
                      </a>
                    )}
                  </div>

                  <p className="text-wixTextSecondary dark:text-wixDarkTextSecondary text-base leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      expanded[index]
                        ? { height: "auto", opacity: 1, marginTop: "16px" }
                        : { height: 0, opacity: 0, marginTop: "0px" }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-6 space-y-6">
                      {project.details && project.details.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-wixTextSecondary dark:text-wixDarkTextSecondary mb-3">Key Highlights</h4>
                          <ul className="space-y-3">
                            {project.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-wixAccent mt-2 mr-3 flex-shrink-0" />
                                <span className="text-sm text-wixTextSecondary dark:text-wixDarkTextSecondary leading-relaxed">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.tech && project.tech.length > 0 && (
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-wixTextSecondary dark:text-wixDarkTextSecondary mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((techItem, idx) => (
                              <span
                                key={idx}
                                className="text-xs font-semibold px-3 py-1 bg-wixLight dark:bg-gray-800 text-wixText dark:text-wixDarkText rounded-full"
                              >
                                {techItem}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 mt-4 flex items-center justify-between">
                  <button
                    onClick={() => toggleExpand(index)}
                    className="flex items-center space-x-1.5 text-sm font-semibold text-wixAccent hover:text-blue-700 dark:hover:text-wixWhite transition-colors cursor-pointer"
                  >
                    <span>{expanded[index] ? "Show less" : "Show details"}</span>
                    {expanded[index] ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                  </button>
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

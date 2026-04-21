import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBriefcase } from "react-icons/fa";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Experience = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -10% 0px",
  });

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/experience`);
        if (!response.ok) throw new Error('Failed');
        const data = await response.json();
        setExperiences(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExp();
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : 1 } },
  };

  const shouldAnimate = reduceMotion || inView;

  return (
    <section id="experience" className="py-20 min-h-[80vh]">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial={reduceMotion ? "visible" : "hidden"}
        animate={shouldAnimate ? "visible" : "hidden"}
        className="space-y-16"
      >
        <motion.div variants={itemVariants} className="flex flex-col">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-wixText dark:text-wixWhite">
            Work Experience
          </h2>
          <div className="w-16 h-1 bg-wixAccent mt-6" />
        </motion.div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse bg-wixWhite dark:bg-wixDarkCard h-32 rounded-2xl shadow-soft dark:shadow-soft-dark border border-gray-100 dark:border-gray-800"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-8 md:pl-0"
              >
                <div className="md:grid md:grid-cols-[250px_1fr] md:gap-8 lg:gap-12">
                  {/* Timeline line */}
                  <div className="hidden md:block absolute left-[250px] top-0 bottom-[-48px] w-px bg-gray-200 dark:bg-gray-800" />

                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-[246px] top-2 w-2.5 h-2.5 rounded-full bg-wixAccent dark:bg-wixWhite shadow-sm" />

                  {/* Mobile timeline line */}
                  <div className="md:hidden absolute left-0 top-0 bottom-[-48px] w-px bg-gray-200 dark:bg-gray-800" />

                  {/* Mobile timeline dot */}
                  <div className="md:hidden absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-wixAccent dark:bg-wixWhite" />

                  <div className="text-wixTextSecondary dark:text-wixDarkTextSecondary font-medium text-sm md:text-base mb-4 md:mb-0 md:text-right pr-6 md:pr-12 pt-1">
                    {exp.period}
                  </div>

                  <div className="space-y-4 bg-wixWhite dark:bg-wixDarkCard p-6 rounded-2xl shadow-soft dark:shadow-soft-dark border border-gray-50 dark:border-gray-800 md:ml-4">
                    <div>
                      <h3 className="text-xl md:text-2xl text-wixText dark:text-wixWhite font-bold mb-1">
                        {exp.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-wixAccent font-medium text-sm md:text-base">
                        <FaBriefcase className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                      <p className="text-wixTextSecondary dark:text-wixDarkTextSecondary text-sm mt-1">{exp.location}</p>
                    </div>

                    <ul className="space-y-3 pt-2">
                      {exp.responsibilities && exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-2 mr-3 flex-shrink-0" />
                          <span className="text-wixTextSecondary dark:text-wixDarkTextSecondary leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Experience;

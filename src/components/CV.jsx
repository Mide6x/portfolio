import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPrint, FaLinkedin, FaGithub, FaGlobe, FaGraduationCap, FaBriefcase, FaBook, FaExternalLinkAlt } from "react-icons/fa";

const CV = () => {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [projRes, expRes, paperRes] = await Promise.all([
          fetch(`${apiBaseUrl}/api/projects`),
          fetch(`${apiBaseUrl}/api/experience`),
          fetch(`${apiBaseUrl}/api/papers`)
        ]);
        
        if (projRes.ok) setProjects(await projRes.json());
        if (expRes.ok) setExperiences(await expRes.json());
        if (paperRes.ok) setPapers(await paperRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="min-h-screen py-24 bg-wixLight dark:bg-wixDark text-wixText dark:text-wixDark">
      <Helmet>
        <title>Curriculum Vitae | Olumide Adewole</title>
        <meta name="description" content="View the professional experience, projects, and education of Olumide Adewole, an AI Engineer and Full-Stack Developer." />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
      >
        {/* Navigation & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 space-y-4 sm:space-y-0 print:hidden">
          <Link
            to="/"
            className="flex items-center space-x-2 text-wixTextSecondary dark:text-wixDarkTextSecondary hover:text-wixAccent dark:hover:text-wixWhite transition-colors font-semibold"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">Back to Home</span>
          </Link>

          <motion.button
            onClick={handlePrint}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-wixAccent text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition font-semibold text-sm tracking-wide shadow-sm"
          >
            <FaPrint className="w-4 h-4" />
            <span>Print CV</span>
          </motion.button>
        </div>

        {/* Header / Bio */}
        <header className="mb-16 border-b border-gray-200 dark:border-gray-800 pb-12">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-wixText dark:text-wixWhite mb-4 tracking-tight"
          >
            Olumide Adewole
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-wixAccent font-semibold mb-6"
          >
            Full-Stack Developer & AI Engineer
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-6 mb-8 text-wixTextSecondary dark:text-wixDarkTextSecondary text-sm font-medium"
          >
            <a href="https://omide.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-wixAccent transition-colors bg-wixLight dark:bg-gray-800 px-3 py-1.5 rounded-full">
              <FaGlobe /> <span>Portfolio</span>
            </a>
            <a href="https://github.com/Mide6x" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-wixAccent transition-colors bg-wixLight dark:bg-gray-800 px-3 py-1.5 rounded-full">
              <FaGithub /> <span>Github</span>
            </a>
            <a href="https://www.linkedin.com/in/olumideadewole/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-wixAccent transition-colors bg-wixLight dark:bg-gray-800 px-3 py-1.5 rounded-full">
              <FaLinkedin /> <span>LinkedIn</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-wixTextSecondary dark:text-wixDarkTextSecondary leading-relaxed max-w-3xl text-lg"
          >
            Full-Stack Developer & AI Engineer with 5+ experience delivering scalable, AI-powered platforms using ML models, GPT APIs, and cloud-native stacks. Currently pursuing an MBA in the UK to align deep technical skills with strategic business insight. Seeking roles where I can lead impactful, intelligent product delivery.
          </motion.p>
        </header>

        {loading ? (
          <div className="flex flex-col space-y-12 animate-pulse">
            <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-2xl w-full"></div>
            <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-2xl w-full"></div>
            <div className="h-40 bg-gray-100 dark:bg-gray-800 rounded-2xl w-full"></div>
          </div>
        ) : (
          <main className="space-y-16">
            {/* Project Experience */}
            {projects.length > 0 && (
              <motion.section variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
                <div className="flex items-center mb-8">
                  <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite whitespace-nowrap tracking-tight">Project Experience</h2>
                  <div className="h-px bg-gray-200 dark:bg-gray-800 flex-grow ml-6" />
                </div>

                <div className="space-y-10">
                  {projects.map((project, i) => (
                    <div className="group" key={i}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-wixText dark:text-wixWhite group-hover:text-wixAccent transition-colors">
                          {project.link ? (
                            <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
                          ) : (
                            project.title
                          )}
                        </h3>
                        <span className="text-wixAccent font-semibold text-sm">{project.period}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tech && project.tech.map(t => (
                          <span key={t} className="text-xs font-semibold px-2.5 py-1 bg-wixLight dark:bg-gray-800 text-wixTextSecondary dark:text-wixWhite rounded-md">{t}</span>
                        ))}
                      </div>
                      <p className="text-wixText dark:text-wixDarkText font-medium mb-3">{project.description}</p>
                      <ul className="space-y-2 text-wixTextSecondary dark:text-wixDarkTextSecondary text-sm sm:text-base">
                        {project.details && project.details.map((detail, idx) => (
                          <li className="flex gap-3 items-start" key={idx}>
                            <span className="w-1.5 h-1.5 rounded-full bg-wixAccent mt-2 flex-shrink-0"></span> {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Work Experience */}
            {experiences.length > 0 && (
              <motion.section variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
                <div className="flex items-center mb-8">
                  <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite whitespace-nowrap tracking-tight">Professional Experience</h2>
                  <div className="h-px bg-gray-200 dark:bg-gray-800 flex-grow ml-6" />
                </div>

                <div className="space-y-12">
                  {experiences.map((exp, i) => (
                    <div className="relative pl-8" key={i}>
                      <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-wixAccent shadow-sm" />
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-xl font-bold text-wixText dark:text-wixWhite">{exp.title}</h3>
                        <span className="text-wixAccent font-semibold text-sm">{exp.period}</span>
                      </div>
                      <div className="text-wixTextSecondary dark:text-wixDarkTextSecondary font-medium mb-4 flex items-center gap-2">
                        <FaBriefcase className="text-sm" /> {exp.company} {exp.location && `· ${exp.location}`}
                      </div>
                      <ul className="space-y-2 text-wixTextSecondary dark:text-wixDarkTextSecondary">
                        {exp.responsibilities && exp.responsibilities.map((resp, idx) => (
                          <li className="flex gap-3 items-start" key={idx}>
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mt-2 flex-shrink-0"></span> {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Publication (Papers) */}
            {papers.length > 0 && (
              <motion.section variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
                <div className="flex items-center mb-8">
                  <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite whitespace-nowrap tracking-tight">Publication</h2>
                  <div className="h-px bg-gray-200 dark:bg-gray-800 flex-grow ml-6" />
                </div>

                <div className="space-y-8">
                  {papers.map((paper, i) => (
                    <div key={i} className="bg-wixLight dark:bg-gray-800 p-8 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <div className="w-12 h-12 bg-wixWhite dark:bg-wixDarkCard rounded-full flex items-center justify-center mb-4">
                              <FaBook className="text-wixAccent text-xl" />
                          </div>
                          <h3 className="text-xl font-bold text-wixText dark:text-wixWhite leading-tight">
                            {paper.title}
                          </h3>
                          <p className="text-wixAccent font-bold text-xs uppercase tracking-wider">{paper.publisher} · {paper.published_date}</p>
                          <p className="text-wixTextSecondary dark:text-wixDarkTextSecondary italic text-sm font-medium">{paper.authors}</p>
                          <p className="text-wixTextSecondary dark:text-wixDarkTextSecondary mt-4 text-sm sm:text-base leading-relaxed">
                            {paper.abstract}
                          </p>
                          {paper.link && (
                            <div className="pt-6">
                              <a
                                href={paper.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-wixWhite bg-wixText dark:bg-wixAccent px-4 py-2 rounded-full hover:opacity-90 font-medium text-sm transition-opacity"
                              >
                                <span>Read Publication</span>
                                <FaExternalLinkAlt className="text-xs" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Education (Static) */}
            <motion.section variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.7 }}>
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite whitespace-nowrap tracking-tight">Education</h2>
                <div className="h-px bg-gray-200 dark:bg-gray-800 flex-grow ml-6" />
              </div>

              <div className="grid gap-8">
                {[
                  {
                    school: "York St. John University, York",
                    degree: "Master of Business Administration (MBA)",
                    period: "Sep 2025 – 2026",
                  },
                  {
                    school: "Pan-Atlantic University, Lagos",
                    degree: "MSc. Data Science, Artificial Intelligence Focus",
                    period: "Sep 2023 – Dec 2024",
                    impact: "4.0 CGPA"
                  },
                  {
                    school: "Ajayi Crowther University, Oyo",
                    degree: "BSc. Computer Science",
                    period: "2018 – 2022",
                  }
                ].map((edu, i) => (
                  <div key={i} className="flex gap-5 bg-wixLight dark:bg-gray-800 p-6 rounded-xl items-center">
                    <div className="w-12 h-12 bg-wixWhite dark:bg-wixDarkCard rounded-full flex items-center justify-center flex-shrink-0">
                      <FaGraduationCap className="text-wixAccent text-xl" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-wixText dark:text-wixWhite">{edu.school}</h3>
                      <p className="text-wixTextSecondary dark:text-wixDarkTextSecondary font-medium">{edu.degree}</p>
                      <p className="text-wixAccent font-semibold text-sm">{edu.period} {edu.impact && <span className="text-wixTextSecondary dark:text-wixDarkTextSecondary font-normal">| {edu.impact}</span>}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

          </main>
        )}
      </motion.div>
    </section>
  );
};

export default CV;

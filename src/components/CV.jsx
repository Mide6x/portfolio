import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaPrint, FaLinkedin, FaGithub, FaGlobe, FaGraduationCap, FaBriefcase, FaBook, FaExternalLinkAlt } from "react-icons/fa";

const CV = () => {
  const handlePrint = () => {
    window.print();
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="min-h-screen py-20 bg-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Navigation & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 space-y-4 sm:space-y-0 print:hidden">
          <Link
            to="/"
            className="flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm tracking-widest uppercase">Back to Home</span>
          </Link>

          <motion.button
            onClick={handlePrint}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 border border-secondary text-secondary px-4 py-2 rounded hover:bg-secondary/10 transition font-mono text-sm uppercase tracking-widest"
          >
            <FaPrint className="w-4 h-4" />
            <span>Print CV</span>
          </motion.button>
        </div>

        {/* Header / Bio */}
        <header className="mb-16">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-textPrimary mb-4"
          >
            Olumide Adewole
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary font-mono mb-6"
          >
            Full-Stack Developer & AI Engineer
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-6 mb-8 text-textSecondary text-sm font-mono"
          >
            <a href="https://omide.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-secondary transition-colors">
              <FaGlobe /> <span>Portfolio</span>
            </a>
            <a href="https://github.com/Mide6x" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-secondary transition-colors">
              <FaGithub /> <span>Github</span>
            </a>
            <a href="https://www.linkedin.com/in/olumideadewole/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-secondary transition-colors">
              <FaLinkedin /> <span>LinkedIn</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-textSecondary leading-relaxed max-w-2xl text-lg"
          >
            Full-Stack Developer & AI Engineer with 5+ years of experience delivering scalable, AI-powered platforms using ML models, GPT APIs, and cloud-native stacks. Currently pursuing an MBA in the UK to align deep technical skills with strategic business insight. Seeking roles where I can lead impactful, intelligent product delivery.
          </motion.p>
        </header>

        <main className="space-y-16">
          {/* Project Experience */}
          <motion.section variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold text-textPrimary whitespace-nowrap">Project Experience</h2>
              <div className="h-px bg-lightNavy flex-grow ml-4" />
            </div>

            <div className="space-y-10">
              {/* Landmark AI */}
              <div className="group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-secondary group-hover:underline underline-offset-4"><a href="https://ai.landmarkafrica.com/" target="_blank" rel="noopener noreferrer">Landmark AI Agent</a></h3>
                  <span className="text-textSecondary font-mono text-sm">2024 – Present</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["GPT-4", "FastAPI", "RAG", "Supabase Vector", "WhatsApp API"].map(t => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-secondary/10 text-secondary rounded uppercase tracking-wider">{t}</span>
                  ))}
                </div>
                <p className="text-textPrimary font-medium mb-3">Software Engineer (AI Systems & Full-Stack)</p>
                <ul className="space-y-2 text-textSecondary text-sm sm:text-base">
                  <li className="flex gap-2"><span>▹</span> Architected a specialized agentic system using GPT-4 to dynamically route user intents, reducing latency by 35% and improving accuracy.</li>
                  <li className="flex gap-2"><span>▹</span> Engineered a RAG system utilizing vector similarity search (Cosine Similarity) with Supabase (PostgreSQL) and local SQLite fallbacks.</li>
                  <li className="flex gap-2"><span>▹</span> Developed a high-availability integration with the WhatsApp Business API featuring session-persistent state management across 10,000+ daily interactions.</li>
                </ul>
              </div>

              {/* Veritas AI */}
              <div className="group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-secondary group-hover:underline underline-offset-4"><a href="https://tryveritas.dev/" target="_blank" rel="noopener noreferrer">Veritas AI</a></h3>
                  <span className="text-textSecondary font-mono text-sm">2024 – 2025</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["Next.js 15", "MongoDB Vector", "Stripe", "Firebase", "GCS"].map(t => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-secondary/10 text-secondary rounded uppercase tracking-wider">{t}</span>
                  ))}
                </div>
                <p className="text-textPrimary font-medium mb-3">Full-stack & AI Developer</p>
                <ul className="space-y-2 text-textSecondary text-sm sm:text-base">
                  <li className="flex gap-2"><span>▹</span> Architected a RAG system using FastAPI and MongoDB Atlas Vector Search, achieving an 83% reduction in query latency (1.2s to 200ms).</li>
                  <li className="flex gap-2"><span>▹</span> Engineered a document processing pipeline (PDF/DOCX) using Python and GCS, cutting infrastructure costs by 75% via Archive tiering.</li>
                  <li className="flex gap-2"><span>▹</span> Designed a multi-tenant SaaS architecture supporting organization-scoped RBAC and secure identity management via Firebase.</li>
                </ul>
              </div>

              {/* TaniQR */}
              <div className="group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-secondary group-hover:underline underline-offset-4"><a href="https://taniqr.com/" target="_blank" rel="noopener noreferrer">TaniQR SaaS</a></h3>
                  <span className="text-textSecondary font-mono text-sm">2023 – 2024</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["Java", "Spring Boot", "GPT-4o", "Redis", "Next.js"].map(t => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 bg-secondary/10 text-secondary rounded uppercase tracking-wider">{t}</span>
                  ))}
                </div>
                <p className="text-textPrimary font-medium mb-3">Lead Fullstack & AI Developer</p>
                <ul className="space-y-2 text-textSecondary text-sm sm:text-base">
                  <li className="flex gap-2"><span>▹</span> Integrated GPT-4o for natural language QR design configurations, reducing design time by 70%.</li>
                  <li className="flex gap-2"><span>▹</span> Implemented GPT-4 Vision for menu digitization with 95%+ accuracy in extracting categories and pricing.</li>
                  <li className="flex gap-2"><span>▹</span> Developed a scalable microservice architecture in Java handling redirects with <span className="text-secondary font-mono">{"<"}50ms</span> latency using Redis.</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Work Experience */}
          <motion.section variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold text-textPrimary whitespace-nowrap">Professional Experience</h2>
              <div className="h-px bg-lightNavy flex-grow ml-4" />
            </div>

            <div className="space-y-12">
              {/* Tegence AI */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-secondary" />
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-textPrimary">Artificial Intelligence & ML Engineer</h3>
                  <span className="text-textSecondary font-mono text-sm">Jan 2025 – Present</span>
                </div>
                <div className="text-secondary font-medium mb-4 flex items-center gap-2">
                  <FaBriefcase className="text-sm" /> Tegence AI · Abuja, Nigeria
                </div>
                <ul className="space-y-2 text-textSecondary">
                  <li className="flex gap-2"><span>▹</span> Lead the AI team of 3 engineers, spearheading multiple core AI initiatives.</li>
                  <li className="flex gap-2"><span>▹</span> Developed recommendation systems and neural translation machines for underrepresented Nigerian languages.</li>
                  <li className="flex gap-2"><span>▹</span> Built AI-powered chatbot systems with advanced contextual understanding of user enquiries.</li>
                </ul>
              </div>

              {/* Sabi AM */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-secondary" />
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-textPrimary">Artificial Intelligence Engineer</h3>
                  <span className="text-textSecondary font-mono text-sm">Apr 2024 – Aug 2025</span>
                </div>
                <div className="text-secondary font-medium mb-4 flex items-center gap-2">
                  <FaBriefcase className="text-sm" /> Sabi AM · Lagos, Nigeria
                </div>
                <ul className="space-y-2 text-textSecondary">
                  <li className="flex gap-2"><span>▹</span> Reduced manual HR workload by 50% through an automated AI-powered onboarding/offboarding system.</li>
                  <li className="flex gap-2"><span>▹</span> Fine-tuned and integrated custom AI models to enable personalized recommendations and smarter interactions.</li>
                  <li className="flex gap-2"><span>▹</span> Optimized model performance and deployment speed by implementing efficient training pipelines and production-ready APIs.</li>
                </ul>
              </div>

              {/* MGIC */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-3 h-3 border border-secondary rounded-full" />
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-textPrimary">IT Support Staff</h3>
                  <span className="text-textSecondary font-mono text-sm">Dec 2022 – Oct 2023</span>
                </div>
                <div className="text-textSecondary font-medium mb-4 flex items-center gap-2 text-sm italic">
                  Maryland Global Initiatives Corporation · Abuja
                </div>
                <ul className="space-y-2 text-textSecondary text-sm">
                  <li className="flex gap-2"><span>▹</span> Improved operational efficiency by managing IT assets and providing technical support across departments.</li>
                  <li className="flex gap-2"><span>▹</span> Reduced hardware replacement costs by diagnosing and repairing equipment, increasing device lifecycle.</li>
                </ul>
              </div>

              {/* Sterling Bank */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-3 h-3 border border-secondary rounded-full" />
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-textPrimary">Software Engineering Intern</h3>
                  <span className="text-textSecondary font-mono text-sm">Jul 2022 – Oct 2022</span>
                </div>
                <div className="text-textSecondary font-medium mb-4 flex items-center gap-2 text-sm italic">
                  Sterling Bank · Lagos
                </div>
                <ul className="space-y-2 text-textSecondary text-sm">
                  <li className="flex gap-2"><span>▹</span> Increased data processing efficiency by 20% through Python automation and Excel macros.</li>
                  <li className="flex gap-2"><span>▹</span> Built visual dashboards in Power BI to enable clearer decision-making for asset tracking.</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Publication */}
          <motion.section variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold text-textPrimary whitespace-nowrap">Publication</h2>
              <div className="h-px bg-lightNavy flex-grow ml-4" />
            </div>

            <div className="bg-lightNavy p-6 rounded-lg border border-secondary/20 group hover:border-secondary/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <FaBook className="text-secondary text-2xl mb-2" />
                  <h3 className="text-xl font-bold text-textPrimary leading-tight">
                    Benchmarking Machine Learning Techniques for Phishing Detection and Secure URL Classification
                  </h3>
                  <p className="text-secondary font-mono text-xs">International Journal of Computer Science and Mobile Computing · Jan 2025</p>
                  <p className="text-textSecondary italic text-sm">Owa, K. & Adewole, O. (2025)</p>
                  <p className="text-textSecondary mt-4 text-sm sm:text-base">
                    Conducted a comparative analysis of Random Forest, SVM, and Decision Tree classifiers on 640,000+ phishing and benign URLs, with Random Forest achieving top accuracy (87.85% on Aalto, 86.86% on Kaggle).
                  </p>
                  <div className="pt-4">
                    <a
                      href="https://irep.ntu.ac.uk/id/eprint/52910/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 text-secondary hover:underline font-mono text-sm"
                    >
                      <span>Read Publication</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Education */}
          <motion.section variants={sectionVariants} initial="hidden" animate="visible" transition={{ delay: 0.7 }}>
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold text-textPrimary whitespace-nowrap">Education</h2>
              <div className="h-px bg-lightNavy flex-grow ml-4" />
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
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <FaGraduationCap className="text-secondary text-xl" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-textPrimary">{edu.school}</h3>
                    <p className="text-textSecondary">{edu.degree}</p>
                    <p className="text-secondary font-mono text-sm">{edu.period} {edu.impact && `· ${edu.impact}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

        </main>
      </motion.div>
    </section>
  );
};

export default CV;


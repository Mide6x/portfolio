import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const projects = [
    {
      title: "Landmark AI Agent",
      description: "A specialized multi-agent orchestrator for hospitality and enterprise automation.",
      details: [
        "Architected a specialized agentic system using GPT-4 to dynamically route user intents (Bookings, Complaints, Refunds, Enquiries) to dedicated sub-agents, reducing latency by 35%.",
        "Engineered a Retrieval-Augmented Generation (RAG) system utilizing vector similarity search (Cosine Similarity) with Supabase (PostgreSQL) and local SQLite fallbacks.",
        "Developed a high-availability integration with the WhatsApp Business API featuring automated webhook verification and session-persistent state management.",
        "Implemented a secure transactional reliability flow with third-party gateways for zero-loss booking finalization.",
      ],
      tech: ["Python", "FastAPI", "GPT-4", "Supabase", "WhatsApp API", "Next.js"],
      link: "https://ai.landmarkafrica.com/",
      period: "2024 – Present",
    },
    {
      title: "Veritas AI",
      description: "Enterprise RAG platform with multi-tenant SaaS architecture.",
      details: [
        "Architected a RAG system using FastAPI and MongoDB Atlas Vector Search, achieving an 83% reduction in query latency through vector index optimization.",
        "Engineered a high-throughput document processing pipeline using Python and GCS, cutting infrastructure costs by 75%.",
        "Developed a multi-tenant SaaS architecture supporting organization-scoped RBAC and secure identity management via Firebase.",
        "Integrated Stripe Billing & Webhook engine, automating the full subscription lifecycle and maintaining real-time resource limits.",
      ],
      tech: ["Next.js 15", "FastAPI", "MongoDB Vector Search", "Firebase", "Stripe", "GCS"],
      link: "https://tryveritas.dev/",
      period: "2024 – 2025",
    },
    {
      title: "TaniQR SaaS",
      description: "AI-Powered identity and smart QR platform for restaurants.",
      details: [
        "Integrated GPT-4o to transform natural language prompts into complex QR design configurations, reducing design time by 70%.",
        "Implemented GPT-4 Vision for automated menu digitization, achieving 95%+ accuracy in extracting categories and pricing from photos.",
        "Developed a scalable microservice architecture in Java/Spring Boot handling redirects with <50ms latency using Redis.",
        "Architected a responsive Next.js dashboard supporting real-time scan analytics and batch QR generation (1000+ codes/min).",
      ],
      tech: ["Java", "Spring Boot", "Next.js", "GPT-4o", "Redis", "MongoDB"],
      link: "https://taniqr.com/",
      period: "2023 – 2024",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 1, // Added duration
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } }, // Added duration
  };

  return (
    <section id="projects" className="py-20 min-h-screen">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-12"
      >
        <motion.div variants={itemVariants} className="flex items-center">
          <h2 className="text-3xl font-bold text-textPrimary">
            <span className="text-secondary font-mono text-xl">03.</span>{" "}
            Projects
          </h2>
          <div className="h-px bg-lightNavy flex-grow ml-4" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-lightNavy rounded-lg overflow-hidden"
              whileHover={{
                scale: 1.05,
                transition: { duration: 1 }, // Added duration
              }}
            >
              <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-textPrimary group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex space-x-4 relative z-10">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-textSecondary hover:text-secondary transition-colors p-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt className="w-5 h-5" />
                      </a>
                    )}
                    <div className="p-2">
                      <SiOpenai className="w-5 h-5 text-textSecondary" />
                    </div>
                  </div>
                </div>

                <p className="text-textSecondary">{project.description}</p>

                <ul className="space-y-2">
                  {project.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-secondary mt-1">▹</span>
                      <span className="text-textSecondary">{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-secondary text-sm font-mono px-2 py-1 bg-secondary/10 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;

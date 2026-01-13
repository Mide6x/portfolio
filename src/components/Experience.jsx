import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaBriefcase } from "react-icons/fa";
import GitHubStats from "./GitHubStats";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const experiences = [
    {
      title: "Artificial Intelligence and Machine Learning Engineer",
      company: "Tegence AI",
      location: "Abuja, Nigeria",
      period: "January 2025 – Present",
      responsibilities: [
        "Lead the AI team, overseeing multiple engineers in the delivery of core AI initiatives",
        "Spearheading AI projects including recommendation systems and neural translation machines for underrepresented languages",
        "Developing AI powered chatbot systems with contextual understanding of user enquiries",
      ],
    },
    {
      title: "Artificial Intelligence Engineer",
      company: "Sabi AM",
      location: "Victoria Island, Lagos",
      period: "April 2024 – August 2025",
      responsibilities: [
        "Reduced manual HR workload by 50% by designing and deploying an automated AI-powered HR system",
        "Improved product adoption by fine-tuning and integrating custom AI models for smarter user interactions",
        "Optimized model performance and deployment speed by implementing efficient training pipelines and production-ready APIs",
      ],
    },
    {
      title: "IT Support Staff",
      company: "Maryland Global Initiatives Corporation",
      location: "Asokoro, Abuja",
      period: "December 2022 – October 2023",
      responsibilities: [
        "Improved operational efficiency by providing timely technical support and managing IT assets",
        "Reduced hardware replacement costs by diagnosing and repairing IT equipment, increasing lifecycle",
      ],
    },
    {
      title: "Software Engineering Intern",
      company: "Sterling Bank",
      location: "Marina, Lagos",
      period: "July 2022 – October 2022",
      responsibilities: [
        "Increased data processing efficiency by 20% by automating data cleaning workflows using Python",
        "Enabled clearer decision-making by analyzing asset datasets and building visualizations in Power BI",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  return (
    <section id="experience" className="py-20 min-h-screen">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-12"
      >
        <motion.div variants={itemVariants} className="flex items-center">
          <h2 className="text-3xl font-bold text-textPrimary">
            <span className="text-secondary font-mono text-xl">01.</span>{" "}
            Experience
          </h2>
          <div className="h-px bg-lightNavy flex-grow ml-4" />
        </motion.div>

        {/* GitHub Stats */}
        {/* <motion.div variants={itemVariants} className="space-y-4">
          <GitHubStats />
        </motion.div> */}

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:grid md:grid-cols-[200px_1fr] md:gap-6">
                {/* Timeline line */}
                <div className="hidden md:block absolute left-[200px] top-0 bottom-0 w-px bg-lightNavy" />

                {/* Timeline dot */}
                <div className="hidden md:block absolute left-[196px] top-2 w-[10px] h-[10px] rounded-full bg-secondary" />

                {/* Mobile timeline line */}
                <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-lightNavy" />

                {/* Mobile timeline dot */}
                <div className="md:hidden absolute left-[-4px] top-2 w-[8px] h-[8px] rounded-full bg-secondary" />

                <div className="text-textSecondary font-mono text-sm">
                  {exp.period}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl text-textPrimary font-semibold">
                      {exp.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-secondary">
                      <FaBriefcase className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                    <p className="text-textSecondary text-sm">{exp.location}</p>
                  </div>

                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-secondary mt-1">▹</span>
                        <span className="text-textSecondary">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;

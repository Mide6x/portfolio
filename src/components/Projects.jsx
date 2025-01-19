import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { SiOpenai } from 'react-icons/si';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const projects = [
    {
      title: 'NoTypeAI',
      description: 'An Artificial Intelligence Powered Extension That Converts Speech to Text',
      details: [
        'Built an extension that allows users to speak in input sections of their browser',
        'Makes form filling on browser up to 70% faster',
        'Added AI grammar correction ability using GPT-4',
      ],
      tech: ['Browser Extension', 'OpenAI API', 'Speech Recognition', 'GPT-4'],
      link: 'https://notypeai.com/',
      period: 'Nov 2024 – Present',
      image: '/notypeai-preview.png' // Commented out for now
    },
    {
      title: 'Oúnje x dein',
      description: 'An Artificial Intelligence Powered Recipe Sharing Platform',
      details: [
        'Built a recipe-sharing platform with voice search capabilities',
        'Developed using the MERN Stack and integrated OpenAI GPT API',
        'Deployed the backend on Render and frontend on Netlify'
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'OpenAI API', 'Voice Search'],
      link: 'https://ounje-staging.netlify.app/',
      period: 'Sep 2024 – Oct 2024',
      image: '/ounje-preview.png' // Commented out for now
    },
    {
      title: 'Product Management System',
      description: 'AI-Powered Product Classification System',
      details: [
        'Designed a system to list products in a database',
        'Integrated AI for cleaning data and accurate classification',
        'Used MERN Stack, OpenAI API, and Cloudinary API'
      ],
      tech: ['MERN Stack', 'OpenAI API', 'Cloudinary API', 'AI Classification'],
      period: 'Jul 2024',
      image: '/pms-preview.png' // Commented out for now
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
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
            <span className="text-secondary font-mono text-xl">03.</span> Projects
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
                transition: { duration: 0.2 }
              }}
            >
              <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                {<img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                />}
                <div className="absolute inset-0 bg-primary/50" />
              </div>

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
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaDownload } from "react-icons/fa";

const CV = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Olumide_Adewole_web_CV.pdf";
    link.download = "Olumide_Adewole_CV.pdf";
    link.click();
  };

  return (
    <section className="min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <Link
            to="/"
            className="flex items-center space-x-2 text-secondary hover:text-secondary/80 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>

          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 border border-secondary text-secondary px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-secondary/10 transition text-sm sm:text-base"
          >
            <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Download CV</span>
          </motion.button>
        </div>

        {/* CV Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-textPrimary mb-2">
            Curriculum Vitae
          </h1>
          <p className="text-textSecondary text-sm sm:text-base">
            Olumide Adewole - AI Engineer & Researcher
          </p>
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-lg shadow-2xl overflow-hidden"
        >
          <iframe
            src="/Olumide_Adewole_web_CV.pdf"
            width="100%"
            height="600px"
            className="border-0 h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px]"
            title="Olumide Adewole CV"
          >
            <p className="text-center text-textSecondary p-8">
              Your browser does not support PDFs.
              <button
                onClick={handleDownload}
                className="text-secondary hover:underline ml-1"
              >
                Download the PDF
              </button>
              to view it.
            </p>
          </iframe>
        </motion.div>

        {/* Alternative download link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-textSecondary text-sm">
            Having trouble viewing the PDF?
            <button
              onClick={handleDownload}
              className="text-secondary hover:underline ml-1"
            >
              Click here to download
            </button>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CV;

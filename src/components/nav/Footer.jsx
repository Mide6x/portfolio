import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Footer = ({ variants }) => {
  return (
    <motion.div
      variants={variants}
      className="mx-auto max-w-4xl w-full px-4 sm:px-6 lg:px-8 mb-8 mt-16 space-y-8"
    >
      <div className="border-t max-w-6xl border-textSecondary pt-0.5"></div>
      <motion.footer
        variants={variants}
        className="text-center text-textSecondary text-sm mt-20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <p className="md:mr-auto">© Olumide Adewole 2024</p>
          <p className="md:ml-auto">
            Designed & Built with{" "}
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.5, // Faster animation
                repeatType: "reverse",
              }}
              className="inline-block text-red-500"
            >
              ❤️
            </motion.span>{" "}
            by Olumide Adewole
          </p>
        </div>
      </motion.footer>
    </motion.div>
  );
};

Footer.propTypes = {
  variants: PropTypes.object,
};

export default Footer;

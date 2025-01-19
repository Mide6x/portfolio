import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <h1 className="text-9xl font-bold text-secondary">404</h1>
        <h2 className="text-4xl font-bold text-textPrimary">Page Not Found</h2>
        <p className="text-textSecondary max-w-md">
          Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
        </p>
        <Link
          to="/"
          className="inline-block border border-secondary text-secondary px-6 py-3 rounded hover:bg-secondary/10 transition"
        >
          Go Home
        </Link>
      </motion.div>
    </section>
  );
};

export default NotFound; 
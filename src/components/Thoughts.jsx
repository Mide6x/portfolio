import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Thoughts = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/thoughts`);
        if (!response.ok) throw new Error('Failed to fetch thoughts');
        const data = await response.json();
        setThoughts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();
  }, []);

  return (
    <section className="py-20 min-h-screen bg-wixLight dark:bg-wixDark transition-colors">
      <Helmet>
        <title>Technical Thoughts | Olumide Adewole</title>
        <meta name="description" content="Technical insights, tutorials, and reflections on AI engineering, LLMs, and modern software development." />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-serif">
        <h1 className="text-4xl font-bold text-wixText dark:text-wixWhite mb-12 tracking-tight">Thoughts</h1>
        
        {loading && (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-white dark:bg-wixDarkCard h-40 rounded-2xl shadow-soft dark:shadow-soft-dark border border-gray-100 dark:border-gray-800"></div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-wixAccent bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
            {error}. Make sure the backend server and Supabase are running.
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-8">
            {thoughts.length === 0 ? (
              <p className="text-wixTextSecondary dark:text-wixDarkTextSecondary">No thoughts published yet.</p>
            ) : (
              thoughts.map((thought) => {
                const slug = thought.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');
                const postUrl = `/thoughts/${thought.id}-${slug}`;

                return (
                  <motion.article
                    key={thought.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.5 }}
                    className="bg-wixWhite dark:bg-wixDarkCard p-8 rounded-3xl shadow-soft dark:shadow-soft-dark border border-gray-100 dark:border-gray-800 group hover:border-wixAccent dark:hover:border-wixAccent transition-all"
                  >
                    <Link to={postUrl} className="block space-y-3">
                      <time className="text-wixTextSecondary dark:text-wixDarkTextSecondary font-bold text-sm tracking-wide bg-wixLight dark:bg-gray-800 px-3 py-1 rounded-md inline-block">
                        {format(new Date(thought.published_at), "MMMM do, yyyy")}
                      </time>
                      <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite group-hover:text-wixAccent transition-colors font-serif">
                        {thought.title}
                      </h2>
                      <p className="text-wixTextSecondary dark:text-wixDarkTextSecondary leading-relaxed">{thought.excerpt}</p>
                      <div className="pt-4 flex items-center text-wixAccent font-semibold text-sm">
                        <span className="mr-2 group-hover:mr-4 transition-all w-8 h-px bg-wixAccent inline-block"></span> 
                        Read more
                      </div>
                    </Link>
                  </motion.article>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Thoughts;

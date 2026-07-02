import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FaExclamationCircle, FaSync } from "react-icons/fa";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Thoughts = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';

  const fetchThoughts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/api/thoughts`);
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please try again later.');
        }
        throw new Error('Unable to load thoughts. The API server might be offline.');
      }
      const data = await response.json();
      setThoughts(data);
    } catch (err) {
      console.error(err);
      setError(err.message === 'Failed to fetch' ? 'Unable to connect to the API server.' : err.message);
    } finally {
      setLoading(false);
    }
  }, [apiBaseUrl]);

  useEffect(() => {
    fetchThoughts();
  }, [fetchThoughts]);

  return (
    <section className="py-20 min-h-screen bg-wixLight dark:bg-wixDark transition-colors">
      <Helmet>
        <title>Technical Thoughts | Olumide Adewole</title>
        <meta name="description" content="Research notes and technical writing on AI engineering, climate analytics, LLMs, and modern software development." />
        <link rel="canonical" href="https://olumide.dev/thoughts" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://olumide.dev/thoughts" />
        <meta property="og:title" content="Technical Thoughts | Olumide Adewole" />
        <meta property="og:description" content="Research notes and technical writing on AI engineering, climate analytics, LLMs, and modern software development." />
        <meta property="og:image" content="https://olumide.dev/og-image.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Technical Thoughts",
            "url": "https://olumide.dev/thoughts",
          })}
        </script>
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
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center p-12 text-center bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-3xl max-w-xl mx-auto shadow-sm font-sans"
          >
            <FaExclamationCircle className="text-red-500 dark:text-red-400 text-5xl mb-4" />
            <h3 className="text-xl font-bold text-wixText dark:text-wixWhite mb-2">Failed to Load Thoughts</h3>
            <p className="text-base text-wixTextSecondary dark:text-wixDarkTextSecondary mb-6 max-w-md">{error}</p>
            <button
              onClick={fetchThoughts}
              className="flex items-center space-x-2 bg-wixAccent text-white px-6 py-3 rounded-full hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition font-bold text-sm shadow-md cursor-pointer"
            >
              <FaSync className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
          </motion.div>
        )}

        {!loading && !error && (
          <div className="space-y-8">
            {thoughts.length === 0 ? (
              <p className="text-wixText dark:text-wixWhite">No thoughts published yet.</p>
            ) : (
              thoughts.map((thought) => {
                const titleSlug = thought.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/(^-|-$)/g, '');
                const postSlug = thought.slug || `${thought.id}-${titleSlug}`;
                const postUrl = `/thoughts/${postSlug}`;

                return (
                  <motion.article
                    key={thought.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.5 }}
                    className="bg-wixWhite dark:bg-wixDarkCard p-8 rounded-3xl shadow-soft dark:shadow-soft-dark border border-gray-100 dark:border-gray-800 group hover:border-wixAccent dark:hover:border-wixAccent transition-all"
                  >
                    <Link to={postUrl} className="block space-y-3">
                      <time className="text-wixText dark:text-wixWhite font-bold text-sm tracking-wide bg-wixLight dark:bg-gray-800 px-3 py-1 rounded-md inline-block">
                        {format(new Date(thought.published_at), "MMMM do, yyyy")}
                      </time>
                      <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite group-hover:text-wixAccent transition-colors font-serif">
                        {thought.title}
                      </h2>
                      <p className="text-wixText dark:text-wixWhite leading-relaxed">{thought.excerpt}</p>
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

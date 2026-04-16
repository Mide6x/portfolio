import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { FaArrowLeft } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const ThoughtPost = () => {
  const { id } = useParams();
  const reduceMotion = usePrefersReducedMotion();
  const [thought, setThought] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';

  useEffect(() => {
    const fetchThought = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/thoughts/${id}`);
        if (!response.ok) throw new Error('Thought not found');
        const data = await response.json();
        setThought(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThought();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center bg-wixLight dark:bg-wixDark transition-colors">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-wixAccent"></div>
      </div>
    );
  }

  if (error || !thought) {
    return (
      <div className="min-h-screen py-24 text-center bg-wixLight dark:bg-wixDark transition-colors">
        <h2 className="text-2xl font-bold text-wixText dark:text-wixWhite mb-4">Post not found</h2>
        <Link to="/thoughts" className="text-wixAccent hover:underline">Return to Thoughts</Link>
      </div>
    );
  }

  return (
    <section className="py-24 min-h-screen bg-wixLight dark:bg-wixDark transition-colors">
      <Helmet>
        <title>{thought.title} | Olumide Adewole</title>
        <meta name="description" content={thought.content.substring(0, 160) + "..."} />
        <meta property="og:title" content={`${thought.title} | Olumide Adewole`} />
        <meta property="og:description" content={thought.content.substring(0, 160) + "..."} />
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          
          <Link
            to="/thoughts"
            className="inline-flex items-center space-x-2 text-wixTextSecondary dark:text-wixDarkTextSecondary hover:text-wixAccent dark:hover:text-wixWhite transition-colors font-semibold mb-10"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">Back to Thoughts</span>
          </Link>
          
          <header className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
            <time className="text-wixTextSecondary dark:text-wixDarkTextSecondary font-bold text-sm tracking-wide bg-wixLight dark:bg-gray-800 px-3 py-1 rounded-md inline-block mb-4">
              {format(new Date(thought.published_at), "MMMM do, yyyy")}
            </time>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wixText dark:text-wixWhite leading-tight tracking-tight mb-6">
              {thought.title}
            </h1>
            
            {/* AI Summary / Excerpt */}
            {thought.excerpt && (
              <div className="mb-6 border-l-4 border-wixAccent pl-6 py-2 bg-blue-50/10 dark:bg-blue-900/5 rounded-r-xl">
                <span className="text-[10px] font-black tracking-[0.2em] text-wixAccent uppercase mb-1 block">
                  AI Summary
                </span>
                <p className="text-xl text-wixTextSecondary dark:text-wixDarkTextSecondary leading-relaxed italic">
                  {thought.excerpt}
                </p>
              </div>
            )}

            {/* Author Block */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              <img 
                src="/profile-400.webp" 
                alt="Olumide Adewole" 
                className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700 shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-wixText dark:text-wixWhite font-bold text-base">
                  Olumide Adewole, MBA
                </span>
                <span className="text-wixTextSecondary dark:text-wixDarkTextSecondary text-xs font-medium tracking-tight">
                  AI Engineer <span className="mx-1.5 opacity-50">•</span> York St John University
                </span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none font-sans
            [&_p]:text-justify [&_p]:text-wixTextSecondary dark:[&_p]:text-wixDarkTextSecondary 
            [&_p]:leading-[1.0] [&_p]:mb-8
            prose-headings:text-wixText dark:prose-headings:text-wixWhite 
            prose-a:text-wixAccent hover:prose-a:text-blue-600 
            prose-strong:text-wixText dark:prose-strong:text-wixWhite">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {thought.content}
            </ReactMarkdown>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default ThoughtPost;

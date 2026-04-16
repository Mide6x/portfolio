import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { FaArrowLeft, FaLinkedin, FaTwitter, FaLink, FaCheck, FaDownload } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const ThoughtPost = () => {
  const { id } = useParams();
  const postId = id.split('-')[0]; // Extract ID from slug (e.g., "3-optimizing-..." -> "3")
  const reduceMotion = usePrefersReducedMotion();
  const [thought, setThought] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002';
  const [recentThoughts, setRecentThoughts] = useState([]);
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://olumide.dev/thoughts/${id}`;
  const shareTitle = thought ? thought.title : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchThought = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/thoughts/${postId}`);
        if (!response.ok) throw new Error('Thought not found');
        const data = await response.json();
        setThought(data);

        // Fetch recent thoughts for "More Work" section
        const thoughtsResponse = await fetch(`${apiBaseUrl}/api/thoughts`);
        if (thoughtsResponse.ok) {
          const allThoughts = await thoughtsResponse.json();
          // Filter out current thought and take first 3
          const filtered = allThoughts
            .filter(t => t.id.toString() !== postId.toString())
            .slice(0, 3);
          setRecentThoughts(filtered);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchThought();
  }, [postId]);

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
        <meta name="description" content={thought.excerpt || thought.content.substring(0, 160) + "..."} />
        <meta name="author" content="Olumide Adewole" />
        <meta name="language" content="en-GB" />

        {/* Canonical URL - Use the full slug-based URL for canonical consistency */}
        <link rel="canonical" href={`https://olumide.dev/thoughts/${id}`} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://olumide.dev/thoughts/${id}`} />
        <meta property="og:title" content={`${thought.title} | Olumide Adewole`} />
        <meta property="og:description" content={thought.excerpt || thought.content.substring(0, 160) + "..."} />
        <meta property="og:image" content="https://olumide.dev/og-image.png" />
        <meta property="og:site_name" content="Olumide Adewole" />
        <meta property="og:locale" content="en_GB" />
        <meta property="article:published_time" content={thought.published_at} />
        <meta property="article:author" content="Olumide Adewole" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${thought.title} | Olumide Adewole`} />
        <meta name="twitter:description" content={thought.excerpt || thought.content.substring(0, 160) + "..."} />
        <meta name="twitter:image" content="https://olumide.dev/og-image.png" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": thought.title,
            "description": thought.excerpt || thought.content.substring(0, 160) + "...",
            "author": {
              "@type": "Person",
              "name": "Olumide Adewole",
              "url": "https://olumide.dev"
            },
            "publisher": {
              "@type": "Person",
              "name": "Olumide Adewole",
              "logo": {
                "@type": "ImageObject",
                "url": "https://olumide.dev/favicon.svg"
              }
            },
            "datePublished": thought.published_at,
            "dateModified": thought.published_at,
            "inLanguage": "en-GB",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://olumide.dev/thoughts/${id}`
            }
          })}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >

          <Link
            to="/thoughts"
            className="inline-flex items-center space-x-2 text-wixText dark:text-wixWhite hover:text-wixAccent dark:hover:text-wixAccent transition-colors font-semibold mb-10"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">Back to Thoughts</span>
          </Link>

          <header className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
            <time className="text-wixText dark:text-wixWhite font-bold text-sm tracking-wide bg-wixLight dark:bg-gray-800 px-3 py-1 rounded-md inline-block mb-4">
              {format(new Date(thought.published_at), "MMMM do, yyyy")}
            </time>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wixText dark:text-wixWhite leading-tight tracking-tight mb-6 font-serif">
              {thought.title}
            </h1>

            {/* AI Summary / Excerpt */}
            {thought.excerpt && (
              <div className="mb-6 border-l-4 border-wixAccent pl-6 py-2 bg-blue-50/10 dark:bg-blue-900/5 rounded-r-xl">
                <span className="text-[10px] font-black tracking-[0.2em] text-wixAccent uppercase mb-1 block">
                  AI Summary
                </span>
                <p className="text-sm text-wixText dark:text-wixWhite leading-relaxed italic font-serif">
                  {thought.excerpt}
                </p>
              </div>
            )}

            {/* Author & Share Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <img
                  src="/profile-400.webp"
                  alt="Olumide Adewole"
                  className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700 shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="text-wixText dark:text-wixWhite font-bold text-base">
                    Olumide Adewole
                  </span>
                  <span className="text-wixText dark:text-wixWhite text-xs font-medium tracking-tight">
                    AI Engineer <span className="mx-1.5 opacity-50">•</span>MBA, York St John University
                  </span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-wixText dark:text-wixWhite uppercase tracking-widest mr-1">Share</span>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-wixText dark:text-wixWhite hover:text-wixAccent dark:hover:text-wixAccent transition-colors border border-gray-100 dark:border-gray-700"
                  title="Share on LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://x.com/intent/post?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-wixText dark:text-white hover:text-[#1DA1F2] dark:hover:text-white transition-colors border border-gray-100 dark:border-gray-700 font-bold"
                  title="Share on X (Twitter)"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-wixText dark:text-wixWhite hover:text-wixAccent dark:hover:text-wixAccent transition-colors border border-gray-100 dark:border-gray-700 print:hidden"
                  title="Download as PDF"
                >
                  <FaDownload className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-wixText dark:text-wixWhite hover:text-wixAccent dark:hover:text-wixAccent transition-colors border border-gray-100 dark:border-gray-700 relative print:hidden"
                  title="Copy link"
                >
                  {copied ? <FaCheck className="w-4 h-4 text-green-500" /> : <FaLink className="w-4 h-4" />}
                  {copied && (
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-wixText dark:bg-wixWhite text-white dark:text-wixText text-[10px] font-bold py-1 px-2 rounded whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none font-serif
            [&_p]:text-wixText dark:[&_p]:text-wixWhite 
            [&_p]:leading-[1.5] [&_p]:mb-8
            prose-headings:text-wixText dark:prose-headings:text-wixWhite 
            prose-a:text-wixAccent hover:prose-a:text-blue-600 
            prose-strong:text-wixText dark:prose-strong:text-wixWhite">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {thought.content}
            </ReactMarkdown>
          </div>

          {/* Academic Disclaimer */}
          <footer className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
            <p className="text-[10px] leading-relaxed text-wixTextSecondary/60 dark:text-wixDarkTextSecondary/40 italic font-serif max-w-2xl">
              The writer does not take institutional positions on public policy issues; the views represented herein are those of the author(s) and do not necessarily reflect the views of the writer, its staff, or its trustees.
            </p>
          </footer>

          {/* Related Discovery Section */}
          {recentThoughts.length > 0 && (
            <div className="mt-24 pt-16 border-t border-gray-100 dark:border-gray-800 print:hidden">
              <h3 className="text-2xl font-bold text-wixText dark:text-wixWhite mb-10 tracking-tight">
                More Work from Olumide Adewole
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentThoughts.map((t) => {
                  const slug = t.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
                  const postUrl = `/thoughts/${t.id}-${slug}`;

                  return (
                    <Link
                      key={t.id}
                      to={postUrl}
                      className="group block"
                    >
                      <article className="h-full transition-all">
                        <h4 className="text-lg font-bold text-wixText dark:text-wixWhite group-hover:text-wixAccent transition-colors mb-2 line-clamp-2 font-serif">
                          {t.title}
                        </h4>
                        <p className="text-sm text-wixText dark:text-wixWhite line-clamp-3 leading-relaxed">
                          {t.excerpt}
                        </p>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </motion.article>
      </div>
    </section>
  );
};

export default ThoughtPost;

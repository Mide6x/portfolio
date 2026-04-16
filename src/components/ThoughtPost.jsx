import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { FaArrowLeft } from "react-icons/fa";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const isSafeHref = (href) => {
  try {
    const url = new URL(href, window.location.origin);
    return url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:";
  } catch {
    return false;
  }
};

const renderInline = (text) => {
  const nodes = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];

    // Link: [label](href)
    if (token.startsWith("[") && token.includes("](") && token.endsWith(")")) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const label = linkMatch[1];
        const href = linkMatch[2];
        if (isSafeHref(href)) {
          nodes.push(
            <a
              key={`${match.index}-a`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-wixAccent hover:underline"
            >
              {label}
            </a>
          );
        } else {
          nodes.push(label);
        }
      } else {
        nodes.push(token);
      }
    } else if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`${match.index}-b`} className="text-wixText dark:text-wixWhite font-bold">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      nodes.push(<em key={`${match.index}-i`}>{token.slice(1, -1)}</em>);
    } else {
      nodes.push(token);
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
};

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
          
          <header className="mb-12 border-b border-gray-100 dark:border-gray-800 pb-10">
            <time className="text-wixTextSecondary dark:text-wixDarkTextSecondary font-bold text-sm tracking-wide bg-wixLight dark:bg-gray-800 px-3 py-1 rounded-md inline-block mb-4">
              {format(new Date(thought.published_at), "MMMM do, yyyy")}
            </time>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-wixText dark:text-wixWhite leading-tight tracking-tight">
              {thought.title}
            </h1>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-wixTextSecondary dark:prose-p:text-wixDarkTextSecondary prose-headings:text-wixText dark:prose-headings:text-wixWhite prose-a:text-wixAccent hover:prose-a:text-blue-600 prose-strong:text-wixText dark:prose-strong:text-wixWhite">
            {thought.content.split("\n\n").map((paragraph, index) => {
              const p = paragraph.trim();
              if (!p) return null;

              // Handle standard markdown headers (#, ##, ###)
              const headerMatch = p.match(/^(#{1,6})\s+(.+)/);
              if (headerMatch) {
                const level = headerMatch[1].length;
                const text = headerMatch[2].replace(/\*\*(.+?)\*\*/g, "$1"); // strip bold in headers if present
                const Tag = `h${level}`;
                const sizeClasses = {
                  1: "text-3xl font-extrabold text-wixText dark:text-wixWhite mt-12 mb-6",
                  2: "text-2xl font-bold text-wixText dark:text-wixWhite mt-10 mb-5",
                  3: "text-xl font-bold text-wixText dark:text-wixWhite mt-8 mb-4",
                  4: "text-lg font-bold text-wixText dark:text-wixWhite mt-6 mb-3",
                  5: "text-base font-bold text-wixText dark:text-wixWhite mt-6 mb-3",
                  6: "text-sm font-bold text-wixText dark:text-wixWhite mt-6 mb-3",
                };
                return <Tag key={index} className={sizeClasses[level]}>{text}</Tag>;
              }

              // Handle pseudo-headers (text starting and ending with **)
              if (p.startsWith("**") && p.endsWith("**") && !p.includes("\n")) {
                const headerText = p.replace(/\*\*/g, "");
                return (
                  <h3 key={index} className="text-2xl font-bold text-wixText dark:text-wixWhite mt-12 mb-6">
                    {headerText}
                  </h3>
                );
              }

              // Handle unordered lists (starting with - or *)
              if (/^[-*]\s+/.test(p)) {
                const listItems = p.split(/\n(?=[-*\s]+)/);
                return (
                  <ul key={index} className="list-disc list-outside ml-6 space-y-3 my-6 text-wixTextSecondary dark:text-wixDarkTextSecondary leading-relaxed text-lg">
                    {listItems.map((item, itemIndex) => {
                      const cleanItem = item.replace(/^[-*]\s+/, "");
                      return <li key={itemIndex} className="pl-2">{renderInline(cleanItem)}</li>;
                    })}
                  </ul>
                );
              }

              // Handle numbered lists
              if (/^\d+\.\s+/.test(p)) {
                const listItems = p.split(/\n(?=\d+\.\s+)/);
                return (
                  <ol key={index} className="list-decimal list-outside ml-6 space-y-3 my-6 text-wixTextSecondary dark:text-wixDarkTextSecondary leading-relaxed text-lg">
                    {listItems.map((item, itemIndex) => {
                      const cleanItem = item.replace(/^\d+\.\s+/, "");
                      return <li key={itemIndex} className="pl-2">{renderInline(cleanItem)}</li>;
                    })}
                  </ol>
                );
              }

              // Handle regular paragraphs (with links, bold, italics)
              return (
                <p key={index} className="text-wixTextSecondary dark:text-wixDarkTextSecondary leading-relaxed mb-6 text-lg">
                  {renderInline(p)}
                </p>
              );
            })}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default ThoughtPost;

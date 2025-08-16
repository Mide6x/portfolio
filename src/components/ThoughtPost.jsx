import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { format } from "date-fns";
import post1 from './posts/post1.json';
import post2 from './posts/post2.json';
import post3 from './posts/post3.json';
import post4 from './posts/post4.json';

const ThoughtPost = () => {
  const { id } = useParams();

  // Import post data from JSON files
  const thoughts = [
    post1,
    post2,
    post3,
    post4
  ];

  const thought = thoughts.find((t) => t.id === parseInt(id));

  if (!thought) {
    return <Navigate to="/404" />;
  }

  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article transition={{ duration: 0.5 }} className="space-y-6">
          <Link
            to="/thoughts"
            className="text-secondary hover:text-secondary/80 transition-colors"
          >
            ← Back to Thoughts
          </Link>
          <header className="space-y-2">
            <time className="text-secondary font-mono text-sm">
              {format(thought.date, "MMMM do, yyyy")}
            </time>
            <h1 className="text-4xl font-bold text-textPrimary">
              {thought.title}
            </h1>
          </header>
          <div className="bg-lightNavy/30 p-8 rounded-lg border border-lightNavy/50">
            <div className="prose prose-lg prose-invert max-w-none">
              {thought.content.split("\n\n").map((paragraph, index) => {
                // Handle headers (text starting with **)
                if (paragraph.startsWith("**") && paragraph.includes("**")) {
                  const headerText = paragraph.replace(/\*\*/g, "");
                  return (
                    <h3
                      key={index}
                      className="text-xl font-bold text-secondary mt-8 mb-4 first:mt-0"
                    >
                      {headerText}
                    </h3>
                  );
                }

                // Handle numbered lists
                if (/^\d+\. /.test(paragraph)) {
                  const listItems = paragraph.split(/\n(?=\d+\. )/);
                  return (
                    <ol
                      key={index}
                      className="list-decimal list-inside space-y-3 my-6 text-textSecondary leading-relaxed"
                    >
                      {listItems.map((item, itemIndex) => {
                        const cleanItem = item
                          .replace(
                            /^\d+\. \*\*(.+?)\*\*: (.+)/,
                            "<strong>$1</strong>: $2"
                          )
                          .replace(/^\d+\. (.+)/, "$1");
                        return (
                          <li
                            key={itemIndex}
                            className="pl-2"
                            dangerouslySetInnerHTML={{ __html: cleanItem }}
                          />
                        );
                      })}
                    </ol>
                  );
                }

                // Handle regular paragraphs
                const cleanParagraph = paragraph
                  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") // Bold text
                  .replace(/\*(.+?)\*/g, "<em>$1</em>"); // Italic text

                return (
                  <p
                    key={index}
                    className="text-textSecondary leading-relaxed mb-6 text-justify"
                    dangerouslySetInnerHTML={{ __html: cleanParagraph }}
                  />
                );
              })}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default ThoughtPost;

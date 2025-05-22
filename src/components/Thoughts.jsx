import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Thoughts = () => {
  const thoughts = [
    {
      id: 1,
      date: new Date("2025-01-16"),
      title: "The Empty Notepad",
      excerpt:
        "I brought a notepad, yet no pen. And when these thoughts arise...",
      content: `I brought a notepad, yet no pen. And when these thoughts arise—those fleeting, feverish truths you speak, the words I must seize—I open the notepad only to find my hand empty, powerless. Ah, you cannot fathom the sting of it! That strange, hollow ache, that quiet despair. How absurd, how bitterly disappointing.

God forbid such a thing should ever befall me again.`,
    },
    {
      id: 2,
      date: new Date("2024-01-18"),
      title: "Lagos Marketers: A Study in Confidence",
      excerpt: "There is something raw and untamed about Lagos marketers...",
      content: `There is something raw and untamed about Lagos marketers—a rugged confidence, I will call it. A confidence forged in risk, rough-edged and relentless. **Bold** enough to seize a stranger's hand and pull them through the chaos of the market, knowing nothing of their desires yet certain—almost defiantly—that whatever they seek waits on their shelf. This confidence does not shrink when met with cold shoulders or eyes that refuse to meet theirs beneath the unforgiving Lagos sun. No, it pushes forward, unshaken. A fierce belief that they can deliver, even without knowing the request. That wild, stubborn confidence—that is what we should all carry within us.`,
    },
    {
      id: 3,
      date: new Date("2025-05-22"),
      title: "AI and the Creative Spirit: A Dance of Collaboration",
      excerpt:
        "AI isn't the death of creativity—it's a renaissance in disguise.",
      content: `In the quiet hours of my research, a thought crystallizes: AI isn't the death of creativity—it's a renaissance in disguise. Like the invention of the camera, which didn't kill painting but birthed impressionism, AI isn't here to replace the artist but to expand the canvas of what's possible.`,
    },
  ];

  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-textPrimary mb-12">Thoughts</h1>
        <div className="space-y-12">
          {thoughts.map((thought) => (
            <motion.article
              key={thought.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-lightNavy p-6 rounded-lg space-y-4 hover:bg-lightNavy/50 transition-colors"
            >
              <Link to={`/thoughts/${thought.id}`} className="block space-y-2">
                <time className="text-secondary font-mono text-sm">
                  {format(thought.date, "MMMM do, yyyy")}
                </time>
                <h2 className="text-2xl font-bold text-textPrimary hover:text-secondary transition-colors">
                  {thought.title}
                </h2>
                <p className="text-textSecondary">{thought.excerpt}</p>
                <div className="pt-4">
                  <span className="text-secondary hover:text-secondary/80 transition-colors">
                    Read more →
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Thoughts;

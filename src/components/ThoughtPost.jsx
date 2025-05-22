import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { format } from "date-fns";

const ThoughtPost = () => {
  const { id } = useParams();

  // This would typically come from an API or database
  const thoughts = [
    {
      id: 1,
      date: new Date("2025-01-16"),
      title: "The Empty Notepad",
      content: `I brought a notepad, yet no pen. And when these thoughts arise—those fleeting, feverish truths you speak, the words I must seize—I open the notepad only to find my hand empty, powerless. Ah, you cannot fathom the sting of it! That strange, hollow ache, that quiet despair. How absurd, how bitterly disappointing.

God forbid such a thing should ever befall me again.`,
    },
    {
      id: 2,
      date: new Date("2024-01-18"),
      title: "Lagos Marketers: A Study in Confidence",
      content: `There is something raw and untamed about Lagos marketers—a rugged confidence, I will call it. A confidence forged in risk, rough-edged and relentless. Bold enough to seize a stranger's hand and pull them through the chaos of the market, knowing nothing of their desires yet certain—almost defiantly—that whatever they seek waits on their shelf. This confidence does not shrink when met with cold shoulders or eyes that refuse to meet theirs beneath the unforgiving Lagos sun. No, it pushes forward, unshaken. A fierce belief that they can deliver, even without knowing the request. That wild, stubborn confidence—that is what we should all carry within us.`,
    },
    {
      id: 3,
      date: new Date("2025-05-22"),
      title: "AI and the Creative Spirit: A Dance of Collaboration",
      content: `In the quiet hours of my research, a thought crystallizes: AI isn't the death of creativity—it's a renaissance in disguise. Like the invention of the camera, which didn't kill painting but birthed impressionism, AI isn't here to replace the artist but to expand the canvas of what's possible.

Consider the musician who now has an AI companion to jam with at 3 AM, or the writer whose characters can speak back to them through large language models. These tools aren't replacing the creative spark—they're kindling it. They're the new brushes in our artistic toolkit, not the artist themselves.

But here's what fascinates me most: AI is pushing us to redefine what it means to be creative. When a machine can generate a thousand images in seconds, the value shifts from technical execution to conceptual innovation. The question is no longer just "Can you make it?" but "What should we make, and why?"

This is where human creativity truly shines—in the realm of meaning, purpose, and emotional resonance. AI can help us execute our visions with unprecedented speed and scale, but it can't replace the uniquely human ability to infuse work with lived experience, cultural context, and emotional truth.

The future belongs not to those who resist AI, nor to those who surrender to it, but to those who learn to dance with it—using it as a partner in the creative process while maintaining their distinctive human voice. This is not the end of creativity; it's an invitation to be creative in entirely new ways.`,
    },
  ];

  const thought = thoughts.find((t) => t.id === parseInt(id));

  if (!thought) {
    return <Navigate to="/404" />;
  }

  return (
    <section className="py-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
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
          <div className="prose prose-invert prose-secondary max-w-none">
            {thought.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-textSecondary">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default ThoughtPost;

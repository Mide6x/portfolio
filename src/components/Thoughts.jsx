import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const Thoughts = () => {
  const thoughts = [
    {
      id: 1,
      date: new Date("2025-05-22"),
      title: "AI and the Creative Spirit: A Dance of Collaboration",
      excerpt:
        "AI isn't the death of creativity—it's a renaissance in disguise.",
      content: `In the quiet hours of my research, a thought crystallizes: AI isn't the death of creativity—it's a renaissance in disguise. Like the invention of the camera, which didn't kill painting but birthed impressionism, AI isn't here to replace the artist but to expand the canvas of what's possible.`,
    },
    {
      id: 2,
      date: new Date("2024-08-28"),
      title: "Nexus: The Future of Modular AI Intelligence",
      excerpt:
        "A breakthrough in Mixture of Experts that promises to revolutionize how we build and adapt AI systems...",
      content: `The paper "Nexus: Specialization meets Adaptability for Efficiently Training Mixture of Experts" by Gritsch et al. presents a compelling solution to one of AI's most persistent challenges: how to create models that are simultaneously efficient, specialized, and adaptable to new domains.

The core innovation lies in their "upcycling" approach—transforming existing dense models into Mixture of Experts (MoE) architectures without starting from scratch. Traditional MoE training requires massive computational resources and careful orchestration of multiple experts from the beginning. Nexus changes this paradigm entirely.

What makes Nexus particularly elegant is its adaptive routing mechanism. Instead of using simple linear routers that treat all experts equally, Nexus learns to project expert embeddings from domain representations. This means the model understands not just what each expert can do, but when and why to use them based on the input's domain characteristics.

The results speak volumes: up to 2.1% improvement over baseline upcycling methods, and a remarkable 18.8% gain when extending the MoE with new experts using limited fine-tuning data. But the real breakthrough isn't in the numbers—it's in the flexibility.

Imagine an open-source ecosystem where researchers and practitioners can continuously assemble their own "MoE-mix" according to their specific needs. Need a model that excels at both scientific reasoning and creative writing? Simply upcycle existing specialized models and let Nexus handle the intelligent routing between them.

This work represents a fundamental shift from monolithic AI systems to modular, composable intelligence. It's not just about making models bigger or faster—it's about making them smarter about when and how to use their capabilities.`,
    },
    {
      id: 3,
      date: new Date("2025-08-16"),
      title: "The Duality of Vector Space: Sparse vs. Dense",
      excerpt: "A deep dive into the fundamental differences between sparse and dense vector representations in machine learning and their implications for recommender systems.",
      content: `You know those moments when you're explaining something, and suddenly, a topic you thought you understood at a high level clicks into place at a much deeper, almost visceral level? That happened to me recently. I was working on a recommender system, instinctively reaching for all-MiniLM-L6-v2 because, well, that's what we do now. My focus was on a simple heuristic: a larger embedding size must be better, right? More dimensions, more information, better recommendations. The reality is, of course, far more intricate, a balance between semantic fidelity and computational tractability that PhD-level research grapples with every day.

The real intellectual jolt came from a project review where the team used the classic TF-IDF vectorizer. My immediate, somewhat reflexive response was to point them toward modern word and sentence embedding techniques. But simply stating "dense vectors are better" felt intellectually hollow. To truly justify the shift, I had to deconstruct the fundamental difference between sparse and dense vector representations, moving beyond simple definitions to the core mathematical and computational implications.`,
    },
    {
      id: 4,
      date: new Date("2025-01-15"),
      title: "Optimizing Deep Learning Models for Edge Deployment: A 35x Size Reduction Journey",
      excerpt: "How I reduced a 90MB Siamese face recognition model to under 5MB while maintaining performance and achieving sub-100ms inference times.",
      content: `As AI engineers, we often face the challenge of deploying powerful deep learning models on resource-constrained devices. The goal isn't just to make a model work, but to make it work efficiently.`,
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
              className="bg-lightNavy/30 p-6 rounded-lg border border-lightNavy/50 space-y-4 hover:bg-lightNavy/50 transition-colors"
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

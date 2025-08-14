import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { format } from "date-fns";

const ThoughtPost = () => {
  const { id } = useParams();

  // This would typically come from an API or database
  const thoughts = [
    {
      id: 1,
      date: new Date("2025-05-22"),
      title: "AI and the Creative Spirit: A Dance of Collaboration",
      content: `In the quiet hours of my research, a thought crystallizes: AI isn't the death of creativity—it's a renaissance in disguise. Like the invention of the camera, which didn't kill painting but birthed impressionism, AI isn't here to replace the artist but to expand the canvas of what's possible.

Consider the musician who now has an AI companion to jam with at 3 AM, or the writer whose characters can speak back to them through large language models. These tools aren't replacing the creative spark—they're kindling it. They're the new brushes in our artistic toolkit, not the artist themselves.

But here's what fascinates me most: AI is pushing us to redefine what it means to be creative. When a machine can generate a thousand images in seconds, the value shifts from technical execution to conceptual innovation. The question is no longer just "Can you make it?" but "What should we make, and why?"

This is where human creativity truly shines—in the realm of meaning, purpose, and emotional resonance. AI can help us execute our visions with unprecedented speed and scale, but it can't replace the uniquely human ability to infuse work with lived experience, cultural context, and emotional truth.

The future belongs not to those who resist AI, nor to those who surrender to it, but to those who learn to dance with it—using it as a partner in the creative process while maintaining their distinctive human voice. This is not the end of creativity; it's an invitation to be creative in entirely new ways.`,
    },
    {
      id: 2,
      date: new Date("2024-08-28"),
      title: "Nexus: The Future of Modular AI Intelligence",
      content: `The paper "Nexus: Specialization meets Adaptability for Efficiently Training Mixture of Experts" by Gritsch et al. presents a compelling solution to one of AI's most persistent challenges: how to create models that are simultaneously efficient, specialized, and adaptable to new domains. <sup><a href="https://arxiv.org/abs/2408.15901" target="_blank" class="text-secondary hover:text-secondary/80">[1]</a></sup>

**The Core Problem**

Large Language Models face a fundamental trilemma: they can be efficient, specialized, or adaptable—but achieving all three simultaneously has proven elusive. <sup><a href="https://arxiv.org/abs/2408.15901" target="_blank" class="text-secondary hover:text-secondary/80">[1]</a></sup> Traditional dense models require enormous computational resources for deployment, while existing Mixture of Experts (MoE) approaches demand massive training from scratch whenever new domains are introduced.

**The Nexus Innovation**

The breakthrough lies in "upcycling"—transforming existing dense models into MoE architectures without starting from scratch. But Nexus goes beyond simple model combination. Its adaptive routing mechanism learns to project expert embeddings from domain representations, creating a system that understands not just what each expert can do, but when and why to use them. <sup><a href="https://arxiv.org/html/2408.15901v1" target="_blank" class="text-secondary hover:text-secondary/80">[2]</a></sup>

This is fundamentally different from linear routers that treat all experts equally. Nexus develops an intuitive understanding of domain characteristics, enabling intelligent routing decisions that maximize both efficiency and performance.

**Remarkable Results**

The empirical results are striking: up to 2.1% improvement over baseline upcycling methods, and an impressive 18.8% gain when extending the MoE with new experts using limited fine-tuning data. <sup><a href="https://arxiv.org/abs/2408.15901" target="_blank" class="text-secondary hover:text-secondary/80">[1]</a></sup> But the real breakthrough isn't in the numbers—it's in the paradigm shift.

**Future Research Directions**

This work opens several fascinating avenues for exploration:

1. **Dynamic Expert Creation**: Could we develop systems that automatically generate new experts when encountering novel domains, rather than requiring pre-trained models?

2. **Cross-Modal Expertise**: How might Nexus-style routing work across different modalities—text, vision, audio—creating truly multimodal expert systems?

3. **Hierarchical Expertise**: What about nested expert systems where high-level experts route to specialized sub-experts, creating deeper specialization trees?

4. **Collaborative Expert Networks**: Could multiple Nexus systems share and exchange experts in a distributed fashion, creating a global ecosystem of specialized intelligence?

5. **Meta-Learning for Routing**: Can the routing mechanism itself learn to adapt faster to new domains through meta-learning approaches?

6. **Efficiency Optimization**: How can we minimize the computational overhead of the adaptive routing while maintaining its benefits?

**The Broader Vision**

Nexus represents more than a technical advancement—it's a step toward truly modular AI. <sup><a href="https://arxiv.org/abs/2408.15901" target="_blank" class="text-secondary hover:text-secondary/80">[1]</a></sup> Imagine an ecosystem where researchers contribute specialized models that can be seamlessly integrated into larger systems. A climate scientist's weather prediction model could be combined with an economist's market analysis expert and a linguist's translation system, all orchestrated by intelligent routing.

This modularity could democratize AI development, allowing domain experts to contribute their specialized knowledge without needing to understand the complexities of large-scale model training. It's a vision of AI that grows through collaboration rather than competition.

The implications extend beyond technical efficiency to the very nature of how we build and deploy AI systems. <sup><a href="https://arxiv.org/html/2408.15901v1" target="_blank" class="text-secondary hover:text-secondary/80">[2]</a></sup> Instead of monolithic models that try to do everything, we move toward composable intelligence that can be tailored, extended, and adapted as needed.

Nexus doesn't just solve the efficiency-specialization-adaptability trilemma—it transforms it into a synergistic relationship where each quality reinforces the others. <sup><a href="https://arxiv.org/abs/2408.15901" target="_blank" class="text-secondary hover:text-secondary/80">[1]</a></sup> This is the future of AI: not bigger models, but smarter systems that know when and how to use their capabilities.`,
    },
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

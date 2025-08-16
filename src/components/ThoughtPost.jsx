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
    {
      id: 3,
      date: new Date("2025-08-16"),
      title: "The Duality of Vector Space: Sparse vs. Dense",
      content: `You know those moments when you're explaining something, and suddenly, a topic you thought you understood at a high level clicks into place at a much deeper, almost visceral level? That happened to me recently. I was working on a recommender system, instinctively reaching for all-MiniLM-L6-v2 because, well, that's what we do now. My focus was on a simple heuristic: a larger embedding size must be better, right? More dimensions, more information, better recommendations. The reality is, of course, far more intricate, a balance between semantic fidelity and computational tractability that PhD-level research grapples with every day.

The real intellectual jolt came from a project review where the team used the classic TF-IDF vectorizer. My immediate, somewhat reflexive response was to point them toward modern word and sentence embedding techniques. But simply stating "dense vectors are better" felt intellectually hollow. To truly justify the shift, I had to deconstruct the fundamental difference between sparse and dense vector representations, moving beyond simple definitions to the core mathematical and computational implications.

The Duality of Vector Space: Sparse vs. Dense
At its heart, the difference between TF-IDF and modern embeddings is a philosophical schism in information retrieval. Do you represent a document as a bag of discrete, high-dimensional features, or as a point in a continuous, lower-dimensional manifold?

The Sparse Reality: TF-IDF and Lexical Matching
TF-IDF, and its more advanced brethren like BM25, are fundamentally sparse vector representations <sup><a href="#ref1" class="text-secondary hover:text-secondary/80">[1]</a></sup>. They are based on a large, discrete vocabulary. A document's vector is a high-dimensional space where each dimension corresponds to a term in the corpus. The value in each dimension is a weight, a score derived from the term's frequency in the document (TF) and its rarity across the entire corpus (IDF). The sparsity arises because any given document only contains a small fraction of the total vocabulary, leading to a vector with an overwhelming number of zeros.

This approach is highly interpretable. The non-zero values in the vector are directly tied to specific keywords. This makes them excellent for traditional information retrieval and keyword-based search. You can trace back why a document was retrieved—it was because it contained the words "leather boots." However, this very interpretability is also its fatal flaw for tasks like recommendation. The "curse of dimensionality" is a mild way of putting it; the real problem is the complete ignorance of semantic meaning. The vectors for "leather boots" and "waterproof footwear" may be nearly orthogonal because they share few common terms, despite describing highly similar products <sup><a href="#ref2" class="text-secondary hover:text-secondary/80">[2]</a></sup>. This is the classic data sparsity problem in recommender systems, where the user-item interaction matrix is incredibly sparse, and simple keyword matching is insufficient <sup><a href="#ref3" class="text-secondary hover:text-secondary/80">[3]</a></sup>.

The Dense Continuum: The Latent Semantic Space
Modern embedding models, from Word2Vec to BERT-based transformers, operate on a completely different paradigm. They generate dense vector representations <sup><a href="#ref1" class="text-secondary hover:text-secondary/80">[1]</a></sup>. Instead of a high-dimensional, sparse space tied to a discrete vocabulary, they project words, sentences, or entire documents into a continuous, lower-dimensional space (e.g., 384 dimensions for all-MiniLM-L6-v2 or even 768 or 1024 for larger models). In this space, every single dimension typically has a non-zero value.

This is a learned representation. The models are trained to position semantically similar concepts close to each other in this latent space. The vectors for "leather boots" and "waterproof footwear" will be in close proximity, even if their word overlap is minimal, because the model has learned that they are conceptually similar. This is the essence of semantic search and the reason these models have revolutionized tasks requiring a deep understanding of context and meaning <sup><a href="#ref4" class="text-secondary hover:text-secondary/80">[4]</a></sup>. This approach directly addresses the cold-start problem and data sparsity issues that plague traditional recommenders by moving from an exact match to a conceptual one.

The PHD-Level Trade-off: Beyond "Bigger is Better"
The conversation about embedding size is a microcosm of a larger problem in large-scale machine learning: the perennial trade-off between model expressivity and computational cost. While larger dense embeddings (e.g., 1024-dimensional vectors) can theoretically capture more subtle nuances, they introduce significant challenges:

Computational Complexity: The complexity of similarity search, especially using distance metrics like cosine similarity, scales with the dimensionality. For a brute-force search over a dataset of N items with D dimensions, the complexity is O(N
cdotD). At industrial scale, where N can be in the billions, this is prohibitive. This necessitates the use of Approximate Nearest Neighbor (ANN) search algorithms, which have their own performance and accuracy trade-offs <sup><a href="#ref5" class="text-secondary hover:text-secondary/80">[5]</a></sup>.

Memory and Storage: Dense vectors are memory-intensive. Storing billions of high-dimensional vectors requires immense computational infrastructure. This has led to a fascinating area of research in embedding compression and quantization to reduce the memory footprint while preserving semantic fidelity. Some recent work even proposes a hybrid approach, using learnable compression techniques to project dense embeddings into a high-dimensional, sparsely activated space, effectively merging the benefits of both worlds <sup><a href="#ref6" class="text-secondary hover:text-secondary/80">[6]</a></sup>.

The Marginal Utility Problem: The performance gains from increasing embedding size are not always linear. Research has shown that after a certain point, the marginal improvement in a metric like recall or NDCG can plateau, while the computational burden continues to increase exponentially <sup><a href="#ref7" class="text-secondary hover:text-secondary/80">[7]</a></sup>. This means a PhD-level practitioner must not only choose the right embedding technique but also the optimal embedding size for the specific task and computational budget.

The key takeaway is that the choice between sparse and dense vectors is not arbitrary; it's a fundamental architectural decision that defines the capabilities of your system. While sparse representations are powerful for keyword-based retrieval, their lack of semantic understanding makes them ill-suited for the nuanced task of personalization. Dense vectors are the modern tool for the job, but their power comes with a cost that must be managed through clever engineering and a deep understanding of the underlying trade-offs.

**References**

<span id="ref1">[1]</span> Milvus Documentation. Sparse Vector. <a href="https://lnkd.in/duSbiWjx" target="_blank" class="text-secondary hover:text-secondary/80">https://lnkd.in/duSbiWjx</a> and Dense Vector. <a href="https://lnkd.in/dCZ5WkfM" target="_blank" class="text-secondary hover:text-secondary/80">https://lnkd.in/dCZ5WkfM</a>

<span id="ref2">[2]</span> Mahajan, Y., Freestone, M., Bansal, N., Aakur, S., & Karmaker, S. (2025). Revisiting Word Embeddings in the LLM Era. arXiv:2402.11094v3 [cs.CL]. <a href="https://lnkd.in/dk6zdnsf" target="_blank" class="text-secondary hover:text-secondary/80">https://lnkd.in/dk6zdnsf</a>

<span id="ref3">[3]</span> Data Sparsity Challenges in Recommendation Systems. arXiv:2310.18608v2. <a href="https://lnkd.in/dKrCFgzG" target="_blank" class="text-secondary hover:text-secondary/80">https://lnkd.in/dKrCFgzG</a>

<span id="ref4">[4]</span> Wang, Z., Zhang, J., & Wang, W. (2018). Neural Collaborative Filtering. Proceedings of the 26th International Conference on World Wide Web. 10.1145/3038912.3052569

<span id="ref5">[5]</span> RL for Memory-Efficient Large Models. arXiv:2304.03501v4. <a href="https://lnkd.in/d_SMCwPQ" target="_blank" class="text-secondary hover:text-secondary/80">https://lnkd.in/d_SMCwPQ</a>

<span id="ref6">[6]</span> Re, A., & Pavan, R. (2025). The Future is Sparse: Embedding Compression for Scalable Retrieval in Recommender Systems. arXiv:2505.11388. <a href="https://arxiv.org/abs/2505.11388" target="_blank" class="text-secondary hover:text-secondary/80">https://arxiv.org/abs/2505.11388</a>

<span id="ref7">[7]</span> Cai, J., Li, Y., Wang, Z., & Chen, Y. (2022). A Deep Dive into Latent Factor Models for Recommender Systems. ACM Computing Surveys. 10.1145/3547021`,
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

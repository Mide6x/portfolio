import fs from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const templatePath = path.join(distDir, "index.html");
const apiBaseUrl = (
  process.env.PRERENDER_API_BASE_URL ||
  process.env.VITE_API_BASE_URL ||
  "http://localhost:5002"
).replace(/\/+$/, "");
const siteUrl = (process.env.PRERENDER_SITE_URL || "https://olumide.dev").replace(/\/+$/, "");

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const stripMarkdown = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[#>*_~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncate = (value, max = 160) => {
  const text = stripMarkdown(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
};

const injectHead = (html, tags) => {
  const headClose = "</head>";
  return html.replace(headClose, `${tags}\n${headClose}`);
};

const injectRootContent = (html, markup) =>
  html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

const injectInitialData = (html, data) => {
  const script = `<script>window.__INITIAL_DATA__=${JSON.stringify(data).replace(/</g, "\\u003c")};</script>`;
  return html.replace("</body>", `${script}\n</body>`);
};

const fetchJson = async (resourcePath) => {
  const response = await fetch(`${apiBaseUrl}${resourcePath}`);
  if (!response.ok) {
    throw new Error(`Prerender fetch failed for ${resourcePath}: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const buildThoughtMeta = (thought) => {
  const postUrl = `${siteUrl}/thoughts/${thought.slug}`;
  const description = escapeHtml(truncate(thought.excerpt || thought.content));
  const title = escapeHtml(`${thought.title} | Olumide Adewole`);

  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${postUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${postUrl}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${siteUrl}/og-image.png" />
    <meta property="og:site_name" content="Olumide Adewole" />
    <meta property="og:locale" content="en_GB" />
    <meta property="article:published_time" content="${escapeHtml(thought.published_at || "")}" />
    <meta property="article:author" content="Olumide Adewole" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${siteUrl}/og-image.png" />
  `.trim();
};

const buildThoughtMarkup = (thought) => {
  const description = escapeHtml(truncate(thought.excerpt || thought.content, 240));
  const postUrl = `${siteUrl}/thoughts/${thought.slug}`;

  return `
    <section class="py-24 min-h-screen bg-wixLight dark:bg-wixDark transition-colors">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
          <header class="mb-10">
            <a href="/thoughts" class="inline-flex items-center gap-2 text-sm text-wixAccent">← Back to Thoughts</a>
            <h1 class="mt-6 text-4xl font-bold text-wixText dark:text-wixWhite">${escapeHtml(thought.title)}</h1>
            <p class="mt-4 text-lg text-wixTextSecondary dark:text-wixDarkTextSecondary">${description}</p>
            <p class="mt-4 text-sm text-wixTextSecondary dark:text-wixDarkTextSecondary">${escapeHtml(thought.published_at || "")}</p>
          </header>
          <noscript>
            <p>This page has been prerendered for link previews and metadata. Enable JavaScript to read the full interactive article.</p>
            <p><a href="${postUrl}">${postUrl}</a></p>
          </noscript>
        </article>
      </div>
    </section>
  `.trim();
};

const buildThoughtsIndexMeta = () => `
  <title>Technical Thoughts | Olumide Adewole</title>
  <meta name="description" content="Research notes and technical writing on AI engineering, climate analytics, LLMs, and modern software development." />
  <link rel="canonical" href="${siteUrl}/thoughts" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${siteUrl}/thoughts" />
  <meta property="og:title" content="Technical Thoughts | Olumide Adewole" />
  <meta property="og:description" content="Research notes and technical writing on AI engineering, climate analytics, LLMs, and modern software development." />
  <meta property="og:image" content="${siteUrl}/og-image.png" />
`.trim();

const buildThoughtsIndexMarkup = (thoughts) => `
  <section class="py-20 min-h-screen bg-wixLight dark:bg-wixDark transition-colors">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      <h1 class="text-4xl font-bold text-wixText dark:text-wixWhite mb-12 tracking-tight">Thoughts</h1>
      <div class="space-y-8">
        ${thoughts.slice(0, 10).map((thought) => `
          <article class="bg-wixWhite dark:bg-wixDarkCard p-5 md:p-6 rounded-2xl shadow-soft dark:shadow-soft-dark border border-gray-100 dark:border-gray-800">
            <a href="/thoughts/${thought.slug}" class="block space-y-2">
              <p class="text-xs font-bold">${escapeHtml(thought.published_at || "")}</p>
              <h2 class="text-xl md:text-2xl font-bold">${escapeHtml(thought.title)}</h2>
              <p class="text-sm">${escapeHtml(truncate(thought.excerpt || thought.content, 180))}</p>
            </a>
          </article>
        `).join("")}
      </div>
    </div>
  </section>
`.trim();

const main = async () => {
  const template = await fs.readFile(templatePath, "utf8");
  const thoughts = await fetchJson("/api/thoughts");

  const thoughtsIndexHtml = injectInitialData(
    injectRootContent(
      injectHead(template, buildThoughtsIndexMeta()),
      buildThoughtsIndexMarkup(thoughts),
    ),
    { route: "thoughts-index", thoughts },
  );

  const thoughtsIndexDir = path.join(distDir, "thoughts");
  await fs.mkdir(thoughtsIndexDir, { recursive: true });
  await fs.writeFile(path.join(thoughtsIndexDir, "index.html"), thoughtsIndexHtml, "utf8");

  for (const thought of thoughts) {
    if (!thought?.slug) continue;

    const recentThoughts = thoughts
      .filter((entry) => entry.id !== thought.id)
      .slice(0, 3);

    const pageHtml = injectInitialData(
      injectRootContent(
        injectHead(template, buildThoughtMeta(thought)),
        buildThoughtMarkup(thought),
      ),
      { route: "thought-post", slug: thought.slug, thought, recentThoughts },
    );

    const pageDir = path.join(thoughtsIndexDir, thought.slug);
    await fs.mkdir(pageDir, { recursive: true });
    await fs.writeFile(path.join(pageDir, "index.html"), pageHtml, "utf8");
  }

  console.log(`Prerendered ${thoughts.length} thought routes using ${apiBaseUrl}`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

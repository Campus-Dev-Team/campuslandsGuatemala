export type BlogTextNode = {
  type: string;
  text?: string;
  url?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: BlogTextNode[];
};

export type BlogBlock = BlogTextNode & {
  level?: number;
  format?: "ordered" | "unordered";
  image?: BlogMedia;
};

export type BlogMedia = {
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  order: number;
};

export type BlogSeo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  shareImage?: BlogMedia | null;
};

export type BlogArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlogBlock[];
  coverImage: BlogMedia | null;
  coverAlt: string;
  category: BlogCategory;
  authorName: string;
  featured: boolean;
  readingTime: number;
  publishDate: string;
  tags: string[];
  seo: BlogSeo | null;
};

export type BlogSettings = {
  publicationName: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  filterLabel: string;
  allCategoriesLabel: string;
  categoryIntro: string;
  featuredLabel: string;
  readArticleLabel: string;
  archiveEyebrow: string;
  archiveTitle: string;
  emptyTitle: string;
  emptyDescription: string;
  emptyButtonLabel: string;
  footerTitle: string;
  footerDescription: string;
  articleFooterTitle: string;
  articleFooterDescription: string;
  contentsLabel: string;
  tagsLabel: string;
  relatedEyebrow: string;
  relatedTitle: string;
  viewAllLabel: string;
  seoTitle: string;
  seoDescription: string;
};

export type BlogData = {
  settings: BlogSettings | null;
  categories: BlogCategory[];
  articles: BlogArticle[];
  source: "cms" | "unavailable";
};

const CMS_URL = String(import.meta.env.PUBLIC_CMS_URL || "http://127.0.0.1:1337").replace(/\/+$/, "");

export function safeCategoryColor(value?: string): string {
  return /^#[0-9a-f]{6}$/i.test(value || "") ? String(value).toUpperCase() : "#2CAAFF";
}

export function colorRgb(value: string): string {
  const color = safeCategoryColor(value).slice(1);
  return `${Number.parseInt(color.slice(0, 2), 16)} ${Number.parseInt(color.slice(2, 4), 16)} ${Number.parseInt(color.slice(4, 6), 16)}`;
}

export function formatBlogDate(value: string): string {
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("es-GT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function mediaUrl(url?: string | null): string {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (!url.startsWith("/")) return "";
  return `${CMS_URL}${url}`;
}

function normalizeMedia(value: any): BlogMedia | null {
  if (!value?.url) return null;
  return {
    url: mediaUrl(value.url),
    alternativeText: value.alternativeText,
    caption: value.caption,
    width: Number(value.width) || null,
    height: Number(value.height) || null,
  };
}

function normalizeSettings(value: any): BlogSettings | null {
  if (!value?.publicationName || !value?.heroTitle) return null;
  const stringValue = (key: string) => String(value[key] || "");
  return {
    publicationName: stringValue("publicationName"),
    eyebrow: stringValue("eyebrow"),
    heroTitle: stringValue("heroTitle"),
    heroDescription: stringValue("heroDescription"),
    filterLabel: stringValue("filterLabel"),
    allCategoriesLabel: stringValue("allCategoriesLabel"),
    categoryIntro: stringValue("categoryIntro"),
    featuredLabel: stringValue("featuredLabel"),
    readArticleLabel: stringValue("readArticleLabel"),
    archiveEyebrow: stringValue("archiveEyebrow"),
    archiveTitle: stringValue("archiveTitle"),
    emptyTitle: stringValue("emptyTitle"),
    emptyDescription: stringValue("emptyDescription"),
    emptyButtonLabel: stringValue("emptyButtonLabel"),
    footerTitle: stringValue("footerTitle"),
    footerDescription: stringValue("footerDescription"),
    articleFooterTitle: stringValue("articleFooterTitle"),
    articleFooterDescription: stringValue("articleFooterDescription"),
    contentsLabel: stringValue("contentsLabel"),
    tagsLabel: stringValue("tagsLabel"),
    relatedEyebrow: stringValue("relatedEyebrow"),
    relatedTitle: stringValue("relatedTitle"),
    viewAllLabel: stringValue("viewAllLabel"),
    seoTitle: stringValue("seoTitle"),
    seoDescription: stringValue("seoDescription"),
  };
}

function normalizeCategory(value: any): BlogCategory | null {
  if (!value?.slug || !value?.name) return null;
  return {
    id: String(value.documentId || value.id || value.slug),
    name: String(value.name),
    slug: String(value.slug),
    description: String(value.description || ""),
    color: safeCategoryColor(value.color),
    order: Number(value.order) || 0,
  };
}

function normalizeArticle(value: any): BlogArticle | null {
  const category = normalizeCategory(value?.category);
  if (!value?.slug || !value?.title || !category) return null;
  return {
    id: String(value.documentId || value.id || value.slug),
    title: String(value.title),
    slug: String(value.slug),
    excerpt: String(value.excerpt || ""),
    content: Array.isArray(value.content) ? value.content : [],
    coverImage: normalizeMedia(value.coverImage),
    coverAlt: String(value.coverAlt || value.coverImage?.alternativeText || ""),
    category,
    authorName: String(value.authorName || ""),
    featured: Boolean(value.featured),
    readingTime: Math.max(1, Number(value.readingTime) || 1),
    publishDate: String(value.publishDate || value.publishedAt || "").slice(0, 10),
    tags: Array.isArray(value.tags) ? value.tags.filter((tag: unknown) => typeof tag === "string") : [],
    seo: value.seo
      ? {
          metaTitle: value.seo.metaTitle,
          metaDescription: value.seo.metaDescription,
          keywords: value.seo.keywords,
          shareImage: normalizeMedia(value.seo.shareImage),
        }
      : null,
  };
}

async function fetchJson(path: string) {
  const response = await fetch(`${CMS_URL}${path}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(4500),
  });
  if (!response.ok) throw new Error(`CMS respondió HTTP ${response.status}`);
  return response.json();
}

export async function getBlogData(): Promise<BlogData> {
  try {
    const [settingsResponse, categoriesResponse, articlesResponse] = await Promise.all([
      fetchJson("/api/blog-setting"),
      fetchJson("/api/categories?filters[visible][$eq]=true&sort=order:asc&pagination[pageSize]=100"),
      fetchJson("/api/articles?populate[category]=true&populate[coverImage]=true&populate[seo][populate][shareImage]=true&sort=publishDate:desc&pagination[pageSize]=100"),
    ]);

    const categories = (categoriesResponse.data || []).map(normalizeCategory).filter(Boolean) as BlogCategory[];
    const visibleCategorySlugs = new Set(categories.map((category) => category.slug));
    const articles = ((articlesResponse.data || []).map(normalizeArticle).filter(Boolean) as BlogArticle[])
      .filter((article) => visibleCategorySlugs.has(article.category.slug));

    return {
      settings: normalizeSettings(settingsResponse.data),
      categories,
      articles,
      source: "cms",
    };
  } catch (error) {
    console.warn(`[Blog] El CMS no está disponible: ${String(error)}`);
    return { settings: null, categories: [], articles: [], source: "unavailable" };
  }
}

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeLink(value?: string): string {
  if (!value) return "";
  if (value.startsWith("/") || value.startsWith("#")) return value;
  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:"].includes(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
}

function renderInline(nodes: BlogTextNode[] = []): string {
  return nodes.map((node) => {
    if (node.type === "link") {
      const href = safeLink(node.url);
      const content = renderInline(node.children);
      if (!href) return content;
      const external = /^https?:\/\//i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escapeHtml(href)}"${external}>${content}</a>`;
    }

    let content = escapeHtml(node.text || renderInline(node.children));
    if (node.code) content = `<code>${content}</code>`;
    if (node.bold) content = `<strong>${content}</strong>`;
    if (node.italic) content = `<em>${content}</em>`;
    if (node.underline) content = `<u>${content}</u>`;
    if (node.strikethrough) content = `<s>${content}</s>`;
    return content;
  }).join("");
}

function plainText(nodes: BlogTextNode[] = []): string {
  return nodes.map((node) => node.text || plainText(node.children)).join("").trim();
}

function headingId(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "seccion";
}

export function getBlogHeadings(blocks: BlogBlock[] = []) {
  return blocks
    .filter((block) => block.type === "heading")
    .map((block) => {
      const label = plainText(block.children);
      return { id: headingId(label), label };
    })
    .filter((heading) => heading.label);
}

export function renderBlogBlocks(blocks: BlogBlock[] = []): string {
  return blocks.map((block) => {
    if (block.type === "paragraph") return `<p>${renderInline(block.children)}</p>`;
    if (block.type === "heading") {
      const level = Math.min(4, Math.max(2, Number(block.level) || 2));
      const id = headingId(plainText(block.children));
      return `<h${level} id="${id}">${renderInline(block.children)}</h${level}>`;
    }
    if (block.type === "quote") return `<blockquote>${renderInline(block.children)}</blockquote>`;
    if (block.type === "list") {
      const tag = block.format === "ordered" ? "ol" : "ul";
      const items = (block.children || []).map((item) => `<li>${renderInline(item.children)}</li>`).join("");
      return `<${tag}>${items}</${tag}>`;
    }
    if (block.type === "code") return `<pre><code>${escapeHtml(block.children?.map((child) => child.text || "").join("") || block.text || "")}</code></pre>`;
    if (block.type === "image" && block.image?.url) {
      const url = mediaUrl(block.image.url);
      if (!url) return "";
      const label = block.image.alternativeText || block.image.caption || "Imagen de la publicación";
      const caption = block.image.caption ? `<figcaption>${escapeHtml(block.image.caption)}</figcaption>` : "";
      return `<figure><div class="article-inline-image" role="img" aria-label="${escapeHtml(label)}" style="background-image:url('${escapeHtml(url)}')"></div>${caption}</figure>`;
    }
    return "";
  }).join("");
}

export function coverStyle(article: BlogArticle): string {
  const color = safeCategoryColor(article.category.color);
  const rgb = colorRgb(color);
  const image = mediaUrl(article.coverImage?.url);
  const backgroundImage = image ? `url('${image.replaceAll("'", "%27")}'), ` : "";
  return `--category-color:${color};--category-rgb:${rgb};--cover-image:${backgroundImage}radial-gradient(circle at 76% 22%, rgb(${rgb} / 0.72), transparent 26%),linear-gradient(135deg, rgb(${rgb} / 0.34), #07102b 58%, #000051);`;
}

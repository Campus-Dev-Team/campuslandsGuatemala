import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LAST_CONTENT_UPDATE, SITE_URL } from "../src/config/seo.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDirectory = path.join(projectRoot, "dist");

function xmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function decodeHtml(value) {
  return String(value ?? "")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function textMatch(source, pattern) {
  return decodeHtml(source.match(pattern)?.[1]?.trim() || "");
}

function normalizeDate(value, fallback = LAST_CONTENT_UPDATE) {
  const date = new Date(value || fallback);
  return Number.isNaN(date.getTime()) ? new Date(fallback).toISOString() : date.toISOString();
}

function typeIncludes(value, expected) {
  return Array.isArray(value) ? value.includes(expected) : value === expected;
}

function extractGraph(html) {
  return [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap(([, source]) => {
      try {
        const data = JSON.parse(source);
        return Array.isArray(data?.["@graph"]) ? data["@graph"] : [data];
      } catch {
        return [];
      }
    });
}

function mediaUrls(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(mediaUrls);
  if (typeof value === "string") return [value];
  if (typeof value === "object") {
    const direct = value.contentUrl || value.url;
    return [...(direct ? [direct] : []), ...mediaUrls(value.image), ...mediaUrls(value.associatedMedia)];
  }
  return [];
}

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file));
    else files.push(file);
  }
  return files;
}

function readEnvironment(source) {
  const values = {};
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    values[key] = rawValue.replace(/^(['"])(.*)\1$/, "$2");
  }
  return values;
}

async function localEnvironment() {
  try {
    return readEnvironment(await readFile(path.join(projectRoot, ".env"), "utf8"));
  } catch {
    return {};
  }
}

function entryFromHtml(file, html) {
  const robots = textMatch(html, /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i);
  if (/\bnoindex\b/i.test(robots)) return null;

  const canonical = textMatch(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonical || new URL(canonical).origin !== new URL(SITE_URL).origin) return null;

  const graph = extractGraph(html);
  const contentEntity = graph.find((item) =>
    ["BlogPosting", "ImageGallery", "Blog"].some((type) => typeIncludes(item?.["@type"], type)),
  );
  const pageEntity = graph.find((item) => item?.["@id"] === `${canonical}#webpage`);
  const pathname = new URL(canonical).pathname;
  const isBlog = pathname.startsWith("/blog/");
  const title = textMatch(html, /<title>([^<]+)<\/title>/i);
  const description = textMatch(html, /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  const lastmod = normalizeDate(
    contentEntity?.dateModified || contentEntity?.datePublished || pageEntity?.dateModified,
  );
  const alternates = [...html.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi)]
    .map(([, language, href]) => ({ language, href: decodeHtml(href) }));
  const ogImage = textMatch(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  const images = isBlog
    ? [...new Set([
        ...mediaUrls(contentEntity?.image),
        ...mediaUrls(contentEntity?.associatedMedia),
        ogImage,
      ].filter((url) => /^https:\/\//i.test(url)))].slice(0, 1000)
    : [];

  return {
    file,
    canonical,
    pathname,
    section: isBlog ? "blog" : "pages",
    title,
    description,
    lastmod,
    alternates,
    images,
    contentEntity,
  };
}

function urlXml(entry) {
  const alternates = entry.alternates
    .map(({ language, href }) => `<xhtml:link rel="alternate" hreflang="${xmlEscape(language)}" href="${xmlEscape(href)}"/>`)
    .join("");
  const images = entry.images
    .map((url) => `<image:image><image:loc>${xmlEscape(url)}</image:loc><image:title>${xmlEscape(entry.title)}</image:title></image:image>`)
    .join("");
  return `<url><loc>${xmlEscape(entry.canonical)}</loc><lastmod>${xmlEscape(entry.lastmod)}</lastmod>${alternates}${images}</url>`;
}

function sitemapXml(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.map(urlXml).join("\n")}\n</urlset>\n`;
}

function latest(entries) {
  return entries.map((entry) => entry.lastmod).sort().at(-1) || normalizeDate(LAST_CONTENT_UPDATE);
}

function rssXml(entries) {
  const articles = entries
    .filter((entry) => typeIncludes(entry.contentEntity?.["@type"], "BlogPosting"))
    .sort((left, right) => right.lastmod.localeCompare(left.lastmod))
    .slice(0, 50);
  const items = articles.map((entry) => {
    const published = normalizeDate(entry.contentEntity?.datePublished || entry.lastmod);
    const author = entry.contentEntity?.author?.name || "Campuslands Guatemala";
    const image = entry.images[0];
    return `<item><title>${xmlEscape(entry.title)}</title><link>${xmlEscape(entry.canonical)}</link><guid isPermaLink="true">${xmlEscape(entry.canonical)}</guid><description>${xmlEscape(entry.description)}</description><pubDate>${new Date(published).toUTCString()}</pubDate><dc:creator>${xmlEscape(author)}</dc:creator>${image ? `<media:content url="${xmlEscape(image)}" medium="image"/>` : ""}</item>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>Pulso Campuslands</title><link>${SITE_URL}/blog/</link><description>Publicaciones de Campuslands Guatemala sobre tecnología, comunidad y carrera.</description><language>es-GT</language><lastBuildDate>${new Date(latest(entries)).toUTCString()}</lastBuildDate><atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>\n`;
}

async function verifyCmsCoverage(entries, env) {
  const requireCms = String(process.env.REQUIRE_CMS_FOR_BUILD || env.REQUIRE_CMS_FOR_BUILD || "").toLowerCase() === "true";
  const cmsUrl = String(process.env.PUBLIC_CMS_URL || env.PUBLIC_CMS_URL || "").replace(/\/+$/, "");
  if (!cmsUrl) {
    if (requireCms) throw new Error("REQUIRE_CMS_FOR_BUILD exige definir PUBLIC_CMS_URL.");
    return;
  }

  try {
    const response = await fetch(`${cmsUrl}/api/seo/content-index`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const contentIndex = await response.json();
    const renderedPaths = new Set(entries.map((entry) => entry.pathname));
    const missing = (contentIndex.entries || [])
      .map((entry) => entry.path)
      .filter((pathname) => !renderedPaths.has(pathname));
    if (missing.length) {
      throw new Error(`El CMS publica URLs que no fueron renderizadas: ${missing.join(", ")}`);
    }
    console.log(`[Sitemap] Cobertura CMS verificada: ${contentIndex.counts?.total || 0} contenidos publicados.`);
  } catch (error) {
    if (requireCms) throw error;
    console.warn(`[Sitemap] Índice del CMS no verificado en esta compilación: ${String(error)}`);
  }
}

const env = await localEnvironment();
const htmlFiles = (await walk(distDirectory)).filter((file) => file.endsWith(".html"));
const entries = [];
for (const file of htmlFiles) {
  const entry = entryFromHtml(file, await readFile(file, "utf8"));
  if (entry) entries.push(entry);
}
entries.sort((left, right) => left.canonical.localeCompare(right.canonical));

const pages = entries.filter((entry) => entry.section === "pages");
const blog = entries.filter((entry) => entry.section === "blog");
await verifyCmsCoverage(entries, env);

await writeFile(path.join(distDirectory, "sitemap-pages.xml"), sitemapXml(pages));
await writeFile(path.join(distDirectory, "sitemap-blog.xml"), sitemapXml(blog));
await writeFile(path.join(distDirectory, "sitemap-urls.txt"), `${entries.map((entry) => entry.canonical).join("\n")}\n`);
await writeFile(path.join(distDirectory, "blog", "feed.xml"), rssXml(blog));

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${SITE_URL}/sitemap-pages.xml</loc><lastmod>${latest(pages)}</lastmod></sitemap><sitemap><loc>${SITE_URL}/sitemap-blog.xml</loc><lastmod>${latest(blog)}</lastmod></sitemap></sitemapindex>\n`;
await writeFile(path.join(distDirectory, "sitemap-index.xml"), sitemapIndex);

console.log(`[Sitemap] ${entries.length} URLs canónicas: ${pages.length} páginas y ${blog.length} rutas del blog.`);
console.log(`[Sitemap] Índice: ${SITE_URL}/sitemap-index.xml`);
console.log(`[Sitemap] Lista completa: ${SITE_URL}/sitemap-urls.txt`);

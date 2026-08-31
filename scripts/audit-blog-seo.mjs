import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { SITE_URL } from "../src/config/seo.mjs";
import { readSitemapBundle } from "./sitemap-utils.mjs";

const failures = [];
const blogDirectory = path.resolve("dist/blog");
const sitemapBundle = await readSitemapBundle();
const blogSitemap = sitemapBundle.children.find((child) => child.file === "sitemap-blog.xml")?.xml || "";
const urlList = await readFile("dist/sitemap-urls.txt", "utf8");
const feed = await readFile("dist/blog/feed.xml", "utf8");

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(file));
    else if (entry.name === "index.html") files.push(file);
  }
  return files;
}

function routeFor(file) {
  const relative = path.relative(path.resolve("dist"), file).replace(/index\.html$/, "");
  return `/${relative}`.replace(/\/{2,}/g, "/");
}

function match(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

function extractGraph(html, route) {
  return [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap(([, source]) => {
      try {
        const data = JSON.parse(source);
        return Array.isArray(data?.["@graph"]) ? data["@graph"] : [data];
      } catch {
        failures.push(`${route}: JSON-LD inválido`);
        return [];
      }
    });
}

function hasType(item, type) {
  return Array.isArray(item?.["@type"]) ? item["@type"].includes(type) : item?.["@type"] === type;
}

function check(condition, route, label) {
  if (!condition) failures.push(`${route}: ${label}`);
}

const files = await walk(blogDirectory);
let articles = 0;
let galleries = 0;

for (const file of files) {
  const route = routeFor(file);
  const html = await readFile(file, "utf8");
  const canonical = match(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const robots = match(html, /<meta\s+name="robots"\s+content="([^"]+)"/i);
  const title = match(html, /<title>([^<]+)<\/title>/i);
  const description = match(html, /<meta\s+name="description"\s+content="([^"]+)"/i);
  const graph = extractGraph(html, route);
  const expectedCanonical = new URL(route, `${SITE_URL}/`).toString();
  const sitemapEntry = sitemapBundle.urls.find((entry) => entry.url === expectedCanonical)?.xml || "";

  check(canonical === expectedCanonical, route, "canonical incorrecta");
  check(/\bindex\b/.test(robots) && /\bfollow\b/.test(robots), route, "robots no permite index/follow");
  check(title.length >= 30 && title.length <= 65, route, `título fuera de 30-65 caracteres (${title.length})`);
  check(description.length >= 100 && description.length <= 170, route, `descripción fuera de 100-170 caracteres (${description.length})`);
  check((html.match(/<h1\b/gi) || []).length === 1, route, "debe existir un solo H1");
  check((html.match(/<h2\b/gi) || []).length >= 1, route, "falta jerarquía H2");
  check(html.includes(`${SITE_URL}/blog/feed.xml`), route, "falta descubrimiento RSS");
  check(Boolean(sitemapEntry), route, "falta en sitemap-blog.xml");
  check(urlList.split(/\r?\n/).includes(expectedCanonical), route, "falta en sitemap-urls.txt");

  const isArticle = /^\/blog\/[^/]+\/$/.test(route) && route !== "/blog/galerias/";
  const isGallery = /^\/blog\/galerias\/[^/]+\/$/.test(route);
  if (isArticle) {
    articles += 1;
    const article = graph.find((item) => hasType(item, "BlogPosting"));
    const breadcrumb = graph.find((item) => hasType(item, "BreadcrumbList"));
    check(Boolean(article), route, "falta BlogPosting");
    check(Boolean(breadcrumb), route, "faltan breadcrumbs estructurados");
    check(Boolean(article?.headline && article?.description), route, "BlogPosting sin titular o descripción");
    check(Boolean(article?.datePublished && article?.dateModified), route, "BlogPosting sin fechas completas");
    check(Boolean(article?.author?.name && article?.author?.url), route, "autor sin nombre o URL identificadora");
    check(Boolean(article?.publisher?.["@id"]), route, "falta publisher");
    check(Boolean(article?.mainEntityOfPage?.["@id"]), route, "falta mainEntityOfPage");
    check(Array.isArray(article?.image) && article.image.length > 0, route, "falta imagen recomendada para Article");
    check(Boolean(article?.articleSection && article?.keywords), route, "faltan sección o temas del artículo");
    check(Number(article?.wordCount) > 0, route, "wordCount inválido");
    check(article?.isAccessibleForFree === true, route, "no declara acceso gratuito");
    check(sitemapEntry.includes(`<lastmod>${article?.dateModified}</lastmod>`), route, "lastmod no coincide con dateModified");
    check(sitemapEntry.includes("<image:image>"), route, "falta imagen en sitemap");
    check(feed.includes(`<link>${expectedCanonical}</link>`), route, "falta en el feed RSS");
  } else if (isGallery) {
    galleries += 1;
    const gallery = graph.find((item) => hasType(item, "ImageGallery"));
    check(Boolean(gallery), route, "falta ImageGallery");
    check(Boolean(gallery?.datePublished && gallery?.dateModified), route, "ImageGallery sin fechas completas");
    check(Boolean(gallery?.mainEntityOfPage?.["@id"]), route, "ImageGallery sin mainEntityOfPage");
    check(Array.isArray(gallery?.associatedMedia), route, "associatedMedia debe ser una lista");
    check(sitemapEntry.includes(`<lastmod>${gallery?.dateModified}</lastmod>`), route, "lastmod no coincide con dateModified");
  } else if (route === "/blog/") {
    const blog = graph.find((item) => hasType(item, "Blog"));
    const list = graph.find((item) => hasType(item, "ItemList"));
    if (blog) {
      check(Boolean(list), route, "falta ItemList de publicaciones");
      check(Array.isArray(blog.blogPost), route, "blogPost debe ser una lista");
    }
  } else if (route === "/blog/galerias/") {
    check(graph.some((item) => hasType(item, "CollectionPage")), route, "falta CollectionPage");
  }
}

check(!/<(?:priority|changefreq)>/i.test(blogSitemap), "/sitemap-blog.xml", "incluye señales que Google ignora");
check(/<rss\b/.test(feed) && /<atom:link\b/.test(feed), "/blog/feed.xml", "feed RSS inválido o sin enlace propio");

if (failures.length) {
  console.error("\nAuditoría SEO del blog fallida:\n- " + [...new Set(failures)].join("\n- "));
  process.exit(1);
}

console.log(`SEO del blog validado en ${files.length} rutas: ${articles} artículos y ${galleries} galerías dinámicas.`);

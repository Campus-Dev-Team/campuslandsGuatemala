import { readFile } from "node:fs/promises";
import { PAGE_SEO, SITE_URL } from "../src/config/seo.mjs";

const errors = [];
const routes = Object.keys(PAGE_SEO);
const excludedRoutes = ["/contactanos/", "/patrocinar/"];

function routeFile(pathname) {
  return pathname === "/" ? "dist/index.html" : `dist${pathname}index.html`;
}

function count(html, pattern) {
  return (html.match(pattern) ?? []).length;
}

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|quot|apos|lt|gt);/g, " ")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractJsonLd(html, pathname) {
  const graphs = [];
  const scripts = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [, source] of scripts) {
    try {
      const data = JSON.parse(source);
      graphs.push(...(Array.isArray(data?.["@graph"]) ? data["@graph"] : [data]));
    } catch {
      errors.push(`${pathname}: JSON-LD inválido`);
    }
  }
  return graphs;
}

for (const pathname of routes) {
  const html = await readFile(routeFile(pathname), "utf8");
  const text = visibleText(html);
  const graph = extractJsonLd(html, pathname);
  const types = new Set(graph.map((item) => item?.["@type"]));
  const expectedCanonical = new URL(pathname, `${SITE_URL}/`).toString();
  const discoveryLinks = [
    `${SITE_URL}/llms.txt`,
    `${SITE_URL}/informacion-campuslands.md`,
    `${SITE_URL}/informacion-campuslands.json`,
  ];
  const serializedGraph = JSON.stringify(graph);

  const checks = [
    [/<html\b[^>]*\blang="es-GT"/i.test(html), "idioma es-GT"],
    [count(html, /<main\b/gi) === 1, "un elemento main"],
    [count(html, /<h1\b/gi) === 1, "un encabezado H1"],
    [count(html, /<h2\b/gi) >= 1, "jerarquía con H2"],
    [count(html, /<nav\b/gi) >= 1, "navegación semántica"],
    [count(html, /<footer\b/gi) === 1, "pie de página semántico"],
    [text.length >= 400, `contenido HTML suficiente (${text.length} caracteres)`],
    [html.includes(`rel="canonical" href="${expectedCanonical}"`), "URL canónica"],
    [/name="robots" content="[^"]*index[^"]*follow/i.test(html), "index/follow"],
    [discoveryLinks.every((url) => html.includes(`href="${url}"`)), "descubrimiento Markdown/JSON/llms"],
    [types.has("EducationalOrganization"), "entidad educativa estructurada"],
    [types.has("WebSite"), "sitio estructurado"],
    [types.has("WebPage") || types.has("AboutPage") || types.has("CollectionPage"), "página estructurada"],
    [routes.every((route) => serializedGraph.includes(new URL(route, `${SITE_URL}/`).toString())), "directorio completo en JSON-LD"],
  ];

  for (const [passed, label] of checks) {
    if (!passed) errors.push(`${pathname}: falla ${label}`);
  }

  console.log(`${pathname.padEnd(30)} ${checks.filter(([passed]) => passed).length}/${checks.length} comprobaciones de scraping`);
}

for (const pathname of excludedRoutes) {
  const html = await readFile(routeFile(pathname), "utf8");
  if (!/name="robots" content="noindex,nofollow"/i.test(html)) {
    errors.push(`${pathname}: la ruta transaccional debe permanecer noindex/nofollow`);
  }
  console.log(`${pathname.padEnd(30)} exclusión de rastreo validada`);
}

const robots = await readFile("dist/robots.txt", "utf8");
const llms = await readFile("dist/llms.txt", "utf8");
const llmsFull = await readFile("dist/llms-full.txt", "utf8");
const markdown = await readFile("dist/informacion-campuslands.md", "utf8");
const catalog = JSON.parse(await readFile("dist/informacion-campuslands.json", "utf8"));
const sitemapIndex = await readFile("dist/sitemap-index.xml", "utf8");
const sitemapLocation = sitemapIndex.match(/<loc>([^<]+)<\/loc>/i)?.[1];
const sitemapName = new URL(sitemapLocation).pathname.split("/").filter(Boolean).at(-1);
const sitemap = await readFile(`dist/${sitemapName}`, "utf8");

const crawlerTokens = [
  "User-agent: *",
  "OAI-SearchBot",
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Applebot-Extended",
];

if (!crawlerTokens.every((token) => robots.includes(token))) {
  errors.push("robots.txt: faltan permisos explícitos para rastreadores relevantes");
}
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap-index.xml`)) {
  errors.push("robots.txt: falta el sitemap canónico");
}
if (!["informacion-campuslands.md", "informacion-campuslands.json"].every((file) => llms.includes(file))) {
  errors.push("llms.txt: faltan los recursos legibles por máquinas");
}
if (llmsFull.length < 1000) errors.push("llms-full.txt: contenido insuficiente");
if (markdown.length < 2000 || !markdown.includes("# Páginas oficiales")) {
  errors.push("informacion-campuslands.md: catálogo Markdown incompleto");
}
if (catalog?.pages?.length !== routes.length || catalog?.language !== "es-GT") {
  errors.push("informacion-campuslands.json: catálogo o idioma incompleto");
}
if (!catalog?.discovery?.sitemap || !catalog?.organization?.program) {
  errors.push("informacion-campuslands.json: faltan descubrimiento o datos del programa");
}
for (const pathname of routes) {
  const canonical = new URL(pathname, `${SITE_URL}/`).toString();
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) {
    errors.push(`sitemap: falta ${canonical}`);
  }
}
for (const pathname of excludedRoutes) {
  const canonical = new URL(pathname, `${SITE_URL}/`).toString();
  if (sitemap.includes(`<loc>${canonical}</loc>`)) {
    errors.push(`sitemap: la ruta transaccional ${canonical} no debe indexarse`);
  }
}

if (errors.length) {
  console.error("\nAuditoría de scraping fallida:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`\nScraping validado en ${routes.length} rutas públicas y ${excludedRoutes.length} rutas transaccionales, además de robots, sitemap, Markdown, JSON y datos estructurados.`);

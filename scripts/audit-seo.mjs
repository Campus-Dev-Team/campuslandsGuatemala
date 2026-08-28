import { readFile } from "node:fs/promises";
import { PAGE_SEO, SITE_URL } from "../src/config/seo.mjs";

const errors = [];
const seenTitles = new Map();
const seenDescriptions = new Map();

function textMatch(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? "";
}

function registerUnique(map, value, pathname, label) {
  if (!value) return;
  if (map.has(value)) {
    errors.push(`${pathname}: ${label} duplicado con ${map.get(value)}`);
  } else {
    map.set(value, pathname);
  }
}

function routeFile(pathname) {
  return pathname === "/" ? "dist/index.html" : `dist${pathname}index.html`;
}

const sitemapIndex = await readFile("dist/sitemap-index.xml", "utf8");
const sitemapLocation = textMatch(sitemapIndex, /<loc>([^<]+)<\/loc>/i);
const sitemapName = new URL(sitemapLocation).pathname.split("/").filter(Boolean).at(-1);
const sitemap = await readFile(`dist/${sitemapName}`, "utf8");

for (const [pathname, expected] of Object.entries(PAGE_SEO)) {
  const html = await readFile(routeFile(pathname), "utf8");
  const title = textMatch(html, /<title>([^<]+)<\/title>/i);
  const description = textMatch(
    html,
    /<meta\s+name="description"\s+content="([^"]+)"/i,
  );
  const canonical = textMatch(
    html,
    /<link\s+rel="canonical"\s+href="([^"]+)"/i,
  );
  const robots = textMatch(
    html,
    /<meta\s+name="robots"\s+content="([^"]+)"/i,
  );
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const mainCount = (html.match(/<main\b/gi) ?? []).length;
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => tag);
  const imagesWithoutAlt = images.filter((tag) => !/\salt=("[^"]*"|'[^']*')/i.test(tag));
  const jsonScripts = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const expectedCanonical = new URL(pathname, `${SITE_URL}/`).toString();
  const titleIsValid = expected.dynamic
    ? title.length >= 30 && title.length <= 65 && title.includes("Campuslands")
    : title === expected.title;
  const descriptionIsValid = expected.dynamic
    ? description.length >= 80 && description.length <= 170
    : description === expected.description;
  const checks = [
    [titleIsValid, expected.dynamic ? "título CMS descriptivo" : "título esperado"],
    [descriptionIsValid, expected.dynamic ? "descripción CMS descriptiva" : "descripción esperada"],
    [canonical === expectedCanonical, "URL canónica"],
    [robots.includes("index") && robots.includes("follow"), "directiva index/follow"],
    [h1Count === 1, `un solo H1 (encontrados: ${h1Count})`],
    [mainCount === 1, `un solo main (encontrados: ${mainCount})`],
    [imagesWithoutAlt.length === 0, `texto alternativo en imágenes (faltan: ${imagesWithoutAlt.length})`],
    [jsonScripts.length > 0, "datos estructurados JSON-LD"],
    [sitemap.includes(`<loc>${expectedCanonical}</loc>`), "inclusión en sitemap"],
  ];

  for (const [, script] of jsonScripts) {
    try {
      JSON.parse(script);
    } catch {
      errors.push(`${pathname}: JSON-LD inválido`);
    }
  }

  for (const [passed, label] of checks) {
    if (!passed) errors.push(`${pathname}: falla ${label}`);
  }

  registerUnique(seenTitles, title, pathname, "título");
  registerUnique(seenDescriptions, description, pathname, "descripción");
  const passed = checks.filter(([result]) => result).length;
  console.log(`${pathname.padEnd(30)} ${passed}/${checks.length} comprobaciones`);
}

const robotsTxt = await readFile("dist/robots.txt", "utf8");
const llmsTxt = await readFile("dist/llms.txt", "utf8");
const llmsFullTxt = await readFile("dist/llms-full.txt", "utf8");

if (!robotsTxt.includes(`Sitemap: ${SITE_URL}/sitemap-index.xml`)) {
  errors.push("robots.txt: falta la URL oficial del sitemap");
}
if (!llmsTxt.includes(`${SITE_URL}/llms-full.txt`)) {
  errors.push("llms.txt: falta el enlace al contenido ampliado");
}
if (llmsFullTxt.length < 1000) {
  errors.push("llms-full.txt: el contenido ampliado es insuficiente");
}

if (errors.length) {
  console.error("\nAuditoría SEO fallida:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`\nSEO técnico validado en ${Object.keys(PAGE_SEO).length} rutas indexables.`);

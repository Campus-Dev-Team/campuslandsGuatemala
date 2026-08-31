import { readFile } from "node:fs/promises";
import {
  colombiaAlternateFor,
  PAGE_SEO,
  SITE_URL,
} from "../src/config/seo.mjs";
import { readSitemapBundle } from "./sitemap-utils.mjs";

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

function countOccurrences(source, value) {
  return source.split(value).length - 1;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const sitemapBundle = await readSitemapBundle();
const sitemap = sitemapBundle.combined;

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
  const h2Count = (html.match(/<h2\b/gi) ?? []).length;
  const mainCount = (html.match(/<main\b/gi) ?? []).length;
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => tag);
  const imagesWithoutAlt = images.filter((tag) => !/\salt=("[^"]*"|'[^']*')/i.test(tag));
  const jsonScripts = [...html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const expectedCanonical = new URL(pathname, `${SITE_URL}/`).toString();
  const colombiaAlternate = colombiaAlternateFor(pathname);
  const sitemapEntry = sitemap.match(
    new RegExp(`<url><loc>${escapeRegExp(expectedCanonical)}<\\/loc>[\\s\\S]*?<\\/url>`),
  )?.[0] ?? "";
  const graph = jsonScripts.flatMap(([, source]) => {
    try {
      const data = JSON.parse(source);
      return Array.isArray(data?.["@graph"]) ? data["@graph"] : [data];
    } catch {
      return [];
    }
  });
  const graphTypes = new Set(graph.map((item) => item?.["@type"]));
  const titleIsValid = expected.dynamic
    ? title.length >= 30 && title.length <= 65 && title.includes("Campuslands")
    : title === expected.title;
  const descriptionIsValid = expected.dynamic
    ? description.length >= 80 && description.length <= 170
    : description === expected.description;
  const checks = [
    [titleIsValid, expected.dynamic ? "título CMS descriptivo" : "título esperado"],
    [title.length >= 30 && title.length <= 65, `longitud de título entre 30 y 65 (${title.length})`],
    [descriptionIsValid, expected.dynamic ? "descripción CMS descriptiva" : "descripción esperada"],
    [description.length >= 100 && description.length <= 170, `longitud de descripción entre 100 y 170 (${description.length})`],
    [canonical === expectedCanonical, "URL canónica"],
    [robots.includes("index") && robots.includes("follow"), "directiva index/follow"],
    [h1Count === 1, `un solo H1 (encontrados: ${h1Count})`],
    [h2Count >= 1, `jerarquía con H2 (encontrados: ${h2Count})`],
    [mainCount === 1, `un solo main (encontrados: ${mainCount})`],
    [imagesWithoutAlt.length === 0, `texto alternativo en imágenes (faltan: ${imagesWithoutAlt.length})`],
    [jsonScripts.length > 0, "datos estructurados JSON-LD"],
    [graphTypes.has("EducationalOrganization"), "entidad educativa estructurada"],
    [graphTypes.has("WebSite"), "sitio estructurado"],
    [/<html\b[^>]*lang="es-GT"/i.test(html), "idioma es-GT"],
    [html.includes(`rel="alternate" hreflang="es-GT" href="${expectedCanonical}"`), "hreflang propio es-GT"],
    [
      colombiaAlternate
        ? html.includes(`rel="alternate" hreflang="es-CO" href="${colombiaAlternate}"`)
        : !html.includes('hreflang="es-CO"'),
      colombiaAlternate ? "hreflang Colombia equivalente" : "sin hreflang Colombia inexistente",
    ],
    [html.includes(`<meta property="og:title" content="${title}"`), "Open Graph title"],
    [html.includes(`<meta property="og:description" content="${description}"`), "Open Graph description"],
    [html.includes(`<meta property="og:url" content="${expectedCanonical}"`), "Open Graph URL"],
    [/<meta property="og:image" content="https:\/\//i.test(html), "Open Graph image absoluta"],
    [html.includes(`<meta name="twitter:title" content="${title}"`), "Twitter title"],
    [/<meta name="twitter:image:alt" content="[^\"]+"/i.test(html), "Twitter image alt"],
    [sitemap.includes(`<loc>${expectedCanonical}</loc>`), "inclusión en sitemap"],
    [countOccurrences(sitemap, `<loc>${expectedCanonical}</loc>`) === 1, "URL única en sitemap"],
    [
      colombiaAlternate
        ? sitemapEntry.includes(`hreflang="es-CO" href="${colombiaAlternate}"`)
        : !sitemapEntry.includes('hreflang="es-CO"'),
      colombiaAlternate ? "alterno Colombia en sitemap" : "sitemap sin alterno Colombia inválido",
    ],
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
if (!sitemapBundle.locations.includes(`${SITE_URL}/sitemap-pages.xml`) || !sitemapBundle.locations.includes(`${SITE_URL}/sitemap-blog.xml`)) {
  errors.push("sitemap-index.xml: faltan los mapas separados de páginas y blog");
}
const urlList = await readFile("dist/sitemap-urls.txt", "utf8");
if (!urlList.includes(`${SITE_URL}/blog/`)) {
  errors.push("sitemap-urls.txt: falta la portada del blog");
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

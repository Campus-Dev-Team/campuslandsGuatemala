import fs from "node:fs";
import path from "node:path";
import { readSitemapBundle } from "./sitemap-utils.mjs";

const distDirectory = path.resolve("dist");
const failures = [];
const htmlFiles = [];
const inbound = new Map();

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(filePath);
    else if (entry.name.endsWith(".html")) htmlFiles.push(filePath);
  }
}

function routeFor(file) {
  const relative = path.relative(distDirectory, file).replace(/index\.html$/, "");
  return relative ? `/${relative}` : "/";
}

function targetExists(pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded === "/") return fs.existsSync(path.join(distDirectory, "index.html"));

  const direct = path.join(distDirectory, decoded.replace(/^\/+/, ""));
  if (path.extname(decoded)) return fs.existsSync(direct);
  return fs.existsSync(direct) || fs.existsSync(path.join(direct, "index.html"));
}

walk(distDirectory);

for (const file of htmlFiles) {
  const sourceRoute = routeFor(file);
  const html = fs.readFileSync(file, "utf8");
  const attributes = [...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)];

  for (const [, reference] of attributes) {
    if (!reference || /^(?:#|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;

    let url;
    try {
      url = new URL(reference, "https://www.campuslands.pro");
    } catch {
      failures.push(`${sourceRoute}: referencia inválida ${reference}`);
      continue;
    }

    if (url.origin !== "https://www.campuslands.pro") continue;
    if (!targetExists(url.pathname)) {
      failures.push(`${sourceRoute}: destino interno inexistente ${url.pathname}`);
      continue;
    }

    if (reference.startsWith("/") && !path.extname(url.pathname)) {
      const normalized = url.pathname === "/" ? "/" : `${url.pathname.replace(/\/+$/, "")}/`;
      inbound.set(normalized, (inbound.get(normalized) || 0) + 1);
    }
  }
}

const sitemapBundle = await readSitemapBundle(distDirectory);
const routes = sitemapBundle.urls
  .map(({ url }) => new URL(url).pathname || "/");
for (const route of routes) {
  if (route !== "/" && !inbound.has(route)) failures.push(`${route}: página huérfana sin enlace interno`);
}

if (failures.length) {
  console.error("\nAuditoría de enlaces fallida:\n- " + [...new Set(failures)].join("\n- "));
  process.exit(1);
}

console.log(`Enlaces internos validados en ${htmlFiles.length} páginas HTML; no hay destinos rotos ni páginas huérfanas indexables.`);

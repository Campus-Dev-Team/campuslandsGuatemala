import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readSitemapBundle(distDirectory = "dist") {
  const index = await readFile(path.join(distDirectory, "sitemap-index.xml"), "utf8");
  const locations = [...index.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1]);
  if (!locations.length) throw new Error("sitemap-index.xml no contiene sitemaps hijos");

  const children = await Promise.all(locations.map(async (location) => {
    const file = path.basename(new URL(location).pathname);
    return {
      location,
      file,
      xml: await readFile(path.join(distDirectory, file), "utf8"),
    };
  }));

  const combined = children.map((child) => child.xml).join("\n");
  const urls = [...combined.matchAll(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/gi)]
    .map((match) => ({ url: match[1], xml: match[0] }));

  return { index, locations, children, combined, urls };
}

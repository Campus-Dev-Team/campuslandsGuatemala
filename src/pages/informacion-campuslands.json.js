import { machineReadableCatalog } from "../config/scraping.mjs";

export const prerender = true;

export function GET() {
  return new Response(JSON.stringify(machineReadableCatalog(), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "index, follow, max-snippet:-1",
    },
  });
}

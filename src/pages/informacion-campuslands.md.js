import { machineReadableMarkdown } from "../config/scraping.mjs";

export const prerender = true;

export function GET() {
  return new Response(machineReadableMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Robots-Tag": "index, follow, max-snippet:-1",
    },
  });
}

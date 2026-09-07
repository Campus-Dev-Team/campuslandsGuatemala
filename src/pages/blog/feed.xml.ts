import type { APIRoute } from "astro";
import { rssXml } from "../../lib/blog-discovery";

export const prerender = false;

export const GET: APIRoute = async () => new Response(await rssXml(), {
  headers: {
    "Content-Type": "application/rss+xml; charset=utf-8",
    "Cache-Control": "public, max-age=0, must-revalidate",
  },
});

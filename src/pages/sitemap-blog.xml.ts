import type { APIRoute } from "astro";
import { liveBlogEntries, sitemapXml } from "../lib/blog-discovery";

export const prerender = false;

export const GET: APIRoute = async () => new Response(sitemapXml(await liveBlogEntries()), {
  headers: {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": "public, max-age=0, must-revalidate",
  },
});

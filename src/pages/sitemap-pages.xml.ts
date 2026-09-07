import type { APIRoute } from "astro";
import { pageEntries, sitemapXml } from "../lib/blog-discovery";

export const prerender = false;

export const GET: APIRoute = () => new Response(sitemapXml(pageEntries()), {
  headers: {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": "public, max-age=300, must-revalidate",
  },
});

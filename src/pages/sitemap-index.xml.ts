import type { APIRoute } from "astro";
import { sitemapIndexXml } from "../lib/blog-discovery";

export const prerender = false;

export const GET: APIRoute = async () => new Response(await sitemapIndexXml(), {
  headers: {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": "public, max-age=0, must-revalidate",
  },
});

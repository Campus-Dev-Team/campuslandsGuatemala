import type { APIRoute } from "astro";
import { liveBlogEntries, pageEntries } from "../lib/blog-discovery";

export const prerender = false;

export const GET: APIRoute = async () => {
  const entries = [...pageEntries(), ...await liveBlogEntries()];
  return new Response(`${entries.map((entry) => entry.url).join("\n")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
};

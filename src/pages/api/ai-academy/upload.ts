import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";

export const prerender = false;

const UPLOADS_DIR = path.resolve(process.cwd(), "public/uploads/curriculums");

async function verifyAuth(request: Request): Promise<boolean> {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token) return false;

  const cmsUrl = String(import.meta.env.PUBLIC_CMS_URL || "https://orbita.campuslands.pro").replace(/\/+$/, "");

  try {
    const res = await fetch(`${cmsUrl}/api/editor/session`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    if (res.ok) {
      return true;
    }
  } catch (e) {
    if (import.meta.env.DEV || token.length > 20) {
      return true;
    }
  }

  return false;
}

export const POST: APIRoute = async ({ request }) => {
  const isAuthorized = await verifyAuth(request);
  if (!isAuthorized) {
    return new Response(
      JSON.stringify({ error: "No autorizado para subir documentos." }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || !(file instanceof File) || file.size === 0) {
      return new Response(
        JSON.stringify({ error: "No se recibió un archivo válido." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }

    const originalName = file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9.-]+/g, "-");

    const ext = path.extname(originalName) || ".pdf";
    const base = path.basename(originalName, ext);
    const uniqueName = `${base}-${Date.now().toString(36)}${ext}`;
    const destinationPath = path.join(UPLOADS_DIR, uniqueName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(destinationPath, buffer);

    const publicUrl = `/uploads/curriculums/${uniqueName}`;

    return new Response(
      JSON.stringify({
        success: true,
        url: publicUrl,
        name: file.name,
        size: file.size,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("[AI Academy Upload API] Error uploading file:", error);
    return new Response(
      JSON.stringify({ error: "Error interno al procesar el archivo." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

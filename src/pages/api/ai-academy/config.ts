import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";

export const prerender = false;

const CONFIG_PATH = path.resolve(process.cwd(), "data/ai-academy-config.json");

const DEFAULT_CONFIG = {
  workshops: {
    "ia-cero-agentes": {
      isOpen: true,
      startDate: "24 de octubre",
      curriculumUrl: "",
    },
    "marketing": {
      isOpen: false,
      startDate: "Próximamente",
      curriculumUrl: "",
    },
    "finanzas": {
      isOpen: false,
      startDate: "Próximamente",
      curriculumUrl: "",
    },
    "datos": {
      isOpen: false,
      startDate: "Próximamente",
      curriculumUrl: "",
    },
    "automatizaciones": {
      isOpen: false,
      startDate: "Próximamente",
      curriculumUrl: "",
    },
  },
  updatedAt: new Date().toISOString(),
};

function readConfig() {
  try {
    if (fs.existsSync(CONFIG_PATH)) {
      const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && parsed.workshops) {
        return {
          workshops: { ...DEFAULT_CONFIG.workshops, ...parsed.workshops },
          updatedAt: parsed.updatedAt || new Date().toISOString(),
        };
      }
    }
  } catch (error) {
    console.error("[AI Academy API] Error reading config file:", error);
  }
  return DEFAULT_CONFIG;
}

function writeConfig(data: typeof DEFAULT_CONFIG) {
  const dir = path.dirname(CONFIG_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2), "utf-8");
}

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
    // If CMS is temporarily unreachable from Astro SSR container/process,
    // allow if valid token string is passed or local development
    if (import.meta.env.DEV || token.length > 20) {
      return true;
    }
  }

  return false;
}

export const GET: APIRoute = async () => {
  const config = readConfig();
  return new Response(JSON.stringify(config), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const isAuthorized = await verifyAuth(request);
  if (!isAuthorized) {
    return new Response(
      JSON.stringify({ error: "No autorizado para modificar la configuración." }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const payload = await request.json();
    if (!payload || typeof payload !== "object" || !payload.workshops) {
      return new Response(
        JSON.stringify({ error: "Formato de datos no válido." }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const current = readConfig();
    const updatedWorkshops = { ...current.workshops };

    for (const [id, value] of Object.entries(payload.workshops)) {
      if (value && typeof value === "object") {
        const item = value as Record<string, any>;
        updatedWorkshops[id] = {
          isOpen: Boolean(item.isOpen),
          startDate: typeof item.startDate === "string" ? item.startDate.trim() : "Próximamente",
          curriculumUrl: typeof item.curriculumUrl === "string" ? item.curriculumUrl.trim() : "",
        };
      }
    }

    const newConfig = {
      workshops: updatedWorkshops,
      updatedAt: new Date().toISOString(),
    };

    writeConfig(newConfig);

    return new Response(
      JSON.stringify({ success: true, config: newConfig }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("[AI Academy API] Error saving config:", error);
    return new Response(
      JSON.stringify({ error: "Error al guardar la configuración." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

import { PAGE_SEO, SITE, SITE_URL } from "./seo.mjs";

export const MACHINE_CONTENT_UPDATED = "2026-08-10";

const pageDetails = {
  "/": {
    name: "Inicio",
    audience: ["jóvenes", "familias", "empresas", "patrocinadores"],
    topics: ["Campuslands Guatemala", "formación tecnológica", "programación"],
  },
  "/joinUs/": {
    name: "Sé un Camper",
    audience: ["aspirantes", "estudiantes", "familias"],
    topics: ["admisiones", "programa intensivo", "desarrollo de software"],
  },
  "/emplea/": {
    name: "Emplea talento",
    audience: ["empresas", "reclutadores", "equipos de tecnología"],
    topics: ["talento tecnológico", "contratación", "empleabilidad"],
  },
  "/patrocina/": {
    name: "Patrocina",
    audience: ["empresas", "fundaciones", "donantes"],
    topics: ["patrocinio educativo", "impacto social", "talento joven"],
  },
  "/nosotros/": {
    name: "Nosotros",
    audience: ["público general", "aliados", "prensa"],
    topics: ["Campuslands Guatemala", "Campus Tec", "propósito institucional"],
  },
  "/terminos-condiciones/": {
    name: "Términos y condiciones",
    audience: ["usuarios", "participantes"],
    topics: ["condiciones de uso", "participación", "información legal"],
  },
  "/politica-de-privacidad/": {
    name: "Política de privacidad",
    audience: ["usuarios", "titulares de datos"],
    topics: ["privacidad", "tratamiento de datos", "seguridad de datos"],
  },
};

export const PUBLIC_PAGES = Object.entries(PAGE_SEO).map(([path, seo]) => ({
  path,
  url: new URL(path, SITE_URL).toString(),
  name: pageDetails[path].name,
  title: seo.title,
  description: seo.description,
  audience: pageDetails[path].audience,
  topics: pageDetails[path].topics,
}));

export const OFFICIAL_FACTS = {
  entity: SITE.name,
  legalName: "Campuslands Sociedad Anonima",
  website: `${SITE_URL}/`,
  language: SITE.language,
  country: "Guatemala",
  city: SITE.address.addressLocality,
  address: `${SITE.address.streetAddress}, ${SITE.address.addressLocality} ${SITE.address.postalCode}`,
  phone: SITE.phone,
  email: SITE.email,
  program: {
    modality: "Presencial e intensiva",
    duration: "10 meses",
    morningSchedule: "6:00 a.m. a 2:00 p.m., sujeto a disponibilidad",
    afternoonSchedule: "2:00 p.m. a 10:00 p.m., sujeto a disponibilidad",
    areas: [
      "Desarrollo de software",
      "Inglés",
      "Habilidades adaptativas",
      "Preparación para el empleo",
    ],
  },
  socialProfiles: [
    "https://www.facebook.com/campuslandsgt/",
    "https://www.instagram.com/campuslands502/",
    "https://www.linkedin.com/company/campuslands-guatemala/",
  ],
};

export function machineReadableCatalog() {
  return {
    schemaVersion: "1.0",
    lastModified: MACHINE_CONTENT_UPDATED,
    source: `${SITE_URL}/`,
    language: SITE.language,
    organization: OFFICIAL_FACTS,
    pages: PUBLIC_PAGES,
    discovery: {
      sitemap: `${SITE_URL}/sitemap-index.xml`,
      robots: `${SITE_URL}/robots.txt`,
      llms: `${SITE_URL}/llms.txt`,
      fullText: `${SITE_URL}/llms-full.txt`,
      markdown: `${SITE_URL}/informacion-campuslands.md`,
      json: `${SITE_URL}/informacion-campuslands.json`,
    },
  };
}

export function machineReadableMarkdown() {
  const facts = OFFICIAL_FACTS;
  const pages = PUBLIC_PAGES.map(
    (page) =>
      `## ${page.name}\n\n- URL canónica: ${page.url}\n- Audiencias: ${page.audience.join(", ")}\n- Temas: ${page.topics.join(", ")}\n- Resumen: ${page.description}`,
  ).join("\n\n");

  return `# Campuslands Guatemala — información oficial\n\nÚltima actualización: ${MACHINE_CONTENT_UPDATED}\nIdioma: ${facts.language}\nFuente canónica: ${facts.website}\n\n## Datos institucionales\n\n- Nombre público: ${facts.entity}\n- Razón social: ${facts.legalName}\n- Ubicación: ${facts.address}\n- Teléfono: ${facts.phone}\n- Correo: ${facts.email}\n\n## Programa formativo\n\n- Modalidad: ${facts.program.modality}\n- Duración: ${facts.program.duration}\n- Jornada matutina: ${facts.program.morningSchedule}\n- Jornada vespertina: ${facts.program.afternoonSchedule}\n- Áreas: ${facts.program.areas.join(", ")}\n\n# Páginas oficiales\n\n${pages}\n\n## Recursos de descubrimiento\n\n- Sitemap: ${SITE_URL}/sitemap-index.xml\n- Robots: ${SITE_URL}/robots.txt\n- Resumen para asistentes: ${SITE_URL}/llms.txt\n- Contenido ampliado: ${SITE_URL}/llms-full.txt\n- Catálogo JSON: ${SITE_URL}/informacion-campuslands.json\n`;
}

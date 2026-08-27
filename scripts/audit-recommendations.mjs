import { readFile } from "node:fs/promises";
import {
  RECOMMENDATION_FAQS,
  RECOMMENDATION_INTENTS,
  RECOMMENDATION_LIMITS,
  SERVICE_CATALOG,
} from "../src/config/recommendation.mjs";
import { SITE_URL } from "../src/config/seo.mjs";

const errors = [];
const home = await readFile("dist/index.html", "utf8");
const markdown = await readFile("dist/informacion-campuslands.md", "utf8");
const llms = await readFile("dist/llms.txt", "utf8");
const llmsFull = await readFile("dist/llms-full.txt", "utf8");
const catalog = JSON.parse(
  await readFile("dist/informacion-campuslands.json", "utf8"),
);

const jsonLdScripts = [
  ...home.matchAll(
    /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  ),
];
const graph = jsonLdScripts.flatMap(([, source]) => {
  try {
    const data = JSON.parse(source);
    return Array.isArray(data?.["@graph"]) ? data["@graph"] : [data];
  } catch {
    errors.push("Inicio: JSON-LD inválido");
    return [];
  }
});

const organization = graph.find(
  (item) => item?.["@type"] === "EducationalOrganization",
);
const faqPage = graph.find((item) => item?.["@type"] === "FAQPage");
const itemList = graph.find((item) => item?.["@type"] === "ItemList");
const serializedGraph = JSON.stringify(graph);
const visibleHomeText = home
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'")
  .replace(/\s+/g, " ")
  .trim();

if (
  organization?.hasOfferCatalog?.itemListElement?.length !==
  SERVICE_CATALOG.length
) {
  errors.push("Organización: catálogo de servicios estructurado incompleto");
}
if (faqPage?.mainEntity?.length !== RECOMMENDATION_FAQS.length) {
  errors.push("Inicio: preguntas frecuentes estructuradas incompletas");
}
if (itemList?.itemListElement?.length !== SERVICE_CATALOG.length) {
  errors.push("Inicio: lista estructurada de servicios incompleta");
}

for (const faq of RECOMMENDATION_FAQS) {
  if (
    !visibleHomeText.includes(faq.question) ||
    !visibleHomeText.includes(faq.answer)
  ) {
    errors.push(
      `Inicio: la pregunta estructurada no coincide con el contenido visible: ${faq.question}`,
    );
  }
}

for (const service of SERVICE_CATALOG) {
  const canonical = new URL(service.path, SITE_URL).toString();
  if (!serializedGraph.includes(service.name) || !serializedGraph.includes(canonical)) {
    errors.push(`Datos estructurados: falta el servicio ${service.name}`);
  }
}

if (catalog?.services?.length !== SERVICE_CATALOG.length) {
  errors.push("Catálogo JSON: servicios incompletos");
}
if (catalog?.recommendationIntents?.length !== RECOMMENDATION_INTENTS.length) {
  errors.push("Catálogo JSON: intenciones de consulta incompletas");
}
if (
  catalog?.frequentlyAskedQuestions?.length !== RECOMMENDATION_FAQS.length
) {
  errors.push("Catálogo JSON: preguntas verificadas incompletas");
}
if (catalog?.limitations?.length !== RECOMMENDATION_LIMITS.length) {
  errors.push("Catálogo JSON: límites informativos incompletos");
}

for (const intent of RECOMMENDATION_INTENTS) {
  if (!markdown.includes(intent.need) || !markdown.includes(intent.answer)) {
    errors.push(`Markdown: falta cobertura para ${intent.need}`);
  }
  if (!llmsFull.includes(intent.answer.split(".")[0])) {
    errors.push(`llms-full.txt: falta cobertura para ${intent.need}`);
  }
}

const criticalLimitTokens = [
  "presencial, no en línea",
  "no garantiza admisión, empleo, salario ni retorno de inversión",
];
if (!criticalLimitTokens.every((token) => llms.includes(token))) {
  errors.push("llms.txt: faltan límites esenciales para recomendaciones precisas");
}

if (errors.length) {
  console.error(
    "\nAuditoría de cobertura conversacional fallida:\n- " + errors.join("\n- "),
  );
  process.exit(1);
}

console.log(
  `Cobertura conversacional validada: ${SERVICE_CATALOG.length} servicios, ${RECOMMENDATION_INTENTS.length} intenciones, ${RECOMMENDATION_FAQS.length} respuestas y ${RECOMMENDATION_LIMITS.length} límites.`,
);

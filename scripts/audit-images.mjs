import fs from "node:fs";
import path from "node:path";

const distDirectory = path.resolve("dist");

if (!fs.existsSync(distDirectory)) {
  console.error("No existe dist/. Ejecuta npm run build antes de esta auditoría.");
  process.exit(1);
}

const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) walk(filePath);
    else if (entry.name.endsWith(".html")) htmlFiles.push(filePath);
  }
}

walk(distDirectory);

const failures = [];
let imageCount = 0;
let rasterCount = 0;
let modernRasterCount = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route = `/${path.relative(distDirectory, file).replace(/index\.html$/, "")}`;

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const source = tag.match(/\bsrc=["']([^"']+)/i)?.[1] ?? "";
    const isRaster = /\.(?:png|jpe?g|webp|avif)(?:\?|$)/i.test(source);

    imageCount += 1;

    if (!/\balt=["'][^"']*["']/i.test(tag)) {
      failures.push(`${route}: imagen sin atributo alt (${source || "sin src"})`);
    }

    if (!isRaster) continue;

    rasterCount += 1;

    if (/\.(?:webp|avif)(?:\?|$)/i.test(source)) modernRasterCount += 1;
    else failures.push(`${route}: raster servido en formato antiguo (${source})`);

    if (!/\bwidth=["']?\d+/i.test(tag) || !/\bheight=["']?\d+/i.test(tag)) {
      failures.push(`${route}: raster sin dimensiones reservadas (${source})`);
    }

    if (!/\bloading=["'](?:lazy|eager)["']/i.test(tag)) {
      failures.push(`${route}: raster sin estrategia de carga explícita (${source})`);
    }

    if (!/\bdecoding=["']async["']/i.test(tag)) {
      failures.push(`${route}: raster sin decodificación asíncrona (${source})`);
    }
  }

  for (const match of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    const candidates = match[1].split(",").map((candidate) => candidate.trim().split(/\s+/)[0]);

    if (candidates.some((candidate) => /\.(?:png|jpe?g)(?:\?|$)/i.test(candidate))) {
      failures.push(`${route}: srcset contiene variantes raster antiguas`);
    }
  }
}

for (const file of fs.readdirSync(path.join(distDirectory, "_astro"))) {
  if (!file.endsWith(".css")) continue;

  const css = fs.readFileSync(path.join(distDirectory, "_astro", file), "utf8");

  if (/url\([^)]*\.(?:png|jpe?g)(?:\?[^)]*)?\)/i.test(css)) {
    failures.push(`/_astro/${file}: fondo raster servido en formato antiguo`);
  }
}

if (failures.length > 0) {
  console.error("Auditoría de imágenes: FALLÓ\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Auditoría de imágenes: APROBADA");
console.log(`- Páginas revisadas: ${htmlFiles.length}`);
console.log(`- Etiquetas de imagen: ${imageCount}`);
console.log(`- Imágenes raster modernas: ${modernRasterCount}/${rasterCount}`);
console.log("- Alt, dimensiones, carga y decodificación: completos");

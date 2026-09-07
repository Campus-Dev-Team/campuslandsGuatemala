<!--
contentType: How-to
goal: Montar, conectar y desplegar el frontend con su backend editorial.
audience: Desarrollo, infraestructura y mantenimiento técnico de Campuslands Guatemala.
-->

# Monta el frontend de Campuslands Guatemala

Este repositorio contiene el sitio público de Campuslands Guatemala. Astro preconstruye las páginas institucionales y sirve Órbita dinámicamente con Node; Vue aporta los componentes interactivos y Tailwind CSS define la interfaz.

El blog y la mesa editorial dependen del CMS Strapi del repositorio [`campuslands-guatemala-backend`](https://github.com/anndreloopez012/campuslands-guatemala-backend). Monta y comprueba ese backend antes de iniciar o desplegar el frontend completo.

## Respeta el orden de montaje

Sigue este orden en local y producción:

1. Monta `campuslands-guatemala-backend`
2. Comprueba el healthcheck y el índice editorial
3. Configura `PUBLIC_CMS_URL` en el frontend
4. Instala, compila y publica este frontend
5. Despliega el contenedor Node del frontend
6. Publica una entrada de prueba y comprueba su aparición inmediata

El frontend puede mostrar las páginas institucionales sin el CMS. Sin embargo, el blog, las galerías, las imágenes editoriales y `/blog-admin/` necesitan el backend.

## Identifica los repositorios

| Componente | Repositorio | Función |
| --- | --- | --- |
| Frontend | [`campuslandsGuatemala`](https://github.com/anndreloopez012/campuslandsGuatemala) | Sitio público, Órbita dinámica, mesa editorial, SEO y sitemaps |
| Backend | [`campuslands-guatemala-backend`](https://github.com/anndreloopez012/campuslands-guatemala-backend) | Contenido, autenticación, API, PostgreSQL y archivos editoriales |

Usa `main` para producción y `dev` como rama de integración.

## Prepara el equipo

Instala estas herramientas:

- Git
- Node.js 20 LTS
- npm 10 o superior
- Docker Desktop o Docker Engine con Compose v2 si montarás el backend en contenedores

El archivo `.nvmrc` selecciona la versión recomendada de Node.js:

```bash
nvm install
nvm use
node --version
npm --version
git --version
```

## Monta todo en local

### 1. Monta primero el backend

Clona el repositorio del CMS:

```bash
git clone https://github.com/anndreloopez012/campuslands-guatemala-backend.git
cd campuslands-guatemala-backend
git switch main
```

Elige una de estas opciones.

#### Backend local con SQLite

```bash
cp .env.example .env
npm ci
npm run build
npm run develop
```

Reemplaza antes los valores cuyo prefijo sea `replace_` dentro de `.env`. La guía del backend explica cómo generar secretos y provisionar las cuentas.

#### Backend con Docker y PostgreSQL

```bash
cp .env.docker.example .env.docker
docker compose --env-file .env.docker config --quiet
docker compose --env-file .env.docker up --build -d
docker compose --env-file .env.docker ps
```

Reemplaza los valores de ejemplo en `.env.docker`. Espera hasta que `database` y `cms` aparezcan como `healthy`.

Consulta las instrucciones completas en el [README del backend](https://github.com/anndreloopez012/campuslands-guatemala-backend#readme).

### 2. Comprueba el backend

Ejecuta desde otra terminal:

```bash
curl --fail http://127.0.0.1:1337/_health
curl --fail http://127.0.0.1:1337/api/seo/content-index
```

No continúes si alguna comprobación falla. Revisa los logs del proceso o ejecuta:

```bash
docker compose --env-file .env.docker logs --tail=200 cms
```

### 3. Clona y configura el frontend

```bash
git clone https://github.com/anndreloopez012/campuslandsGuatemala.git
cd campuslandsGuatemala
git switch main
cp .env.example .env
```

Mantén esta configuración para desarrollo local:

```env
PUBLIC_CMS_URL=http://127.0.0.1:1337
REQUIRE_CMS_FOR_BUILD=false
```

`PUBLIC_CMS_URL` no debe terminar con `/`. Esta variable es pública y no debe contener tokens ni credenciales.

### 4. Instala e inicia el frontend

```bash
npm ci
npm run dev
```

Abre [http://localhost:4321/](http://localhost:4321/) y comprueba:

- [sitio principal](http://localhost:4321/)
- [Órbita](http://localhost:4321/blog/)
- [mesa editorial](http://localhost:4321/blog-admin/)

La mesa editorial inicia sesión con la cuenta `blog-editor` provisionada por el backend.

### 5. Detén los servicios

Presiona `Ctrl + C` en los procesos locales. Si usaste Docker para el backend, conserva sus datos con:

```bash
docker compose --env-file .env.docker down
```

No agregues `-v` salvo que quieras eliminar la base PostgreSQL y los archivos cargados.

## Actualiza una instalación existente

Actualiza primero el backend:

```bash
cd campuslands-guatemala-backend
git switch main
git pull --ff-only
npm ci
npm run build
```

Si usas Docker, reconstruye el servicio:

```bash
docker compose --env-file .env.docker up --build -d
```

Comprueba `/_health` y actualiza después el frontend:

```bash
cd campuslandsGuatemala
git switch main
git pull --ff-only
npm ci
npm run build
```

## Prueba la compilación de producción

Mantén el backend en ejecución. Activa la validación estricta en `.env`:

```env
PUBLIC_CMS_URL=http://127.0.0.1:1337
REQUIRE_CMS_FOR_BUILD=true
```

Compila y abre el resultado:

```bash
npm run build
npm run preview
```

Abre [http://localhost:4321/](http://localhost:4321/). Las rutas de Órbita consultan el CMS al recibir cada solicitud; no quedan congeladas durante la compilación.

## Despliega en producción

### 1. Publica el backend

Despliega `campuslands-guatemala-backend` con PostgreSQL y almacenamiento persistente para `public/uploads`.

Configura como mínimo:

- secretos de Strapi
- conexión PostgreSQL
- `CORS_ORIGINS` con el dominio HTTPS del frontend
- `PUBLIC_SITE_URL` con el dominio canónico del sitio
- cuentas `BLOG_EDITOR_*` y `STRAPI_SUPER_ADMIN_*` durante el primer arranque

Puedes dejar `FRONTEND_DEPLOY_HOOK_URL` vacío durante el primer despliegue del backend.

Comprueba la URL pública antes de desplegar el frontend:

```bash
curl --fail https://backend.example.com/_health
curl --fail https://backend.example.com/api/seo/content-index
```

### 2. Configura el frontend

En Dokploy crea una aplicación desde este repositorio y selecciona despliegue mediante `Dockerfile`.

Configura estas variables de producción:

```env
PUBLIC_CMS_URL=https://orbita.campuslands.pro
REQUIRE_CMS_FOR_BUILD=false
```

Usa estos valores de compilación:

| Configuración | Valor |
| --- | --- |
| Rama | rama aprobada para producción |
| Build type | Dockerfile |
| Container Port | `4321` |
| Healthcheck | `/health.json` |

Configura `PUBLIC_CMS_URL` tanto como variable de build como de runtime. El servidor escucha en `0.0.0.0:4321`; Dokploy/Traefik debe dirigir el dominio público a ese puerto del contenedor.

### 3. Publicación dinámica

Deja `FRONTEND_DEPLOY_HOOK_URL` vacío. Ese hook solo es necesario para frontends puramente estáticos y ya no participa en el flujo editorial de esta implementación.

Cuando el equipo publica, modifica o retira contenido, el frontend consulta el estado vigente en Strapi. La portada, la URL individual, las categorías, el RSS y los sitemaps se actualizan sin recompilar ni desplegar nuevamente.

### 4. Valida el flujo completo

1. Inicia sesión en `/blog-admin/`
2. Publica o modifica una entrada de prueba
3. Abre la URL canónica de la entrada sin lanzar otro despliegue
4. Comprueba que la URL aparezca en `sitemap-blog.xml`
5. Comprueba `sitemap-index.xml` y `blog/feed.xml`

En la mesa editorial, cada categoría selecciona una plantilla animada y cada publicación decide si muestra esa animación o su imagen de portada. La selección queda guardada en el CMS y se aplica en la siguiente solicitud pública.

## Configura la conexión entre proyectos

### Variables del frontend

| Variable | Ambiente | Uso |
| --- | --- | --- |
| `PUBLIC_CMS_URL` | Local y producción | URL accesible del backend Strapi |
| `REQUIRE_CMS_FOR_BUILD` | Compatibilidad | No es necesario para el renderizado dinámico |

### Variables relacionadas del backend

| Variable | Uso |
| --- | --- |
| `CORS_ORIGINS` | Autoriza el dominio que consume la API y abre `/blog-admin/` |
| `PUBLIC_SITE_URL` | Construye las rutas canónicas del índice editorial |
| `FRONTEND_DEPLOY_HOOK_URL` | Opcional; debe quedar vacío con este frontend dinámico |
| `BLOG_EDITOR_*` | Provisiona la cuenta de edición cotidiana |
| `STRAPI_SUPER_ADMIN_*` | Provisiona la cuenta de mantenimiento técnico |

El navegador usa `PUBLIC_CMS_URL` para autenticación, edición y multimedia. El servidor Node usa la misma URL para leer las publicaciones vigentes en cada solicitud.

## Ejecuta las comprobaciones

| Comando | Resultado |
| --- | --- |
| `npm run dev` | Inicia el frontend en `127.0.0.1:4321` |
| `npm run dev:host` | Expone el frontend dentro de la red local |
| `npm run build` | Genera el servidor híbrido y las páginas institucionales en `dist/` |
| `npm run preview` | Sirve la compilación local |
| `npm run audit:seo` | Revisa metadatos y estructura SEO |
| `npm run audit:blog` | Revisa contenido editorial y descubrimiento |
| `npm run audit:images` | Revisa imágenes y atributos descriptivos |
| `npm run audit:links` | Revisa enlaces internos y externos |
| `npm run audit:scraping` | Revisa consumo mediante crawlers |
| `npm run audit:recommendations` | Revisa señales para sistemas de recomendación |
| `npm run audit:quality` | Ejecuta toda la batería de auditorías |

Ejecuta `npm run audit:quality` con el backend disponible y `REQUIRE_CMS_FOR_BUILD=true` antes de publicar una versión.

## Consulta las rutas principales

Astro exige una barra final en las rutas.

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio |
| `/joinUs/` | Información para futuros campers |
| `/ai-academy/` | Talleres presenciales de inteligencia artificial aplicada |
| `/blog/` | Portada editorial Órbita |
| `/blog/[slug]/` | Publicación dinámica leída desde el CMS |
| `/blog/galerias/` | Índice de galerías editoriales |
| `/blog-admin/` | Mesa editorial privada |
| `/emplea/` | Contratación de talento tecnológico |
| `/patrocina/` | Programa de patrocinio |
| `/nosotros/` | Información institucional |
| `/terminos-condiciones/` | Términos y condiciones |
| `/politica-de-privacidad/` | Política de privacidad y seguridad de datos |

## Comprende la estructura

```text
campuslandsGuatemala/
├── public/                 Archivos públicos, robots, manifiesto y seguridad
├── scripts/                Sitemaps y auditorías automáticas
├── src/
│   ├── assets/             Imágenes, iconos y recursos procesados
│   ├── components/         Componentes reutilizables
│   ├── config/             Configuración SEO y datos compartidos
│   ├── content/            Contenido legal y editorial
│   ├── layouts/            Plantillas comunes
│   ├── lib/                Cliente y contratos del CMS
│   ├── pages/              Rutas generadas por Astro
│   ├── partials/           Formularios y secciones parciales
│   └── styles/             Tema y estilos globales
├── .env.example            Variables públicas de conexión
├── astro.config.mjs        Configuración de Astro
├── package.json            Dependencias y comandos
├── tailwind.config.mjs     Configuración de Tailwind CSS
└── vercel.json             Rutas, seguridad y caché de Vercel
```

## Mantén la indexación actualizada

El servidor genera estos recursos en cada solicitud:

- `sitemap-index.xml`: URL que debes registrar en Google Search Console
- `sitemap-pages.xml`: páginas institucionales
- `sitemap-blog.xml`: publicaciones y galerías
- `sitemap-urls.txt`: listado legible de URLs canónicas
- `blog/feed.xml`: feed RSS de Órbita

El índice editorial del backend permite comprobar que todo contenido publicado tenga una ruta HTML y una entrada en el sitemap sin un nuevo despliegue.

## Resuelve fallos comunes

### La compilación no puede consultar el CMS

Comprueba la variable y el backend:

```bash
printenv PUBLIC_CMS_URL
curl --fail "$PUBLIC_CMS_URL/_health"
curl --fail "$PUBLIC_CMS_URL/api/seo/content-index"
```

En local, confirma también el contenido de `.env`. Reinicia Astro después de modificarlo.

### El blog aparece sin publicaciones

Comprueba que los documentos estén publicados y consulta:

```bash
curl --fail "$PUBLIC_CMS_URL/api/articles"
curl --fail "$PUBLIC_CMS_URL/api/seo/content-index"
```

Una entrada guardada como borrador no genera una página pública.

### La mesa editorial devuelve 401 o 403

Confirma la cuenta en el backend. Debe estar activa y asociada al rol `blog-editor`. Verifica también que `CORS_ORIGINS` incluya el origen exacto del frontend.

### Una publicación nueva no aparece en producción

Comprueba `PUBLIC_CMS_URL`, la respuesta del CMS y que Dokploy esté ejecutando el servidor Node del `Dockerfile`, no una carpeta estática antigua. `FRONTEND_DEPLOY_HOOK_URL` debe permanecer vacío.

### Una ruta devuelve 404

Agrega la barra final. Por ejemplo:

```text
http://localhost:4321/politica-de-privacidad/
```

### El puerto 4321 está ocupado

```bash
npm run dev -- --port 4322
```

## Sigue el flujo de ramas

Crea una rama por cambio desde `dev`:

```bash
git switch dev
git pull --ff-only origin dev
git switch -c feat/nombre-del-cambio
```

Integra y valida primero en `dev`. Después integra el cambio aprobado en `main` para producción.

Usa commits con este formato:

```text
feat(area): describe la funcionalidad agregada
fix(area): describe el problema corregido
```

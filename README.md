# Campuslands Guatemala

Sitio web público de Campuslands Guatemala. El proyecto presenta los programas
de formación, vinculación laboral, patrocinio, información institucional y la
política de privacidad de la sede de Guatemala.

Está construido como un sitio estático con Astro, Vue y Tailwind CSS. No
requiere una base de datos, un servicio backend ni variables de entorno para
ejecutarse localmente.

## Rama consolidada

La rama que reúne los cambios actuales del fork es:

```text
feat/readme-ejecucion-local
```

Esta rama incluye las mejoras visuales, navegación con transiciones, contenido
para Guatemala, política de privacidad, SEO, sitemap y documentación local.

## Requisitos

Antes de comenzar, instala:

- Git.
- Node.js 20 LTS.
- npm 10 o una versión compatible incluida con Node.js 20.

El repositorio incluye un archivo `.nvmrc`. Si utilizas
[nvm](https://github.com/nvm-sh/nvm), puedes seleccionar automáticamente la
versión recomendada:

```bash
nvm install
nvm use
```

Comprueba las versiones instaladas:

```bash
node --version
npm --version
git --version
```

## Instalación desde cero

### 1. Clonar el fork

```bash
git clone https://github.com/anndreloopez012/campuslandsGuatemala.git
cd campuslandsGuatemala
```

### 2. Cambiar a la rama consolidada

```bash
git fetch origin
git switch feat/readme-ejecucion-local
```

### 3. Instalar las dependencias

Utiliza `npm ci` para instalar exactamente las versiones registradas en
`package-lock.json`:

```bash
npm ci
```

### 4. Iniciar el entorno de desarrollo

```bash
npm run dev
```

Abre la dirección mostrada en la terminal. De forma predeterminada es:

[http://localhost:4321/](http://localhost:4321/)

Los cambios realizados en los archivos se reflejan automáticamente en el
navegador.

### 5. Detener el servicio

En la terminal donde se está ejecutando el proyecto, presiona:

```text
Ctrl + C
```

## Actualizar una instalación existente

Si el repositorio ya está clonado:

```bash
cd campuslandsGuatemala
git fetch origin
git switch feat/readme-ejecucion-local
git pull --ff-only
npm ci
npm run dev
```

## Abrir el sitio desde otro dispositivo

Para revisarlo desde un teléfono o una computadora conectada a la misma red
local:

```bash
npm run dev:host
```

La terminal mostrará una dirección de red similar a:

```text
http://192.168.1.25:4321/
```

Abre esa dirección en el otro dispositivo. Si no responde, verifica que ambos
equipos estén en la misma red y que el firewall permita conexiones entrantes
para Node.js.

## Probar la versión de producción localmente

La vista de producción permite comprobar los archivos optimizados que se
publicarán.

### 1. Generar el sitio

```bash
npm run build
```

El resultado se guarda en `dist/`.

### 2. Iniciar la vista previa

```bash
npm run preview
```

Abre [http://localhost:4321/](http://localhost:4321/).

Para compartir la vista de producción en la red local:

```bash
npm run preview:host
```

## Comandos disponibles

| Comando | Función |
| --- | --- |
| `npm run dev` | Inicia el entorno de desarrollo local. |
| `npm run dev:host` | Expone el entorno de desarrollo en la red local. |
| `npm run build` | Genera el sitio estático optimizado en `dist/`. |
| `npm run preview` | Sirve localmente el resultado de producción. |
| `npm run preview:host` | Comparte la vista de producción en la red local. |
| `npm run astro -- --help` | Muestra las opciones disponibles de Astro. |

## Rutas principales

Astro está configurado para utilizar una barra final en las rutas.

| Ruta | Contenido |
| --- | --- |
| `/` | Inicio. |
| `/joinUs/` | Información para futuros campers. |
| `/emplea/` | Contratación de talento tecnológico. |
| `/patrocina/` | Programa de patrocinio. |
| `/nosotros/` | Información institucional. |
| `/terminos-condiciones/` | Términos y condiciones de participación. |
| `/politica-de-privacidad/` | Política de privacidad y seguridad de datos. |
| `/patrocinar/` | Formulario de patrocinio. |
| `/contactanos/` | Ruta de contacto reservada. |

## Estructura del proyecto

```text
campuslandsGuatemala/
├── public/                 Archivos públicos, robots, manifiesto y seguridad
├── src/
│   ├── assets/             Imágenes, iconos y recursos procesados
│   ├── components/         Componentes reutilizables
│   ├── config/             Configuración SEO y datos compartidos
│   ├── content/            Contenido legal y editorial
│   ├── layouts/            Plantillas comunes del sitio
│   ├── pages/              Rutas generadas por Astro
│   ├── partials/           Formularios y secciones parciales
│   └── styles/             Tema, variables y estilos globales
├── astro.config.mjs        Configuración de Astro y sitemap
├── tailwind.config.mjs     Configuración visual de Tailwind
├── vercel.json             Configuración de despliegue en Vercel
└── package.json            Dependencias y comandos
```

## Configuración y datos

- El proyecto no necesita un archivo `.env` para ejecutarse.
- El dominio canónico y los metadatos SEO se definen en `src/config/seo.mjs`.
- El sitemap se genera automáticamente durante `npm run build`.
- La configuración exige rutas con barra final, por ejemplo
  `/terminos-condiciones/` o `/politica-de-privacidad/`.
- Los enlaces externos a WhatsApp, redes sociales, correo y portales conservan
  su navegación normal.

## Despliegue

El proyecto genera archivos estáticos y está preparado para Vercel:

- Comando de construcción: `npm run build`
- Directorio de salida: `dist`
- Versión recomendada de Node.js: 20

En Vercel, importa el repositorio, selecciona la rama que se desea publicar y
confirma los valores anteriores. `vercel.json` ya contiene la configuración de
rutas, cabeceras de seguridad y caché.

El proceso de construcción también copia `public/.htaccess` a `dist/.htaccess`
para servidores compatibles con Apache.

## Solución de problemas

### El puerto 4321 está ocupado

Inicia el proyecto en otro puerto:

```bash
npm run dev -- --port 4322
```

### Una ruta devuelve 404

Comprueba que la URL termine con `/`. Por ejemplo:

```text
http://localhost:4321/terminos-condiciones/
```

### Las dependencias no coinciden

Verifica que utilizas Node.js 20 y reinstala desde el archivo de bloqueo:

```bash
nvm use
npm ci
```

### Los cambios no aparecen

Confirma que estás en la rama correcta:

```bash
git branch --show-current
git status
```

Después reinicia el servicio con `Ctrl + C` y `npm run dev`.

## Flujo recomendado de cambios

Cada solicitud debe desarrollarse en una rama independiente. Antes de crearla,
actualiza la rama consolidada:

```bash
git switch feat/readme-ejecucion-local
git pull --ff-only
git switch -c feat/nombre-del-cambio
```

Los commits del proyecto siguen esta estructura:

```text
feat(area): describe la funcionalidad agregada
fix(area): describe el problema corregido
```

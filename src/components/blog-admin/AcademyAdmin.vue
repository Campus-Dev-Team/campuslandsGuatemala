<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import type { BlogAdminApi } from "../../lib/blog-admin";

interface WorkshopAdminItem {
  id: string;
  code: string;
  title: string;
  isOpen: boolean;
  startDate: string;
  curriculumUrl: string;
  uploading?: boolean;
}

const props = defineProps<{
  api: BlogAdminApi;
  cmsUrl: string;
}>();

const emit = defineEmits<{
  (e: "notice", message: string, type?: "success" | "error"): void;
}>();

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref("");

const workshopDefinitions = [
  { id: "ia-cero-agentes", code: "IA.01", title: "Taller Práctico: IA de cero a Agentes" },
  { id: "marketing", code: "MKT.02", title: "Marketing IA" },
  { id: "finanzas", code: "FIN.03", title: "Finanzas IA" },
  { id: "datos", code: "DATA.04", title: "Análisis de Datos IA" },
  { id: "automatizaciones", code: "AUTO.05", title: "Automatizaciones IA" },
];

const workshops = reactive<WorkshopAdminItem[]>([
  { id: "ia-cero-agentes", code: "IA.01", title: "Taller Práctico: IA de cero a Agentes", isOpen: true, startDate: "24 de octubre", curriculumUrl: "" },
  { id: "marketing", code: "MKT.02", title: "Marketing IA", isOpen: false, startDate: "Próximamente", curriculumUrl: "" },
  { id: "finanzas", code: "FIN.03", title: "Finanzas IA", isOpen: false, startDate: "Próximamente", curriculumUrl: "" },
  { id: "datos", code: "DATA.04", title: "Análisis de Datos IA", isOpen: false, startDate: "Próximamente", curriculumUrl: "" },
  { id: "automatizaciones", code: "AUTO.05", title: "Automatizaciones IA", isOpen: false, startDate: "Próximamente", curriculumUrl: "" },
]);

async function loadConfig() {
  loading.value = true;
  errorMessage.value = "";
  try {
    const res = await fetch("/api/ai-academy/config", {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error("No se pudo cargar la configuración de AI Academy.");
    const data = await res.json();
    if (data?.workshops) {
      workshops.forEach((item) => {
        const stored = data.workshops[item.id];
        if (stored) {
          item.isOpen = Boolean(stored.isOpen);
          item.startDate = typeof stored.startDate === "string" ? stored.startDate : "Próximamente";
          item.curriculumUrl = typeof stored.curriculumUrl === "string" ? stored.curriculumUrl : "";
        }
      });
    }
  } catch (error) {
    console.error("[AcademyAdmin] Error:", error);
    errorMessage.value = error instanceof Error ? error.message : "Error al cargar configuración.";
  } finally {
    loading.value = false;
  }
}

async function handleFileUpload(workshop: WorkshopAdminItem, event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  workshop.uploading = true;
  try {
    let uploadedUrl = "";

    // 1. Try uploading to Astro backend endpoint
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/ai-academy/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.api.token}`,
        },
        body: form,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) uploadedUrl = data.url;
      }
    } catch (e) {
      console.warn("Direct upload fallback to Strapi:", e);
    }

    // 2. If Astro direct upload was not successful, fallback to Strapi CMS upload
    if (!uploadedUrl) {
      const media = await props.api.upload(file);
      if (media?.url) {
        uploadedUrl = media.url.startsWith("http") ? media.url : `${props.cmsUrl}${media.url}`;
      }
    }

    if (!uploadedUrl) throw new Error("No se pudo obtener la URL del archivo cargado.");

    workshop.curriculumUrl = uploadedUrl;
    emit("notice", `Malla curricular para "${workshop.title}" subida con éxito.`);
  } catch (err) {
    console.error("[AcademyAdmin] Upload error:", err);
    emit("notice", err instanceof Error ? err.message : "Error al subir archivo.", "error");
  } finally {
    workshop.uploading = false;
    target.value = "";
  }
}

function clearCurriculum(workshop: WorkshopAdminItem) {
  workshop.curriculumUrl = "";
}

async function saveAll() {
  saving.value = true;
  try {
    const payloadWorkshops: Record<string, { isOpen: boolean; startDate: string; curriculumUrl: string }> = {};
    workshops.forEach((item) => {
      payloadWorkshops[item.id] = {
        isOpen: item.isOpen,
        startDate: item.startDate || "Próximamente",
        curriculumUrl: item.curriculumUrl || "",
      };
    });

    const res = await fetch("/api/ai-academy/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${props.api.token}`,
      },
      body: JSON.stringify({ workshops: payloadWorkshops }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "No se pudo guardar la configuración.");
    }

    emit("notice", "Configuración de AI Academy guardada y publicada en la web.");
  } catch (error) {
    emit("notice", error instanceof Error ? error.message : "Error al guardar.", "error");
  } finally {
    saving.value = false;
  }
}

onMounted(() => {
  loadConfig();
});
</script>

<template>
  <div class="academy-admin">
    <header class="page-heading">
      <div>
        <p>PROGRAMAS DE FORMACIÓN · CAMPUSLANDS GUATEMALA</p>
        <h1>AI Academy · Talleres</h1>
        <span>
          Administra las fechas de inicio, disponibilidad de inscripciones y documentos de
          malla curricular para los 5 talleres oficiales. Los cambios se reflejan al instante en la landing.
        </span>
      </div>

      <div class="heading-actions">
        <a href="/ai-academy/" target="_blank" rel="noopener" class="secondary-action">
          Ver landing pública ↗
        </a>
        <button
          type="button"
          class="primary-action"
          :disabled="saving || loading"
          @click="saveAll"
        >
          <span>{{ saving ? "Guardando…" : "Guardar cambios" }}</span>
          <b>✓</b>
        </button>
      </div>
    </header>

    <div v-if="loading" class="academy-loading">
      <i></i>
      <p>Cargando configuración de AI Academy…</p>
    </div>

    <div v-else-if="errorMessage" class="academy-error">
      <span>!</span>
      <p>{{ errorMessage }}</p>
      <button type="button" @click="loadConfig">Reintentar</button>
    </div>

    <div v-else class="academy-body">
      <!-- Status Bar -->
      <section class="academy-summary">
        <div class="summary-metric">
          <small>Total talleres</small>
          <strong>5</strong>
        </div>
        <div class="summary-metric summary-metric--highlight">
          <small>Inscripciones abiertas</small>
          <strong>{{ workshops.filter(w => w.isOpen).length }}</strong>
        </div>
        <div class="summary-metric">
          <small>Con documento de malla</small>
          <strong>{{ workshops.filter(w => w.curriculumUrl).length }} / 5</strong>
        </div>
      </section>

      <!-- Workshop Cards Grid -->
      <div class="workshop-grid">
        <article
          v-for="workshop in workshops"
          :key="workshop.id"
          class="workshop-admin-card"
          :class="{ 'workshop-admin-card--open': workshop.isOpen }"
        >
          <!-- Card Header -->
          <div class="card-header">
            <div class="code-badge">{{ workshop.code }}</div>
            <div class="card-title-group">
              <h3>{{ workshop.title }}</h3>
            </div>
            <div
              class="status-indicator"
              :class="workshop.isOpen ? 'status-indicator--open' : 'status-indicator--upcoming'"
            >
              <span class="status-dot"></span>
              <strong>{{ workshop.isOpen ? "INSCRIPCIONES ABIERTAS" : "PRÓXIMAMENTE" }}</strong>
            </div>
          </div>

          <!-- Controls Body -->
          <div class="card-controls">
            <!-- 1. Check de Inscripciones abiertas -->
            <div class="control-box control-box--toggle">
              <label class="toggle-label">
                <input
                  v-model="workshop.isOpen"
                  type="checkbox"
                  class="toggle-checkbox"
                />
                <div class="toggle-switch"></div>
                <div class="toggle-texts">
                  <strong>Inscripciones abiertas</strong>
                  <small v-if="workshop.isOpen">
                    Tarjeta resaltada con glow verde/cyan y botón de inscripción directa.
                  </small>
                  <small v-else>
                    Muestra badge "Próximamente" y botón de consulta/lista de espera.
                  </small>
                </div>
              </label>
            </div>

            <!-- 2. Fecha de inicio -->
            <div class="control-box">
              <label class="field-label">
                <span>Fecha de inicio del taller</span>
                <input
                  v-model="workshop.startDate"
                  type="text"
                  placeholder="Ej. 24 de octubre"
                  class="text-input"
                />
              </label>
              <small class="field-tip">
                Se mostrará en la cabecera de la tarjeta para que los aspirantes conozcan la convocatoria.
              </small>
            </div>

            <!-- 3. Malla curricular -->
            <div class="control-box control-box--curriculum">
              <label class="field-label">
                <span>Malla curricular (Documento PDF / Temario)</span>
              </label>

              <!-- Upload actions -->
              <div class="curriculum-upload-row">
                <label class="upload-btn" :class="{ disabled: workshop.uploading }">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg"
                    class="sr-only"
                    :disabled="workshop.uploading"
                    @change="handleFileUpload(workshop, $event)"
                  />
                  <span>{{ workshop.uploading ? "Subiendo archivo…" : "📄 Subir PDF del temario" }}</span>
                </label>

                <div v-if="workshop.curriculumUrl" class="curriculum-actions">
                  <a
                    :href="workshop.curriculumUrl"
                    target="_blank"
                    rel="noopener"
                    class="curriculum-link"
                  >
                    Ver actual ↗
                  </a>
                  <button
                    type="button"
                    class="curriculum-clear"
                    title="Quitar documento"
                    @click="clearCurriculum(workshop)"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <!-- Direct URL input -->
              <div class="url-input-row">
                <input
                  v-model="workshop.curriculumUrl"
                  type="url"
                  placeholder="O pega aquí la URL del PDF (Google Drive, Canva, etc.)"
                  class="text-input text-input--small"
                />
              </div>

              <div v-if="workshop.curriculumUrl" class="curriculum-preview-badge">
                <span class="check-icon">✓</span>
                <span>Documento activo: botón habilitado en la tarjeta pública.</span>
              </div>
              <div v-else class="curriculum-preview-badge curriculum-preview-badge--missing">
                <span>ℹ Sin PDF cargado: el botón abrirá el temario detallado en modal.</span>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Sticky Save Bar -->
      <footer class="academy-footer-bar">
        <div class="footer-info">
          <span>Recuerda guardar los cambios para aplicarlos en producción.</span>
        </div>
        <button
          type="button"
          class="primary-action"
          :disabled="saving || loading"
          @click="saveAll"
        >
          <span>{{ saving ? "Guardando…" : "Guardar configuración de AI Academy" }}</span>
          <b>✓</b>
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.academy-admin {
  display: grid;
  gap: 32px;
  width: 100%;
}

.heading-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.academy-loading,
.academy-error {
  display: grid;
  min-height: 40vh;
  place-content: center;
  justify-items: center;
  gap: 16px;
  text-align: center;
}

.academy-loading i {
  width: 38px;
  height: 38px;
  border: 2px solid rgba(87, 187, 255, 0.2);
  border-top-color: #00d9a4;
  border-radius: 50%;
  animation: academy-spin 0.8s linear infinite;
}

@keyframes academy-spin {
  to { transform: rotate(360deg); }
}

.academy-error span {
  display: grid;
  width: 48px;
  height: 48px;
  place-content: center;
  border: 1px solid rgba(255, 100, 120, 0.35);
  border-radius: 50%;
  color: #ff6478;
  font-size: 22px;
}

.academy-error button {
  padding: 8px 16px;
  border: 1px solid rgba(87, 187, 255, 0.2);
  border-radius: 8px;
  color: white;
  background: rgba(87, 187, 255, 0.1);
  cursor: pointer;
}

.academy-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 18px 24px;
  border: 1px solid rgba(87, 187, 255, 0.16);
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(14, 30, 79, 0.6), rgba(5, 14, 47, 0.8));
}

.summary-metric {
  display: grid;
  gap: 4px;
  min-width: 140px;
}

.summary-metric small {
  color: rgba(247, 249, 255, 0.6);
  font: 700 10px/1 ui-monospace, monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.summary-metric strong {
  font-size: 24px;
  color: #f7f9ff;
}

.summary-metric--highlight strong {
  color: #00d9a4;
  text-shadow: 0 0 16px rgba(0, 217, 164, 0.4);
}

.workshop-grid {
  display: grid;
  gap: 20px;
}

.workshop-admin-card {
  padding: 24px 28px;
  border: 1px solid rgba(87, 187, 255, 0.16);
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(14, 26, 68, 0.85), rgba(7, 14, 45, 0.95));
  transition: all 0.3s ease;
}

.workshop-admin-card--open {
  border-color: rgba(0, 217, 164, 0.4);
  box-shadow: 0 0 30px rgba(0, 217, 164, 0.08), inset 0 1px rgba(0, 217, 164, 0.2);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(87, 187, 255, 0.12);
}

.code-badge {
  padding: 5px 10px;
  border: 1px solid rgba(185, 151, 255, 0.3);
  border-radius: 8px;
  color: #c7a4ff;
  background: rgba(122, 60, 255, 0.15);
  font: 800 11px/1 ui-monospace, monospace;
  letter-spacing: 0.1em;
}

.card-title-group h3 {
  margin: 0;
  font-size: 19px;
  font-weight: 700;
  color: #f7f9ff;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  font: 700 10px/1 ui-monospace, monospace;
  letter-spacing: 0.1em;
}

.status-indicator--open {
  color: #7fffdc;
  background: rgba(0, 217, 164, 0.12);
  border: 1px solid rgba(0, 217, 164, 0.35);
  box-shadow: 0 0 14px rgba(0, 217, 164, 0.2);
}

.status-indicator--open .status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #00d9a4;
  box-shadow: 0 0 8px #00d9a4;
  animation: academy-dot-pulse 2s infinite ease-in-out;
}

@keyframes academy-dot-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

.status-indicator--upcoming {
  color: rgba(223, 245, 255, 0.6);
  background: rgba(185, 151, 255, 0.08);
  border: 1px solid rgba(185, 151, 255, 0.2);
}

.status-indicator--upcoming .status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #b997ff;
}

.card-controls {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) minmax(220px, 1fr) minmax(320px, 1.4fr);
  gap: 20px;
  margin-top: 22px;
  align-items: start;
}

.control-box {
  display: grid;
  gap: 8px;
}

.control-box--toggle {
  padding-right: 12px;
  border-right: 1px solid rgba(87, 187, 255, 0.1);
}

.toggle-label {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  cursor: pointer;
  user-select: none;
}

.toggle-checkbox {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.toggle-switch {
  position: relative;
  width: 44px;
  height: 24px;
  margin-top: 2px;
  flex-shrink: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.25s ease;
}

.toggle-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.25s ease, background 0.25s ease;
}

.toggle-checkbox:checked + .toggle-switch {
  background: #00d9a4;
  border-color: #00d9a4;
  box-shadow: 0 0 12px rgba(0, 217, 164, 0.4);
}

.toggle-checkbox:checked + .toggle-switch::after {
  transform: translateX(20px);
  background: #021a21;
}

.toggle-texts {
  display: grid;
  gap: 4px;
}

.toggle-texts strong {
  font-size: 14px;
  color: #f7f9ff;
}

.toggle-texts small {
  color: rgba(223, 245, 255, 0.6);
  font-size: 11px;
  line-height: 1.45;
}

.field-label {
  display: grid;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  color: rgba(223, 245, 255, 0.7);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-family: ui-monospace, monospace;
}

.text-input {
  width: 100%;
  min-height: 42px;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  outline: none;
  color: #fff;
  background: rgba(2, 9, 34, 0.75);
  font-size: 13px;
  transition: all 0.2s ease;
}

.text-input:focus {
  border-color: #00d9a4;
  box-shadow: 0 0 0 3px rgba(0, 217, 164, 0.12);
}

.text-input--small {
  min-height: 36px;
  font-size: 12px;
  padding: 8px 12px;
}

.field-tip {
  color: rgba(223, 245, 255, 0.45);
  font-size: 11px;
  line-height: 1.4;
}

.curriculum-upload-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border: 1px solid rgba(87, 187, 255, 0.3);
  border-radius: 10px;
  color: #57bbff;
  background: rgba(87, 187, 255, 0.08);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-btn:hover:not(.disabled) {
  border-color: #57bbff;
  background: rgba(87, 187, 255, 0.18);
  color: #fff;
}

.upload-btn.disabled {
  opacity: 0.5;
  cursor: wait;
}

.curriculum-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.curriculum-link {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 8px;
  color: #7fffdc;
  background: rgba(0, 217, 164, 0.1);
  border: 1px solid rgba(0, 217, 164, 0.3);
  font-size: 12px;
  text-decoration: none;
  font-weight: 600;
}

.curriculum-link:hover {
  background: rgba(0, 217, 164, 0.2);
}

.curriculum-clear {
  display: grid;
  place-content: center;
  width: 28px;
  height: 28px;
  border: 1px solid rgba(255, 100, 120, 0.3);
  border-radius: 8px;
  color: #ff6478;
  background: rgba(255, 100, 120, 0.08);
  cursor: pointer;
  font-size: 12px;
}

.curriculum-clear:hover {
  background: rgba(255, 100, 120, 0.2);
}

.url-input-row {
  margin-top: 4px;
}

.curriculum-preview-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
  font-size: 11px;
  color: #7fffdc;
}

.curriculum-preview-badge--missing {
  color: rgba(223, 245, 255, 0.5);
}

.check-icon {
  font-weight: 800;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.academy-footer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 24px;
  border: 1px solid rgba(87, 187, 255, 0.2);
  border-radius: 16px;
  background: rgba(3, 11, 40, 0.95);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.footer-info {
  color: rgba(223, 245, 255, 0.6);
  font-size: 13px;
}

@media (max-width: 1024px) {
  .card-controls {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .control-box--toggle {
    border-right: none;
    border-bottom: 1px solid rgba(87, 187, 255, 0.1);
    padding-right: 0;
    padding-bottom: 16px;
  }
}
</style>

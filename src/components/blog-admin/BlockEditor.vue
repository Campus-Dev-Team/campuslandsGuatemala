<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import type { EditorMedia } from "../../lib/blog-admin";

type EditorBlock = {
  id: string;
  type: "paragraph" | "heading" | "quote" | "list" | "code" | "image";
  text: string;
  level?: 2 | 3;
  format?: "ordered" | "unordered";
  image?: EditorMedia | null;
};

const props = defineProps<{
  modelValue: any[];
  uploadImage: (file: File) => Promise<EditorMedia>;
  mediaBaseUrl: string;
}>();
const emit = defineEmits<{ (event: "update:modelValue", value: any[]): void }>();

const blocks = ref<EditorBlock[]>([]);
const textareaRefs = new Map<string, HTMLTextAreaElement>();
const uploading = ref(false);
const uploadError = ref("");
let syncingFromParent = false;

const id = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

function inlineToMarkdown(children: any[] = []) {
  return children.map((child) => {
    const value = child.type === "link"
      ? `[${inlineToMarkdown(child.children)}](${child.url || ""})`
      : String(child.text || "");
    if (child.type === "link") return value;
    if (child.code) return `\`${value}\``;
    if (child.bold) return `**${value}**`;
    if (child.italic) return `*${value}*`;
    return value;
  }).join("");
}

function parseInline(value: string) {
  const children: any[] = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let cursor = 0;
  for (const match of value.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > cursor) children.push({ type: "text", text: value.slice(cursor, index) });
    if (match[2] && match[3]) children.push({ type: "link", url: match[3], children: [{ type: "text", text: match[2] }] });
    else if (match[4]) children.push({ type: "text", text: match[4], bold: true });
    else if (match[5]) children.push({ type: "text", text: match[5], italic: true });
    else if (match[6]) children.push({ type: "text", text: match[6], code: true });
    cursor = index + match[0].length;
  }
  if (cursor < value.length) children.push({ type: "text", text: value.slice(cursor) });
  return children.length ? children : [{ type: "text", text: "" }];
}

function fromContent(value: any[] = []): EditorBlock[] {
  return value.map((block) => {
    if (block.type === "list") {
      return {
        id: id(), type: "list" as const, format: block.format === "ordered" ? "ordered" : "unordered",
        text: (block.children || []).map((item: any) => inlineToMarkdown(item.children)).join("\n"),
      };
    }
    if (block.type === "image") return { id: id(), type: "image" as const, text: block.image?.caption || "", image: block.image };
    if (block.type === "code") return { id: id(), type: "code" as const, text: block.children?.map((child: any) => child.text || "").join("") || "" };
    return {
      id: id(),
      type: ["paragraph", "heading", "quote"].includes(block.type) ? block.type : "paragraph",
      text: inlineToMarkdown(block.children),
      level: block.type === "heading" && Number(block.level) === 3 ? 3 : 2,
    } as EditorBlock;
  });
}

function toContent() {
  return blocks.value.flatMap((block) => {
    if (block.type === "image" && block.image) {
      return [{ type: "image", image: { ...block.image, caption: block.text || block.image.caption || null }, children: [{ type: "text", text: "" }] }];
    }
    if (block.type === "list") {
      const items = block.text.split("\n").map((item) => item.trim()).filter(Boolean);
      if (!items.length) return [];
      return [{ type: "list", format: block.format || "unordered", children: items.map((item) => ({ type: "list-item", children: parseInline(item) })) }];
    }
    if (!block.text.trim()) return [];
    if (block.type === "code") return [{ type: "code", children: [{ type: "text", text: block.text }] }];
    return [{
      type: block.type,
      ...(block.type === "heading" ? { level: block.level || 2 } : {}),
      children: parseInline(block.text),
    }];
  });
}

function publishValue() {
  if (syncingFromParent) return;
  emit("update:modelValue", toContent());
}

watch(() => props.modelValue, (value) => {
  syncingFromParent = true;
  blocks.value = fromContent(value || []);
  if (!blocks.value.length) blocks.value = [{ id: id(), type: "paragraph", text: "" }];
  nextTick(() => { syncingFromParent = false; });
}, { immediate: true });

function addBlock(type: EditorBlock["type"], position = blocks.value.length) {
  const block: EditorBlock = {
    id: id(), type, text: "",
    ...(type === "heading" ? { level: 2 as const } : {}),
    ...(type === "list" ? { format: "unordered" as const } : {}),
  };
  blocks.value.splice(position, 0, block);
  publishValue();
  nextTick(() => textareaRefs.get(block.id)?.focus());
}

function removeBlock(index: number) {
  if (blocks.value.length === 1) {
    blocks.value[0].text = "";
  } else {
    blocks.value.splice(index, 1);
  }
  publishValue();
}

function moveBlock(index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= blocks.value.length) return;
  const [block] = blocks.value.splice(index, 1);
  blocks.value.splice(target, 0, block);
  publishValue();
}

function setTextareaRef(blockId: string, element: any) {
  if (element instanceof HTMLTextAreaElement) textareaRefs.set(blockId, element);
  else textareaRefs.delete(blockId);
}

function wrapSelection(block: EditorBlock, prefix: string, suffix = prefix) {
  const field = textareaRefs.get(block.id);
  if (!field) return;
  const start = field.selectionStart;
  const end = field.selectionEnd;
  const selected = block.text.slice(start, end) || "texto";
  block.text = `${block.text.slice(0, start)}${prefix}${selected}${suffix}${block.text.slice(end)}`;
  publishValue();
  nextTick(() => {
    field.focus();
    field.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
  });
}

function insertLink(block: EditorBlock) {
  const field = textareaRefs.get(block.id);
  if (!field) return;
  const selected = block.text.slice(field.selectionStart, field.selectionEnd) || "texto del enlace";
  const target = window.prompt("URL del enlace", "https://");
  if (!target) return;
  const start = field.selectionStart;
  block.text = `${block.text.slice(0, start)}[${selected}](${target})${block.text.slice(field.selectionEnd)}`;
  publishValue();
}

async function addInlineImage(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  (event.target as HTMLInputElement).value = "";
  if (!file) return;
  uploadError.value = "";
  uploading.value = true;
  try {
    const image = await props.uploadImage(file);
    blocks.value.push({ id: id(), type: "image", text: image.caption || "", image });
    publishValue();
  } catch (error) {
    uploadError.value = error instanceof Error ? error.message : "No se pudo subir la imagen.";
  } finally {
    uploading.value = false;
  }
}

function imageUrl(image?: EditorMedia | null) {
  if (!image?.url) return "";
  return image.url.startsWith("http") ? image.url : `${props.mediaBaseUrl}${image.url}`;
}
</script>

<template>
  <div class="block-editor">
    <div class="block-editor__legend">
      <span>EDITOR POR BLOQUES</span>
      <p>Selecciona texto para aplicar formato. Usa una línea por elemento en las listas.</p>
    </div>

    <div class="block-editor__stack">
      <article v-for="(block, index) in blocks" :key="block.id" class="editor-block" :data-type="block.type">
        <div class="editor-block__rail">
          <span>{{ String(index + 1).padStart(2, "0") }}</span>
          <button type="button" aria-label="Mover bloque arriba" :disabled="index === 0" @click="moveBlock(index, -1)">↑</button>
          <button type="button" aria-label="Mover bloque abajo" :disabled="index === blocks.length - 1" @click="moveBlock(index, 1)">↓</button>
          <button type="button" aria-label="Eliminar bloque" @click="removeBlock(index)">×</button>
        </div>

        <div class="editor-block__content">
          <div class="editor-block__toolbar">
            <select v-model="block.type" aria-label="Tipo de bloque" @change="publishValue">
              <option value="paragraph">Párrafo</option>
              <option value="heading">Título</option>
              <option value="quote">Cita</option>
              <option value="list">Lista</option>
              <option value="code">Código</option>
            </select>
            <select v-if="block.type === 'heading'" v-model="block.level" aria-label="Nivel del título" @change="publishValue">
              <option :value="2">H2</option>
              <option :value="3">H3</option>
            </select>
            <select v-if="block.type === 'list'" v-model="block.format" aria-label="Tipo de lista" @change="publishValue">
              <option value="unordered">Viñetas</option>
              <option value="ordered">Numerada</option>
            </select>
            <template v-if="block.type !== 'code' && block.type !== 'image'">
              <button type="button" title="Negrita" @click="wrapSelection(block, '**')"><strong>B</strong></button>
              <button type="button" title="Cursiva" @click="wrapSelection(block, '*')"><em>I</em></button>
              <button type="button" title="Código en línea" @click="wrapSelection(block, '`')">&lt;/&gt;</button>
              <button type="button" title="Enlace" @click="insertLink(block)">↗</button>
            </template>
          </div>

          <figure v-if="block.type === 'image' && block.image" class="editor-block__image">
            <img :src="imageUrl(block.image)" :alt="block.image.alternativeText || 'Imagen del artículo'" />
            <input v-model="block.text" type="text" placeholder="Pie de imagen opcional" @input="publishValue" />
          </figure>
          <textarea
            v-else
            :ref="(element) => setTextareaRef(block.id, element)"
            v-model="block.text"
            :rows="block.type === 'code' || block.type === 'list' ? 6 : block.type === 'heading' ? 2 : 5"
            :placeholder="block.type === 'heading' ? 'Título de la sección' : block.type === 'list' ? 'Un elemento por línea' : block.type === 'code' ? 'Código o ejemplo técnico' : 'Escribe el contenido del bloque…'"
            @input="publishValue"
          ></textarea>
        </div>
      </article>
    </div>

    <div class="block-editor__add">
      <span>AGREGAR</span>
      <button type="button" @click="addBlock('paragraph')">¶ Párrafo</button>
      <button type="button" @click="addBlock('heading')">H2 Título</button>
      <button type="button" @click="addBlock('quote')">“ Cita</button>
      <button type="button" @click="addBlock('list')">☷ Lista</button>
      <button type="button" @click="addBlock('code')">&lt;/&gt; Código</button>
      <label :class="{ 'is-loading': uploading }">
        ⧉ {{ uploading ? "Subiendo…" : "Imagen" }}
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" :disabled="uploading" @change="addInlineImage" />
      </label>
    </div>
    <p v-if="uploadError" class="block-editor__error" role="alert">{{ uploadError }}</p>
  </div>
</template>

<style scoped>
.block-editor { border: 1px solid rgba(85, 186, 255, .18); border-radius: 22px; background: rgba(3, 12, 39, .54); overflow: hidden; }
.block-editor__legend { display: flex; padding: 14px 18px; align-items: center; justify-content: space-between; gap: 16px; border-bottom: 1px solid rgba(85, 186, 255, .14); color: rgba(255,255,255,.42); }
.block-editor__legend span { color: #64c7ff; font: 700 11px/1 ui-monospace, monospace; letter-spacing: .12em; }
.block-editor__legend p { margin: 0; font-size: 11px; }
.block-editor__stack { display: grid; gap: 10px; padding: 12px; }
.editor-block { display: grid; grid-template-columns: 42px minmax(0,1fr); border: 1px solid rgba(255,255,255,.08); border-radius: 16px; background: rgba(8, 19, 55, .8); overflow: hidden; transition: border-color .2s ease; }
.editor-block:focus-within { border-color: rgba(0, 217, 164, .48); }
.editor-block__rail { display: flex; padding: 10px 7px; flex-direction: column; align-items: center; gap: 5px; border-right: 1px solid rgba(255,255,255,.07); color: rgba(255,255,255,.35); }
.editor-block__rail span { margin-bottom: auto; color: #00d9a4; font: 700 10px/1 ui-monospace,monospace; }
.editor-block__rail button { width: 27px; height: 27px; border: 0; border-radius: 8px; color: rgba(255,255,255,.52); background: rgba(255,255,255,.05); cursor: pointer; }
.editor-block__rail button:hover:not(:disabled) { color: white; background: rgba(87,187,255,.15); }
.editor-block__rail button:disabled { opacity: .25; }
.editor-block__content { min-width: 0; }
.editor-block__toolbar { display: flex; min-height: 39px; padding: 6px 8px; align-items: center; gap: 5px; border-bottom: 1px solid rgba(255,255,255,.07); overflow-x: auto; }
.editor-block__toolbar select, .editor-block__toolbar button { min-height: 28px; border: 1px solid rgba(255,255,255,.09); border-radius: 8px; color: rgba(255,255,255,.73); background: #0b1742; font-size: 11px; }
.editor-block__toolbar select { padding: 0 24px 0 8px; }
.editor-block__toolbar button { min-width: 29px; padding: 0 7px; cursor: pointer; }
.editor-block textarea { display: block; width: 100%; min-height: 90px; padding: 15px; resize: vertical; border: 0; outline: 0; color: rgba(255,255,255,.88); background: transparent; font: 400 14px/1.65 inherit; }
.editor-block[data-type="heading"] textarea { color: white; font-size: 20px; font-weight: 700; line-height: 1.25; }
.editor-block[data-type="quote"] textarea { border-left: 3px solid #00d9a4; color: #bdeee2; font-style: italic; }
.editor-block[data-type="code"] textarea { color: #aee7ff; font-family: ui-monospace,monospace; }
.editor-block__image { margin: 0; padding: 12px; }
.editor-block__image img { width: 100%; max-height: 360px; border-radius: 12px; object-fit: cover; }
.editor-block__image input { width: 100%; margin-top: 8px; padding: 10px 12px; border: 1px solid rgba(255,255,255,.1); border-radius: 10px; color: white; background: rgba(0,0,0,.18); }
.block-editor__add { display: flex; padding: 12px 14px; align-items: center; gap: 7px; border-top: 1px solid rgba(85,186,255,.14); overflow-x: auto; }
.block-editor__add > span { margin-right: 4px; color: rgba(255,255,255,.36); font: 700 9px/1 ui-monospace,monospace; letter-spacing: .12em; }
.block-editor__add button, .block-editor__add label { flex: 0 0 auto; padding: 8px 10px; border: 1px solid rgba(87,187,255,.16); border-radius: 9px; color: rgba(255,255,255,.67); background: rgba(87,187,255,.05); font-size: 11px; cursor: pointer; }
.block-editor__add button:hover, .block-editor__add label:hover { border-color: rgba(0,217,164,.5); color: white; }
.block-editor__add input { display: none; }
.block-editor__add .is-loading { opacity: .55; cursor: wait; }
.block-editor__error { margin: 0; padding: 0 16px 14px; color: #ff8f9d; font-size: 12px; }
@media (max-width: 640px) {
  .block-editor__legend { align-items: flex-start; flex-direction: column; }
  .block-editor__legend p { line-height: 1.45; }
  .editor-block { grid-template-columns: 34px minmax(0,1fr); }
  .editor-block__rail { padding-inline: 4px; }
}
</style>

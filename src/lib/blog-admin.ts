export const BLOG_EDITOR_STORAGE_KEY = "campuslands_blog_editor_session";

export type EditorUser = {
  id: number;
  username: string;
  email: string;
  role: { name: string; type: string };
};

export type EditorMedia = {
  id: number;
  documentId?: string;
  url: string;
  name?: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  mime?: string;
};

export type EditorCategory = {
  id?: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  order: number;
  visible: boolean;
};

export type EditorSeo = {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  shareImage?: EditorMedia | null;
};

export type EditorArticle = {
  id?: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any[];
  category: EditorCategory;
  coverImage?: EditorMedia | null;
  coverAlt: string;
  authorName: string;
  featured: boolean;
  readingTime: number;
  publishDate: string;
  tags: string[];
  seo?: EditorSeo | null;
  publicationState?: "draft" | "published" | "modified";
  publishedAt?: string | null;
  publicPublishedAt?: string | null;
  updatedAt?: string;
};

export type EditorDashboard = {
  articles: EditorArticle[];
  categories: EditorCategory[];
  settings: Record<string, any>;
};

export function mediaUrl(cmsUrl: string, media?: EditorMedia | null) {
  if (!media?.url) return "";
  return media.url.startsWith("http") ? media.url : `${cmsUrl}${media.url}`;
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 140);
}

export class BlogAdminApi {
  cmsUrl: string;
  token: string;

  constructor(cmsUrl: string, token = "") {
    this.cmsUrl = cmsUrl.replace(/\/+$/, "");
    this.token = token;
  }

  setToken(token: string) {
    this.token = token;
  }

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");
    if (this.token) headers.set("Authorization", `Bearer ${this.token}`);
    if (init.body && !(init.body instanceof FormData)) headers.set("Content-Type", "application/json");

    const response = await fetch(`${this.cmsUrl}/api${path}`, { ...init, headers });
    if (response.status === 204) return undefined as T;
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = payload?.error?.message || payload?.message || "No se pudo completar la operación.";
      const error = new Error(message) as Error & { status?: number };
      error.status = response.status;
      throw error;
    }
    return payload?.data ?? payload;
  }

  async login(identifier: string, password: string) {
    const response = await fetch(`${this.cmsUrl}/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.jwt) {
      throw new Error(payload?.error?.message || "Correo o contraseña incorrectos.");
    }
    this.setToken(payload.jwt);
    return payload as { jwt: string; user: Record<string, unknown> };
  }

  session() {
    return this.request<EditorUser>("/editor/session");
  }

  dashboard() {
    return this.request<EditorDashboard>("/editor/dashboard");
  }

  article(documentId: string) {
    return this.request<EditorArticle>(`/editor/articles/${encodeURIComponent(documentId)}`);
  }

  createArticle(data: Record<string, unknown>, publish: boolean) {
    return this.request<EditorArticle>("/editor/articles", {
      method: "POST",
      body: JSON.stringify({ data, publish }),
    });
  }

  updateArticle(documentId: string, data: Record<string, unknown>, publish: boolean) {
    return this.request<EditorArticle>(`/editor/articles/${encodeURIComponent(documentId)}`, {
      method: "PUT",
      body: JSON.stringify({ data, publish }),
    });
  }

  publishArticle(documentId: string) {
    return this.request<EditorArticle>(`/editor/articles/${encodeURIComponent(documentId)}/publish`, { method: "POST" });
  }

  unpublishArticle(documentId: string) {
    return this.request<EditorArticle>(`/editor/articles/${encodeURIComponent(documentId)}/unpublish`, { method: "POST" });
  }

  deleteArticle(documentId: string) {
    return this.request<void>(`/editor/articles/${encodeURIComponent(documentId)}`, { method: "DELETE" });
  }

  createCategory(data: Partial<EditorCategory>) {
    return this.request<EditorCategory>("/editor/categories", { method: "POST", body: JSON.stringify({ data }) });
  }

  updateCategory(documentId: string, data: Partial<EditorCategory>) {
    return this.request<EditorCategory>(`/editor/categories/${encodeURIComponent(documentId)}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    });
  }

  deleteCategory(documentId: string) {
    return this.request<void>(`/editor/categories/${encodeURIComponent(documentId)}`, { method: "DELETE" });
  }

  updateSettings(data: Record<string, unknown>) {
    return this.request<Record<string, unknown>>("/editor/settings", {
      method: "PUT",
      body: JSON.stringify({ data }),
    });
  }

  async upload(file: File): Promise<EditorMedia> {
    const form = new FormData();
    form.append("files", file);
    const uploaded = await this.request<EditorMedia[]>("/upload", { method: "POST", body: form });
    if (!uploaded?.[0]) throw new Error("No se recibió el archivo cargado.");
    return uploaded[0];
  }
}

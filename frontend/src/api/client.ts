import type { PublicNavbar, PublicPage, PublicPageDetail } from "./types";

const API_ORIGIN = (import.meta.env.VITE_API_ORIGIN as string | undefined ?? "").replace(/\/$/, "");

async function get<T>(path: string): Promise<T> {
  const url = `${API_ORIGIN}${path}`;
  const res = await fetch(url, { credentials: "omit" });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.json() as Promise<T>;
}

export const publicApi = {
  pages:  (language?: string) =>
    get<{ pages: PublicPage[] }>(`/api/public/pages/${language ? `?language=${encodeURIComponent(language)}` : ""}`),
  navbar: (language = "en") =>
    get<PublicNavbar>(`/api/public/navbar/?language=${encodeURIComponent(language)}`),
  page:   (lang: string, slug: string) =>
    get<PublicPageDetail>(`/${encodeURIComponent(lang)}/${encodeURIComponent(slug)}/data/`),
} as const;

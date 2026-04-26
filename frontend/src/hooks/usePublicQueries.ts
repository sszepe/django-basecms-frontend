import { useQuery } from "@tanstack/react-query";
import { publicApi } from "../api/client";

const keys = {
  pages:  (lang?: string) => ["public", "pages", lang ?? "all"] as const,
  navbar: (lang: string)  => ["public", "navbar", lang]         as const,
  page:   (lang: string, slug: string) => ["public", "page", lang, slug] as const,
};

export function usePublicPagesQuery(language?: string) {
  return useQuery({ queryKey: keys.pages(language), queryFn: () => publicApi.pages(language), select: (d) => d.pages, staleTime: 30_000 });
}
export function usePublicNavbarQuery(language = "en") {
  return useQuery({ queryKey: keys.navbar(language), queryFn: () => publicApi.navbar(language), staleTime: 60_000 });
}
export function usePublicPageQuery(lang: string, slug: string) {
  return useQuery({ queryKey: keys.page(lang, slug), queryFn: () => publicApi.page(lang, slug), staleTime: 30_000, enabled: !!lang && !!slug });
}

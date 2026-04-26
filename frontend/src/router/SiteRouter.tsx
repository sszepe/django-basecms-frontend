import { useEffect, useState } from "react";
import { CmsPageView } from "./CmsPageView";
import { NotFoundView } from "./NotFoundView";

const DEFAULT_LANG = (import.meta.env.VITE_DEFAULT_LANGUAGE as string | undefined) ?? "en";

interface Route { lang: string; slug: string; }

function parsePath(pathname: string): Route | null {
  const m = pathname.match(/^\/([a-z]{2})\/([^/]+)\/?$/);
  if (m) return { lang: m[1], slug: m[2] };
  if (pathname === "/" || pathname === "") return { lang: DEFAULT_LANG, slug: "index" };
  return null;
}

export function SiteRouter() {
  const [route, setRoute] = useState<Route | null>(() => parsePath(window.location.pathname));

  useEffect(() => {
    function onPopState() { setRoute(parsePath(window.location.pathname)); }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto")) return;
      const parsed = parsePath(href);
      if (!parsed) return;
      e.preventDefault();
      window.history.pushState({}, "", href);
      setRoute(parsed);
      window.scrollTo(0, 0);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!route) return <NotFoundView />;
  return <CmsPageView lang={route.lang} slug={route.slug} />;
}

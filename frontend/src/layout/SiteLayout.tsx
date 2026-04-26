import { usePublicNavbarQuery } from "../hooks/usePublicQueries";
import { SiteNavbar } from "./SiteNavbar";

const SITE_TITLE = (import.meta.env.VITE_SITE_TITLE as string | undefined) ?? "Site";

interface Props {
  children: React.ReactNode;
  currentLanguage: string;
  currentSlug: string;
  allLanguages: string[];
  pageTitle?: string;
}

export function SiteLayout({ children, currentLanguage, currentSlug, allLanguages, pageTitle }: Props) {
  const { data: navbar } = usePublicNavbarQuery(currentLanguage);
  const otherLanguages = allLanguages.filter((l) => l !== currentLanguage);

  return (
    <div className="site-shell">
      {/* Navbar with language switcher and CMS nav items */}
      <SiteNavbar
        items={navbar?.items ?? []}
        currentLanguage={currentLanguage}
        currentSlug={currentSlug}
        availableLanguages={otherLanguages}
        siteName={SITE_TITLE}
      />

      {/* Page content */}
      <main className="site-main" aria-label="Main content">
        {children}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="site-footer-inner">
          <span>© {new Date().getFullYear()} {SITE_TITLE}</span>
          {pageTitle && (
            <span className="site-footer-page">{pageTitle}</span>
          )}
        </div>
      </footer>
    </div>
  );
}

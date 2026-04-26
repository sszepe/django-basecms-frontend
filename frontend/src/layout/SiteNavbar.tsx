import { useState } from "react";
import type { NavbarNode } from "../api/types";

interface Props {
  items: NavbarNode[]; currentLanguage: string; currentSlug: string;
  availableLanguages: string[]; siteName?: string;
}

function nodeHref(node: NavbarNode, lang: string): string {
  if (node.cms_page) return `/${lang}/${node.cms_page.slug}/`;
  if (node.external_url) return node.external_url;
  return "#";
}
function isExternal(node: NavbarNode): boolean { return !!node.external_url && !node.cms_page; }

function DropdownMenu({ items, lang }: { items: NavbarNode[]; lang: string }) {
  return (
    <ul className="site-nav-dropdown">
      {items.map((child) => (
        <li key={child.id}>
          <a href={nodeHref(child, lang)} {...(isExternal(child) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {child.title}
          </a>
          {child.children.length > 0 && <DropdownMenu items={child.children} lang={lang} />}
        </li>
      ))}
    </ul>
  );
}

function NavItem({ node, lang }: { node: NavbarNode; lang: string }) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children.length > 0;
  return (
    <li className={`site-nav-item${hasChildren ? " has-dropdown" : ""}${open ? " open" : ""}`}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <a href={nodeHref(node, lang)} className="site-nav-link"
        {...(isExternal(node) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onClick={() => setOpen(false)}>
        {node.title}
        {hasChildren && <span className="site-nav-arrow" aria-hidden>▾</span>}
      </a>
      {hasChildren && open && <DropdownMenu items={node.children} lang={lang} />}
    </li>
  );
}

export function SiteNavbar({ items, currentLanguage, currentSlug, availableLanguages, siteName = "Site" }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <div className="site-nav-inner">
        <a href={`/${currentLanguage}/index/`} className="site-nav-brand">{siteName}</a>
        <ul className="site-nav-links" role="menubar">
          {items.map((node) => <NavItem key={node.id} node={node} lang={currentLanguage} />)}
        </ul>
        <div className="site-nav-controls">
          {availableLanguages.length > 0 && (
            <div className="lang-switcher">
              <span className="lang-current">{currentLanguage.toUpperCase()}</span>
              <ul className="lang-dropdown">
                {availableLanguages.map((code) => (
                  <li key={code}><a href={`/${code}/${currentSlug}/`}>{code.toUpperCase()}</a></li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button className={`site-nav-hamburger${mobileOpen ? " open" : ""}`}
          aria-label="Toggle navigation" aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>
      {mobileOpen && (
        <ul className="site-nav-mobile" role="menu">
          {items.map((node) => (
            <li key={node.id} role="none">
              <a href={nodeHref(node, currentLanguage)} className="site-nav-mobile-link" onClick={() => setMobileOpen(false)}>{node.title}</a>
              {node.children.map((child) => (
                <a key={child.id} href={nodeHref(child, currentLanguage)}
                  className="site-nav-mobile-link site-nav-mobile-link--child"
                  onClick={() => setMobileOpen(false)}>{child.title}</a>
              ))}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

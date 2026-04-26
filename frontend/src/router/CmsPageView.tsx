import type React from "react";
import { usePublicPageQuery } from "../hooks/usePublicQueries";
import { BlockRenderer } from "../blocks/BlockRenderer";
import { SiteLayout } from "../layout/SiteLayout";
import type { PublicBlock } from "../api/types";

const DEFAULT_LANG =
  (import.meta.env.VITE_DEFAULT_LANGUAGE as string | undefined) ?? "en";

const AVAILABLE_LANGUAGES =
  (import.meta.env.VITE_AVAILABLE_LANGUAGES as string | undefined)
    ?.split(",")
    .map((code) => code.trim())
    .filter(Boolean) ?? ["en", "de"];
    
interface Props {
  lang: string;
  slug: string;
}

function clampSpan(span: number | undefined, max = 12): number {
  return Math.min(max, Math.max(1, span ?? 1));
}

function groupRows(blocks: PublicBlock[]): PublicBlock[][] {
  const topLevel = blocks.filter((block) => block.parent_column === null);
  const rows = new Map<number, PublicBlock[]>();

  for (const block of topLevel) {
    const row = rows.get(block.position) ?? [];
    row.push(block);
    rows.set(block.position, row);
  }

  return [...rows.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, row]) => row.sort((a, b) => a.span_order - b.span_order));
}

function pageClass(layout: string, columns: number): string {
  return `site-page site-page--${layout} site-page--cols-${columns || 12}`;
}

function rowStyle(layout: string, columns: number): React.CSSProperties | undefined {
  if (layout !== "grid") return undefined;

  return {
    display: "grid",
    gridTemplateColumns: `repeat(${columns || 12}, minmax(0, 1fr))`,
    gap: "var(--cms-grid-gap, 2rem)",
  };
}

function blockStyle(
  block: PublicBlock,
  layout: string,
  columns: number
): React.CSSProperties | undefined {
  if (layout !== "grid") return undefined;

  return {
    gridColumn: `span ${clampSpan(block.span, columns || 12)}`,
    minWidth: 0,
  };
}

export function CmsPageView({ lang, slug }: Props) {
  const { data, isLoading, error } = usePublicPageQuery(lang, slug);

  const allLanguages = AVAILABLE_LANGUAGES.includes(lang)
    ? AVAILABLE_LANGUAGES
    : [lang, ...AVAILABLE_LANGUAGES];

  if (isLoading) {
    return (
      <SiteLayout currentLanguage={lang} currentSlug={slug} allLanguages={allLanguages}>
        <div className="site-loading">Loading…</div>
      </SiteLayout>
    );
  }

  if (error || !data) {
    return (
      <SiteLayout currentLanguage={lang} currentSlug={slug} allLanguages={allLanguages}>
        <div className="site-error">
          <h1>Page not found</h1>
          <p>This page does not exist or is not published.</p>
          <a href={`/${lang || DEFAULT_LANG}/index/`}>← Go home</a>
        </div>
      </SiteLayout>
    );
  }

  const { page, blocks } = data;
  const rows = groupRows(blocks);
  const columns = page.columns || 12;

  return (
    <SiteLayout
      currentLanguage={page.language}
      currentSlug={page.slug}
      allLanguages={allLanguages}
      pageTitle={page.title}
    >
      <article className={pageClass(page.layout, columns)}>
        {page.show_title && <h1 className="site-page-title">{page.title}</h1>}

        <div className="site-page-rows">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="site-row"
              style={rowStyle(page.layout, columns)}
            >
              {row.map((block) => (
                <div
                  key={block.id}
                  className="site-block-cell"
                  style={blockStyle(block, page.layout, columns)}
                >
                  <BlockRenderer block={block} allBlocks={blocks} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </article>
    </SiteLayout>
  );
}
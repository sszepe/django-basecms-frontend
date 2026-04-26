import { usePublicPagesQuery } from "../hooks/usePublicQueries";
import type { PublicBlock } from "../api/types";

interface Props { block: PublicBlock; }
export function ListOfPagesBlock({ block: _block }: Props) {
  const lang = window.location.pathname.split("/").filter(Boolean)[0] ?? "en";
  const { data: pages = [], isLoading } = usePublicPagesQuery(lang);
  if (isLoading) return null;
  if (pages.length === 0) return null;
  return (
    <div className="cms-list-of-pages">
      <ul>
        {pages.map((p) => <li key={p.id}><a href={`/${p.language}/${p.slug}/`}>{p.title}</a></li>)}
      </ul>
    </div>
  );
}

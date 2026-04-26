import type { PublicBlock } from "../api/types";
export function HtmlBlock({ block }: { block: PublicBlock }) {
  if (!block.content) return null;
  return <div className="cms-html-block" dangerouslySetInnerHTML={{ __html: block.content }} />;
}

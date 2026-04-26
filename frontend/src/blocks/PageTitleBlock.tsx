import type { PublicBlock } from "../api/types";
export function PageTitleBlock({ block }: { block: PublicBlock }) {
  return <h2 className="cms-page-title-block">{block.content || ""}</h2>;
}

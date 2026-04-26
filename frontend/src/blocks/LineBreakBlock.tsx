import type { PublicBlock } from "../api/types";
export function LineBreakBlock({ block }: { block: PublicBlock }) {
  const style = (block.config.style as string) ?? "solid";
  return <hr className={`cms-line-break cms-line-break--${style}`} />;
}

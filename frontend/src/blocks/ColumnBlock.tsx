import type { PublicBlock } from "../api/types";
import { BlockRenderer } from "./BlockRenderer";

interface Props {
  block: PublicBlock;
  allBlocks: PublicBlock[];
}

export function ColumnBlock({ block, allBlocks }: Props) {
  const gap = String(block.config.gap ?? "3");
  const stackOnMobile = block.config.stack_on_mobile !== false;

  const columns = block.columns
    .slice()
    .sort((a, b) => a.order - b.order);

  return (
    <div
      className={`cms-column-block cms-column-block--gap-${gap}${
        stackOnMobile ? " cms-column-block--stack-mobile" : ""
      }`}
    >
      {columns.map((col) => {
        const nested = allBlocks
          .filter((b) => b.parent_column === col.id)
          .sort((a, b) => a.span_order - b.span_order);

        return (
          <div
            key={col.id}
            className={`cms-column ${col.css_class || ""}`}
            style={{
              flexBasis: `${(col.width / 12) * 100}%`,
              maxWidth: `${(col.width / 12) * 100}%`,
              alignItems:
                col.horizontal_align === "center"
                  ? "center"
                  : col.horizontal_align === "end"
                    ? "flex-end"
                    : "flex-start",
              justifyContent:
                col.vertical_align === "center"
                  ? "center"
                  : col.vertical_align === "end"
                    ? "flex-end"
                    : col.vertical_align === "stretch"
                      ? "stretch"
                      : "flex-start",
              backgroundColor: col.background_color || undefined,
              padding: col.padding
                ? `calc(var(--cms-spacing) * ${col.padding})`
                : undefined,
            }}
          >
            {nested.map((nestedBlock) => (
              <BlockRenderer
                key={nestedBlock.id}
                block={nestedBlock}
                allBlocks={allBlocks}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
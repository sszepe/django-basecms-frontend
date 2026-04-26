import type { PublicBlock } from "../api/types";
import { AssetBlock }       from "./AssetBlock";
import { ColumnBlock }      from "./ColumnBlock";
import { HtmlBlock }        from "./HtmlBlock";
import { ImageViewerBlock } from "./ImageViewerBlock";
import { LineBreakBlock }   from "./LineBreakBlock";
import { ListOfPagesBlock } from "./ListOfPagesBlock";
import { MediaEmbedBlock }  from "./MediaEmbedBlock";
import { PageTitleBlock }   from "./PageTitleBlock";
import { PdfViewerBlock }   from "./PdfViewerBlock";

interface Props { block: PublicBlock; allBlocks: PublicBlock[]; }

export function BlockRenderer({ block, allBlocks }: Props) {
  switch (block.block_type.name) {
    case "html":          return <HtmlBlock block={block} />;
    case "image_viewer":  return <ImageViewerBlock block={block} />;
    case "media_embed":   return <MediaEmbedBlock block={block} />;
    case "pdf_viewer":    return <PdfViewerBlock block={block} />;
    case "asset":         return <AssetBlock block={block} />;
    case "line_break":    return <LineBreakBlock block={block} />;
    case "page_title":    return <PageTitleBlock block={block} />;
    case "column":        return <ColumnBlock block={block} allBlocks={allBlocks} />;
    case "list_of_pages": return <ListOfPagesBlock block={block} />;
    default: return <div className="cms-unknown-block"><small>[{block.block_type.label}]</small></div>;
  }
}

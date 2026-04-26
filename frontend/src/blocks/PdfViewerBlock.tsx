import type { PublicBlock } from "../api/types";
export function PdfViewerBlock({ block }: { block: PublicBlock }) {
  const pdfs = block.attachments.filter((a) => (a.media_asset?.kind === "document") || a.external_url);
  if (pdfs.length === 0) return null;
  return (
    <div className="cms-pdf-viewer">
      {pdfs.map((att) => {
        const src = att.media_asset?.file_url || att.media_asset?.source_url || att.external_url;
        if (!src) return null;
        return <iframe key={att.id} src={src} title={att.caption || "PDF"} className="cms-pdf-frame" />;
      })}
    </div>
  );
}

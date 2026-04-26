import type { PublicBlock } from "../api/types";
export function ImageViewerBlock({ block }: { block: PublicBlock }) {
  const images = block.attachments.filter(
    (a) => (a.media_asset && (a.media_asset.file_url || a.media_asset.source_url || a.media_asset.external_url)) || a.external_url
  );
  if (images.length === 0) return null;
  return (
    <div className="cms-image-viewer">
      {images.map((att) => {
        const src = att.media_asset?.file_url || att.media_asset?.source_url || att.media_asset?.external_url || att.external_url;
        if (!src) return null;
        return (
          <figure key={att.id} className="cms-image-figure">
            <img src={src} alt={att.caption || att.media_asset?.title || ""} loading="lazy" />
            {att.caption && <figcaption>{att.caption}</figcaption>}
          </figure>
        );
      })}
    </div>
  );
}

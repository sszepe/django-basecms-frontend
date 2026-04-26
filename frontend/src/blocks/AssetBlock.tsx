import type { PublicBlock } from "../api/types";
export function AssetBlock({ block }: { block: PublicBlock }) {
  if (block.attachments.length === 0) return null;
  return (
    <div className="cms-asset-block">
      {block.attachments.map((att) => {
        const asset = att.media_asset;
        const url = asset?.file_url || asset?.source_url || att.external_url;
        return (
          <div key={att.id} className="cms-asset-item">
            {url ? <a href={url} target="_blank" rel="noopener noreferrer" className="cms-asset-link">{att.caption || asset?.title || url}</a>
              : att.embed_code ? <div dangerouslySetInnerHTML={{ __html: att.embed_code }} /> : null}
          </div>
        );
      })}
    </div>
  );
}

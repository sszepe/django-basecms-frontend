import type { PublicBlock } from "../api/types";
export function MediaEmbedBlock({ block }: { block: PublicBlock }) {
  if (block.attachments.length === 0) return null;
  const alignment = (block.config.alignment as string) ?? "left";
  const size = (block.config.size as string) ?? "medium";
  return (
    <div className={`cms-media-embed cms-media-embed--${alignment} cms-media-embed--${size}`}>
      {block.attachments.map((att) => {
        if (att.embed_code) return <div key={att.id} className="cms-embed-wrapper" dangerouslySetInnerHTML={{ __html: att.embed_code }} />;
        const asset = att.media_asset;
        const src = asset?.file_url || asset?.source_url || att.external_url;
        if (!src) return null;
        if (asset?.kind === "video" || att.external_url.match(/\.(mp4|webm|ogg)$/i)) {
          return <video key={att.id} controls className="cms-media-video"
            autoPlay={(block.config.autoplay as boolean) ?? false}
            loop={(block.config.loop as boolean) ?? false}
            muted={(block.config.muted as boolean) ?? false}>
            <source src={src} type={asset?.mime_type || "video/mp4"} />
          </video>;
        }
        if (asset?.kind === "audio") return <audio key={att.id} controls className="cms-media-audio" src={src} />;
        return <a key={att.id} href={src} target="_blank" rel="noopener noreferrer" className="cms-media-link">{att.caption || asset?.title || src}</a>;
      })}
    </div>
  );
}

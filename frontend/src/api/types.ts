export interface PublicMediaAsset {
  id: number; title: string; kind: string; mime_type: string;
  source_url: string; external_url: string; file_url: string;
}
export interface PublicAttachment {
  id: number; display_order: number; caption: string; embed_code: string;
  external_url: string; attachment_config: Record<string, unknown>;
  media_asset: PublicMediaAsset | null;
}
export interface PublicColumn {
  id: number; order: number; width: number;
  horizontal_align: string; vertical_align: string;
  css_class: string; background_color: string; padding: string;
}
export interface PublicBlockType { id: number; name: string; label: string; }
export interface PublicBlock {
  id: number; position: number; span: number; span_order: number;
  parent_column: number | null; block_type: PublicBlockType;
  config: Record<string, unknown>; content: string;
  attachments: PublicAttachment[]; columns: PublicColumn[];
}
export interface PublicPage {
  id: number; title: string; slug: string; language: string;
  layout: "vertical" | "grid"; columns: number;
  show_title: boolean; is_public: boolean; published_at: string | null;
}
export interface PublicPageDetail { page: PublicPage; blocks: PublicBlock[]; }
export interface NavbarNode {
  id: number; title: string; sort_order: number; is_public: boolean; level: number;
  cms_page: { id: number; slug: string; title: string } | null;
  external_url: string; children: NavbarNode[];
}
export interface PublicNavbar { language: string; items: NavbarNode[]; }

import EntityEditor from "@/components/admin/EntityEditor";

const FIELDS = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image_url", label: "Image", type: "image", required: true },
  { name: "season", label: "Season", type: "select", options: ["2025-26", "2026-27"] },
  { name: "component_id", label: "Component ID", type: "text" },
  { name: "material", label: "Material", type: "text" },
  { name: "display_order", label: "Display Order", type: "number" },
];

export default function AdminGallery() {
  return <EntityEditor entity="GalleryItem" title="Gallery" fields={FIELDS} sortBy="display_order" />;
}
import EntityEditor from "@/components/admin/EntityEditor";

const FIELDS = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image_url", label: "Image", type: "image", required: true },
  { name: "season", label: "Season (type any season, e.g. 2027-28)", type: "text", required: true },
  { name: "component_id", label: "Component ID", type: "text" },
  { name: "material", label: "Material", type: "text" },
  { name: "display_order", label: "Display Order", type: "number" },
];

export default function AdminGallery() {
  return <EntityEditor entity="GalleryItem" title="Gallery" noun="image" fields={FIELDS} sortBy="display_order" />;
}
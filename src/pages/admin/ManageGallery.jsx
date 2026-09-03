import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageGallery() {
  return (
    <ResourceManager
      entity="GalleryItem"
      title="Gallery"
      tag="ADMIN/GALLERY"
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "image_url", label: "Image", type: "image", imageAspect: "aspect-[4/3]", hiddenInTable: true },
        { key: "description", label: "Description", type: "textarea", hiddenInTable: true },
        { key: "component_id", label: "Component ID", type: "text", mono: true, placeholder: "e.g. ARM_01", default: "ROBOT_01" },
        { key: "material", label: "Material", type: "text", mono: true, placeholder: "e.g. CNC_ALUMINUM", default: "CARBON_FIBER" },
        { key: "display_order", label: "Order", type: "number" },
      ]}
    />
  );
}
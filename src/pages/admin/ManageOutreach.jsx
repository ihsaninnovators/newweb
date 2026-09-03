import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageOutreach() {
  return (
    <ResourceManager
      entity="OutreachProject"
      title="Outreach Projects"
      tag="ADMIN/OUTREACH"
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "image_url", label: "Image", type: "image", imageAspect: "aspect-[16/9]", hiddenInTable: true },
        { key: "description", label: "Description", type: "textarea", hiddenInTable: true },
        { key: "date_label", label: "Date Label", type: "text", placeholder: "e.g. Summer 2024" },
        { key: "impact", label: "Impact", type: "text", placeholder: "e.g. 500+ students" },
        { key: "link_url", label: "Link URL", type: "text", placeholder: "https://", hiddenInTable: true },
        { key: "display_order", label: "Order", type: "number" },
      ]}
    />
  );
}
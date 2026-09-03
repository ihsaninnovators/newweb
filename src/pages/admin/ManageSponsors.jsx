import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageSponsors() {
  return (
    <ResourceManager
      entity="Sponsor"
      title="Sponsors"
      tag="ADMIN/SPONSORS"
      fields={[
        { key: "name", label: "Name", type: "text" },
        { key: "logo_url", label: "Logo", type: "image", imageAspect: "aspect-[3/2]", hiddenInTable: true },
        { key: "link_url", label: "Link URL", type: "text", placeholder: "https://", hiddenInTable: true },
        { key: "display_order", label: "Order", type: "number" },
      ]}
    />
  );
}
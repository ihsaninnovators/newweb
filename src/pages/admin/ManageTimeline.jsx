import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageTimeline() {
  return (
    <ResourceManager
      entity="TimelineEvent"
      title="Timeline"
      tag="ADMIN/TIMELINE"
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "date", label: "Date Label", type: "text", placeholder: "e.g. June 2020" },
        { key: "description", label: "Description", type: "textarea", hiddenInTable: true },
        { key: "display_order", label: "Order", type: "number" },
      ]}
    />
  );
}
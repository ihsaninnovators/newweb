import EntityEditor from "@/components/admin/EntityEditor";

const FIELDS = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "date", label: "Date Label", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "display_order", label: "Display Order", type: "number" },
];

export default function AdminTimeline() {
  return <EntityEditor entity="TimelineEvent" title="Timeline" fields={FIELDS} sortBy="display_order" />;
}
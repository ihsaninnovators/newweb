import EntityEditor from "@/components/admin/EntityEditor";

const FIELDS = [
  { name: "label", label: "Label", type: "text", required: true },
  { name: "value", label: "Value", type: "number", required: true },
  { name: "suffix", label: "Suffix", type: "text" },
  { name: "display_order", label: "Display Order", type: "number" },
];

export default function AdminStats() {
  return <EntityEditor entity="Stat" title="Stats" fields={FIELDS} sortBy="display_order" />;
}
import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageStats() {
  return (
    <ResourceManager
      entity="Stat"
      title="Statistics"
      tag="ADMIN/STATS"
      fields={[
        { key: "label", label: "Label", type: "text", placeholder: "e.g. Outreach Hours" },
        { key: "value", label: "Value", type: "number" },
        { key: "suffix", label: "Suffix", type: "text", placeholder: "e.g. +, %, hrs", default: "" },
        { key: "display_order", label: "Order", type: "number" },
      ]}
    />
  );
}
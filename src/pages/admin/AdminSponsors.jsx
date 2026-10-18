import EntityEditor from "@/components/admin/EntityEditor";

const FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "logo_url", label: "Logo", type: "image" },
  { name: "link_url", label: "Link URL", type: "url" },
  { name: "display_order", label: "Display Order", type: "number" },
];

export default function AdminSponsors() {
  return <EntityEditor entity="Sponsor" title="Sponsors" fields={FIELDS} sortBy="display_order" />;
}
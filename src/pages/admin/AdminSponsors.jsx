import EntityEditor from "@/components/admin/EntityEditor";

const FIELDS = [
  {
    name: "name",
    label: "Partner name",
    type: "text",
    required: true,
    hint: "Shown with the logo in the partners strip on the home page.",
  },
  {
    name: "logo_url",
    label: "Logo",
    type: "image",
    hint: "Upload a PNG or SVG with a transparent or light background, or paste an image URL.",
  },
  {
    name: "link_url",
    label: "Website link",
    type: "url",
    hint: "Where the tile should go when clicked. Opens in a new tab.",
  },
  {
    name: "display_order",
    label: "Display order",
    type: "number",
    hint: "Lower numbers appear first.",
  },
];

export default function AdminSponsors() {
  return (
    <EntityEditor
      entity="Sponsor"
      title="Sponsors & Partners"
      description="Add each partner's logo, name and link — they appear in the partners strip on the home page."
      fields={FIELDS}
      sortBy="display_order"
      noun="partner"
      imageField="logo_url"
      linkField="link_url"
    />
  );
}
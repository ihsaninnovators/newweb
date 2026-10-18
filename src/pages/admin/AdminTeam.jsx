import EntityEditor from "@/components/admin/EntityEditor";

const FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "role", label: "Role", type: "text", required: true },
  { name: "group", label: "Group", type: "select", options: ["Captain", "Mentor", "Member"] },
  { name: "sub_team", label: "Sub-Team", type: "select", options: ["Mechanical", "Programming", "Business/Outreach", "CAD", "Admin", "Mentor"] },
  { name: "bio", label: "Bio", type: "textarea" },
  { name: "email", label: "Email", type: "email" },
  { name: "photo_url", label: "Photo", type: "image" },
  { name: "display_order", label: "Display Order", type: "number" },
];

export default function AdminTeam() {
  return <EntityEditor entity="TeamMember" title="Team Members" fields={FIELDS} sortBy="display_order" />;
}
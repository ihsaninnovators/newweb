import ResourceManager from "@/components/admin/ResourceManager";

export default function ManageTeam() {
  return (
    <ResourceManager
      entity="TeamMember"
      title="Team Roster"
      tag="ADMIN/TEAM"
      fields={[
        { key: "name", label: "Name", type: "text" },
        { key: "role", label: "Role", type: "text", placeholder: "e.g. Mechanical Captain" },
        { key: "group", label: "Group", type: "select", options: ["Captain", "Mentor", "Member"], default: "Member" },
        { key: "sub_team", label: "Sub-Team", type: "select", options: ["Mechanical", "Programming", "Business/Outreach", "CAD", "Admin", "Mentor"], default: "Mechanical" },
        { key: "bio", label: "Bio", type: "textarea", hiddenInTable: true },
        { key: "email", label: "Email", type: "text", hiddenInTable: true },
        { key: "photo_url", label: "Photo", type: "image", imageAspect: "aspect-square", hiddenInTable: true },
        { key: "display_order", label: "Order", type: "number" },
      ]}
    />
  );
}
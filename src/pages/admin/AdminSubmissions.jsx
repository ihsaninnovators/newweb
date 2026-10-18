import EntityEditor from "@/components/admin/EntityEditor";

const FIELDS = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "message", label: "Message", type: "textarea" },
];

export default function AdminSubmissions() {
  return (
    <EntityEditor
      entity="ContactSubmission"
      title="Contact Submissions"
      fields={FIELDS}
      sortBy="-created_date"
      canCreate={false}
      canEdit={false}
    />
  );
}
import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import EntityForm from "./EntityForm";
import { Pencil, Plus, Loader2 } from "lucide-react";

const FIELDS = [
  { name: "team_number", label: "Team Number", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "mission_statement", label: "Mission Statement", type: "textarea" },
  { name: "about_text", label: "About Text", type: "textarea" },
  { name: "contact_email", label: "Contact Email", type: "email" },
  { name: "contact_phone", label: "Contact Phone", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "instagram_url", label: "Instagram URL", type: "url" },
  { name: "github_url", label: "GitHub URL", type: "url" },
  { name: "youtube_url", label: "YouTube URL", type: "url" },
  { name: "hero_image_url", label: "Hero Image", type: "image" },
];

export default function SettingsEditor() {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await base44.entities.SiteSetting.list({ limit: 1 });
      const arr = Array.isArray(res) ? res : res.items || [];
      setRecord(arr[0] || null);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const onSave = async (data) => {
    setSaving(true);
    try {
      if (data.id) await base44.entities.SiteSetting.update(data.id, data);
      else await base44.entities.SiteSetting.create(data);
      setEditing(null);
      load();
    } catch (e) {
      alert(e.message);
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Site Settings</h1>
        {record && (
          <button onClick={() => setEditing(record)} className="btn-primary">
            <Pencil size={16} className="mr-2" />Edit
          </button>
        )}
      </div>
      {loading ? (
        <div className="border border-border bg-card/30 px-6 py-5 flex items-center gap-3">
          <Loader2 size={16} className="animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Loading…</span>
        </div>
      ) : record ? (
        <div className="border border-border bg-card/30 p-6 space-y-3">
          {FIELDS.map((f) => (
            <div key={f.name} className="flex gap-6 border-b border-border pb-3 last:border-0 last:pb-0">
              <span className="text-sm text-muted-foreground w-40 shrink-0">{f.label}</span>
              <span className="text-sm break-all">{record[f.name] || "—"}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-border">
          <p className="mono-tag mb-4">No settings record yet.</p>
          <button onClick={() => setEditing({})} className="btn-primary">
            <Plus size={16} className="mr-2" />Create Settings
          </button>
        </div>
      )}
      {editing && (
        <EntityForm
          fields={FIELDS}
          record={editing}
          onSave={onSave}
          onCancel={() => setEditing(null)}
          saving={saving}
        />
      )}
    </div>
  );
}
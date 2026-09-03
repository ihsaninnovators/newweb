import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Save, Loader2 } from "lucide-react";

const FIELDS = [
  { key: "team_number", label: "Team Number", type: "text" },
  { key: "location", label: "Location", type: "text" },
  { key: "mission_statement", label: "Mission Statement", type: "textarea" },
  { key: "about_text", label: "About / Story Text", type: "textarea" },
  { key: "contact_email", label: "Contact Email", type: "text" },
  { key: "contact_phone", label: "Contact Phone", type: "text" },
  { key: "address", label: "Address", type: "text" },
  { key: "instagram_url", label: "Instagram URL", type: "text" },
  { key: "github_url", label: "GitHub URL", type: "text" },
  { key: "youtube_url", label: "YouTube URL", type: "text" },
  { key: "hero_image_url", label: "Hero Image URL", type: "text" },
];

export default function ManageSettings() {
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.entities.SiteSetting.list()
      .then((rows) => setSettings(rows[0] || null))
      .catch(() => {});
  }, []);

  const setField = (key, val) => setSettings((p) => ({ ...p, [key]: val }));

  const save = async () => {
    setSaving(true);
    try {
      const data = { ...settings };
      delete data.id; delete data.created_date; delete data.updated_date; delete data.created_by_id;
      if (settings.id) {
        await base44.entities.SiteSetting.update(settings.id, data);
      } else {
        await base44.entities.SiteSetting.create(data);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      alert("Save failed: " + (e.message || "unknown"));
    } finally {
      setSaving(false);
    }
  };

  if (!settings) return <p className="mono-tag py-20 text-center">[LOADING...]</p>;

  return (
    <div className="max-w-2xl">
      <p className="mono-tag mb-2">[SITE_SETTINGS]</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">Site Settings</h1>

      <div className="space-y-6">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="mono-tag block mb-2">[{f.label}]</label>
            {f.type === "textarea" ? (
              <textarea rows={4} value={settings[f.key] || ""} onChange={(e) => setField(f.key, e.target.value)} className="field-dark resize-none" />
            ) : (
              <input type="text" value={settings[f.key] || ""} onChange={(e) => setField(f.key, e.target.value)} className="field-dark" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button onClick={save} disabled={saving} className="btn-primary">
          {saving ? <Loader2 size={15} className="animate-spin mr-2" /> : <Save size={15} className="mr-2" />}
          {saving ? "SAVING..." : "SAVE_CHANGES"}
        </button>
        {saved && <p className="mono-tag text-primary">[SAVED]</p>}
      </div>
    </div>
  );
}
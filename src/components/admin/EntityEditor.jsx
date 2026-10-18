import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import EntityForm from "./EntityForm";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function EntityEditor({
  entity,
  fields,
  title,
  sortBy = "-created_date",
  canCreate = true,
  canEdit = true,
  canDelete = true,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await base44.entities[entity].list({ sort: sortBy, limit: 100 });
      setItems(Array.isArray(res) ? res : res.items || []);
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
      if (data.id) await base44.entities[entity].update(data.id, data);
      else await base44.entities[entity].create(data);
      setEditing(null);
      load();
    } catch (err) {
      alert(err.message);
    }
    setSaving(false);
  };

  const remove = async (id) => {
    if (!confirm("Delete this record?")) return;
    try {
      await base44.entities[entity].delete(id);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const titleField = fields[0].name;
  const subFields = fields.slice(1, 3).map((f) => f.name);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        {canCreate && (
          <button onClick={() => setEditing({})} className="btn-primary">
            <Plus size={16} className="mr-2" />New
          </button>
        )}
      </div>
      {loading ? (
        <p className="mono-tag">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mono-tag">No records yet.</p>
      ) : (
        <div className="border border-border">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center justify-between gap-4 px-5 py-4 border-b border-border last:border-0"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{it[titleField] || "Untitled"}</p>
                <p className="mono-tag mt-1 truncate">
                  {subFields.map((f) => it[f]).filter(Boolean).join(" · ")}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                {canEdit && (
                  <button onClick={() => setEditing(it)} className="p-2 hover:text-primary" aria-label="Edit">
                    <Pencil size={16} />
                  </button>
                )}
                {canDelete && (
                  <button onClick={() => remove(it.id)} className="p-2 hover:text-destructive" aria-label="Delete">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {editing && (
        <EntityForm
          fields={fields}
          record={editing}
          onSave={onSave}
          onCancel={() => setEditing(null)}
          saving={saving}
        />
      )}
    </div>
  );
}
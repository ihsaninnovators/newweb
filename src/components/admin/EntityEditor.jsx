import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import EntityForm from "./EntityForm";
import { Plus, Pencil, Trash2, ExternalLink, ImageOff, Inbox } from "lucide-react";

export default function EntityEditor({
  entity,
  fields,
  title,
  description,
  sortBy = "-created_date",
  imageField,
  linkField,
  noun,
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
  const nounLabel = noun || title.replace(/s$/, "");
  const metaOf = (it) =>
    fields
      .slice(1, 3)
      .filter((f) => f.name !== imageField && f.name !== linkField && f.type !== "image" && f.type !== "url")
      .map((f) => it[f.name])
      .filter(Boolean)
      .join(" · ");

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {description ||
              (loading
                ? "Loading…"
                : `${items.length} ${items.length === 1 ? "entry" : "entries"}`)}
          </p>
        </div>
        {canCreate && (
          <button onClick={() => setEditing({})} className="btn-primary">
            <Plus size={15} className="mr-2" />Add new
          </button>
        )}
      </div>

      {loading ? (
        <div className="border border-border divide-y divide-border">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4">
              {imageField && <div className="h-12 w-20 shrink-0 bg-secondary/60 animate-pulse" />}
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-40 bg-secondary/60 animate-pulse" />
                <div className="h-3 w-24 bg-secondary/60 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-border px-6 py-16 text-center">
          <Inbox size={26} className="mx-auto mb-4 text-muted-foreground" />
          <p className="font-medium">Nothing here yet</p>
          <p className="text-sm text-muted-foreground mt-1.5 mb-6">
            Add your first {nounLabel.toLowerCase()} and it shows up on the site.
          </p>
          {canCreate && (
            <button onClick={() => setEditing({})} className="btn-primary">
              <Plus size={15} className="mr-2" />Add new
            </button>
          )}
        </div>
      ) : (
        <div className="border border-border divide-y divide-border bg-card/30">
          {items.map((it) => {
            const meta = metaOf(it);
            return (
              <div
                key={it.id}
                className="group flex items-center gap-4 px-4 md:px-5 py-4 hover:bg-secondary/40 transition-colors"
              >
                {imageField &&
                  (it[imageField] ? (
                    <div className="h-12 w-20 shrink-0 border border-border bg-secondary/60 p-1.5 flex items-center justify-center">
                      <img src={it[imageField]} alt="" className="max-h-full max-w-full object-contain" />
                    </div>
                  ) : (
                    <div className="h-12 w-20 shrink-0 border border-dashed border-border flex items-center justify-center">
                      <ImageOff size={14} className="text-muted-foreground" />
                    </div>
                  ))}

                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{it[titleField] || "Untitled"}</p>
                  {meta && <p className="text-xs text-muted-foreground mt-1 truncate">{meta}</p>}
                  {linkField && it[linkField] && (
                    <a
                      href={it[linkField]}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-1.5 max-w-full"
                    >
                      <ExternalLink size={11} className="shrink-0" />
                      <span className="truncate">{it[linkField]}</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                  {canEdit && (
                    <button
                      onClick={() => setEditing(it)}
                      className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary/60 transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                  )}
                  {canDelete && (
                    <button
                      onClick={() => remove(it.id)}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-secondary/60 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <EntityForm
          fields={fields}
          record={editing}
          noun={nounLabel}
          onSave={onSave}
          onCancel={() => setEditing(null)}
          saving={saving}
        />
      )}
    </div>
  );
}
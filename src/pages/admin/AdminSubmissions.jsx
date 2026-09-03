import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Trash2, Mail } from "lucide-react";

export default function AdminSubmissions() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    base44.entities.ContactSubmission.list("-created_date")
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await base44.entities.ContactSubmission.delete(id);
      load();
    } catch (e) {
      alert("Delete failed: " + (e.message || "unknown"));
    }
  };

  return (
    <div>
      <p className="mono-tag mb-2">[SUBMISSIONS]</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">Contact Submissions</h1>

      {loading ? (
        <p className="mono-tag py-20 text-center">[LOADING...]</p>
      ) : items.length === 0 ? (
        <div className="border border-border p-16 text-center">
          <p className="mono-tag mb-2">[NO_SUBMISSIONS]</p>
          <p className="text-muted-foreground">Contact form messages will appear here.</p>
        </div>
      ) : (
        <div className="space-y-px bg-border border border-border">
          {items.map((it) => (
            <div key={it.id} className="bg-background p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-bold">{it.name}</p>
                  <a href={`mailto:${it.email}`} className="mono-tag text-primary flex items-center gap-1 mt-1 hover:underline"><Mail size={12} /> {it.email}</a>
                  <p className="text-muted-foreground mt-3 leading-relaxed">{it.message}</p>
                </div>
                <button onClick={() => remove(it.id)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors shrink-0"><Trash2 size={15} /></button>
              </div>
              <p className="mono-tag mt-4">{it.created_date ? new Date(it.created_date).toLocaleString() : ""}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
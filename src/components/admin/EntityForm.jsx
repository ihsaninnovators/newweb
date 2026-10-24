import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { X } from "lucide-react";

export default function EntityForm({ fields, record, onSave, onCancel, saving, noun = "record" }) {
  const [data, setData] = useState(record);
  const set = (name, val) => setData((d) => ({ ...d, [name]: val }));

  const renderField = (f) => {
    const value = data[f.name] ?? "";
    const common = {
      id: f.name,
      required: f.required,
      className: "field-dark",
      value,
      onChange: (e) => set(f.name, e.target.value),
    };
    switch (f.type) {
      case "textarea":
        return <textarea {...common} rows={4} className="field-dark resize-none" />;
      case "number":
        return (
          <input
            type="number"
            id={f.name}
            required={f.required}
            className="field-dark"
            value={value}
            onChange={(e) => set(f.name, e.target.value === "" ? "" : Number(e.target.value))}
          />
        );
      case "select":
        return (
          <select {...common}>
            <option value="">—</option>
            {f.options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        );
      case "image":
        return <ImageUpload id={f.name} value={value} onChange={(v) => set(f.name, v)} />;
      default:
        return (
          <input
            type={f.type === "email" ? "email" : f.type === "url" ? "url" : "text"}
            {...common}
          />
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
          onSave(data);
        }}
        className="bg-card border border-border w-full max-w-lg max-h-[88vh] flex flex-col"
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              {record.id ? `Edit ${noun.toLowerCase()}` : `New ${noun.toLowerCase()}`}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {record.id ? "Update the details below." : "Fill in the details below."}
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="p-1.5 -mr-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6 overflow-y-auto">
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="block text-sm font-medium mb-2.5">
                {f.label}{f.required ? " *" : ""}
              </label>
              {renderField(f)}
              {f.hint && <p className="text-xs text-muted-foreground mt-2">{f.hint}</p>}
            </div>
          ))}
        </div>

        <div className="flex gap-3 px-6 py-5 border-t border-border">
          <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
          <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
        </div>
      </form>
    </div>
  );
}
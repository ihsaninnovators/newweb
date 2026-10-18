import { useState } from "react";
import ImageUpload from "./ImageUpload";
import { X } from "lucide-react";

export default function EntityForm({ fields, record, onSave, onCancel, saving }) {
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
        return <ImageUpload value={value} onChange={(v) => set(f.name, v)} />;
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
        className="bg-card border border-border w-full max-w-lg max-h-[85vh] overflow-y-auto p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{record.id ? "Edit" : "New"} Record</h3>
          <button type="button" onClick={onCancel} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-5">
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="mono-tag block mb-2">
                {f.label}{f.required ? " *" : ""}
              </label>
              {renderField(f)}
            </div>
          ))}
        </div>
        <div className="flex gap-3 mt-8">
          <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
          <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
        </div>
      </form>
    </div>
  );
}
import { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, Loader2 } from "lucide-react";

export default function ImageUpload({ value, onChange, label, id }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      onChange(file_url);
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
    setUploading(false);
  };

  return (
    <div>
      {label && <label className="mono-tag block mb-2">{label}</label>}
      <div className="flex gap-3 items-start">
        <input
          id={id}
          type="url"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste an image URL"
          className="field-dark flex-1"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="btn-ghost px-4 py-3 shrink-0 inline-flex items-center gap-2 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
          <span className="hidden sm:inline">{uploading ? "Uploading" : "Upload"}</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>
      {value && (
        <img
          src={value}
          alt=""
          className="mt-3 h-24 w-auto max-w-full object-contain border border-border bg-secondary/60 p-2"
        />
      )}
    </div>
  );
}
import React, { useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function ImageUpload({ label, value, onChange, aspect = "aspect-square" }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onChange(file_url);
    } catch (e) {
      alert("Upload failed: " + (e.message || "unknown"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mono-tag block mb-2">[{label}]</label>
      {value ? (
        <div className={`relative ${aspect} w-full border border-border overflow-hidden`}>
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button type="button" onClick={() => onChange("")} className="absolute top-2 right-2 p-1.5 bg-background/80 border border-border hover:border-primary hover:text-primary transition-colors"><X size={14} /></button>
        </div>
      ) : (
        <label className={`${aspect} w-full border border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors`}>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
          {uploading ? (
            <><Loader2 size={20} className="animate-spin mb-2" /><span className="mono-tag">UPLOADING...</span></>
          ) : (
            <><Upload size={20} className="mb-2" /><span className="mono-tag">CLICK_TO_UPLOAD</span></>
          )}
        </label>
      )}
    </div>
  );
}
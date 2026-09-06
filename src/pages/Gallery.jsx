import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import { X } from "lucide-react";

const SEASONS = ["2025-26", "2026-27"];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [season, setSeason] = useState("2025-26");

  useEffect(() => {
    base44.entities.GalleryItem.list("display_order")
      .then(setItems)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((it) => it.season === season);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
      <SectionHeading tag="[ GALLERY ]" title="Project Gallery" subtitle="Robots, parts, and moments from our build seasons." />

      <div className="flex flex-wrap gap-2 mb-12 border-b border-border pb-6">
        {SEASONS.map((s) => (
          <button key={s} onClick={() => setSeason(s)} className={`mono-tag px-4 py-2 border transition-colors ${season === s ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
            [{s.toUpperCase()} SEASON]
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mono-tag py-20 text-center">[LOADING...]</p>
      ) : filtered.length === 0 ? (
        <p className="mono-tag py-20 text-center">[NO_RECORDS]</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {filtered.map((it) => (
            <button key={it.id} onClick={() => setActive(it)} className="bg-background group text-left">
              <div className="aspect-[4/3] overflow-hidden">
                {it.image_url ? (
                  <img src={it.image_url} alt={it.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-secondary grid place-items-center"><span className="mono-tag">[NO_IMAGE]</span></div>
                )}
              </div>
              <div className="p-5">
                <p className="mono-tag text-primary">[{it.component_id}]</p>
                <p className="font-bold mt-2">{it.title}</p>
                <p className="mono-tag mt-1">[{it.material}]</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {active && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setActive(null)}>
          <button className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-primary" onClick={() => setActive(null)}><X size={24} /></button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {active.image_url && <img src={active.image_url} alt={active.title} className="w-full max-h-[70vh] object-contain border border-border" />}
            <div className="mt-6">
              <p className="mono-tag text-primary">[{active.component_id}] · [{active.material}]</p>
              <h3 className="text-2xl font-bold mt-2">{active.title}</h3>
              {active.description && <p className="text-muted-foreground mt-3 leading-relaxed">{active.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
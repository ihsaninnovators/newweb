import React, { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { X } from "lucide-react";
import { SEASON_2025_26, SEASON_2026_27 } from "@/data/gallerySeasons";

const SEASONS = ["2025-26", "2026-27"];

// Load every image from src/assets/gallery/ at build time (Vite glob).
const imageModules = import.meta.glob("../assets/gallery/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const ALL_ITEMS = Object.entries(imageModules).map(([path, url]) => {
  const filename = path.split("/").pop();
  const season = SEASON_2026_27.has(filename)
    ? "2026-27"
    : "2025-26";
  return { id: filename, image_url: url, season };
});

export default function Gallery() {
  const [active, setActive] = useState(null);
  const [season, setSeason] = useState("2025-26");

  const filtered = ALL_ITEMS.filter((it) => it.season === season);

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

      {filtered.length === 0 ? (
        <p className="mono-tag py-20 text-center">[NO_RECORDS]</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {filtered.map((it) => (
            <button key={it.id} onClick={() => setActive(it)} className="bg-background group text-left">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={it.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </button>
          ))}
        </div>
      )}

      {active && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setActive(null)}>
          <button className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-primary" onClick={() => setActive(null)}><X size={24} /></button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={active.image_url} alt="" className="w-full max-h-[80vh] object-contain border border-border" />
          </div>
        </div>
      )}
    </div>
  );
}
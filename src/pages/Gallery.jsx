import React, { useState, useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import { X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import FadeIn from "@/components/FadeIn";

export default function Gallery() {
  const [active, setActive] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { items: records } = await base44.entities.GalleryItem.filter(
          {},
          { sort: "display_order", limit: 500 }
        );
        setItems(records);
        const seasons = Array.from(
          new Set(records.map((r) => r.season).filter(Boolean))
        ).sort();
        if (seasons.length) setSeason(seasons[0]);
      } catch (err) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const seasons = Array.from(
    new Set(items.map((r) => r.season).filter(Boolean))
  ).sort();

  const filtered = season ? items.filter((it) => it.season === season) : items;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
      <FadeIn>
        <SectionHeading
          tag="[ GALLERY ]"
          title="Project Gallery"
          subtitle="Robots, parts, and moments from our build seasons."
        />
      </FadeIn>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
        </div>
      ) : seasons.length === 0 ? (
        <p className="mono-tag py-20 text-center">[NO_RECORDS]</p>
      ) : (
        <>
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-12 border-b border-border pb-6">
              {seasons.map((s) => (
                <button
                  key={s}
                  onClick={() => setSeason(s)}
                  className={`mono-tag px-4 py-2 border transition-colors ${
                    season === s
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  [{s.toUpperCase()} SEASON]
                </button>
              ))}
            </div>
          </FadeIn>

          {filtered.length === 0 ? (
            <p className="mono-tag py-20 text-center">[NO_RECORDS]</p>
          ) : (
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
                {filtered.map((it) => (
                  <button
                    key={it.id}
                    onClick={() => setActive(it)}
                    className="bg-background group text-left"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={it.image_url}
                        alt={it.title || ""}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </FadeIn>
          )}
        </>
      )}

      {active && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-primary"
            onClick={() => setActive(null)}
          >
            <X size={24} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.image_url}
              alt={active.title || ""}
              className="w-full max-h-[80vh] object-contain border border-border"
            />
            {active.title && (
              <p className="mono-tag mt-4 text-center">{active.title}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
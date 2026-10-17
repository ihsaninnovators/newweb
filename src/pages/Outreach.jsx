import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import { ArrowUpRight } from "lucide-react";

export default function Outreach() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.OutreachProject.list("display_order")
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
      <SectionHeading tag="[ OUTREACH ]" title="Community Outreach" subtitle="How we take robotics beyond the lab and into our community." />

      {loading ? (
        <p className="mono-tag py-20 text-center">[LOADING...]</p>
      ) : projects.length === 0 ? (
        <p className="mono-tag py-20 text-center">[NO_RECORDS]</p>
      ) : (
        <div className="border-t border-border">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={p.id} className="border-b border-border py-10 md:py-14">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                  <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                    <div className="aspect-[16/10] overflow-hidden border border-border bg-secondary">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full grid place-items-center"><span className="mono-tag">[NO_IMAGE]</span></div>
                      )}
                    </div>
                  </div>
                  <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="mono-tag text-primary">[{String(i + 1).padStart(2, "0")}]</span>
                      {p.date_label && <span className="mono-tag">{p.date_label}</span>}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight">{p.title}</h3>
                    {p.description && <p className="text-muted-foreground mt-4 leading-relaxed">{p.description}</p>}
                    {p.impact && (
                      <div className="mt-5 inline-flex items-center border border-border px-4 py-2">
                        <span className="mono-tag text-primary">{p.impact}</span>
                      </div>
                    )}
                    {p.link_url && (
                      <a href={p.link_url} target="_blank" rel="noreferrer" className="mono-tag mt-6 hover:text-primary transition-colors flex items-center gap-2 w-fit">
                        LEARN_MORE <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
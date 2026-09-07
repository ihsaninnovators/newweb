import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import { ExternalLink } from "lucide-react";

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
      <SectionHeading tag="[ OUTREACH ]" title="Community Outreach" />

      {loading ? (
        <p className="mono-tag py-20 text-center">[LOADING...]</p>
      ) : projects.length === 0 ? (
        <p className="mono-tag py-20 text-center">[NO_RECORDS]</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {projects.map((p) => (
            <div key={p.id} className="bg-background flex flex-col">
              <div className="aspect-[16/9] overflow-hidden">
                {p.image_url ? (
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-secondary grid place-items-center"><span className="mono-tag">[NO_IMAGE]</span></div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                {p.date_label && <p className="mono-tag text-primary">[{p.date_label}]</p>}
                <h3 className="text-xl font-bold mt-2">{p.title}</h3>
                {p.description && <p className="text-muted-foreground mt-3 leading-relaxed flex-1">{p.description}</p>}
                {p.impact && <p className="mono-tag mt-4">[IMPACT: {p.impact}]</p>}
                {p.link_url && (
                  <a href={p.link_url} target="_blank" rel="noreferrer" className="mono-tag mt-4 hover:text-primary transition-colors flex items-center gap-2">
                    LEARN_MORE <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    base44.entities.Sponsor.list("display_order")
      .then(setSponsors)
      .catch(() => {});
  }, []);

  if (!sponsors.length) return null;

  return (
    <section className="border-t border-border py-24 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading tag="06 / SPONSORS" title="Backed by the best" subtitle="Organizations that make our work possible." align="center" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          {sponsors.map((s) => {
            const inner = (
              <div className="bg-background p-8 md:p-12 flex items-center justify-center h-full hover:bg-secondary transition-colors">
                {s.logo_url ? (
                  <img src={s.logo_url} alt={s.name} className="max-h-16 max-w-[140px] object-contain opacity-70 hover:opacity-100 transition-opacity" />
                ) : (
                  <span className="font-bold text-lg">{s.name}</span>
                )}
              </div>
            );
            return s.link_url ? (
              <a key={s.id} href={s.link_url} target="_blank" rel="noreferrer">{inner}</a>
            ) : (
              <div key={s.id}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
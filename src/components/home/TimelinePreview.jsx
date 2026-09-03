import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";

export default function TimelinePreview() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    base44.entities.TimelineEvent.list("display_order")
      .then(setEvents)
      .catch(() => {});
  }, []);

  if (!events.length) return null;

  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading tag="05 / TIMELINE" title="Our journey" />
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden md:block" />
          <div className="space-y-12">
            {events.slice(0, 5).map((e) => (
              <div key={e.id} className="md:pl-10 md:relative md:pl-12">
                <div className="hidden md:block absolute left-0 top-1.5 w-3 h-3 border border-primary bg-background" />
                <p className="mono-tag text-primary mb-2">[{e.date}]</p>
                <h3 className="text-xl font-bold mb-2">{e.title}</h3>
                {e.description && <p className="text-muted-foreground leading-relaxed max-w-2xl">{e.description}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
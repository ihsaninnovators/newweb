import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import StatCounter from "@/components/StatCounter";
import SectionHeading from "@/components/SectionHeading";

export default function StatsPreview() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    base44.entities.Stat.list("display_order")
      .then(setStats)
      .catch(() => {});
  }, []);

  if (!stats.length) return null;

  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading tag="03 / BY THE NUMBERS" title="Our impact" align="center" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
          {stats.slice(0, 4).map((s) => (
            <div key={s.id} className="bg-background p-8 md:p-10 text-center">
              <p className="text-4xl md:text-6xl font-bold text-primary tabular-nums">
                <StatCounter value={s.value} suffix={s.suffix || ""} />
              </p>
              <p className="mono-tag mt-4">[{s.label}]</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
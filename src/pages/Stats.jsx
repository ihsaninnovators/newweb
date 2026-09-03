import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import StatCounter from "@/components/StatCounter";

export default function Stats() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Stat.list("display_order")
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
      <SectionHeading tag="[ STATISTICS ]" title="By The Numbers" subtitle="Measurable impact from our seasons of competition and outreach." />

      {loading ? (
        <p className="mono-tag py-20 text-center">[LOADING...]</p>
      ) : stats.length === 0 ? (
        <p className="mono-tag py-20 text-center">[NO_RECORDS]</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border">
          {stats.map((s) => (
            <div key={s.id} className="bg-background p-10 text-center">
              <p className="text-5xl md:text-7xl font-bold text-primary tabular-nums">
                <StatCounter value={s.value} suffix={s.suffix || ""} />
              </p>
              <p className="mono-tag mt-5">[{s.label}]</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
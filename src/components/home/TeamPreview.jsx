import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";

export default function TeamPreview() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    base44.entities.TeamMember.list("display_order")
      .then(setMembers)
      .catch(() => {});
  }, []);

  const captains = members.filter((m) => m.group === "Captain").slice(0, 4);

  return (
    <section className="border-t border-border py-24 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading tag="04 / THE TEAM" title="Meet our leaders" />

        {captains.length === 0 ? (
          <p className="mono-tag">[NO_CAPTAINS_LISTED]</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {captains.map((m) => (
              <div key={m.id} className="border border-border p-6">
                <p className="font-bold">{m.name}</p>
                <p className="mono-tag mt-1">[{m.role}]</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
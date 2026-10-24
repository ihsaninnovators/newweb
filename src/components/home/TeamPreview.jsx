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

  const subTeamColor = {
    Mechanical: "text-orange-400",
    Programming: "text-primary",
    "Business/Outreach": "text-green-400",
    CAD: "text-purple-400",
    Mentor: "text-amber-400",
    Admin: "text-red-400",
  };

  return (
    <section className="border-t border-border py-24 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading index="04" tag="THE TEAM" title="Meet our leaders" />

        {captains.length === 0 ? (
          <p className="mono-tag">[NO_CAPTAINS_LISTED]</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {captains.map((m) => (
              <div key={m.id} className="bg-background p-6 card-hover group">
                <div className="mb-4 h-px w-8 bg-border group-hover:bg-primary group-hover:w-12 transition-all" />
                <p className="font-bold text-lg">{m.name}</p>
                <p className={`mono-tag mt-2 ${subTeamColor[m.sub_team] || "text-muted-foreground"}`}>[{m.role}]</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
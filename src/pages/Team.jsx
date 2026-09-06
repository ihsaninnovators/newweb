import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    base44.entities.TeamMember.list("display_order")
      .then(setMembers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const subTeamColor = {
    "Mechanical": "text-orange-400",
    "Programming": "text-blue-400",
    "Business/Outreach": "text-green-400",
    "CAD": "text-primary",
    "Admin": "text-primary",
    "Mentor": "text-primary",
  };

  const groups = ["All", "Captain", "Mentor", "Member"];
  const filtered = filter === "All" ? members : members.filter((m) => m.group === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
      <SectionHeading tag="[ TEAM ]" title="The Roster" subtitle="The students and mentors behind Ihsan Innovators #30695." />

      <div className="flex flex-wrap gap-2 mb-12 border-b border-border pb-6">
        {groups.map((g) => (
          <button key={g} onClick={() => setFilter(g)} className={`mono-tag px-4 py-2 border transition-colors ${filter === g ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
            [{g.toUpperCase()}]
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mono-tag py-20 text-center">[LOADING...]</p>
      ) : filtered.length === 0 ? (
        <p className="mono-tag py-20 text-center">[NO_RECORDS]</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((m) => (
            <div key={m.id} className="group">
              <div className="aspect-square border border-border overflow-hidden mb-4">
                {m.photo_url ? (
                  <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                ) : (
                  <div className="w-full h-full bg-secondary grid place-items-center"><span className="mono-tag">[NO_PHOTO]</span></div>
                )}
              </div>
              <p className="font-bold">{m.name}</p>
              <p className="mono-tag mt-1 text-primary">[{m.role}]</p>
              <p className={`mono-tag mt-1 ${subTeamColor[m.sub_team] || "text-primary"}`}>[{m.sub_team}]</p>
              {m.bio && <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-3">{m.bio}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
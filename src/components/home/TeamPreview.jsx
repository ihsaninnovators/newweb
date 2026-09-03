import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import { ArrowRight } from "lucide-react";

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <SectionHeading tag="04 / THE TEAM" title="Meet our leaders" />
          <Link to="/team" className="mono-tag hover:text-primary transition-colors flex items-center gap-2">
            VIEW FULL ROSTER <ArrowRight size={14} />
          </Link>
        </div>

        {captains.length === 0 ? (
          <p className="mono-tag">[NO_CAPTAINS_LISTED]</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {captains.map((m) => (
              <div key={m.id} className="group">
                <div className="aspect-square border border-border overflow-hidden mb-4">
                  {m.photo_url ? (
                    <img src={m.photo_url} alt={m.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                  ) : (
                    <div className="w-full h-full bg-secondary grid place-items-center"><span className="mono-tag">[NO_PHOTO]</span></div>
                  )}
                </div>
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
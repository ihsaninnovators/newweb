import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";

const SECTIONS = [
  { to: "/admin/settings", label: "Site Settings", entity: "SiteSetting" },
  { to: "/admin/team", label: "Team Members", entity: "TeamMember" },
  { to: "/admin/stats", label: "Stats", entity: "Stat" },
  { to: "/admin/sponsors", label: "Sponsors", entity: "Sponsor" },
  { to: "/admin/gallery", label: "Gallery", entity: "GalleryItem" },
  { to: "/admin/timeline", label: "Timeline", entity: "TimelineEvent" },
  { to: "/admin/submissions", label: "Submissions", entity: "ContactSubmission" },
];

export default function AdminHome() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    Promise.all(
      SECTIONS.map(async (s) => {
        try {
          const c = await base44.entities[s.entity].count();
          return [s.entity, c];
        } catch {
          return [s.entity, null];
        }
      })
    ).then((entries) => setCounts(Object.fromEntries(entries)));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Admin Overview</h1>
      <p className="text-muted-foreground mb-8">Manage all site content from here.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {SECTIONS.map((s) => (
          <Link key={s.to} to={s.to} className="border border-border p-5 card-hover">
            <div className="flex justify-between items-center">
              <span className="font-medium">{s.label}</span>
              <span className="mono-tag">{counts[s.entity] ?? "…"}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
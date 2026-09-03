import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Users, Clock, Images, BarChart3, Building2, HeartHandshake, Inbox, Settings, ArrowRight } from "lucide-react";

const CARDS = [
  { label: "Team Roster", path: "/admin/team", icon: Users, entity: "TeamMember" },
  { label: "Timeline", path: "/admin/timeline", icon: Clock, entity: "TimelineEvent" },
  { label: "Gallery", path: "/admin/gallery", icon: Images, entity: "GalleryItem" },
  { label: "Statistics", path: "/admin/stats", icon: BarChart3, entity: "Stat" },
  { label: "Sponsors", path: "/admin/sponsors", icon: Building2, entity: "Sponsor" },
  { label: "Outreach", path: "/admin/outreach", icon: HeartHandshake, entity: "OutreachProject" },
  { label: "Submissions", path: "/admin/submissions", icon: Inbox, entity: "ContactSubmission" },
  { label: "Site Settings", path: "/admin/settings", icon: Settings, entity: null },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    CARDS.forEach((c) => {
      if (!c.entity) return;
      base44.entities[c.entity].list()
        .then((rows) => setCounts((p) => ({ ...p, [c.entity]: rows.length })))
        .catch(() => {});
    });
  }, []);

  return (
    <div>
      <p className="mono-tag mb-2">[DASHBOARD]</p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">Control Center</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.path} to={c.path} className="bg-background p-6 hover:bg-secondary transition-colors group">
              <div className="flex items-start justify-between mb-8">
                <Icon size={22} className="text-primary" />
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="font-bold">{c.label}</p>
              {c.entity && <p className="mono-tag mt-1">[{counts[c.entity] ?? "..."} RECORDS]</p>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
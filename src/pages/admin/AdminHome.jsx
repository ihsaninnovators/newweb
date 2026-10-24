import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  Settings,
  Users,
  BarChart3,
  Handshake,
  Images,
  Clock,
  Inbox,
  ArrowUpRight,
} from "lucide-react";

const SECTIONS = [
  { to: "/admin/settings", label: "Site Settings", entity: "SiteSetting", icon: Settings },
  { to: "/admin/team", label: "Team Members", entity: "TeamMember", icon: Users },
  { to: "/admin/stats", label: "Stats", entity: "Stat", icon: BarChart3 },
  { to: "/admin/sponsors", label: "Sponsors & Partners", entity: "Sponsor", icon: Handshake },
  { to: "/admin/gallery", label: "Gallery", entity: "GalleryItem", icon: Images },
  { to: "/admin/timeline", label: "Timeline", entity: "TimelineEvent", icon: Clock },
  { to: "/admin/submissions", label: "Submissions", entity: "ContactSubmission", icon: Inbox },
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
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Everything visitors see on the site is managed from here.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SECTIONS.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="group border border-border bg-card/30 p-5 hover:border-primary/60 hover:bg-secondary/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-7">
              <span className="inline-flex items-center justify-center h-9 w-9 border border-border text-primary group-hover:border-primary/50 transition-colors">
                <s.icon size={16} />
              </span>
              <ArrowUpRight
                size={16}
                className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <p className="font-medium">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-1.5">
              {counts[s.entity] === null || counts[s.entity] === undefined
                ? "…"
                : `${counts[s.entity]} ${counts[s.entity] === 1 ? "entry" : "entries"}`}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
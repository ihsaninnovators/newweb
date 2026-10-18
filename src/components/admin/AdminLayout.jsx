import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import { LogOut, ExternalLink, ShieldCheck } from "lucide-react";

const NAV = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/settings", label: "Site Settings" },
  { to: "/admin/team", label: "Team" },
  { to: "/admin/stats", label: "Stats" },
  { to: "/admin/sponsors", label: "Sponsors" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/timeline", label: "Timeline" },
  { to: "/admin/submissions", label: "Submissions" },
];

export default function AdminLayout() {
  const { user, isAuthenticated, isLoadingAuth, authChecked, checkUserAuth } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) checkUserAuth();
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  useEffect(() => {
    if (authChecked && !isLoadingAuth && !isAuthenticated && !redirecting) {
      setRedirecting(true);
      base44.auth.redirectToLogin(window.location.href);
    }
  }, [authChecked, isLoadingAuth, isAuthenticated, redirecting]);

  if (isLoadingAuth || !authChecked || redirecting) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <ShieldCheck size={32} className="mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-xl font-bold mb-2">Admin access required</h1>
          <p className="text-muted-foreground mb-6">
            Your account doesn't have admin permissions for this area.
          </p>
          <button onClick={() => base44.auth.logout(window.location.origin)} className="btn-ghost">
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:flex">
      <aside className="md:w-60 md:fixed md:h-screen border-r border-border flex flex-col p-5">
        <div className="mb-8">
          <p className="mono-tag text-primary">ADMIN</p>
          <p className="text-sm text-muted-foreground mt-1 truncate">{user?.email}</p>
        </div>
        <nav className="flex-1 space-y-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `block px-3 py-2 mono-tag ${isActive ? "text-primary bg-secondary" : "hover:text-primary"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-1 pt-4 border-t border-border">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-3 py-2 mono-tag hover:text-primary w-full text-left"
          >
            <ExternalLink size={14} /> View Site
          </button>
          <button
            onClick={() => base44.auth.logout("/")}
            className="flex items-center gap-2 px-3 py-2 mono-tag hover:text-destructive w-full text-left"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 md:ml-60 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
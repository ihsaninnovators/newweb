import { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { base44 } from "@/api/base44Client";
import {
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  Handshake,
  Images,
  Clock,
  Inbox,
} from "lucide-react";

const LOGO_URL =
  "https://media.base44.com/images/public/6a99a526b6f8be408ecdca4a/48b9a5fd1_Screenshot_2026-09-20_at_33428_PM-Photoroom-recolored.png";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
  { to: "/admin/team", label: "Team", icon: Users },
  { to: "/admin/stats", label: "Stats", icon: BarChart3 },
  { to: "/admin/sponsors", label: "Sponsors & Partners", icon: Handshake },
  { to: "/admin/gallery", label: "Gallery", icon: Images },
  { to: "/admin/timeline", label: "Timeline", icon: Clock },
  { to: "/admin/submissions", label: "Submissions", icon: Inbox },
];

const navClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2.5 text-sm border-l-2 transition-colors ${
    isActive
      ? "border-primary bg-primary/10 text-primary"
      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"
  }`;

export default function AdminLayout() {
  const { user, isAuthenticated, isLoadingAuth, authChecked, checkUserAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [redirecting, setRedirecting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) checkUserAuth();
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  useEffect(() => {
    if (authChecked && !isLoadingAuth && !isAuthenticated && !redirecting) {
      setRedirecting(true);
      base44.auth.redirectToLogin(window.location.href);
    }
  }, [authChecked, isLoadingAuth, isAuthenticated, redirecting]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
        <div className="w-full max-w-sm border border-border bg-card/40 p-8 text-center">
          <ShieldCheck size={28} className="mx-auto mb-5 text-primary" />
          <h1 className="text-lg font-semibold tracking-tight mb-2">Admin access required</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Your account doesn't have admin permissions for this area.
          </p>
          <button onClick={() => base44.auth.logout(window.location.origin)} className="btn-ghost w-full">
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between h-16 px-5 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Ihsan Innovators" className="h-8 w-auto" />
          <span className="text-sm font-semibold tracking-tight">Admin</span>
        </div>
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Admin menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="md:hidden border-b border-border bg-card/60 backdrop-blur px-3 py-3 space-y-1">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={navClass}>
              <n.icon size={16} className="shrink-0" />
              <span className="truncate">{n.label}</span>
            </NavLink>
          ))}
        </nav>
      )}

      <div className="md:flex">
        <aside className="hidden md:flex md:fixed md:inset-y-0 md:w-64 md:flex-col border-r border-border bg-card/30 px-5 py-7">
          <div className="flex items-center gap-3 mb-9">
            <img src={LOGO_URL} alt="Ihsan Innovators" className="h-10 w-auto" />
            <div className="min-w-0">
              <p className="text-sm font-semibold tracking-tight">Admin</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={navClass}>
                <n.icon size={16} className="shrink-0" />
                <span className="truncate">{n.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="pt-4 mt-4 border-t border-border space-y-1">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground w-full text-left transition-colors"
            >
              <ExternalLink size={15} /> View site
            </button>
            <button
              onClick={() => base44.auth.logout("/")}
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground hover:text-destructive w-full text-left transition-colors"
            >
              <LogOut size={15} /> Log out
            </button>
          </div>
        </aside>

        <main className="flex-1 md:ml-64 px-5 py-8 md:px-10 md:py-12">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/6a99a526b6f8be408ecdca4a/dba9b218a_image.png";

const LINKS = [
  { label: "Home", path: "/" },
  { label: "Gallery", path: "/gallery" },
  { label: "Stats", path: "/stats" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent border-b border-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={LOGO_URL} alt="Ihsan Innovators" className="h-10 w-auto" />
          <span className="mono-tag group-hover:text-primary transition-colors">FTC #30695</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => {
            const active = location.pathname === l.path;
            return (
              <Link key={l.path} to={l.path} className={`mono-tag transition-colors relative py-1 ${active ? "text-primary" : "hover:text-primary"}`}>
                {l.label}
                {active && <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-primary" />}
              </Link>
            );
          })}
        </div>

        <button className="md:hidden p-2 -mr-2" onClick={() => setOpen((p) => !p)} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="flex flex-col px-6 py-4">
            {LINKS.map((l) => {
              const active = location.pathname === l.path;
              return (
                <Link key={l.path} to={l.path} className={`py-3 mono-tag border-b border-border last:border-0 flex items-center justify-between ${active ? "text-primary" : ""}`}>
                  {l.label}
                  {active && <span className="h-1.5 w-1.5 bg-primary" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
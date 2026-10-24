import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Github, Mail, Lock } from "lucide-react";

const LOGO_URL = "https://media.base44.com/images/public/6a99a526b6f8be408ecdca4a/f47ded68d_Screenshot_2026-09-20_at_33428_PM-Photoroom.png";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={LOGO_URL} alt="Ihsan Innovators" className="h-12 w-auto" />
              <span className="mono-tag">FTC #30695</span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Empowering the youth through technology. Preparing tomorrow's innovators for today's challenges.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="mono-tag mb-5">[NAVIGATE]</p>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/gallery" className="text-sm hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/stats" className="text-sm hover:text-primary transition-colors">Stats</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mono-tag mb-5">[CONNECT]</p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 border border-border hover:border-primary hover:text-primary transition-colors"><Instagram size={16} /></a>
              <a href="https://github.com/ihsaninnovators/ihsaninnovatorswebsite" target="_blank" rel="noreferrer" className="p-2.5 border border-border hover:border-primary hover:text-primary transition-colors"><Github size={16} /></a>
              <a href="mailto:ihsaninnovators@gmail.com" className="p-2.5 border border-border hover:border-primary hover:text-primary transition-colors"><Mail size={16} /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4">
          <p className="mono-tag">© {new Date().getFullYear()} IHSAN INNOVATORS — ALL RIGHTS RESERVED</p>
          <p className="mono-tag">SAN JOSE, CA · EST. 2026</p>
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/admin" className="inline-flex items-center gap-2 px-4 py-2 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors mono-tag">
            <Lock size={12} /> ADMIN
          </Link>
        </div>
      </div>
    </footer>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Github, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <span className="grid place-items-center w-9 h-9 border border-foreground font-mono text-xs font-bold">ii</span>
              <div className="leading-none">
                <span className="text-sm font-bold tracking-tight block">IHSAN INNOVATORS</span>
                <span className="mono-tag mt-1 block">FTC #30695</span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Empowering the youth through technology. Preparing tomorrow's innovators for today's challenges.
            </p>
          </div>

          <div>
            <p className="mono-tag mb-5">[NAVIGATE]</p>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/team" className="text-sm hover:text-primary transition-colors">Team</Link></li>
              <li><Link to="/gallery" className="text-sm hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/outreach" className="text-sm hover:text-primary transition-colors">Outreach</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="mono-tag mb-5">[CONNECT]</p>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"><Instagram size={16} /></a>
              <a href="https://github.com/ihsaninnovators/ihsaninnovatorswebsite" target="_blank" rel="noreferrer" className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"><Github size={16} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"><Youtube size={16} /></a>
              <a href="mailto:ihsaninnovators@gmail.com" className="p-2 border border-border hover:border-primary hover:text-primary transition-colors"><Mail size={16} /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-4">
          <p className="mono-tag">© {new Date().getFullYear()} IHSAN INNOVATORS — ALL RIGHTS RESERVED</p>
          <p className="mono-tag">SAN JOSE, CA · EST. 2020</p>
        </div>
      </div>
    </footer>
  );
}
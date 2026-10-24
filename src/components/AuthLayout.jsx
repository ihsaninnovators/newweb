import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 mono-tag text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={14} /> Back to site
        </Link>
        <div className="mb-10 text-center">
          <img src="https://media.base44.com/images/public/6a99a526b6f8be408ecdca4a/48b9a5fd1_Screenshot_2026-09-20_at_33428_PM-Photoroom-recolored.png" alt="Ihsan Innovators" className="h-14 w-auto mx-auto mb-6" />
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="mono-tag mt-3">{subtitle}</p>}
        </div>
        <div className="border border-border p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
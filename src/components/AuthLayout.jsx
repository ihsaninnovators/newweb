import React from "react";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="inline-grid place-items-center w-12 h-12 border border-foreground font-mono text-sm font-bold mb-6">ii</div>
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
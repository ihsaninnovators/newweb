import React from "react";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <img src="https://media.base44.com/images/public/6a99a526b6f8be408ecdca4a/dba9b218a_image.png" alt="Ihsan Innovators" className="h-14 w-auto mx-auto mb-6" />
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
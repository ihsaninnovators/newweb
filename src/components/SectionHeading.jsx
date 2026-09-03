import React from "react";

export default function SectionHeading({ tag, title, subtitle, align = "left" }) {
  return (
    <div className={`mb-14 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}>
      {tag && <p className="mono-tag mb-4">[{tag}]</p>}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>}
      <div className={`mt-6 h-px w-16 bg-primary ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
}
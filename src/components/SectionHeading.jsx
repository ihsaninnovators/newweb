import React from "react";

export default function SectionHeading({ tag, index, title, subtitle, align = "left" }) {
  return (
    <div className={`mb-14 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}>
      {tag && (
        <div className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}>
          {index && <span className="mono-tag text-primary">{index}</span>}
          <span className="h-px w-8 bg-primary/50" />
          <p className="mono-tag">{tag}</p>
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]">{title}</h2>
      {subtitle && <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>}
      {align !== "center" && <div className="mt-6 h-px w-16 bg-primary" />}
    </div>
  );
}
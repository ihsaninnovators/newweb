import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    base44.entities.SiteSetting.list()
      .then((rows) => setSettings(rows[0] || null))
      .catch(() => {});
  }, []);

  const heroImg = settings?.hero_image_url || "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2000&q=80";

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] max-w-4xl">
          IHSAN<br/>INNOVATORS
        </h1>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
          {settings?.mission_statement || "Preparing tomorrow's innovators for today's challenges."}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/gallery" className="btn-primary">VIEW GALLERY <ArrowRight size={15} className="ml-2" /></Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-end mono-tag">
          <span className="hidden md:block">EST. 2024</span>
        </div>
      </div>
    </section>
  );
}
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
        <img src={heroImg} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto px-6 md:px-10 w-full"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="flex items-center gap-3 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <span className="h-px w-10 bg-primary" />
          <p className="mono-tag text-primary">FTC #30695 · SAN JOSE, CA</p>
        </motion.div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] max-w-4xl">
          IHSAN<br/>INNOVATORS
        </h1>
        <motion.p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}>
          {settings?.mission_statement || "Preparing tomorrow's innovators for today's challenges."}
        </motion.p>
        <motion.div className="mt-10 flex flex-wrap gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
          <Link to="/gallery" className="btn-primary">VIEW GALLERY <ArrowRight size={15} className="ml-2" /></Link>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between mono-tag">
          <span className="hidden md:block">SCROLL TO EXPLORE</span>
          <span className="hidden md:block">EST. 2024</span>
        </div>
      </div>
    </section>
  );
}
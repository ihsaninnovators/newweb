import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { Cpu, Wrench, Code2, Megaphone } from "lucide-react";

const PILLARS = [
  { icon: Wrench, title: "Mechanical", desc: "Designing and fabricating competitive robot hardware." },
  { icon: Code2, title: "Programming", desc: "Writing autonomous and tele-op control software." },
  { icon: Cpu, title: "CAD", desc: "Modeling parts and assemblies in 3D before machining." },
  { icon: Megaphone, title: "Outreach", desc: "Spreading STEM through community events and mentorship." },
];

export default function WhatWeDo() {
  return (
    <section className="border-t border-border py-24 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading index="02" tag="WHAT WE DO" title="Engineering the future" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-background p-8 card-hover hover:bg-secondary group">
                <div className="mb-6">
                  <Icon size={28} className="text-primary" />
                </div>
                <p className="mono-tag mb-3">[{p.title.toUpperCase()}]</p>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                <div className="mt-6 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { Printer, ArrowRight } from "lucide-react";

export default function PrintingService() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading index="07" tag="SERVICES" title="3D Printing Service" />
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Need custom parts printed? Our team offers 3D printing services to the community. All proceeds support our robotics program.
          </p>
          <a href="https://ii3dprint.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">
            REQUEST A QUOTE <ArrowRight size={15} className="ml-2" />
          </a>
        </div>
        <div className="border border-border p-10 bg-secondary/30 card-hover">
          <Printer size={48} className="text-primary mb-6" />
          <p className="mono-tag mb-4">[CAPABILITIES]</p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-3"><span className="h-1 w-1 bg-primary" /> PLA, PETG, ABS, TPU filaments</li>
            <li className="flex items-center gap-3"><span className="h-1 w-1 bg-primary" /> Custom design &amp; modeling</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
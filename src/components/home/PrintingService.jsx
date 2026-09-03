import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { Printer, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PrintingService() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHeading tag="07 / SERVICES" title="3D Printing Service" />
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Need custom parts printed? Our team offers 3D printing services to the community. All proceeds support our robotics program.
          </p>
          <Link to="/contact" className="btn-primary">
            REQUEST A QUOTE <ArrowRight size={15} className="ml-2" />
          </Link>
        </div>
        <div className="border border-border p-10 bg-secondary/30">
          <Printer size={48} className="text-primary mb-6" />
          <p className="mono-tag mb-4">[CAPABILITIES]</p>
          <ul className="space-y-3 text-muted-foreground">
            <li>· FDM &amp; Resin printing</li>
            <li>· PLA, PETG, ABS, TPU filaments</li>
            <li>· Custom design &amp; modeling</li>
            <li>· Fast turnaround for local teams</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
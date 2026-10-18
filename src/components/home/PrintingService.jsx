import React, { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import FadeIn from "@/components/FadeIn";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const SPECS = [
  { label: "MACHINES", value: "Bambu Lab H2D · H2S · X1-C" },
  { label: "MAX VOLUME", value: "340×320×340mm" },
  { label: "LAYERS", value: "0.04mm min" },
  { label: "COLORS", value: "Up to 16" },
];

export default function PrintingService() {
  const [form, setForm] = useState({ name: "", email: "", details: "" });

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleRequest = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`3D Print Request — ${form.name || "New Request"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nPrint details:\n${form.details}`
    );
    window.location.href = `mailto:ihsaninnovators@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading index="07" tag="SERVICES" title="3D Printing Service" />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeIn>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Beyond the competition floor, our team runs a community 3D printing service — high-quality prints for a small fee based on size and material. Run by Aayan &amp; Ammaar, co-founders of Ihsan Innovators #30695.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="https://ii3dprint.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">
                VISIT II3DPRINT.COM <ArrowRight size={15} className="ml-2" />
              </a>
            </div>
            <div className="border border-border bg-secondary/30 card-hover">
              <ul className="divide-y divide-border">
                {SPECS.map((s) => (
                  <li key={s.label} className="flex items-center justify-between px-6 py-5">
                    <span className="mono-tag">{s.label}</span>
                    <span className="font-mono text-sm text-foreground">{s.value}</span>
                  </li>
                ))}
                <li className="px-6 py-5">
                  <a href="https://ii3dprint.com/" target="_blank" rel="noopener noreferrer" className="mono-tag text-primary hover:opacity-80 inline-flex items-center gap-2">
                    VIEW_PRINT_GALLERY <ArrowUpRight size={13} />
                  </a>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form onSubmit={handleRequest} className="border border-border bg-secondary/30 p-8 card-hover">
              <p className="mono-tag mb-6">[REQUEST_A_PRINT]</p>
              <div className="space-y-6">
                <div>
                  <label className="mono-tag block mb-2">NAME</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="field-dark" placeholder="Your name" />
                </div>
                <div>
                  <label className="mono-tag block mb-2">EMAIL</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="field-dark" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="mono-tag block mb-2">PRINT_DETAILS</label>
                  <textarea name="details" value={form.details} onChange={handleChange} required rows={4} className="field-dark resize-none" placeholder="What do you need printed? Include size, material, color, and quantity." />
                </div>
              </div>
              <button type="submit" className="btn-ghost w-full mt-8">
                REQUEST A PRINT <ArrowRight size={15} className="ml-2" />
              </button>
              <p className="mono-tag mt-4 text-center">Opens your email app to ihsaninnovators@gmail.com</p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
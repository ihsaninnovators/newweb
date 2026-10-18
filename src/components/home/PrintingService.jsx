import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

const SPECS = [
  { label: "MACHINES", value: "Bambu Lab H2D · H2S · X1-C" },
  { label: "MAX VOLUME", value: "340×320×340mm" },
  { label: "LAYERS", value: "0.04mm min" },
  { label: "COLORS", value: "Up to 16" },
];

export default function PrintingService() {
  const [form, setForm] = useState({ name: "", email: "", details: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleRequest = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await base44.functions.invoke("submitPrintRequest", form);
      setStatus("sent");
      setForm({ name: "", email: "", details: "" });
    } catch (err) {
      setStatus("error");
    }
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
                VISIT TO GET A QUOTE <ArrowRight size={15} className="ml-2" />
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
              <button type="submit" disabled={status === "sending"} className="btn-ghost w-full mt-8 disabled:opacity-50">
                {status === "sending" ? "SENDING…" : "REQUEST A PRINT"} <ArrowRight size={15} className="ml-2" />
              </button>
              {status === "sent" && <p className="mono-tag mt-4 text-center text-primary">Request sent — we'll be in touch soon.</p>}
              {status === "error" && <p className="mono-tag mt-4 text-center text-destructive">Something went wrong. Please try again.</p>}
              {status === "idle" && <p className="mono-tag mt-4 text-center">Sends your request to ihsaninnovators@gmail.com</p>}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
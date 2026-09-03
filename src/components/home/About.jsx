import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    base44.entities.SiteSetting.list()
      .then((rows) => setSettings(rows[0] || null))
      .catch(() => {});
  }, []);

  return (
    <section className="border-t border-border py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <SectionHeading tag="01 / ABOUT" title="Who we are" />
        </div>
        <div className="md:col-span-7">
          <p className="text-xl md:text-2xl leading-relaxed font-light">
            {settings?.about_text || "We are FTC Team #30695, a robotics team based in San Jose, California. We build, program, and compete with robots while spreading STEM education throughout our community."}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8">
            <div className="border-l-2 border-primary pl-4">
              <p className="mono-tag mb-2">[MISSION]</p>
              <p className="text-muted-foreground leading-relaxed">{settings?.mission_statement || "Preparing tomorrow's innovators for today's challenges."}</p>
            </div>
            <div className="border-l-2 border-border pl-4">
              <p className="mono-tag mb-2">[LOCATION]</p>
              <p className="text-muted-foreground leading-relaxed">{settings?.location || "San Jose, CA"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
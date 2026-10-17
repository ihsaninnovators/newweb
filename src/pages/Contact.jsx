import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import FadeIn from "@/components/FadeIn";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    base44.entities.SiteSetting.list()
      .then((rows) => setSettings(rows[0] || null))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 md:py-28">
      <SectionHeading tag="[ CONTACT ]" title="Get in touch" subtitle="Questions, sponsorships, or 3D printing inquiries — we'd love to hear from you." />

      <FadeIn>
      <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
        <div className="bg-background p-8 md:p-12">
          <p className="mono-tag mb-6">[DIRECT]</p>
          <div className="space-y-6">
            {settings?.contact_email && (
              <a href={`mailto:${settings.contact_email}`} className="flex items-start gap-4 group">
                <span className="grid place-items-center w-10 h-10 border border-border group-hover:border-primary group-hover:text-primary transition-colors"><Mail size={16} /></span>
                <div className="pt-2">
                  <p className="mono-tag mb-1">EMAIL</p>
                  <p className="text-foreground group-hover:text-primary transition-colors break-all">{settings.contact_email}</p>
                </div>
              </a>
            )}
            {settings?.contact_phone && (
              <div className="flex items-start gap-4">
                <span className="grid place-items-center w-10 h-10 border border-border"><Phone size={16} className="text-primary" /></span>
                <div className="pt-2">
                  <p className="mono-tag mb-1">PHONE</p>
                  <p>{settings.contact_phone}</p>
                </div>
              </div>
            )}
            {!settings?.contact_email && !settings?.contact_phone && (
              <p className="mono-tag">[NO_CONTACT_INFO]</p>
            )}
          </div>
        </div>

        <div className="bg-background p-8 md:p-12">
          <p className="mono-tag mb-6">[ADDRESS]</p>
          <div className="flex items-start gap-4">
            <span className="grid place-items-center w-10 h-10 border border-border"><MapPin size={16} className="text-primary" /></span>
            <div className="pt-2">
              <p className="mono-tag mb-1">LOCATION</p>
              <p className="text-lg leading-relaxed">
                2486 Ruby Avenue<br />
                San Jose, CA 95148
              </p>
            </div>
          </div>
          <a href="https://maps.google.com/?q=2486+Ruby+Avenue+San+Jose+CA+95148" target="_blank" rel="noreferrer" className="mono-tag mt-8 hover:text-primary transition-colors flex items-center gap-2 w-fit">
            OPEN IN MAPS <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      </FadeIn>
    </div>
  );
}
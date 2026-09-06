import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import { Mail, Phone, MapPin } from "lucide-react";

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

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <p className="mono-tag mb-4">[DIRECT]</p>
            <div className="space-y-4">
              {settings?.contact_email && (
                <a href={`mailto:${settings.contact_email}`} className="flex items-start gap-3 group">
                  <Mail size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-foreground group-hover:text-primary transition-colors break-all">{settings.contact_email}</p>
                  </div>
                </a>
              )}
              {settings?.contact_phone && (
                <div className="flex items-start gap-3">
                  <Phone size={18} className="text-primary mt-0.5" />
                  <p>{settings.contact_phone}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border border-border p-8">
          <p className="mono-tag mb-4">[ADDRESS]</p>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-primary mt-0.5" />
            <p className="text-lg leading-relaxed">
              2486 Ruby Avenue<br />
              San Jose, CA 95148
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
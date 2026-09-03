import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import SectionHeading from "@/components/SectionHeading";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

export default function Contact() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    base44.entities.SiteSetting.list()
      .then((rows) => setSettings(rows[0] || null))
      .catch(() => {});
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await base44.entities.ContactSubmission.create(form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "Submission failed");
    } finally {
      setSending(false);
    }
  };

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
              {(settings?.address || settings?.location) && (
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5" />
                  <p>{settings.address || settings.location}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border border-border p-8">
          {sent ? (
            <div className="text-center py-10">
              <p className="mono-tag text-primary mb-4">[MESSAGE_SENT]</p>
              <p className="text-lg">Thank you — we'll get back to you soon.</p>
              <button onClick={() => setSent(false)} className="btn-ghost mt-6">SEND_ANOTHER</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <div>
                <label className="mono-tag block mb-2">[NAME]</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field-dark" placeholder="Your name" />
              </div>
              <div>
                <label className="mono-tag block mb-2">[EMAIL]</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field-dark" placeholder="you@example.com" />
              </div>
              <div>
                <label className="mono-tag block mb-2">[MESSAGE]</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="field-dark resize-none" placeholder="How can we help?" />
              </div>
              {error && <p className="mono-tag text-primary">[ERROR: {error}]</p>}
              <button type="submit" disabled={sending} className="btn-primary w-full">
                {sending ? <Loader2 size={15} className="animate-spin mr-2" /> : <Send size={15} className="mr-2" />}
                {sending ? "SENDING..." : "SEND_MESSAGE"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
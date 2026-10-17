import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import FadeIn from "@/components/FadeIn";

export default function ContactForm() {
  const [form, setForm] = useState({ first: "", last: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.first || !form.last || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      await base44.functions.invoke("submitContactForm", {
        name: `${form.first} ${form.last}`.trim(),
        email: form.email,
        message: form.message,
      });
      setSent(true);
      setForm({ first: "", last: "", email: "", message: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FadeIn delay={0.15}>
      <div className="bg-background border border-border p-8 md:p-12">
        <p className="mono-tag mb-2">[ MESSAGE ]</p>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Send us a message here!</h3>
        <p className="mono-tag mt-3 text-muted-foreground">* INDICATES REQUIRED FIELD</p>

        {sent ? (
          <div className="mt-8 border border-primary p-6">
            <p className="mono-tag text-primary">[MESSAGE_SENT]</p>
            <p className="mt-2 text-muted-foreground">Thanks for reaching out — we'll get back to you soon.</p>
            <button onClick={() => setSent(false)} className="mono-tag mt-4 hover:text-primary transition-colors">
              SEND ANOTHER →
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="mono-tag block mb-2">FIRST NAME <span className="text-red-500">*</span></label>
                <input value={form.first} onChange={update("first")} className="field-dark" required />
              </div>
              <div>
                <label className="mono-tag block mb-2">LAST NAME <span className="text-red-500">*</span></label>
                <input value={form.last} onChange={update("last")} className="field-dark" required />
              </div>
            </div>
            <div>
              <label className="mono-tag block mb-2">EMAIL <span className="text-red-500">*</span></label>
              <input type="email" value={form.email} onChange={update("email")} className="field-dark" required />
            </div>
            <div>
              <label className="mono-tag block mb-2">MESSAGE <span className="text-red-500">*</span></label>
              <textarea rows={5} value={form.message} onChange={update("message")} className="field-dark resize-none" required />
            </div>

            {error && <p className="mono-tag text-red-500">[{error.toUpperCase()}]</p>}

            <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {submitting ? "SUBMITTING…" : "SUBMIT"}
            </button>
          </form>
        )}
      </div>
    </FadeIn>
  );
}
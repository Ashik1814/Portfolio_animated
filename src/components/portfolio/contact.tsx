"use client";

import { useState } from "react";
import {
  MapPin,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { MovingBorderIcon } from "@/components/ui/moving-border-icon";
import { motion } from "framer-motion";
import { useContent } from "@/stores/content-store";
import { getIcon } from "@/lib/get-icon";

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const siteConfig = useContent((s) => s.siteConfig);
  const contactCards = useContent((s) => s.contactCards);
  const loading = useContent((s) => s.loading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send message");
        return;
      }

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section id="contact" className="pt-28 pb-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-32 mx-auto bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </section>
    );
  }
  if (!siteConfig) return null;

  return (
    <section id="contact" className="pt-28 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Let&apos;s work together
          </h2>
          <p className="dark:text-[#94a3b8] text-gray-600 max-w-xl mx-auto text-base leading-relaxed">
            {siteConfig.contactDescription}
          </p>
        </div>

        {/* Profile Image + Map + Contact Cards Row */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-12">
          {/* Left — Profile Image (top) + Map (bottom, aligned with Send Message) */}
          <div className="flex flex-col items-center justify-between">
            {/* Profile image — same style as homepage, smaller size */}
            <div className="relative p-2 sm:p-3">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 bg-gradient-to-r from-[#00e5ff]/15 dark:from-[#00e5ff]/15 from-[#00a8cc]/10 via-[#64b5f6]/15 dark:via-[#64b5f6]/15 via-[#64b5f6]/10 to-[#a78bfa]/15 dark:to-[#a78bfa]/15 to-[#a78bfa]/10 rounded-full blur-2xl" />

              <MovingBorderIcon borderRadius="9999px" className="w-52 h-52 sm:w-64 sm:h-64" duration={6}>
                <div className="w-full h-full rounded-full dark:bg-[#06080f] bg-white flex items-center justify-center overflow-hidden p-1">
                  <div className="w-full h-full rounded-full dark:bg-gradient-to-br dark:from-[#0a0f1e] dark:to-[#0d1525] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    {siteConfig.heroProfileImage ? (
                      <img
                        src={siteConfig.heroProfileImage}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 text-center p-6">
                        <div className="w-16 h-16 rounded-full dark:bg-gradient-to-br dark:from-[#00e5ff]/15 dark:to-[#64b5f6]/15 bg-gradient-to-br from-[#00a8cc]/10 to-[#64b5f6]/10 flex items-center justify-center">
                          <svg
                            className="w-8 h-8 dark:text-[#64748b]/60 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                        <p className="text-xs dark:text-[#64748b]/60 text-gray-400 leading-relaxed">
                          Add your photo<br />at <code className="dark:text-[#00e5ff]/60 text-[#00a8cc]">/public/profile.jpg</code>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </MovingBorderIcon>
            </div>

            {/* Name & Title */}
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-1">
              <span className="gradient-text-cyan">{siteConfig.heroName}</span>
            </h3>
            <p className="text-sm dark:text-[#94a3b8] text-gray-600 mb-4">{siteConfig.heroTitle}</p>

            {/* Google Map — pushed down to align with Send Message card */}
            <div className="w-full max-w-sm mt-auto">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 dark:text-[#00e5ff] text-[#00a8cc]" />
                <h4 className="text-sm font-bold dark:text-white text-gray-900">My Location</h4>
              </div>
              <div className="relative h-[240px] rounded-2xl overflow-hidden border dark:border-[#00e5ff]/15 border-[#00a8cc]/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d762.8985941189203!2d90.44841492842714!3d23.800619998659187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDQ4JzAyLjIiTiA5MMKwMjYnNTYuNiJF!5e1!3m2!1sen!2sbd!4v1776953690722!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-6">
              <MapPin className="w-3.5 h-3.5 dark:text-[#00e5ff] text-[#00a8cc]" />
              <span className="text-xs dark:text-[#94a3b8] text-gray-600">{siteConfig.contactLocationText}</span>
            </div>
          </div>

          {/* Right — Contact Cards + Social Links + Message Form */}
          <div className="flex flex-col">
            {/* Contact Cards */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              {contactCards.map((card) => {
                const Icon = getIcon(card.icon);
                return (
                  <a
                    key={card.id}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group"
                  >
                    <CardSpotlight className="p-4 glass-card-solid transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <MovingBorderIcon borderRadius="0.5rem" className="w-9 h-9 shrink-0" duration={5}>
                          <div className="absolute inset-0 rounded-[inherit] dark:bg-[#00e5ff]/15 bg-[#00a8cc]/15 dark:group-hover:bg-[#00e5ff]/25 group-hover:bg-[#00a8cc]/25 transition-colors" />
                          <Icon className="w-4 h-4 dark:text-[#00e5ff] text-[#00a8cc] relative" />
                        </MovingBorderIcon>
                        <div className="min-w-0">
                          <p className="text-xs dark:text-[#64748b] text-gray-500 mb-0.5">{card.label}</p>
                          <p className="text-sm font-medium dark:text-white text-gray-900 truncate dark:group-hover:text-[#00e5ff] group-hover:text-[#00a8cc] transition-colors">{card.value}</p>
                        </div>
                      </div>
                    </CardSpotlight>
                  </a>
                );
              })}
            </div>

            {/* Contact Form — traveling light dot stroke (same as Send Message button) */}
            <div className="relative mt-8 rounded-xl overflow-hidden p-[1px]">
              {/* Traveling light dot overlay */}
              <div
                className="-inset-px pointer-events-none absolute rounded-[inherit] border-2 border-transparent border-inset [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
              >
                <motion.div
                  className="absolute aspect-square"
                  style={{
                    width: 30,
                    background: "linear-gradient(to right, transparent, #00e5ff, #a78bfa)",
                    offsetPath: "rect(0 auto auto 0 round 30px)",
                  }}
                  animate={{ offsetDistance: ["0%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                />
              </div>
              {/* Inner card content */}
              <div className="relative p-6 rounded-xl dark:bg-[#0a0512]/80 bg-white/80 backdrop-blur-xl">
                <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-4">
                  Send me a <span className="gradient-text-cyan">Message</span>
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm dark:text-[#94a3b8] text-gray-600">Your Name</label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="dark:bg-[#06080f] bg-white dark:border-[#1e3a5f] border-gray-300 dark:text-white text-gray-900 dark:placeholder:text-[#475569] placeholder:text-gray-400 dark:focus:border-[#00e5ff]/50 focus:border-[#00a8cc]/50 rounded-lg h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm dark:text-[#94a3b8] text-gray-600">Your Email</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="dark:bg-[#06080f] bg-white dark:border-[#1e3a5f] border-gray-300 dark:text-white text-gray-900 dark:placeholder:text-[#475569] placeholder:text-gray-400 dark:focus:border-[#00e5ff]/50 focus:border-[#00a8cc]/50 rounded-lg h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm dark:text-[#94a3b8] text-gray-600">Your Message</label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="dark:bg-[#06080f] bg-white dark:border-[#1e3a5f] border-gray-300 dark:text-white text-gray-900 dark:placeholder:text-[#475569] placeholder:text-gray-400 dark:focus:border-[#00e5ff]/50 focus:border-[#00a8cc]/50 rounded-lg resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                  {success && (
                    <p className="text-green-500 text-sm">Message sent successfully!</p>
                  )}
                  <AnimatedBorderButton
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#00e5ff] hover:bg-[#00c2e5] dark:text-[#06080f] text-white font-semibold rounded-lg h-11 shadow-lg dark:shadow-[#00e5ff]/20 shadow-[#00a8cc]/15 transition-all duration-200 disabled:opacity-50"
                    gradientVia="#00e5ff"
                    gradientTo="#a78bfa"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {submitting ? "Sending..." : "Send Message"}
                  </AnimatedBorderButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

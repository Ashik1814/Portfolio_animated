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
import { useContent } from "@/stores/content-store";
import { getIcon } from "@/lib/get-icon";

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const siteConfig = useContent((s) => s.siteConfig);
  const contactCards = useContent((s) => s.contactCards);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: "", email: "", message: "" });
  };

  if (!siteConfig) return null;

  return (
    <section id="contact" className="pt-20 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-gray-900 mb-4">
            Let&apos;s work together
          </h2>
          <p className="dark:text-[#94a3b8] text-gray-600 max-w-xl mx-auto text-base leading-relaxed">
            {siteConfig.contactDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 pb-16">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {contactCards.map((card) => {
                const Icon = getIcon(card.icon);
                return (
                  <a key={card.id} href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group">
                    <CardSpotlight className="p-4 glass-card-solid transition-all duration-200">
                      <div className="flex items-start gap-3">
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
            <div className="flex items-center gap-2 pt-3">
              <MovingBorderIcon borderRadius="0.375rem" className="w-7 h-7" duration={5}>
                <div className="absolute inset-0 rounded-[inherit] dark:bg-[#00e5ff]/15 bg-[#00a8cc]/15" />
                <MapPin className="w-4 h-4 dark:text-[#00e5ff] text-[#00a8cc] relative" />
              </MovingBorderIcon>
              <span className="text-sm dark:text-[#94a3b8] text-gray-600">{siteConfig.contactLocationText}</span>
            </div>
          </div>

          <CardSpotlight className="p-6 glass-card-solid">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm dark:text-[#94a3b8] text-gray-600">Your Name</label>
                <Input placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="dark:bg-[#06080f] bg-white dark:border-[#1e3a5f] border-gray-300 dark:text-white text-gray-900 dark:placeholder:text-[#475569] placeholder:text-gray-400 dark:focus:border-[#00e5ff]/50 focus:border-[#00a8cc]/50 rounded-lg h-11" />
              </div>
              <div className="space-y-2">
                <label className="text-sm dark:text-[#94a3b8] text-gray-600">Your Email</label>
                <Input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="dark:bg-[#06080f] bg-white dark:border-[#1e3a5f] border-gray-300 dark:text-white text-gray-900 dark:placeholder:text-[#475569] placeholder:text-gray-400 dark:focus:border-[#00e5ff]/50 focus:border-[#00a8cc]/50 rounded-lg h-11" />
              </div>
              <div className="space-y-2">
                <label className="text-sm dark:text-[#94a3b8] text-gray-600">Your Message</label>
                <Textarea placeholder="Tell me about your project..." rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="dark:bg-[#06080f] bg-white dark:border-[#1e3a5f] border-gray-300 dark:text-white text-gray-900 dark:placeholder:text-[#475569] placeholder:text-gray-400 dark:focus:border-[#00e5ff]/50 focus:border-[#00a8cc]/50 rounded-lg resize-none" />
              </div>
              <AnimatedBorderButton
                type="submit"
                className="w-full bg-[#00e5ff] hover:bg-[#00c2e5] dark:text-[#06080f] text-white font-semibold rounded-lg h-11 shadow-lg dark:shadow-[#00e5ff]/20 shadow-[#00a8cc]/15 transition-all duration-200"
                gradientVia="#00e5ff"
                gradientTo="#a78bfa"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </AnimatedBorderButton>
            </form>
          </CardSpotlight>
        </div>
      </div>
    </section>
  );
}



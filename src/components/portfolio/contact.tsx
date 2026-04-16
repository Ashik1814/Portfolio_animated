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
import Image from "next/image";

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const siteConfig = useContent((s) => s.siteConfig);
  const contactCards = useContent((s) => s.contactCards);
  const socialLinks = useContent((s) => s.socialLinks);

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

        {/* Profile Image + Map Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left — Profile Image + Contact Info */}
          <CardSpotlight className="glass-card-solid p-6 flex flex-col items-center">
            {/* Profile Image */}
            <div className="relative mb-5">
              <MovingBorderIcon borderRadius="50%" className="w-32 h-32 sm:w-40 sm:h-40" duration={6}>
                <div className="absolute inset-0 rounded-[inherit] dark:bg-[#0a0512] bg-white" />
                {siteConfig.heroProfileImage ? (
                  <Image
                    src={siteConfig.heroProfileImage}
                    alt={siteConfig.heroName || "Profile"}
                    fill
                    className="rounded-full object-cover p-1"
                  />
                ) : (
                  <div className="w-full h-full rounded-full dark:bg-[#0a0512] bg-gray-100 flex items-center justify-center">
                    <span className="text-3xl dark:text-[#00e5ff] text-[#00a8cc] font-bold">
                      {siteConfig.heroName?.charAt(0) || "A"}
                    </span>
                  </div>
                )}
              </MovingBorderIcon>
            </div>

            {/* Name & Title */}
            <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-1">
              <span className="gradient-text-cyan">{siteConfig.heroName}</span>
            </h3>
            <p className="text-sm dark:text-[#94a3b8] text-gray-600 mb-5">{siteConfig.heroTitle}</p>

            {/* Contact Cards */}
            <div className="w-full grid grid-cols-2 gap-3 mb-5">
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
                    <CardSpotlight className="p-3 glass-card-solid transition-all duration-200">
                      <div className="flex items-center gap-2.5">
                        <MovingBorderIcon borderRadius="0.5rem" className="w-8 h-8 shrink-0" duration={5}>
                          <div className="absolute inset-0 rounded-[inherit] dark:bg-[#00e5ff]/15 bg-[#00a8cc]/15 dark:group-hover:bg-[#00e5ff]/25 group-hover:bg-[#00a8cc]/25 transition-colors" />
                          <Icon className="w-3.5 h-3.5 dark:text-[#00e5ff] text-[#00a8cc] relative" />
                        </MovingBorderIcon>
                        <div className="min-w-0">
                          <p className="text-[10px] dark:text-[#64748b] text-gray-500 leading-tight">{card.label}</p>
                          <p className="text-xs font-medium dark:text-white text-gray-900 truncate dark:group-hover:text-[#00e5ff] group-hover:text-[#00a8cc] transition-colors">{card.value}</p>
                        </div>
                      </div>
                    </CardSpotlight>
                  </a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group"
                  >
                    <MovingBorderIcon borderRadius="0.5rem" className="w-10 h-10" duration={5}>
                      <div className="absolute inset-0 rounded-[inherit] dark:bg-[#00e5ff]/10 bg-[#00a8cc]/10 dark:group-hover:bg-[#00e5ff]/20 group-hover:bg-[#00a8cc]/20 transition-colors" />
                      <Icon className="w-4 h-4 dark:text-[#00e5ff] text-[#00a8cc] relative" />
                    </MovingBorderIcon>
                  </a>
                );
              })}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-4">
              <MapPin className="w-3.5 h-3.5 dark:text-[#00e5ff] text-[#00a8cc]" />
              <span className="text-xs dark:text-[#94a3b8] text-gray-600">{siteConfig.contactLocationText}</span>
            </div>
          </CardSpotlight>

          {/* Right — Google Map */}
          <CardSpotlight className="glass-card-solid p-4 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 dark:text-[#00e5ff] text-[#00a8cc]" />
              <h4 className="text-sm font-bold dark:text-white text-gray-900">My Location</h4>
            </div>
            <div className="relative flex-1 min-h-[300px] rounded-xl overflow-hidden border dark:border-white/[0.06] border-gray-200/60">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703752325!2d90.27923991562853!3d23.780573258035916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563b5e21c6c0!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </CardSpotlight>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto pb-16">
          <CardSpotlight className="p-6 glass-card-solid">
            <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-4 text-center">
              Send me a <span className="gradient-text-cyan">Message</span>
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
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

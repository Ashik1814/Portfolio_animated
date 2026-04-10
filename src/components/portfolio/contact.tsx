"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Dribbble,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@example.com",
    subtext: "I'll respond within 24 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    subtext: "Available for remote work",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    subtext: "Available for remote work",
  },
];

const socials = [
  { icon: Github, name: "GitHub", color: "#4dabf7", href: "https://github.com" },
  { icon: Linkedin, name: "LinkedIn", color: "#4dabf7", href: "https://linkedin.com" },
  { icon: Twitter, name: "Twitter", color: "#4dabf7", href: "https://twitter.com" },
  { icon: Dribbble, name: "Dribbble", color: "#ff6b9d", href: "https://dribbble.com" },
];

const faqs = [
  {
    question: "What is your typical response time?",
    answer: "I usually respond within 24 hours on weekdays.",
  },
  {
    question: "Do you work on freelance projects?",
    answer:
      "Yes, I'm open to freelance opportunities that align with my expertise.",
  },
  {
    question: "What are your rates?",
    answer:
      "Rates vary by project scope. Let's discuss your requirements!",
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will be wired to backend later
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <section id="contact" className="py-20 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Let&apos;s Work Together</span>
            </h2>
            <p className="text-[#a0a0b0] max-w-2xl mx-auto text-base">
              Have a project in mind? I&apos;m always excited to discuss new
              opportunities, creative ideas, and ways we can collaborate to bring
              your vision to life.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Left - Contact Info */}
            <div className="space-y-6">
              <Card className="bg-[#1a1333] border-white/5">
                <CardContent className="p-6 space-y-5">
                  <h3 className="text-xl font-bold text-white">Get In Touch</h3>

                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#a855f7]/15 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-[#a855f7]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {info.value}
                          </p>
                          <p className="text-xs text-[#a0a0b0]">
                            {info.subtext}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-3 border-t border-white/5">
                    <p className="text-sm text-[#a0a0b0] mb-3">
                      Currently accepting new projects and collaborations.
                      Let&apos;s create something extraordinary together.
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#2dd4bf] rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-[#2dd4bf]">
                        Available now
                      </span>
                      <span className="text-xs text-[#a0a0b0]">
                        &bull; Within 24 hours
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right - Contact Form */}
            <Card className="bg-[#1a1333] border-white/5">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Name<span className="text-[#ff6b9d]">*</span>
                      </label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="bg-[#2a1f45] border-white/5 text-white placeholder:text-[#6050a0] focus:border-[#a855f7]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">
                        Email<span className="text-[#ff6b9d]">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-[#2a1f45] border-white/5 text-white placeholder:text-[#6050a0] focus:border-[#a855f7]/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Subject<span className="text-[#ff6b9d]">*</span>
                    </label>
                    <Input
                      placeholder="Project discussion"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="bg-[#2a1f45] border-white/5 text-white placeholder:text-[#6050a0] focus:border-[#a855f7]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">
                      Message<span className="text-[#ff6b9d]">*</span>
                    </label>
                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="bg-[#2a1f45] border-white/5 text-white placeholder:text-[#6050a0] focus:border-[#a855f7]/50 resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#ff6b9d] to-[#a855f7] hover:from-[#e55a8a] hover:to-[#9345e6] text-white font-medium rounded-lg py-3 shadow-lg shadow-[#ff6b9d]/20"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Social Media */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">Connect With Me</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto mb-16">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="bg-[#1a1333] border-white/5 hover:border-white/10 transition-all duration-300 text-center">
                    <CardContent className="p-4 space-y-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto"
                        style={{ backgroundColor: `${social.color}15` }}
                      >
                        <Icon
                          className="w-5 h-5 group-hover:scale-110 transition-transform"
                          style={{ color: social.color }}
                        />
                      </div>
                      <span className="text-xs text-[#a0a0b0] group-hover:text-white transition-colors">
                        {social.name}
                      </span>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold">
              <span className="gradient-text-purple-blue">
                Frequently Asked Questions
              </span>
            </h3>
          </div>
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <Card
                key={faq.question}
                className="bg-[#1a1333] border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white pr-4">
                      {faq.question}
                    </h4>
                    <ChevronDown
                      className={`w-4 h-4 text-[#a0a0b0] shrink-0 transition-transform duration-200 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {openFaq === index && (
                    <p className="text-sm text-[#a0a0b0] mt-3 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5 section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-[#a0a0b0]">
            &copy; {new Date().getFullYear()} Portfolio. Crafted with{" "}
            <span className="text-[#ff6b9d]">&hearts;</span> and creativity
          </p>
        </div>
      </footer>
    </>
  );
}

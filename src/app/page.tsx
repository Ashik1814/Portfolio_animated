"use client";

import { Header } from "@/components/portfolio/header";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Education } from "@/components/portfolio/education";
import { Skills } from "@/components/portfolio/skills";
import { Projects } from "@/components/portfolio/projects";
import { Contact } from "@/components/portfolio/contact";
import { ParticleBackground } from "@/components/portfolio/particle-background";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Interactive particle canvas background */}
      <ParticleBackground />

      {/* All content sits above the particles */}
      <div className="relative z-10">
        <Header />
        <main className="flex-1">
          <Hero />
          <About />
          <Education />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </div>
  );
}

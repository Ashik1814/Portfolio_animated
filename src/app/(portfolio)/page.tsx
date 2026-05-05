import { db } from "@/lib/db";
import { HomePageClient } from "@/components/portfolio/home-page-client";
import type { ContentData } from "@/components/admin/types";

export const revalidate = 3600; // ISR: Revalidate every hour

export default async function HomePage() {
  // Fetch all data server-side in parallel
  const [
    siteConfig,
    navItems,
    heroStats,
    aboutSkills,
    coreValues,
    journeyItems,
    aboutTechTags,
    skillCategories,
    softSkills,
    additionalTech,
    currentlyLearning,
    projects,
    degrees,
    certifications,
    coursework,
    contactCards,
    socialLinks,
  ] = await Promise.all([
    db.siteConfig.findUnique({ where: { id: 'site-config' } }),
    db.navItem.findMany({ orderBy: { order: 'asc' } }),
    db.heroStat.findMany({ orderBy: { order: 'asc' } }),
    db.aboutSkill.findMany({ orderBy: { order: 'asc' } }),
    db.coreValue.findMany({ orderBy: { order: 'asc' } }),
    db.journeyItem.findMany({ orderBy: { order: 'asc' } }),
    db.aboutTechTag.findMany({ orderBy: { order: 'asc' } }),
    db.skillCategory.findMany({
      orderBy: { order: 'asc' },
      include: { skills: { orderBy: { order: 'asc' } } },
    }),
    db.softSkill.findMany({ orderBy: { order: 'asc' } }),
    db.additionalTech.findMany({ orderBy: { order: 'asc' } }),
    db.currentlyLearning.findMany({ orderBy: { order: 'asc' } }),
    db.project.findMany({
      orderBy: { order: 'asc' },
      include: { tags: { orderBy: { order: 'asc' } } },
    }),
    db.degree.findMany({ orderBy: { order: 'asc' } }),
    db.certification.findMany({ orderBy: { order: 'asc' } }),
    db.coursework.findMany({ orderBy: { order: 'asc' } }),
    db.contactCard.findMany({ orderBy: { order: 'asc' } }),
    db.socialLink.findMany({ orderBy: { order: 'asc' } }),
  ]);

   // Transform data to match ContentData structure
   const data: ContentData = {
     siteConfig: siteConfig
       ? { ...siteConfig, updatedAt: siteConfig.updatedAt.toISOString() }
       : null,
     navItems,
     heroStats,
     aboutSkills,
     coreValues,
     journeyItems,
     aboutTechTags,
     skillCategories,
     softSkills,
     additionalTech,
     currentlyLearning,
     projects,
     degrees,
     certifications,
     coursework,
     contactCards,
     socialLinks,
   };

  // Render client component with pre-fetched data
  return <HomePageClient data={data} />;
}

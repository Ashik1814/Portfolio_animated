import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
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
    ])

    return NextResponse.json({
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
    })
  } catch (error) {
    console.error('Failed to fetch content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}

import { create } from 'zustand'

/* ─── Types matching Prisma models ─── */
export interface SiteConfigData {
  id: string
  siteName: string
  heroWelcomeText: string
  heroName: string
  heroTitle: string
  heroDescription: string
  aboutDescription: string
  approachTitle: string
  approachText1: string
  approachText2: string
  skillsDescription: string
  projectsDescription: string
  educationDescription: string
  contactDescription: string
  contactLocationText: string
  logoText: string
  logoUrl: string
  heroCtaText: string
  heroCtaLink: string
  heroSecondaryCtaText: string
  heroSecondaryCtaLink: string
  heroFollowText: string
  heroAvailableText: string
  heroProfileImage: string
  cvUrl: string
  footerCopyright: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  seoOgTitle: string
  seoOgDescription: string
}

export interface AboutSkillData {
  id: string
  icon: string
  title: string
  description: string
  metric: string
  metricLabel: string
  color: string
  order: number
}

export interface CoreValueData {
  id: string
  icon: string
  title: string
  description: string
  order: number
}

export interface JourneyItemData {
  id: string
  year: string
  title: string
  description: string
  order: number
}

export interface AboutTechTagData {
  id: string
  name: string
  order: number
}

export interface SkillData {
  id: string
  name: string
  percentage: number
  categoryId: string
  order: number
}

export interface SkillCategoryData {
  id: string
  icon: string
  title: string
  color: string
  order: number
  skills: SkillData[]
}

export interface SoftSkillData {
  id: string
  icon: string
  name: string
  percentage: number
  color: string
  order: number
}

export interface AdditionalTechData {
  id: string
  name: string
  order: number
}

export interface CurrentlyLearningData {
  id: string
  name: string
  percentage: number
  color: string
  order: number
}

export interface ProjectTagData {
  id: string
  name: string
  bgLight: string
  bgDark: string
  textLight: string
  textDark: string
  projectId: string
  order: number
}

export interface ProjectData {
  id: string
  icon: string
  title: string
  description: string
  category: string
  gradient: string
  accentColor: string
  imageUrl: string
  videoUrl: string
  images: string
  liveUrl: string
  codeUrl: string
  order: number
  tags: ProjectTagData[]
}

export interface DegreeData {
  id: string
  icon: string
  title: string
  institution: string
  location: string
  period: string
  gpa: string
  gpaColor: string
  description: string
  achievements: string
  order: number
}

export interface CertificationData {
  id: string
  icon: string
  name: string
  issuer: string
  year: string
  color: string
  order: number
}

export interface CourseworkData {
  id: string
  name: string
  order: number
}

export interface ContactCardData {
  id: string
  icon: string
  label: string
  value: string
  href: string
  order: number
}

export interface SocialLinkData {
  id: string
  icon: string
  href: string
  label: string
  order: number
}

export interface NavItemData {
  id: string
  label: string
  href: string
  order: number
}

export interface HeroStatData {
  id: string
  value: string
  label: string
  color: string
  position: string
  order: number
}

export interface ContentData {
  siteConfig: SiteConfigData | null
  aboutSkills: AboutSkillData[]
  coreValues: CoreValueData[]
  journeyItems: JourneyItemData[]
  aboutTechTags: AboutTechTagData[]
  skillCategories: SkillCategoryData[]
  softSkills: SoftSkillData[]
  additionalTech: AdditionalTechData[]
  currentlyLearning: CurrentlyLearningData[]
  projects: ProjectData[]
  degrees: DegreeData[]
  certifications: CertificationData[]
  coursework: CourseworkData[]
  contactCards: ContactCardData[]
  socialLinks: SocialLinkData[]
  navItems: NavItemData[]
  heroStats: HeroStatData[]
}

interface ContentStore extends ContentData {
  loading: boolean
  loaded: boolean
  error: string | null
  fetch: () => Promise<void>
}

const defaults: ContentData = {
  siteConfig: null,
  aboutSkills: [],
  coreValues: [],
  journeyItems: [],
  aboutTechTags: [],
  skillCategories: [],
  softSkills: [],
  additionalTech: [],
  currentlyLearning: [],
  projects: [],
  degrees: [],
  certifications: [],
  coursework: [],
  contactCards: [],
  socialLinks: [],
  navItems: [],
  heroStats: [],
}

export const useContent = create<ContentStore>((set, get) => ({
  ...defaults,
  loading: true,
  loaded: false,
  error: null,
  fetch: async () => {
    try {
      set({ loading: true, error: null })
      const res = await fetch('/api/content')
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }
      const data = await res.json()
      set({ ...data, loading: false, loaded: true })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch content'
      console.error('Failed to fetch content:', message)
      set({ loading: false, error: message, loaded: true })
    }
  },
}))

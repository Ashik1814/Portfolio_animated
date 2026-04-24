export interface SiteConfig {
  id: string;
  siteName: string;
  heroWelcomeText: string;
  heroName: string;
  heroTitle: string;
  heroDescription: string;
  aboutDescription: string;
  approachTitle: string;
  approachText1: string;
  approachText2: string;
  skillsDescription: string;
  projectsDescription: string;
  educationDescription: string;
  contactDescription: string;
  contactLocationText: string;
  logoText: string;
  logoUrl: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroSecondaryCtaText: string;
  heroSecondaryCtaLink: string;
  heroFollowText: string;
  heroAvailableText: string;
  heroProfileImage: string;
  cvUrl: string;
  footerCopyright: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoOgTitle: string;
  seoOgDescription: string;
  updatedAt: string;
}

export interface AboutSkill {
  id: string;
  icon: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  color: string;
  order: number;
}

export interface CoreValue {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface JourneyItem {
  id: string;
  year: string;
  title: string;
  description: string;
  order: number;
}

export interface AboutTechTag {
  id: string;
  name: string;
  order: number;
}

export interface SkillCategory {
  id: string;
  icon: string;
  title: string;
  color: string;
  order: number;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
  categoryId: string;
  order: number;
}

export interface SoftSkill {
  id: string;
  icon: string;
  name: string;
  percentage: number;
  color: string;
  order: number;
}

export interface AdditionalTech {
  id: string;
  name: string;
  order: number;
}

export interface CurrentlyLearning {
  id: string;
  name: string;
  percentage: number;
  color: string;
  order: number;
}

export interface Project {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: string;
  gradient: string;
  accentColor: string;
  imageUrl: string;
  videoUrl: string;
  images: string;
  liveUrl: string;
  codeUrl: string;
  order: number;
  tags: ProjectTag[];
}

export interface ProjectTag {
  id: string;
  name: string;
  bgLight: string;
  bgDark: string;
  textLight: string;
  textDark: string;
  projectId: string;
  order: number;
}

export interface Degree {
  id: string;
  icon: string;
  title: string;
  institution: string;
  location: string;
  period: string;
  gpa: string;
  gpaColor: string;
  description: string;
  achievements: string;
  order: number;
}

export interface Certification {
  id: string;
  icon: string;
  name: string;
  issuer: string;
  year: string;
  color: string;
  order: number;
}

export interface Coursework {
  id: string;
  name: string;
  order: number;
}

export interface ContactCard {
  id: string;
  icon: string;
  label: string;
  value: string;
  href: string;
  order: number;
}

export interface SocialLink {
  id: string;
  icon: string;
  href: string;
  label: string;
  order: number;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
}

export interface HeroStat {
  id: string;
  value: string;
  label: string;
  color: string;
  position: string;
  order: number;
}

export interface ContentData {
  siteConfig: SiteConfig | null;
  aboutSkills: AboutSkill[];
  coreValues: CoreValue[];
  journeyItems: JourneyItem[];
  aboutTechTags: AboutTechTag[];
  skillCategories: SkillCategory[];
  softSkills: SoftSkill[];
  additionalTech: AdditionalTech[];
  currentlyLearning: CurrentlyLearning[];
  projects: Project[];
  degrees: Degree[];
  certifications: Certification[];
  coursework: Coursework[];
  contactCards: ContactCard[];
  socialLinks: SocialLink[];
  navItems: NavItem[];
  heroStats: HeroStat[];
}

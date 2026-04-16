-- ============================================================
-- ALCHEMIST PORTFOLIO — SUPABASE SQL SCHEMA + SEED DATA
-- Paste this entire script into Supabase SQL Editor and run
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. TABLES
-- ─────────────────────────────────────────────────────────────

-- Site-wide Configuration (singleton)
CREATE TABLE IF NOT EXISTS "SiteConfig" (
  "id"                    TEXT PRIMARY KEY DEFAULT 'site-config',
  "siteName"              TEXT NOT NULL DEFAULT 'Alchemist',
  "logoText"              TEXT NOT NULL DEFAULT 'Alchemist.io',
  "logoUrl"               TEXT NOT NULL DEFAULT '',
  "heroWelcomeText"       TEXT NOT NULL DEFAULT 'Welcome to my portfolio',
  "heroName"              TEXT NOT NULL DEFAULT 'Alchemist',
  "heroTitle"             TEXT NOT NULL DEFAULT 'UI/UX Designer • Frontend Developer • n8n Automation Specialist',
  "heroDescription"       TEXT NOT NULL DEFAULT '',
  "heroCtaText"           TEXT NOT NULL DEFAULT 'Get In Touch',
  "heroCtaLink"           TEXT NOT NULL DEFAULT '#contact',
  "heroSecondaryCtaText"  TEXT NOT NULL DEFAULT 'View Projects',
  "heroSecondaryCtaLink"  TEXT NOT NULL DEFAULT '#projects',
  "heroFollowText"        TEXT NOT NULL DEFAULT 'Follow me:',
  "heroAvailableText"     TEXT NOT NULL DEFAULT 'Available for work',
  "heroProfileImage"      TEXT NOT NULL DEFAULT '',
  "aboutDescription"      TEXT NOT NULL DEFAULT '',
  "approachTitle"         TEXT NOT NULL DEFAULT 'My Approach',
  "approachText1"         TEXT NOT NULL DEFAULT '',
  "approachText2"         TEXT NOT NULL DEFAULT '',
  "skillsDescription"     TEXT NOT NULL DEFAULT '',
  "projectsDescription"   TEXT NOT NULL DEFAULT '',
  "educationDescription"  TEXT NOT NULL DEFAULT '',
  "contactDescription"    TEXT NOT NULL DEFAULT '',
  "contactLocationText"   TEXT NOT NULL DEFAULT 'Available for remote work worldwide',
  "cvUrl"                 TEXT NOT NULL DEFAULT '#',
  "footerCopyright"       TEXT NOT NULL DEFAULT '© 2025 Alchemist. All rights reserved.',
  "seoTitle"              TEXT NOT NULL DEFAULT '',
  "seoDescription"        TEXT NOT NULL DEFAULT '',
  "seoKeywords"           TEXT NOT NULL DEFAULT '',
  "seoOgTitle"            TEXT NOT NULL DEFAULT '',
  "seoOgDescription"      TEXT NOT NULL DEFAULT '',
  "updatedAt"             TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Navigation Items
CREATE TABLE IF NOT EXISTS "NavItem" (
  "id"    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "label" TEXT NOT NULL,
  "href"  TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Hero Stats (floating badges)
CREATE TABLE IF NOT EXISTS "HeroStat" (
  "id"       TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "value"    TEXT NOT NULL,
  "label"    TEXT NOT NULL,
  "color"    TEXT NOT NULL DEFAULT '#00e5ff',
  "position" TEXT NOT NULL DEFAULT 'left-top',
  "order"    INTEGER NOT NULL DEFAULT 0
);

-- Admin Authentication (singleton)
CREATE TABLE IF NOT EXISTS "AdminAuth" (
  "id"           TEXT PRIMARY KEY DEFAULT 'admin-auth',
  "passwordHash" TEXT NOT NULL DEFAULT 'admin123'
);

-- About Section — What I Do cards
CREATE TABLE IF NOT EXISTS "AboutSkill" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "icon"        TEXT NOT NULL DEFAULT 'Paintbrush',
  "title"       TEXT NOT NULL,
  "description" TEXT NOT NULL DEFAULT '',
  "metric"      TEXT NOT NULL,
  "metricLabel" TEXT NOT NULL,
  "color"       TEXT NOT NULL DEFAULT '#a78bfa',
  "order"       INTEGER NOT NULL DEFAULT 0
);

-- About Section — Core Values
CREATE TABLE IF NOT EXISTS "CoreValue" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "icon"        TEXT NOT NULL DEFAULT 'User',
  "title"       TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "order"       INTEGER NOT NULL DEFAULT 0
);

-- About Section — Journey Timeline
CREATE TABLE IF NOT EXISTS "JourneyItem" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "year"        TEXT NOT NULL,
  "title"       TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "order"       INTEGER NOT NULL DEFAULT 0
);

-- About Section — Tech Tags
CREATE TABLE IF NOT EXISTS "AboutTechTag" (
  "id"    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name"  TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Skills Section — Categories
CREATE TABLE IF NOT EXISTS "SkillCategory" (
  "id"    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "icon"  TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "color" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Skills Section — Skills (belongs to Category)
CREATE TABLE IF NOT EXISTS "Skill" (
  "id"         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name"       TEXT NOT NULL,
  "percentage" INTEGER NOT NULL,
  "categoryId" TEXT NOT NULL REFERENCES "SkillCategory"("id") ON DELETE CASCADE,
  "order"      INTEGER NOT NULL DEFAULT 0
);

-- Skills Section — Soft Skills
CREATE TABLE IF NOT EXISTS "SoftSkill" (
  "id"         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "icon"       TEXT NOT NULL,
  "name"       TEXT NOT NULL,
  "percentage" INTEGER NOT NULL,
  "color"      TEXT NOT NULL,
  "order"      INTEGER NOT NULL DEFAULT 0
);

-- Skills Section — Additional Tech
CREATE TABLE IF NOT EXISTS "AdditionalTech" (
  "id"    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name"  TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Skills Section — Currently Learning
CREATE TABLE IF NOT EXISTS "CurrentlyLearning" (
  "id"         TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name"       TEXT NOT NULL,
  "percentage" INTEGER NOT NULL,
  "color"      TEXT NOT NULL,
  "order"      INTEGER NOT NULL DEFAULT 0
);

-- Projects Section
CREATE TABLE IF NOT EXISTS "Project" (
  "id"          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "icon"        TEXT NOT NULL,
  "title"       TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category"    TEXT NOT NULL,
  "gradient"    TEXT NOT NULL,
  "accentColor" TEXT NOT NULL,
  "imageUrl"    TEXT NOT NULL DEFAULT '',
  "videoUrl"    TEXT NOT NULL DEFAULT '',
  "liveUrl"     TEXT NOT NULL DEFAULT '#',
  "codeUrl"     TEXT NOT NULL DEFAULT '#',
  "order"       INTEGER NOT NULL DEFAULT 0
);

-- Projects Section — Tags (belongs to Project)
CREATE TABLE IF NOT EXISTS "ProjectTag" (
  "id"        TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name"      TEXT NOT NULL,
  "bgLight"   TEXT NOT NULL DEFAULT 'bg-cyan-100',
  "bgDark"    TEXT NOT NULL DEFAULT 'bg-cyan-500/20',
  "textLight" TEXT NOT NULL DEFAULT 'text-cyan-700',
  "textDark"  TEXT NOT NULL DEFAULT 'text-cyan-300',
  "projectId" TEXT NOT NULL REFERENCES "Project"("id") ON DELETE CASCADE,
  "order"     INTEGER NOT NULL DEFAULT 0
);

-- Education Section — Degrees
CREATE TABLE IF NOT EXISTS "Degree" (
  "id"           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "icon"         TEXT NOT NULL,
  "title"        TEXT NOT NULL,
  "institution"  TEXT NOT NULL,
  "location"     TEXT NOT NULL DEFAULT '',
  "period"       TEXT NOT NULL,
  "gpa"          TEXT NOT NULL,
  "gpaColor"     TEXT NOT NULL DEFAULT '#00e5ff',
  "description"  TEXT NOT NULL,
  "achievements" TEXT NOT NULL DEFAULT '',
  "order"        INTEGER NOT NULL DEFAULT 0
);

-- Education Section — Certifications
CREATE TABLE IF NOT EXISTS "Certification" (
  "id"    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "icon"  TEXT NOT NULL,
  "name"  TEXT NOT NULL,
  "issuer" TEXT NOT NULL,
  "year"  TEXT NOT NULL,
  "color" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Education Section — Coursework
CREATE TABLE IF NOT EXISTS "Coursework" (
  "id"    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name"  TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Contact Section — Contact Cards
CREATE TABLE IF NOT EXISTS "ContactCard" (
  "id"    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "icon"  TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "value" TEXT NOT NULL,
  "href"  TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

-- Contact Section — Social Links
CREATE TABLE IF NOT EXISTS "SocialLink" (
  "id"    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "icon"  TEXT NOT NULL,
  "href"  TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);


-- ─────────────────────────────────────────────────────────────
-- 2. INDEXES
-- ─────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS "idx_skill_categoryId"   ON "Skill"("categoryId");
CREATE INDEX IF NOT EXISTS "idx_projectTag_projectId" ON "ProjectTag"("projectId");


-- ─────────────────────────────────────────────────────────────
-- 3. UPDATED_AT TRIGGER (auto-update updatedAt on row change)
-- ─────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_siteconfig_updated ON "SiteConfig";
CREATE TRIGGER trg_siteconfig_updated
  BEFORE UPDATE ON "SiteConfig"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ─────────────────────────────────────────────────────────────
-- 4. SEED DATA
-- ─────────────────────────────────────────────────────────────

-- SiteConfig (singleton)
INSERT INTO "SiteConfig" ("id","siteName","logoText","logoUrl","heroWelcomeText","heroName","heroTitle","heroDescription","heroCtaText","heroCtaLink","heroSecondaryCtaText","heroSecondaryCtaLink","heroFollowText","heroAvailableText","heroProfileImage","aboutDescription","approachTitle","approachText1","approachText2","skillsDescription","projectsDescription","educationDescription","contactDescription","contactLocationText","cvUrl","footerCopyright","seoTitle","seoDescription","seoKeywords","seoOgTitle","seoOgDescription") VALUES
('site-config','Alchemist','Alchemist.io','','Welcome to my portfolio','Ashikur Rahman','UI/UX Designer • Frontend Developer • n8n Automation Specialist','I transform ideas into exceptional digital experiences. With a unique blend of creative design thinking and technical expertise, I create interfaces that users love and businesses value.','Get In Touch','/contact','View Projects','/projects','Follow me:','Available for work','/profile.jpg','I''m a passionate CSE graduate who loves turning ideas into reality through design and code. With a unique blend of creative design thinking and technical expertise, I create digital experiences that users love and businesses value.','My Approach','I believe that great digital products are born at the intersection of beautiful design, clean code, and smart automation. My approach is user-centered, data-driven, and driven by a passion for continuous learning and improvement.','Whether I''m designing an interface, writing code, or setting up an automation workflow, I always ask: ''How can this create the most value for users while maintaining technical excellence?'' This philosophy guides every project I take on.','A comprehensive toolkit of design, development, and automation skills honed through years of passionate work and continuous learning','A collection of my recent work showcasing expertise in design, development, and automation. Each project represents a unique challenge and learning opportunity.','My academic journey from Dinajpur to Dhaka — pursuing excellence in Computer Science and Engineering at United International University','I''m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.','Available for remote work worldwide','#','© 2025 Alchemist. All rights reserved.','Portfolio | Creative - UI/UX Designer & Developer','A passionate CSE graduate who loves turning ideas into reality through design and code. Specializing in UI/UX Design, Frontend Development, and n8n Automation.','Portfolio, UI/UX Designer, Frontend Developer, n8n Automation, React, TypeScript, Tailwind CSS','Portfolio | Creative - UI/UX Designer & Developer','UI/UX Designer, Frontend Developer, and n8n Automation Specialist')
ON CONFLICT ("id") DO NOTHING;

-- AdminAuth (singleton)
INSERT INTO "AdminAuth" ("id","passwordHash") VALUES ('admin-auth','admin123')
ON CONFLICT ("id") DO NOTHING;

-- NavItem
INSERT INTO "NavItem" ("id","label","href","order") VALUES
('nav-home','Home','/',0),
('nav-about','About','/about',1),
('nav-skills','Skills','/skills',2),
('nav-projects','Projects','/projects',3),
('nav-education','Education','/education',4),
('nav-contact','Contact','/contact',5)
ON CONFLICT ("id") DO NOTHING;

-- HeroStat
INSERT INTO "HeroStat" ("id","value","label","color","position","order") VALUES
('stat-1','30+','UI/UX','#a78bfa','left-top',0),
('stat-2','15+','Front End','#00e5ff','right-middle',1),
('stat-3','20+','Automation','#2dd4bf','left-bottom',2)
ON CONFLICT ("id") DO NOTHING;

-- AboutSkill
INSERT INTO "AboutSkill" ("id","icon","title","description","metric","metricLabel","color","order") VALUES
('about-skill-1','Paintbrush','UI/UX Design','Crafting intuitive and visually stunning user interfaces with a focus on user experience and accessibility. I believe great design is both functional and beautiful.','50+','Design Projects','#a78bfa',0),
('about-skill-2','Code2','Frontend Development','Building responsive, performant web applications using modern technologies like React, TypeScript, and Tailwind CSS. Clean code is my priority.','30+','Projects Built','#00e5ff',1),
('about-skill-3','Bot','n8n Automation','Designing and implementing intelligent automation solutions to streamline business processes and save countless hours of manual work.','80%','Efficiency Gained','#2dd4bf',2)
ON CONFLICT ("id") DO NOTHING;

-- CoreValue
INSERT INTO "CoreValue" ("id","icon","title","description","order") VALUES
('core-1','User','User-Centered','Every decision starts with the user in mind.',0),
('core-2','Lightbulb','Innovation','Always exploring new technologies and approaches.',1),
('core-3','Target','Goal-Oriented','Focused on achieving measurable results.',2),
('core-4','Handshake','Collaboration','Working closely with teams and stakeholders.',3)
ON CONFLICT ("id") DO NOTHING;

-- JourneyItem
INSERT INTO "JourneyItem" ("id","year","title","description","order") VALUES
('journey-1','2019','Started CSE Journey','Began my bachelor''s in Computer Science Engineering, discovering my passion for web development and design.',0),
('journey-2','2021','First Freelance Project','Completed my first freelance project: a responsive website for a local business, sparking my entrepreneurial spirit.',1),
('journey-3','2022','Deep Dive into UI/UX','Pursued advanced training in design principles, Figma, and user research methodologies. Won college hackathon with innovative design.',2),
('journey-4','2023','Graduated & Specialized','Completed my B.Tech in Computer Science and began specializing in frontend development and n8n automation workflows.',3),
('journey-5','2024','Full-Stack Growth','Expanded into backend integration, API development, and building end-to-end automation solutions for clients worldwide.',4)
ON CONFLICT ("id") DO NOTHING;

-- AboutTechTag
INSERT INTO "AboutTechTag" ("id","name","order") VALUES
('tech-tag-1','React',0),
('tech-tag-2','TypeScript',1),
('tech-tag-3','Figma',2),
('tech-tag-4','Tailwind CSS',3),
('tech-tag-5','n8n',4),
('tech-tag-6','Node.js',5)
ON CONFLICT ("id") DO NOTHING;

-- SkillCategory
INSERT INTO "SkillCategory" ("id","icon","title","color","order") VALUES
('cat-design','Paintbrush','Design','#a78bfa',0),
('cat-dev','Code2','Development','#00e5ff',1),
('cat-auto','Bot','Automation','#2dd4bf',2)
ON CONFLICT ("id") DO NOTHING;

-- Skill
INSERT INTO "Skill" ("id","name","percentage","categoryId","order") VALUES
('skill-1','Figma',95,'cat-design',0),
('skill-2','Adobe XD',88,'cat-design',1),
('skill-3','Prototyping',82,'cat-design',2),
('skill-4','UI/UX Design',76,'cat-design',3),
('skill-5','Design Systems',68,'cat-design',4),
('skill-6','React',96,'cat-dev',0),
('skill-7','TypeScript',83,'cat-dev',1),
('skill-8','Tailwind CSS',87,'cat-dev',2),
('skill-9','Next.js',90,'cat-dev',3),
('skill-10','JavaScript',85,'cat-dev',4),
('skill-11','n8n',94,'cat-auto',0),
('skill-12','Zapier',88,'cat-auto',1),
('skill-13','API Integration',82,'cat-auto',2),
('skill-14','Workflow Design',76,'cat-auto',3),
('skill-15','Make (Integromat)',68,'cat-auto',4)
ON CONFLICT ("id") DO NOTHING;

-- SoftSkill
INSERT INTO "SoftSkill" ("id","icon","name","percentage","color","order") VALUES
('soft-1','Puzzle','Problem Solving',95,'#00e5ff',0),
('soft-2','MessageCircle','Communication',88,'#64b5f6',1),
('soft-3','Users','Team Collaboration',82,'#a78bfa',2),
('soft-4','Clock','Time Management',76,'#2dd4bf',3),
('soft-5','Lightbulb','Creativity',90,'#fbbf24',4),
('soft-6','Target','Critical Thinking',84,'#00e5ff',5),
('soft-7','TrendingUp','Adaptability',78,'#64b5f6',6),
('soft-8','Crown','Leadership',72,'#a78bfa',7)
ON CONFLICT ("id") DO NOTHING;

-- AdditionalTech
INSERT INTO "AdditionalTech" ("id","name","order") VALUES
('addtech-1','JavaScript',0),
('addtech-2','HTML/CSS',1),
('addtech-3','Git',2),
('addtech-4','REST APIs',3),
('addtech-5','GraphQL',4),
('addtech-6','Responsive Design',5),
('addtech-7','Accessibility',6),
('addtech-8','Performance Optimization',7),
('addtech-9','Design Systems',8),
('addtech-10','Agile/Scrum',9),
('addtech-11','CI/CD',10),
('addtech-12','Testing',11),
('addtech-13','Node.js',12),
('addtech-14','MongoDB',13),
('addtech-15','PostgreSQL',14),
('addtech-16','Docker',15)
ON CONFLICT ("id") DO NOTHING;

-- CurrentlyLearning
INSERT INTO "CurrentlyLearning" ("id","name","percentage","color","order") VALUES
('learn-1','Web3 & Blockchain',40,'#64b5f6',0),
('learn-2','Advanced AI Integration',20,'#a78bfa',1)
ON CONFLICT ("id") DO NOTHING;

-- Project
INSERT INTO "Project" ("id","icon","title","description","category","gradient","accentColor","imageUrl","videoUrl","liveUrl","codeUrl","order") VALUES
('proj-1','ShoppingBag','E-Commerce Platform','Modern e-commerce solution with seamless checkout, inventory management, and integrated payments.','Development','from-[#4facfe] to-[#00f2fe]','#4facfe','','','#','#',0),
('proj-2','Palette','Design System','Comprehensive component library with guidelines, documentation, and accessibility standards.','Design','from-[#667eea] to-[#764ba2]','#667eea','','','#','#',1),
('proj-3','Zap','Workflow Automation System','Automated business processes reducing manual work by 80% using AI and custom integrations.','Automation','from-[#a78bfa] to-[#64b5f6]','#a78bfa','','','#','#',2),
('proj-4','BarChart3','SaaS Analytics Dashboard','Real-time analytics dashboard with data visualization and customizable reporting features.','Development','from-[#4facfe] to-[#00f2fe]','#4facfe','','','#','#',3),
('proj-5','Smartphone','Mobile App Design','User-centered mobile application with intuitive navigation and modern aesthetics.','Design','from-[#43e97b] to-[#38f9d7]','#43e97b','','','#','#',4),
('proj-6','Bot','AI Integration Tool','Seamless integration of AI capabilities into existing platforms with custom solutions.','Automation','from-[#a78bfa] to-[#2dd4bf]','#a78bfa','','','#','#',5),
('proj-7','Briefcase','Portfolio Website','Modern portfolio website with glassmorphism effects, smooth animations, and responsive design.','Development','from-[#30cfd0] to-[#330867]','#30cfd0','','','#','#',6),
('proj-8','Utensils','Restaurant Landing Page','Beautiful landing page for a restaurant with online ordering, menu display, and gallery.','Design','from-[#a8edea] to-[#fed6e3]','#a8edea','','','#','#',7),
('proj-9','CheckSquare','Task Management App','Productivity app with kanban boards, task lists, and team collaboration features.','Development','from-[#64b5f6] to-[#a78bfa]','#64b5f6','','','#','#',8)
ON CONFLICT ("id") DO NOTHING;

-- ProjectTag
INSERT INTO "ProjectTag" ("id","name","bgLight","bgDark","textLight","textDark","projectId","order") VALUES
('ptag-1a','React','bg-cyan-100','bg-cyan-500/20','text-cyan-700','text-cyan-300','proj-1',0),
('ptag-1b','Node.js','bg-emerald-100','bg-emerald-500/20','text-emerald-700','text-emerald-300','proj-1',1),
('ptag-1c','MongoDB','bg-teal-100','bg-teal-500/20','text-teal-700','text-teal-300','proj-1',2),
('ptag-2a','Figma','bg-violet-100','bg-violet-500/20','text-violet-700','text-violet-300','proj-2',0),
('ptag-2b','Storybook','bg-indigo-100','bg-indigo-500/20','text-indigo-700','text-indigo-300','proj-2',1),
('ptag-2c','Sketch','bg-sky-100','bg-sky-500/20','text-sky-700','text-sky-300','proj-2',2),
('ptag-3a','Python','bg-teal-100','bg-teal-500/20','text-teal-700','text-teal-300','proj-3',0),
('ptag-3b','Airflow','bg-sky-100','bg-sky-500/20','text-sky-700','text-sky-300','proj-3',1),
('ptag-3c','AWS','bg-indigo-100','bg-indigo-500/20','text-indigo-700','text-indigo-300','proj-3',2),
('ptag-4a','React','bg-cyan-100','bg-cyan-500/20','text-cyan-700','text-cyan-300','proj-4',0),
('ptag-4b','D3.js','bg-violet-100','bg-violet-500/20','text-violet-700','text-violet-300','proj-4',1),
('ptag-4c','PostgreSQL','bg-blue-100','bg-blue-500/20','text-blue-700','text-blue-300','proj-4',2),
('ptag-5a','Figma','bg-violet-100','bg-violet-500/20','text-violet-700','text-violet-300','proj-5',0),
('ptag-5b','Prototyping','bg-indigo-100','bg-indigo-500/20','text-indigo-700','text-indigo-300','proj-5',1),
('ptag-5c','User Research','bg-emerald-100','bg-emerald-500/20','text-emerald-700','text-emerald-300','proj-5',2),
('ptag-6a','Python','bg-teal-100','bg-teal-500/20','text-teal-700','text-teal-300','proj-6',0),
('ptag-6b','TensorFlow','bg-cyan-100','bg-cyan-500/20','text-cyan-700','text-cyan-300','proj-6',1),
('ptag-6c','API','bg-violet-100','bg-violet-500/20','text-violet-700','text-violet-300','proj-6',2),
('ptag-7a','React','bg-cyan-100','bg-cyan-500/20','text-cyan-700','text-cyan-300','proj-7',0),
('ptag-7b','Tailwind CSS','bg-sky-100','bg-sky-500/20','text-sky-700','text-sky-300','proj-7',1),
('ptag-7c','Framer','bg-violet-100','bg-violet-500/20','text-violet-700','text-violet-300','proj-7',2),
('ptag-8a','Next.js','bg-slate-100','bg-slate-500/20','text-slate-700','text-slate-300','proj-8',0),
('ptag-8b','Tailwind CSS','bg-sky-100','bg-sky-500/20','text-sky-700','text-sky-300','proj-8',1),
('ptag-8c','Figma','bg-violet-100','bg-violet-500/20','text-violet-700','text-violet-300','proj-8',2),
('ptag-9a','Vue.js','bg-emerald-100','bg-emerald-500/20','text-emerald-700','text-emerald-300','proj-9',0),
('ptag-9b','Firebase','bg-indigo-100','bg-indigo-500/20','text-indigo-700','text-indigo-300','proj-9',1),
('ptag-9c','PWA','bg-teal-100','bg-teal-500/20','text-teal-700','text-teal-300','proj-9',2)
ON CONFLICT ("id") DO NOTHING;

-- Degree
INSERT INTO "Degree" ("id","icon","title","institution","location","period","gpa","gpaColor","description","achievements","order") VALUES
('degree-1','Shield','Bachelor of Science in Computer Science and Engineering','United International University (UIU)','Dhaka, Bangladesh','2021 - 2025','2.70/4.00','#00e5ff','Completed BSc in CSE with a focus on Software Engineering, Web Development, and Data Structures. Studied at United International University, a leading private university in Bangladesh.','Completed 130+ credit hours,Participated in coding competitions,Built multiple academic projects in web development and software engineering',0),
('degree-2','GraduationCap','Higher Secondary Certificate (HSC) - Science','Cantonment Public School And College, Rangpur','Rangpur, Bangladesh','2017 - 2019','5.00/5.00','#2dd4bf','Studied in Science group with core subjects in Physics, Chemistry, Higher Mathematics, and ICT. Completed from Cantonment Public School And College, one of the reputed institutions in Rangpur.','Science group with Physics, Chemistry & Higher Mathematics,A+ in ICT, Physics, Chemistry & Higher Mathematics',1),
('degree-3','BookOpen','Secondary School Certificate (SSC) - Science','Bara Baul High School, Dinajpur','Dinajpur, Bangladesh','2015 - 2017','5.00/5.00','#a78bfa','Achieved GPA 5.00 (A+ in all subjects) in SSC examination under Dinajpur Education Board. Studied in Science group with strong foundation in Mathematics, Physics, and Chemistry.','GPA 5.00 - A+ in all 11 subjects,Top performer in Science group,Strong foundation in Physics, Chemistry & Mathematics',2)
ON CONFLICT ("id") DO NOTHING;

-- Certification
INSERT INTO "Certification" ("id","icon","name","issuer","year","color","order") VALUES
('cert-1','Code2','Advanced React Development','Meta','2023','#a78bfa',0),
('cert-2','Palette','UI/UX Design Specialization','Google','2022','#00e5ff',1),
('cert-3','Bot','n8n Automation Expert','n8n','2024','#2dd4bf',2),
('cert-4','Cpu','TypeScript Advanced','Microsoft','2023','#64b5f6',3),
('cert-5','Zap','Web Performance Optimization','Google','2023','#fbbf24',4),
('cert-6','Monitor','Responsive Web Design','freeCodeCamp','2021','#f97316',5)
ON CONFLICT ("id") DO NOTHING;

-- Coursework
INSERT INTO "Coursework" ("id","name","order") VALUES
('cw-1','Data Structures & Algorithms',0),
('cw-2','Object-Oriented Programming',1),
('cw-3','Database Management Systems',2),
('cw-4','Web Development',3),
('cw-5','Software Engineering',4),
('cw-6','Operating Systems',5),
('cw-7','Computer Networks',6),
('cw-8','Machine Learning Basics',7),
('cw-9','Mobile App Development',8),
('cw-10','Cloud Computing',9),
('cw-11','Cybersecurity Fundamentals',10),
('cw-12','Human-Computer Interaction',11)
ON CONFLICT ("id") DO NOTHING;

-- ContactCard
INSERT INTO "ContactCard" ("id","icon","label","value","href","order") VALUES
('cc-1','SiGmail','Email','hello@alchemist.io','mailto:hello@alchemist.io',0),
('cc-2','Github','GitHub','@alchemist','https://github.com',1),
('cc-3','Linkedin','LinkedIn','Connect with me','https://linkedin.com',2),
('cc-4','Youtube','YouTube','Subscribe','https://youtube.com',3),
('cc-5','FaWhatsapp','WhatsApp','Chat with me','https://wa.me/1234567890',4),
('cc-6','Facebook','Facebook','Follow me','https://facebook.com',5),
('cc-7','SiGmail','Gmail','hello@alchemist.io','mailto:hello@alchemist.io',6)
ON CONFLICT ("id") DO NOTHING;

-- SocialLink
INSERT INTO "SocialLink" ("id","icon","href","label","order") VALUES
('sl-1','Github','https://github.com','GitHub',0),
('sl-2','Linkedin','https://linkedin.com','LinkedIn',1),
('sl-3','Youtube','https://youtube.com','YouTube',2),
('sl-4','Facebook','https://facebook.com','Facebook',3),
('sl-5','FaWhatsapp','https://wa.me/1234567890','WhatsApp',4),
('sl-6','SiGmail','mailto:hello@alchemist.io','Gmail',5)
ON CONFLICT ("id") DO NOTHING;


-- ─────────────────────────────────────────────────────────────
-- 5. ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────────────────────
-- Public read access for all tables, authenticated write access

-- Enable RLS on all tables
ALTER TABLE "SiteConfig"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "NavItem"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "HeroStat"        ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AdminAuth"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AboutSkill"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CoreValue"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "JourneyItem"     ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AboutTechTag"    ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SkillCategory"   ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Skill"           ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SoftSkill"       ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AdditionalTech"  ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CurrentlyLearning" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project"         ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ProjectTag"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Degree"          ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Certification"   ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Coursework"      ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ContactCard"     ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SocialLink"      ENABLE ROW LEVEL SECURITY;

-- Public SELECT policy (anon + authenticated can read)
CREATE POLICY "Public read access" ON "SiteConfig"      FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "NavItem"         FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "HeroStat"        FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "AdminAuth"       FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "AboutSkill"      FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "CoreValue"       FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "JourneyItem"     FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "AboutTechTag"    FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "SkillCategory"   FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "Skill"           FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "SoftSkill"       FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "AdditionalTech"  FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "CurrentlyLearning" FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "Project"         FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "ProjectTag"      FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "Degree"          FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "Certification"   FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "Coursework"      FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "ContactCard"     FOR SELECT USING (true);
CREATE POLICY "Public read access" ON "SocialLink"      FOR SELECT USING (true);

-- Authenticated write policies (service_role or authenticated users)
CREATE POLICY "Authenticated write access" ON "SiteConfig"      FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "NavItem"         FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "HeroStat"        FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "AdminAuth"       FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "AboutSkill"      FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "CoreValue"       FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "JourneyItem"     FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "AboutTechTag"    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "SkillCategory"   FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "Skill"           FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "SoftSkill"       FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "AdditionalTech"  FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "CurrentlyLearning" FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "Project"         FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "ProjectTag"      FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "Degree"          FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "Certification"   FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "Coursework"      FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "ContactCard"     FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "Authenticated write access" ON "SocialLink"      FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role') WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- ✅ Done! Your Supabase database is ready with all tables, seed data, and RLS policies.

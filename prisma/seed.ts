import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ─── Site Config (upsert — always safe) ───
  await prisma.siteConfig.upsert({
    where: { id: 'site-config' },
    update: {},
    create: {
      id: 'site-config',
      siteName: 'Alchemist',
      logoText: 'Alchemist.io',
      heroWelcomeText: 'Welcome to my portfolio',
      heroName: 'Alchemist',
      heroTitle: 'UI/UX Designer • Frontend Developer • n8n Automation Specialist',
      heroDescription: 'I transform ideas into exceptional digital experiences. With a unique blend of creative design thinking and technical expertise, I create interfaces that users love and businesses value.',
      heroCtaText: 'Get In Touch',
      heroCtaLink: '/contact',
      heroSecondaryCtaText: 'View Projects',
      heroSecondaryCtaLink: '/projects',
      heroFollowText: 'Follow me:',
      heroAvailableText: 'Available for work',
      heroProfileImage: '',
      aboutDescription: "I'm a passionate CSE graduate who loves turning ideas into reality through design and code. With a unique blend of creative design thinking and technical expertise, I create digital experiences that users love and businesses value.",
      approachTitle: 'My Approach',
      approachText1: "I believe that great digital products are born at the intersection of beautiful design, clean code, and smart automation. My approach is user-centered, data-driven, and driven by a passion for continuous learning and improvement.",
      approachText2: "Whether I'm designing an interface, writing code, or setting up an automation workflow, I always ask: 'How can this create the most value for users while maintaining technical excellence?' This philosophy guides every project I take on.",
      skillsDescription: 'A comprehensive toolkit of design, development, and automation skills honed through years of passionate work and continuous learning',
      projectsDescription: 'A collection of my recent work showcasing expertise in design, development, and automation. Each project represents a unique challenge and learning opportunity.',
      educationDescription: 'My academic journey and continual learning path in computer science and technology',
      contactDescription: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
      contactLocationText: 'Available for remote work worldwide',
      cvUrl: '#',
      footerCopyright: '© 2025 Alchemist. All rights reserved.',
      seoTitle: 'Portfolio | Creative - UI/UX Designer & Developer',
      seoDescription: 'A passionate CSE graduate who loves turning ideas into reality through design and code. Specializing in UI/UX Design, Frontend Development, and n8n Automation.',
      seoKeywords: 'Portfolio, UI/UX Designer, Frontend Developer, n8n Automation, React, TypeScript, Tailwind CSS',
      seoOgTitle: 'Portfolio | Creative - UI/UX Designer & Developer',
      seoOgDescription: 'UI/UX Designer, Frontend Developer, and n8n Automation Specialist',
    },
  })

  // ─── Admin Auth (upsert — always safe) ───
  await prisma.adminAuth.upsert({
    where: { id: 'admin-auth' },
    update: {},
    create: { id: 'admin-auth', passwordHash: 'admin123' },
  })

  // ─── Helper: seed only if table is empty ───
  async function seedIfEmpty<T extends keyof typeof prisma>(
    table: T,
    data: Record<string, unknown>[] | Record<string, unknown>
  ) {
    // @ts-expect-error — dynamic table access
    const count = await prisma[table].count()
    if (count === 0) {
      // @ts-expect-error — dynamic table access
      await prisma[table].createMany({ data })
      console.log(`  ✓ Seeded ${String(table)} (${Array.isArray(data) ? data.length : 1} rows)`)
    } else {
      console.log(`  ⊘ Skipped ${String(table)} (already has ${count} rows)`)
    }
  }

  // ─── Navigation Items ───
  await seedIfEmpty('navItem', [
    { label: 'Home', href: '/', order: 0 },
    { label: 'About', href: '/about', order: 1 },
    { label: 'Skills', href: '/skills', order: 2 },
    { label: 'Projects', href: '/projects', order: 3 },
    { label: 'Education', href: '/education', order: 4 },
    { label: 'Contact', href: '/contact', order: 5 },
  ])

  // ─── Hero Stats ───
  await seedIfEmpty('heroStat', [
    { value: '30+', label: 'UI/UX', color: '#a78bfa', position: 'left-top', order: 0 },
    { value: '15+', label: 'Front End', color: '#00e5ff', position: 'right-middle', order: 1 },
    { value: '20+', label: 'Automation', color: '#2dd4bf', position: 'left-bottom', order: 2 },
  ])

  // ─── About Skills ───
  await seedIfEmpty('aboutSkill', [
    { icon: 'Paintbrush', title: 'UI/UX Design', description: 'Crafting intuitive and visually stunning user interfaces with a focus on user experience and accessibility. I believe great design is both functional and beautiful.', metric: '50+', metricLabel: 'Design Projects', color: '#a78bfa', order: 0 },
    { icon: 'Code2', title: 'Frontend Development', description: 'Building responsive, performant web applications using modern technologies like React, TypeScript, and Tailwind CSS. Clean code is my priority.', metric: '30+', metricLabel: 'Projects Built', color: '#00e5ff', order: 1 },
    { icon: 'Bot', title: 'n8n Automation', description: 'Designing and implementing intelligent automation solutions to streamline business processes and save countless hours of manual work.', metric: '80%', metricLabel: 'Efficiency Gained', color: '#2dd4bf', order: 2 },
  ])

  // ─── Core Values ───
  await seedIfEmpty('coreValue', [
    { icon: 'User', title: 'User-Centered', description: 'Every decision starts with the user in mind.', order: 0 },
    { icon: 'Lightbulb', title: 'Innovation', description: 'Always exploring new technologies and approaches.', order: 1 },
    { icon: 'Target', title: 'Goal-Oriented', description: 'Focused on achieving measurable results.', order: 2 },
    { icon: 'Handshake', title: 'Collaboration', description: 'Working closely with teams and stakeholders.', order: 3 },
  ])

  // ─── Journey Items ───
  await seedIfEmpty('journeyItem', [
    { year: '2019', title: 'Started CSE Journey', description: "Began my bachelor's in Computer Science Engineering, discovering my passion for web development and design.", order: 0 },
    { year: '2021', title: 'First Freelance Project', description: 'Completed my first freelance project: a responsive website for a local business, sparking my entrepreneurial spirit.', order: 1 },
    { year: '2022', title: 'Deep Dive into UI/UX', description: 'Pursued advanced training in design principles, Figma, and user research methodologies. Won college hackathon with innovative design.', order: 2 },
    { year: '2023', title: 'Graduated & Specialized', description: 'Completed my B.Tech in Computer Science and began specializing in frontend development and n8n automation workflows.', order: 3 },
    { year: '2024', title: 'Full-Stack Growth', description: 'Expanded into backend integration, API development, and building end-to-end automation solutions for clients worldwide.', order: 4 },
  ])

  // ─── About Tech Tags ───
  await seedIfEmpty('aboutTechTag', ['React', 'TypeScript', 'Figma', 'Tailwind CSS', 'n8n', 'Node.js'].map((name, i) => ({ name, order: i })))

  // ─── Skill Categories + Skills ───
  const catCount = await prisma.skillCategory.count()
  if (catCount === 0) {
    const designCat = await prisma.skillCategory.create({ data: { icon: 'Paintbrush', title: 'Design', color: '#a78bfa', order: 0 } })
    await prisma.skill.createMany({ data: [
      { name: 'Figma', percentage: 95, categoryId: designCat.id, order: 0 },
      { name: 'Adobe XD', percentage: 88, categoryId: designCat.id, order: 1 },
      { name: 'Prototyping', percentage: 82, categoryId: designCat.id, order: 2 },
      { name: 'UI/UX Design', percentage: 76, categoryId: designCat.id, order: 3 },
      { name: 'Design Systems', percentage: 68, categoryId: designCat.id, order: 4 },
    ]})

    const devCat = await prisma.skillCategory.create({ data: { icon: 'Code2', title: 'Development', color: '#00e5ff', order: 1 } })
    await prisma.skill.createMany({ data: [
      { name: 'React', percentage: 96, categoryId: devCat.id, order: 0 },
      { name: 'TypeScript', percentage: 83, categoryId: devCat.id, order: 1 },
      { name: 'Tailwind CSS', percentage: 87, categoryId: devCat.id, order: 2 },
      { name: 'Next.js', percentage: 90, categoryId: devCat.id, order: 3 },
      { name: 'JavaScript', percentage: 85, categoryId: devCat.id, order: 4 },
    ]})

    const autoCat = await prisma.skillCategory.create({ data: { icon: 'Bot', title: 'Automation', color: '#2dd4bf', order: 2 } })
    await prisma.skill.createMany({ data: [
      { name: 'n8n', percentage: 94, categoryId: autoCat.id, order: 0 },
      { name: 'Zapier', percentage: 88, categoryId: autoCat.id, order: 1 },
      { name: 'API Integration', percentage: 82, categoryId: autoCat.id, order: 2 },
      { name: 'Workflow Design', percentage: 76, categoryId: autoCat.id, order: 3 },
      { name: 'Make (Integromat)', percentage: 68, categoryId: autoCat.id, order: 4 },
    ]})
    console.log('  ✓ Seeded skillCategory + skill')
  } else {
    console.log(`  ⊘ Skipped skillCategory (already has ${catCount} rows)`)
  }

  // ─── Soft Skills ───
  await seedIfEmpty('softSkill', [
    { icon: 'Puzzle', name: 'Problem Solving', percentage: 95, color: '#00e5ff', order: 0 },
    { icon: 'MessageCircle', name: 'Communication', percentage: 88, color: '#64b5f6', order: 1 },
    { icon: 'Users', name: 'Team Collaboration', percentage: 82, color: '#a78bfa', order: 2 },
    { icon: 'Clock', name: 'Time Management', percentage: 76, color: '#2dd4bf', order: 3 },
    { icon: 'Lightbulb', name: 'Creativity', percentage: 90, color: '#fbbf24', order: 4 },
    { icon: 'Target', name: 'Critical Thinking', percentage: 84, color: '#00e5ff', order: 5 },
    { icon: 'TrendingUp', name: 'Adaptability', percentage: 78, color: '#64b5f6', order: 6 },
    { icon: 'Crown', name: 'Leadership', percentage: 72, color: '#a78bfa', order: 7 },
  ])

  // ─── Additional Tech ───
  await seedIfEmpty('additionalTech', [
    'JavaScript', 'HTML/CSS', 'Git', 'REST APIs', 'GraphQL',
    'Responsive Design', 'Accessibility', 'Performance Optimization',
    'Design Systems', 'Agile/Scrum', 'CI/CD', 'Testing',
    'Node.js', 'MongoDB', 'PostgreSQL', 'Docker',
  ].map((name, i) => ({ name, order: i })))

  // ─── Currently Learning ───
  await seedIfEmpty('currentlyLearning', [
    { name: 'Web3 & Blockchain', percentage: 40, color: '#64b5f6', order: 0 },
    { name: 'Advanced AI Integration', percentage: 20, color: '#a78bfa', order: 1 },
  ])

  // ─── Projects + Tags ───
  const projCount = await prisma.project.count()
  if (projCount === 0) {
    const projectData = [
      { icon: 'ShoppingBag', title: 'E-Commerce Platform', description: 'Modern e-commerce solution with seamless checkout, inventory management, and integrated payments.', category: 'Development', gradient: 'from-[#4facfe] to-[#00f2fe]', accentColor: '#4facfe', tags: [
        { name: 'React', bgLight: 'bg-cyan-100', bgDark: 'bg-cyan-500/20', textLight: 'text-cyan-700', textDark: 'text-cyan-300' },
        { name: 'Node.js', bgLight: 'bg-emerald-100', bgDark: 'bg-emerald-500/20', textLight: 'text-emerald-700', textDark: 'text-emerald-300' },
        { name: 'MongoDB', bgLight: 'bg-teal-100', bgDark: 'bg-teal-500/20', textLight: 'text-teal-700', textDark: 'text-teal-300' },
      ]},
      { icon: 'Palette', title: 'Design System', description: 'Comprehensive component library with guidelines, documentation, and accessibility standards.', category: 'Design', gradient: 'from-[#667eea] to-[#764ba2]', accentColor: '#667eea', tags: [
        { name: 'Figma', bgLight: 'bg-violet-100', bgDark: 'bg-violet-500/20', textLight: 'text-violet-700', textDark: 'text-violet-300' },
        { name: 'Storybook', bgLight: 'bg-indigo-100', bgDark: 'bg-indigo-500/20', textLight: 'text-indigo-700', textDark: 'text-indigo-300' },
        { name: 'Sketch', bgLight: 'bg-sky-100', bgDark: 'bg-sky-500/20', textLight: 'text-sky-700', textDark: 'text-sky-300' },
      ]},
      { icon: 'Zap', title: 'Workflow Automation System', description: 'Automated business processes reducing manual work by 80% using AI and custom integrations.', category: 'Automation', gradient: 'from-[#a78bfa] to-[#64b5f6]', accentColor: '#a78bfa', tags: [
        { name: 'Python', bgLight: 'bg-teal-100', bgDark: 'bg-teal-500/20', textLight: 'text-teal-700', textDark: 'text-teal-300' },
        { name: 'Airflow', bgLight: 'bg-sky-100', bgDark: 'bg-sky-500/20', textLight: 'text-sky-700', textDark: 'text-sky-300' },
        { name: 'AWS', bgLight: 'bg-indigo-100', bgDark: 'bg-indigo-500/20', textLight: 'text-indigo-700', textDark: 'text-indigo-300' },
      ]},
      { icon: 'BarChart3', title: 'SaaS Analytics Dashboard', description: 'Real-time analytics dashboard with data visualization and customizable reporting features.', category: 'Development', gradient: 'from-[#4facfe] to-[#00f2fe]', accentColor: '#4facfe', tags: [
        { name: 'React', bgLight: 'bg-cyan-100', bgDark: 'bg-cyan-500/20', textLight: 'text-cyan-700', textDark: 'text-cyan-300' },
        { name: 'D3.js', bgLight: 'bg-violet-100', bgDark: 'bg-violet-500/20', textLight: 'text-violet-700', textDark: 'text-violet-300' },
        { name: 'PostgreSQL', bgLight: 'bg-blue-100', bgDark: 'bg-blue-500/20', textLight: 'text-blue-700', textDark: 'text-blue-300' },
      ]},
      { icon: 'Smartphone', title: 'Mobile App Design', description: 'User-centered mobile application with intuitive navigation and modern aesthetics.', category: 'Design', gradient: 'from-[#43e97b] to-[#38f9d7]', accentColor: '#43e97b', tags: [
        { name: 'Figma', bgLight: 'bg-violet-100', bgDark: 'bg-violet-500/20', textLight: 'text-violet-700', textDark: 'text-violet-300' },
        { name: 'Prototyping', bgLight: 'bg-indigo-100', bgDark: 'bg-indigo-500/20', textLight: 'text-indigo-700', textDark: 'text-indigo-300' },
        { name: 'User Research', bgLight: 'bg-emerald-100', bgDark: 'bg-emerald-500/20', textLight: 'text-emerald-700', textDark: 'text-emerald-300' },
      ]},
      { icon: 'Bot', title: 'AI Integration Tool', description: 'Seamless integration of AI capabilities into existing platforms with custom solutions.', category: 'Automation', gradient: 'from-[#a78bfa] to-[#2dd4bf]', accentColor: '#a78bfa', tags: [
        { name: 'Python', bgLight: 'bg-teal-100', bgDark: 'bg-teal-500/20', textLight: 'text-teal-700', textDark: 'text-teal-300' },
        { name: 'TensorFlow', bgLight: 'bg-cyan-100', bgDark: 'bg-cyan-500/20', textLight: 'text-cyan-700', textDark: 'text-cyan-300' },
        { name: 'API', bgLight: 'bg-violet-100', bgDark: 'bg-violet-500/20', textLight: 'text-violet-700', textDark: 'text-violet-300' },
      ]},
      { icon: 'Briefcase', title: 'Portfolio Website', description: 'Modern portfolio website with glassmorphism effects, smooth animations, and responsive design.', category: 'Development', gradient: 'from-[#30cfd0] to-[#330867]', accentColor: '#30cfd0', tags: [
        { name: 'React', bgLight: 'bg-cyan-100', bgDark: 'bg-cyan-500/20', textLight: 'text-cyan-700', textDark: 'text-cyan-300' },
        { name: 'Tailwind CSS', bgLight: 'bg-sky-100', bgDark: 'bg-sky-500/20', textLight: 'text-sky-700', textDark: 'text-sky-300' },
        { name: 'Framer', bgLight: 'bg-violet-100', bgDark: 'bg-violet-500/20', textLight: 'text-violet-700', textDark: 'text-violet-300' },
      ]},
      { icon: 'Utensils', title: 'Restaurant Landing Page', description: 'Beautiful landing page for a restaurant with online ordering, menu display, and gallery.', category: 'Design', gradient: 'from-[#a8edea] to-[#fed6e3]', accentColor: '#a8edea', tags: [
        { name: 'Next.js', bgLight: 'bg-slate-100', bgDark: 'bg-slate-500/20', textLight: 'text-slate-700', textDark: 'text-slate-300' },
        { name: 'Tailwind CSS', bgLight: 'bg-sky-100', bgDark: 'bg-sky-500/20', textLight: 'text-sky-700', textDark: 'text-sky-300' },
        { name: 'Figma', bgLight: 'bg-violet-100', bgDark: 'bg-violet-500/20', textLight: 'text-violet-700', textDark: 'text-violet-300' },
      ]},
      { icon: 'CheckSquare', title: 'Task Management App', description: 'Productivity app with kanban boards, task lists, and team collaboration features.', category: 'Development', gradient: 'from-[#64b5f6] to-[#a78bfa]', accentColor: '#64b5f6', tags: [
        { name: 'Vue.js', bgLight: 'bg-emerald-100', bgDark: 'bg-emerald-500/20', textLight: 'text-emerald-700', textDark: 'text-emerald-300' },
        { name: 'Firebase', bgLight: 'bg-indigo-100', bgDark: 'bg-indigo-500/20', textLight: 'text-indigo-700', textDark: 'text-indigo-300' },
        { name: 'PWA', bgLight: 'bg-teal-100', bgDark: 'bg-teal-500/20', textLight: 'text-teal-700', textDark: 'text-teal-300' },
      ]},
    ]

    for (const p of projectData) {
      const project = await prisma.project.create({ data: { icon: p.icon, title: p.title, description: p.description, category: p.category, gradient: p.gradient, accentColor: p.accentColor, order: projectData.indexOf(p) } })
      await prisma.projectTag.createMany({ data: p.tags.map((t, i) => ({ ...t, projectId: project.id, order: i })) })
    }
    console.log('  ✓ Seeded project + projectTag')
  } else {
    console.log(`  ⊘ Skipped project (already has ${projCount} rows)`)
  }

  // ─── Degrees ───
  await seedIfEmpty('degree', [
    { icon: 'Shield', title: 'Bachelor of Technology in Computer Science', institution: 'University Name', location: 'City, State', period: '2019 - 2023', gpa: '8.5/10', gpaColor: '#00e5ff', description: 'Specialized in Software Engineering and Web Technologies. Completed coursework in Data Structures, Algorithms, Database Management, and Web Development.', achievements: "Dean's List for Academic Excellence,First Prize in College Hackathon 2022,President of Coding Club,Published research paper on Web Optimization", order: 0 },
    { icon: 'GraduationCap', title: 'Higher Secondary Education', institution: 'School Name', location: 'City, State', period: '2017 - 2019', gpa: '92%', gpaColor: '#2dd4bf', description: 'Focused on Science stream with Computer Science as an elective. Developed strong foundation in Mathematics and Computer Programming.', achievements: 'School Topper in Computer Science,Science Fair Winner,Participated in National Science Olympiad', order: 1 },
  ])

  // ─── Certifications ───
  await seedIfEmpty('certification', [
    { icon: 'Code2', name: 'Advanced React Development', issuer: 'Meta', year: '2023', color: '#a78bfa', order: 0 },
    { icon: 'Palette', name: 'UI/UX Design Specialization', issuer: 'Google', year: '2022', color: '#00e5ff', order: 1 },
    { icon: 'Bot', name: 'n8n Automation Expert', issuer: 'n8n', year: '2024', color: '#2dd4bf', order: 2 },
    { icon: 'Cpu', name: 'TypeScript Advanced', issuer: 'Microsoft', year: '2023', color: '#64b5f6', order: 3 },
    { icon: 'Zap', name: 'Web Performance Optimization', issuer: 'Google', year: '2023', color: '#fbbf24', order: 4 },
    { icon: 'Monitor', name: 'Responsive Web Design', issuer: 'freeCodeCamp', year: '2021', color: '#f97316', order: 5 },
  ])

  // ─── Coursework ───
  await seedIfEmpty('coursework', [
    'Data Structures & Algorithms', 'Object-Oriented Programming', 'Database Management Systems', 'Web Development',
    'Software Engineering', 'Operating Systems', 'Computer Networks', 'Machine Learning Basics',
    'Mobile App Development', 'Cloud Computing', 'Cybersecurity Fundamentals', 'Human-Computer Interaction',
  ].map((name, i) => ({ name, order: i })))

  // ─── Contact Cards ───
  await seedIfEmpty('contactCard', [
    { icon: 'Mail', label: 'Email', value: 'hello@alchemist.io', href: 'mailto:hello@alchemist.io', order: 0 },
    { icon: 'Github', label: 'GitHub', value: '@alchemist', href: 'https://github.com', order: 1 },
    { icon: 'Linkedin', label: 'LinkedIn', value: 'Connect with me', href: 'https://linkedin.com', order: 2 },
    { icon: 'Youtube', label: 'YouTube', value: 'Subscribe', href: 'https://youtube.com', order: 3 },
    { icon: 'MessageCircle', label: 'WhatsApp', value: 'Chat with me', href: 'https://wa.me/1234567890', order: 4 },
    { icon: 'Facebook', label: 'Facebook', value: 'Follow me', href: 'https://facebook.com', order: 5 },
  ])

  // ─── Social Links ───
  await seedIfEmpty('socialLink', [
    { icon: 'Github', href: 'https://github.com', label: 'GitHub', order: 0 },
    { icon: 'Linkedin', href: 'https://linkedin.com', label: 'LinkedIn', order: 1 },
    { icon: 'Youtube', href: 'https://youtube.com', label: 'YouTube', order: 2 },
    { icon: 'Facebook', href: 'https://facebook.com', label: 'Facebook', order: 3 },
  ])

  console.log('✅ Seed completed successfully!')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })

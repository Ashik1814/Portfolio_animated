# Task 2-a: Backend API Developer

## Work Log

### 1. Updated content API route (`/src/app/api/content/route.ts`)
- Added `navItems` and `heroStats` to the Promise.all query array
- `navItems`: `db.navItem.findMany({ orderBy: { order: 'asc' } })`
- `heroStats`: `db.heroStat.findMany({ orderBy: { order: 'asc' } })`
- Added both fields to the JSON response object after `siteConfig`
- Total fields in response: siteConfig, navItems, heroStats, aboutSkills, coreValues, journeyItems, aboutTechTags, skillCategories, softSkills, additionalTech, currentlyLearning, projects, degrees, certifications, coursework, contactCards, socialLinks

### 2. Created NavItems API route (`/src/app/api/admin/nav-items/route.ts`)
- Standard CRUD pattern following existing admin routes
- GET: list all nav items ordered by `order` asc
- POST: create a new nav item
- PUT: update a nav item (extracts id from body, updates rest)
- DELETE: delete by id from query param (`?id=xxx`)
- Error handling with console.error and appropriate status codes

### 3. Created HeroStats API route (`/src/app/api/admin/hero-stats/route.ts`)
- Same CRUD pattern as NavItems but for HeroStat model
- GET: list all hero stats ordered by `order` asc
- POST: create a new hero stat
- PUT: update a hero stat (extracts id from body, updates rest)
- DELETE: delete by id from query param (`?id=xxx`)

### 4. Created Admin Auth API route (`/src/app/api/admin/auth/route.ts`)
- POST: Login - validates password against AdminAuth table
  - Auto-creates default auth record (id: 'admin-auth', passwordHash: 'admin123') if none exists
  - Sets httpOnly cookie 'admin-session' = 'authenticated' with 24h expiry on success
  - Returns 401 on invalid password
- GET: Check session - reads cookie and returns `{ authenticated: boolean }`
- DELETE: Logout - deletes the admin-session cookie

### 5. Created Change Password API route (`/src/app/api/admin/change-password/route.ts`)
- PUT: Change password with session verification
  - Checks admin-session cookie is 'authenticated' (returns 401 if not)
  - Validates currentPassword matches stored passwordHash (returns 400 if wrong)
  - Updates passwordHash to newPassword on success

### 6. Verified site-config route (`/src/app/api/admin/site-config/route.ts`)
- Already uses upsert pattern that accepts any data fields
- No changes needed - new SiteConfig fields (logoText, heroCtaText, cvUrl, footerCopyright, seo fields, etc.) are handled automatically

## Verification
- ESLint passes cleanly with no errors
- Dev server compiles successfully (no compilation errors in dev.log)
- All new routes follow existing project patterns and Next.js 16 App Router conventions
- `cookies()` from `next/headers` used with `await` as required in Next.js 16

## Files Modified
- `/src/app/api/content/route.ts` — Added navItems and heroStats queries + response fields

## Files Created
- `/src/app/api/admin/nav-items/route.ts` — NavItems CRUD
- `/src/app/api/admin/hero-stats/route.ts` — HeroStats CRUD
- `/src/app/api/admin/auth/route.ts` — Admin authentication (login/check/logout)
- `/src/app/api/admin/change-password/route.ts` — Password change with session guard

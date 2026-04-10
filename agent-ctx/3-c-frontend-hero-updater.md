# Task 3-c: Frontend Hero Updater

## Summary
Updated `/home/z/my-project/src/components/portfolio/hero.tsx` to use dynamic data from the content store instead of hard-coded values.

## Changes Made

1. **Imports**: Removed `Github, Linkedin, Twitter, MessagesSquare` from lucide-react imports (only `ArrowRight` kept). Added `import { getIcon } from "@/lib/get-icon"`.

2. **Store subscriptions**: Added `const socialLinks = useContent((s) => s.socialLinks)` and `const heroStats = useContent((s) => s.heroStats)` alongside existing `siteConfig`.

3. **Social links**: Replaced hard-coded 4-item array with `socialLinks.map()` using `getIcon(social.icon)` for dynamic icon resolution.

4. **Follow text**: `siteConfig.heroFollowText || "Follow me:"`

5. **Primary CTA**: `siteConfig.heroCtaText || "Get In Touch"` and `siteConfig.heroCtaLink || "#contact"`

6. **Secondary CTA**: `siteConfig.heroSecondaryCtaText || "View Projects"` and `siteConfig.heroSecondaryCtaLink || "#projects"`

7. **Available text**: `siteConfig.heroAvailableText || "Available for work"`

8. **Hero stats**: Replaced 3 hard-coded stat badges with `heroStats.map()` using `positionClasses` record for CSS positioning, `stat.color` for theming, and `stat.order` for animation timing.

9. **Profile image**: Conditional rendering — if `siteConfig.heroProfileImage` exists, show `<img>`; otherwise show the existing placeholder SVG.

10. **Position classes**: Extracted to module-level `positionClasses` constant mapping `left-top`, `right-middle`, `left-bottom` to absolute CSS positioning classes.

## Verification
- ESLint passes cleanly
- Dev server compiles successfully
- All existing styling, animations, and responsive design preserved

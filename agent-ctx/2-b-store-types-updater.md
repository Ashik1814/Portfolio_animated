# Task 2-b: Store & Types Updater

## Summary
Updated both type definition files to support new NavItem, HeroStat models and expanded SiteConfig fields.

## Changes Made

### `/src/stores/content-store.ts`
- Added `NavItemData` interface (id, label, href, order)
- Added `HeroStatData` interface (id, value, label, color, position, order)
- Expanded `SiteConfigData` with 16 new fields:
  - logoText, heroCtaText, heroCtaLink, heroSecondaryCtaText, heroSecondaryCtaLink
  - heroFollowText, heroAvailableText, heroProfileImage, cvUrl
  - footerCopyright, seoTitle, seoDescription, seoKeywords, seoOgTitle, seoOgDescription
- Added `navItems: NavItemData[]` and `heroStats: HeroStatData[]` to ContentData
- Added `navItems: []` and `heroStats: []` to defaults

### `/src/components/admin/types.ts`
- Added `NavItem` interface (id, label, href, order)
- Added `HeroStat` interface (id, value, label, color, position, order)
- Expanded `SiteConfig` with same 16 new fields (preserving updatedAt)
- Added `navItems: NavItem[]` and `heroStats: HeroStat[]` to ContentData

## Verification
- ESLint passes cleanly
- All existing types preserved — no breaking changes

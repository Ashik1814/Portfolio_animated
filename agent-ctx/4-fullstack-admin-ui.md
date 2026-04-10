# Task 4: Build Admin Panel UI at /admin

## Agent: fullstack-admin-ui

## Summary
Built a complete admin panel at `/admin` route with sidebar navigation and form-based CRUD editing for all 17 portfolio entities.

## Files Created
- `src/app/admin/page.tsx` — Main admin page (client component) with data fetching, state management, and CRUD operations
- `src/components/admin/types.ts` — TypeScript interfaces for all entities (SiteConfig, AboutSkill, CoreValue, JourneyItem, etc.)
- `src/components/admin/sidebar.tsx` — Dark sidebar with section navigation links, responsive mobile drawer
- `src/components/admin/site-config-editor.tsx` — Single-record editor for SiteConfig with all fields
- `src/components/admin/entity-editor.tsx` — Generic CRUD component for all 16 list entity types with dialog forms

## Files Modified
- `src/app/layout.tsx` — Added Sonner Toaster import for toast notifications

## Architecture
- **Data Flow**: Page fetches from `GET /api/content` → stores in React state → passes to child editors
- **CRUD**: POST/PUT/DELETE to `/api/admin/{entity}` → re-fetch from `/api/content` → UI updates
- **Forms**: Dialog-based modals for Add/Edit, separate confirmation dialog for Delete
- **Entity Definitions**: Centralized `ENTITY_DEFS` record maps entity keys to field definitions, display columns, and API paths
- **Special Handling**: Skills are flattened from skill categories; Project tags are flattened from projects; both use select dropdowns for related entities

## Key Design Decisions
- Sidebar positioned at `top-16` to work with the fixed portfolio header
- Used Sonner toast instead of shadcn toast for simpler API
- Generic EntityEditor component avoids code duplication across 16 entity types
- Color picker + text input for color fields (allows both hex codes and CSS class names)
- Responsive: sidebar drawer on mobile, fixed sidebar on desktop (lg+)

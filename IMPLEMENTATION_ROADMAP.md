# Implementation Roadmap

## Phase 0: Project Setup
Goal:
Prepare project, dependencies, design docs, and agent rules.

Tasks:
- Create Next.js project
- Install Motion, Lucide, shadcn/ui, Playwright
- Add AGENTS.md
- Add PROJECT_BRIEF.md
- Add UX_UI_PLAN.md
- Add QA_CHECKLIST.md
- Confirm dev server runs

Acceptance Criteria:
- pnpm dev works
- docs exist
- basic app loads

## Phase 1: Design System
Goal:
Create the visual foundation.

Tasks:
- Define CSS variables
- Define typography scale
- Define color tokens
- Define container sizes
- Create reusable Section component
- Create reusable Container component
- Create utility data structure for categories/products

Acceptance Criteria:
- Site has premium base feel
- Typography is intentional
- Background colors feel natural
- No generic blue/purple AI style

## Phase 2: Header + Mega Menu
Goal:
Build serious ecommerce navigation.

Tasks:
- Header
- Top legal/trust bar
- Desktop nav
- Mega menu
- Search input
- Account/cart actions
- Mobile drawer
- Mobile category accordions

Acceptance Criteria:
- Desktop menu supports deep categories
- Mobile drawer works cleanly
- Search is prominent
- Header feels production-ready

## Phase 3: Homepage Hero
Goal:
Create premium first impression.

Tasks:
- Hero layout
- Editorial headline
- CTA group
- Category quick links
- Trust chips
- Visual product/category composition
- Subtle Motion animation

Acceptance Criteria:
- Hero does not look SaaS-generic
- CTA is clear
- Mobile hero is excellent
- Copy is responsible and professional

## Phase 4: Product Data + ProductCard
Goal:
Create strong reusable product presentation.

Tasks:
- Mock product data
- ProductCard component
- Badges
- Price display
- Availability display
- Sale state
- Legal marker
- Hover state

Acceptance Criteria:
- Card looks premium
- Price is clear
- Badges are refined
- Mobile card is readable

## Phase 5: Homepage Sections
Goal:
Build complete homepage.

Tasks:
- Category discovery
- Novo u ponudi
- Optics highlight
- Featured regulated products section
- Brand strip
- Expert help CTA
- Trust section
- Footer teaser

Acceptance Criteria:
- Sections do not feel repetitive
- Page rhythm feels natural
- Strong ecommerce discovery
- No unsafe product language

## Phase 6: Category Listing Page
Goal:
Build serious ecommerce listing UX.

Tasks:
- /kategorija/dugo-oruzje
- Breadcrumb
- Category header
- Filters
- Mobile filter drawer
- Sorting
- Result count
- Product grid
- Pagination
- Legal notice

Acceptance Criteria:
- Desktop filters work visually
- Mobile filters are usable
- Grid is responsive
- Legal notice is visible

## Phase 7: Product Detail Page
Goal:
Build product buying/inquiry experience.

Tasks:
- /proizvod/[slug] mock page
- Gallery
- Product info
- Price/status
- Specs table
- Legal notice
- CTA
- FAQ
- Related products

Acceptance Criteria:
- Page feels trustworthy
- Regulated product UX is responsible
- Specs are scannable
- Mobile layout works

## Phase 8: Cart + Checkout Mockup
Goal:
Build ecommerce flow.

Tasks:
- Cart drawer
- Quantity controls
- Subtotal
- Legal note
- Checkout page mockup
- Terms/legal checkboxes

Acceptance Criteria:
- Cart is clean
- Checkout is clear
- Legal checkbox exists
- Mobile UX works

## Phase 9: About + Contact + Footer
Goal:
Build store legitimacy.

Tasks:
- About page
- Contact page
- Contact form UI
- Map placeholder
- Support CTA
- Footer links

Acceptance Criteria:
- Store feels real
- Contact info is easy to find
- Footer is complete

## Phase 10: Review + Polish
Goal:
Improve quality.

Tasks:
- Codex review
- Gemini CLI build fixes
- Playwright MCP browser QA
- Responsive fixes
- Accessibility fixes
- Performance pass
- Final visual polish

Acceptance Criteria:
- Build passes
- Major responsive bugs fixed
- Navigation usable
- Visual design looks premium
- No obvious AI-generated sections
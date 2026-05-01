# AI Agent Rules

## Project

Premium ecommerce redesign inspired by pointershop.net.

## Core Goal

Build an original, modern, premium, responsive ecommerce website for a Croatian hunting, outdoor, optics, apparel, footwear, and equipment store.

This is not a pixel-perfect clone.
Do not copy protected branding, exact text, exact layout, product photos, logos, or copyrighted assets.
Use the business structure and ecommerce UX pattern as inspiration, but create a new and better design.

## Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Motion
- Lucide icons
- Playwright

## Design Direction

The website must feel:

- premium
- grounded
- trustworthy
- Croatian / European ecommerce realistic
- outdoor and tactical, but not aggressive
- modern, but not generic
- elegant, but not sterile
- responsive and mobile-first

## Avoid

- generic AI-generated SaaS gradients
- excessive glassmorphism
- excessive border radius
- random decorative blobs
- cheap military/tactical clichés
- dark-only aggressive weapon-store look
- repeated identical card sections
- fake-looking copy
- overloaded homepage
- inaccessible navigation

## Visual Language

Use:

- warm off-white backgrounds
- deep charcoal text
- muted olive / forest tones
- sand / stone neutrals
- brass or amber accent sparingly
- strong editorial typography
- clean UI body typography
- structured product cards
- refined badges
- subtle shadows
- crisp borders
- natural spacing rhythm

## UX Rules

- Search must be prominent.
- Desktop navigation must support deep categories through a mega menu.
- Mobile navigation must use a drawer with accordion categories.
- Category pages must include filters, sorting, result count, product grid, pagination, and mobile filter drawer.
- Product cards must clearly show image, category, brand, name, availability, price, sale price, and CTA.
- Product detail pages must show specs, gallery, availability, legal notice, related products, and inquiry/contact option.
- Cart drawer must be clean and trustworthy.
- Checkout mockup must include legal/terms checkboxes.
- Footer must feel complete and production-ready.

## Compliance / Responsible Commerce Rules

Because the niche includes regulated products:

- Include age/legal responsibility notices where relevant.
- Include permit/license notice for regulated products.
- Use neutral commerce language.
- Do not use aggressive or unsafe marketing language.
- Do not include instructions on weapon use.
- Do not include tactical usage guidance.
- For regulated products, include “contact store” or “purchase in store with required documentation” UX.
- Never imply that regulated products can be purchased without legal requirements.

## Code Rules

- Keep components small and reusable.
- Use semantic HTML.
- Use TypeScript.
- Use Server Components by default.
- Use Client Components only for interaction.
- Make layout mobile-first.
- Keep design tokens centralized.
- Avoid unnecessary dependencies.
- Use accessible buttons, links, forms, labels, dialogs, and drawer behavior.
- Do not hardcode messy repeated data directly into UI components if mock data can be separated.

## Before Completing Any Task

Check:

- Does it match PROJECT_BRIEF.md?
- Does it match UX_UI_PLAN.md?
- Is it responsive?
- Is it accessible enough?
- Does it look less generic?
- Does it avoid unsafe/irresponsible copy?
- Are components clean?
- Did build/lint pass if possible?

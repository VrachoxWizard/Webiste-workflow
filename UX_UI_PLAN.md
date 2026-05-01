# Pointershop Inspired Premium Ecommerce Redesign — Final UX/UI Plan

## 0. Project Summary

This document defines the final UX/UI plan for a premium ecommerce redesign inspired by `pointershop.net`.

This is **not** a 1:1 clone of the existing website. The goal is to build a modern, serious, responsive, visually stronger ecommerce experience for a specialized Croatian webshop focused on hunting, sport shooting, outdoor equipment, optics, apparel, footwear, and accessories.

The redesign should preserve the logic of a specialized product catalog, but improve the experience so the final result feels:

- more professional
- more trustworthy
- easier to browse
- visually cleaner
- less generic
- less AI-generated
- more premium
- more locally credible for a Croatian ecommerce context
- better suited for real ecommerce usage
- safer and more responsible for regulated products

Because the product range includes weapons and ammunition, the interface must clearly communicate legal responsibility, age restrictions, availability disclaimers, and the need to contact the store for certain regulated items.

The final website should feel like a serious production ecommerce redesign, not a generated template or a generic WooCommerce skin.

---

## 1. Main Redesign Goals

### 1.1 Business Goal

Create a premium ecommerce website for a specialized shop that sells:

- firearms
- ammunition
- optics
- hunting equipment
- outdoor equipment
- apparel
- footwear
- maintenance accessories
- bags, holsters, cases, flashlights, and related equipment

The site should communicate expertise, reliability, and responsibility. It should not look like a cheap tactical shop, a gaming-themed store, or a generic dropshipping webshop.

### 1.2 UX Goal

Users should be able to:

- quickly understand the product categories
- easily navigate between categories and subcategories
- filter products efficiently
- understand product availability
- recognize regulated products
- contact the store when needed
- browse comfortably on mobile
- use a clear cart experience
- move through a responsible checkout flow
- read legal and purchase conditions without friction

### 1.3 UI Goal

The visual design should feel:

- premium
- natural
- grounded
- rugged but not aggressive
- elegant
- structured
- editorial
- warm
- professional
- Croatian/local-market credible

The interface should avoid:

- generic AI gradients
- overly rounded SaaS-style cards
- aggressive military visuals
- neon tactical aesthetics
- default shadcn/ui styling
- default WooCommerce product cards
- cluttered layouts
- fake urgency and cheap ecommerce tricks

### 1.4 Compliance and Safety Goal

Since the webshop includes weapons and ammunition, the UI must clearly include:

- age/legal responsibility notices
- availability disclaimers
- permit/license notices where relevant
- a clear “contact before purchase” option for regulated items
- no unsafe copywriting
- no aggressive product language
- no instructions on weapon use
- no militaristic or violent marketing tone

The interface should present regulated products responsibly and professionally.

---

# 2. Sitemap

## 2.1 Main Website Structure

```text
/
├── Home
├── Weapons
│   ├── Long Weapons
│   │   ├── Shotguns
│   │   ├── Rifles
│   │   ├── Modern Weapons
│   │   └── Used Weapons
│   ├── Handguns
│   ├── Gas Weapons
│   ├── Air Weapons
│   ├── Cleaning and Maintenance
│   └── Holsters and Cases
├── Ammunition
│   ├── Shotgun Ammunition
│   ├── Small-Caliber Ammunition
│   ├── Rifle Ammunition
│   ├── Pellets
│   └── Reloading
├── Optics and Equipment
│   ├── Hunting Equipment
│   ├── Optics
│   │   ├── Red Dot Sights
│   │   ├── Day Optics
│   │   ├── Night and Thermal Devices
│   │   └── Rails and Rings
│   ├── Flashlights
│   ├── Knives
│   └── Backpacks and Bags
├── Apparel and Footwear
│   ├── Jackets
│   ├── Pants
│   ├── Caps
│   ├── T-Shirts
│   └── Boots
├── Brands
├── New Arrivals
├── Sale
├── About
├── Contact
├── Purchase Terms
├── Privacy Policy
├── Delivery and Returns
├── Regulated Products
├── My Account
├── Cart
└── Checkout
```

---

## 2.2 Required Pages

### 2.2.1 Home Page

The home page is the premium entry point into the store.

It must include:

- top utility bar
- main navigation
- hero section
- trust strip
- category discovery grid
- featured products / new arrivals
- ammunition and accessories section
- brand strip
- responsible purchase section
- store/contact info block
- footer

The home page should immediately communicate that this is a specialized and responsible ecommerce shop.

---

### 2.2.2 Category Listing Page

The category page is the main product browsing experience.

It must include:

- breadcrumb navigation
- category hero
- short category description
- subcategory pills
- product count
- sorting
- search within category
- desktop filter sidebar
- mobile filter drawer
- active filter chips
- product grid
- pagination or load more
- no-results state
- category SEO/content block

---

### 2.2.3 Product Detail Page

The product detail page must clearly present:

- product gallery
- product title
- brand
- SKU
- availability
- price
- sale price if applicable
- regulated product notice if relevant
- product description
- product specifications
- delivery/pickup information
- related products
- contact/inquiry option

For regulated products, the buying flow should prioritize inquiry and availability confirmation instead of aggressive direct purchase messaging.

---

### 2.2.4 Cart Drawer and Cart Page

The cart experience should exist in two forms:

1. **Cart drawer** for quick review after adding a product
2. **Cart page** for a full order review before checkout

Both cart experiences must clearly handle regulated products and display relevant legal/availability notes.

---

### 2.2.5 Checkout Mockup

The checkout should be structured, realistic, and responsible.

Recommended checkout steps:

1. Order review
2. Customer information
3. Delivery or pickup
4. Payment
5. Legal confirmations
6. Confirmation page

---

### 2.2.6 About Page

The About page should strengthen trust and local credibility.

It should include:

- short business story
- store expertise
- local presence
- responsible business approach
- store/contact CTA
- trust-focused content

---

### 2.2.7 Contact Page

The Contact page should include:

- address
- phone number
- email
- map
- contact form
- opening hours if available
- CTA for product inquiries
- CTA for regulated product questions

---

### 2.2.8 Legal / Purchase Conditions Pages

The legal section should include:

- purchase terms
- delivery policy
- return policy
- privacy policy
- regulated product purchase conditions
- age restriction notices
- product availability disclaimer

Legal pages should be readable and well-designed, not plain walls of text.

---

# 3. Home Page Layout

## 3.1 Home Page Objective

The home page must immediately communicate:

- expertise
- trust
- premium product range
- responsible shopping
- clear categories
- serious ecommerce quality

It should not feel like a generic WooCommerce home page.

---

## 3.2 Home Page Structure

```text
Top Utility Bar
Main Navbar
Hero Section
Trust Strip
Category Discovery Grid
Featured Products / New Arrivals
Ammunition and Accessories Section
Brand Strip
Responsible Purchase / Expert Support Section
Store Info / Contact Section
Newsletter or Inquiry CTA
Footer
```

---

## 3.3 Top Utility Bar

### Purpose

A small informational strip above the main navbar.

### Content Examples

- Delivery within Croatia
- Personal pickup available
- Availability is confirmed before delivery
- Legal conditions apply for regulated items
- Phone number
- Email
- Link to purchase terms

### Visual Direction

- dark charcoal or dark olive background
- off-white text
- small typography
- very subtle separators
- no loud colors
- no flashing promo style

### UX Rules

- on mobile, show only the most important items
- do not make it too tall
- avoid making it feel like a sales banner
- keep it informative and serious

---

## 3.4 Main Navbar

### Desktop Structure

```text
[Logo] [Weapons] [Ammunition] [Optics & Equipment] [Apparel & Footwear] [Brands] [Sale] [Contact]    [Search] [Account] [Cart]
```

### UX Rules

- search must be easy to access
- cart badge must be visible
- mega menu must be clear and structured
- navbar should become sticky after scroll
- hover states should be subtle and premium
- avoid too many icons
- avoid overly rounded pill-style navigation

### Visual Direction

- warm off-white background
- thin bottom border
- serious typography
- logo on the left
- hover underline using olive or brass accent
- cart icon with a small badge

---

## 3.5 Hero Section

### Purpose

The hero section sets the entire tone of the website.

It should communicate premium outdoor, hunting, sport shooting, and field equipment without feeling aggressive.

### Desktop Layout

```text
-------------------------------------------------
| Left Content                  | Right Visual   |
|                               |                |
| Eyebrow                       | Product /      |
| Large Headline                | outdoor visual |
| Supporting Text               |                |
| CTA Buttons                   |                |
| Small Trust Notes             |                |
-------------------------------------------------
```

### Mobile Layout

```text
Hero Visual
Eyebrow
Headline
Supporting Text
CTA Buttons
Trust Notes
```

### Eyebrow Copy Examples

- `Specialized outdoor and hunting equipment`
- `Equipment for hunting, sport, and field use`
- `Selected products. Clear conditions. Expert support.`

### Headline Examples

- `Reliable equipment for hunting, sport, and the field.`
- `Selected gear for demanding outdoor conditions.`
- `A specialized shop for hunters, sport shooters, and outdoor users.`

### Supporting Text Example

`Browse a curated range of weapons, ammunition, optics, apparel, footwear, and field equipment — with clear availability information, responsible purchase conditions, and expert support.`

### CTA Buttons

Primary:

- `Explore the Offer`
- `View Categories`

Secondary:

- `Contact for Regulated Products`
- `Check Availability`

### Hero Visual Rules

Do not use:

- generic AI gradients
- floating SaaS cards
- aggressive weapon imagery
- neon tactical styling
- overdesigned template visuals

Use:

- natural outdoor atmosphere
- product composition
- field/trail/store context
- warm neutral background
- muted olive and sand tones
- serious editorial composition

### Hero Trust Notes

Below the CTA buttons, show short trust notes:

- `Availability confirmed before delivery`
- `Personal pickup available`
- `Legal conditions apply for regulated products`

---

## 3.6 Trust Strip

### Purpose

The trust strip should immediately show responsible ecommerce signals.

### Cards

#### 1. Safe and Responsible Shopping

`Clear information about purchase terms, product availability, and regulated items.`

#### 2. Availability Confirmation

`Stock and delivery options are confirmed before final processing.`

#### 3. Expert Support

`Contact the store for product compatibility, availability, and purchase questions.`

#### 4. Personal Pickup

`For selected items, personal pickup can be arranged with the store.`

### Visual Style

- compact cards
- small icons
- thin borders
- warm neutral background
- no heavy shadows
- no generic ecommerce icon overload

---

## 3.7 Category Discovery Section

### Purpose

Users should quickly understand the store’s product range.

### Section Title Examples

- `Explore the Offer by Category`
- `Equipment Organized by Real Use Cases`
- `Find What You Need for Hunting, Sport, and the Field`

### Desktop Layout

```text
Large Card: Weapons
Medium Card: Ammunition
Medium Card: Optics
Medium Card: Hunting Equipment
Wide Card: Apparel and Footwear
Small Card: Sale / Used Products
```

### Mobile Layout

- cards stacked vertically
- most important categories first
- images remain large enough
- CTA visible on every card

### Category Card Content

Each card should include:

- category name
- short description
- 3–5 subcategory links
- image or texture
- CTA
- subtle hover state

### Example Category Card

**Weapons**

`Long, short, air, and gas weapons with clear purchase conditions and availability confirmation.`

Mini links:

- Shotguns
- Rifles
- Handguns
- Cleaning and Maintenance

CTA:

`View Category`

---

## 3.8 Featured Products / New Arrivals

### Purpose

Show recently added products with a stronger product card system.

### Section Title

`New Arrivals`

### Section Subtitle

`Recently added products from key categories — with clear availability, pricing, and inquiry options.`

### Product Card Requirements

Each product card must include:

- large product image
- brand
- product name
- category
- price
- old price if on sale
- status badge
- CTA
- quick action
- regulated product indicator if relevant

### Product Status Badges

Examples:

- `Available`
- `On Order`
- `New`
- `Sale`
- `Check Availability`
- `Regulated Item`

### CTA Logic

For regular items:

- `Add to Cart`
- `Details`

For regulated items:

- `View Details`
- `Send Inquiry`
- `Check Conditions`

### Visual Style

- less rounded cards
- larger image area
- clear typography
- clean price block
- subtle badges
- minimal hover shadow
- no excessive colors

---

## 3.9 Ammunition and Accessories Section

### Purpose

Ammunition is an important category, but it must be presented responsibly.

### Section Title

`Ammunition and Accessories`

### Subtitle

`Browse shotgun, small-caliber, rifle ammunition, pellets, and reloading products with clear purchase conditions.`

### Layout

- left side: text and legal notice
- right side: product grid or carousel
- filter pills for subcategories

### Filter Pills

- Shotgun Ammunition
- Small-Caliber
- Rifle Ammunition
- Pellets
- Reloading

### Legal Note

`Legal conditions may apply for selected products. Availability and purchase options must be confirmed with the store.`

### CTA

- `View Ammunition`
- `Contact for Availability`

---

## 3.10 Brand Strip

### Purpose

Strengthen trust through recognizable brands.

### Section Title

`Selected Brands`

### Layout

- horizontal strip of brand logos
- monochrome logos by default
- full color or stronger contrast on hover
- CTA: `View All Brands`

### Visual Rules

- can use a darker background section
- logos should not feel like placeholders
- use generous spacing
- avoid visual clutter

---

## 3.11 Responsible Purchase / Expert Support Section

### Purpose

Differentiate the site from a basic webshop.

### Section Title

`Shop Informed and Responsibly`

### Cards

#### 1. Availability Before Purchase

`Stock and purchase options are confirmed before delivery or pickup.`

#### 2. Product Advice

`For optics, equipment, and accessories, users can contact the store before buying.`

#### 3. Regulated Products

`Certain products require legal conditions, age restrictions, or valid documentation.`

#### 4. Local Store Support

`Contact, pickup, and support are available through the store.`

---

## 3.12 Store Info / Contact Block

### Purpose

Increase local credibility and trust.

### Content

- store name
- address
- phone
- email
- map
- opening hours if available
- CTA: `Contact the Store`
- CTA: `Get Directions`

### Desktop Layout

```text
Left: Store info card
Right: Map / store image / contact form preview
```

### Mobile Layout

- store info card first
- CTA buttons
- map below

---

## 3.13 Footer

### Purpose

The footer should feel like a serious final section, not a generic afterthought.

### Columns

#### Categories

- Weapons
- Ammunition
- Optics
- Equipment
- Apparel and Footwear

#### Shopping

- Purchase Terms
- Delivery
- Returns
- Payment
- Regulated Products

#### Support

- Contact
- About
- FAQ
- Check Availability

#### Contact

- address
- phone
- email
- opening hours

### Footer Legal Note

`Legal conditions apply for selected products. Website information is provided for offer overview, while availability and purchase conditions are confirmed with the store.`

---

# 4. Category Listing Page Layout

## 4.1 Category Page Objective

The category page should allow users to:

- understand the category quickly
- browse subcategories
- filter products efficiently
- compare products visually
- identify regulated products
- contact the store when needed

---

## 4.2 Category Page Structure

```text
Breadcrumb
Category Hero
Subcategory Pills
Listing Toolbar
Main Content
├── Desktop Filter Sidebar
└── Product Grid
Active Filter Chips
Pagination / Load More
Category SEO Content
Related Categories
Footer
```

---

## 4.3 Breadcrumb

### Example

```text
Home / Weapons / Long Weapons / Rifles
```

### UX Rules

- discreet visual style
- every segment should be clickable
- on mobile, use a shorter format such as `← Weapons`
- avoid taking too much vertical space

---

## 4.4 Category Hero

### Content

- H1 category name
- short description
- product count
- legal notice if category is regulated
- visual image or texture

### Example for “Long Weapons”

**Long Weapons**

`Browse long weapons from selected categories. Filter by type, brand, availability, and price range. For selected products, legal conditions and availability confirmation may apply.`

### Legal Notice

`Regulated products: purchase may require valid documentation and personal verification. Contact the store for availability and conditions.`

---

## 4.5 Subcategory Pills

### Purpose

Allow quick movement within the category.

### Example for Weapons

- Long Weapons
- Shotguns
- Rifles
- Modern Weapons
- Used Weapons
- Handguns
- Air Weapons
- Cleaning and Maintenance

### UX Rules

- desktop: horizontal layout or grid
- mobile: horizontal scroll
- active state must be clear
- avoid overly rounded pill styling
- use thin border and olive active state

---

## 4.6 Listing Toolbar

### Desktop Content

```text
[Product Count] [Search within Category] [Sort Dropdown] [Grid/List Toggle]
```

### Mobile Content

```text
[Filters Button] [Sort Dropdown] [Product Count]
```

### Sort Options

- Default
- Newest
- Price: Low to High
- Price: High to Low
- Sale
- Available First
- Brand A–Z

---

## 4.7 Desktop Filter Sidebar

### Position

- left side of product grid
- sticky on scroll
- width around 260–320px

### Filter Groups

1. Category
2. Brand
3. Price
4. Availability
5. Product Type
6. Use Case
7. Regulated Products
8. Sale / New

---

## 4.8 Brand Filter

### UX

- checkbox list
- search field if many brands exist
- product count per brand
- popular brands shown first

### Example

```text
Brand
[ ] Browning (12)
[ ] Beretta (8)
[ ] Winchester (5)
[ ] Leica (3)
```

---

## 4.9 Price Filter

### UX

- range slider
- manual min/max fields
- currency visible
- apply button if needed

### Example

```text
Price
Min: 100 €
Max: 1500 €
```

---

## 4.10 Availability Filter

### Options

- Available
- On Order
- Check Availability
- New
- Sale

### UX Rules

- availability filter must match product badges
- “Available” should be easy to recognize
- “Check Availability” should be clear and not confusing

---

## 4.11 Regulated Products Filter

### Options

- Show All
- Direct Purchase Items Only
- Inquiry / Contact Items Only
- Regulated Items

### Purpose

Give users more control over the type of shopping flow they are entering.

---

## 4.12 Mobile Filter Drawer

### Structure

```text
Header
- Filters
- Close Button
- Active Filter Count

Body
- Accordion Filter Groups

Sticky Footer
- Clear
- Show Results
```

### UX Rules

- full-screen drawer or bottom sheet
- lock background scroll
- clear close button
- sticky `Show Results` button
- active filter count visible
- selected filters must not reset accidentally

---

## 4.13 Active Filter Chips

### Example

```text
Browning ×
500–1500 € ×
Available ×
Rifles ×
Clear All
```

### UX Rules

- display above product grid
- horizontal scroll on mobile
- each chip removable
- `Clear All` always last

---

## 4.14 Product Grid

### Desktop

- 3 or 4 columns
- generous spacing
- large product images
- clear text hierarchy

### Tablet

- 2 columns

### Mobile

- 1 column for expensive or regulated products
- optionally 2 columns for apparel/accessories if layout remains readable

---

## 4.15 Category Product Card

### Card Content

1. Product image
2. Status badges
3. Brand
4. Product name
5. Short specification line
6. Price
7. CTA
8. Secondary action

### Example Structure

```text
[Image]

[Available] [New]
Browning
Browning X-Bolt Hunter Eclipse .308

Caliber: .308
Category: Rifles

1,290.00 €

[View Details]
[Send Inquiry]
```

### Card UX Rules

- entire card can be clickable
- CTA must be clear
- hover should be subtle
- image area should be consistent
- badges should not cover important product details
- regulated products must have a legal indicator

---

## 4.16 Empty State

### Text

`No products match the selected filters.`

### Actions

- `Clear Filters`
- `View All Products in This Category`
- `Contact the Store for Help`

### UX Rules

- do not leave the user with a dead end
- provide next steps
- keep tone helpful and calm

---

## 4.17 Category SEO Content

At the bottom of each category page, include a short content block.

### Purpose

- SEO
- context
- trust

### Rules

- keep it concise
- avoid aggressive marketing
- do not include instructions for weapon use
- focus on selection, availability, purchase conditions, and support

---

# 5. Product Detail Page Layout

## 5.1 Product Detail Page Objective

The product detail page must give users:

- a clear product image
- product name and brand
- price
- availability
- purchase or inquiry option
- legal context if needed
- useful specifications
- delivery/pickup information
- related products

For regulated products, the page must clearly communicate purchase conditions and prioritize contact/inquiry when necessary.

---

## 5.2 Product Detail Page Structure

```text
Breadcrumb
Product Main Section
├── Image Gallery
└── Buying Panel
Product Trust / Legal Notice
Product Tabs
Related Products
Recently Viewed
Footer
```

---

## 5.3 Product Main Section

### Desktop Layout

```text
-------------------------------------------------
| Product Gallery                 | Buying Panel |
|                                 |              |
| Main Image                      | Brand        |
| Thumbnails                      | Title        |
|                                 | Status       |
|                                 | Price        |
|                                 | CTA          |
|                                 | Legal Box    |
-------------------------------------------------
```

### Mobile Layout

```text
Breadcrumb
Gallery
Title
Price
Status
CTA
Legal Notice
Tabs / Accordions
Related Products
```

---

## 5.4 Product Image Gallery

### Requirements

- large main image
- thumbnail navigation
- zoom on hover for desktop
- full-screen gallery
- swipe support on mobile
- neutral image background
- consistent aspect ratio

### Visual Style

- off-white or light sand image background
- thin border
- no heavy shadows
- limited border radius

---

## 5.5 Buying Panel

### Content

- brand
- product title
- SKU
- status badge
- price block
- old price / sale price if applicable
- availability info
- quantity selector
- primary CTA
- secondary CTA
- legal notice
- delivery / pickup information

### CTA Logic

#### Regular Products

Primary:

- `Add to Cart`

Secondary:

- `Ask About Product`
- `Add to Compare`

#### Regulated Products

Primary:

- `Send Inquiry`
- `Check Availability`
- `Contact for Purchase`

Secondary:

- `Read Purchase Conditions`
- `Add to Compare`

Avoid:

- `Buy Now`
- `Order Immediately`
- aggressive urgency copy

---

## 5.6 Price Display

### Normal Price

```text
1,290.00 €
```

### Sale Price

```text
1,490.00 € → 1,290.00 €
Sale
```

### Cash Price / Special Note

If relevant:

`The price for cash or bank transfer payment may differ. Please check conditions with the store.`

### UX Rules

- price must be large and easy to read
- old price should be visually weaker
- sale price should not use loud neon red
- legal notes should be visible but not compete with the price

---

## 5.7 Product Legal Notice

### When It Appears

For:

- weapons
- ammunition
- potentially other regulated products

### Text

`Purchase of this product may require legal conditions, age restrictions, and valid documentation. Availability and purchase options must be confirmed with the store.`

### Visual Style

- sand background
- thin border
- small alert or shield icon
- readable text
- link: `Read Purchase Conditions`

---

## 5.8 Product Tabs

### Tabs

1. Description
2. Specifications
3. Delivery and Pickup
4. Conditions for Regulated Products
5. Reviews

### Mobile Behavior

On mobile, use accordions instead of horizontal tabs.

---

## 5.9 Product Specifications

### Example Fields for Weapons

- Brand
- Model
- Category
- Caliber
- Availability
- SKU
- Condition
- Note

### Example Fields for Optics

- Brand
- Type
- Magnification
- Mounting
- Use Case
- SKU
- Availability

### Example Fields for Apparel

- Brand
- Size
- Color
- Material
- Season
- Availability

---

## 5.10 Related Products

### Sections

- Similar Products
- Compatible Equipment
- Frequently Viewed Together
- From the Same Category

### UX Rules

- do not show random products
- related products should have a clear logic
- keep the section focused
- 4 products on desktop
- carousel on mobile

---

# 6. Navbar and Mega Menu Plan

## 6.1 Main Navbar

### Desktop

```text
Logo
Weapons
Ammunition
Optics and Equipment
Apparel and Footwear
Brands
Sale
Contact
Search
Account
Cart
```

### Mobile

```text
Hamburger
Logo
Search
Cart
```

---

## 6.2 Mega Menu — Weapons

### Column 1: Long Weapons

- Shotguns
- Rifles
- Modern Weapons
- Used Weapons

### Column 2: Short and Air Weapons

- Handguns
- Gas Weapons
- Air Weapons

### Column 3: Maintenance and Protection

- Cleaning and Maintenance
- Holsters and Cases

### Column 4: Info Panel

Title:

`Regulated Products`

Text:

`Legal purchase conditions, age restrictions, and documentation may apply for selected items.`

CTA:

- `Purchase Conditions`
- `Contact the Store`

---

## 6.3 Mega Menu — Ammunition

### Columns

- Shotgun Ammunition
- Small-Caliber Ammunition
- Rifle Ammunition
- Pellets
- Reloading

### Info Panel

Title:

`Availability Confirmation`

Text:

`Availability and purchase conditions for ammunition are confirmed with the store.`

CTA:

- `View Ammunition`
- `Contact for Availability`

---

## 6.4 Mega Menu — Optics and Equipment

### Column 1: Optics

- Red Dot Sights
- Day Optics
- Night and Thermal Devices
- Rails and Rings

### Column 2: Hunting Equipment

- Hunting Equipment
- Flashlights
- Knives
- Backpacks and Bags

### Column 3: Popular

- New Arrivals
- Sale
- Recommended Equipment

### Column 4: Featured Block

- optics/equipment image
- short text
- CTA: `Explore Equipment`

---

## 6.5 Mega Menu Visual Style

### Must Include

- clear columns
- group headings
- good spacing
- subtle hover states
- info/legal panel
- refined border
- serious typography

### Must Avoid

- too many animations
- oversized icons
- neon colors
- AI gradients
- generic dropdown look
- cluttered link lists without hierarchy

---

# 7. Mobile Menu Plan

## 7.1 Mobile Menu Objective

The mobile menu must be:

- fast
- search-first
- structured
- easy to navigate
- better than a basic hamburger list

---

## 7.2 Mobile Header

### Elements

```text
[Hamburger] [Logo] [Search] [Cart]
```

### Rules

- sticky top
- visible cart badge
- search immediately available
- hamburger tap target at least 44px
- clean spacing

---

## 7.3 Mobile Drawer

### First Drawer Screen

```text
Search Input
Quick Links
Category List
Legal Notice
Contact Info
```

### Quick Links

- New Arrivals
- Sale
- Weapons
- Ammunition
- Optics
- Apparel and Footwear
- Contact

---

## 7.4 Drill-Down Navigation

Instead of showing all categories at once, use drill-down navigation.

### Example

User taps:

`Weapons`

Second panel opens:

```text
← Back
Weapons
Long Weapons
Handguns
Gas Weapons
Air Weapons
Cleaning and Maintenance
Holsters and Cases
```

User taps:

`Long Weapons`

Third panel opens:

```text
← Back
Long Weapons
Shotguns
Rifles
Modern Weapons
Used Weapons
```

---

## 7.5 Mobile Legal Notice

Inside the drawer, include a discreet info block:

`Legal conditions apply for regulated products. Before ordering, check availability and required documentation.`

CTA:

`Purchase Conditions`

---

## 7.6 Mobile Contact Area

At the bottom of the drawer:

- phone
- email
- location
- contact link
- purchase terms link

---

## 7.7 Mobile Interaction Rules

- drawer locks background scroll
- close button always visible
- back button clear
- smooth slide animation
- ESC closes on desktop/tablet
- overlay closes drawer
- avoid too many nested accordions
- prioritize readability

---

# 8. Filter UX

## 8.1 Filter UX Objective

Filters must help users narrow down products without frustration.

They are especially important for:

- brand
- price
- availability
- category
- regulated products
- product type

---

## 8.2 Desktop Filter Sidebar

### Position

- left of product grid
- sticky on scroll
- width around 260–320px

### Sections

1. Category
2. Brand
3. Price
4. Availability
5. Product Type
6. Use Case
7. Regulated Products
8. Sale / New

---

## 8.3 Brand Filter

### UX

- checkbox list
- search field if many brands exist
- product count per brand
- popular brands shown first

### Example

```text
Brand
[ ] Browning (12)
[ ] Beretta (8)
[ ] Winchester (5)
[ ] Leica (3)
```

---

## 8.4 Price Filter

### UX

- range slider
- manual min/max fields
- currency visible
- apply button if needed

### Example

```text
Price
Min: 100 €
Max: 1500 €
```

---

## 8.5 Availability Filter

### Options

- Available
- On Order
- Check Availability
- New
- Sale

### UX Rules

- availability options must match product badges
- available products should be easy to identify
- “Check Availability” should be clear, not confusing

---

## 8.6 Regulated Products Filter

### Options

- Show All
- Direct Purchase Items Only
- Inquiry / Contact Items Only
- Regulated Items

### Purpose

Give users control over the type of purchase flow they want to browse.

---

## 8.7 Mobile Filter Drawer

### Structure

```text
Header
- Filters
- Close Button
- Active Filter Count

Body
- Accordion Filter Groups

Sticky Footer
- Clear
- Show Results
```

### UX Rules

- full-screen drawer or bottom sheet
- background scroll locked
- clear close button
- sticky `Show Results` button
- active filter count visible
- selected filters must persist after closing drawer

---

## 8.8 Active Filter Chips

### Example

```text
Browning ×
500–1500 € ×
Available ×
Rifles ×
Clear All
```

### UX Rules

- shown above product grid
- horizontal scroll on mobile
- each chip removable
- `Clear All` always last

---

## 8.9 Loading State

When filters change:

- product grid shows skeleton loading
- filter sidebar remains stable
- page should not jump unnecessarily
- result count updates clearly

---

## 8.10 No Results State

### Text

`No products match the selected filters.`

### Actions

- `Clear Filters`
- `Return to Category`
- `Contact the Store`

---

# 9. Cart UX

## 9.1 Cart UX Objective

The cart must be:

- fast
- clear
- readable
- responsible
- mobile-friendly
- aware of regulated product states

---

## 9.2 Cart Drawer

### Opens When

- user adds a product to cart
- user clicks the cart icon

### Layout

```text
Header
- Cart
- Close

Items
- Product Image
- Name
- Price
- Quantity
- Remove

Summary
- Subtotal
- Delivery Note
- Legal Note if needed

Footer
- Continue Shopping
- View Cart
- Checkout / Continue to Conditions
```

---

## 9.3 Cart Item

### Content

- image
- name
- brand
- variant if applicable
- price
- quantity controls
- remove button
- status note

### For Regulated Items

Add badge:

`Regulated Item`

Add text:

`Purchase may require confirmation of conditions and availability.`

---

## 9.4 Cart Drawer CTA Logic

If cart contains only regular products:

- `Checkout`

If cart contains regulated products:

- `Continue to Conditions`
- or `Send Inquiry to Store`

Exact behavior depends on final business rules.

---

## 9.5 Cart Page

### Content

- H1: Cart
- product list
- quantity controls
- subtotal
- shipping estimate
- legal notice
- recommended accessories
- CTA toward checkout

### Desktop Layout

```text
Left: Cart Items
Right: Sticky Cart Summary
```

### Mobile Layout

```text
Cart Items
Summary
Sticky Bottom CTA
```

---

## 9.6 Empty Cart State

### Text

`Your cart is empty.`

### Supporting Text

`Explore equipment, apparel, footwear, optics, or field accessories.`

### CTA

- `New Arrivals`
- `Hunting Equipment`
- `Contact for Advice`

---

# 10. Checkout Mockup UX

## 10.1 Checkout Objective

Checkout should be simple, clear, and responsible.

It must clearly communicate conditions for regulated products.

---

## 10.2 Checkout Steps

```text
1. Order Review
2. Customer Information
3. Delivery / Pickup
4. Payment
5. Confirmations and Conditions
6. Completion
```

---

## 10.3 Checkout Layout

### Desktop

```text
Left:
- Checkout Form
- Stepper
- Fields

Right:
- Sticky Order Summary
- Legal Notice
```

### Mobile

```text
Collapsed Order Summary
Stepper
Form Sections
Legal Confirmations
Sticky CTA
```

---

## 10.4 Stepper

### Steps

1. Information
2. Delivery
3. Payment
4. Confirmation

### UX Rules

- show current step
- allow returning to previous steps
- avoid unnecessary animations
- form should feel linear and clear

---

## 10.5 Customer Form

### Fields

- First Name
- Last Name
- Email
- Phone
- Address
- City
- Postal Code
- Country
- Company optional
- Tax ID optional

### UX Rules

- labels must always be visible
- placeholders are not replacements for labels
- validation must be clear
- error messages should be human and helpful

---

## 10.6 Delivery / Pickup

### Options

1. Delivery
2. Personal Pickup
3. Arrangement with Store for Regulated Items

### UX Text

`For selected products, delivery or pickup may depend on legal conditions and store confirmation.`

---

## 10.7 Payment

### Options

- Cash on delivery
- Bank transfer
- Card payment if supported
- Arrangement with store for regulated items

### UX Rules

- explain each option clearly
- do not promise options that are not implemented
- display additional note if regulated products exist in the order

---

## 10.8 Legal Confirmations

### Required Checkboxes

- `I accept the purchase terms and privacy policy.`
- `I confirm that the entered information is correct.`
- `I understand that product availability is confirmed before delivery or pickup.`

### For Regulated Products

- `I understand that selected products may require legal conditions, age restrictions, and valid documentation.`
- `I understand that ordering a regulated product is not an automatic confirmation of purchase.`

---

## 10.9 Order Summary

### Content

- products
- quantity
- price
- subtotal
- delivery
- total
- regulated product notice if relevant

### UX Rules

- sticky on desktop
- collapsible on mobile
- regulated products clearly marked
- price must be readable

---

## 10.10 Confirmation Page

### Content

- order number
- summary
- next steps
- contact information
- legal note if regulated product exists

### Example Text

`Thank you for your order. The store will check product availability and contact you with confirmation. For products subject to legal conditions, additional steps may be required before the purchase is completed.`

---

# 11. Visual Design System

## 11.1 Brand Personality

The website should feel:

- professional
- stable
- calm
- natural
- rugged
- premium
- responsible
- locally credible

---

## 11.2 Visual Associations

### Good Associations

- nature
- field use
- wood
- metal
- leather
- outdoor equipment
- serious catalog
- specialized store

### Bad Associations

- gaming
- neon
- aggressive military design
- cheap tactical look
- dropshipping
- AI SaaS template
- crypto/web3 styling

---

## 11.3 Color Palette

| Token          |     Color | Purpose                |
| -------------- | --------: | ---------------------- |
| Warm Off White | `#F4F1EA` | main background        |
| Soft Sand      | `#D8C7A3` | secondary background   |
| Deep Charcoal  | `#171A16` | text, footer, contrast |
| Muted Olive    | `#556145` | primary accent         |
| Dark Olive     | `#2F382A` | primary CTA            |
| Brass          | `#A98245` | premium accent         |
| Soft Gray      | `#D8D6CE` | borders                |
| Muted Rust     | `#9B5D3A` | sale / warning accent  |

---

## 11.4 Color Usage

### Background

- main background: warm off-white
- secondary sections: sand or very light olive tint
- footer: deep charcoal
- info cards: soft sand

### Text

- main text: deep charcoal
- secondary text: muted charcoal/gray
- text on dark background: off-white

### Buttons

Primary:

- dark olive background
- off-white text

Secondary:

- transparent background
- charcoal border
- charcoal text

Accent:

- brass border or underline
- use sparingly

---

## 11.5 Typography

### Heading Font Direction

Headings should feel:

- editorial
- premium
- serious
- slightly traditional

Recommended directions:

- Cormorant Garamond
- Libre Baskerville
- Fraunces
- Playfair Display

### Body Font Direction

Body/UI typography should feel:

- clean
- readable
- modern

Recommended directions:

- Inter
- Manrope
- Geist
- IBM Plex Sans

---

## 11.6 Type Scale

### Desktop

- H1: 56–72px
- H2: 36–48px
- H3: 24–32px
- Body: 16–18px
- Small: 13–14px
- Product title: 16–18px
- Price: 20–28px

### Mobile

- H1: 36–44px
- H2: 28–34px
- H3: 22–26px
- Body: 16px
- Small: 13px
- Price: 20–24px

---

## 11.7 Spacing System

### Sections

- desktop section padding: 72–120px
- tablet section padding: 56–80px
- mobile section padding: 40–64px

### Container

- max width: 1200–1440px
- desktop horizontal padding: 32px
- tablet horizontal padding: 24px
- mobile horizontal padding: 16px

### Grid Gap

- product grid: 24–32px
- category cards: 24px
- mobile gap: 16px

---

## 11.8 Border Radius

Use less rounding than typical modern templates.

### Rules

- product cards: 6–8px
- buttons: 4–6px
- input fields: 4–6px
- large sections/cards: 8–12px max
- avoid excessive `rounded-2xl` and `rounded-3xl`

---

## 11.9 Shadows

Use shadows minimally.

### Rules

- default cards: no shadow or very subtle shadow
- hover: subtle shadow
- drawer/modal: stronger shadow allowed
- product images: avoid heavy shadows

---

## 11.10 Buttons

### Primary Button

Purpose:

- main CTA
- checkout
- category CTA

Style:

- dark olive
- off-white text
- small radius
- subtle hover darkening
- no loud animations

### Secondary Button

Purpose:

- inquiry
- details
- secondary actions

Style:

- transparent
- border
- charcoal text
- sand background on hover

### Text Button

Purpose:

- smaller actions
- read more
- remove
- view all

Style:

- underline on hover
- brass/olive accent

---

## 11.11 Badge System

### Badge Types

- Available
- New
- Sale
- On Order
- Check Availability
- Regulated Item

### Style

- small
- optional uppercase
- muted color
- no neon tones
- 4px radius
- consistent placement

---

## 11.12 Icon System

Use Lucide icons.

### Icons

- Search
- ShoppingBag
- User
- Menu
- Filter
- Shield
- Truck
- MapPin
- Phone
- Mail
- AlertTriangle
- ChevronDown
- X

### Rules

- stroke 1.5–2
- do not overuse icons
- icons must serve UX
- avoid decorative icons without purpose

---

## 11.13 Motion System

### Allowed Animations

- menu fade/slide
- drawer slide
- accordion expand
- card hover image scale
- button hover
- skeleton loading
- gallery transition

### Avoid

- bounce animations
- flashy parallax
- moving gradients
- too many scroll reveals
- animations that slow down shopping

---

# 12. Copywriting Direction

## 12.1 Tone of Voice

Copy should be:

- professional
- calm
- responsible
- clear
- Croatian/local-market credible
- not exaggerated
- not aggressive

---

## 12.2 What to Avoid

Avoid phrases such as:

- `Most powerful weapon`
- `Dominate the field`
- `Destroy the competition`
- `Tactical superiority`
- `Buy now before it disappears`
- `Crazy deal`
- `Ultimate weapon store`
- `Experience the future`

---

## 12.3 Recommended Copy Direction

### Hero

`Reliable equipment for hunting, sport, and the field.`

### Supporting Text

`Selected products, clear information, and responsible shopping — for customers who value quality, safety, and expert support.`

### Category CTA

- `Explore Category`
- `View Offer`
- `Check Availability`

### Product CTA

For regular products:

- `Add to Cart`
- `View Details`

For regulated products:

- `Send Inquiry`
- `Check Availability`
- `Contact for Purchase`

---

## 12.4 Legal Copy

### Short Version

`Legal purchase conditions apply for selected products. Availability and purchase options must be confirmed with the store.`

### Longer Version

`The purchase of selected products may require legal eligibility, age verification, valid documentation, and additional confirmation. Website information is provided for offer overview, while availability and purchase conditions are confirmed in communication with the store.`

---

## 12.5 Trust Copy

Examples:

- `Shop Informed`
- `Availability Confirmed Before Delivery`
- `Expert Support Before Purchase`
- `Responsible Sale of Regulated Products`
- `Clear Purchase and Pickup Conditions`

---

# 13. Component Architecture

## 13.1 Page Components

```text
HomePage
CategoryPage
ProductDetailPage
CartPage
CheckoutPage
AboutPage
ContactPage
LegalPage
BrandsPage
SearchResultsPage
```

---

## 13.2 Layout Components

```text
SiteHeader
TopUtilityBar
DesktopNav
MegaMenu
MobileNavDrawer
SearchOverlay
CartDrawer
SiteFooter
Breadcrumbs
Container
SectionHeader
```

---

## 13.3 Ecommerce Components

```text
ProductCard
ProductGrid
ProductImageGallery
ProductPrice
ProductBadges
ProductStatus
ProductSpecs
RelatedProducts
CategoryCard
CategoryGrid
BrandStrip
FeaturedProducts
AmmoSection
RecentlyViewed
CompareProducts
```

---

## 13.4 Filter Components

```text
FilterSidebar
FilterDrawer
FilterAccordion
PriceRangeFilter
BrandFilter
AvailabilityFilter
RegulatedProductFilter
ActiveFilterChips
SortDropdown
ProductListingToolbar
```

---

## 13.5 Cart / Checkout Components

```text
CartLineItem
CartSummary
CartDrawerFooter
CheckoutStepper
CheckoutCustomerForm
CheckoutShippingForm
CheckoutPaymentOptions
LegalAcknowledgementBox
OrderSummary
ConfirmationPanel
```

---

## 13.6 Trust / Compliance Components

```text
LegalNoticeCard
AgeNotice
PermitNotice
AvailabilityDisclaimer
ResponsiblePurchaseBanner
ContactBeforePurchaseCTA
TrustCard
StoreInfoCard
```

---

## 13.7 UI Primitives

Use shadcn/ui for:

```text
Button
Dialog
Sheet
Accordion
DropdownMenu
Tabs
Input
Checkbox
Select
Badge
Separator
Tooltip
Card
```

Important:

Default shadcn/ui styling must be restyled.

The website must not look like a standard shadcn template.

---

# 14. What Must Look Less Generic

## 14.1 Logo

The logo must not be plain text without character.

It should include:

- serious wordmark typography
- small mark or monogram
- outdoor/premium feel
- no aggressive tactical symbol

---

## 14.2 Hero

The hero must not use:

- generic gradients
- floating cards
- AI-generated “premium” look
- overly rounded cards
- unclear CTA

The hero must include:

- strong editorial layout
- natural visual direction
- serious headline
- good spacing
- clear business category
- responsible purchase tone

---

## 14.3 Product Cards

Product cards must not look like default WooCommerce cards.

They need:

- larger image area
- better price block
- clear status badges
- brand metadata
- less visual noise
- better CTA buttons
- consistent image ratio

---

## 14.4 Mega Menu

The mega menu must not be just a dropdown list.

It should feel like a serious catalog:

- columns
- groups
- info panel
- subcategories
- legal notice
- elegant hover states

---

## 14.5 Footer

The footer must not be a generic dark block.

It should include:

- clear categories
- contact information
- purchase terms
- legal note
- local credibility
- good spacing
- serious contrast

---

## 14.6 Trust Section

Avoid generic trust copy such as:

- `Free Shipping`
- `Secure Payment`
- `Best Quality`

Use relevant trust copy such as:

- `Availability Confirmation`
- `Responsible Purchase`
- `Expert Support`
- `Personal Pickup`
- `Clear Conditions for Regulated Items`

---

## 14.7 Legal Notices

Legal notices must not look like ugly warnings.

They should be:

- elegant
- clear
- discreet but visible
- aligned with the premium visual style
- linked to purchase conditions

---

## 14.8 Filters

Filters must not be a basic unstyled sidebar.

They should include:

- good spacing
- clear accordion groups
- active states
- filter chips
- mobile drawer
- sticky apply button

---

## 14.9 Cart

The cart must not be a basic popup.

It needs:

- product images
- clear price
- quantity controls
- legal state
- checkout CTA
- responsive behavior

---

## 14.10 Checkout

Checkout must not look like a plain form.

It should include:

- stepper
- order summary
- legal confirmations
- clear delivery/payment flow
- mobile-first approach
- trust elements

---

# 15. Antigravity Implementation Phases

## Phase 1 — Foundation and Design System

### Goal

Establish the visual and technical foundation.

### Implement

- Next.js 16 setup
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Motion
- Lucide icons
- base route structure
- design tokens
- color palette
- typography scale
- spacing scale
- button variants
- badge variants
- card variants
- layout container
- mock data structure

### Pay Special Attention To

- do not use default shadcn styling
- do not use generic gradient backgrounds
- define smaller border radius early
- establish premium spacing from the start

### Output

- design system preview
- UI primitives
- mock product data
- base layout

---

## Phase 2 — Header, Navigation, and Mobile Menu

### Goal

Build navigation as the most important ecommerce UX element.

### Implement

- TopUtilityBar
- SiteHeader
- DesktopNav
- MegaMenu
- SearchOverlay
- MobileNavDrawer
- CartIcon
- sticky behavior

### Pay Special Attention To

- mega menu must feel like a serious catalog
- mobile drawer must use drill-down navigation
- search must be easy to access
- legal info must be integrated into navigation

### Output

- production-level desktop navbar
- production-level mobile drawer
- responsive navigation behavior

---

## Phase 3 — Homepage

### Goal

Build the premium home page.

### Implement

- hero section
- trust strip
- category discovery grid
- featured products
- ammunition section
- brand strip
- expert/trust section
- store info block
- footer

### Pay Special Attention To

- hero must not look AI-generated
- product cards must look premium
- category cards must have character
- footer must strengthen trust

### Output

- complete home page
- responsive mobile home page
- polished visual hierarchy

---

## Phase 4 — Category Listing Page

### Goal

Build a serious ecommerce listing page.

### Implement

- breadcrumbs
- category hero
- subcategory pills
- listing toolbar
- desktop filter sidebar
- mobile filter drawer
- active filter chips
- product grid
- sort dropdown
- pagination/load more
- no-results state
- loading skeleton

### Pay Special Attention To

- filter UX
- mobile filters
- product grid spacing
- legal indicator for regulated products
- query params for filters

### Output

- reusable category page
- dynamic filter behavior
- responsive product listing

---

## Phase 5 — Product Detail Page

### Goal

Build a premium product detail page.

### Implement

- product image gallery
- buying panel
- product price
- status badges
- CTA logic
- legal notice
- product tabs
- specs table
- related products
- contact before purchase CTA

### Pay Special Attention To

- regulated products must have responsible UX
- CTA must not be aggressive
- price and availability must be clear
- product gallery must look premium

### Output

- product detail page for regular items
- product detail page for regulated items
- responsive product layout

---

## Phase 6 — Cart Drawer and Cart Page

### Goal

Build a clear cart flow.

### Implement

- CartDrawer
- CartLineItem
- CartSummary
- quantity controls
- remove item
- legal notice in cart
- CartPage
- EmptyCartState
- recommended products

### Pay Special Attention To

- regulated items must have a special cart state
- checkout CTA must depend on product type
- mobile cart must be clean and readable

### Output

- cart drawer
- cart page
- responsive cart UX

---

## Phase 7 — Checkout Mockup

### Goal

Create a checkout experience that feels realistic and responsible.

### Implement

- CheckoutStepper
- CustomerForm
- ShippingOptions
- PaymentOptions
- LegalAcknowledgementBox
- OrderSummary
- ConfirmationPage

### Pay Special Attention To

- legal checkboxes
- clear steps
- sticky summary on desktop
- collapsed summary on mobile
- no aggressive checkout pressure

### Output

- checkout mockup
- mobile checkout
- confirmation page

---

## Phase 8 — About, Contact, and Legal Pages

### Goal

Strengthen trust and complete informational pages.

### Implement

- AboutPage
- ContactPage
- LegalPage
- DeliveryReturnsPage
- ResponsiblePurchasePage
- PrivacyPage

### Pay Special Attention To

- do not create plain WordPress-like text pages
- use strong layout
- legal pages should have a table of contents
- contact page needs a strong store info block

### Output

- complete informational pages
- legal hub
- contact UX

---

## Phase 9 — Polish, QA, and Accessibility

### Goal

Turn the project into a production-level frontend.

### Check and Improve

- spacing consistency
- typography consistency
- color contrast
- focus states
- keyboard navigation
- mobile drawer behavior
- cart drawer behavior
- filter drawer behavior
- loading states
- empty states
- responsive bugs
- SEO metadata
- product structured data
- Playwright tests
- performance optimization

### Pay Special Attention To

- remove every generic visual pattern
- avoid default shadcn appearance
- avoid excessive rounded design
- avoid AI gradient aesthetics
- ensure mobile UX is as strong as desktop UX

### Output

- polished final frontend
- QA checklist
- accessibility pass
- responsive pass

---

# 16. Final Quality Checklist

## 16.1 UX Checklist

- [ ] Navigation is clear
- [ ] Mega menu is organized
- [ ] Mobile drawer uses drill-down navigation
- [ ] Search is easy to access
- [ ] Categories are understandable
- [ ] Filters are intuitive
- [ ] Active filter chips exist
- [ ] Product cards are readable
- [ ] Product detail page is clear
- [ ] Cart drawer is fast
- [ ] Checkout is logical
- [ ] Empty states exist
- [ ] Loading states exist

---

## 16.2 UI Checklist

- [ ] Website looks premium
- [ ] No generic AI gradients
- [ ] No default template look
- [ ] Product cards look improved
- [ ] Footer looks serious
- [ ] Navbar looks professional
- [ ] Border radius is controlled
- [ ] Spacing is consistent
- [ ] Typography is strong
- [ ] Colors are natural and grounded

---

## 16.3 Compliance Checklist

- [ ] Legal notice exists in relevant places
- [ ] Regulated product badge exists
- [ ] Product detail page has regulated item conditions
- [ ] Cart clearly displays regulated items
- [ ] Checkout has legal checkboxes
- [ ] No aggressive copywriting
- [ ] No instructions on weapon use
- [ ] No “buy now” pressure for regulated products
- [ ] Availability is not presented as guaranteed if it requires confirmation

---

## 16.4 Mobile Checklist

- [ ] Header is sticky
- [ ] Hamburger works
- [ ] Search works
- [ ] Cart badge is visible
- [ ] Mobile drawer is readable
- [ ] Drill-down navigation works
- [ ] Filter drawer works
- [ ] Sticky filter CTA exists
- [ ] Product cards are readable
- [ ] Checkout is easy to complete on mobile

---

# 17. Final Creative Direction

This redesign should look like a serious Croatian premium ecommerce shop for hunting, sport shooting, field use, and outdoor equipment.

The main emotional direction is not aggression. The site should communicate:

- trust
- expertise
- safety
- clarity
- responsibility
- quality
- premium presentation

The areas that must be visibly improved compared to a generic ecommerce design are:

1. Navbar
2. Mega menu
3. Mobile menu
4. Hero section
5. Category discovery
6. Product cards
7. Filter UX
8. Product detail page
9. Cart drawer
10. Checkout UX
11. Legal/compliance UX
12. Footer

If implemented properly, the final result should feel like a real production ecommerce project, not a generated frontend demo.

---

# 18. Final Antigravity Prompt

Use this prompt inside Antigravity after adding this document to the project:

```text
You are a senior ecommerce UX/UI designer, frontend architect, and Next.js engineer.

Use the document `Pointershop Inspired Premium Ecommerce Redesign — Final UX/UI Plan` as the source of truth.

Build a premium, responsive ecommerce redesign inspired by pointershop.net, but do not clone it 1:1.

The final website should feel like a serious Croatian premium outdoor, hunting, sport shooting, optics, apparel, footwear, and equipment webshop.

Important design direction:
- natural, grounded, premium
- warm off-white background
- deep charcoal typography
- muted olive and brass accents
- less border radius
- less generic
- less AI-generated
- no neon tactical look
- no default shadcn look
- no generic SaaS gradients
- no aggressive weapon marketing

Technical stack:
- Next.js 16
- React
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Motion
- Lucide icons

Build in phases:
1. Foundation and design system
2. Header, mega menu, and mobile drawer
3. Homepage
4. Category listing page
5. Product detail page
6. Cart drawer and cart page
7. Checkout mockup
8. About, contact, and legal pages
9. Polish, QA, accessibility, and responsiveness

Special compliance requirements:
- Include age/legal responsibility notices where relevant
- Include permit/license notice for regulated products
- Include availability disclaimer
- Include contact-before-purchase CTA for regulated products
- Do not use aggressive copywriting
- Do not include weapon usage instructions
- Avoid “buy now” pressure for regulated products

The final result must look like a serious production ecommerce redesign, not a generated template.
```

# UX/UI Plan

## 1. Sitemap

- /
- /kategorija/[slug]
- /proizvod/[slug]
- /kosarica
- /naplata
- /o-nama
- /kontakt
- /uvjeti-kupnje
- /pravila-privatnosti

## 2. Global Layout

The site uses a premium ecommerce structure:

1. Top trust/legal bar
2. Main header
3. Desktop mega menu
4. Mobile drawer navigation
5. Main content
6. Footer

The layout must be mobile-first and scale upward.

## 3. Header UX

### Desktop Header

- Logo left
- Main categories centered or left-aligned
- Search prominent
- Account icon
- Cart icon with item count
- Contact/help CTA
- Sticky but not visually heavy

### Desktop Mega Menu

Mega menu should open for main categories:

- Oružje
- Streljivo
- Odjeća
- Obuća
- Oprema

Each mega menu contains:

- category columns
- featured category card
- short description
- subtle legal notice where relevant
- “Pogledaj sve” link

### Mobile Header

- Logo
- Search icon or search field
- Cart icon
- Menu button

### Mobile Drawer

- Search at top
- Accordion categories
- Account/cart/contact links
- Legal notice link
- Store phone/email
- CTA: Kontaktiraj trgovinu

## 4. Homepage UX

### Hero

Goal: establish trust and premium ecommerce identity immediately.

Hero includes:

- strong headline
- short benefit copy
- primary CTA: Istraži ponudu
- secondary CTA: Kontaktiraj trgovinu
- category quick links
- trust chips
- visual composition of products/categories

Avoid generic gradient hero.

### Category Discovery

Grid of major categories:

- Oružje
- Streljivo
- Optike
- Odjeća
- Obuća
- Oprema

Each card:

- title
- short description
- product count mock
- CTA
- subtle image/illustration placeholder

### Novo u ponudi

Horizontal or responsive product grid using ProductCard.

### Optike Highlight

Editorial split layout:

- text block
- highlighted product cards
- CTA

### Novo streljivo / Regulated Products

Use careful legal/responsible purchase notice.

### Brand Strip

Refined brand grid, not noisy.

### Expert Help CTA

A section that says the store can help choose the right product.

### Trust Section

- Sigurna kupovina
- Provjerena oprema
- Stručna podrška
- Preuzimanje / dostava info
- Legal purchase guidance

## 5. Category Listing UX

Category page structure:

1. Breadcrumb
2. Category header
3. Description
4. Legal notice if regulated
5. Toolbar:
   - result count
   - sort
   - mobile filter button
6. Desktop sidebar filters
7. Product grid
8. Pagination

### Desktop Filters

- Price
- Brand
- Availability
- Status
- Category/subcategory

### Mobile Filters

- Drawer
- sticky apply button
- clear filters
- visible selected filter count

## 6. Product Card UX

ProductCard states:

- Normal
- New
- Sale
- In Stock
- Po narudžbi
- Nema na zalihi
- Regulated item

ProductCard fields:

- image
- category
- brand
- name
- price
- old price
- sale percentage
- availability
- small legal marker
- primary CTA
- quick view / details CTA

Rules:

- Price must be visually clear.
- Product name must be readable.
- Badges must be refined.
- Image area must be clean.
- Card hover must be subtle.

## 7. Product Detail UX

Product page structure:

1. Breadcrumb
2. Product gallery
3. Product info panel
4. Price and availability
5. Legal notice
6. CTA area
7. Specs
8. Delivery/pickup/payment info
9. FAQ
10. Related products

For regulated products:

- CTA can be “Pošalji upit” or “Provjeri dostupnost”
- show legal notice prominently
- do not overpromise web checkout

## 8. Cart UX

Cart drawer:

- slides from right
- product rows
- quantity controls
- subtotal
- notice for regulated items
- checkout button
- continue shopping

## 9. Checkout UX

Checkout mockup:

- contact info
- delivery/pickup
- payment placeholder
- order summary
- legal checkbox
- terms checkbox

## 10. Contact UX

Contact page:

- store info card
- phone/email
- working hours
- contact form
- map placeholder
- support CTA
- legal purchase note

## 11. Footer UX

Footer columns:

- Kategorije
- Korisnička podrška
- Informacije
- Kontakt
- Newsletter

Footer should feel complete, serious, and trustworthy.

## 12. Design Anti-Generic Rules

Avoid:

- same cards everywhere
- identical section spacing
- huge random gradients
- fake badges
- empty marketing text
- boring centered layout for every section
- overuse of rounded-2xl
- too many icons

Use:

- varied section rhythm
- editorial layout
- natural asymmetry
- real ecommerce hierarchy
- strong typography
- calm color palette
- meaningful CTAs

# CarSettlements Landing Page - Design Guidelines

## Design Approach

**Reference-Based Approach:** Drawing from high-converting financial services landing pages with emphasis on trust and urgency. Primary inspiration from National Debt Relief's proven conversion patterns, combined with modern fintech aesthetics (Stripe's clarity + Credit Karma's approachability).

**Core Principle:** Balance professional credibility with emotional urgency—visitors are in financial stress and need immediate trust signals while maintaining compliance-safe, non-aggressive tone.

## Typography System

**Font Families:**
- Headlines: Inter (700, 800 weights) - crisp, modern, professional
- Body/UI: Inter (400, 500, 600 weights) - excellent readability across devices
- Use single font family for consistency and performance

**Hierarchy:**
- Hero Headline: text-4xl md:text-5xl lg:text-6xl, font-bold, tight leading (leading-tight)
- Section Headlines: text-3xl md:text-4xl, font-bold
- Subheadlines: text-xl md:text-2xl, font-semibold
- Body Large: text-lg, font-normal (for key benefits)
- Body Standard: text-base, font-normal
- Small/Legal: text-sm, font-normal (disclaimers)
- Micro/Labels: text-xs, uppercase tracking-wide for form labels

## Layout & Spacing System

**Tailwind Spacing Units:** Consistent use of 4, 6, 8, 12, 16, 20, 24, 32 for padding/margins
- Mobile sections: py-12 px-4
- Desktop sections: py-20 md:py-24 px-6 lg:px-8
- Component spacing: gap-6 md:gap-8 for grids
- Form field spacing: space-y-4 within forms

**Container Strategy:**
- Max-width: max-w-7xl mx-auto for main content
- Form containers: max-w-2xl mx-auto for focus
- Full-width sections with inner containers for visual variety

## Component Design

**Buttons:**
- Primary CTA: Large (px-8 py-4), font-semibold, rounded-lg, with subtle shadow and transform hover
- Secondary: Medium (px-6 py-3), outlined style
- Text links: Underline on hover, font-medium

**Cards:**
- Testimonial/Story Cards: Rounded corners (rounded-xl), subtle shadow (shadow-lg), padding p-6 md:p-8
- Feature Cards: Clean borders or soft shadows, hover lift effect (translate-y-1)
- Form Steps: Progressive disclosure with clear visual separation between steps

**Form Inputs:**
- Height: h-12 for standard inputs
- Border: border-2 with focus ring (ring-2 ring-offset-2)
- Rounded: rounded-lg
- Dropdown/Select: Custom styled to match input aesthetic
- Slider: Custom track styling with clear value display

**Trust Badges:**
- Review stars: Inline SVG with filled/half states
- Lender logos: Grayscale with opacity-70, arranged in grid (grid-cols-3 md:grid-cols-5)
- Security icons: Small, positioned near sensitive inputs

**Progress Indicators:**
- Step counter: Numbered circles (current state highlighted)
- Visual bar: Width-based progress with smooth transitions

## Interactive Elements

**AI Chat Widget:**
- Floating button: Fixed bottom-right with subtle pulse animation
- Chat overlay: Slide-up animation, rounded-t-2xl on mobile, rounded-xl on desktop
- Message bubbles: Distinct styling for bot vs user messages
- Quick reply chips: Pill-shaped buttons (rounded-full) with hover states

**Calculator/Estimator:**
- Real-time updating numbers with smooth fade transitions
- Range display: Visual bars or highlighted text
- Clear "Estimates only" disclaimers in lighter text

**Sticky Elements:**
- Mobile CTA bar: Fixed bottom with shadow-2xl, slide-up animation on scroll
- Top bar: Can be sticky (sticky top-0) with backdrop-blur effect

## Visual Hierarchy & Sections

**Hero Section:**
- Full viewport height on desktop (min-h-screen), natural height on mobile
- Two-column layout on desktop: Left (headline + CTA), Right (story card/form preview)
- Background: Subtle gradient or texture, NO large hero image (keeps focus on message and form)
- Story card: Elevated with shadow-xl, clear data visualization

**Epiphany Section:**
- Centered content with SVG chart as focal point
- Chart: Simple line graph showing car value decline vs loan balance (use contrasting strokes)
- Bullet points with large checkmarks or icons

**Form Sections:**
- Center-aligned, generous whitespace around form
- Step 1: Maximum 3 fields visible, large touch targets
- Step 2: Multi-column on desktop (grid-cols-2), single column mobile
- Clear field labels above inputs, helper text below when needed

**How It Works:**
- Horizontal step layout on desktop (4 columns)
- Vertical stack on mobile with connecting lines
- Icons: Large (64px), simple SVG illustrations
- Numbers: Circle badges with bold numerals

**Testimonials:**
- 3-column grid on desktop, stack on mobile
- Avatar placeholders: Circular (rounded-full), 64px diameter
- Quote marks: Subtle SVG decoration
- Labels: "Representative example" in small, muted text below each

**FAQ:**
- Accordion pattern with expand/collapse (chevron indicators)
- Alternating slight background on items for readability
- Clear bilingual toggle affecting all answers simultaneously

**Footer:**
- Multi-column grid on desktop (4 columns: brand, links, contact, legal)
- Stack on mobile with logical grouping
- Muted background distinct from body
- Legal text: text-xs with adequate line-height for readability

## Bilingual Toggle

- Fixed top-right or within top bar
- Button group style (EN | ES) with active state clearly indicated
- Smooth content swap (no page reload flash)
- Flag icons optional, text labels primary

## Responsive Breakpoints

- Mobile-first design
- sm: 640px (minor adjustments)
- md: 768px (layout shifts to multi-column)
- lg: 1024px (full desktop experience)
- xl: 1280px (max content width reached)

## Animations (CSS Only)

- Use sparingly: Hover lifts, fade-ins on scroll (intersection observer)
- CTA pulse: Subtle scale animation on primary button
- Form transitions: Smooth step changes
- NO heavy animation libraries, native CSS transitions/animations only

## Accessibility Essentials

- Focus rings: Visible custom ring with offset
- ARIA labels on all interactive elements
- Keyboard navigation: Logical tab order
- Color contrast: Minimum WCAG AA compliance
- Screen reader text for icon-only buttons

## Images Strategy

**No Large Hero Image:** This landing page prioritizes immediate message clarity and form conversion over visual storytelling. The hero section uses background gradients/textures only.

**Image Usage:**
- Avatar placeholders: SVG-generated circular placeholders for testimonials
- Icons: All via inline SVG (security badges, feature icons, step indicators)
- Chart/Graph: Custom SVG for epiphany section visualization
- Lender logos: Placeholder text or simple SVG representations (compliance-safe, no actual logos without permission)
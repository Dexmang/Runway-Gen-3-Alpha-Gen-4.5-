# Google Stitch Technical Direction & Prompt Guide
## 2026 Aston Martin Vantage — DexBlue Private Sale Site

**Author:** Myles (Luxury Automotive Web Developer)
**Date:** 2026-03-28
**Tool:** Google Stitch (stitch.withgoogle.com) — AI-powered UI design, HTML/CSS output
**Generation Budget:** 350/month (Standard Mode), plan for ~15-20 generations across iterations

---

## 1. Screenshot Preparation Checklist

Stitch cannot pull from localhost. Before starting any generation, capture the following screenshots from `localhost:4321` to use as visual reference inputs. Use Chrome DevTools device toolbar set to **1440 x 900** (desktop) for all captures unless noted otherwise.

### Required Screenshots

| # | Page | Scroll Position | What to Capture | Filename Convention |
|---|------|----------------|-----------------|---------------------|
| 1 | Home (`/`) | Top (0%) | Full hero with video poster, nav overlay, title text, stats bar partially visible | `stitch_ref_hero.png` |
| 2 | Home (`/`) | ~25% | Stats bar + beginning of "The Experience" section with video background | `stitch_ref_stats_experience.png` |
| 3 | Home (`/`) | ~50% | Film carousel — all 8 cards visible with labels | `stitch_ref_film_carousel.png` |
| 4 | Home (`/`) | ~65% | Interior showcase section — video bg, feature cards, "Step Inside" heading | `stitch_ref_interior.png` |
| 5 | Home (`/`) | ~85% | Gallery preview grid — 6 photos in asymmetric layout + footer | `stitch_ref_gallery_preview.png` |
| 6 | Gallery (`/gallery`) | Top (0%) | Page hero + video section + beginning of photo grid with filter bar | `stitch_ref_gallery_page.png` |
| 7 | Gallery (`/gallery`) | ~50% | Photo grid mid-scroll showing masonry-style layout | `stitch_ref_gallery_grid.png` |
| 8 | Specs (`/specs`) | Top (0%) | Page hero + sidebar nav + first spec table (Overview) | `stitch_ref_specs_top.png` |
| 9 | Specs (`/specs`) | Bottom (100%) | Pricing table section — MSRP breakdown, asking price, savings callout | `stitch_ref_specs_pricing.png` |
| 10 | Contact (`/contact`) | Full page | Split layout — left info panel, right form, key facts bar at bottom | `stitch_ref_contact.png` |

### Additional Reference Screenshots

| # | Viewport | Page | Purpose |
|---|----------|------|---------|
| 11 | **375 x 812** (iPhone) | Home — hero | Mobile reference for responsive check |
| 12 | **375 x 812** (iPhone) | Contact — full | Mobile form layout reference |
| 13 | 1440 x 900 | Home — nav bar (scrolled state) | Show the glassmorphism nav with blur |

### Capture Instructions
1. Open DevTools (`F12`), toggle device toolbar, set to **1440 x 900** responsive viewport.
2. Disable any browser extensions that overlay UI.
3. Wait for all videos to load their poster frames before capturing (hero needs `hero_poster.jpg` visible, not a black frame).
4. Use full-page screenshot for the contact page; use viewport-only screenshots for all others.
5. Save all screenshots into `AstonMartin/stitch_refs/` for organized upload.

---

## 2. Design Language Summary

Provide this block as context text alongside every Stitch prompt to maintain consistency across all 5 screens.

### Design System Reference (paste into Stitch context)

```
DESIGN SYSTEM — Aston Martin Vantage Private Sale

THEME: Ultra-dark luxury automotive. Photography-first. Cinematic pacing.

COLORS:
- Background: #0a0a0a (near-black)
- Surface panels: #111111, #181818 (layered dark grays)
- Primary accent: #C5D932 (AMR Lime — Aston Martin's official racing green-yellow)
- Accent muted: rgba(197, 217, 50, 0.15) for subtle lime glows/badges
- Text primary: #f0f0f0
- Text muted: #888888
- Text dim: #555555
- Borders/dividers: rgba(255,255,255,0.05) — barely visible hairlines

TYPOGRAPHY:
- Headings: Cormorant Garamond, light weight (300), tight leading (1.15)
- Body/UI: Montserrat, light weight (300), generous leading (1.7)
- Labels/tags: Montserrat, 0.65rem, weight 500, 0.25em letter-spacing, uppercase, AMR Lime color
- Heading scale: H1 clamp(2.8rem-5.5rem), H2 clamp(2rem-3.2rem)

SPACING:
- Sections: 6rem vertical padding
- Container max-width: 1280px, 2rem side padding
- Generous negative space between elements — let the photography breathe

COMPONENTS:
- Buttons: Two styles — solid lime (#C5D932 bg, black text) and outline (transparent bg, white border, white text). 0.72rem uppercase, 0.2em tracking, 0.85rem/2.2rem padding. Hover lifts -2px.
- Navigation: Fixed top, glassmorphism on scroll (rgba(10,10,10,0.95) + backdrop-filter blur 12px). Logo uses Cormorant Garamond. "Inquire" CTA button is solid lime.
- Cards: No visible borders. Subtle background layering (#111 on #0a0a0a). Hover reveals via opacity transition.
- Stats: Serif numbers (Cormorant Garamond), lime-colored unit suffixes, uppercase sans-serif labels below.

VISUAL APPROACH:
- Full-bleed imagery and video backgrounds with gradient overlays
- Overlays fade to background color at bottom (gradient: transparent -> rgba(10,10,10,0.95))
- No rounded corners on cards or buttons — sharp edges throughout
- No box shadows — depth comes from background color layering and overlays
- Scroll-triggered fade-up animations (translateY 30px -> 0, opacity 0 -> 1)
- 1px hairline dividers in rgba(255,255,255,0.05)
```

---

## 3. Screen-by-Screen Stitch Prompts

Each prompt below is ready to paste directly into Stitch's text input field. Upload the corresponding reference screenshot(s) alongside each prompt.

---

### Screen 1: Hero / Landing

**Upload with prompt:** `stitch_ref_hero.png`, `stitch_ref_stats_experience.png`

**Prompt:**

```
Design a luxury automotive landing page for a 2026 Aston Martin Vantage private sale listing.

HERO SECTION (full viewport height):
- Full-bleed dark cinematic background image of a black sports car at dusk (placeholder for video — will be replaced with HTML5 video in code)
- Gradient overlay fading from subtle at top to near-black (#0a0a0a) at bottom
- Fixed navigation bar at top: left-aligned logo text "V" + "antage" (second part in lime #C5D932), right-aligned links: Home, Gallery, Specifications, and a solid lime "Inquire" CTA button. All uppercase, tiny sans-serif, wide letter-spacing
- Bottom-left content block (max-width 900px):
  - Small uppercase lime label: "Private Sale — Original Owner"
  - Large serif heading (Cormorant Garamond, light weight): "2026 Aston Martin Vantage Coupe"
  - Subtitle line in muted white, sans-serif: "656 HP · 2,519 Miles · $199,007 · Full Factory Warranty"
  - Two buttons: "View Gallery" (solid lime) and "Inquire" (white outline)
- Subtle scroll indicator: a single thin lime line pulsing at bottom center

STATS BAR (directly below hero):
- Dark panel (#111111) with top/bottom hairline borders
- Three-column grid, centered text in each:
  - "656hp" — large serif number, "hp" in lime, label below: "Twin-Turbo V8"
  - "2,519" — large serif number, label: "Miles on Odometer"
  - "$199,007" — large serif number, label: "Asking Price"
- Dividers between columns: 1px rgba(255,255,255,0.06)

EXPERIENCE SECTION (below stats):
- Full-bleed dark background image placeholder (will be video of car driving)
- Dark gradient overlay
- Centered content over the image:
  - Lime uppercase label: "Why This Car"
  - Serif heading: "The New-Generation Vantage"
  - Two body paragraphs in muted sans-serif text about the redesign and value proposition
  - Two badge/pill elements: "3yr Unlimited-Mileage Warranty" and "1st Original Owner · Clean Title"
  - Outline button: "Full Specifications"

Overall aesthetic: #0a0a0a background, Cormorant Garamond headings, Montserrat body text, AMR Lime (#C5D932) accents, no rounded corners, no shadows, luxury minimalism. Think Porsche or Aston Martin official site design language.
```

---

### Screen 2: Value & Options (NEW — Centerpiece Section)

**Upload with prompt:** `stitch_ref_specs_pricing.png` (for pricing table style reference)

**Prompt:**

```
Design a luxury pricing and value breakdown page section for a high-end car listing. Dark theme, #0a0a0a background.

SECTION HEADER:
- Small uppercase lime (#C5D932) label: "Value Proposition"
- Large serif heading (Cormorant Garamond): "Below Sticker. Every Option Included."
- One-line muted subtitle: "Original MSRP $222,800 — Asking $199,007 — You save $23,793"

SAVINGS HERO CALLOUT (prominent visual element):
- Large centered block with subtle dark surface background (#111111)
- Giant serif number: "$23,793" in white
- Label below: "Below Original Window Sticker" in uppercase muted text
- Thin lime accent line above or below the number

STICKER BREAKDOWN TABLE:
- Clean two-column table, dark surface background
- Left column: item description. Right column: price, right-aligned
- Rows:
  - Base MSRP: $191,000
  - Separator line
  - Section header in lime: "Factory Options ($21,600)"
  - AMR Exterior Pack: $3,100
  - Satin Black Exterior Trim: $1,400
  - 21" Forged Satin Black Wheels: $3,900
  - Smoked Tail Lamps: $600
  - Yellow Brake Calipers: $400
  - Onyx Black Haircalf Leather (RB981): $3,200
  - AMR Lime Interior Accent: $900
  - Ventilated Seats: $1,800
  - 360-Degree Camera System: $1,200
  - Adaptive Cruise Control: $1,500
  - Gloss Black Roof Panel: $2,100
  - Privacy Glass: $500
  - Garage Door Opener: $200
  - Splash Guards: $300
  - Auto-Dimming Interior Mirror: $500
  - Separator line
  - Import Costs & Gas Guzzler: $6,700
  - Transportation & Handling: $3,500
  - Separator line (thicker)
  - TOTAL ORIGINAL MSRP: $222,800 (bold, white)
  - ASKING PRICE: $199,007 (large, lime colored)
  - YOU SAVE: $23,793 below sticker (lime background badge)

007 PRICE BADGE (subtle, adjacent to asking price):
- Small understated badge or tag next to the $199,007 price
- Text: "007" in a minimal monospace or serif font
- Styled as a subtle nod, not a loud callout — think engraved metal plaque aesthetic
- Dark surface with very thin lime border, or reversed lime text on dark bg

BOTTOM CTA ROW:
- Two columns:
  - Left: "Includes 3-year unlimited-mileage factory warranty. Clean title in hand. Original window sticker available upon request."
  - Right: Two buttons stacked — "Schedule Viewing" (solid lime) and "Download Window Sticker" (outline)

Style: Ultra-dark luxury, Cormorant Garamond headings, Montserrat body, no rounded corners, no shadows, 1px hairline dividers in rgba(255,255,255,0.05). Price figures in serif font. This should feel like an official Aston Martin configurator summary page.
```

---

### Screen 3: Gallery

**Upload with prompt:** `stitch_ref_gallery_page.png`, `stitch_ref_gallery_grid.png`

**Prompt:**

```
Design a photo and video gallery page for a luxury car listing site. Dark theme, #0a0a0a background.

PAGE HERO (top, ~40vh):
- Full-width image of a car headlight detail (dark, moody shot) as background
- Dark gradient overlay fading to #0a0a0a at bottom
- Centered content: lime uppercase label "Visual Overview", large serif heading "Gallery"
- Fixed navigation bar overlaying the top (same as other pages)

VIDEO SECTION:
- Section header: lime label "Film", serif heading "Exterior Clips"
- Horizontal row of 3 video thumbnail cards
- Each card: 16:9 thumbnail image, semi-transparent play button overlay (circle with triangle), label below each thumbnail
- Labels: "Full Walkaround", "Side Profile", "Rear Three-Quarter"
- Cards have no borders, no rounded corners, hover state increases brightness

FILM CAROUSEL (below video section):
- Smaller horizontal scrolling strip of 8 video thumbnails
- Each card: square-ish thumbnail, play icon overlay, label below
- Labels: "The Reveal", "Ground Level", "Taillights", "Roofline", "Light Signature", "Badge", "Nightfall", "007"
- The "007" card should have a very subtle lime border or lime-tinted label to distinguish it

PHOTO GRID:
- Section header: lime label "Photography", serif heading with photo count
- Filter bar: horizontal row of pill/tag buttons — "All", "Day", "Night", "Engine", "Interior"
- "All" is active by default (lime background, black text). Others are outline style (dark bg, muted border)
- Below: responsive photo grid (3-column on desktop, 2 on tablet, 1 on mobile)
- Mix of landscape and portrait crops. Some images span 2 columns for visual variety
- No gaps between images, or very tight 4px gaps
- Hover: subtle scale and brightness increase

FOOTER:
- Minimal: "Vantage" in serif, VIN number, location, lime "Contact" link

Style: #0a0a0a bg, #111111 surfaces, #C5D932 lime accent, Cormorant Garamond headings, Montserrat body, no rounded corners, no shadows. Photography-first — the images are the product, everything else is a frame.
```

---

### Screen 4: Interior Showcase

**Upload with prompt:** `stitch_ref_interior.png`

**Prompt:**

```
Design a full-screen interior showcase section for a luxury car listing. Dark theme.

LAYOUT: Full-viewport-height section with a dark, moody interior car image as background (placeholder for looping video of leather seats and dashboard). Dark gradient overlay — heavier on the right side where text appears.

LEFT SIDE (visual): The background image/video dominates. Show leather seats, dashboard, steering wheel in a dark, atmospheric shot.

RIGHT SIDE (content, overlaying the image):
- Lime (#C5D932) uppercase label: "Step Inside"
- Large serif heading (Cormorant Garamond): "Handcrafted Interior"
- Three feature cards arranged vertically, each with:
  - Bold sans-serif title
  - Muted body text (1-2 lines)
  - Cards:
    1. "Onyx Haircalf Leather" — "Full leather interior with AMR Lime contrast stitching and Alcantara headliner"
    2. "10.25 Inch Infotainment" — "Touchscreen display with wireless Apple CarPlay, Android Auto, and Aston Martin HMI"
    3. "12-Way Power Sport Seats" — "Heated, ventilated, and memory-equipped with power lumbar and side bolsters"
- Each card has a subtle left border in lime or a small lime accent element
- Cards sit on semi-transparent dark panels (rgba(10,10,10,0.7) with backdrop-blur)

INTERIOR PHOTO STRIP (below the full-bleed section):
- Horizontal scrolling strip of 4-5 interior detail photos
- Square thumbnails showing: steering wheel closeup, center console, seat stitching detail, gauge cluster, door card
- Click to open lightbox (design the static state only)

Style: #0a0a0a, full-bleed imagery, glassmorphism cards (dark glass, not light), Cormorant Garamond headings, Montserrat body, lime accents, no rounded corners. The car interior should feel immersive — like you are sitting in the driver seat looking around.
```

---

### Screen 5: Specs & Contact

**Upload with prompt:** `stitch_ref_specs_top.png`, `stitch_ref_contact.png`

**Prompt:**

```
Design a combined specifications and contact page for a luxury car listing. Dark theme, #0a0a0a background.

PAGE HERO (top, ~40vh):
- Full-width image of a black sports car in profile as background
- Dark gradient overlay
- Centered: lime label "Complete Details", serif heading "Specifications & Inquire"

SPECS SECTION:
- Two-column layout: sticky sidebar navigation on left, spec content on right
- Sidebar: vertical list of section links — Overview, Performance, Exterior, Interior, Technology, Safety, Warranty, Pricing
- Active link has lime left border and lime text
- Spec content: clean two-column tables (label left, value right)
- Table styling: no visible borders except subtle hairlines between rows (rgba 255,255,255,0.05)
- Row hover: very subtle background lighten

Key specs to show in the visible area:
- Engine: 4.0L Twin-Turbocharged V8
- Output: 656 hp / 590 lb-ft torque
- Transmission: 8-speed automatic
- Drivetrain: Rear-wheel drive
- Color: Jet Black / Onyx Black Haircalf Leather
- Mileage: 2,519 miles

CONTACT SECTION (below specs, separated by generous whitespace):
- Two-column layout:
  - LEFT: Info panel
    - Lime label: "Get in Touch"
    - Serif heading: "Serious Inquiries Only"
    - Body text about private sale, proof of funds, factory warranty transfer
    - Contact details list (label: value pairs):
      - Phone: 224-307-9176
      - Text: 224-307-9176
      - Location: Chicagoland, Illinois
      - VIN: SCFSMGFW8TGN10773
      - Title: Clean — in hand
      - Warranty: 3 years, unlimited mileage
      - Payment: Wire transfer, certified check, or escrow
    - Outline button: "View Full Specifications"
  - RIGHT: Contact form
    - Fields: Full Name, Email Address, Phone Number, Purchase Method (dropdown), Message (textarea)
    - Note below form: "Proof of funds will be requested before scheduling a viewing."
    - Full-width lime submit button: "Submit Inquiry"
    - Form background: #111111 panel with generous padding

KEY FACTS BAR (bottom, before footer):
- Horizontal strip, 4 equal columns:
  - Engine: 4.0L TT V8 · 656hp
  - Mileage: ~2,519 miles
  - Warranty: 3yr / Unlimited mi
  - Asking Price: $199,007 (in lime)

Style: #0a0a0a bg, #111111 panels, Cormorant Garamond headings, Montserrat body, #C5D932 lime accent, no rounded corners, no shadows, luxury minimalism. Form inputs should have dark backgrounds (#181818), subtle bottom borders, and lime focus states.
```

---

## 4. 007 Design Integration

The asking price of $199,007 is not an accident. The "007" references James Bond's iconic association with Aston Martin. This should be woven into the design with the subtlety of a Savile Row detail — noticed by those who look, invisible to those who don't.

### Placement Strategy

| Element | Location | Treatment |
|---------|----------|-----------|
| **Price itself** | Hero subtitle, stats bar, pricing table, key facts bar | Always display as `$199,007` — never round it. The number does the work on its own. |
| **007 badge** | Adjacent to the asking price in the Value & Options pricing table | A small, understated tag. Dark surface `#181818`, thin lime border `1px solid rgba(197,217,50,0.3)`, text "007" in `0.65rem` Montserrat, lime color. Reads like a discrete metal plaque, not a movie poster. |
| **Film carousel label** | The last clip in the carousel (IMG_8207.mp4) | Already labeled "007" in the current site. Keep it. Style the label text in lime instead of white to subtly distinguish it from the other 7 clips. |
| **Garage spot reference** | Value & Options section, near the bottom | Small muted text: "Garage Spot 007" — a factual statement about where the car is stored. Placed in a footnote-like position below the pricing table. |
| **Section divider or watermark** | Between major sections (optional) | A barely-visible "007" watermark at ~3% opacity in a large serif font, positioned as a background element behind a section transition. Only visible on close inspection. |

### What NOT to Do

- No gun barrel sequences, no crosshairs, no silhouettes.
- No "Licensed to Thrill" or similar taglines. This is a real car listing, not a costume party.
- No 007 logo (trademarked). Only the numerals "007" in standard typography.
- The Bond connection should be discoverable, not declared. If someone notices the price ends in 007 and the video clip is named 007, they get the reference. That's the entire point.

---

## 5. Asset Placement Map

### Screen 1: Hero / Landing

| Position | Asset | File | Notes |
|----------|-------|------|-------|
| Hero background (video) | Primary hero clip | `IMG_8189.mp4` | Crossfades to 8187, 8147, 8203 — Stitch gets a static poster frame only |
| Hero poster frame | Still image fallback | `hero_poster.jpg` | Upload this to Stitch as the hero background image |
| Experience section bg | Driving clip | `IMG_8202.mp4` | Use a still frame from this video as Stitch background |
| Stats bar | No images | N/A | Pure text/numbers |

### Screen 2: Value & Options (NEW)

| Position | Asset | File | Notes |
|----------|-------|------|-------|
| Section background | Subtle texture or solid #0a0a0a | None | Keep clean — this is a data-heavy section, no competing imagery |
| Optional accent image | Engine bay detail | `IMG_8167.JPG` | Small inset image near the options list, showing the V8 |
| Optional accent image | Wheel detail | `IMG_8140.JPG` | Near the "21-inch Forged Wheels" line item |

### Screen 3: Gallery

| Position | Asset | File | Notes |
|----------|-------|------|-------|
| Page hero bg | Headlight detail | `IMG_8138.JPG` | Current gallery page hero |
| Video thumbnails (main 3) | Walkaround clips | `thumb_8121.jpg`, `thumb_8122.jpg`, `thumb_8131.jpg` | 16:9 thumbnails |
| Film carousel (8 cards) | Cinematic clips | `thumb_8177.jpg` through `thumb_8207.jpg` | Square-ish thumbnails |
| Photo grid | All 25 photos | `IMG_8136.JPG` through `IMG_8199.JPG` | Use thumbnails for grid, full-res for lightbox |
| Wide grid items | Feature photos | `IMG_8172.JPG` (profile), `IMG_8190.JPG` (dusk) | These span 2 columns |

### Screen 4: Interior Showcase

| Position | Asset | File | Notes |
|----------|-------|------|-------|
| Full-bleed background (video) | Interior sweep | `IMG_7072.mp4` | Use a still frame for Stitch |
| Interior detail strip | Interior clips (stills) | `IMG_7063.mp4` through `IMG_7086.mp4` | Extract still frames from these 8 interior videos for the photo strip |

### Screen 5: Specs & Contact

| Position | Asset | File | Notes |
|----------|-------|------|-------|
| Page hero bg | Driver-side profile | `IMG_8173.JPG` | Current specs page hero |
| Contact page hero bg (if separate) | Night front shot | `IMG_8199.JPG` | Current contact page hero |

---

## 6. Post-Stitch Integration Notes

Stitch outputs clean HTML/CSS, but several elements require manual integration after generation.

### 6.1 Video Integration (Critical)

Stitch generates static designs. Every video background and video thumbnail needs manual code:

```html
<!-- Hero video crossfade pattern — 4 stacked videos with JS rotation -->
<div class="hero-video-wrap">
  <video class="hero-vid hero-vid--active" autoplay muted playsinline preload="auto" poster="hero_poster.jpg">
    <source src="videos/outside/IMG_8189.mp4" type="video/mp4" />
  </video>
  <!-- Additional videos for crossfade: 8187, 8147, 8203 -->
</div>
```

Videos to integrate manually:
- Hero: 4-video crossfade (8189 primary, 8187, 8147, 8203)
- Experience section: looping background (8202)
- Interior section: looping background (7072)
- Film carousel: 8 hover-preview videos (8177, 8181, 8182, 8184, 8187, 8188, 8203, 8207)
- Gallery: 3 main video thumbnails + modal player
- Audio: `hero_music.mp3` with fade-in, mute toggle button

### 6.2 Form Backend

The current form is non-functional (SITE_AUDIT item #1). After Stitch generates the form HTML:

- **Option A (fastest):** Add Formspree — change `<form>` to include `action="https://formspree.io/f/YOUR_FORM_ID" method="POST"` and remove any client-side JS submit handler.
- **Option B (professional):** Use Resend API with a Cloudflare Worker to send a formatted email notification + auto-reply to the buyer.

### 6.3 Image Optimization

Stitch will reference placeholder or uploaded images. Before deployment:

1. Generate WebP versions of all 25 photos using Squoosh CLI or Sharp.
2. Create two sizes: thumbnails (800px wide) and full-resolution (2400px wide).
3. Implement `<picture>` elements with WebP + JPG fallback.
4. Add `loading="lazy"` to all images below the fold.
5. Use `srcset` for responsive image delivery.

### 6.4 Mobile Responsiveness

Stitch generates desktop-first layouts. After export, verify and adjust:

- Nav collapses to hamburger menu below 768px.
- Stats bar stacks to single column on mobile.
- Photo grid drops to 2-column (tablet) and single-column (phone).
- Pricing table remains readable on 375px viewport — no horizontal scrolling.
- Interior feature cards stack vertically on mobile.
- Form fields are full-width on mobile with adequate touch targets (min 44px height).
- Film carousel is swipeable on touch devices.

### 6.5 Custom Styling for 007 Elements

Stitch may not perfectly render the subtle 007 badge. After export, add:

```css
.price-badge-007 {
  display: inline-block;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: var(--lime);
  border: 1px solid var(--lime-border);
  padding: 0.2rem 0.6rem;
  margin-left: 0.75rem;
  vertical-align: middle;
}
```

### 6.6 Scroll Animations

Stitch outputs static layouts. Re-implement the existing scroll-triggered animations:

- `IntersectionObserver` for fade-up entrances on section content.
- Stats counter animation (numbers count up when scrolled into view).
- Hero text staggered entrance (0.3s delays between label, title, subtitle, buttons).
- Film carousel hover-to-play video preview.

### 6.7 Interactive Prototyping in Stitch

After generating all 5 screens, use Stitch's built-in prototyping mode to:
- Link "View Gallery" button on Screen 1 to Screen 3.
- Link "Inquire" button on Screen 1 to Screen 5 (contact section).
- Link "Full Specifications" button on Screen 1 to Screen 5 (specs section).
- Link nav items across all screens for a clickable walkthrough prototype.

This prototype serves as a stakeholder review tool before any code is written.

---

## 7. Known Issues to Fix

Cross-referencing `SITE_AUDIT.md` — categorized by what the Stitch rebuild addresses automatically vs. what requires manual post-generation work.

### Resolved by Stitch Rebuild

| Audit # | Issue | How Stitch Fixes It |
|---------|-------|---------------------|
| 4 | Active nav link broken | Generate consistent nav across all screens; re-implement active state detection with cleaner JS post-export |
| 5 | Wrong price in default meta description | New build uses correct price ($199,007) from the start |
| 9 | Gallery music auto-starts over video | Fresh JS — do not re-implement the MutationObserver auto-play behavior. Music toggle is manual-only. |
| 16 | Gallery preview hover broken on mobile | Rebuild hover/touch interactions with proper touch fallbacks |
| 17 | Specs sidebar hidden on mobile | Design the mobile specs nav with scroll hint gradient from the start in Stitch |
| 19 | Hardcoded "25 Photos" | Use dynamic count in template code |
| 20 | Generic video clip labels | New labels baked into the Stitch prompts above |

### Requires Manual Fix After Stitch Export

| Audit # | Issue | Manual Action Required |
|---------|-------|----------------------|
| 1 | Contact form non-functional | Integrate Formspree or Resend API (see section 6.2) |
| 2 | Unshareable GitHub URL | Register custom domain, update astro.config.mjs `site` value, point DNS |
| 3 | No interior photos | Capture interior photos (steering wheel, seats, dash, console, door cards), add to gallery with "Interior" filter category |
| 6 | OG image relative path | Set absolute URL in `<meta property="og:image">` after domain is registered |
| 7 | No Twitter Card meta | Add `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` meta tags |
| 8 | No favicon | Create favicon (the "V" from the logo), add `<link rel="icon">` |
| 10 | No Schema.org structured data | Add `Vehicle` + `Offer` JSON-LD to `<head>` |
| 11 | No sitemap or robots.txt | Run `npx astro add sitemap`, create `robots.txt` |
| 12 | No share buttons | Add copy-link, WhatsApp, SMS share strip to hero and contact |
| 13 | No text/WhatsApp contact | Add `sms:` link to contact details |
| 14 | Unoptimized images | Run Squoosh/Sharp batch conversion to WebP (see section 6.3) |
| 15 | No analytics | Add Plausible or Microsoft Clarity script tag |
| 18 | No canonical URL | Add `<link rel="canonical">` after domain is set |

### New Issue Introduced by Price Change

The asking price is changing from `$199,500` to `$199,007`. Update every instance across all pages:
- Hero subtitle
- Stats bar
- Experience section body text (savings figure changes to $23,793)
- Specs pricing table
- Contact page key facts bar
- Meta descriptions
- Schema.org structured data `offers.price` value

---

## Appendix: Stitch Generation Sequence

Recommended order to generate screens, optimizing for the 350/month budget:

| Step | Screen | Estimated Iterations | Budget Used |
|------|--------|---------------------|-------------|
| 1 | Screen 2 (Value & Options) | 3-4 attempts | ~4 |
| 2 | Screen 1 (Hero / Landing) | 2-3 attempts | ~3 |
| 3 | Screen 5 (Specs & Contact) | 2-3 attempts | ~3 |
| 4 | Screen 3 (Gallery) | 2-3 attempts | ~3 |
| 5 | Screen 4 (Interior) | 2-3 attempts | ~3 |
| — | Refinement passes | ~4 touch-ups | ~4 |
| **Total** | | | **~20 generations** |

Start with Screen 2 (Value & Options) because it is entirely new — no existing reference exists in the current build. Getting this right first establishes the pricing/value visual language that echoes into other screens.

---

*Document prepared by Myles. Ready for Stitch session execution.*

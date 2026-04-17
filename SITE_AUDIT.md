# Aston Martin Vantage — Site Audit & Recommendations
**Prepared by:** Remi (Marketing), PAX (SEO/Tech Research), AutomationJeff (Integrations)
**Orchestrated by:** Larry
**Date:** 2026-03-27
**Site:** https://Dexmang.github.io/Runway-Gen-3-Alpha-Gen-4.5-/

---

## Executive Summary

The site is visually excellent — premium dark aesthetic, great typography, responsive, and well-structured. The photography and video are strong assets. However, **there are two critical failures that are actively losing buyers right now**, plus a cluster of SEO and UX issues that are significantly limiting reach and conversion. This audit is ordered by business impact.

---

## 🔴 CRITICAL — Fix Immediately (Losing Buyers Now)

### 1. Contact Form Does Not Work

**File:** [src/pages/contact.astro](src/pages/contact.astro) — lines 50–79 and [src/scripts/main.js](src/scripts/main.js) — lines 232–249

The form shows a fake "Message Sent" confirmation but **sends nothing**. No email, no database write, no notification. Every inquiry submitted through the form is silently discarded. Any buyer who filled out the form believes they contacted you — they did not.

**Fix:** Integrate a form backend immediately. Options:
- **Formspree** (free tier, no code) — add `action="https://formspree.io/f/YOUR_ID"` to the `<form>` tag and remove the JS submit handler
- **Resend API** (free tier, code required) — POST form data to a serverless function that emails you
- **Web3Forms** (free, no backend code) — similar to Formspree, 1-line integration

**Priority: Immediate.**

---

### 2. URL Is Unshareable and Hurts Credibility

**File:** [site/astro.config.mjs](site/astro.config.mjs) — line 9

Current URL: `https://Dexmang.github.io/Runway-Gen-3-Alpha-Gen-4.5-/`

This URL:
- References Runway AI (a video tool), confusing any serious buyer
- Looks like a test/staging URL, not a real listing
- Cannot be included in BaT or Cars & Bids descriptions without damaging credibility
- Is impossible to remember or type manually

**Fix:** Register a custom domain immediately. Suggested options:
- `vantage2026.com` — clean, descriptive (~$12/year on Namecheap)
- `2026vantage.com` — alternate
- `astonvantage.dexblue.com` — subdomain if DexBlue domain exists

Point the domain at GitHub Pages (free). Update `astro.config.mjs` `site:` value accordingly.

**Priority: Immediate — needed before any listing goes live.**

---

## 🟠 HIGH — Fix Before Launch

### 3. No Interior Photos or Interior Gallery Filter

The gallery has `Day`, `Night`, and `Engine` filters. Buyers want to see the interior — especially the Haircalf leather upholstery, which is a premium differentiator at this price. There are zero interior photos.

**Fix:**
- Add interior photos (steering wheel, seats, dashboard, door cards, center console)
- Add `interior` category to the photo array in [src/pages/gallery.astro](src/pages/gallery.astro)
- Add `Interior` filter button alongside Day/Night/Engine

---

### 4. Active Nav Link Broken on All Interior Pages

**File:** [src/scripts/main.js](src/scripts/main.js) — lines 38–45

The active page detection does:
```js
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
```
With the base URL `/Runway-Gen-3-Alpha-Gen-4.5-/`, the gallery path is `/Runway-Gen-3-Alpha-Gen-4.5-/gallery`. `.pop()` returns `'gallery'`. But nav links have full href values like `/Runway-Gen-3-Alpha-Gen-4.5-/gallery` — comparing `'gallery'` to the full href never matches.

**Fix:** Change the comparison to use `window.location.pathname` endings or compare against the `href` attribute more loosely:
```js
document.querySelectorAll('.nav-links a').forEach(a => {
  if (window.location.pathname.endsWith(a.getAttribute('href').replace(/\/$/, ''))) {
    a.classList.add('active');
  }
});
```

---

### 5. Default Meta Description Has Wrong Price

**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro) — line 11

The fallback description says `$199,000` but the actual asking price is `$199,500`. This is shown in Google search results if a page doesn't pass its own description.

**Fix:** Update the default description string to `$199,500`.

---

### 6. OG Image Uses Relative Path — Social Shares Broken

**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro) — line 26

```html
<meta property="og:image" content={`${base}hero_poster.jpg`} />
```

`base` resolves to `/Runway-Gen-3-Alpha-Gen-4.5-/` — a relative path. Open Graph `og:image` **requires an absolute URL**. Facebook, Twitter/X, iMessage, Slack, and every link preview system will fail to show the car photo.

**Fix:**
```html
<meta property="og:image" content="https://YOUR-DOMAIN.com/hero_poster.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```
Also add an `og:url` tag with the canonical full URL.

---

### 7. No Twitter Card Meta Tags

**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro)

No Twitter/X card tags exist. Twitter won't show a rich preview when the link is shared.

**Fix — add to `<head>`:**
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content="https://YOUR-DOMAIN.com/hero_poster.jpg" />
```

---

### 8. No Favicon

**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro)

No `<link rel="icon">`. The browser tab shows a blank page icon — looks unfinished and reduces credibility.

**Fix:** Create a simple favicon (the "V" from the nav logo works well). Add to `<head>`:
```html
<link rel="icon" type="image/svg+xml" href={`${base}favicon.svg`} />
```

---

### 9. Gallery Music Conflict — Classical Auto-Starts Over Video

**File:** [src/pages/gallery.astro](src/pages/gallery.astro) — lines 171–177

A MutationObserver starts the classical music track automatically when the video modal opens. This means a buyer opening a walkaround video gets the classical music blasting over it. This is not a feature — it's a UX bug.

**Fix:** Remove the MutationObserver auto-play block. Let the music button be manual-only. The video has its own audio.

---

## 🟡 MEDIUM — Polish & Conversion Improvements

### 10. No Schema.org Structured Data

Google supports `Vehicle` and `Offer` schema markup. Adding this could generate rich results in search — showing price, mileage, and availability directly in the Google SERP.

**Add to `<head>` in Layout.astro:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Car",
  "name": "2026 Aston Martin Vantage Coupe",
  "description": "656hp, Jet Black, 2519 miles, full factory warranty",
  "vehicleIdentificationNumber": "SCFSMGFW8TGN10773",
  "mileageFromOdometer": { "@type": "QuantitativeValue", "value": 2519, "unitCode": "SMI" },
  "color": "Jet Black",
  "offers": {
    "@type": "Offer",
    "price": "199500",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

---

### 11. No Sitemap or robots.txt

No `sitemap.xml` or `robots.txt` exists in `publicDir`. Google can't crawl the site efficiently.

**Fix:** Astro has a first-party sitemap integration:
```bash
npx astro add sitemap
```
Then add `robots.txt` to `web_assets/`:
```
User-agent: *
Allow: /
Sitemap: https://YOUR-DOMAIN.com/sitemap-index.xml
```

---

### 12. No Share Buttons

A $200k car purchase often involves a spouse, partner, or advisor. There's no easy way for a prospect to share the listing. A simple row of share links (copy URL, text/SMS, WhatsApp) dramatically increases qualified reach.

**Fix:** Add a small share strip to the hero actions and contact page:
- Copy Link button (clipboard API)
- WhatsApp: `https://wa.me/?text=Check+out+this+Aston+Martin+Vantage+[URL]`
- SMS: `sms:?body=[URL]`

---

### 13. No Text/WhatsApp Contact Option

The contact page lists phone and form only. At this price point, many serious buyers prefer to send a quick text first. A `sms:` link or WhatsApp link lowers the barrier significantly.

**Add to contact details list:**
```html
<li><span class="detail-label">Text</span><span class="detail-value"><a href="sms:2243079176">224-307-9176</a></span></li>
```

---

### 14. Images Are Unoptimized — Heavy Load Times

Photos are raw iPhone JPEGs served from `web_assets/photos/`. iPhone 14 Pro photos are 4–8MB each. With 25 photos, the gallery page could attempt to load 150MB+ of images (lazy loading helps but thumbnails still need to be fast).

**Fix (two options):**
- **Cloudinary free tier** — upload once, serve WebP automatically via URL params. Zero code change needed.
- **Sharp script** — run locally before deploy to generate WebP and resize thumbnails to 800px for thumbs, 2400px for full-size

---

### 15. No Analytics

No Google Analytics, no Plausible, no Fathom — nothing. You have no visibility into how many people are viewing the listing, where they're coming from, how long they spend on the gallery, or what they click before leaving.

**Fix (30 minutes):**
- **Plausible** ($9/mo) or **Fathom** ($14/mo) — privacy-first, no cookie banner needed, simple script tag
- **Google Analytics 4** (free) — more data, requires consent banner in EU

---

### 16. "Gallery Preview" Hover Behavior Broken on Mobile

**File:** [src/styles/global.css](src/styles/global.css) — lines 381–396

The `.preview-grid img:hover` scale/brightness effect is CSS-only and doesn't trigger on touch devices. On mobile the images look static with no affordance that they're clickable.

**Fix:** The preview grid images link to the gallery page, so they don't need hover treatment. Consider adding a subtle scale on `:active` for touch, or removing the hover effect from the homepage preview grid since those images aren't lightbox-clickable.

---

### 17. Specs Sidebar Hidden on Mobile Without Navigation Hint

On screens under 1024px, the sticky sidebar becomes a horizontal tab bar ([src/styles/global.css](src/styles/global.css) line 1091). This works, but there's no visual indicator that the content is scrollable on mobile — buyers may miss the tab strip and not know sections exist below.

**Fix:** Add a subtle `overflow-x: auto` and a right-fade CSS gradient hint to the mobile specs nav to show it's scrollable.

---

### 18. No Canonical URL Tag

**File:** [src/layouts/Layout.astro](src/layouts/Layout.astro)

Missing `<link rel="canonical">`. If the site is ever accessible via multiple URLs (www vs non-www, HTTP vs HTTPS, GitHub Pages vs custom domain), Google may split page rank.

**Fix:**
```html
<link rel="canonical" href="https://YOUR-DOMAIN.com{Astro.url.pathname}" />
```

---

### 19. Hardcoded "25 Photos" in Gallery Header

**File:** [src/pages/gallery.astro](src/pages/gallery.astro) — line 92

`<h2>25 Photos</h2>` is hardcoded. When interior photos are added, this will be wrong.

**Fix:**
```astro
<h2>{photos.length} Photos</h2>
```

---

### 20. Video Clip Labels Are Generic

**File:** [src/pages/gallery.astro](src/pages/gallery.astro) — lines 34–37

"Walkaround · Clip 1", "Side Sweep · Clip 2", "Rear Profile · Clip 3" — these are placeholder labels. Buyers respond to specificity.

**Fix:** Update to descriptive labels like:
- "Full Walkaround · Jet Black"
- "Side Profile · In Motion"
- "Rear Three-Quarter · Dusk"

---

## 🔵 TOOLS & INTEGRATIONS — Claude MCP / API Recommendations

These are specific tools that can be integrated via MCP servers, API keys, or direct plugins to polish and automate the site.

### Tier 1 — Critical Integrations

| Tool | Purpose | Cost | Integration |
|---|---|---|---|
| **Formspree** | Contact form backend — receive inquiry emails | Free (50/mo) | Replace form `action` attribute, no code |
| **Resend API** | Professional transactional email for form submissions + auto-reply to buyer | Free (3k/mo) | API key + serverless function |
| **Namecheap / Cloudflare Registrar** | Custom domain registration | ~$12/yr | DNS config |
| **Cloudflare** | Free CDN, SSL, DDoS, fast global delivery | Free | Point nameservers |

### Tier 2 — Analytics & Conversion

| Tool | Purpose | Cost | Integration |
|---|---|---|---|
| **Plausible Analytics** | Privacy-first traffic analytics, no cookie banner needed | $9/mo | Single `<script>` tag |
| **Microsoft Clarity** | Free heatmaps + session recordings — see exactly where buyers click | Free | Script tag |
| **Hotjar** | More advanced heatmaps, conversion funnels | Free basic | Script tag |
| **Google Analytics 4** | Full traffic data, source attribution | Free | Script tag + consent banner |

### Tier 3 — Image Performance

| Tool | Purpose | Cost | Integration |
|---|---|---|---|
| **Cloudinary** | Upload once → serve WebP, auto-resize, CDN-delivered | Free (25 credits/mo) | Replace `src` URLs with Cloudinary URLs |
| **Astro Image integration** | Built-in image optimization at build time | Free | `npx astro add @astrojs/image` |
| **Squoosh CLI** | Batch convert all photos to WebP before deploy | Free | npm script in package.json |

### Tier 4 — SEO & Indexing

| Tool | Purpose | Cost | Integration |
|---|---|---|---|
| **Astro Sitemap** | Auto-generate sitemap.xml on build | Free | `npx astro add sitemap` |
| **Google Search Console** | Submit sitemap, track search impressions, fix crawl errors | Free | Verify via DNS or meta tag |
| **Bing Webmaster Tools** | Index on Bing (often used by older/wealthy demographics) | Free | Sitemap submit |

### Tier 5 — Claude API Opportunities

| Use Case | How |
|---|---|
| **AI inquiry responder** | Use Claude API to auto-draft responses to form submissions within minutes of receipt, before you manually review |
| **BaT description generator** | Claude API call that takes the specs page data and outputs an optimized BaT listing — AutomationJeff can build this |
| **Lead qualifier** | Claude API reads inbound inquiry form text and scores buyer seriousness (cash, financing, trade) before you call them |

### MCP Servers Available Now

The following MCP tools are already connected in this environment and can be used immediately:

- **Gmail MCP** — Can be used to log and respond to inquiries that come via email
- **Google Calendar MCP** — Schedule viewing appointments directly from inquiry emails

---

## Action Priority List

| # | Action | Owner | Effort | Impact |
|---|---|---|---|---|
| 1 | Fix contact form with Formspree | AutomationJeff | 30 min | 🔴 Critical |
| 2 | Register custom domain + point to GitHub Pages | Jerry | 1 hr | 🔴 Critical |
| 3 | Add interior photos + Interior filter to gallery | Remi + Jerry | 2 hr | 🟠 High |
| 4 | Fix OG image to absolute URL | AutomationJeff | 10 min | 🟠 High |
| 5 | Add Twitter Card meta tags | AutomationJeff | 10 min | 🟠 High |
| 6 | Fix default meta description price ($199,000 → $199,500) | AutomationJeff | 5 min | 🟠 High |
| 7 | Add favicon | AutomationJeff | 30 min | 🟠 High |
| 8 | Fix gallery music auto-start bug | AutomationJeff | 10 min | 🟠 High |
| 9 | Fix active nav link detection | AutomationJeff | 15 min | 🟡 Medium |
| 10 | Add Schema.org Vehicle structured data | AutomationJeff | 30 min | 🟡 Medium |
| 11 | Add sitemap + robots.txt | AutomationJeff | 20 min | 🟡 Medium |
| 12 | Add share buttons (copy link, WhatsApp, SMS) | AutomationJeff | 1 hr | 🟡 Medium |
| 13 | Add text/SMS contact option | AutomationJeff | 15 min | 🟡 Medium |
| 14 | Set up Plausible or Microsoft Clarity analytics | Jerry/AutomationJeff | 30 min | 🟡 Medium |
| 15 | Optimize images with Squoosh or Cloudinary | AutomationJeff | 2 hr | 🟡 Medium |
| 16 | Fix hardcoded "25 Photos" | AutomationJeff | 5 min | 🔵 Low |
| 17 | Update video clip labels | Remi | 10 min | 🔵 Low |
| 18 | Add canonical URL tag | AutomationJeff | 10 min | 🔵 Low |

---

*Audit complete. Ready to execute — assign items to team and proceed.*

*— Remi / PAX / AutomationJeff | via Larry*

# AZRA Systems — Website

Institutional, defense-focused website for **AZRA Systems**, built with the Next.js App Router, React, TypeScript, and Tailwind CSS. The site is data-driven: nearly all copy lives in `/data/*.ts` files so content can be edited without touching component code.

> **Tagline:** _Intelligence systems for strategic leverage._

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI:** React 18, Tailwind CSS 3
- **Fonts:** Inter (sans/display) + JetBrains Mono (mono), via `next/font`
- **Architecture:** Modular components, data-driven pages, server-rendered by default

---

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

```bash
npm run build
npm run start
```

---

## Folder Structure

```
.
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata, nav, footer
│   ├── globals.css             # Tailwind layers + base styles
│   ├── not-found.tsx           # 404
│   ├── page.tsx                # Home
│   ├── capabilities/page.tsx
│   ├── systems/page.tsx
│   ├── doctrine/page.tsx
│   ├── research/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── insights/page.tsx
│   └── insights/[slug]/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── PageHeader.tsx
│   │   ├── SectionIntro.tsx
│   │   └── CTASection.tsx
│   ├── cards/
│   │   ├── CapabilityCard.tsx
│   │   ├── SystemCard.tsx
│   │   ├── DoctrinePrinciple.tsx
│   │   ├── ResearchCard.tsx
│   │   └── InsightCard.tsx
│   ├── forms/
│   │   └── ContactForm.tsx
│   ├── graphics/
│   │   ├── GridBackground.tsx
│   │   └── SignalGraphic.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Container.tsx
├── data/
│   ├── siteConfig.ts           # Site name, tagline, positioning
│   ├── navigation.ts           # Top + footer navigation
│   ├── capabilities.ts         # Six capability entries
│   ├── systems.ts              # Five system module entries
│   ├── doctrine.ts             # Six operating principles
│   ├── research.ts             # Research portfolio
│   ├── insights.ts             # Article index
│   └── about.ts                # About page sections
├── lib/
│   └── utils.ts
├── public/                     # Static assets (place logos / OG images here)
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## Editing Content

Almost every word visible on the site lives in `/data/`. To change copy, edit the relevant file:

| Want to change…                 | Edit                       |
| ------------------------------- | -------------------------- |
| Tagline, positioning, footer    | `data/siteConfig.ts`       |
| Top nav / footer nav            | `data/navigation.ts`       |
| Capabilities page               | `data/capabilities.ts`     |
| Systems page                    | `data/systems.ts`          |
| Doctrine page                   | `data/doctrine.ts`         |
| Research portfolio              | `data/research.ts`         |
| Insights / blog entries         | `data/insights.ts`         |
| About page sections             | `data/about.ts`            |

To add a new capability/system/principle/topic/insight, append a new entry to the relevant array. The pages auto-render the new entry — no code changes required.

---

## Design System

Colours and tokens are defined in `tailwind.config.ts`:

- **Background:** `background.DEFAULT` (`#0A0B0D`), `background.elevated`, `background.panel`
- **Foreground:** `foreground.DEFAULT`, `foreground.muted`, `foreground.subtle`
- **Borders:** `border.DEFAULT`, `border.strong`
- **Accents:** `accent.silver`, `accent.steel`, `accent.signal` (muted blue), `accent.alert` (muted red)
- **Display type:** Inter, with custom `display-xl/lg/md` fluid sizes
- **Mono type:** JetBrains Mono, used for institutional eyebrows / labels

---

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`)
- Skip-to-content link
- Keyboard-accessible interactive elements
- Visible focus rings via `:focus-visible`
- `prefers-reduced-motion` honoured globally
- Form fields have associated labels and required indicators
- Decorative SVGs are `aria-hidden`

---

## Performance

- Server components by default (only Navbar, Insights filter, and ContactForm are client-rendered)
- `next/font` with `display: swap` and CSS variables — no FOIT, no third-party font requests at runtime
- No animation libraries; minimal CSS transitions
- Decorative graphics rendered as inline SVG (no image weight)

---

## Connecting the Contact Form

The form in `components/forms/ContactForm.tsx` currently simulates submission client-side. To wire it to a backend:

1. Replace the `setTimeout` block with a `fetch` to your endpoint (e.g. `/api/contact`).
2. Create `app/api/contact/route.ts` and implement a `POST` handler — forward to email, queue, or CRM as appropriate.
3. Add server-side validation and rate limiting; consider a hidden honeypot field and/or institutional captcha.

---

## Suggested Next Improvements

- Wire the contact form to a backend with email delivery and rate limiting
- Replace placeholder Insight bodies with real MDX articles (`contentlayer` or `next-mdx-remote`)
- Add `sitemap.ts` and `robots.ts` to `/app` once the production URL is finalised
- Add `/public/og-image.png` and reference it in `metadata.openGraph.images`
- Replace the geometric `Logomark` in `Navbar.tsx` with the official AZRA SVG logo
- Introduce a CMS or git-backed content system if non-engineers will edit content frequently
- Add unit/integration tests (`vitest` + `@testing-library/react`)
- Add a privacy / terms page at `/privacy` and `/terms`

---

## License

© AZRA Systems. All rights reserved.

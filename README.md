# الرد (Elradd) — elradd.com

Marketing website for Elradd — an AI front desk for Egyptian small and medium service businesses.
Bilingual (Arabic RTL default / English toggle), React SPA, no backend.

## Stack

- Vite + React 18 + react-router-dom v6
- Tailwind CSS v3 (palette in `tailwind.config.js`)
- Cairo Variable font (`@fontsource-variable/cairo`)
- All copy lives in `src/i18n/ar.js` and `src/i18n/en.js`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # serve the production build locally
```

## Deploy on Vercel

1. Push this folder to a Git repository (GitHub/GitLab/Bitbucket).
2. In Vercel: **Add New → Project** → import the repo.
3. Framework preset: **Vite** (auto-detected). Build command `npm run build`, output directory `dist`.
4. Deploy. `vercel.json` already includes the SPA rewrite, so direct visits to `/website`, `/contact`, etc. work.
5. Point the `elradd.com` domain: Vercel project → **Settings → Domains** → add `elradd.com` and follow the DNS instructions shown there.

## Before going live

- `src/config.js`: replace the placeholder `WHATSAPP_NUMBER` with the real number (digits only, international format, e.g. `2010XXXXXXXX`). While it stays a placeholder, all WhatsApp CTAs hide automatically.
- The embedded chat widget script tags live in `index.html` — do not remove or rename them.

## Structure

```
src/
  assets/logo/     mark-door.svg · mark.svg · appicon.svg (brand marks — do not redraw)
  components/      Header, Footer, MobileBottomBar, shared UI
  components/landing/  Hero, Pain, Demo, How, Pricing, QubixTeaser, Faq, CtaBand
  i18n/            ar.js · en.js (all copy) · LangContext.jsx
  pages/           Landing · Website · Contact · Privacy · Terms
  config.js        WHATSAPP_NUMBER
public/            favicon PNGs · appicon.svg · sitemap.xml
```

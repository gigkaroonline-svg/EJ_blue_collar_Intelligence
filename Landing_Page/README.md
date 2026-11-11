# RojMitra Landing Page

Next.js (App Router) + TypeScript + Tailwind CSS landing page for **RojMitra**, an EarlyJobs initiative for workforce intelligence and labour mapping in India.

## Quick start

```bash
cd EJ_blue_collar_Intelligence/Landing_Page
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Edit content

All marketing copy, `[X]` statistics, contact emails, FAQs, and CTAs live in:

```
src/content/site.ts
```

Replace placeholder stats once verified. Capabilities marked **Building** are controlled in the same file.

## Brand assets

| Asset | Path |
| --- | --- |
| RojMitra logo | `public/images/rojmitra-logo.png` |
| Sky / clouds treatment | `public/images/sky-clouds.svg` |
| EarlyJobs logo (reference) | `public/earlyjobs-logo.webp` |

Hero worker imagery uses clearly labelled placeholders, drop real field photography into `public/images/` and wire them via `next/image`.

## Scripts

- `npm run dev`, local development
- `npm run build`, production build
- `npm run start`, serve production build
- `npm run lint`, ESLint

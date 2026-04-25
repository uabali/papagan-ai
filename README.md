# Papagan

Papagan is a **Turkish-language UI prototype** for an AI platform in the style of **[fal.ai](https://fal.ai/)** and **[Together.ai](https://www.together.ai/)**.

It focuses on the product surface (marketing + console) you would expect from a model-serving platform:

- Marketing pages: Home, Models (gallery + detail), Pricing, Enterprise, Docs, Status
- Console pages: Overview, API Keys, Usage, Logs, Dedicated Endpoints, Fine-tuning, Compute

> Note: This repository is a UI-first prototype. Most console data and playground execution are currently mock/demo data.

## Tech stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Radix UI primitives (+ shadcn-style components)
- Framer Motion

## Requirements

- Node.js 20+ (recommended: install via `nvm`)

## Setup

```bash
npm install
```

## Run (dev)

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Build / Run (production)

```bash
npm run build
npm run start
```

## WSL note (common issue)

If you see `sh: 1: next: Permission denied`, it usually means your project is on a `noexec` mount (often under `/mnt/c/...`) or your `node_modules/.bin` scripts are not executable.

- Ensure the project lives under your Linux home, e.g. `~/papagan` (not `/mnt/c/...`).
- Delete and reinstall dependencies:

```bash
rm -rf node_modules package-lock.json .next
npm install
```

## Project structure

- `src/app/(marketing)` — public website pages
- `src/app/(console)` — console/dashboard pages
- `src/components` — UI components (marketing/console/ui)
- `src/data/models.ts` — model catalog seed data (used by the gallery + detail pages)


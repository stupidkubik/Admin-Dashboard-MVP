# Admin Dashboard MVP

Production-ready Next.js admin template for shipping B2B dashboards fast. Opinionated defaults, 100% TypeScript, and mock data so you can demo value in minutes.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Demo

- **Local preview**: `npm run dev` → open `http://localhost:3000`
- **Screens**: Dashboard overview, Users table with CRUD patterns, Forms with validation, Settings with theme toggle
- **Test data**: Served from `/app/api/*` handlers and `mocks/data/*.json`

## Features

- Ready-made layouts with sidebar navigation, header actions, breadcrumbs, and responsive breakpoints
- Dashboard widgets with charts, KPIs, recent activity, skeletons, and error states out of the box
- User management table built on TanStack Table with sorting, pagination, bulk select, and action menus
- Auth starter pack (login, register, forgot password) wired to mock endpoints for instant demos
- Form patterns using React Hook Form + Zod, including validation messaging and toast feedback
- Theme system (light/dark) powered by next-themes and Tailwind CSS tokens
- Toast notifications, modals, and async states powered by reusable UI primitives (shadcn/ui + custom components)
- Mock API routes and MSW helpers to switch between fake data and a real backend without refactors

## Tech Stack

- **Framework**: Next.js App Router (15.x) + React 19
- **Language**: TypeScript with absolute imports and path aliases
- **Styling**: Tailwind CSS 4, tailwindcss-animate, shadcn/ui component patterns
- **Data Layer**: SWR hooks, TanStack Table, Zod schemas, Zustand-ready contexts
- **Tooling**: ESLint, Prettier, Jest + Testing Library, MSW for API mocking
- **Charts & UI Enhancements**: Chart.js with `react-chartjs-2`, lucide-react icons, Sonner toasts

## Structure

```
app/
  layout.tsx          # Root layout, theme + shell providers
  page.tsx            # Landing redirect to dashboard
  dashboard/          # KPI widgets, charts, activity feed
  users/              # CRUD table, bulk actions, detail drawer
  forms/              # Demo forms with validation patterns
  settings/           # Profile + preferences + theme toggle
  auth/               # Login, register, forgot-password flows
  api/                # Mocked REST endpoints (users, stats, auth)
components/
  common/, dashboard/, data-table/, layout/, ui/ primitives
contexts/             # Theme + sidebar providers
lib/                  # Hooks, types, utilities, validation schemas
mocks/                # MSW handlers and JSON fixtures
public/               # Static assets, mockServiceWorker
styles/, tailwind.config.ts, eslint.config.mjs, jest.config.js
```

## Setup (≤10 minutes)

1. **Prerequisites**: Node.js 18+ and npm 9+.
2. **Install** (`~3 min`): `npm install`
3. **Run** (`~1 min`): `npm run dev` and open `http://localhost:3000`
4. **Optional**: `npm run test` for unit tests, `npm run lint` to enforce coding standards.

> Tip: No environment variables are required for local demo. Set `NEXT_PUBLIC_API_MOCKING=disabled` to bypass MSW when you connect a real API.

## Customize

- **Branding & theme**: Update design tokens in `app/globals.css` and Tailwind config; see `docs/theming.md`.
- **Navigation & layout**: Adjust shell components in `components/layout/*` (sidebar, header, breadcrumbs).
- **Data & validation**: Modify schemas in `lib/validators`, swap SWR hooks for your data fetching layer, and update mocks under `mocks/data`.
- **UI primitives**: Extend shadcn-style components in `components/ui` or generate new ones with the shadcn CLI.

## Mock API

- Development requests hit Next.js route handlers under `app/api` backed by JSON fixtures in `mocks/data`.
- MSW browser worker (`mocks/browser.ts`) mirrors the same handlers for component testing and story demos.
- Toggle behavior with `NEXT_PUBLIC_API_MOCKING` or by removing `<MockServiceWorker />` from the app shell when deploying with real services.

## FAQ

**How do I connect to a real backend?** Replace the fetchers in `lib/hooks/useData` with your client and point route handlers to your API or remove them entirely.

**Can I deploy this to Vercel or another host?** Yes—run `npm run build` then deploy. The project uses standard Next.js build output.

**How do I add new locales or copy?** Duplicate resource files in `locales/` and wire them into your pages/components via the i18n helpers in `lib/i18n`.

**Is authentication production-ready?** The auth screens ship with mock handlers. Plug in your auth provider (Cognito, Auth0, custom) by replacing `app/api/auth/route.ts` and wiring the forms to your endpoints.

## Changelog

### 1.0.0 — 2025-09-21

- Initial buyer-ready release with refreshed README, quick-start instructions, and FAQ
- Added structured documentation for demo, features, setup, customization, and mock API usage
- Documented v1 component set (dashboard, users, forms, settings, auth) and tooling baseline

---

Need implementation details beyond the README? Check the `/docs` folder for component API, forms, and theming guides.

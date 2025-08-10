# Next.js Admin Dashboard Template

Modern admin dashboard template built with the App Router in Next.js, using TypeScript and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Kit:** [shadcn/ui](https://ui.shadcn.com)
- **Forms:** React Hook Form + Zod
- **Tables:** TanStack Table
- **Charts:** Chart.js via react-chartjs-2
- **Theming:** next-themes (light/dark)
- **State (lightweight):** React Context (optionally Zustand)
- **Mock API:** Next.js Route Handlers and/or MSW (dev only)
- **Icons:** lucide-react
- **Quality:** ESLint + Prettier

## Principles

- MVP scope only (6–8 screens, 10–15 atoms/molecules)
- Shipping > Perfection. Batch updates quarterly.
- Everything documented. 10-minute time-to-value for buyer.

## Features (MVP)

- Dashboard with KPI cards, charts and recent activity
- Users page showcasing sortable tables and pagination
- Example forms with validation and toast feedback
- Authentication pages for Login, Register and Forgot Password flows
- Settings page with profile fields and theme toggle
- Sidebar navigation with icons and logout action
- Reusable components such as Header, Breadcrumbs, DataTable, ConfirmModal and Toasts
- Mock API routes for quick integration

## Getting Started

```bash
npm install
npm run dev
```

> The template ships with mock API routes under `app/api/*`. Replace them with your own backend as needed.

## Project Structure

```
root/
  app/
    layout.tsx
    page.tsx
    (auth)/
      layout.tsx
      login/page.tsx
      register/page.tsx
      forgot-password/page.tsx
    dashboard/page.tsx
    users/page.tsx
    forms/page.tsx
    settings/page.tsx
    api/
      users/route.ts
      stats/route.ts
      auth/route.ts
  components/
    layout/
    ui/
    data-table/
    charts/
    feedback/
    common/
  contexts/
  lib/
  mocks/
  public/
  styles/
  tailwind.config.js
  next.config.js
  tsconfig.json
  README.md
  LICENSE
```

## License

Released under the MIT License.

# Creating a New Page

Use this checklist whenever you add a route inside the admin dashboard. It mirrors the manual steps already used across the repository so you can stay consistent without scaffolding scripts.

## Quick Checklist

1. Duplicate `app/blank/page.tsx` into `app/<your-route>/page.tsx` and adjust the slug.
2. Replace the placeholder copy in the new file while keeping the `PageLayout` wrapper.
3. Decide whether the page can stay a server component. If it only needs to fetch data, remove the `"use client"` directive and
   pass the results into a client wrapper (see the Dashboard route for an example).
4. Add a navigation item in `constants/nav.ts` for the new page.
5. Provide translations for the navigation label and page copy in every file under `locales/`.
6. Drop in UI blocks from `components/` or the examples under `app/examples/`.
7. Connect data through hooks in `lib/hooks/` or by creating route handlers under `app/api/`.
8. Verify the page renders, navigation is updated, and localization works in each language.

## 1. Create the route file

Routes in the App Router map to folders under `app/`. Create a new directory and copy the blank template to inherit the standard layout:

```bash
cp app/blank/page.tsx app/reports/page.tsx
```

Open the new file and tweak the metadata and content. Keep the `PageLayout` wrapper so you get breadcrumbs, responsive spacing, and the actions slot for free:

```tsx
"use client";
import PageLayout from "@/components/layout/PageLayout";
import { useLocale } from "@/contexts/LocaleProvider";

export default function ReportsPage() {
  const { t } = useLocale();
  return (
    <PageLayout
      title={t("reports.page.title", "Reports")}
      description={t(
        "reports.page.description",
        "Review performance metrics and export summaries.",
      )}
    >
      <section className="section-container">
        {/* Replace this block with your layout or components */}
      </section>
    </PageLayout>
  );
}
```

> ℹ️ If the page only needs to fetch data and render static UI, drop the `"use client"` directive and fetch inside the server component instead. Pass the results to a smaller client wrapper when you need interactivity or RTK Query hooks. The Dashboard route (`app/dashboard/page.tsx` + `components/dashboard/DashboardPageClient.tsx`) showcases this split and keeps the initial payload lean.

## 2. Register the page in the sidebar

Navigation is fully driven by `NAV_SECTIONS` in [`constants/nav.ts`](../constants/nav.ts). Append a new item under the `main` section so the sidebar and breadcrumbs pick it up:

```ts
{
  key: "reports",
  titleKey: "navigation.items.reports",
  href: "/reports",
  icon: FileText,
},
```

Keep the `key` unique and align it with the slug. Icons come from `lucide-react`; see the existing imports at the top of the file for inspiration.

## 3. Add translation strings

Every locale file under [`locales/`](../locales) exports a flat object. Define your navigation label under `navigation.items` and the page copy under a namespaced key that matches your page:

```ts
// locales/en.ts
reports: {
  page: {
    title: "Reports",
    description: "Review performance metrics and export summaries.",
    empty: "No reports generated yet.",
  },
},
```

Repeat the same structure in `locales/es.ts`, `locales/fr.ts`, and `locales/ru.ts`. Leaving fallback strings inside `t()` calls is fine during development, but committed code should include localized values.

## 4. Assemble the layout

Re-use the building blocks that are already styled:

- `section-container`, `grid-container`, and heading utility classes are defined in [`app/globals.css`](../app/globals.css).
- High-level layout primitives live under [`components/layout`](../components/layout) (breadcrumbs, page headers, sidebar shell).
- Common UI widgets (`Button`, `Input`, `Select`, `Dialog`, etc.) are available in [`components/ui`](../components/ui).
- Reference-ready compositions (charts, cards, forms) are showcased under [`app/examples`](../app/examples); copy the JSX you need and wire it with your data.

## 5. Hook up data (optional)

For asynchronous data, start with the shared utilities:

- [`lib/apiSlice`](../lib/apiSlice.ts) contains RTK Query endpoints and hooks for fetching and caching API data.
- [`app/api`](../app/api) contains route handlers powered by the JSON fixtures in [`mocks/data`](../mocks/data). Clone an existing handler if you need quick mock endpoints.
- [`lib/validators.ts`](../lib/validators.ts) provides Zod schemas you can extend to keep forms and APIs in sync.

## 6. Smoke-test the page

Run through this short QA loop before committing:

- Load the page in the browser and confirm breadcrumbs show the new label.
- Toggle the language from the header to ensure localized strings resolve.
- Check the responsive layout at narrow and wide breakpoints.
- Run `npm run lint` and `npm run test` if you touched shared components or logic.

Keeping these steps in sync with the rest of the documentation ensures the project stays approachable even without a dedicated scaffolding CLI.

# Component Catalogue

This guide explains how the reusable pieces of the dashboard fit together and which props they expect. Components are grouped by feature area so you can quickly discover what to import when assembling new pages.

## Directory Map

- [`components/layout`](../components/layout): shell primitives such as the sidebar, header, breadcrumbs, and page wrapper.
- [`components/ui`](../components/ui): low-level inputs and buttons that expose native HTML props with Tailwind styling.
- [`components/data-table`](../components/data-table): TanStack Table wrappers used on the Users screen.
- [`components/forms`](../components/forms): form sections composed around `react-hook-form` registries.
- [`components/dashboard`](../components/dashboard) and [`components/examples`](../components/examples): pre-built cards, charts, and composite blocks used for demos. Dashboard-specific wrappers often split heavy widgets into client and server layers to keep the initial payload small.
- [`components/feedback`](../components/feedback): notification helpers (`ToasterProvider`) wired to Sonner.

## Layout primitives

### `PageLayout`

Location: [`components/layout/PageLayout.tsx`](../components/layout/PageLayout.tsx)

```tsx
<PageLayout
  title="Customers"
  description="Monitor growth and engagement."
  actions={<Button className="btn-primary">Export</Button>}
>
  <section className="section-container">{/* page content */}</section>
</PageLayout>
```

Props:

| Prop                | Type                | Description                                                                     |
| ------------------- | ------------------- | ------------------------------------------------------------------------------- |
| `title?`            | `string`            | Optional page heading rendered as `<h1>`.                                       |
| `description?`      | `string`            | Supporting text under the title.                                                |
| `actions?`          | `ReactNode`         | Slot aligned to the right of the header (buttons, filters, etc.).               |
| `breadcrumbs?`      | `ReactNode \| null` | Custom breadcrumbs element. Pass `null` to hide. Defaults to `<Breadcrumbs />`. |
| `className?`        | `string`            | Extra classes for the outer wrapper (`page-container`).                         |
| `contentClassName?` | `string`            | Classes applied to the content wrapper (`space-y-6` by default).                |

### `Breadcrumbs`

Location: [`components/layout/Breadcrumbs.tsx`](../components/layout/Breadcrumbs.tsx)

Automatically derives labels from the current pathname and links back to `/dashboard`. Translators can override the first crumb through `navigation.items.home` in the locale files.

Props: `{ className?: string }` to append styling classes.

### `Sidebar`

Location: [`components/layout/Sidebar.tsx`](../components/layout/Sidebar.tsx)

Renders navigation sections defined in [`constants/nav.ts`](../constants/nav.ts). Items inherit styles from the `.nav-item` and `.nav-item-active` utility classes in [`app/globals.css`](../app/globals.css). The component automatically:

- Filters items by `roles` (a simple example currently hardcodes the `admin` role).
- Highlights the active link based on the current pathname.
- Closes itself on mobile once a link is selected.
- Invokes `handleAction` for `type: "action"` entries (used by the mock logout button).

### `Header`

Location: [`components/layout/Header.tsx`](../components/layout/Header.tsx)

Displays the mobile sidebar toggle, localized product name, theme switcher, locale switcher, and account avatar menu. Hooks into `SidebarProvider` and `next-themes` so it requires both providers in the root layout (already configured in `app/layout.tsx`).

## UI primitives

These components forward refs and native HTML attributes, making them drop-in replacements for standard elements with consistent styling.

| Component      | Location                                                              | Notes                                                                                                                                    |
| -------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`       | [`components/ui/Button.tsx`](../components/ui/Button.tsx)             | Accepts semantic `variant` and `size` props while forwarding native button attributes and refs.                                          |
| `Input`        | [`components/ui/Input.tsx`](../components/ui/Input.tsx)               | Full-width text input with light/dark backgrounds. Works with `react-hook-form` because it forwards refs.                                |
| `Select`       | [`components/ui/Select.tsx`](../components/ui/Select.tsx)             | Styled `<select>` element. Accepts all native props.                                                                                     |
| `Checkbox`     | [`components/ui/Checkbox.tsx`](../components/ui/Checkbox.tsx)         | Uses the brand accent color and plays nicely with `register`.                                                                            |
| `FormField`    | [`components/ui/FormField.tsx`](../components/ui/FormField.tsx)       | Associates a label, description, validation state, and live error with one input/select control.                                         |
| `Switch`       | [`components/ui/Switch.tsx`](../components/ui/Switch.tsx)             | Styled checkbox switch that works with standard `checked`/`onChange` props.                                                              |
| `Dialog`       | [`components/ui/Dialog.tsx`](../components/ui/Dialog.tsx)             | Accessible modal portal with title/description associations, focus trap/restore, Escape, scroll lock, and configurable overlay behavior. |
| `DropdownMenu` | [`components/ui/DropdownMenu.tsx`](../components/ui/DropdownMenu.tsx) | Triggered popup with expanded state, outside-interaction close, and Escape focus restore.                                                |
| `Tabs`         | [`components/ui/Tabs.tsx`](../components/ui/Tabs.tsx)                 | Horizontal tabs; pass a `tabs` array (`{ id, label, content }`) and let the component manage the active state.                           |
| `Toggle`       | [`components/ui/Toggle.tsx`](../components/ui/Toggle.tsx)             | Button that flips an internal pressed state while still forwarding native click handlers.                                                |
| `Skeleton`     | [`components/ui/Skeleton.tsx`](../components/ui/Skeleton.tsx)         | Animated placeholder block for loading states.                                                                                           |

Each file exports a single component—inspect the source if you need additional variants or to adapt them to a design system.

## Chart wrappers

The chart implementations under [`components/charts`](../components/charts) are designed to load lazily because they depend on
`chart.js`, which is a large client-side bundle. Always import from [`components/charts/dynamic.tsx`](../components/charts/dynamic.tsx)
inside client components so Next.js can skip SSR and hydrate them only when necessary:

```tsx
import { LineChart, BarChart } from "@/components/charts/dynamic";

<LineChart data={series} label={t("dashboard.revenue.datasetLabel")!} />;
```

Each dynamic wrapper renders a `<Skeleton />` placeholder until the browser downloads the real chart code, preventing `chart.js`
from inflating the server-rendered HTML or delaying TTFB.

## Data table toolkit

The Users page relies on a small toolkit around TanStack Table located in [`components/data-table`](../components/data-table).

- **`DataTable`** wraps the entire experience: pagination, search, column visibility, and localized summary text. Configure it with `columns`, `data`, and optional `searchKey` / `searchKeys` for global filtering. Pair it with `useClientDataTable` (see [`RecentUsersTable`](../components/dashboard/RecentUsersTable.tsx) or [`app/users/page.tsx`](../app/users/page.tsx)) to lazy-load the bundle on the client while reusing the `TableSkeleton` placeholder.
- **`useClientDataTable`** loads the client-only table implementation inside a `useEffect`, preventing React from warning about state updates before mount and ensuring the skeleton renders until the table bundle is ready.
- **`useConfiguredTable`** centralizes table state (sorting, filtering, pagination) and wires localization placeholders. Import it directly if you need custom rendering with the same behavior.
- **`DataTableToolbar`** combines the search input and column visibility menu. Pass it a `table` instance, the current `filter` string, and the `onFilterChange` handler returned by `useConfiguredTable`.
- **`DataTableBody`** renders the table element, header groups, empty state, and row cells.
- **`Pagination`** renders the footer controls and page-size selector. `DataTable` injects localized labels from `useLocale()`.

Example usage:

```tsx
const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: t("users.table.columns.name") },
  { accessorKey: "email", header: t("users.table.columns.email") },
];

<DataTable
  columns={columns}
  data={users}
  searchKeys={["name", "email"]}
  initialPageSize={10}
/>;
```

## Form sections

Form-heavy screens compose small sections that expect `react-hook-form` registries. Each component accepts typed props to avoid prop drilling mistakes:

- [`BasicInfoSection`](../components/forms/BasicInfoSection.tsx) – text inputs, password strength meter, and helper text for errors.
- [`RoleStatusSection`](../components/forms/RoleStatusSection.tsx) – role select, status toggle, and active checkbox.
- [`SkillsSelector`](../components/forms/SkillsSelector.tsx) – multi-select with badge list driven by the `useSkillsFieldArray` hook.
- [`AddressSection`](../components/forms/AddressSection.tsx) – grouped address fields with state dropdown.
- [`NotificationsSection`](../components/forms/NotificationsSection.tsx) – switch controls for notification channels.
- [`AgreementSection`](../components/forms/AgreementSection.tsx) – checkbox consent and submit button slot.

Refer to [`app/forms/page.tsx`](../app/forms/page.tsx) for a complete example of how these sections collaborate with hooks in `lib/hooks` and constants from `constants/forms`.

## Feedback helpers

- [`components/feedback/ToasterProvider.tsx`](../components/feedback/ToasterProvider.tsx) wraps the Sonner `<Toaster />` component with sensible defaults (position, rich colors). Include it once in `app/layout.tsx` to enable toast notifications project-wide.

## Example gallery

The [`app/examples`](../app/examples) directory doubles as a living style guide: charts, cards, timelines, and form fragments. When designing a new screen, copy sections from here into your page and plug in real data or locale-aware text.

Use this catalogue in conjunction with the [new page checklist](creating-pages.md) to build consistent screens quickly.

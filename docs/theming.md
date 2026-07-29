# Theming & Styling

The dashboard ships with opinionated design tokens and utility classes so that new pages look consistent out of the box. This document shows where those tokens live and how to extend them safely.

## Color tokens

All brand colors are defined as CSS custom properties inside [`app/globals.css`](../app/globals.css). Update them to change the look of the entire app:

```css
:root {
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --accent: 240 4.8% 95.9%;
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --radius: 0.5rem;
}

.dark {
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
}
```

Use [HSL values](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl) so the Tailwind theme extension can reference them via `hsl(var(--token))`. Remember to touch both the light and dark sections when adjusting brand colors.

## Tailwind configuration

[`tailwind.config.mts`](../tailwind.config.mts) consumes the CSS variables above and extends spacing, typography, and animations:

- `content` includes `app`, `components`, `contexts`, and `lib` directories, so your classes compile no matter where JSX lives.
- `theme.extend.colors` maps semantic names (`primary`, `accent`, `card`, `success`, etc.) to the CSS tokens.
- `theme.extend.spacing` defines `spacing.header` and `spacing.sidebar` used inside layout components.
- `plugins` includes `@tailwindcss/forms` and `tailwindcss-animate` for better defaults.

To add a new semantic color or spacing token, extend the relevant object and reference the same `var(--token)` in `globals.css`.

## Utility classes

`app/globals.css` registers a set of component-level classes inside `@layer components` to avoid repeating Tailwind utilities:

- `.page-container` – consistent max-width and padding for every page.
- `.section-container` – card-like wrapper used around content sections.
- `.grid-container` – responsive gap defaults for dashboards.
- `.heading-*` – typography presets for headings.
- `.btn-*` – button variants (primary, secondary, outline, ghost, destructive, link).
- `.nav-item` / `.nav-item-active` – sidebar list styling.
- `.alert-*` – quick status banners (success, error, warning, info).

Use these classes in your pages instead of duplicating Tailwind strings. If you need a new variant, add it under the same layer so PurgeCSS picks it up automatically.

## Dark mode & toggles

Dark mode is powered by [`next-themes`](https://github.com/pacocoursey/next-themes). The provider is set up in `app/layout.tsx` via `ThemeProvider`, and the header toggles it with:

```tsx
const { theme, setTheme } = useTheme();
setTheme(theme === "dark" ? "light" : "dark");
```

Because all CSS variables have `.dark` overrides, components instantly adopt the new palette. When introducing brand colors, supply both light and dark values to avoid low-contrast states.

## Component-specific styling

- Layout components (`Sidebar`, `Header`, `PageLayout`) rely heavily on the utility classes above. Update `globals.css` if you need to tweak spacing globally.
- UI primitives in [`components/ui`](../components/ui) accept `className` overrides, so you can opt-in to a different variant on a per-use basis.
- Charts and cards inside [`components/dashboard`](../components/dashboard) use Tailwind utilities inline. Update them directly or extract a shared class into `globals.css`.

## Working with external themes

If you plan to load dynamic themes (e.g., from a design system or CMS):

1. Keep the CSS variable names stable and update only their values at runtime.
2. Consider exposing a `theme.json` file that exports an object of tokens which you merge into `:root` via inline styles.
3. Run `npm run lint` after large theme changes to catch unused class names or typos.

With these touchpoints you can rebrand the dashboard quickly without digging through every component.

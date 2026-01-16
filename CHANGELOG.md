# Changelog

## 1.1.0 — 2026-01-16

- Switched dashboard and users data fetching to RTK Query with a simplified `/api` base
- Removed SSR preloading of the Redux store to avoid hydration drift; client queries refetch on mount
- Cleaned out temporary debug logging and direct fetch probes used during migration

## 1.0.0 — 2025-09-21

- Initial buyer-ready release with refreshed README, quick-start instructions, and FAQ
- Added structured documentation for demo, features, setup, customization, and mock API usage
- Documented v1 component set (dashboard, users, forms, settings, auth) and tooling baseline

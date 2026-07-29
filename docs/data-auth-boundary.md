# Data and authentication boundary

`lib/server/services.ts` is the server-only composition boundary. Routes depend
on its `DashboardRepository`/`UserRepository` and `AuthService` interfaces, not
on JSON fixtures or a specific persistence vendor.

`APP_MODE` controls the implementation:

- `demo` (default) uses resettable in-memory data seeded from local fixtures
  and a demo auth service. It is appropriate only for the template preview.
- `real` deliberately has no fallback adapter. API routes return
  `503 REAL_MODE_NOT_CONFIGURED` until a persistence repository and an auth
  service are supplied.

Real adapters are registered once through `configureRealServices`. Route
handlers use the same composition boundary in both modes and do not contain
mode-specific short circuits.

The future real auth implementation must define session cookie or token
lifecycle, authorization by role, CSRF protection, rate limiting, and secrets
management before `APP_MODE=real` is enabled. Browser MSW remains fixture-only
and must never receive production secrets or PII.

# Этап 7: release readiness — 29 июля 2026

## Deploy smoke

Перед выпуском владелец проекта запускает:

```bash
npm ci
npm run check
npm run test:e2e:a11y
npm run test:e2e:smoke:production
```

`test:e2e:smoke:production` сначала собирает приложение, затем запускает
`next start` с `APP_MODE=demo` и `NEXT_PUBLIC_API_MOCKING=disabled`. Он
проверяет dashboard, users CRUD, validation формы, locale, theme и demo auth
через route handlers, не browser MSW.

## Security baseline

`next.config.js` добавляет production-only CSP, HSTS, anti-framing,
anti-MIME-sniffing, Referrer-Policy, Permissions-Policy и COOP. Перед новым
внешним API, CDN или iframe владелец проекта обязан обновить CSP и повторить
production smoke. CSP намеренно не применяется в dev: Next dev требует более
широкий runtime для HMR.

`npm audit --omit=dev` от 29 июля 2026 сообщает 3 high findings, затрагивающих
`next` через bundled PostCSS и Sharp. Предложенное npm исправление ведёт к
нерелевантному major downgrade до Next 9, поэтому оно не применяется. Владелец
проекта должен проверить следующий совместимый security release Next до любого
публичного deploy; до этого MVP остаётся локальным demo.

## Lighthouse baseline

Baseline для `/dashboard` сохранён в
[`lighthouse-dashboard-2026-07-29.json`](lighthouse-dashboard-2026-07-29.json).
Он снят 29 июля 2026 на локальном production build, Lighthouse 13.4.1 и
Chrome for Testing (Playwright Chromium 1234), desktop preset.

| Category | Score |
| --- | ---: |
| Performance | 99 |
| Accessibility | 99 |
| Best Practices | 92 |
| SEO | 100 |

FCP — 0.2 s, LCP — 0.8 s, TBT — 0 ms, CLS — 0.002. Это локальный baseline, а
не обещание production latency. Для повторения: собрать приложение, запустить
`next start` на `127.0.0.1:3101` с `APP_MODE=demo` и
`NEXT_PUBLIC_API_MOCKING=disabled`, затем вызвать Lighthouse с desktop preset,
четырьмя категориями и явным путём к Chrome/Chrome for Testing.

## Observability и privacy

| Область | Текущее решение | Владелец |
| --- | --- | --- |
| Error monitoring | Не подключён для demo; выбрать provider до первого публичного deploy. | Владелец проекта |
| Analytics | `SpeedInsights` — no-op; analytics выключена по умолчанию. | Владелец проекта |
| Consent/privacy | До включения analytics требуется privacy notice и consent, если это требует целевая юрисдикция. | Владелец проекта |
| Source maps | Public browser source maps выключены; provider-specific private upload — отдельная интеграция. | Владелец проекта |

## Migration notes и tag

- Runtime: Node 24.x и npm 11.x.
- Demo data хранится в памяти процесса; reset/restart очищает CRUD-изменения.
- Demo auth проверяет форму и не создаёт сессию; это не production auth.
- Рекомендуемый первый release tag после прохождения checklist: `v0.1.0`.

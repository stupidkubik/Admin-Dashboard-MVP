# Финальный аудит модернизации — 29 июля 2026

## Контекст

- Первично проверенный commit: `05062c6` (`main`).
- Fix-pass implementation: `376ce38`.
- Runtime: Node `24.18.0`, npm `11.16.0`.
- Проверка выполнялась на production build Next.js `16.2.12`.
- Первичный аудит был read-only; исправления и повторная проверка выполнены
  отдельным проходом.

## Итог

Итоговая реализация прошла release gate. Production build, unit/contract/
integration tests, полная Playwright matrix и production smoke без browser MSW
зелёные. Обнаруженные регрессии CRUD, shared demo-state, theme expectation,
heading hierarchy, autocomplete и favicon исправлены.

Performance-регрессий относительно baseline нет. После fix-pass Lighthouse
показывает 100/100/96/100; единственный оставшийся Best Practices finding —
обобщённый Chrome CSP inspector issue без заблокированных ресурсов.

## Выполненные проверки

| Проверка | Результат |
| --- | --- |
| `npm run check` | Успешно: format, lint, typecheck, Jest coverage, production build |
| Jest | 38 suites, 152 tests — passed |
| Coverage | 91.58% lines, 78.27% branches, 95.27% functions |
| `lib/apiSlice.ts` | 83.58% lines, 54.16% branches, 100% functions |
| Cross-browser release smoke | 10/10 passed, Chromium + WebKit |
| Production release smoke | 5/5 passed, browser MSW выключен |
| Полная Playwright matrix | 98/98 passed |
| Lighthouse fix-pass | Performance 100, Accessibility 100, Best Practices 96, SEO 100 |
| Real-mode API smoke | Все проверенные endpoints вернули ожидаемый структурированный 503 |
| `npm audit --omit=dev` | 3 high findings через bundled PostCSS и Sharp |

Route tests вызывают Next route handlers напрямую. MSW contract tests используют
настоящий HTTP interception через `setupServer`, а production Playwright smoke
запускает `next start` с `NEXT_PUBLIC_API_MOCKING=disabled`. Поэтому зелёные
результаты не являются только проверкой fixtures или замоканных функций.

## Findings

### P1 — созданный пользователь меняет позицию после refetch — исправлено

`apiSlice` оптимистично добавляет пользователя в начало списка, а
`InMemoryDashboardRepository` сохраняет его в конец. После invalidation и
refetch новая строка перемещается на вторую страницу таблицы: при 12 seed
users page size равен 10.

Из-за этого CRUD flow зависит от тайминга. Playwright успевает увидеть строку,
но иногда она исчезает до нажатия `Edit`. Проблема воспроизвелась и с одним
worker.

Repository и MSW теперь добавляют новые записи в начало, как и optimistic
cache. Route, MSW и `apiSlice` tests фиксируют этот порядок после refetch.

### P1 — Playwright projects разделяют изменяемый demo-state — исправлено

`fullyParallel: true` запускает CRUD и visual suites против одного singleton
in-memory repository. Изменения одного project попадают в screenshots другого,
а дополнительные записи влияют на pagination.

Подтверждение: общий `npm run test:e2e` дал 14 падений, а изолированный
`npm run test:e2e:visual` — 40/40.

Mutating release projects выполняются последовательно, CRUD начинает с
`/api/demo/reset` и ждёт реальные POST/PUT/DELETE responses. Read-only
accessibility/visual projects запускаются только после release-smoke.

### P2 — theme smoke предполагает только light initial state — исправлено

Тест после одного клика всегда ожидает класс `dark`. В projects с
`colorScheme: "dark"` корректным результатом переключения является `light`,
поэтому все dark-варианты этого сценария падали. Ожидание теперь вычисляется из
начальной настройки project.

### P2 — низкое покрытие client data lifecycle — исправлено

Общий coverage threshold проходит, но `lib/apiSlice.ts` покрыт только на
10.44% lines и 3.57% functions. Optimistic update, refetch ordering и rollback
были без целевых integration tests — именно в этой области обнаружена
регрессия CRUD. Добавлены проверки validated stats response, create/refetch
ordering, update/delete cache lifecycle и rollback после rejected create.

### P2 — нарушение heading hierarchy — исправлено

Lighthouse обнаружил переход от основного `h1` непосредственно к `h3`
(`Revenue Trend`). Основные dashboard sections переведены на `h2`; отдельный
axe test фиксирует последовательную иерархию.

### P2 — неполный CI release gate — исправлено

CI запускал WCAG matrix и только `chromium-desktop-light` release smoke.
Теперь CI проверяет format, cross-browser release smoke, production smoke и
visual matrix на macOS.

### P3 — документационные расхождения — исправлено

- Этапы 0–3 были реализованы, но оставались незакрытыми в checkbox-списке
  roadmap.
- `docs/components.md` описывал удалённый `useClientDataTable`.

## Performance

Повторный Lighthouse снят на локальном production build с теми же параметрами,
что и baseline.

| Metric | Baseline | Первичный аудит | Fix-pass |
| --- | ---: | ---: | ---: |
| Performance | 99 | 100 | 100 |
| Accessibility | 99 | 99 | 100 |
| Best Practices | 92 | 92 | 96 |
| SEO | 100 | 100 | 100 |
| FCP | 226 ms | 214 ms | 221 ms |
| LCP | 819 ms | 629 ms | 642 ms |
| TBT | 0 ms | 0 ms | 0 ms |
| CLS | 0.0019 | 0.0019 | 0.0019 |
| Speed Index | 748 ms | 509 ms | 483 ms |
| Transfer size | 427,232 B | 427,830 B | 422,560 B |

Lighthouse оценивает потенциально неиспользуемый JavaScript примерно в 97 KiB,
но текущий performance score остаётся 100. Это optimization backlog, а не
release blocker.

Локальный production build больше не делает 404-запросов и не пишет ошибок в
console: metadata route `/icon.svg` заменил отсутствующий favicon. Best
Practices остаётся на 96 только из-за зафиксированного Chrome CSP inspector
issue.

## Проверка опубликованного production

Проверен deployment:

- alias: `https://admin-dashboard-mvp-three.vercel.app`;
- deployment: `dpl_EVAtyRCFBLDKBh64AWRSP5j7EJ5K`;
- Vercel status: `Ready`;
- target: `production`.

В чистой browser-сессии `/dashboard` полностью загрузил route data и charts.
Console после начальной загрузки, переключения locale/theme и открытия
`/users`, `/forms`, `/settings`, `/auth/login` не содержит `error`, `warn` или
обычных log-сообщений.

На момент первичного аудита Lighthouse непосредственно против опубликованного
URL обнаружил одну network console error:

```text
GET https://admin-dashboard-mvp-three.vercel.app/favicon.ico — 404
```

Vercel runtime logs за час первичной проверки:

- `error`: 0;
- `warning`: 0;
- HTTP 5xx: 0;
- HTTP 4xx: 8, все запросы относятся к `/favicon.ico` или `/favicon.png`.

`/api/stats` и `/api/users` на production отвечают `200` с валидным
documented envelope.

Chrome также фиксирует общий CSP inspector issue без детализированных
sub-items. Он снижает Best Practices до 92 вместе с favicon 404, но в текущем
прогоне не сопровождается заблокированными API, scripts или styles.

### Разбор лога из пользовательского Chrome

Дополнительно разобран экспорт
`admin-dashboard-mvp-three.vercel.app-1785360884335.log`: 873 строки,
33,929 bytes.

| Группа | Количество | Источник |
| --- | ---: | --- |
| `IN_PAGE_CHANNEL_NODE_ID ... not found` | 29 | Browser extension, injected `inpage.js` |
| `Fetch finished loading` | 24 | Verbose Chrome network info, не ошибка |
| Password autocomplete warning | 4 | Приложение: две уникальные формы, каждая записана дважды |
| Async message channel closed | 1 | Browser extension messaging |

29 основных ошибок не принадлежат application bundle. Их stack traces целиком
идут через injected `inpage.js`, `ProvidersManager` и adapters для Ethereum,
Solana, Tron, Cosmos и Bitcoin. Таких модулей и browser messaging API в
репозитории нет. В чистой browser-сессии эти ошибки не воспроизводятся.

Сообщение на `/settings`:

```text
A listener indicated an asynchronous response by returning true,
but the message channel closed before a response was received
```

также является типичной ошибкой lifecycle браузерного расширения: приложение
не использует `chrome.runtime`, `browser.runtime`, `sendMessage` или
`onMessage`.

Не следует ослаблять production CSP ради injected wallet scripts. Для
подтверждения достаточно открыть сайт в Chrome Incognito без extensions либо
отключить site access у crypto-wallet extension.

Единственная подтверждённая проблема приложения в этом Chrome-логе была —
отсутствующий `autocomplete="new-password"` у полей
`registration-password` и `registration-confirm-password`. Она не ломает
submit, но ухудшает работу password managers и создаёт четыре console warnings
при повторном открытии `/forms`. Поля формы и auth routes теперь используют
корректные `name`, `email`, `username`, `current-password`, `new-password`,
`tel` и `bday` tokens.

## Security и production boundary

Production headers включают CSP, HSTS, anti-framing, MIME sniffing protection,
Referrer-Policy, Permissions-Policy и COOP.

В `APP_MODE=real` endpoints `/api/stats`, `/api/users`, `/api/auth` и
`/api/demo/reset` вернули:

```json
{
  "error": {
    "code": "REAL_MODE_NOT_CONFIGURED",
    "message": "Real mode is not configured"
  }
}
```

Это подтверждает, что demo fixtures не используются как fallback real mode.

Три high findings `npm audit` приходят через зависимости Next.js от PostCSS и
Sharp. Автоматически предложенный audit fix выполняет нерелевантный downgrade,
поэтому перед публичным deploy следует дождаться или выбрать совместимый
security release Next, а не применять `npm audit fix --force`.

## Остаточный риск

- Три upstream high findings `npm audit` документированно приняты до
  совместимого security release Next.js; `npm audit fix --force` применять
  нельзя из-за предлагаемого downgrade.
- CSP inspector issue остаётся предметом отдельного hardening-прохода: он не
  сопровождается console errors, нарушениями Lighthouse CSP audit или
  заблокированными ресурсами.
- Исправления favicon/autocomplete появятся на опубликованном production после
  следующего deploy; текущая проверка fix-pass выполнена на локальном
  production build.

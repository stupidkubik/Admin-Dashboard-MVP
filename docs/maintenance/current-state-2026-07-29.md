# Техническая ревизия — 2026-07-29

## Резюме

Проект **собирается, проходит ESLint и все имеющиеся Jest-тесты**, поэтому его
можно считать работоспособным как локальную демонстрацию. До заявления
«production-ready» не хватает чистой отдельной TypeScript-проверки, проверки
реального браузерного сценария, валидации API и определённой модели
аутентификации/хранения данных.

Основной риск сейчас не в падении сборки, а в ложном ощущении защищённости:
сборка проверяет production-код, тогда как отдельный `tsc` находит ошибки в
тестах; CI запускает только Jest; mock API принимает произвольные данные и
хранит изменения исключительно в памяти процесса.

## Проверенный baseline

| Проверка                  | Результат | Наблюдение                                 |
| ------------------------- | --------- | ------------------------------------------ |
| `npm test -- --runInBand` | PASS      | 24 suites, 128 tests                       |
| `npm run lint`            | PASS      | 0 warnings при `--max-warnings=0`          |
| `npx tsc --noEmit`        | FAIL      | 5 ошибок типов в трёх тестовых файлах      |
| `npm run build`           | PASS      | Next.js 16.2.6, сгенерированы 16 маршрутов |
| `npm audit --omit=dev`    | BLOCKED   | registry вернул HTTP 403                   |
| `npm outdated --long`     | BLOCKED   | registry вернул HTTP 403                   |

Дополнительные наблюдения окружения:

- npm предупреждает об устаревающей настройке `http-proxy`;
- Browserslist сообщает, что `caniuse-lite` не обновлялся 7 месяцев;
- `next build` автоматически предлагает/вносит настройки TypeScript для
  современного bundler resolution — конфигурацию нужно обновить осознанно
  отдельным изменением;
- в `package.json` нет зафиксированного диапазона Node.js/npm, хотя README
  обещает поддержку Node.js 18+.

## Что уже устроено хорошо

- Есть App Router, route-level loading/error/not-found состояния и разделение
  UI на небольшие компоненты.
- Данные dashboard/users централизованы в RTK Query; реализованы loading,
  empty, error и optimistic update сценарии.
- Формы используют React Hook Form + Zod, таблицы — TanStack Table.
- Присутствуют четыре локали, тема, базовая клавиатурная/ARIA-разметка в части
  UI-примитивов и skip-link.
- Unit/component tests покрывают fetcher, validators, contexts, MSW, таблицу и
  часть UI-компонентов.
- Production build успешно пререндерит статические страницы и собирает API
  handlers без ошибок.

## Findings по приоритету

### P0 — восстановить достоверный quality gate

1. **Отдельная TypeScript-проверка красная.** Ошибки находятся в
   `SettingsSidebar.test.tsx`, `fetcher.test.ts` и `browser.test.ts`: неверные
   mock-типы Lucide, неполный `__NEXT_DATA__`, небезопасное приведение к
   `Request`, устаревшие `@ts-expect-error`. Jest и production build это не
   обнаруживают одновременно.
2. **CI не воспроизводит заявленный baseline.** Workflow запускается только на
   `push`, использует `npm install`, не фиксирует версию Node и выполняет лишь
   `npx jest --coverage`. Нет `npm ci`, lint, typecheck, build и pull-request
   trigger.
3. **Матрица версий рассинхронизирована.** Runtime использует Next 16.2.6, а
   `eslint-config-next` остаётся на 15.5.3; README всё ещё описывает Next 15.x.
   Совместимость нельзя считать подтверждённой одним успешным lint run.

### P1 — контракт и безопасность mock API

1. `POST /api/auth` не аутентифицирует пользователя: он возвращает тело
   запроса вместе с фиксированным id. Это приемлемо только как явно
   промаркированный demo-stub; handler также объявлен `force-static`, хотя
   обрабатывает POST с динамическим телом.
2. CRUD handlers передают `req.json()` напрямую в data layer. Сервер не
   проверяет Zod-схемой форму, размер/тип тела, неизвестные поля или
   некорректный JSON. Клиентская валидация не является границей доверия.
3. Нет authorization, CSRF-стратегии, rate limiting и security headers. При
   подключении реального backend нельзя сохранять текущие handlers как
   production API.
4. Ошибки parsing/validation превращаются в неструктурированный 500, а формат
   успешных ответов непоследователен (`GET` отдаёт массив, mutations — envelope
   с `ok`). Формальный API contract отсутствует.

### P1 — корректность данных и runtime

1. `usersDb` — изменяемая переменная уровня модуля. Данные исчезают при
   рестарте/cold start, могут различаться между инстансами и загрязнять
   последовательные запросы/тесты.
2. Создание пользователя строится как `{ id, ...payload }`, поэтому входной
   `payload.id` может перезаписать сгенерированный id. Объекты приводятся к
   `User` без проверки обязательных полей.
3. UI и MSW/route handlers дублируют поведение backend. Без contract tests они
   могут расходиться; режим development всегда запускает browser MSW и тем
   самым способен скрыть дефект настоящего route handler.
4. Locale на сервере всегда `DEFAULT_LOCALE`; cookie читается только после
   hydration. Метаданные и первый HTML не соответствуют сохранённой локали.

### P2 — архитектура и поддерживаемость

1. TypeScript работает с `strict: false` и `skipLibCheck: true`; в ключевых
   местах используются `any` и type assertions. Включать strict сразу для
   всего проекта рискованно — нужен поэтапный план.
2. Состояние распределено между RTK Query и React contexts, хотя README
   называет contexts «Zustand-ready». Наличие сразу Redux, contexts и
   заявленного Zustand создаёт неясную целевую архитектуру.
3. `UserFormModal` вручную реализует overlay вместо имеющегося Dialog primitive:
   не видны focus trap, Escape/overlay close, возврат фокуса и корректная
   dialog semantics.
4. В большом demo-слое (`examples/*`) есть отдельные визуальные паттерны и
   строки. Нужна граница между поддерживаемым template API и showcase-кодом,
   иначе объём регрессии растёт без понятной ценности.
5. README содержит расхождения: версия Next, обещание cookies на серверном
   старте, путь `lib/validators` вместо файла `lib/validators.ts`, упоминание
   `styles/`, которого нет в дереве проекта.

### P2 — тестовые пробелы

- Нет E2E/smoke теста навигации, CRUD, смены темы/локали и auth forms.
- Нет route-handler/contract tests для status codes и invalid payloads.
- Нет accessibility automation (axe) и проверок keyboard focus для dialog,
  dropdown, sidebar.
- Нет визуальной регрессии для светлой/тёмной темы и responsive layouts.
- Нет тестов production-like режима без browser MSW.
- Coverage загружается в CI, но локального threshold нет, поэтому badge не
  является quality gate.

## Границы этой ревизии

- Не проводились ручная кросс-браузерная проверка и Lighthouse-перезапуск.
- Не проверялись deployment, внешняя база данных и реальный auth provider — их
  в репозитории нет.
- Нельзя подтвердить отсутствие известных CVE или актуальность пакетов:
  security/outdated endpoints npm registry вернули 403.
- Успешная сборка не подтверждает production-семантику mock persistence,
  security или доступность UI.

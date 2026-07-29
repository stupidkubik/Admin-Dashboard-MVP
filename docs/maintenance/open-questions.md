# Серые зоны и вопросы для решения

Ответы следует фиксировать до соответствующего этапа roadmap. Рекомендуемый
формат: **решение → причина → последствия → дата/владелец**.

## Продукт и границы проекта

1. Это только публичный template/demo или база будущего production-продукта?
   — Это пет-проект для личного пользования и показа навыков в резюме.
2. Кто целевая аудитория: разработчик шаблона, заказчик демо или оператор
   реальной админки?
   — Давай ориентироваться на разработчиков шаблона.
3. Какие страницы входят в поддерживаемое ядро, а какие (`examples/*`, `blank`)
   можно считать showcase/архивом?
   — Поддерживаемое ядро: dashboard, users, forms, settings и auth.
     `examples/*` и `blank` остаются showcase: для них обязательны lint,
     typecheck и production build, но они не входят в критичные E2E flows и
     coverage threshold.
4. Нужно ли сохранять обещание «setup ≤10 минут» и какую среду оно покрывает?
   — Нет, это не обязательно

## Версии и совместимость

1. Какая LTS-версия Node является минимальной и какая используется в deploy?
   — Node 24.x LTS (минимальная и используемая версия).
2. Остаёмся на Next 16 или возвращаемся к согласованному baseline до следующего
   release? Решение принимается после сверки официальной compatibility matrix.
   — Да, остаемся на 16, используем актуальное ПО.
3. Какие браузеры действительно поддерживаются? Нужны ли Safari/iOS и старые
   enterprise Chromium?
   — Последние две версии Chrome и Safari. Старый enterprise Chromium не
     поддерживается.
4. Разрешены ли автоматические dependency PR и кто разбирает security alerts?
   — Это личный проект: автоматические dependency PR не нужны; security alerts
     разбирает владелец при плановых обновлениях.

## Данные и API

1. Должны ли CRUD-изменения переживать перезапуск dev server?
   — Нет. Изменения живут в памяти в рамках одного запуска сервера; для demo
     режима нужен явный reset.
2. Нужна ли демонстрационная SQLite/Prisma база или достаточно детерминированного
   in-memory repository с reset?
   — Можно без базы, это простое демо.
3. Какой response/error envelope должен стать публичным контрактом?
   — Успешный ответ: `{ data }`; ошибка: `{ error: { code, message, fields? } }`.
     Статусы 400/404/409/422 должны быть предсказуемыми.
4. Нужны ли pagination/filter/sort на сервере или объём данных останется малым?
   — Можно не делать, вряд ли будут реальные пользователи с большим потоком данных.
5. Кто является источником истины для mocks: OpenAPI, Zod schemas или fixtures?
   — Общие Zod-схемы request/response. Route handlers и MSW используют их;
     fixtures содержат только данные для demo.

## Authentication и security

1. Auth screens остаются визуальными заглушками или нужен реальный provider?
   — Пока остаются явно маркированным demo auth без реального provider.
2. Если real auth нужен, какой вариант предпочтителен: managed provider,
   Auth.js или собственный backend?
   — Решение отложено до появления реального deploy или пользователей. Тогда
     отдельно сравнить managed provider и Auth.js; собственный backend не нужен.
3. Какие роли и permissions нужны помимо строкового поля `role` у пользователя?
   — Достаточно ролей `admin`, `editor`, `viewer`; отдельная модель permissions
     не нужна.
4. Где будет размещён проект и кто отвечает за CSP, rate limiting, secrets и
   audit logging?
   — Проект существует только как MVP
5. Можно ли отправлять analytics/Speed Insights по умолчанию в demo template?
   — Нет. Speed Insights выключен по умолчанию и включается только переменной
     окружения для реального deploy.

## State и архитектура frontend

1. RTK Query уже решает server-state задачи. Есть ли реальная причина миграции
   на Zustand или достаточно убрать противоречивое упоминание из README?
   — RTK Query остаётся для server state; Zustand не нужен. Ephemeral UI state
     хранится локально или в context.
2. Нужен ли SSR/RSC prefetch для dashboard/users, или client fetching —
   осознанный компромисс против hydration complexity?
   — Client fetching — осознанный компромисс для основного template flow. RSC
     prefetch можно добавить позднее отдельным демонстрационным примером.
3. Нужна ли структура `/src`, если текущие aliases и ownership понятны?
   — Да, можно улучшить структуру.
4. Требуется ли полноценная locale routing (`/ru/...`) или достаточно cookie?
   — Достаточно cookie: locale синхронизируется с `html lang` и metadata.
     URL-маршруты `/ru/...` не требуются.
5. Переводятся ли validation messages и demo content, либо только shell/UI?
   — Переводятся UI и validation messages. Demo content остаётся нейтральным
     или английским.

## UX, доступность и качество

1. Какой стандарт принимается: WCAG 2.2 AA целиком или ограниченный demo scope?
   — Ограниченный WCAG 2.2 AA scope для ключевых flows: dashboard, users CRUD,
     forms, auth и overlays.
2. Нужна ли поддержка reduced motion и high contrast?
   — Поддержать `prefers-reduced-motion`. High contrast не требует отдельной
     темы, если этого не потребует дальнейшая работа с токенами.
3. Какие viewport/theme combinations входят в visual regression baseline?
   — Chrome и Safari; viewport `1280×800` и `390×844`; light и dark themes.
4. Нужны ли Storybook/Chromatic, либо catalogue page остаётся единственной
   витриной компонентов?
   — Пока нет: catalogue page, Jest и Playwright достаточно для template.
5. Какой минимальный coverage threshold полезен и не стимулирует пустые тесты?
   — После исходного измерения: 60% lines/functions и 50% branches для
     `components/ui`, `lib` и API. Showcase-код исключён.

## Definition of done для актуализации

Нужно выбрать измеримый финал. Предлагаемый минимум:

- clean install и все CI gates зелёные;
- npm audit разобран, high/critical findings отсутствуют или документированно
  приняты;
- пять ключевых E2E flows проходят без browser MSW и в demo режиме;
- API валидирует вход, demo/production boundaries явно разделены;
- README воспроизводим на чистой машине;
- accessibility и Lighthouse baseline пересняты с указанными URL, viewport и
  режимом сборки.

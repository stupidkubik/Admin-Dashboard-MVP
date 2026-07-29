# Серые зоны и вопросы для решения

Ответы следует фиксировать до соответствующего этапа roadmap. Рекомендуемый
формат: **решение → причина → последствия → дата/владелец**.

## Продукт и границы проекта

1. Это только публичный template/demo или база будущего production-продукта?
2. Кто целевая аудитория: разработчик шаблона, заказчик демо или оператор
   реальной админки?
3. Какие страницы входят в поддерживаемое ядро, а какие (`examples/*`, `blank`)
   можно считать showcase/архивом?
4. Нужно ли сохранять обещание «setup ≤10 минут» и какую среду оно покрывает?

## Версии и совместимость

1. Какая LTS-версия Node является минимальной и какая используется в deploy?
2. Остаёмся на Next 16 или возвращаемся к согласованному baseline до следующего
   release? Решение принимается после сверки официальной compatibility matrix.
3. Какие браузеры действительно поддерживаются? Нужны ли Safari/iOS и старые
   enterprise Chromium?
4. Разрешены ли автоматические dependency PR и кто разбирает security alerts?

## Данные и API

1. Должны ли CRUD-изменения переживать перезапуск dev server?
2. Нужна ли демонстрационная SQLite/Prisma база или достаточно детерминированного
   in-memory repository с reset?
3. Какой response/error envelope должен стать публичным контрактом?
4. Нужны ли pagination/filter/sort на сервере или объём данных останется малым?
5. Кто является источником истины для mocks: OpenAPI, Zod schemas или fixtures?

## Authentication и security

1. Auth screens остаются визуальными заглушками или нужен реальный provider?
2. Если real auth нужен, какой вариант предпочтителен: managed provider,
   Auth.js или собственный backend?
3. Какие роли и permissions нужны помимо строкового поля `role` у пользователя?
4. Где будет размещён проект и кто отвечает за CSP, rate limiting, secrets и
   audit logging?
5. Можно ли отправлять analytics/Speed Insights по умолчанию в demo template?

## State и архитектура frontend

1. RTK Query уже решает server-state задачи. Есть ли реальная причина миграции
   на Zustand или достаточно убрать противоречивое упоминание из README?
2. Нужен ли SSR/RSC prefetch для dashboard/users, или client fetching —
   осознанный компромисс против hydration complexity?
3. Нужна ли структура `/src`, если текущие aliases и ownership понятны?
4. Требуется ли полноценная locale routing (`/ru/...`) или достаточно cookie?
5. Переводятся ли validation messages и demo content, либо только shell/UI?

## UX, доступность и качество

1. Какой стандарт принимается: WCAG 2.2 AA целиком или ограниченный demo scope?
2. Нужна ли поддержка reduced motion и high contrast?
3. Какие viewport/theme combinations входят в visual regression baseline?
4. Нужны ли Storybook/Chromatic, либо catalogue page остаётся единственной
   витриной компонентов?
5. Какой минимальный coverage threshold полезен и не стимулирует пустые тесты?

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

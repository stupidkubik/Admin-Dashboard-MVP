# Этап 6: state, i18n и структура — 29 июля 2026

## Ownership состояния

| Вид состояния | Владелец | Правило |
| --- | --- | --- |
| Данные dashboard/users и mutations | RTK Query (`lib/apiSlice.ts`) | Единственный cache для server state; invalidation и optimistic updates живут рядом с endpoint. |
| Локальное взаимодействие страницы | Component state | Modal, filter, tab и menu не попадают в глобальный store. |
| UI, разделяемый между shell-компонентами | React context | `SidebarProvider`, `LocaleProvider` и theme provider владеют только соответствующим UI state. |

Zustand не добавляется: реальной категории состояния, которую не покрывают RTK
Query, local state или существующие contexts, нет.

## Locale flow

1. `app/layout.tsx` читает cookie `locale` на сервере и валидирует значение.
2. Валидная locale задаёт initial `<html lang>` и metadata до hydration.
3. `LocaleProvider` получает это значение, синхронизирует client cookie,
   localStorage и `document.documentElement.lang` после явной смены языка.
4. URL locale routing не используется; fallback для отсутствующей или
   некорректной cookie — `en`.

## Границы showcase

`examples/*` и `blank` остаются витриной, а не поддерживаемым product core.
Они обязаны проходить format, lint, strict typecheck и production build, но не
входят в critical E2E/a11y/visual smoke matrix или будущий coverage threshold.
Поддерживаемое ядро: dashboard, users, forms, settings и auth.

## Структура

Перенос в `/src` отложен: это отдельный механический PR после стабилизации,
без одновременного изменения import boundary или поведения.

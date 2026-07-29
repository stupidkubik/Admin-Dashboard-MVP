# Этап 1: dependency audit — 2026-07-29

## Выполнено

- Обновлены `next` и `eslint-config-next` с `16.2.6` / `15.5.3` до единого
  baseline `16.2.12`.
- Обновлены React до `19.2.8`, Tailwind до `4.3.3`, Lucide до `1.27.0`,
  jest-dom до `7.0.0` и совместимые patch/minor зависимости; обновлена база
  Browserslist без изменения browser targets.
- Удалены неиспользуемые прямые зависимости: `autoprefixer`,
  `baseline-browser-mapping`, `@types/testing-library__jest-dom` и
  `@vercel/speed-insights`.

## Audit result

`npm audit --omit=dev` больше не находит исходные advisories для Next
`<16.2.11`. Он всё ещё сообщает три high findings, поступающие только через
`next@16.2.12`: `postcss@8.4.31` и optional `sharp@0.34.5`.

На дату проверки `16.2.12` — последняя доступная stable-версия Next 16, а
`npm audit` не предлагает non-breaking обновление: его `fixAvailable` указывает
на нерелевантный downgrade до `next@9.3.3`. Поэтому findings приняты как
upstream residual risk до следующего security release Next; прямые зависимости
проекта не удерживают уязвимые версии.

## Внешние ограничения major updates

`eslint-config-next@16.2.12` транзитивно использует плагины, ограничивающие
ESLint до v9 и TypeScript до `<6.1`. Поэтому проект закреплён на последних
совместимых версиях `eslint@9.39.5` и `typescript@6.0.3`. Обновление до
ESLint 10 и TypeScript 7 намеренно отложено до выхода совместимого Next ESLint
config; принудительная установка создаёт peer dependency warnings.

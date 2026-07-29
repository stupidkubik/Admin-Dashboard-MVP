# План актуализации и рефакторинга

План построен как последовательность небольших PR. Следующий этап начинается
после прохождения exit criteria предыдущего; продуктовые развилки сначала
закрываются в [`open-questions.md`](open-questions.md).

## Сквозной принцип качества

Каждое изменение поведения сопровождается тестом на его ожидаемый результат и,
где применимо, на ошибку или регрессию. Coverage служит сигналом о непокрытых
ветвях, но не самоцелью: тесты должны проверять пользовательские flows,
контракты и доступность, а не детали реализации. Новый этап не закрывается,
если его критичные сценарии не автоматизированы на подходящем уровне
(unit, contract, integration или E2E).

## Этап 0. Зафиксировать воспроизводимый baseline — P0

**Цель:** любой PR получает одинаковый и честный сигнал качества.

- [x] Добавить `engines` и `.nvmrc`/`.node-version`, выбрать поддерживаемый Node.
- [x] Заменить CI install на `npm ci`, добавить `pull_request` trigger и cache.
- [x] Добавить scripts `typecheck`, `test:ci`, `check`.
- [x] Исправить 5 TypeScript-ошибок в тестах без подавления корректных типов.
- [x] Запускать в CI lint, typecheck, unit tests и production build.
- [x] Зафиксировать coverage threshold после измерения, не выбирая его вслепую.
- [x] Настроить отчёт coverage для изменяемого кода и исключить из него
      generated files, fixtures и showcase, не маскируя непокрытые ветви ядра.
- [x] Обновить TypeScript-настройки, которые требует Next 16, отдельным коммитом.

**Exit criteria:** чистая установка из lockfile и четыре зелёных независимых
шага: lint, typecheck, tests, build.

## Этап 1. Синхронизировать platform/toolchain — P0

**Цель:** убрать случайную смесь major-версий до функционального рефакторинга.

- [x] Повторить `npm outdated` и `npm audit` в окружении с рабочим registry.
- [x] Сверить официальный compatibility baseline Next/React/ESLint/Tailwind.
- [x] Выровнять `next` и `eslint-config-next`; обновлять major-пакеты отдельно.
- [x] Обновить Browserslist database и проверить изменение browser targets.
- [x] Удалить лишние/дублирующие зависимости после `npm ls` и поиска импортов.
- [x] Обновить README: реальные версии, prerequisite и существующие пути.
- [x] Подключить Dependabot/Renovate grouping и scheduled audit, если это нужно
      владельцу проекта.

**Exit criteria:** нет peer dependency warnings, audit разобран, README и
lockfile отражают проверенную матрицу.

## Этап 2. Формализовать demo API — P1

**Цель:** сделать mock boundary предсказуемой и безопасной для демонстрации.

- [x] Описать Zod-схемы request/response отдельно от UI-form schemas.
- [x] Ввести общий parser и единый `{ data }` / `{ error }` envelope.
- [x] Возвращать 400/404/409/422 предсказуемо; обработать malformed JSON.
- [x] Запретить клиенту задавать `id`, `createdAt` и неизвестные поля.
- [x] Добавить route/contract tests и прогнать одни fixtures против MSW и API.
- [x] Явно маркировать demo auth и исключить отражение произвольного body.
- [x] Убрать сомнительный `force-static` у auth POST.

**Exit criteria:** один документированный contract, одинаковое поведение MSW и
route handlers, негативные сценарии покрыты тестами.

## Этап 3. Определить data/auth boundary — P1

**Цель:** demo остаётся быстрым, но production integration не требует
переписывать UI.

- [x] Ввести интерфейсы `UserRepository` и `AuthService`.
- [x] Оставить in-memory adapter только в явном demo режиме и добавить reset.
- [x] Выбрать persistence/auth решения из списка открытых вопросов.
- [x] Для real mode определить session cookie/token lifecycle, authorization,
      CSRF и rate limiting.
- [x] Не смешивать реальные секреты/PII с browser MSW.

**Exit criteria:** режимы demo и real различимы конфигурацией и документацией;
страницы зависят от contract/service, а не от JSON fixtures.

## Этап 4. Укрепить UI и доступность — P1/P2

**Цель:** переиспользуемые primitives и предсказуемая клавиатурная навигация.

- [x] Перевести `UserFormModal` на существующий Dialog/Radix-compatible API.
- [x] Проверить labels, error associations, live regions и focus management.
- [x] Добавить axe checks для основных страниц и keyboard tests для overlays.
- [x] Свести цвета/spacing/typography к токенам `globals.css`; убрать локальные
      `gray-*`/`red-*`, где нужен semantic token.
- [x] Инвентаризировать повторяющиеся section/card/form patterns и выделять
      компонент только при двух и более реальных применениях.
- [x] Добавить responsive smoke screenshots для light/dark ключевых страниц.

**Exit criteria:** основные user flows проходят keyboard + automated a11y
checks; новые primitives не дублируют существующие.

Завершено 29 июля 2026: результаты, матрица и инвентаризация зафиксированы в
[`stage-4-ui-a11y-2026-07-29.md`](stage-4-ui-a11y-2026-07-29.md).

## Этап 5. Усилить типизацию постепенно — P2

**Цель:** прийти к strict TypeScript без большого небезопасного PR.

- [x] Заменить dictionary `Record<string, any>` на JSON value/key-safe типы.
- [x] Убрать `any` из generic table API и тестовых builders.
- [x] Заменить assertions данных JSON runtime-проверкой на границе.
- [x] Включать strict-флаги по одному: `noImplicitAny`, `strictNullChecks`, затем
      общий `strict`; фиксировать число ошибок до каждого шага.
  - [x] `noImplicitAny`: 4 ошибки до включения, 0 после исправлений.
  - [x] `strictNullChecks`: 1 ошибка до включения, 0 после исправления.
  - [x] `strict`: пробный `tsc --strict` прошёл без новых ошибок.
- [x] Решить, оставлять ли `skipLibCheck`, после выравнивания зависимостей:
      оставлен. Next 16 автоматически добавляет оба generated-glob (`.next/types`
      и `.next/dev/types`), которые конфликтуют при проверке declaration files;
      source-код всё равно проходит `strict` typecheck.

**Exit criteria:** `strict: true`, нет необъяснённых suppressions, внешние данные
валидируются до попадания в доменные типы.

## Этап 6. Упростить state/i18n и структуру — P2

**Цель:** один понятный владелец каждого вида состояния.

- [x] Зафиксировать решение RTK Query vs Zustand; не мигрировать ради тренда.
- [x] Оставить server cache в выбранном query layer, ephemeral UI state — в
      локальном state/context либо выбранном store.
- [x] Читать locale cookie на сервере и синхронизировать metadata/`html lang`.
- [x] Типизировать translation keys либо подключить минимальный i18n layer.
- [x] Решить судьбу `examples/*`; исключить архивный showcase из критического
      пути: обязательны lint, typecheck и build, но не критичные E2E flows и
      coverage threshold.
- [x] Перемещать код в `/src` только отдельным механическим PR после стабилизации,
      поскольку само перемещение не улучшает поведение; перенос отложен.

**Exit criteria:** архитектурная заметка описывает state ownership и i18n flow;
нет конфликтующих заявлений README и реализации.

## Этап 7. Release readiness — P2

- [x] Playwright smoke: dashboard load, users CRUD, form validation, locale,
      theme, auth demo.
- [x] Проверить production-like запуск с выключенным browser MSW.
- [x] Перезапустить Lighthouse и сохранить воспроизводимые параметры запуска.
- [x] Добавить security headers/CSP согласно выбранной deployment platform.
- [x] Проверить error monitoring, analytics consent/privacy и source maps.
- [x] Подготовить migration notes и новый changelog/release tag.

**Exit criteria:** задокументированный deploy smoke, E2E green, метрики и
security checklist имеют владельца.

## Не делать одним PR

- обновление всех major dependencies;
- включение strict вместе с переносом в `/src`;
- смену Redux на Zustand вместе с изменением API;
- production auth вместе с визуальным редизайном.

Такие сочетания затрудняют review, rollback и установление причины регрессии.

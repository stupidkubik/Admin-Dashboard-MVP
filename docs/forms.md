# Forms & Validation

The Forms demo (`/forms`) showcases how the project wires `react-hook-form`, Zod schemas, and reusable sections together. This guide captures the patterns so you can adapt them to new screens.

## Stack overview

- **Form state**: [`useForm`](https://react-hook-form.com/) from `react-hook-form` with the `zodResolver` helper.
- **Schemas & types**: [`userSchema` and helpers](../lib/validators.ts).
- **UI sections**: Components under [`components/forms`](../components/forms) render grouped fields and expect `register`, `errors`, and helper callbacks.
- **Feedback**: Sonner toasts via [`components/feedback/ToasterProvider`](../components/feedback/ToasterProvider.tsx).
- **Async helpers**: Hooks in [`lib/hooks`](../lib/hooks) add UX sugar such as password strength meters and field arrays.

## Bootstrapping a form

The default page is implemented in [`app/forms/page.tsx`](../app/forms/page.tsx). The snippet below highlights the recommended structure:

```tsx
const form = useForm<UserFormValues>({
  resolver: zodResolver(userSchema),
  defaultValues: {
    active: true,
    role: "viewer",
    notifications: { email: true, sms: false, push: true },
    skills: [],
    address: { country: "United States" },
  },
});

const {
  register,
  control,
  handleSubmit,
  formState: { errors },
} = form;
```

- `UserFormValues` is inferred from the Zod schema, keeping types in sync.
- `defaultValues` mirror the shape of the schema. Reuse them when building optimistic UI for your APIs.

## Section components

Each section encapsulates markup and validation hints. Pass only the pieces it needs:

| Component | Purpose | Required props |
| --- | --- | --- |
| `BasicInfoSection` | Name, email, password, phone | `register`, `errors`, `passwordStrength`, `onPasswordChange` |
| `RoleStatusSection` | Role select & status toggles | `register`, `errors` |
| `SkillsSelector` | Dynamic skills list with chips | `register`, `errors`, `skills`, `isSkillSelected` |
| `AddressSection` | Address fields and state dropdown | `register`, `errors`, `states` |
| `NotificationsSection` | Notification switches | `register` |
| `AgreementSection` | Terms checkbox + submit CTA | `register`, `errors` |

`errors` comes from `formState.errors` and is typed via `UserFormValues`, so TypeScript will complain if you ask for an unknown key.

## Custom hooks

Two hooks in [`lib/hooks`](../lib/hooks) support the example form but can be reused elsewhere:

- [`usePasswordStrength`](../lib/hooks/usePasswordStrength.ts) returns `{ strength, handlePasswordChange }`. Call `handlePasswordChange` inside the password field’s `onChange` handler to keep the meter in sync.
- [`useSkillsFieldArray`](../lib/hooks/useSkillsFieldArray.ts) wraps `useFieldArray` and exposes `fields`, `append`, `remove`, and a convenience `isSkillSelected` checker used by the chip list.

## Validation & localization

- All validation messages are defined in the schema (`lib/validators.ts`). Adjust them there so translations stay centralized.
- Display errors below fields using the `errors` map. Each section already renders the hint placeholder so you only need to pass `errors` down.
- Surface submit feedback with Sonner: `toast.success(t("common.messages.formSubmitted"))`. The locale keys live under `common.messages`.

## Submission patterns

Inside `handleSubmit`, either:

1. Post to an API route (see [`app/api/users/route.ts`](../app/api/users/route.ts)) and await the response.
2. Fire a toast and update cached data via RTK Query (e.g., invalidate tags or dispatch `apiSlice.util.updateQueryData` for optimistic updates).

Wrap async calls in `try/catch` and surface errors using the localized strings under `common.errors` or `common.messages`.

## Reusing the layout

To drop this form into another page:

1. Import the section components you need.
2. Reuse the same schema or compose a new one in [`lib/validators.ts`](../lib/validators.ts).
3. Keep the surrounding layout consistent with `<PageLayout>` and `.section-container` wrappers.
4. Update the translation keys under `forms.*` to reflect your wording.

Following this pattern keeps forms consistent across the dashboard and makes it easy to share validation logic between server handlers and client components.

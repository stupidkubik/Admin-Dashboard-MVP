# Demo API contract

The route handlers under `/api` and browser MSW handlers share the schemas in
`lib/api/contracts.ts`. This is a demo API: it has no authentication or
persistence guarantees.

## Envelope

Every successful response uses `{ "data": ... }`. Every error uses:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "fields": { "email": ["Invalid email address"] }
  }
}
```

`fields` is included only for validation failures.

## Endpoints

- `GET /api/users` → `{ data: User[] }`
- `POST /api/users` → `{ data: { user: User } }` (`201`)
- `PUT /api/users/:id` → `{ data: { user: User } }`
- `DELETE /api/users/:id` → `{ data: {} }`
- `GET /api/stats` → `{ data: DashboardStats }`
- `POST /api/auth` → `{ data: { user: { id, email }, demo: true } }`

User create accepts only `name`, `email`, `role`, `active`, and `createdAt`.
Update accepts a non-empty subset of those fields. Client-controlled `id` and
unknown fields are rejected.

## Status codes

- `400` — malformed JSON or a missing route id
- `404` — user does not exist
- `409` — email is already used by another user
- `422` — valid JSON that does not match the request schema

The auth endpoint is explicitly a demo stub. It validates credentials but does
not authenticate a user, create a session, or return the supplied password.

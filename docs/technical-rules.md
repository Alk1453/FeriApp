# FeriApp technical rules

These rules summarize the mandatory technical constraints from the product
documents.

## Architecture

- Keep one platform with multiple modules.
- Do not duplicate business logic between modules.
- Shared rules live in common layers under `src/shared`.
- Keep presentation, application, domain, and infrastructure concerns separate.
- External providers for maps, payments, social sharing, storage, and
  notifications must be wrapped by internal services before product code uses
  them.

## Territory and privacy

- Do not hardcode countries, provinces, cities, localities, or neighborhoods in
  business logic.
- Territory must be configurable data.
- Exact user location is private by default.
- Public location should be approximate: neighborhood, zone, radius, or
  estimated distance.

## Security

- Never trust the frontend for critical validation.
- Sensitive operations must validate identity, role, ownership, and resource
  state.
- Sensitive database tables must use Row Level Security, indexes, auditing, and
  integrity constraints.

## Code

- Use strict TypeScript.
- Keep functions small.
- Prefer reusable components and shared domain rules.
- Use Zod for runtime validation at boundaries.
- Add comments only when they provide context.
- Avoid unnecessary dependencies.

## Product fit check

Every new feature should answer yes to:

1. Does it favor proximity between people?
2. Does it reduce technical friction?
3. Can it scale to new regions?
4. Does it respect privacy?
5. Can it reuse existing components?
6. Does it add community value?

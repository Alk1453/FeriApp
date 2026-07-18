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
- Keep logistics as an independent module. Marketplace may request or suggest
  delivery, but logistics owns providers, transport modes, delivery proposals,
  delivery states, and logistics reputation.
- Keep sharing as a cross-cutting capability. Publications, profiles, virtual
  stalls, services, campaigns, and logistics requests may become shareable
  resources.

## Territory and privacy

- Do not hardcode countries, provinces, cities, localities, or neighborhoods in
  business logic.
- Territory must be configurable data.
- Exact user location is private by default.
- Public location should be approximate: neighborhood, zone, radius, or
  estimated distance.
- Never show an exact address by default in public views, social cards, links,
  screenshots, or generated share assets.

## Security

- Never trust the frontend for critical validation.
- Sensitive operations must validate identity, role, ownership, and resource
  state.
- Sensitive database tables must use Row Level Security, indexes, auditing, and
  integrity constraints.
- Do not claim absolute legal guarantees about professionals, companies,
  transport providers, or regulated services. Use precise validation labels such
  as identity confirmed, documentation presented, license reviewed, or company
  data reviewed.

## Code

- Use strict TypeScript.
- Keep functions small.
- Prefer reusable components and shared domain rules.
- Use Zod for runtime validation at boundaries.
- Add comments only when they provide context.
- Avoid unnecessary dependencies.
- Do not create opaque trust percentages. Visible trust indicators must be easy
  to explain.
- Do not require a virtual stall for simple low-risk publications.
- Do not require advanced documentation validation for basic low-risk
  publications.
- Do not implement payments, commissions, or route optimization before the
  corresponding vertical flow needs them.

## Product fit check

Every new feature should answer yes to:

1. Does it favor proximity between people?
2. Does it reduce technical friction?
3. Can it scale to new regions?
4. Does it respect privacy?
5. Can it reuse existing components?
6. Does it add community value?

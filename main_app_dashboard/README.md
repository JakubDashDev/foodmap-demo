# main_app_dashboard

The internal tool the content team uses to manage locations, reviews, and content creators — the
data the public map reads from.

Part of the [Foodmap](../README.md) project. Talks to `main_app_rails`'s `/dashboard/*` API; see
the [API README](../main_app_rails/README.md) for the auth model this app is built around.

## Stack

React 19 · TypeScript · Redux Toolkit / RTK Query · react-hook-form + Zod · React Router v8 ·
Tailwind CSS v4 · [Base UI](https://base-ui.com) for accessible primitives (dialogs, comboboxes) ·
Vite

## Architecture

```
src/
├── features/<domain>/     # api.ts (RTK Query endpoints) + types.ts, per domain
│   ├── api/                # shared axios client, RTK Query base setup, session refresh
│   ├── auth/, locations/, reviews/, content-creators/
├── components/
│   ├── app/<domain>/       # feature UI: forms, tables, search/sort controls
│   └── common/              # design-system primitives: Button, Modal, Input, Select, ...
├── pages/                    # route-level components, composed from components/app + hooks
├── hooks/                     # useQueryParam, useInfiniteScroll
├── routes.tsx                 # route tree + auth guards
└── store.ts
```

Every domain (`locations`, `reviews`, `content-creators`) follows the same shape: an
`injectEndpoints` slice in `features/<domain>/api.ts`, a page per list/create/edit view, and a form
component with a colocated Zod schema. Once you've read one, you've read all three.

### Session handling

Requests go through a custom axios-based RTK Query `baseQuery`
(`src/features/api/base-query.ts`). On a `401`, it triggers a single `/dashboard/refresh` call —
concurrent callers all await the _same_ in-flight promise (`src/features/api/session.ts`) instead
of each firing their own refresh — and retries the original request once. Route guards
(`ProtectedRoute` / `GuestRoute` in `routes.tsx`) sit on top of the same session query, so there's
one source of truth for "is anyone logged in."

## Running it

Via the [root README](../README.md)'s Docker Compose setup is the easiest path — it wires this up
to the API automatically. Standalone:

```bash
pnpm install
pnpm dev
```

The dev server proxies `/dashboard/*` to `main_app_rails` (see `vite.config.ts`) — you'll need that
running too. There's no self-serve sign-up, so an `AdminUser` needs to already exist in the
database to log in — see the [API README](../main_app_rails/README.md#demo-data) for creating one.

## Scripts

| Command                           |                                                |
| --------------------------------- | ---------------------------------------------- |
| `pnpm dev`                        | Start the Vite dev server on port 3100         |
| `pnpm build`                      | Type-check (`tsc -b`) and build for production |
| `pnpm lint`                       | ESLint                                         |
| `pnpm format` / `pnpm format:fix` | Prettier check / write                         |
| `pnpm preview`                    | Preview a production build locally             |

`pnpm lint` and `pnpm format` run in CI on every PR that touches this app.

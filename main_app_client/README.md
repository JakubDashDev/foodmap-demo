# main_app_client

The public app: a map of reviewed locations, clustered and filterable, with a modal that shows a
location's reviews and plays the source video. No login — everything here reads from
`main_app_rails`'s public `/api/*` endpoints.

Part of the [Foodmap](../README.md) project. See the [API README](../main_app_rails/README.md) for
the endpoints this app consumes.

## Stack

React 19 · TypeScript · [MapLibre GL](https://maplibre.org/) + [Supercluster](https://github.com/mapbox/supercluster)
for marker clustering · Redux Toolkit / RTK Query · React Router v8 · Tailwind CSS v4 · Vite

## Architecture

```
src/
├── features/
│   ├── api/                    # shared axios client, RTK Query base setup
│   ├── locations/, reviews/     # RTK Query endpoints + types
├── components/
│   ├── app/
│   │   ├── mapView/              # MapLibre instance, clustering, marker lifecycle
│   │   ├── locationModal/        # location detail, review list, video embed
│   │   └── reviews/               # review list/search/sort (shared between map + modal)
│   └── common/                     # design-system primitives
├── hooks/                            # useDebouncedValue, useQueryParam, useInfiniteScroll
└── pages/Home.tsx
```

No auth here — this app is read-only, so its RTK Query `baseQuery` is the simple version (no
refresh/retry logic; compare with the dashboard's `features/api/base-query.ts` if you're looking
at both).

### Notable pieces

- **`components/app/mapView/hooks/useClusterMarkers.ts`** — MapLibre markers are imperative DOM
  elements React doesn't track. This hook keys markers by cluster/location id, diffs against the
  previous render, and tears everything down on unmount, so panning the map doesn't leak listeners
  or leave stale markers behind.
- **`components/app/locationModal/youtube.ts`** — parses a review's source URL with `new URL()`
  and checks it against an explicit `youtube.com` / `youtu.be` allow-list before it's ever used to
  build an `<iframe src>`, pointed at `youtube-nocookie.com`. Anything that doesn't parse falls
  back to a plain link instead of an embed.
- **`hooks/useDebouncedValue.ts`** — the map's search box debounces before it both hits the API and
  suppresses the current viewport bounds filter (see `features/reviews/useReviews.ts`), so typing a
  search doesn't fight with "only show what's on screen."

## Running it

Via the [root README](../README.md)'s Docker Compose setup is the easiest path. Standalone:

```bash
pnpm install
pnpm dev
```

The dev server proxies `/api/*` to `main_app_rails` (see `vite.config.ts`) — you'll need that
running too; see its [README](../main_app_rails/README.md).

## Scripts

| Command                           |                                                |
| --------------------------------- | ---------------------------------------------- |
| `pnpm dev`                        | Start the Vite dev server on port 3000         |
| `pnpm build`                      | Type-check (`tsc -b`) and build for production |
| `pnpm lint`                       | ESLint                                         |
| `pnpm format` / `pnpm format:fix` | Prettier check / write                         |
| `pnpm preview`                    | Preview a production build locally             |

`pnpm lint` and `pnpm format` run in CI on every PR that touches this app.

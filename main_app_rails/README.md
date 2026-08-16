# main_app_rails

The API. One Rails app serving two clients: a public, read-only JSON API for the map client, and
an authenticated CRUD API the admin dashboard uses to manage locations, reviews, and content
creators.

Part of the [Foodmap](../README.md) project — see the root README for how this fits together with
the two frontends.

## Architecture

Controllers stay thin. Search, filtering, and pagination live in `app/services`; JSON shaping
lives in `app/serializers` (via [`oj_serializers`](https://github.com/ismasan/oj_serializers) for
fast, explicit output — no accidental over-serialization of model attributes).

```
app/
├── controllers/
│   ├── api/            # public, read-only: GET /api/*
│   └── dashboard/      # authenticated CRUD: /dashboard/*
├── services/
│   ├── auth/            # login, JWT issuance, refresh-token rotation
│   ├── locations/        # search + sort + paginate
│   ├── reviews/          # search + sort + paginate + map-bounds filter
│   └── content_creators/ # search + sort + paginate
├── serializers/          # one serializer per response shape, api/ vs dashboard/
└── models/                # Location, Review, ContentCreator, ReviewNote, AdminUser, RefreshToken
```

A `*::Index` service (pagination + shaping the response envelope) composes a `*::Query` service
(search + sort, returning an `ActiveRecord::Relation`) — keeping "how do we paginate" separate from
"how do we filter this specific resource."

## Data model

| Model | Notes |
|---|---|
| `Location` | A restaurant/spot: name, address, lat/lng, cuisine type. |
| `ContentCreator` | A YouTube/TikTok creator whose reviews are aggregated. |
| `Review` | Links a `Location` to a `ContentCreator`. `rating` is an enum (`avoid`, `worth_if_nearby`, `worth_a_detour`, `worth_a_special_trip`); `source_type` is `youtube` or `tiktok`. |
| `ReviewNote` | Free-text notes attached to a review, for internal dashboard use. |
| `AdminUser` / `RefreshToken` | Dashboard authentication — see below. |

## Authentication

The dashboard is protected by a short-lived JWT plus a rotating refresh token, both delivered as
`httponly`, `secure` (in production), `same_site: :strict` cookies — never exposed to JS, and not
attached on cross-site requests.

- **Access token**: a 15-minute JWT (`Auth::JsonWebToken`), carrying the admin user's UUID.
- **Refresh token**: a random 256-bit value; only its SHA-256 digest is stored
  (`RefreshToken#token_digest`). Every refresh (`Auth::RotateRefreshToken`) issues a new token in
  the same `family_uuid` and marks the old one used.
- **Reuse detection**: if a refresh token that's already used, or expired, is presented again —
  the signal that a token was stolen and replayed — the entire family is invalidated under a row
  lock (`RefreshToken.invalidate_family!`), logging out every session descended from it.

See `app/services/auth/` and `spec/services/auth/` for the implementation and the edge cases
(expiry, reuse, cross-family isolation) it's tested against.

## API surface

**`/dashboard/*`** — requires the auth cookie (all routes below except the first four):

| Method | Path | |
|---|---|---|
| `POST` | `/dashboard/login` | Email + password → sets auth cookies |
| `GET` | `/dashboard/me` | Current session |
| `POST` | `/dashboard/refresh` | Rotates the refresh token |
| `POST` | `/dashboard/logout` | Invalidates the refresh token family |
| `GET/POST` | `/dashboard/locations`, `/reviews`, `/content_creators` | List (paginated, searchable, sortable) / create |
| `GET/PATCH/DELETE` | `/dashboard/locations/:id`, `/reviews/:id`, `/content_creators/:id` | Read / update / delete |

**`/api/*`** — public, read-only:

| Method | Path | |
|---|---|---|
| `GET` | `/api/reviews` | Paginated, searchable, sortable, and filterable by map viewport (`sw_lat`/`sw_lng`/`ne_lat`/`ne_lng`) |
| `GET` | `/api/locations/:id` | A single location with all of its reviews |

## Running it

The simplest path is via the [root README](../README.md), which runs this alongside both
frontends and Postgres through Docker Compose.

To run it standalone:

```bash
bundle install
cp .env.example .env   # fill in JWT_SECRET_KEY, e.g. `openssl rand -hex 64`
bin/rails db:prepare
bin/rails server -p 3200
```

### Environment variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `JWT_SECRET_KEY` | Yes | — | Signs dashboard access tokens. |
| `DB_HOST` / `DB_PORT` | No | `localhost` / `5432` | |
| `DB_USERNAME` / `DB_PASSWORD` | No | `postgres` / *(empty)* | |
| `RAILS_MAX_THREADS` | No | `5` | DB connection pool size. |

`config/master.key` decrypts `config/credentials.yml.enc` (Rails' default `secret_key_base`,
which the encrypted auth cookies rely on) and is intentionally not committed. If you're setting
this repo up somewhere that doesn't already have it, generate a fresh pair — nothing else is
stored in credentials:

```bash
rm config/credentials.yml.enc
EDITOR="true" bin/rails credentials:edit
```

### Demo data

```bash
bin/rails db:seed
```

Loads a small set of real locations, two content creators, and reviews (`db/seeds.rb`) — enough to
see the map and dashboard populated. It doesn't create an `AdminUser`, since there's no self-serve
sign-up for the dashboard:

```bash
bin/rails runner 'AdminUser.create!(email: "admin@example.com", password: "change-me-please")'
```

## Testing

```bash
bundle exec rspec
```

Auth (login, JWT encode/decode, refresh rotation including reuse/expiry) has request- and
service-level coverage. The search/sort/pagination services don't yet — a natural next addition
would be request specs per resource covering empty search, an invalid `sort_by`, and page-size
clamping.

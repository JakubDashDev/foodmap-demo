# syntax=docker/dockerfile:1

ARG RUBY_VERSION=3.2.11
FROM ruby:${RUBY_VERSION}-slim AS base

WORKDIR /rails

# libpq5 = runtime Postgres client lib (needed by the `pg` gem at runtime).
# libvips = runtime image-processing lib (needed by the `image_processing` gem at runtime).
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y curl libjemalloc2 libpq5 libvips && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development:test"

# --- build stage: compiles native gem extensions, not needed at runtime ---
FROM base AS build

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential git libpq-dev pkg-config && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives

COPY Gemfile Gemfile.lock ./
RUN bundle install && \
    rm -rf ~/.bundle "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

COPY . .

RUN bundle exec bootsnap precompile app/ lib/

# --- final stage: just the app + installed gems, no build tools ---
FROM base

COPY --from=build "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build /rails /rails

RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R rails:rails db log storage tmp
USER rails:rails

ENTRYPOINT ["/rails/bin/docker-entrypoint"]

EXPOSE 3200
CMD ["./bin/rails", "server", "-p", "3200"]

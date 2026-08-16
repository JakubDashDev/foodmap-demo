import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { HiOutlinePlus } from 'react-icons/hi2'

import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Typography } from '@/components/common/Typography'
import { ContentCreatorsSearch } from '@/components/app/content-creators/ContentCreatorsSearch'
import { ContentCreatorsSort } from '@/components/app/content-creators/ContentCreatorsSort'
import { ContentCreatorsGrid } from '@/components/app/content-creators/ContentCreatorsGrid'
import type { ContentCreator, ContentCreatorSortOption } from '@/features/content-creators/types'
import { useContentCreatorsQuery } from '@/features/content-creators/api'
import { useQueryParam } from '@/hooks/useQueryParam'

export function ContentCreatorsPage() {
  const [search, setSearch] = useQueryParam<string>('search', '')
  const [sort, setSort] = useQueryParam<ContentCreatorSortOption>('sort', 'name-asc')
  const [page, setPage] = useState(1)
  const [contentCreators, setContentCreators] = useState<ContentCreator[]>([])

  const { data, isLoading, isFetching, isError } = useContentCreatorsQuery({
    query: search || undefined,
    sort_by: sort,
    page,
  })

  useEffect(() => {
    setPage(1)
  }, [search, sort])

  useEffect(() => {
    if (!data) {
      return
    }

    const mapped = data.data.map((contentCreator) => ({
      id: contentCreator.id,
      name: contentCreator.name,
      channelUrl: contentCreator.channel_url,
      avatarUrl: contentCreator.avatar_url,
      description: contentCreator.description,
      reviewCount: contentCreator.review_count,
    }))

    setContentCreators((previous) => (page === 1 ? mapped : [...previous, ...mapped]))
  }, [data, page])

  return (
    <Container>
      <Typography variant="h1">Content Creators</Typography>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[18rem_14rem]">
          <ContentCreatorsSearch value={search} onChange={setSearch} />
          <ContentCreatorsSort value={sort} onChange={setSort} />
        </div>

        <Button
          render={<Link to="/content-creators/new" />}
          leftIcon={<HiOutlinePlus className="size-4" />}
        >
          New Content Creator
        </Button>
      </div>

      <section className="mt-6">
        <ContentCreatorsGrid
          contentCreators={contentCreators}
          isLoading={isLoading}
          isError={isError}
          hasNextPage={Boolean(data?.meta.next_page)}
          isFetchingMore={isFetching}
          onLoadMore={() => {
            if (data?.meta.next_page) {
              setPage(data.meta.next_page)
            }
          }}
        />
      </section>
    </Container>
  )
}

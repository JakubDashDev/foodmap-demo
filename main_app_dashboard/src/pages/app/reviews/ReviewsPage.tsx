import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { HiOutlinePlus } from 'react-icons/hi2'

import { Button } from '@/components/common/Button'
import { Container } from '@/components/common/Container'
import { Typography } from '@/components/common/Typography'
import { ReviewsSearch } from '@/components/app/reviews/ReviewsSearch'
import { ReviewsSort } from '@/components/app/reviews/ReviewsSort'
import { ReviewsTable } from '@/components/app/reviews/ReviewsTable'
import type { Review, ReviewSortOption } from '@/features/reviews/types'
import { useReviewsQuery } from '@/features/reviews/api'
import { useQueryParam } from '@/hooks/useQueryParam'

export function ReviewsPage() {
  const [search, setSearch] = useQueryParam('search', '')
  const [sort, setSort] = useQueryParam<ReviewSortOption>('sort', 'published_at-desc')
  const [page, setPage] = useState(1)
  const [reviews, setReviews] = useState<Review[]>([])

  const { data, isLoading, isFetching, isError } = useReviewsQuery({
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

    const mapped = data.data.map((review) => ({
      id: review.id,
      sourceUrl: review.source_url,
      sourceType: review.source_type,
      rating: review.rating,
      publishedAt: review.published_at,
      locationName: review.location_name,
      contentCreatorName: review.content_creator_name,
    }))

    setReviews((previous) => (page === 1 ? mapped : [...previous, ...mapped]))
  }, [data, page])

  return (
    <Container>
      <Typography variant="h1">Reviews</Typography>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[18rem_14rem]">
          <ReviewsSearch value={search} onChange={setSearch} />
          <ReviewsSort value={sort} onChange={setSort} />
        </div>

        <Button render={<Link to="/reviews/new" />} leftIcon={<HiOutlinePlus className="size-4" />}>
          New Review
        </Button>
      </div>

      <section className="mt-6">
        <ReviewsTable
          reviews={reviews}
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

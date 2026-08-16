import { useEffect, useState } from 'react'
import type { BBox } from 'geojson'

import type { Review, ReviewSortOption } from '@/features/reviews/types'
import { useReviewsQuery } from '@/features/reviews/api'
import { useQueryParam } from '@/hooks/useQueryParam'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

const SEARCH_DEBOUNCE_MS = 350

export function useReviews(bounds?: BBox) {
  const [search, setSearch] = useQueryParam<string>('search', '')
  const [sort, setSort] = useQueryParam<ReviewSortOption>('sort', 'published_at-desc')
  const [page, setPage] = useState(1)
  const [reviews, setReviews] = useState<Review[]>([])

  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS)

  // A text search always searches everywhere — an active map area filter would otherwise
  // silently hide results outside the current viewport, which is confusing.
  const activeBounds = debouncedSearch ? undefined : bounds

  const { data, isLoading, isFetching, isError } = useReviewsQuery({
    query: debouncedSearch || undefined,
    sort_by: sort,
    page,
    ...(activeBounds
      ? {
          sw_lng: activeBounds[0],
          sw_lat: activeBounds[1],
          ne_lng: activeBounds[2],
          ne_lat: activeBounds[3],
        }
      : {}),
  })

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, sort, activeBounds])

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
      locationId: review.location_id,
      locationName: review.location_name,
      cuisineType: review.cuisine_type,
      latitude: review.latitude ? Number(review.latitude) : null,
      longitude: review.longitude ? Number(review.longitude) : null,
      contentCreatorName: review.content_creator_name,
      contentCreatorAvatarUrl: review.content_creator_avatar_url,
    }))

    setReviews((previous) => (page === 1 ? mapped : [...previous, ...mapped]))
  }, [data, page])

  return {
    search,
    setSearch,
    sort,
    setSort,
    reviews,
    isLoading,
    isError,
    hasNextPage: Boolean(data?.meta.next_page),
    isFetchingMore: isFetching,
    loadMore: () => {
      if (data?.meta.next_page) {
        setPage(data.meta.next_page)
      }
    },
  }
}

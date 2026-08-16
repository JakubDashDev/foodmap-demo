import { useRef } from 'react'

import { Spinner } from '@/components/common/Spinner'
import { ReviewCard } from '@/components/app/reviews/ReviewCard'
import type { Review } from '@/features/reviews/types'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export interface ReviewsListProps {
  reviews: Review[]
  isLoading?: boolean
  isError?: boolean
  hasNextPage?: boolean
  isFetchingMore?: boolean
  onLoadMore?: () => void
}

export function ReviewsList({
  reviews,
  isLoading = false,
  isError = false,
  hasNextPage = false,
  isFetchingMore = false,
  onLoadMore,
}: ReviewsListProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll({
    targetRef: sentinelRef,
    hasNextPage,
    isLoading: isFetchingMore,
    onLoadMore: onLoadMore ?? (() => {}),
  })

  if (reviews.length === 0) {
    if (isLoading) {
      return (
        <div className="flex h-full items-center justify-center">
          <Spinner className="size-6 text-gray-500" />
        </div>
      )
    }

    const message = isError
      ? 'Nie udało się załadować recenzji 💔'
      : 'Brak recenzji spełniających kryteria 💔'

    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <span className="text-xl font-bold text-gray-500">{message}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}

      {hasNextPage ? (
        <div ref={sentinelRef} className="flex justify-center py-3">
          {isFetchingMore ? <Spinner className="size-5 text-gray-500" /> : null}
        </div>
      ) : null}
    </div>
  )
}

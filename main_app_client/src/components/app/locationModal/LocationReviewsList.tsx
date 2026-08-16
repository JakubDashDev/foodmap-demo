import { HiOutlineUserCircle, HiPlay } from 'react-icons/hi2'
import classNames from 'classnames'

import { RATING_BADGE_COLORS, RATING_LABELS } from '@/components/app/reviews/ratingColors'
import type { LocationReview } from '@/features/locations/types'

export interface LocationReviewsListProps {
  reviews: LocationReview[]
  selectedReviewId: number | null
  onSelect: (reviewId: number) => void
}

function formatDate(publishedAt: string | null) {
  if (!publishedAt) {
    return null
  }
  return new Date(publishedAt).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function LocationReviewsList({
  reviews,
  selectedReviewId,
  onSelect,
}: LocationReviewsListProps) {
  return (
    <div className="space-y-2">
      {reviews.map((review) => {
        const isSelected = review.id === selectedReviewId
        const publishedAt = formatDate(review.publishedAt)

        return (
          <button
            key={review.id}
            type="button"
            onClick={() => onSelect(review.id)}
            className={classNames(
              'flex w-full cursor-pointer gap-3 rounded-lg border p-3 text-left transition-colors',
              isSelected ? RATING_BADGE_COLORS[review.rating] : 'border-gray-800 hover:bg-gray-800',
            )}
          >
            {review.contentCreatorAvatarUrl ? (
              <img
                src={review.contentCreatorAvatarUrl}
                alt={review.contentCreatorName}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <HiOutlineUserCircle className="h-10 w-10 shrink-0 text-gray-600" />
            )}

            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="truncate font-medium text-gray-100">
                  {review.contentCreatorName}
                </span>
                <span
                  className={classNames(
                    'shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium',
                    RATING_BADGE_COLORS[review.rating],
                  )}
                >
                  {RATING_LABELS[review.rating]}
                </span>
              </div>

              {review.description ? (
                <p className="line-clamp-2 text-sm text-gray-400">{review.description}</p>
              ) : null}

              <div className="flex items-center justify-between gap-2">
                {publishedAt ? <p className="text-xs text-gray-500">{publishedAt}</p> : <span />}

                <span
                  className={classNames(
                    'flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                    !isSelected && 'text-gray-500',
                  )}
                >
                  <HiPlay className="size-3" />
                  {isSelected ? 'Odtwarzane' : 'Obejrzyj wideo'}
                </span>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

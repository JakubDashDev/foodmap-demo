import { useLocation, useNavigate } from 'react-router'
import { HiOutlineUserCircle } from 'react-icons/hi2'

import { RATING_BADGE_COLORS, RATING_LABELS } from '@/components/app/reviews/ratingColors'
import type { Review } from '@/features/reviews/types'

export interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div
      className="flex w-full cursor-pointer gap-2 rounded-lg px-4 py-4 transition-colors hover:bg-gray-800"
      onClick={() =>
        navigate({ pathname: `/locations/${review.locationId}`, search: location.search })
      }
    >
      {review.contentCreatorAvatarUrl ? (
        <img
          src={review.contentCreatorAvatarUrl}
          alt={review.contentCreatorName}
          className="h-[50px] shrink-0 rounded-full object-cover"
        />
      ) : (
        <HiOutlineUserCircle className="h-[50px] w-[50px] shrink-0 text-gray-600" />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate tracking-wide text-gray-100">{review.locationName}</span>

        <div className="mt-0.5 flex items-center justify-between gap-2">
          {review.cuisineType ? (
            <span className="capitalize text-gray-400">{review.cuisineType}</span>
          ) : (
            <span />
          )}

          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-sm font-medium ${RATING_BADGE_COLORS[review.rating]}`}
          >
            {RATING_LABELS[review.rating]}
          </span>
        </div>
      </div>
    </div>
  )
}

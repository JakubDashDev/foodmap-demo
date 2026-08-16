import { useRef } from 'react'
import { useNavigate } from 'react-router'
import classNames from 'classnames'

import { Spinner } from '@/components/common/Spinner'
import { Typography } from '@/components/common/Typography'
import { RATING_COLORS, RATING_LABELS } from '@/components/app/reviews/ratingColors'
import type { Review } from '@/features/reviews/types'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

const COLUMNS = ['Location', 'Creator', 'Rating', 'Source', 'Published']

const SOURCE_TYPE_LABELS: Record<Review['sourceType'], string> = {
  youtube: 'YouTube',
  tiktok: 'TikTok',
}

function formatPublishedAt(publishedAt: string | null) {
  if (!publishedAt) {
    return '—'
  }

  return new Date(publishedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export interface ReviewsTableProps {
  reviews: Review[]
  isLoading?: boolean
  isError?: boolean
  hasNextPage?: boolean
  isFetchingMore?: boolean
  onLoadMore?: () => void
}

export function ReviewsTable({
  reviews,
  isLoading = false,
  isError = false,
  hasNextPage = false,
  isFetchingMore = false,
  onLoadMore,
}: ReviewsTableProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useInfiniteScroll({
    targetRef: sentinelRef,
    hasNextPage,
    isLoading: isFetchingMore,
    onLoadMore: onLoadMore ?? (() => {}),
  })

  const emptyMessage = isError
    ? 'Failed to load reviews.'
    : isLoading
      ? 'Loading reviews…'
      : 'No reviews yet.'

  return (
    <div className="max-h-[60vh] overflow-x-auto overflow-y-auto">
      <table className="w-full min-w-full border-separate border-spacing-x-0 border-spacing-y-1">
        <thead>
          <tr>
            {COLUMNS.map((label, index) => (
              <th
                key={label}
                scope="col"
                className="px-4 py-2.5 text-left text-sm font-semibold tracking-wide text-gray-500"
              >
                <span
                  className={classNames(
                    'block border-l border-gray-300 px-4',
                    index === COLUMNS.length - 1 && 'border-r',
                  )}
                >
                  {label}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {reviews.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length} className="rounded-sm bg-white px-4 py-10 text-center">
                <Typography variant="body2" className="text-gray-500">
                  {emptyMessage}
                </Typography>
              </td>
            </tr>
          ) : (
            reviews.map((review) => (
              <tr
                key={review.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/reviews/${review.id}/edit`)}
              >
                <td className="h-14 rounded-l-sm border-y border-l border-y-transparent border-l-transparent bg-white px-8 text-sm font-medium text-gray-900 transition-colors group-hover:border-primary-300">
                  {review.locationName}
                </td>
                <td className="h-14 border-y border-y-transparent bg-white px-8 text-sm text-gray-600 transition-colors group-hover:border-primary-300">
                  {review.contentCreatorName}
                </td>
                <td className="h-14 border-y border-y-transparent bg-white px-8 text-sm transition-colors group-hover:border-primary-300">
                  <span
                    className={classNames(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white',
                      RATING_COLORS[review.rating],
                    )}
                  >
                    {RATING_LABELS[review.rating]}
                  </span>
                </td>
                <td className="h-14 border-y border-y-transparent bg-white px-8 text-sm text-gray-600 transition-colors group-hover:border-primary-300">
                  <a
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="text-primary-600 hover:underline"
                  >
                    {SOURCE_TYPE_LABELS[review.sourceType]}
                  </a>
                </td>
                <td className="h-14 rounded-r-sm border-y border-r border-y-transparent border-r-transparent bg-white px-8 text-sm text-gray-600 transition-colors group-hover:border-primary-300">
                  {formatPublishedAt(review.publishedAt)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {hasNextPage ? (
        <div ref={sentinelRef} className="flex justify-center py-4">
          {isFetchingMore ? <Spinner className="size-5 text-gray-400" /> : null}
        </div>
      ) : null}
    </div>
  )
}

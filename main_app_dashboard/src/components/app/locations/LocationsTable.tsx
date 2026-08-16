import { useRef } from 'react'
import { useNavigate } from 'react-router'
import classNames from 'classnames'

import { Spinner } from '@/components/common/Spinner'
import { Typography } from '@/components/common/Typography'
import type { Location } from '@/features/locations/types'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

const COLUMNS = ['Name', 'Address', 'Cuisine Type', 'Reviews']

export interface LocationsTableProps {
  locations: Location[]
  isLoading?: boolean
  isError?: boolean
  hasNextPage?: boolean
  isFetchingMore?: boolean
  onLoadMore?: () => void
}

export function LocationsTable({
  locations,
  isLoading = false,
  isError = false,
  hasNextPage = false,
  isFetchingMore = false,
  onLoadMore,
}: LocationsTableProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useInfiniteScroll({
    targetRef: sentinelRef,
    hasNextPage,
    isLoading: isFetchingMore,
    onLoadMore: onLoadMore ?? (() => {}),
  })

  const emptyMessage = isError
    ? 'Failed to load locations.'
    : isLoading
      ? 'Loading locations…'
      : 'No locations yet.'

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
          {locations.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length} className="rounded-sm bg-white px-4 py-10 text-center">
                <Typography variant="body2" className="text-gray-500">
                  {emptyMessage}
                </Typography>
              </td>
            </tr>
          ) : (
            locations.map((location) => (
              <tr
                key={location.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/locations/${location.id}/edit`)}
              >
                <td className="h-14 rounded-l-sm border-y border-l border-y-transparent border-l-transparent bg-white px-8 text-sm font-medium text-gray-900 transition-colors group-hover:border-primary-300">
                  {location.name}
                </td>
                <td className="h-14 border-y border-y-transparent bg-white px-8 text-sm text-gray-600 transition-colors group-hover:border-primary-300">
                  {location.address}
                </td>
                <td className="h-14 border-y border-y-transparent bg-white px-8 text-sm text-gray-600 transition-colors group-hover:border-primary-300">
                  {location.cuisineType}
                </td>
                <td className="h-14 rounded-r-sm border-y border-r border-y-transparent border-r-transparent bg-white px-8 text-sm text-gray-600 transition-colors group-hover:border-primary-300">
                  {location.reviewCount}
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

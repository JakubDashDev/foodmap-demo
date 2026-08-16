import { useRef } from 'react'

import { Spinner } from '@/components/common/Spinner'
import { Typography } from '@/components/common/Typography'
import { ContentCreatorCard } from '@/components/app/content-creators/ContentCreatorCard'
import type { ContentCreator } from '@/features/content-creators/types'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

export interface ContentCreatorsGridProps {
  contentCreators: ContentCreator[]
  isLoading?: boolean
  isError?: boolean
  hasNextPage?: boolean
  isFetchingMore?: boolean
  onLoadMore?: () => void
}

export function ContentCreatorsGrid({
  contentCreators,
  isLoading = false,
  isError = false,
  hasNextPage = false,
  isFetchingMore = false,
  onLoadMore,
}: ContentCreatorsGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll({
    targetRef: sentinelRef,
    hasNextPage,
    isLoading: isFetchingMore,
    onLoadMore: onLoadMore ?? (() => {}),
  })

  const emptyMessage = isError
    ? 'Failed to load content creators.'
    : isLoading
      ? 'Loading content creators…'
      : 'No content creators yet.'

  if (contentCreators.length === 0) {
    return (
      <div className="rounded-sm bg-white px-4 py-10 text-center">
        <Typography variant="body2" className="text-gray-500">
          {emptyMessage}
        </Typography>
      </div>
    )
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {contentCreators.map((contentCreator) => (
          <ContentCreatorCard key={contentCreator.id} contentCreator={contentCreator} />
        ))}
      </div>

      {hasNextPage ? (
        <div ref={sentinelRef} className="flex justify-center py-4">
          {isFetchingMore ? <Spinner className="size-5 text-gray-400" /> : null}
        </div>
      ) : null}
    </div>
  )
}

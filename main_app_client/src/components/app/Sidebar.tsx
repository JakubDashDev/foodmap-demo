import { Logo } from '@/components/common/Logo'
import { ReviewsSearch } from '@/components/app/reviews/ReviewsSearch'
import { ReviewsSort } from '@/components/app/reviews/ReviewsSort'
import { ReviewsList } from '@/components/app/reviews/ReviewsList'
import type { useReviews } from '@/features/reviews/useReviews'

export type SidebarProps = ReturnType<typeof useReviews>

export function Sidebar({
  search,
  setSearch,
  sort,
  setSort,
  reviews,
  isLoading,
  isError,
  hasNextPage,
  isFetchingMore,
  loadMore,
}: SidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col bg-gray-900">
      <div className="flex justify-center border-b border-gray-800 px-6 py-4">
        <Logo size="md" />
      </div>

      <div className="container mx-auto px-4 pt-4">
        <ReviewsSearch value={search} onChange={setSearch} />
      </div>

      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">
        <ReviewsSort value={sort} onChange={setSort} />
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto py-2">
        <ReviewsList
          reviews={reviews}
          isLoading={isLoading}
          isError={isError}
          hasNextPage={hasNextPage}
          isFetchingMore={isFetchingMore}
          onLoadMore={loadMore}
        />
      </div>
    </aside>
  )
}

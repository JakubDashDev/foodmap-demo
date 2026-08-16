import { useEffect, type RefObject } from 'react'

interface IUseInfiniteScrollOptions {
  targetRef: RefObject<Element | null>
  hasNextPage: boolean
  isLoading: boolean
  onLoadMore: () => void
}

export function useInfiniteScroll({
  targetRef,
  hasNextPage,
  isLoading,
  onLoadMore,
}: IUseInfiniteScrollOptions) {
  useEffect(() => {
    const target = targetRef.current

    if (!target || !hasNextPage || isLoading) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore()
        }
      },
      { rootMargin: '160px' },
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [targetRef, hasNextPage, isLoading, onLoadMore])
}

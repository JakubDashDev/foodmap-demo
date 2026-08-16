import { useMemo } from 'react'

import { bestRating } from '@/components/app/reviews/ratingColors'
import type { LocationPinProperties } from '@/components/app/mapView/types'
import type { Review } from '@/features/reviews/types'

export function useLocationPoints(reviews: Review[]) {
  return useMemo(() => {
    const byLocation = new Map<number, Review[]>()

    for (const review of reviews) {
      if (review.latitude === null || review.longitude === null) {
        continue
      }

      const existing = byLocation.get(review.locationId)
      if (existing) {
        existing.push(review)
      } else {
        byLocation.set(review.locationId, [review])
      }
    }

    return Array.from(byLocation.values()).map((locationReviews) => {
      const rating = bestRating(locationReviews.map((review) => review.rating))
      const featuredReview =
        locationReviews.find((review) => review.rating === rating) ?? locationReviews[0]

      return {
        type: 'Feature' as const,
        properties: {
          locationId: featuredReview.locationId,
          locationName: featuredReview.locationName,
          rating,
          avatarUrl: featuredReview.contentCreatorAvatarUrl,
        } satisfies LocationPinProperties,
        geometry: {
          type: 'Point' as const,
          coordinates: [featuredReview.longitude as number, featuredReview.latitude as number],
        },
      }
    })
  }, [reviews])
}

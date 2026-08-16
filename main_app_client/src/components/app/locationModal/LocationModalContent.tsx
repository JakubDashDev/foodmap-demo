import { useState } from 'react'

import { VideoEmbed } from '@/components/app/locationModal/VideoEmbed'
import { LocationInfo } from '@/components/app/locationModal/LocationInfo'
import { LocationReviewsList } from '@/components/app/locationModal/LocationReviewsList'
import type { Location } from '@/features/locations/types'

export interface LocationModalContentProps {
  location: Location
}

export function LocationModalContent({ location }: LocationModalContentProps) {
  const [selectedReviewId, setSelectedReviewId] = useState(location.reviews[0]?.id ?? null)
  const selectedReview =
    location.reviews.find((review) => review.id === selectedReviewId) ?? location.reviews[0]

  return (
    <div className="space-y-6">
      {selectedReview ? <VideoEmbed review={selectedReview} /> : null}

      <LocationInfo location={location} />

      {location.reviews.length > 0 ? (
        <LocationReviewsList
          reviews={location.reviews}
          selectedReviewId={selectedReview?.id ?? null}
          onSelect={setSelectedReviewId}
        />
      ) : null}
    </div>
  )
}

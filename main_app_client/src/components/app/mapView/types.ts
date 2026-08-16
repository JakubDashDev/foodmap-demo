import type { BBox } from 'geojson'

import type { Review } from '@/features/reviews/types'

export interface LocationPinProperties {
  locationId: number
  locationName: string
  rating: Review['rating']
  avatarUrl: string | null
}

export interface MapViewProps {
  reviews: Review[]
  appliedBounds?: BBox
  onApplyBounds: (bounds: BBox | undefined) => void
}

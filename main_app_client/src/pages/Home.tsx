import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import type { BBox } from 'geojson'

import { Sidebar } from '@/components/app/Sidebar'
import { MapView } from '@/components/app/mapView/MapView'
import { LocationModal } from '@/components/app/locationModal/LocationModal'
import { useReviews } from '@/features/reviews/useReviews'

export function Home() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const [appliedBounds, setAppliedBounds] = useState<BBox>()
  const reviews = useReviews(appliedBounds)

  return (
    <div className="flex h-dvh w-full bg-gray-950">
      <div className="w-1/3">
        <Sidebar {...reviews} />
      </div>
      <div className="w-2/3 bg-gray-900">
        <MapView
          reviews={reviews.reviews}
          appliedBounds={appliedBounds}
          onApplyBounds={setAppliedBounds}
        />
      </div>

      <LocationModal
        locationId={id ? Number(id) : null}
        onClose={() => navigate({ pathname: '/', search: location.search })}
      />
    </div>
  )
}

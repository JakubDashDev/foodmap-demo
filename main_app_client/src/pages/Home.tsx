import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { HiOutlineBars3 } from 'react-icons/hi2'
import classNames from 'classnames'
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
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const reviews = useReviews(appliedBounds)

  return (
    <div className="relative flex h-dvh w-full overflow-hidden bg-gray-950">
      {isSidebarOpen ? (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={classNames(
          'fixed inset-y-0 left-0 z-30 w-full transition-transform duration-300 ease-in-out md:static md:z-auto md:w-1/3 md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Sidebar {...reviews} onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="w-full bg-gray-900 md:w-2/3">
        <MapView
          reviews={reviews.reviews}
          appliedBounds={appliedBounds}
          onApplyBounds={setAppliedBounds}
        />
      </div>

      {!isSidebarOpen ? (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="fixed top-4 left-4 z-10 flex size-11 items-center justify-center rounded-full border border-gray-800 bg-gray-900 text-gray-200 shadow-lg md:hidden"
        >
          <HiOutlineBars3 className="size-6" />
        </button>
      ) : null}

      <LocationModal
        locationId={id ? Number(id) : null}
        onClose={() => navigate({ pathname: '/', search: location.search })}
      />
    </div>
  )
}

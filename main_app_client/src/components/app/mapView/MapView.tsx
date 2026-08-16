import { useEffect, useState } from 'react'
import useSupercluster from 'use-supercluster'
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2'
import 'maplibre-gl/dist/maplibre-gl.css'

import { useMapInstance } from '@/components/app/mapView/hooks/useMapInstance'
import { useLocationPoints } from '@/components/app/mapView/hooks/useLocationPoints'
import { useClusterMarkers } from '@/components/app/mapView/hooks/useClusterMarkers'
import type { LocationPinProperties, MapViewProps } from '@/components/app/mapView/types'

export function MapView({ reviews, appliedBounds, onApplyBounds }: MapViewProps) {
  const { containerRef, mapRef, bounds, viewportBounds, zoom, mapReady } = useMapInstance()
  const points = useLocationPoints(reviews)

  const { clusters, supercluster } = useSupercluster<LocationPinProperties, Record<string, never>>({
    points,
    bounds,
    zoom,
    options: { radius: 60, maxZoom: 17 },
  })

  useClusterMarkers({ mapRef, mapReady, clusters, supercluster, zoom })

  const [pendingBounds, setPendingBounds] = useState(viewportBounds)

  useEffect(() => {
    if (viewportBounds) {
      setPendingBounds(viewportBounds)
    }
  }, [viewportBounds])

  const hasPendingSearch = Boolean(pendingBounds) && pendingBounds !== appliedBounds

  return (
    <div className="h-full w-full pt-[5px] pr-[5px] pb-[5px]">
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gray-800">
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

        {hasPendingSearch ? (
          <button
            type="button"
            onClick={() => onApplyBounds(pendingBounds)}
            className="absolute top-4 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer items-center gap-1.5 rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors hover:bg-primary-600"
          >
            <HiMagnifyingGlass className="size-4" />
            Szukaj w tym obszarze
          </button>
        ) : appliedBounds ? (
          <button
            type="button"
            onClick={() => onApplyBounds(undefined)}
            className="absolute top-4 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer items-center gap-1.5 rounded-full border border-gray-700 bg-gray-900 px-4 py-2 text-sm font-medium text-gray-300 shadow-lg transition-colors hover:bg-gray-800"
          >
            <HiXMark className="size-4" />
            Wyczyść filtr obszaru
          </button>
        ) : null}
      </div>
    </div>
  )
}

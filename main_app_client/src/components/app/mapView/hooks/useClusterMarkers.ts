import { useEffect, useRef, type RefObject } from 'react'
import { useNavigate } from 'react-router'
import maplibregl from 'maplibre-gl'
import type Supercluster from 'supercluster'

import { RATING_COLORS, RATING_HEX } from '@/components/app/reviews/ratingColors'
import type { LocationPinProperties } from '@/components/app/mapView/types'

type ClusterFeature =
  | Supercluster.ClusterFeature<Record<string, never>>
  | Supercluster.PointFeature<LocationPinProperties>

export interface UseClusterMarkersArgs {
  mapRef: RefObject<maplibregl.Map | null>
  mapReady: boolean
  clusters: ClusterFeature[]
  supercluster: Supercluster<LocationPinProperties, Record<string, never>> | undefined
  zoom: number
}

export function useClusterMarkers({
  mapRef,
  mapReady,
  clusters,
  supercluster,
  zoom,
}: UseClusterMarkersArgs) {
  const navigate = useNavigate()
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map())
  const clusterDataRef = useRef<
    Map<string, { clusterId: number; longitude: number; latitude: number }>
  >(new Map())

  useEffect(() => {
    const markers = markersRef.current
    const clusterData = clusterDataRef.current

    return () => {
      markers.forEach((marker) => marker.remove())
      markers.clear()
      clusterData.clear()
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !mapReady) {
      return
    }

    const nextKeys = new Set<string>()

    for (const cluster of clusters) {
      const [longitude, latitude] = cluster.geometry.coordinates
      const { cluster: isCluster, point_count: pointCount } = cluster.properties as {
        cluster?: boolean
        point_count?: number
      }

      const key = isCluster
        ? `cluster-${pointCount}-${longitude.toFixed(3)}-${latitude.toFixed(3)}`
        : `location-${(cluster.properties as LocationPinProperties).locationId}`
      nextKeys.add(key)

      if (isCluster) {
        clusterDataRef.current.set(key, { clusterId: cluster.id as number, longitude, latitude })
      }

      let marker = markersRef.current.get(key)

      if (!marker) {
        const el = document.createElement('div')
        el.style.cursor = 'pointer'

        if (isCluster) {
          el.className =
            'flex size-9 items-center justify-center rounded-full border-2 border-gray-900 bg-primary-500 text-sm font-semibold text-white shadow-lg'
          el.textContent = String(pointCount)
          el.addEventListener('click', (event) => {
            event.stopPropagation()
            const current = clusterDataRef.current.get(key)
            if (!current) {
              return
            }
            const expansionZoom = Math.min(
              supercluster?.getClusterExpansionZoom(current.clusterId) ?? zoom + 2,
              17,
            )
            map.flyTo({ center: [current.longitude, current.latitude], zoom: expansionZoom })
          })
          marker = new maplibregl.Marker({ element: el })
            .setLngLat([longitude, latitude])
            .addTo(map)
        } else {
          const { locationId, locationName, rating, avatarUrl } =
            cluster.properties as LocationPinProperties
          el.className = 'group flex flex-col items-center'
          el.title = locationName

          const avatarWrapper = document.createElement('div')
          avatarWrapper.className =
            'flex size-10 items-center justify-center overflow-hidden rounded-full border-[3px] bg-gray-800 shadow-lg transition-transform group-hover:scale-110'
          avatarWrapper.style.borderColor = RATING_HEX[rating]

          if (avatarUrl) {
            const img = document.createElement('img')
            img.src = avatarUrl
            img.alt = locationName
            img.className = 'size-full object-cover'
            avatarWrapper.appendChild(img)
          } else {
            avatarWrapper.classList.add(...RATING_COLORS[rating].split(' '))
          }

          el.appendChild(avatarWrapper)

          el.addEventListener('click', (event) => {
            event.stopPropagation()
            navigate({ pathname: `/locations/${locationId}`, search: window.location.search })
          })
          marker = new maplibregl.Marker({ element: el, anchor: 'center' })
            .setLngLat([longitude, latitude])
            .addTo(map)
        }

        markersRef.current.set(key, marker)
      } else {
        marker.setLngLat([longitude, latitude])

        if (isCluster) {
          marker.getElement().textContent = String(pointCount)
        }
      }
    }

    for (const [key, marker] of markersRef.current) {
      if (!nextKeys.has(key)) {
        marker.remove()
        markersRef.current.delete(key)
        clusterDataRef.current.delete(key)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clusters, mapReady])
}

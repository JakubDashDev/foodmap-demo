import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import type { BBox } from 'geojson'

import { INITIAL_CENTER, INITIAL_ZOOM, MAP_STYLE } from '@/components/app/mapView/constants'

export function useMapInstance() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [bounds, setBounds] = useState<BBox>()
  const [viewportBounds, setViewportBounds] = useState<BBox>()
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

    const updateViewport = (userInteracted: boolean) => {
      const mapBounds = map.getBounds()
      const bbox: BBox = [
        mapBounds.getWest(),
        mapBounds.getSouth(),
        mapBounds.getEast(),
        mapBounds.getNorth(),
      ]
      setBounds(bbox)
      if (userInteracted) {
        setViewportBounds(bbox)
      }
      setZoom(map.getZoom())
    }

    map.on('load', () => {
      setMapReady(true)
      updateViewport(false)
    })
    map.on('moveend', (event) => updateViewport(Boolean(event.originalEvent)))
    map.on('error', (event) => console.error('MapLibre error:', event.error))

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      setMapReady(false)
    }
  }, [])

  return { containerRef, mapRef, bounds, viewportBounds, zoom, mapReady }
}

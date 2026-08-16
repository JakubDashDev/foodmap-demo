import { HiOutlineMapPin } from 'react-icons/hi2'

import { Typography } from '@/components/common/Typography'
import type { Location } from '@/features/locations/types'

export interface LocationInfoProps {
  location: Location
}

export function LocationInfo({ location }: LocationInfoProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <Typography variant="h3">{location.name}</Typography>
        {location.cuisineType ? (
          <span className="rounded-full bg-gray-800 px-2.5 py-1 text-xs font-medium text-gray-300 capitalize">
            {location.cuisineType}
          </span>
        ) : null}
      </div>

      <div className="flex items-start gap-1.5 text-sm text-gray-400">
        <HiOutlineMapPin className="mt-0.5 size-4 shrink-0" />
        <span>{location.address}</span>
      </div>

      {location.description ? (
        <Typography variant="body2" className="text-gray-300">
          {location.description}
        </Typography>
      ) : null}
    </div>
  )
}

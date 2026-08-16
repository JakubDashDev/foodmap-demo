import { Select } from '@/components/common/Select'
import type { LocationSortOption } from '@/features/locations/types'

const SORT_OPTIONS: { label: string; value: LocationSortOption }[] = [
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Address (A-Z)', value: 'address-asc' },
  { label: 'Address (Z-A)', value: 'address-desc' },
  { label: 'Cuisine type (A-Z)', value: 'cuisineType-asc' },
  { label: 'Cuisine type (Z-A)', value: 'cuisineType-desc' },
]

export interface LocationsSortProps {
  value: LocationSortOption
  onChange: (value: LocationSortOption) => void
}

export function LocationsSort({ value, onChange }: LocationsSortProps) {
  return (
    <Select
      label="Sort by"
      options={SORT_OPTIONS}
      value={value}
      onValueChange={(next) => onChange(next as LocationSortOption)}
    />
  )
}

import { Select } from '@/components/common/Select'
import type { ContentCreatorSortOption } from '@/features/content-creators/types'

const SORT_OPTIONS: { label: string; value: ContentCreatorSortOption }[] = [
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Channel (A-Z)', value: 'channel_url-asc' },
  { label: 'Channel (Z-A)', value: 'channel_url-desc' },
]

export interface ContentCreatorsSortProps {
  value: ContentCreatorSortOption
  onChange: (value: ContentCreatorSortOption) => void
}

export function ContentCreatorsSort({ value, onChange }: ContentCreatorsSortProps) {
  return (
    <Select
      label="Sort by"
      options={SORT_OPTIONS}
      value={value}
      onValueChange={(next) => onChange(next as ContentCreatorSortOption)}
    />
  )
}

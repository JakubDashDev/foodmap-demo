import { Select } from '@/components/common/Select'
import type { ReviewSortOption } from '@/features/reviews/types'

const SORT_OPTIONS: { label: string; value: ReviewSortOption }[] = [
  { label: 'Data publikacji (najnowsze)', value: 'published_at-desc' },
  { label: 'Data publikacji (najstarsze)', value: 'published_at-asc' },
  { label: 'Lokalizacja (A-Z)', value: 'location-asc' },
  { label: 'Lokalizacja (Z-A)', value: 'location-desc' },
  { label: 'Twórca (A-Z)', value: 'content_creator-asc' },
  { label: 'Twórca (Z-A)', value: 'content_creator-desc' },
  { label: 'Ocena (rosnąco)', value: 'rating-asc' },
  { label: 'Ocena (malejąco)', value: 'rating-desc' },
]

export interface ReviewsSortProps {
  value: ReviewSortOption
  onChange: (value: ReviewSortOption) => void
}

export function ReviewsSort({ value, onChange }: ReviewsSortProps) {
  return (
    <Select
      options={SORT_OPTIONS}
      value={value}
      onValueChange={(next) => onChange(next as ReviewSortOption)}
    />
  )
}

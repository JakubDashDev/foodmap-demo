import { Select } from '@/components/common/Select'
import type { ReviewSortOption } from '@/features/reviews/types'

const SORT_OPTIONS: { label: string; value: ReviewSortOption }[] = [
  { label: 'Published (Newest)', value: 'published_at-desc' },
  { label: 'Published (Oldest)', value: 'published_at-asc' },
  { label: 'Location (A-Z)', value: 'location-asc' },
  { label: 'Location (Z-A)', value: 'location-desc' },
  { label: 'Creator (A-Z)', value: 'content_creator-asc' },
  { label: 'Creator (Z-A)', value: 'content_creator-desc' },
  { label: 'Rating (Low-High)', value: 'rating-asc' },
  { label: 'Rating (High-Low)', value: 'rating-desc' },
]

export interface ReviewsSortProps {
  value: ReviewSortOption
  onChange: (value: ReviewSortOption) => void
}

export function ReviewsSort({ value, onChange }: ReviewsSortProps) {
  return (
    <Select
      label="Sort by"
      options={SORT_OPTIONS}
      value={value}
      onValueChange={(next) => onChange(next as ReviewSortOption)}
    />
  )
}

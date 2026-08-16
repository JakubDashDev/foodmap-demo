import type { Review } from '@/features/reviews/types'

export const RATING_LABELS: Record<Review['rating'], string> = {
  avoid: 'Unikaj',
  worth_if_nearby: 'Warto, jeśli w pobliżu',
  worth_a_detour: 'Warto nadłożyć drogi',
  worth_a_special_trip: 'Warto specjalnej wycieczki',
}

// Red (worst) to green (best).
export const RATING_COLORS: Record<Review['rating'], string> = {
  avoid: 'bg-[#dc2626]',
  worth_if_nearby: 'bg-[#f97316]',
  worth_a_detour: 'bg-[#3b82f6]',
  worth_a_special_trip: 'bg-[#16a34a]',
}

// 20% background tint + full-color border/text, used for rating badges.
export const RATING_BADGE_COLORS: Record<Review['rating'], string> = {
  avoid: 'border-[#dc2626] bg-[#dc2626]/20 text-[#dc2626]',
  worth_if_nearby: 'border-[#f97316] bg-[#f97316]/20 text-[#f97316]',
  worth_a_detour: 'border-[#3b82f6] bg-[#3b82f6]/20 text-[#3b82f6]',
  worth_a_special_trip: 'border-[#16a34a] bg-[#16a34a]/20 text-[#16a34a]',
}

export const RATING_HEX: Record<Review['rating'], string> = {
  avoid: '#dc2626',
  worth_if_nearby: '#f97316',
  worth_a_detour: '#3b82f6',
  worth_a_special_trip: '#16a34a',
}

// Best to worst — used to pick the dominant rating for a location with multiple reviews.
export const RATING_PRIORITY: Review['rating'][] = [
  'worth_a_special_trip',
  'worth_a_detour',
  'worth_if_nearby',
  'avoid',
]

export function bestRating(ratings: Review['rating'][]): Review['rating'] {
  return (
    RATING_PRIORITY.find((rating) => ratings.includes(rating)) ??
    RATING_PRIORITY[RATING_PRIORITY.length - 1]
  )
}

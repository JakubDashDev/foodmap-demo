import type { Review } from '@/features/reviews/types'

export const RATING_LABELS: Record<Review['rating'], string> = {
  avoid: 'Avoid',
  worth_if_nearby: 'Worth If Nearby',
  worth_a_detour: 'Worth A Detour',
  worth_a_special_trip: 'Worth A Special Trip',
}

// Red (worst) to green (best).
export const RATING_COLORS: Record<Review['rating'], string> = {
  avoid: 'bg-[#dc2626]',
  worth_if_nearby: 'bg-[#f97316]',
  worth_a_detour: 'bg-[#eab308]',
  worth_a_special_trip: 'bg-[#16a34a]',
}

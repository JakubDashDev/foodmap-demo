export interface ILocationReviewDto {
  id: number
  source_url: string
  source_type: 'youtube' | 'tiktok'
  rating: 'avoid' | 'worth_if_nearby' | 'worth_a_detour' | 'worth_a_special_trip'
  description: string | null
  published_at: string | null
  content_creator_name: string
  content_creator_avatar_url: string | null
}

export interface ILocationDto {
  id: number
  name: string
  address: string
  cuisine_type: string | null
  description: string | null
  latitude: string
  longitude: string
  reviews: ILocationReviewDto[]
}

export interface LocationReview {
  id: number
  sourceUrl: string
  sourceType: ILocationReviewDto['source_type']
  rating: ILocationReviewDto['rating']
  description: string | null
  publishedAt: string | null
  contentCreatorName: string
  contentCreatorAvatarUrl: string | null
}

export interface Location {
  id: number
  name: string
  address: string
  cuisineType: string | null
  description: string | null
  reviews: LocationReview[]
}

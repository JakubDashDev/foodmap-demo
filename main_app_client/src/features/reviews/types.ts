import type { IPaginatedResponse, IPaginationParams } from '@/features/api/pagination'

export interface IReviewDto {
  id: number
  source_url: string
  source_type: 'youtube' | 'tiktok'
  rating: 'avoid' | 'worth_if_nearby' | 'worth_a_detour' | 'worth_a_special_trip'
  published_at: string | null
  location_id: number
  location_name: string
  cuisine_type: string | null
  latitude: string | null
  longitude: string | null
  content_creator_name: string
  content_creator_avatar_url: string | null
}

export type IReviewsResponse = IPaginatedResponse<IReviewDto>

export interface IReviewsQueryArgs extends IPaginationParams {
  query?: string
  sort_by?: string
  page_size?: number
  sw_lat?: number
  sw_lng?: number
  ne_lat?: number
  ne_lng?: number
}

export interface Review {
  id: number
  sourceUrl: string
  sourceType: IReviewDto['source_type']
  rating: IReviewDto['rating']
  publishedAt: string | null
  locationId: number
  locationName: string
  cuisineType: string | null
  latitude: number | null
  longitude: number | null
  contentCreatorName: string
  contentCreatorAvatarUrl: string | null
}

export type ReviewSortKey = 'location' | 'content_creator' | 'rating' | 'published_at'
export type ReviewSortDirection = 'asc' | 'desc'
export type ReviewSortOption = `${ReviewSortKey}-${ReviewSortDirection}`

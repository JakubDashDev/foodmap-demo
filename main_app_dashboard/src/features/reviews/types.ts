import type { IPaginatedResponse, IPaginationParams } from '@/features/api/pagination'

export interface IReviewDto {
  id: number
  source_url: string
  source_type: 'youtube' | 'tiktok'
  rating: 'avoid' | 'worth_if_nearby' | 'worth_a_detour' | 'worth_a_special_trip'
  published_at: string | null
  location_name: string
  content_creator_name: string
}

export type IReviewsResponse = IPaginatedResponse<IReviewDto>

export interface IReviewsQueryArgs extends IPaginationParams {
  query?: string
  sort_by?: string
  page_size?: number
}

export interface IReviewDetailDto {
  id: number
  source_url: string
  source_type: 'youtube' | 'tiktok'
  rating: 'avoid' | 'worth_if_nearby' | 'worth_a_detour' | 'worth_a_special_trip'
  description: string | null
  published_at: string | null
  location_id: number
  content_creator_id: number
}

export interface IReviewUpdatePayload {
  source_url: string
  source_type: string
  rating: string
  description?: string
  published_at?: string
  location_id: string
  content_creator_id: string
}

export interface Review {
  id: number
  sourceUrl: string
  sourceType: IReviewDto['source_type']
  rating: IReviewDto['rating']
  publishedAt: string | null
  locationName: string
  contentCreatorName: string
}

export type ReviewSortKey = 'location' | 'content_creator' | 'rating' | 'published_at'
export type ReviewSortDirection = 'asc' | 'desc'
export type ReviewSortOption = `${ReviewSortKey}-${ReviewSortDirection}`

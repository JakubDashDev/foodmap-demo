import type { IPaginatedResponse, IPaginationParams } from '@/features/api/pagination'

export interface IContentCreatorDto {
  id: number
  name: string
  channel_url: string | null
  avatar_url: string | null
  description: string | null
  review_count: number
}

export type IContentCreatorsResponse = IPaginatedResponse<IContentCreatorDto>

export interface IContentCreatorsQueryArgs extends IPaginationParams {
  query?: string
  sort_by?: string
  page_size?: number
}

export interface IContentCreatorUpdatePayload {
  name: string
  channel_url?: string
  avatar_url?: string
  description?: string
}

export interface ContentCreator {
  id: number
  name: string
  channelUrl: string | null
  avatarUrl: string | null
  description: string | null
  reviewCount: number
}

export type ContentCreatorSortKey = 'name' | 'channel_url'
export type ContentCreatorSortDirection = 'asc' | 'desc'
export type ContentCreatorSortOption = `${ContentCreatorSortKey}-${ContentCreatorSortDirection}`

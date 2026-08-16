import type { IPaginatedResponse, IPaginationParams } from '@/features/api/pagination'

export interface ILocationDto {
  id: number
  name: string
  address: string
  cuisine_type: string
  review_count: number
}

export type ILocationsResponse = IPaginatedResponse<ILocationDto>

export interface ILocationsQueryArgs extends IPaginationParams {
  query?: string
  sort_by?: string
  page_size?: number
}

export interface ILocationDetailDto {
  id: number
  name: string
  address: string
  cuisine_type: string | null
  description: string | null
  latitude: string
  longitude: string
}

export interface ILocationUpdatePayload {
  name: string
  address: string
  cuisine_type?: string
  description?: string
  latitude: string
  longitude: string
}

export interface Location {
  id: number
  name: string
  address: string
  cuisineType: string
  reviewCount: number
}

export type LocationSortKey = 'name' | 'address' | 'cuisineType'
export type LocationSortDirection = 'asc' | 'desc'
export type LocationSortOption = `${LocationSortKey}-${LocationSortDirection}`

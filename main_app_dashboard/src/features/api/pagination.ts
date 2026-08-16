export interface IPaginationMeta {
  page: number
  page_size: number
  total_count: number
  total_pages: number
  next_page: number | null
}

export interface IPaginatedResponse<TData> {
  data: TData[]
  meta: IPaginationMeta
}

export interface IPaginationParams {
  page?: number
}

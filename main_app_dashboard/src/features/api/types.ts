export interface IApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
}

export interface IAxiosQueryArgs {
  url: string
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  data?: unknown
  params?: unknown
  headers?: Record<string, string>
  retryOnUnauthorized?: boolean
}

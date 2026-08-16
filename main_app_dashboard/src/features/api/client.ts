import axios from 'axios'

import type { IApiError } from './types'

interface ErrorResponse {
  message?: string
  error?: string
  errors?: Record<string, string[]>
}

const DEFAULT_ERROR_MESSAGES: Record<number, string> = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  422: 'Validation failed',
  500: 'Server error',
  502: 'Bad gateway',
  503: 'Service unavailable',
}

export const dashboardApi = axios.create({
  baseURL: '/dashboard',
  withCredentials: true,
})

dashboardApi.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError<ErrorResponse>(error) && error.response) {
      const { status, data } = error.response

      return Promise.reject({
        status,
        message: data.message ?? data.error ?? DEFAULT_ERROR_MESSAGES[status] ?? 'Request failed',
        errors: data.errors,
      } satisfies IApiError)
    }

    return Promise.reject({
      status: 0,
      message: error instanceof Error ? error.message : 'Network error',
    } satisfies IApiError)
  },
)

import { dashboardApi } from './client'
import type { IApiError } from './types'

const REFRESH_ENDPOINT = '/refresh'

let refreshRequest: Promise<boolean> | null = null

export function isUnauthorizedApiError(error: unknown): error is IApiError {
  return typeof error === 'object' && error !== null && 'status' in error && error.status === 401
}

export function isRefreshRequest(url: string): boolean {
  return url === REFRESH_ENDPOINT
}

export function refreshDashboardSession(): Promise<boolean> {
  refreshRequest ??= dashboardApi
    .post(REFRESH_ENDPOINT)
    .then(() => true)
    .catch(() => false)
    .finally(() => {
      refreshRequest = null
    })

  return refreshRequest
}

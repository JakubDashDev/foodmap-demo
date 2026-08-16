import type { BaseQueryFn } from '@reduxjs/toolkit/query'

import { dashboardApi } from './client'
import { isRefreshRequest, isUnauthorizedApiError, refreshDashboardSession } from './session'
import type { IApiError, IAxiosQueryArgs } from './types'

export const axiosBaseQuery: BaseQueryFn<IAxiosQueryArgs, unknown, IApiError> = async ({
  url,
  method = 'GET',
  data,
  params,
  headers,
  retryOnUnauthorized = true,
}) => {
  const executeRequest = () => dashboardApi.request({ url, method, data, params, headers })

  try {
    const response = await executeRequest()
    return { data: response.data }
  } catch (error) {
    if (!retryOnUnauthorized || isRefreshRequest(url) || !isUnauthorizedApiError(error)) {
      return { error: error as IApiError }
    }

    if (!(await refreshDashboardSession())) {
      return { error: error as IApiError }
    }

    try {
      const response = await executeRequest()
      return { data: response.data }
    } catch (retryError) {
      return { error: retryError as IApiError }
    }
  }
}

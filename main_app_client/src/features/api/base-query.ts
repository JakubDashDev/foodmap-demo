import type { BaseQueryFn } from '@reduxjs/toolkit/query'

import { clientApi } from './client'
import type { IApiError, IAxiosQueryArgs } from './types'

export const axiosBaseQuery: BaseQueryFn<IAxiosQueryArgs, unknown, IApiError> = async ({
  url,
  method = 'GET',
  data,
  params,
  headers,
}) => {
  try {
    const response = await clientApi.request({ url, method, data, params, headers })
    return { data: response.data }
  } catch (error) {
    return { error: error as IApiError }
  }
}

import { baseApi } from '@/features/api/base-api'
import type { ILocationDto } from './types'

export const locationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    location: builder.query<ILocationDto, number>({
      query: (id) => ({
        url: `/locations/${id}`,
      }),
    }),
  }),
})

export const { useLocationQuery } = locationsApi

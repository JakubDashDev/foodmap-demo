import { baseApi } from '@/features/api/base-api'
import type { IReviewsQueryArgs, IReviewsResponse } from './types'

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reviews: builder.query<IReviewsResponse, IReviewsQueryArgs | void>({
      query: (params) => ({
        url: '/reviews',
        params,
      }),
    }),
  }),
})

export const { useReviewsQuery } = reviewsApi

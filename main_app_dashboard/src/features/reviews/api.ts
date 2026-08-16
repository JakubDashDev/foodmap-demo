import { baseApi } from '@/features/api/base-api'
import type {
  IReviewDetailDto,
  IReviewsQueryArgs,
  IReviewsResponse,
  IReviewUpdatePayload,
} from './types'

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reviews: builder.query<IReviewsResponse, IReviewsQueryArgs | void>({
      query: (params) => ({
        url: '/reviews',
        params,
      }),
      providesTags: ['Reviews'],
    }),
    review: builder.query<IReviewDetailDto, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
      }),
      providesTags: ['Reviews'],
    }),
    createReview: builder.mutation<IReviewDetailDto, IReviewUpdatePayload>({
      query: (data) => ({
        url: '/reviews',
        method: 'POST',
        data: { review: data },
      }),
      invalidatesTags: ['Reviews'],
    }),
    updateReview: builder.mutation<IReviewDetailDto, { id: string; data: IReviewUpdatePayload }>({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: 'PATCH',
        data: { review: data },
      }),
      invalidatesTags: ['Reviews'],
    }),
    deleteReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reviews'],
    }),
  }),
})

export const {
  useReviewsQuery,
  useReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewsApi

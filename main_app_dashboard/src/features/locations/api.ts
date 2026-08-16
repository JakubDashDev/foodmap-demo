import { baseApi } from '@/features/api/base-api'
import type {
  ILocationDetailDto,
  ILocationsQueryArgs,
  ILocationsResponse,
  ILocationUpdatePayload,
} from './types'

export const locationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    locations: builder.query<ILocationsResponse, ILocationsQueryArgs | void>({
      query: (params) => ({
        url: '/locations',
        params,
      }),
      providesTags: ['Locations'],
    }),
    location: builder.query<ILocationDetailDto, string>({
      query: (id) => ({
        url: `/locations/${id}`,
      }),
      providesTags: ['Locations'],
    }),
    createLocation: builder.mutation<ILocationDetailDto, ILocationUpdatePayload>({
      query: (data) => ({
        url: '/locations',
        method: 'POST',
        data: { location: data },
      }),
      invalidatesTags: ['Locations'],
    }),
    updateLocation: builder.mutation<
      ILocationDetailDto,
      { id: string; data: ILocationUpdatePayload }
    >({
      query: ({ id, data }) => ({
        url: `/locations/${id}`,
        method: 'PATCH',
        data: { location: data },
      }),
      invalidatesTags: ['Locations'],
    }),
    deleteLocation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/locations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Locations'],
    }),
  }),
})

export const {
  useLocationsQuery,
  useLocationQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationsApi

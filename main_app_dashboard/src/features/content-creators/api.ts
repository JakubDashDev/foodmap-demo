import { baseApi } from '@/features/api/base-api'
import type {
  IContentCreatorDto,
  IContentCreatorsQueryArgs,
  IContentCreatorsResponse,
  IContentCreatorUpdatePayload,
} from './types'

export const contentCreatorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    contentCreators: builder.query<IContentCreatorsResponse, IContentCreatorsQueryArgs | void>({
      query: (params) => ({
        url: '/content_creators',
        params,
      }),
      providesTags: ['ContentCreators'],
    }),
    contentCreator: builder.query<IContentCreatorDto, string>({
      query: (id) => ({
        url: `/content_creators/${id}`,
      }),
      providesTags: ['ContentCreators'],
    }),
    createContentCreator: builder.mutation<IContentCreatorDto, IContentCreatorUpdatePayload>({
      query: (data) => ({
        url: '/content_creators',
        method: 'POST',
        data: { content_creator: data },
      }),
      invalidatesTags: ['ContentCreators'],
    }),
    updateContentCreator: builder.mutation<
      IContentCreatorDto,
      { id: string; data: IContentCreatorUpdatePayload }
    >({
      query: ({ id, data }) => ({
        url: `/content_creators/${id}`,
        method: 'PATCH',
        data: { content_creator: data },
      }),
      invalidatesTags: ['ContentCreators'],
    }),
    deleteContentCreator: builder.mutation<void, string>({
      query: (id) => ({
        url: `/content_creators/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ContentCreators'],
    }),
  }),
})

export const {
  useContentCreatorsQuery,
  useContentCreatorQuery,
  useCreateContentCreatorMutation,
  useUpdateContentCreatorMutation,
  useDeleteContentCreatorMutation,
} = contentCreatorsApi

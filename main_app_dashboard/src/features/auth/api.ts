import { baseApi } from '../api/base-api'
import type { IAuthResponse, ILoginPayload } from './types'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthResponse, ILoginPayload>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        data,
        retryOnUnauthorized: false,
      }),
      invalidatesTags: (_result, error) => (error ? [] : ['Session']),
    }),
    session: builder.query<IAuthResponse, void>({
      query: () => ({
        url: '/me',
      }),
      providesTags: ['Session'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        retryOnUnauthorized: false,
      }),
      invalidatesTags: ['Session'],
    }),
  }),
})

export const { useLoginMutation, useLogoutMutation, useSessionQuery } = authApi

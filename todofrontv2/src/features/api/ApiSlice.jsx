import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
      // Add Authorization header to requests
      const { auth } = getState()
      if (auth.data && auth.data.token) {
        headers.set('Authorization', `Bearer ${auth.data.token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todo',
      transformResponse: resp => resp.sort((a, b) => b.id - a.id),
      providesTags: ['Todos'],
    }),
    getTodosForCustomer: builder.query({
      query: email => `/todo/table/${email}`,
      transformResponse: resp => resp.sort((a, b) => b.id - a.id),
      providesTags: ['Todos'],
    }),
  })
})

export const {
    useGetTodosQuery,
    useGetTodosForCustomerQuery
} = apiSlice

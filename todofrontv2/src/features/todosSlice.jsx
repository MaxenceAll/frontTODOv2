import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: config.api.url,
    prepareHeaders: (headers) => {
      // Set the Authorization header with your API authorization
      headers.set("Authorization", config.api.authorization);
      // Set the Content-Type header to "application/json"
      headers.set("Content-Type", "application/json");
      return headers;
    },
    credentials: "include",
    tagTypes: ["Todos", "Tasks"],
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => "todo",
      transformResponse: (response) => {
        // console.log(response);
        // SORTING les todos par id (obligé de décomposer l'objet et le recomposer pour garder la structure originelle)
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        return {
          data: sortedData,
          result: response.result,
          message: response.message,
        };
      },
      providesTags: ["Todos"],
    }),

    getAllTodosByEmail: builder.query({
      query: (email) => `todo/table/${email}`,
      transformResponse: (response) => {
        // console.log(response);
        // SORTING les todos par id (obligé de décomposer l'objet et le recomposer pour garder la structure originelle)
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        return {
          data: sortedData,
          result: response.result,
          message: response.message,
        };
      },
      providesTags: ["Todos"],
    }),

    updateFavorite: builder.mutation({
      query: ({ id, is_favorite }) => ({
        url: `todo/${id}`,
        method: "PUT",
        body: { is_favorite },
      }),
      // Vérifier l'utilitée d'invalider pour un favoris
      // invalidatesTags: ["Todos"],
    }),

    softDelete: builder.mutation({
      query: (id) => ({
        url: `todo/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Todos"],
    }),


    getAllTasksByEmail: builder.query({
      query: (email) => `task/table/${email}`,
      transformResponse: (response) => {
        return {
          data: response.data,
          result: response.result,
          message: response.message,
        };
      },
      providesTags: ["Tasks"],
    }),
    
    getAllTasksByTodoId: builder.query({
      query: (id) => `task/task/${id}`,
      transformResponse: (response) => {
        // console.log(response);
        // SORTING les todos par id (obligé de décomposer l'objet et le recomposer pour garder la structure originelle)
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        return {
          data: sortedData,
          result: response.result,
          message: response.message,
        };
      },
      providesTags: ["Tasks"],
    }),





  }),
});

export const {
  useGetAllTodosQuery,
  useGetAllTodosByEmailQuery,
  useUpdateFavoriteMutation,
  useSoftDeleteMutation,
  useGetAllTasksByEmailQuery,
  useGetAllTasksByTodoIdQuery,
} = todosApi;

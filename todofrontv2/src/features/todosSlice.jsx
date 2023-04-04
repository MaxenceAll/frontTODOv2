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



    createTodo: builder.mutation({
      query: (title,description, id_customer) => ({
        url: 'todo',
        method: 'POST',
        body: JSON.stringify( title, description, id_customer ),
      }),
      invalidatesTags: ['Todos'],
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

    updateTaskCompleted: builder.mutation ({
      query: ({ id , is_completed }) => ({
          url: `task/${id}`,
          method: "PUT",
          body: { is_completed },
      }),
      // Vérifier l'utilitée d'invalider pour un favoris
      // invalidatesTags: ["Tasks"],
    }),

    updateTaskPriority: builder.mutation ({
      query: ({ id , id_priority }) => ({
          url: `task/${id}`,
          method: "PUT",
          body: { id_priority },
      }),
      // Vérifier l'utilitée d'invalider pour un favoris
      invalidatesTags: ["Tasks"],
    }),


    softDeleteTask: builder.mutation({
      query: (id) => ({
        url: `task/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tasks"],
    }),


    softDelete: builder.mutation({
      query: (id) => ({
        url: `todo/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Todos"],
    }),










  }),
});

export const {
  useGetAllTodosQuery,
  useGetAllTodosByEmailQuery,
  useCreateTodoMutation,
  useUpdateFavoriteMutation,
  useSoftDeleteMutation,
  useGetAllTasksByEmailQuery,
  useGetAllTasksByTodoIdQuery,
  useUpdateTaskCompletedMutation,
  useUpdateTaskPriorityMutation,
  useSoftDeleteTaskMutation,
} = todosApi;

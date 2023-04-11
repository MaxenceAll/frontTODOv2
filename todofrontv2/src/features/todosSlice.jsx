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
    tagTypes: ["Todos", "Tasks", "Customer"],
  }),
  endpoints: (builder) => ({



    getCustomer: builder.query({
      query: () => "customer",
      providesTags: ["Customer"],
    }),





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

  

    getAllTasks: builder.query({
      query: (page=1) => "task",
      transformResponse: (response) => {
        // console.log(response);
        // SORTING les todos par id (obligé de décomposer l'objet et le recomposer pour garder la structure originelle)
        const sortedData = response.data.sort((a, b) => a.id - b.id);
        return {
          data: sortedData,
          result: response.result,
          message: response.message,
        };
      },
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
        return {
          data: response.data,
          result: response.result,
          message: response.message,
        };
      },
      providesTags: ["Tasks"],
    }),

    createTodo: builder.mutation({
      query: (title, description, id_customer) => ({
        url: "todo",
        method: "POST",
        body: JSON.stringify(title, description, id_customer),
      }),
      invalidatesTags: ["Todos"],
    }),

    createTask: builder.mutation({
      query: (title, description, id_priority, id_Todo) => ({
        url: "task",
        method: "POST",
        body: JSON.stringify(title, description, id_priority, id_Todo),
      }),
      invalidatesTags: ["Tasks"],
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

    updateTaskCompleted: builder.mutation({
      query: ({ id, is_completed }) => ({
        url: `task/${id}`,
        method: "PUT",
        body: { is_completed },
      }),
      // Vérifier l'utilitée d'invalider pour un favoris
      // invalidatesTags: ["Tasks"],
    }),

    updateTaskPriority: builder.mutation({
      query: ({ id, id_priority }) => ({
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

    updateTodoTitle: builder.mutation({
      query: ({ id, title }) => ({
        url: `todo/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Todos"],
    }),

    updateTodoDesc: builder.mutation({
      query: ({ id, description }) => ({
        url: `todo/${id}`,
        method: "PUT",
        body: { description },
      }),
      invalidatesTags: ["Todos"],
    }),

    updateTaskTitle: builder.mutation({
      query: ({ id, title }) => ({
        url: `task/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTaskDesc: builder.mutation({
      query: ({ id, description }) => ({
        url: `task/${id}`,
        method: "PUT",
        body: { description },
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTaskDline: builder.mutation({
      query: ({ id, deadline_date }) => ({
        url: `task/${id}`,
        method: "PUT",
        body: { deadline_date },
      }),
      invalidatesTags: ["Tasks"],
    }),


    isAdmin: builder.query({
      query: ({ email }) => ({
        url: `customer/admin/${email}`,
        method: "GET",
        params: { email },
      }),
      onSuccess: (response, { query }) => {
        const { email } = query.params;
        console.log(`Response for isAdmin endpoint with email ${email}:`, response);
      },      
    }),
    

    updateTask: builder.mutation({
      query: ({ id, title , description , id_priority , is_completed, deadline_date }) => ({
        url: `task/${id}`,
        method: "PUT",
        body: { title , description , id_priority , is_completed, deadline_date },
      }),
      invalidatesTags: ["Tasks"],
    }),
    
    updateTodo: builder.mutation({
      query: ({ id, title , description , id_customer, is_favorite , url_img}) => ({
        url: `todo/${id}`,
        method: "PUT",
        body: { title , description , id_customer , is_favorite, url_img },
      }),
      invalidatesTags: ["Todos"],
    }),


    updateCustomer: builder.mutation({
      query: ({ id, email , is_deleted , is_verified , is_admin }) => ({
        url: `customer/${id}`,
        method: "PUT",
        body: { email , is_deleted , is_verified , is_admin },
      }),
      invalidatesTags: ["Customer"],
    }),






    actualUser: builder.query({
      query: ({ table, id }) => `${table}/${id}`,
    }),





  }),
});

export const {
  useGetAllTodosQuery,
  useGetAllTasksQuery,
  useGetAllTodosByEmailQuery,
  useCreateTodoMutation,
  useUpdateFavoriteMutation,
  useSoftDeleteMutation,
  useGetAllTasksByEmailQuery,
  useGetAllTasksByTodoIdQuery,
  useUpdateTaskCompletedMutation,
  useUpdateTaskPriorityMutation,
  useSoftDeleteTaskMutation,
  useUpdateTodoTitleMutation,
  useUpdateTodoDescMutation,
  useCreateTaskMutation,
  useUpdateTaskTitleMutation,
  useUpdateTaskDescMutation,
  useUpdateTaskDlineMutation,
  useGetCustomerQuery,
  useIsAdminQuery,
  useUpdateTaskMutation,
  useUpdateCustomerMutation,
  useActualUserQuery,
  useUpdateTodoMutation,
} = todosApi;

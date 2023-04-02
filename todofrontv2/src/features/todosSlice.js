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
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => "todo",
      transformResponse: (response) => {
        // console.log(response); 
        // SORTING les todos par id (obligé de décomposer l'objet et le recomposer pour garder la structure originelle)
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        return { data: sortedData, result: response.result, message: response.message };
      }      
    }),

    

  }),
});

export const useGetAllTodos = todosApi.endpoints.getAllTodos.useQuery;

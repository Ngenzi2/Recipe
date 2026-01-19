import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Recipe,
  RecipesResponse,
  CreateRecipeRequest,
  UpdateRecipeRequest,
} from '@/types';
import type { RootState } from '@/store'; // Import your RootState type

const API_BASE = 'https://dummyjson.com';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    fetchFn: async (input, init) => {
      // Disable HTTP caching to ensure fresh data on refetch
      const headers = new Headers(init?.headers);
      headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      headers.set('Pragma', 'no-cache');
      headers.set('Expires', '0');
      return fetch(input, { ...init, headers });
    },
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json');
      // Cast getState to the correct type
      const state = getState() as RootState;
      const token = state.auth?.user?.accessToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Recipe'],
  endpoints: (builder) => ({
    getRecipes: builder.query<
      RecipesResponse,
      {
        skip?: number;
        limit?: number;
        search?: string;
        sortBy?: string;
        order?: 'asc' | 'desc';
      }
    >({
      query: ({ skip = 0, limit = 10, search = '', sortBy = 'name', order = 'asc' }) => {
        let url = `/recipes?skip=${skip}&limit=${limit}`;
        if (search) {
          url += `&q=${encodeURIComponent(search)}`; // Fixed: dummyjson uses 'q' for search, not 'search'
        }
        if (sortBy && order) {
          url += `&sortBy=${sortBy}&order=${order}`;
        }
        return url;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.recipes.map(({ id }) => ({ type: 'Recipe' as const, id })),
              { type: 'Recipe' as const, id: 'LIST' },
            ]
          : [{ type: 'Recipe' as const, id: 'LIST' }],
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
      providesTags: (_, __, id) => [{ type: 'Recipe', id }],
    }),
    createRecipe: builder.mutation<Recipe, CreateRecipeRequest>({
      query: (body) => ({
        url: '/recipes/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Recipe'],
    }),
    updateRecipe: builder.mutation<Recipe, UpdateRecipeRequest>({
      query: ({ id, ...body }) => ({
        url: `/recipes/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Recipe'],
    }),
    deleteRecipe: builder.mutation<{ id: number; deleted: boolean }, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Recipe', id }, { type: 'Recipe', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApi;

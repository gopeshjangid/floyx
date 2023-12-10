import { baseQuery } from '@/lib/utils';
import { createApi } from '@reduxjs/toolkit/query/react';
// import NProgress from "nprogress";

// const BASEURL = 'http://localhost:8000/api/notes';

export const noteAPI = createApi({
  reducerPath: 'noteAPI',
  baseQuery: baseQuery,
  tagTypes: ['Notes'],
  endpoints: builder => ({
    createNote: builder.mutation({
      query(note) {
        return {
          url: '/',
          method: 'POST',
          credentials: 'include',
          body: note,
        };
      },
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
      transformResponse: (result: { note: any }) => result.note,
      // onQueryStarted(arg, api) {
      // NProgress.start();
      // },
    }),
    updateNote: builder.mutation({
      query({ id, note }) {
        return {
          url: `/${id}`,
          method: 'PATCH',
          credentials: 'include',
          body: note,
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: 'Notes', id },
              { type: 'Notes', id: 'LIST' },
            ]
          : [{ type: 'Notes', id: 'LIST' }],
      transformResponse: (response: { note: any }) => response.note,
      // onQueryStarted(arg, api) {
      //   NProgress.start();
      // },
    }),
    getNote: builder.query({
      query(id) {
        return {
          url: `/${id}`,
          credentials: 'include',
        };
      },
      providesTags: (result, error, id) => [{ type: 'Notes', id }],
    }),
    getAllNotes: builder.query({
      query({ page, limit }) {
        return {
          url: `/?page=${page}&limit=${limit}`,
          credentials: 'include',
        };
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }: any) => ({
                type: 'Notes' as const,
                id,
              })),
              { type: 'Notes', id: 'LIST' },
            ]
          : [{ type: 'Notes', id: 'LIST' }],
      transformResponse: (results: { notes: any }) => results.notes,
      // onQueryStarted(arg, api) {
      //   NProgress.start();
      // },
      keepUnusedDataFor: 5,
    }),
    deleteNote: builder.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Notes', id: 'LIST' }],
      // onQueryStarted(arg, api) {
      //   NProgress.start();
      // },
    }),
  }),
});

export const { useCreateNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation, useGetAllNotesQuery, useLazyGetAllNotesQuery } =
  noteAPI;

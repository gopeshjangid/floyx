/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { baseQuery } from '@/lib/utils';
import { postServices } from "../posts";
import { artcileDetails } from '../articleDetails';

export const commentService = createApi({
  reducerPath: 'commentReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    createComment: builder.mutation<any, any>({
      query: (commantData) => ({
        url: `${ApiEndpoint.AddComment}`,
        method: 'POST',
        body: commantData,
      }),
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          if (arg.type === 'PostComment') {
            api.dispatch(postServices.util.invalidateTags([{ type: 'Posts', id: 'LIST' }]))
          } else {
            api.dispatch(artcileDetails.util.invalidateTags(['LikeStatus']));
          }
        })
      }
    }),
  }),
  tagTypes: ['Comment'],
});

export const {
  useCreateCommentMutation,
} = commentService;

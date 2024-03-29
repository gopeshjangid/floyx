/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { baseQuery } from '@/lib/utils';
import { postServices } from '../posts';
import { UserComment, artcileDetails } from '../articleDetails';
import { ApiResponse } from '../profile';

interface DeleteCommentParams {
  commentId: string;
  type: boolean;
}

interface UpdateCommentParams {
  commentId: string;
  content: string;
  isNewComment?: boolean;
}

export const commentService = createApi({
  reducerPath: 'commentReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getCommentList: builder.query<UserComment[], string>({
      query: articleId => `${ApiEndpoint.GetComments}/${articleId}`,
      transformResponse: (response: any) => response?.value?.data || [],
      providesTags: (result, error, articleId) => result ? [
        { type: 'CommentList', id: articleId },
      ] : ['CommentList'],
    }),
    createComment: builder.mutation<UserComment, any>({
      query: commantData => ({
        url: `${ApiEndpoint.AddComment}`,
        method: 'POST',
        body: commantData,
      }),
      transformResponse: (response: any) => response?.value?.data,
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(response => {
          if (arg.type === 'PostComment') {
            api.dispatch(
              postServices.util.updateQueryData(
                'getPosts',
                {
                  pageNumber: 0,
                  postCreatedDate: 0,
                },
                draft => {
                  // Find the article in the draft data and update its comment count
                  const article = draft.postList.find(
                    article => article.id === response.data.comment.itemId
                  );
                  if (article) {
                    article.post.numberOfComments += 1;
                  }
                }
              )
            );
            api.dispatch(
              postServices.util.updateQueryData(
                'getPostListByUser',
                {
                  pageNumber: 0,
                  postCreatedDate: 0,
                  username: '',
                },
                draft => {
                  // Find the article in the draft data and update its comment count
                  const article = draft.postList.find(
                    article => article.id === response.data.comment.itemId
                  );
                  if (article) {
                    article.post.numberOfComments += 1;
                  }
                }
              )
            );
            api.dispatch(
              postServices.util.invalidateTags([
                { type: 'Posts', id: 'LIST' },
                'postDetail',
              ])
            );
          } else {
            api.dispatch(artcileDetails.util.invalidateTags(['ArticleDetail']));
            api.dispatch(commentService.util.invalidateTags(['CommentList']));
          }
        });
      },
      invalidatesTags: (meta, args, type) => {
        return [{ type: 'CommentList', id: type }];
      },
    }),
    getUserSuggestion: builder.query<any, any>({
      query: mentionValue => `${ApiEndpoint.FindUserByName}/${mentionValue}`,
      transformResponse: (response: any) =>
        (response?.value?.data || []).map((user: any) => {
          return {
            avatar: user.avatar,
            display: user.name,
            id: user.username,
          };
        }),
    }),
    updateComment: builder.mutation<
      ApiResponse<undefined>,
      UpdateCommentParams
    >({
      query: commentData => ({
        url: `${ApiEndpoint.EditComment}/${commentData.commentId}`,
        method: 'PUT',
        body: {
          content: commentData.content,
        },
      }),
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(_ => {
          if (!arg.isNewComment) {
            api.dispatch(commentService.util.invalidateTags(['CommentList']));
          }
        });
      },
    }),
    deleteComment: builder.mutation<
      ApiResponse<undefined>,
      DeleteCommentParams
    >({
      query: commentData => ({
        url: `${ApiEndpoint.DeleteComment}/${commentData?.commentId}?type=${
          commentData?.type ? 'PostComment' : 'ArticleComment'
        }`,
        method: 'delete',
      }),
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(response => {
          if (arg.type) {
            api.dispatch(
              postServices.util.updateQueryData(
                'getPosts',
                {
                  pageNumber: 0,
                  postCreatedDate: 0,
                },
                draft => {
                  // Find the article in the draft data and update its comment count
                  const article = draft.postList.find(
                    article => article.id === arg?.commentId
                  );
                  if (article) {
                    article.post.numberOfComments += 1;
                  }
                }
              )
            );
            api.dispatch(
              postServices.util.invalidateTags([
                { type: 'Posts', id: 'LIST' },
                'postDetail',
              ])
            );
            api.dispatch(commentService.util.invalidateTags(['CommentList']));
          } else {
            api.dispatch(artcileDetails.util.invalidateTags(['ArticleDetail']));
            api.dispatch(commentService.util.invalidateTags(['CommentList']));
          }
        });
      },
    }),
  }),
  tagTypes: ['CommentList'],
});

export const {
  useCreateCommentMutation,
  useGetCommentListQuery,
  useLazyGetCommentListQuery,
  useLazyGetUserSuggestionQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentService;

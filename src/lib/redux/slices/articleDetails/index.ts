/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { baseQuery } from '@/lib/utils';
import { postServices } from '../posts';
import { commentService } from '../comments';

interface ArticleDetailsArgs {
  userName: string;
  articlePuclicUrl: string;
}

interface LikeStatusArgs {
  articleId: string;
  type: string;
}

interface LikeStatusData {
  likeByAuthor: boolean;
  numberOfLikes: number;
}

export interface ArticleComments {
  autoFocus: boolean;
  index: number;
  key: string;
  tooltip: boolean;
  type: string;
  value: string;
  tooltipIcon: boolean;
}

interface Article {
  id: string;
  title: string;
  coverPhotoPath: string | null;
  publicationDate: number;
  publicUrl: string;
  numberOfLikes: number;
  likedByAuthor: boolean;
  numberOfShares: number;
  numberOfComments: number;
  content: ArticleComments[];
  tags: string[];
}

interface articleUser {
  numberOfArticles: number;
  isFollowed: boolean;
  id: string;
  name: string;
  username: string;
  avatar: string;
  official: boolean;
  accountType: number;
}

interface ArticleData {
  article: Article;
  user: articleUser;
}

interface Comment {
  id: string;
  itemId: string;
  createdDateTime: number;
  content: string;
  numberOfLikes: number;
  likedByAuthor: boolean;
}

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  official: boolean;
  accountType: number;
}

export interface UserComment {
  user: User;
  comment: Comment;
}

interface ArticleDraftsNumber {
  numberOfArticles: number;
  numberOfDrafts: number;
}

interface shareArticleArgs {
  articleId: string;
  status: boolean;
  payload: {
    content: string;
  };
}

export const artcileDetails = createApi({
  reducerPath: 'artcileDetailsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getArticleDetails: builder.query<ArticleData, ArticleDetailsArgs>({
      query: ({ userName, articlePuclicUrl }) =>
        `${ApiEndpoint.GetArticles}/${userName}/${articlePuclicUrl}`,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: ['LikeStatus'],
    }),
    getFollowStatus: builder.mutation<any, string>({
      query: userName => ({
        url: `${ApiEndpoint.Follow}/${userName}`,
        method: 'POST',
        body: {},
      }),
      providesTags: ['FollowStatus'],
    }),
    postLikeStatus: builder.mutation<LikeStatusData, LikeStatusArgs>({
      query: ({ articleId, type }) => ({
        url: `${ApiEndpoint.Like}/${articleId}?type=${type}`,
        method: 'POST',
      }),
      invalidatesTags: (_, __, arg) =>
        arg.type === 'ArticleLike' ? ['LikeStatus'] : [],
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          if (arg.type == 'PostLike') {
            api.dispatch(
              postServices.util.invalidateTags([
                { type: 'Posts', id: 'LIST' },
                'postDetail',
              ])
            );
          } else if (arg.type == 'PostCommentLiked') {
            api.dispatch(commentService.util.invalidateTags(['commentList']));
          }
        });
      },
    }),
    getArticleTotalEarnings: builder.query<any, string>({
      query: articleId => `${ApiEndpoint.ArticleTotalEarning}/${articleId}`,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: ['articleTip'],
    }),
    setTip: builder.mutation<any, string>({
      query: payload => ({
        url: `${ApiEndpoint.TipArticle}`,
        method: 'POST',
        body: payload,
      }),
      transformErrorResponse: (error: any) => error?.data?.value?.data || '',
      invalidatesTags: ['articleTip'],
    }),

    getArticleList: builder.query<any, string | undefined>({
      query: tabName =>
        `${ApiEndpoint.GetArticles}${tabName ? `/${tabName}` : ''}`,
      providesTags: (result, error, type) => [
        { type: 'ArticleList', id: type },
      ],
      transformResponse: (response: any) => response?.value?.data || [],
    }),
    getArticleInfo: builder.query<ArticleDraftsNumber, void>({
      query: () => `${ApiEndpoint.GetArticlesInfo}`,
      transformResponse: (response: any) => response?.value?.data || {},
      providesTags: ['ArticleInfoNumber', 'deleteArticle'],
    }),

    checkArticleIsShared: builder.mutation<boolean, string>({
      query: articleId => ({
        url: `${ApiEndpoint.IsSharedPost}/${articleId}`,
        method: 'POST',
      }),
      transformResponse: (response: any) => response?.value?.data,
    }),
    shareArticle: builder.mutation<any, shareArticleArgs>({
      query: ({ articleId, status, payload }) => ({
        url: `${ApiEndpoint.ShareArticle}/${articleId}/${status}`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: any) => response?.value?.data || {},
      invalidatesTags: ['LikeStatus'],
    }),
    createArticleDraft: builder.mutation<any, any>({
      query: payload => ({
        url: `${ApiEndpoint.CreateDraft}`,
        method: 'post',
        body: payload,
      }),
      transformResponse: (response: any) => {
        return response.value.data;
      },
      invalidatesTags: ['ArticleInfoNumber'],
    }),
    updateDraftArticle: builder.mutation<any, any>({
      query: ({ articleId, payload }) => {
        return {
          url: `${ApiEndpoint.UpdateDraft}/${articleId}`,
          method: 'put',
          body: payload,
        };
      },
      transformResponse: (response: any) => response.value.data,
    }),
    publishArticle: builder.mutation<any, any>({
      query: articleId => ({
        url: `${ApiEndpoint.PublishDraft}/${articleId}`,
        method: 'put',
        body: {},
      }),
      transformResponse: (response: any) => response.value.data,
      invalidatesTags: [
        { type: 'ArticleList', id: 'popular' },
        { type: 'ArticleList', id: 'recent' },
        { type: 'ArticleList', id: 'following' },
      ],
    }),
    deleteArticle: builder.mutation<any, string>({
      query: articleId => ({
        url: `${ApiEndpoint.DeleteArticle}/${articleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['deleteArticle'],
    }),
    getFollowMoreAccount: builder.query<any, void>({
      query: () => `${ApiEndpoint.AccountsToFallow}?forHome=true`,
      transformResponse: (response: any) => response?.value?.data || {},
    }),
    getDraftDetail: builder.query<any, void>({
      query: articleId => `${ApiEndpoint.GetDrafts}/${articleId}`,
      transformResponse: (response: any) => response?.value?.data || {},
    }),
  }),
  tagTypes: [
    'LikeStatus',
    'ArticleList',
    'FollowStatus',
    'articleTip',
    'getArticleList',
    'deleteArticle',
    'ArticleInfoNumber',
  ],
});

export const {
  useGetArticleDetailsQuery,
  useGetFollowStatusMutation,
  usePostLikeStatusMutation,
  useGetArticleTotalEarningsQuery,
  useSetTipMutation,
  useCheckArticleIsSharedMutation,
  useShareArticleMutation,
  useGetArticleListQuery,
  useLazyGetArticleListQuery,
  useGetArticleInfoQuery,
  useCreateArticleDraftMutation,
  useUpdateDraftArticleMutation,
  usePublishArticleMutation,
  useDeleteArticleMutation,
  useGetFollowMoreAccountQuery,
  useLazyGetDraftDetailQuery,
} = artcileDetails;

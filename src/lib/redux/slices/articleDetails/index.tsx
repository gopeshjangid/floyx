/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { baseQuery } from '@/lib/utils';
import { postServices } from "../posts";

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

interface UserComment {
  user: User;
  comment: Comment;
}

interface ArticleDraftsNumber {
  numberOfArticles: number;
  numberOfDrafts: number
}


// const newtoken =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJzdWIiOiI1ZWZkYmYxNGZiNmJlNTAwMDFjYmMzNmMiLCJ1bmlxdWVfbmFtZSI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImp0aSI6ImI0ODJjYTgyLTE2ZWYtNGNiNy1hODI2LTAwMmQ2NTM1N2RkYiIsImlhdCI6IjE3MDE0MTc1MzUxMTUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvaXNwZXJzaXN0ZW50IjoiZmFsc2UiLCJuYmYiOjE3MDE0MTc1MzUsImV4cCI6MTcwMTQyMTEzNSwiaXNzIjoiZmxveXgifQ.jeA9BA7cSUUce5zOlGYBSHZpdQXQhG9fcaMWH9byTzQ"

// const baseQuery = fetchBaseQuery({
//   baseUrl: '/',
//   prepareHeaders: (headers, { getState }) => {
//     console.log('calling apis');
//     headers.set('authorization', `Bearer ${newtoken}`);
//     // }
//     return headers;
//   },
// });

export const artcileDetails = createApi({
  reducerPath: 'artcileDetailsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getArticleDetails: builder.query<ArticleData, ArticleDetailsArgs>({
      query: ({ userName, articlePuclicUrl }) =>
        `${ApiEndpoint.GetArticles}/${userName}/${articlePuclicUrl}`,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: ['FollowStatus', 'LikeStatus'],
    }),
    getFollowStatus: builder.mutation<any, string>({
      query: userName => ({
        url: `${ApiEndpoint.Follow}/${userName}`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['FollowStatus'],
    }),
    getLikeStatus: builder.mutation<LikeStatusData, LikeStatusArgs>({
      query: ({ articleId, type }) => ({
        url: `${ApiEndpoint.Like}/${articleId}?type=${type}`,
        method: 'POST',
      }),
      invalidatesTags: (_, __, arg) => arg.type === 'ArticleLike' ? ['LikeStatus']: [],
      onQueryStarted: (arg, api) => {
        if (arg.type == 'PostLike') {
          api.queryFulfilled.then(() => {
            api.dispatch(postServices.util.invalidateTags([{ type: 'Posts', id: 'LIST' }]))
          })
        }
      },
    }),
    getArticleTotalEarnings: builder.query<any, string>({
      query: (articleId) => `${ApiEndpoint.ArticleTotalEarning}/${articleId}`,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: ['articleTip'],
    }),
    setTip: builder.mutation<any, string>({
      query: (payload) => ({
        url: `${ApiEndpoint.TipArticle}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['articleTip'],
    }),
    getCommentList: builder.query<UserComment[], string>({
      query: articleId => `${ApiEndpoint.GetComments}/${articleId}`,
      transformResponse: (response: any) => response?.value?.data || [],
    }),
    getArticleList : builder.query<any, string>({
      query: (tabName) =>`${ApiEndpoint.DeleteArticle}/${tabName}`,
      transformResponse: (response: any) => response?.value?.data || [],
    }),
    getArticleInfo : builder.query<ArticleDraftsNumber, void>({
      query: () =>`${ApiEndpoint.GetArticlesInfo}`,
      transformResponse: (response: any) => response?.value?.data || {},
    })
  }),
  tagTypes: ['FollowStatus', 'LikeStatus', 'articleTip'],
});

export const {
  useGetArticleDetailsQuery,
  useGetFollowStatusMutation,
  useGetLikeStatusMutation,
  useGetArticleTotalEarningsQuery, 
  useSetTipMutation,
  useGetCommentListQuery,
  useGetArticleListQuery, 
  useGetArticleInfoQuery
} = artcileDetails;

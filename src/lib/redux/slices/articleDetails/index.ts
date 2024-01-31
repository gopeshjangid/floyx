/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { baseQuery } from '@/lib/utils';
import { postServices } from '../posts';
import { commentService } from '../comments';
import { ApiResponse } from '../profile';

export interface ArticleDetailsArgs {
  userName: string;
  articlePuclicUrl: string;
}

interface LikeStatusArgs {
  articleId: string;
  type: string;
}

export interface LikeStatusData {
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

type totalEarningsType = {
  articleEarnedAmount: number;
  currencyName: string;
  userEarnedAmount: number;
};

interface ArticleEarning {
  articleId: string;
  articlePublicUrl: string;
  articleUserId: string;
  totalEarnings: totalEarningsType[];
}

export const artcileDetails = createApi({
  reducerPath: 'artcileDetailsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getArticleDetails: builder.query<ArticleData, ArticleDetailsArgs>({
      query: ({ userName, articlePuclicUrl }) =>
        `${ApiEndpoint.GetArticles}/${userName}/${articlePuclicUrl}`,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: ['ArticleDetail'],
    }),
    getArticlesByAuthor: builder.query<
      ArticleData[],
      { username: string; pageSize: number }
    >({
      query: ({ username, pageSize }) =>
        `${ApiEndpoint.GetArticles}/${username}?count=${pageSize}`,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: (result, error, arg) => [
        { type: 'articleListByuser', id: arg.username },
      ],
    }),
    likeItem: builder.mutation<LikeStatusData, LikeStatusArgs>({
      query: ({ articleId, type }) => ({
        url: `${ApiEndpoint.Like}/${articleId}?type=${type}`,
        method: 'POST',
      }),
      transformResponse: (response: any) => response?.value?.data,
      invalidatesTags: (_, __, arg) =>
        arg.type === 'ArticleLike'
          ? ['ArticleDetail']
          : [{ type: 'CommentList', id: arg.articleId }],
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(response => {
          if (arg.type == 'PostLike') {
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
                    article => article.id === arg.articleId
                  );
                  if (article) {
                    article.post.numberOfLikes = response?.data?.numberOfLikes;
                    article.post.likedByAuthor = response?.data?.likeByAuthor;
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
                    article => article.id === arg.articleId
                  );
                  if (article) {
                    article.post.numberOfLikes = response?.data?.numberOfLikes;
                    article.post.likedByAuthor = response?.data?.likeByAuthor;
                  }
                }
              )
            );

            api.dispatch(postServices.util.invalidateTags(['postDetail']));
          } else if (
            arg.type == 'PostCommentLiked' ||
            arg.type === 'ArticleCommentLiked'
          ) {
            api.dispatch(commentService.util.invalidateTags(['CommentList']));
          }
        });
      },
    }),
    getArticleTotalEarnings: builder.query<ArticleEarning, string>({
      query: articleId => `${ApiEndpoint.ArticleTotalEarning}/${articleId}`,
      transformResponse: (response: ApiResponse<ArticleEarning>) =>
        response?.value?.data,
      providesTags: (result, error, arg) => [{ type: 'articleTip', id: arg }],
    }),
    setTip: builder.mutation<any, string>({
      query: payload => ({
        url: `${ApiEndpoint.TipArticle}`,
        method: 'POST',
        body: payload,
      }),
      transformErrorResponse: (error: any) => error?.data?.value?.data || '',
      invalidatesTags: ['articleTip', 'tipHistory', 'walletHistory'],
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
      providesTags: ['ArticleInfoNumber'],
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
      invalidatesTags: ['ArticleDetail'],
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
    uploadArticleImage: builder.mutation<ApiResponse<string>, FormData>({
      query: payload => ({
        url: `${ApiEndpoint.UploadArticleImage}`,
        method: 'post',
        body: payload,
      }),
      transformResponse: (response: any) => {
        return response.value.data;
      },
    }),
    updateDraftArticle: builder.mutation<any, any>({
      query: ({ articleId, payload }) => {
        return {
          url: `${ApiEndpoint.UpdateDraft}/${articleId}`,
          method: 'put',
          // body: { ...payload, articleTags: payload.articleTags ? payload.articleTags.split(','): [] },
          body: payload,
        };
      },
      transformResponse: (response: any) => response.value.data,
      invalidatesTags: [
        { type: 'ArticleList', id: 'recent' },
        'ArticleInfoNumber',
      ],
    }),
    publishArticle: builder.mutation<any, any>({
      query: payload => ({
        url: `${ApiEndpoint.PublishDraft}/${payload.articleId}`,
        method: 'put',
        body: {
          articleTags: payload.articleTags,
        },
      }),
      transformResponse: (response: any) => response.value.data,
      invalidatesTags: [
        { type: 'ArticleList', id: 'recent' },
        'ArticleInfoNumber',
      ],
    }),
    deleteArticle: builder.mutation<any, string>({
      query: articleId => ({
        url: `${ApiEndpoint.DeleteArticle}/${articleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['deleteArticle'],
    }),

    getDraftDetail: builder.query<any, void>({
      query: articleId => `${ApiEndpoint.GetDrafts}/${articleId}`,
      transformResponse: (response: any) => response?.value?.data || {},
    }),
    getSearchArticle: builder.query<any, { searchString: string }>({
      query: ({ searchString }) =>
        `${ApiEndpoint.SearchArticle}?query=${searchString}`,
      providesTags: (result, error, type) => [
        { type: 'SearchArticle', id: type.searchString },
      ],
      transformResponse: (response: any) => response?.value?.data || [],
    }),
  }),
  tagTypes: [
    'ArticleDetail',
    'ArticleList',
    'FollowStatus',
    'articleTip',
    'getArticleList',
    'deleteArticle',
    'ArticleInfoNumber',
    'articleListByuser',
    'FollowedAccount',
    'SearchArticle',
    'CommentList',
    'tipHistory',
    'walletHistory',
  ],
});

export const {
  useGetArticleDetailsQuery,
  useLikeItemMutation,
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
  useLazyGetDraftDetailQuery,
  useGetArticlesByAuthorQuery,
  useLazyGetSearchArticleQuery,
  useUploadArticleImageMutation,
} = artcileDetails;

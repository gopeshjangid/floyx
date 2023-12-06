/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { baseQuery } from '@/lib/utils';

interface Wallet {
  availableBalance: number;
  totalAmountWithdrew: number;
  totalBalance: number;
  walletAddress: string;
  id: string;
}

type Task = {
  userId: string;
  bonusTaskId: string;
  taskName: string;
  countNeeded: number;
  promotedDays: number;
  isCompleted: boolean;
};

type ApiResponse<T> = {
  value: {
    data: T;
    code: string;
  };
};

type TipHistoryType = {
  amountEarned: number;
  articleId: string;
  articlePublicUrl: string;
  articleUserName: string;
  earnedOn: string;
  userId: string;
};

type ArticleHistry = {
  amountEarned: number;
  articleId: string;
  articleUrl: string;
  articleUserId: string;
  earnedOn: string;
};

type UserProfileDetails = {
  accountType: number;
  allowPrivateMassages: boolean;
  avatar: string;
  backgroundImage: string;
  experienced: boolean;
  followed: boolean;
  id: string;
  name: string;
  numberOfArticles: number;
  numberOfEvents: number;
  numberOfFollowers: number;
  numberOfFollowing: number;
  numberOfMilestones: number;
  numberOfPosts: number;
  official: boolean;
  shortDescription: string;
  username: string;
};

type CompletedTaskHistory = {
  amountEarned: number;
  earnedOn: string;
  userId: string;
};

type InviteHistoryResponse = {
  currentMilestone: number;
  currentMilestoneAmount: number;
  nextMilestone: number;
  nextMilestoneAmount: number;
  referralHistory: any[]; // Replace 'any' with a more specific type if you know the structure of objects in this array
  total: number;
};

type ProfileDetails = {
  accountType: number;
  avatar: string;
  email: string | null;
  name: string;
  userId: string;
  username: string;
  verified: boolean;
};

type BonusTaskStatusResponse = Task[];
type TipHistoryTypeResponse = TipHistoryType[];
type CompletedHistoryTypeResponse = CompletedTaskHistory[];

export const profileService = createApi({
  reducerPath: 'profileReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getCurrentProfileDetails: builder.query<ProfileDetails, void>({
      query: () => ApiEndpoint.ProfileDetails,
      transformResponse: (response: ApiResponse<ProfileDetails>) =>
        response?.value?.data,
    }),
    getProfileDetails: builder.query<UserProfileDetails, void>({
      query: (params: any) =>
        ApiEndpoint.ProfileDetails + '/' + params?.username,
      transformResponse: (response: ApiResponse<UserProfileDetails>) =>
        response?.value?.data,
    }),
    getTipHistory: builder.query<TipHistoryTypeResponse, void>({
      query: () => ApiEndpoint.UserTipHistory,
      transformResponse: (response: ApiResponse<TipHistoryTypeResponse>) => {
        console.log({ response });
        return response?.value?.data;
      },
    }),
    getArticleTipHistory: builder.query<ArticleHistry[], void>({
      query: () => ApiEndpoint.UserArticleTipHistory,
      transformResponse: (response: any) => response?.value?.data,
    }),
    getBonusTaskStatus: builder.query<BonusTaskStatusResponse, void>({
      query: () => ApiEndpoint.BonusTaskStatus,
      transformResponse: (response: ApiResponse<BonusTaskStatusResponse>) =>
        response?.value.data,
    }),
    getInviteHistory: builder.query<InviteHistoryResponse, void>({
      query: () => ApiEndpoint.GetInviteHistory,
      transformResponse: (response: ApiResponse<InviteHistoryResponse>) =>
        response?.value.data,
    }),
    getCompletedTaskHistory: builder.query<CompletedHistoryTypeResponse, void>({
      query: () => ApiEndpoint.CompletedTaskHistory,
      transformResponse: (
        response: ApiResponse<CompletedHistoryTypeResponse>
      ) => response?.value.data,
    }),

    // Add other endpoints if needed
  }),
  // Enable caching, invalidation, and other features
  tagTypes: ['TransactionHistory'],
});

export const { useGetProfileDetailsQuery, useGetCurrentProfileDetailsQuery } =
  profileService;

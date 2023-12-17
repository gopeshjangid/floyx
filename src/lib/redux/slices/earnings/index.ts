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

type ReferralHistory = {
  invitedUsername: string;
  referrEarnedAmount: number;
  invitedDate: string;
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

export type DailyTaskType = {
  canGetReward: boolean;
  dailyTaskId: string;
  isCompleted: boolean;
  taskAddedAt: string;
  taskDescription: string;
  taskReward: number;
  taskStatus: string;
  userid: string;
};

type ActiveCurrencyType = {
  budgetLeft: number;
  createdDate: string;
  currencyName: string;
  id: string;
  totalBudget: number;
};

type BonusTaskStatusResponse = Task[];
type ReferralStatusResponse = ReferralHistory[];
type TipHistoryTypeResponse = TipHistoryType[];
type CompletedHistoryTypeResponse = CompletedTaskHistory[];

export const earningsService = createApi({
  reducerPath: 'earningsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getTransactionHistory: builder.query<Wallet, void>({
      query: () => ApiEndpoint.GetTransactionHistory,
      transformResponse: (response: any) => response?.value?.data,
    }),
    getUserWallet: builder.query<Wallet, void>({
      query: () => ApiEndpoint.UserWallet,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: ['walletHistory'],
    }),
    getTipHistory: builder.query<TipHistoryTypeResponse, void>({
      query: () => ApiEndpoint.UserTipHistory,
      transformResponse: (response: ApiResponse<TipHistoryTypeResponse>) => {
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
    getActiveCurrency: builder.query<ActiveCurrencyType, void>({
      query: () => ApiEndpoint.ActiveCurrency,
      transformResponse: (response: ApiResponse<ActiveCurrencyType>) =>
        response?.value.data,
    }),
    getCompletedTaskHistory: builder.query<CompletedHistoryTypeResponse, void>({
      query: () => ApiEndpoint.CompletedTaskHistory,
      transformResponse: (
        response: ApiResponse<CompletedHistoryTypeResponse>
      ) => response?.value.data,
    }),
    getDailyTaskList: builder.query<DailyTaskType[], void>({
      query: () => ApiEndpoint.DailyTaskStatus,
      transformResponse: (response: ApiResponse<DailyTaskType[]>) =>
        response?.value.data,
      providesTags: ['dailTaskList'],
    }),
    updateWallet: builder.mutation<string, { walletAddress: string }>({
      query: walletData => ({
        url: `${ApiEndpoint.UpdateWallet}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
        body: walletData,
      }),
      transformResponse: (response: ApiResponse<string>) => response.value.data,
      invalidatesTags: ['walletHistory'],
    }),

    // Add other endpoints if needed
  }),
  // Enable caching, invalidation, and other features
  tagTypes: ['TransactionHistory', 'dailTaskList', 'walletHistory'],
});

export const {
  useGetTransactionHistoryQuery,
  useGetArticleTipHistoryQuery,
  useGetTipHistoryQuery,
  useGetUserWalletQuery,
  useLazyGetTransactionHistoryQuery,
  useGetBonusTaskStatusQuery,
  useGetCompletedTaskHistoryQuery,
  useGetInviteHistoryQuery,
  useGetDailyTaskListQuery,
  useUpdateWalletMutation,
  useGetActiveCurrencyQuery,
} = earningsService;

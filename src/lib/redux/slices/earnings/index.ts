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

export type EarningStopped = {
  comment: string;
  stopEarings: boolean;
};

type BonusTaskStatusResponse = Task[];
type TipHistoryTypeResponse = TipHistoryType[];
type CompletedHistoryTypeResponse = CompletedTaskHistory[];

const customBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 404) {
     return {data: result.error.data};
  }
  return result;
};

const customResponse = (response:ApiResponse<any>)=>{
  if(Array.isArray(response.value.data)){
    return response.value.data
  } else if(typeof response.value.data ==='string') {
    return [];
  }else{
    return response.value.data;
  }
}

export const earningsService = createApi({
  reducerPath: 'earningsReducer',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getTransactionHistory: builder.query<Wallet, void>({
      query: () => ApiEndpoint.GetTransactionHistory,
      transformResponse: customResponse,
      extraOptions: {maxRetries: 2}
    }),
    getUserWallet: builder.query<Wallet, void>({
      query: () => ApiEndpoint.UserWallet,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: ['walletHistory'],
    }),
    getTipHistory: builder.query<TipHistoryTypeResponse, void>({
      query: () => ApiEndpoint.UserTipHistory,
      transformResponse: customResponse,
      providesTags: ['tipHistory'],
      extraOptions: {maxRetries: 2}
    }),
    getArticleTipHistory: builder.query<ArticleHistry[], void>({
      query: () => ApiEndpoint.UserArticleTipHistory,
      transformResponse: customResponse,
      providesTags: ['articleTipHistory'],
      extraOptions: {maxRetries: 2},
    }),
    getBonusTaskStatus: builder.query<BonusTaskStatusResponse, void>({
      query: () => ApiEndpoint.BonusTaskStatus,
      transformResponse: (response: ApiResponse<BonusTaskStatusResponse>) =>
        response?.value.data,
      providesTags: ['bonusTask'],
      extraOptions: {maxRetries: 2}
    }),
    collectTaskCompletedReward: builder.mutation<string, { taskId: string }>({
      query: params => ({
        url: `${ApiEndpoint.CollectDailyTaskReward}/${params.taskId}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
      }),
      transformResponse: (response: ApiResponse<string>) => response.value.data,
      invalidatesTags: (result) => result ?  ['dailTaskList'] : [],
    }),
    getInviteHistory: builder.query<InviteHistoryResponse, void>({
      query: () => ApiEndpoint.GetInviteHistory,
      transformResponse: customResponse,
      providesTags: ['inviteHistory'],
      extraOptions: {maxRetries: 2}
    }),
    getActiveCurrency: builder.query<ActiveCurrencyType, void>({
      query: () => ApiEndpoint.ActiveCurrency,
      transformResponse: (response: ApiResponse<ActiveCurrencyType>) =>
        response?.value.data,
      providesTags: ['activeCurrency'],
      extraOptions: {maxRetries: 2}
    }),
    getIsEarningStopped: builder.query<EarningStopped, void>({
      query: () => ApiEndpoint.IsEarningStopped,
      transformResponse: (response: ApiResponse<EarningStopped>) =>
        response?.value.data,
      providesTags: ['IsEarningStopped'],
    }),
    getCompletedTaskHistory: builder.query<CompletedHistoryTypeResponse, void>({
      query: () => ApiEndpoint.CompletedTaskHistory,
      transformResponse: customResponse,
      providesTags: ['completedTaskHistory'],
      extraOptions: {maxRetries: 2}
    }),
    getDailyTaskList: builder.query<DailyTaskType[], void>({
      query: () => ApiEndpoint.DailyTaskStatus,
      transformResponse: (response: ApiResponse<DailyTaskType[]>) =>
        response?.value.data,
      providesTags: ['dailTaskList'],
      extraOptions: {maxRetries: 2}
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
  tagTypes: [
    'TransactionHistory',
    'dailTaskList',
    'walletHistory',
    'articleTipHistory',
    'tipHistory',
    'bonusTask',
    'inviteHistory',
    'activeCurrency',
    'completedTaskHistory',
    'IsEarningStopped',
  ],
});

export const {
  useGetTransactionHistoryQuery,
  useGetArticleTipHistoryQuery,
  useGetTipHistoryQuery,
  useLazyGetTipHistoryQuery,
  useGetUserWalletQuery,
  useLazyGetTransactionHistoryQuery,
  useGetBonusTaskStatusQuery,
  useGetCompletedTaskHistoryQuery,
  useGetInviteHistoryQuery,
  useGetDailyTaskListQuery,
  useUpdateWalletMutation,
  useGetActiveCurrencyQuery,
  useGetIsEarningStoppedQuery,
  useCollectTaskCompletedRewardMutation,
} = earningsService;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { baseQuery } from '@/lib/utils';
import { Education, Project } from '@/components/ProfileActivityInfo';
import { artcileDetails } from './articleDetails';

type ApiResponse<T> = {
  value: {
    data: T;
    code: string;
  };
};

export type UserProfileDetails = {
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

type About = {
  location: string | null;
  website: string | null;
  skills: string[];
  description: string | null;
  github: string | null;
  prototype: string | null;
  video: string | null;
  category: string | null;
  interests: string[];
  languages: string[];
  acronym: string | null;
};

export type AboutType = {
  educations: null | any[]; // Replace 'any' with more specific type if available
  investments: null | any[]; // Replace 'any' with more specific type if available
  experiences: null | any[]; // Replace 'any' with more specific type if available
  about: About;
  listOfLocations: null | any[]; // Replace 'any' with more specific type if available
};

export type ProfileInfoType = {
  avatar: object | null; // Assuming 'avatar' is an object, you might want to define a more specific type if possible
  backgroundImage: Blob | null; // 'binary' often refers to a Blob type in the context of file data
  shortDescription: string;
  deleteAvatar: boolean;
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

export type Account = {
  name: string;
  username: string;
  avatar: string;
  shortDescription: string;
  backgroundImage: string;
  numberOfFollowers: number;
  numberOfFollowing: number;
  numberOfArticles: number;
  numberOfPosts: number;
  numberOfEvents: number;
  experienced: boolean;
  followed: boolean;
  official: boolean;
  accountType: number;
  id: string;
  numberOfMilestones: number;
  allowPrivateMassages: boolean;
};

export type UserDetailsType = Account;

type AccountApiResponse = {
  total: number;
  result: Account[];
  page: number;
};

type Experience = {
  company: string;
  description: string;
  fromMonth: string;
  fromYear: string;
  id?: string; // or null if it's more appropriate
  period: string;
  position: string;
  stillWorking?: boolean; // or true, depending on what makes sense as a default
  toMonth: string;
  toYear: string;
};

type ReportUser = {
  Username: string;
  Reason: string;
};

type ReportArticle = {
  contentId: string;
  Reason: string;
};

export const profileService = createApi({
  reducerPath: 'profileReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getCurrentProfileDetails: builder.query<ProfileDetails, void>({
      query: () => ApiEndpoint.ProfileDetails,
      transformResponse: (response: ApiResponse<ProfileDetails>) =>
        response?.value?.data,
      providesTags: ['currentProfile'],
    }),
    getProfileDetails: builder.query<UserProfileDetails, { username: string }>({
      query: (params: any) =>
        ApiEndpoint.ProfileDetails + '/' + params?.username,
      transformResponse: (response: ApiResponse<UserProfileDetails>) =>
        response?.value?.data,
      providesTags: (result, data, type) => [
        { type: 'profileDetails', id: type.username },
      ],
      transformErrorResponse: (error, meta) => {
        return error;
      },
    }),
    getPopularAccountsToFollow: builder.query<
      AccountApiResponse,
      { param?: string }
    >({
      query: ({ param }) => ApiEndpoint.AccountsToFallow + param,
      transformResponse: (response: ApiResponse<AccountApiResponse>) => {
        return response?.value?.data;
      },
      providesTags: ['PopularAccount'],
    }),
    getProfileAbout: builder.query<AboutType, { username: string }>({
      query: params => ApiEndpoint.GetAboutProfile + '/' + params?.username,
      transformResponse: (response: ApiResponse<AboutType>) =>
        response?.value?.data,
      providesTags: ['profileAbout'],
    }),
    addEducation: builder.mutation<Education, Partial<Education>>({
      query: educationData => ({
        url: ApiEndpoint.AddProfileEducation,
        method: 'POST',
        body: educationData,
      }),
      transformResponse: (response: ApiResponse<Education>, meta, arg) =>
        response.value.data,
      invalidatesTags: ['profileAbout'],
    }),
    addExperience: builder.mutation<Experience, Partial<Experience>>({
      query: experienceData => ({
        url: ApiEndpoint.AddProfileExperience,
        method: 'POST',
        body: experienceData,
      }),
      transformResponse: (response: ApiResponse<Experience>, meta, arg) =>
        response.value.data,
      invalidatesTags: ['profileAbout'],
    }),
    addInvestment: builder.mutation<Project, Partial<Project>>({
      query: investmentData => ({
        url: ApiEndpoint.AddProfileInvestments,
        method: 'POST',
        body: investmentData,
      }),
      transformResponse: (response: ApiResponse<Project>, meta, arg) =>
        response.value.data,
      invalidatesTags: ['profileAbout'],
    }),
    updateInvestment: builder.mutation<Project, Partial<Project>>({
      query: investmentData => ({
        url: `${ApiEndpoint.EditProfileInvestments}${investmentData.id}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
        body: investmentData,
      }),
      transformResponse: (response: ApiResponse<Project>) =>
        response.value.data,
      invalidatesTags: ['profileAbout'],
    }),
    updateExperience: builder.mutation<Experience, Partial<Experience>>({
      query: investmentData => ({
        url: `${ApiEndpoint.EditProfileExperience}${investmentData.id}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
        body: investmentData,
      }),
      transformResponse: (response: ApiResponse<Experience>) =>
        response.value.data,
      invalidatesTags: ['profileAbout'],
    }),
    updateEducation: builder.mutation<
      Education,
      Partial<Education & { id: string }>
    >({
      query: investmentData => ({
        url: `${ApiEndpoint.EditProfileEducation}${investmentData.id}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
        body: investmentData,
      }),
      transformResponse: (response: ApiResponse<Education>) =>
        response.value.data,
      invalidatesTags: ['profileAbout'],
    }),
    updateAboutInfo: builder.mutation<AboutType, Partial<About | AboutType>>({
      query: profileAbout => ({
        url: `${ApiEndpoint.UpdateAboutProfile}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
        body: profileAbout,
      }),
      transformResponse: (response: ApiResponse<AboutType>) =>
        response.value.data,
      invalidatesTags: ['profileAbout'],
    }),
    updateProfileDetail: builder.mutation<boolean, any>({
      query: profileDetail => ({
        url: `${ApiEndpoint.ProfileDetails}`,
        method: 'POST',
        body: profileDetail,
      }),
      transformResponse: (response: ApiResponse<boolean>) =>
        response.value.data,
      invalidatesTags: (result, error, arg) => [
        { type: 'profileDetails', id: arg.username },
      ],
    }),
    addReportUser: builder.mutation<ReportUser, Partial<ReportUser>>({
      query: profileAbout => ({
        url: `${ApiEndpoint.ReportUser}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
        body: profileAbout,
      }),
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          api.dispatch(artcileDetails.util.invalidateTags(['getArticleList']));
        });
      },
      transformResponse: (response: ApiResponse<ReportUser>) =>
        response.value.data,

      invalidatesTags: ['profileAbout', 'profileDetails'],
    }),
    addReportArticle: builder.mutation<ReportArticle, Partial<ReportArticle>>({
      query: profileAbout => ({
        url: `${ApiEndpoint.ReportArticle}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
        body: profileAbout,
      }),
      transformResponse: (response: ApiResponse<ReportArticle>) =>
        response.value.data,
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          api.dispatch(artcileDetails.util.invalidateTags(['getArticleList']));
        });
      },
      invalidatesTags: ['profileAbout', 'profileDetails'],
    }),
    blockUser: builder.mutation<ReportUser, Partial<{ username: string }>>({
      query: user => ({
        url: `${ApiEndpoint.BlockUser}/${user.username}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
        body: {},
      }),
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(() => {
          api.dispatch(artcileDetails.util.invalidateTags(['getArticleList']));
        });
      },
      transformResponse: (response: ApiResponse<ReportUser>) =>
        response.value.data,
      invalidatesTags: ['profileAbout', 'profileDetails'],
    }),
    followUser: builder.mutation<void, Partial<{ username: string }>>({
      query: user => ({
        url: `${ApiEndpoint.Follow}/${user.username}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
        body: {},
      }),
      transformResponse: (response: any) => response.value,
      invalidatesTags: [
        'profileAbout',
        'profileDetails',
        'PopularAccount',
        'FollowedAccount',
      ],
    }),
    getFollowMoreAccount: builder.query<any, void>({
      query: () => `${ApiEndpoint.AccountsToFallow}?forHome=true`,
      transformResponse: (response: any) => response?.value?.data || {},
      providesTags: ['FollowedAccount'],
    }),
  }),
  tagTypes: [
    'currentProfile',
    'Education',
    'profileAbout',
    'PopularAccount',
    'profileDetails',
    'FollowedAccount',
  ],
});

export const {
  useGetProfileDetailsQuery,
  useGetCurrentProfileDetailsQuery,
  useGetPopularAccountsToFollowQuery,
  useLazyGetPopularAccountsToFollowQuery,
  useGetProfileAboutQuery,
  useAddEducationMutation,
  useAddExperienceMutation,
  useAddInvestmentMutation,
  useUpdateEducationMutation,
  useUpdateExperienceMutation,
  useUpdateInvestmentMutation,
  useUpdateAboutInfoMutation,
  useAddReportUserMutation,
  useBlockUserMutation,
  useFollowUserMutation,
  useAddReportArticleMutation,
  useUpdateProfileDetailMutation,
  useGetFollowMoreAccountQuery,
} = profileService;

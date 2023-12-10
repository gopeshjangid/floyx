/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { baseQuery } from '@/lib/utils';
import { Education, Project } from '@/components/ProfileActivityInfo';

type ApiResponse<T> = {
  value: {
    data: T;
    code: string;
  };
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

type ProfileDetails = {
  accountType: number;
  avatar: string;
  email: string | null;
  name: string;
  userId: string;
  username: string;
  verified: boolean;
};

type Account = {
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

type BlockUser = {
  Username: string;
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
      providesTags: ['profileDetails'],
    }),
    getPopularAccountsToFollow: builder.query<AccountApiResponse, void>({
      query: () => ApiEndpoint.AccountsToFallow,
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
    addReportUser: builder.mutation<ReportUser, Partial<ReportUser>>({
      query: profileAbout => ({
        url: `${ApiEndpoint.ReportUser}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
        body: profileAbout,
      }),
      transformResponse: (response: ApiResponse<ReportUser>) =>
        response.value.data,
      invalidatesTags: ['profileAbout', 'profileDetails'],
    }),
    blockUser: builder.mutation<ReportUser, Partial<{ username: string }>>({
      query: user => ({
        url: `${ApiEndpoint.BlockUser}/${user.username}`, // Assuming `id` is part of investmentData
        method: 'POST', // or 'PATCH' for partial updates
        body: {},
      }),
      transformResponse: (response: ApiResponse<ReportUser>) =>
        response.value.data,
      invalidatesTags: ['profileAbout', 'profileDetails'],
    }),
  }),
  tagTypes: [
    'currentProfile',
    'Education',
    'profileAbout',
    'PopularAccount',
    'profileDetails',
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
} = profileService;

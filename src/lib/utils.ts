// @ts-nocheck

import moment from 'moment';
import { getCookie, deleteCookie } from 'cookies-next';
import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { signOut } from 'next-auth/react';
import { FIRST_TIME_LOGIN_USING_SOCIAL, SOCIAL_SIGNIN_DATA } from '@/constants';

export const getRelativeTime = (date: string) => {
  const dateObject = new Date(date);
  const sec = dateObject.getSeconds();
  const min = dateObject.getMinutes();
  const hh = dateObject.getHours();
  const dd = dateObject.getDate();
  const mm = dateObject.getMonth();
  const yyyy = dateObject.getFullYear();
  date = `${moment([yyyy, mm, dd, hh, min, sec]).fromNow(true)} ago`;
  return date;
};

export const showErrorMessages = (errorKeys: string[]): string => {
  return errorKeys
    .map(errorKey =>
      errorKey
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    )
    .join('. ');
};
// Define a helper function to check if we're on the server
const isServer = () => typeof window === 'undefined';

const logout = async () => {
  deleteCookie('FLOYX_TOKEN');
  deleteCookie('next-auth.session-token');
  deleteCookie(SOCIAL_SIGNIN_DATA);
  deleteCookie(FIRST_TIME_LOGIN_USING_SOCIAL);
  await signOut({ redirect: false });
};

export const baseQuery = retry(fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    const token = getCookie(
      'FLOYX_TOKEN',
      isServer() ? getState()?.req : getCookie('FLOYX_TOKEN')
    );
    headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
  responseHandler: async response => {
    
    if (response.status === 401) {
      logout();
    }
    return response.json();
  },
}),{maxRetries: 3});

export const fetchServerData = async (
  url: string, token:string
): { isError: boolean; data: any } => {
  try {
    console.log("TOKEN ->",token);
    const res = await fetch(url,{headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  }});
    if (!res.ok) {
      return { isError: true, data: null };
    }
    const data = await res.json();
    return { isError: false, data: data?.value?.data };
  } catch (e) {
    console.log('Fetch Error:', e);
    return { isError: true, data: JSON.stringify(e)};
  }
};

export const months = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

export const years = Array.from({ length: 2023 - 2000 + 1 }, (_, index) => ({
  label: String(index + 2000),
  value: String(index + 2000),
}));

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: any;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const formatIndianNumber = (num: number) => {
  if (num < 1000) {
    return num;
  } else if (num >= 1000 && num <= 9999) {
    return Math.floor(num / 1000) + 'K';
  } else if (num >= 10000 && num <= 999999) {
    return Math.floor(num / 1000) + 'K+';
  } else if (num >= 1000000 && num <= 9999999) {
    return Math.floor(num / 1000000) + 'M';
  } else if (num >= 10000000 && num <= 999999999) {
    return Math.floor(num / 1000000) + 'M+';
  } else {
    return num;
  }
};

export const addLinks = (content: any) => {
  if (!content) {
    return '';
  }

  const profileRegex = /@\[([^\]]+)\]\(([^)]+)\)/gm;
  const link =
    '<a href="/profile/$2" class="post-hyperlink" style="background:linear-gradient(to right, #AB59FF, #858FFF, #4D9AFF); -webkit-background-clip: text;-webkit-text-fill-color: transparent;font-weight: normal;color: white;">@$2</a>';

  const urlRegex = /(https?:\/\/[^\s\[\]()]+)/g;

  const urlLink = match => {
    let displayText = match;
    // Remove special characters from the URL
    const cleanedUrl = displayText.replace(/[\[\]()]/g, '');

    if (displayText.length > 40) {
      displayText = displayText.substring(0, 40) + '...';
    }
    return `<a class="post-hyperlink" href="${cleanedUrl}" target="_blank">${displayText}</a>`;
  };

  return content.replace(urlRegex, urlLink).replace(profileRegex, link);
};

export function copyTextToClipboard(text, onCopied = () => {}) {
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(onCopied, () => fallbackCopyTextToClipboard(text, onCopied));
  } else {
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text, onCopied) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      onCopied();
    } else {
      console.error('Fallback: Copying text command was unsuccessful');
    }
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  document.body.removeChild(textArea);
}

export const userBlockedStatus = [
  'Unable_to_show_detail_unblock_first',
  'Unable_to_show_data_user_blocked_you',
  'Both_user_blocked_each_other',
];

export const getUserBlockStatusMessage = (status) =>{
  switch (status) {
    case 'Unable_to_show_detail_unblock_first':
      return 'You blocked this user!';
      break;
    case 'Unable_to_show_data_user_blocked_you':
      return 'This user has blocked you. Unfortunately, you can not view the content of the profile, as well as you will not be able to access the content published by this profile';
      break;
    case 'Both_user_blocked_each_other':
      return 'You have blocked each other';
      break;
    default:
      return 'some thing went wrong!';
      break;
  }
}

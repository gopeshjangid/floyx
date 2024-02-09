/* eslint-disable no-useless-escape */

export const EMAIL_REGEX =
  /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
export const PROFILE_REGEX = /"@\[([^\]]+)\]\(([^\)]+)\)"/gm;
export const PARENTHESES_AND_BRACKETS_REGEX = /\(([^)]+)\)|]|\[/g;

export const FLOYX_TOKEN = 'FLOYX_TOKEN';
export const FLOYX_USERNAME = 'FLOYX_USERNAME';
export const SOCIAL_SIGNIN_DATA = 'SOCIAL_SIGNIN_DATA';
export const TWO_STEP_AUTH = 'TWO_STEP_AUTH';
export const FIRST_TIME_LOGIN_USING_SOCIAL = 'FIRST_TIME_LOGIN_USING_SOCIAL';
export const USERNAME_REGEX = /^[a-z0-9_]{3,15}$/
export const NAME_REGEX = /^[a-zA-Z0-9 ]{3,25}$/
/* eslint-disable no-useless-escape */

export const EMAIL_REGEX =
  /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
export const PROFILE_REGEX = /"@\[([^\]]+)\]\(([^\)]+)\)"/gm;
export const PARENTHESES_AND_BRACKETS_REGEX = /\(([^)]+)\)|]|\[/g;

export const FLOYX_TOKEN = 'FLOYX_TOKEN';
export const FLOYX_USERNAME = 'FLOYX_USERNAME';

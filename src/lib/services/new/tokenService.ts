'use client';

import { FLOYX_TOKEN, FLOYX_USERNAME } from '@/constants';
import { ApiEndpoint } from '@/lib/API/ApiEndpoints';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { EventEmitter } from 'events';

export class TokenService {
  public onNewToken = new EventEmitter();
  private currentLoggedUser = {
    avatar: '',
    name: '',
    username: '',
  };

  public init() {
    if (typeof window !== 'undefined') {
      const jsonToken = getCookie(FLOYX_TOKEN);
      if (jsonToken) {
        this.getCurrentUser();
      }
    }
  }

  public getCurrentUser = () => {
    fetch(ApiEndpoint.CurrentUserDetails, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getToken(),
      },
    })
      .then(response => response.json())
      .then(data => {
        this.currentLoggedUser = data.value.data;
        this.setImage(data.value.data.avatar);
        this.emmitCurrentUser();
      })
      .catch(err => console.error(err));
  };

  public setImage = (avatar: string) => {
    if (this.getImage() !== avatar)
      localStorage.setItem('FLOYX_AVATAR', avatar);
  };

  private readonly getImage = () => {
    return localStorage.getItem('FLOYX_AVATAR');
  };

  public emmitCurrentUser() {
    this.onNewToken.emit('USER', this.currentLoggedUser);
  }

  public getBearerToken = () => {
    const token = getCookie(FLOYX_TOKEN);
    return `Bearer ${token}`;
  };

  public getToken = () => {
    const token = getCookie(FLOYX_TOKEN);
    return token;
  };

  public setAuthData = (token: any) => {
    const jsonToken = JSON.stringify(token.token);
    const floyxUsername = token.username;
    setCookie(FLOYX_TOKEN, jsonToken);
    setCookie(FLOYX_USERNAME, floyxUsername);
    this.onNewToken.emit('TOKEN', jsonToken);
  };

  public removeAuthData = () => {
    deleteCookie(FLOYX_TOKEN);
    deleteCookie(FLOYX_USERNAME);
  };

  public getUsername() {
    const username = getCookie(FLOYX_USERNAME);

    if (username !== null) {
      return username;
    }

    return null;
  }

  public getAuthData() {
    const token: any = JSON.stringify(getCookie(FLOYX_TOKEN));

    if (token !== null && token !== undefined) {
      return JSON.parse(token);
    }

    return null;
  }
}

export const tokenService = new TokenService();

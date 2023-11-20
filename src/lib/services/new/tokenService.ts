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

  //   public updateAuthData = (jwt: any) => {
  //     const token = localStorage.getItem(TOKEN_NAME);

  //     this.setAuthData(jwt, token !== null);
  //   };

  //   public getCurrentUser = () => {
  //     requestService
  //       .get(ApiEndpoint.CurrentUserDetails)
  //       .success(resp => {
  //         this.currentLoggedUser = resp.data;
  //         this.setImage(resp.data.avatar);
  //         this.emmitCurrentUser();
  //       })
  //       .error(() => this.removeAuthData());
  //   };

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
    if (this.getImage() !== avatar) localStorage.setItem('FLOYX_AVATAR', avatar);
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

    // if (remember) {
    //   localStorage.setItem(TOKEN_NAME, jsonToken);
    //   localStorage.setItem(FLOYX_USERNAME, floyxUsername);
    // } else {
    //   sessionStorage.setItem(TOKEN_NAME, jsonToken);
    //   sessionStorage.setItem(FLOYX_USERNAME, floyxUsername);
    // }
  };

  public removeAuthData = () => {
    // localStorage.removeItem(TOKEN_NAME);
    // sessionStorage.removeItem(TOKEN_NAME);
    // localStorage.removeItem(FLOYX_USERNAME);
    // localStorage.removeItem(FLOYX_USERNAME);
    // localStorage.clear();
    // localStorage.removeItem(ApiEndpoint.GetPopularArticles);
    // localStorage.removeItem(ApiEndpoint.GetRecentArticles);
    // localStorage.removeItem(ApiEndpoint.GetFollowingArticles);
    // localStorage.removeItem(ApiEndpoint.GetLikedArticles);
    // localStorage.removeItem(ApiEndpoint.GetPosts + '/feed/main');
    // localStorage.removeItem(ApiEndpoint.AccountsToFallow + '?type=1');
    // localStorage.removeItem(ApiEndpoint.AccountsToFallow + '?type=2');
    // localStorage.removeItem('cache-' + ApiEndpoint.GetPopularEvents);
    // localStorage.removeItem(ApiEndpoint.GetWatchingEvents);
    // localStorage.removeItem('cache-' + ApiEndpoint.GetRecentEvents);
    // localStorage.removeItem('cache-' + ApiEndpoint.GetFollowingEvents);
    // localStorage.removeItem('cache-' + ApiEndpoint.GetLikedEvents);
    // localStorage.removeItem(ApiEndpoint.TopCoinsApi);
    // localStorage.removeItem(ApiEndpoint.GetRecentArticles + '?forHome=true');
    // localStorage.removeItem(ApiEndpoint.AccountsToFallow + '?forHome=true');

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

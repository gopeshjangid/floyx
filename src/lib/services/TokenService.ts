import { EventEmitter } from 'events'
import { requestService } from '@services/Request/RequestService'
import { ApiEndpoint } from '@services/ApiEndpoints'

const TOKEN_NAME = 'FLOYX_TOKEN'
const FLOYX_USERNAME = 'FLOYX_USERNAME'

export class TokenService {
  public onNewToken = new EventEmitter()
  private currentLoggedUser = {
    avatar: '',
    name: '',
    username: ''
  }

  public init() {
    if (typeof window !== 'undefined') {
      let jsonToken = localStorage.getItem(TOKEN_NAME)
      if (!jsonToken) {
        jsonToken = sessionStorage.getItem(TOKEN_NAME)
      }
      if (jsonToken) {
        this.getCurrentUser()
      }
    }
  }

  public updateAuthData = (jwt: any) => {
    const token = localStorage.getItem(TOKEN_NAME)

    this.setAuthData(jwt, token !== null)
  }

  public getCurrentUser = () => {
    requestService
      .get(ApiEndpoint.CurrentUserDetails)
      .success((resp) => {
        this.currentLoggedUser = resp.data
        this.setImage(resp.data.avatar)
        this.emmitCurrentUser()
      })
      .error(() => this.removeAuthData())
  }

  public setImage = (avatar: string) => {
    if (this.getImage() !== avatar) localStorage.setItem('FLOYX_AVATAR', avatar)
  }

  private readonly getImage = () => {
    return localStorage.getItem('FLOYX_AVATAR')
  }

  public emmitCurrentUser() {
    this.onNewToken.emit('USER', this.currentLoggedUser)
  }

  public getBearerToken = () => {
    const authData = this.getAuthData()
    if (authData !== null) {
      return 'Bearer ' + authData.accessToken
    }

    return null
  }

  public getToken = () => {
    const authData = this.getAuthData()
    if (authData !== null) {
      return authData.accessToken
    }

    return null
  }

  public setAuthData = (token: any, remember: boolean = false) => {
    const jsonToken = JSON.stringify(token.token)
    const floyxUsername = token.username
    localStorage.setItem(TOKEN_NAME, jsonToken)
    localStorage.setItem(FLOYX_USERNAME, floyxUsername)
    // if (remember) {
    //   localStorage.setItem(TOKEN_NAME, jsonToken);
    //   localStorage.setItem(FLOYX_USERNAME, floyxUsername);
    // } else {
    //   sessionStorage.setItem(TOKEN_NAME, jsonToken);
    //   sessionStorage.setItem(FLOYX_USERNAME, floyxUsername);
    // }
    this.onNewToken.emit('TOKEN', jsonToken)
  }

  public removeAuthData = () => {
    localStorage.removeItem(TOKEN_NAME)
    sessionStorage.removeItem(TOKEN_NAME)
    localStorage.removeItem(FLOYX_USERNAME)
    localStorage.removeItem(FLOYX_USERNAME)
    localStorage.clear()
    localStorage.removeItem(ApiEndpoint.GetPopularArticles)
    localStorage.removeItem(ApiEndpoint.GetRecentArticles)
    localStorage.removeItem(ApiEndpoint.GetFollowingArticles)
    localStorage.removeItem(ApiEndpoint.GetLikedArticles)
    localStorage.removeItem(ApiEndpoint.GetPosts + '/feed/main')
    localStorage.removeItem(ApiEndpoint.AccountsToFallow + '?type=1')
    localStorage.removeItem(ApiEndpoint.AccountsToFallow + '?type=2')
    localStorage.removeItem('cache-' + ApiEndpoint.GetPopularEvents)
    localStorage.removeItem(ApiEndpoint.GetWatchingEvents)
    localStorage.removeItem('cache-' + ApiEndpoint.GetRecentEvents)
    localStorage.removeItem('cache-' + ApiEndpoint.GetFollowingEvents)
    localStorage.removeItem('cache-' + ApiEndpoint.GetLikedEvents)
    localStorage.removeItem(ApiEndpoint.TopCoinsApi)
    localStorage.removeItem(ApiEndpoint.GetRecentArticles + '?forHome=true')
    localStorage.removeItem(ApiEndpoint.AccountsToFallow + '?forHome=true')

    sessionStorage.removeItem(FLOYX_USERNAME)
  }

  // todo: code duplication
  public getUsername() {
    let username = localStorage.getItem(FLOYX_USERNAME)

    if (username === null) {
      username = sessionStorage.getItem(FLOYX_USERNAME)
    }

    if (username !== null) {
      return username
    }

    return null
  }

  public getAuthData() {
    if (typeof window !== 'undefined') {
      let token = localStorage.getItem(TOKEN_NAME)

      if (token === null) {
        token = sessionStorage.getItem(TOKEN_NAME)
      }

      if (token !== null) {
        return JSON.parse(token)
      }
    }

    return null
  }
}

export const tokenService = new TokenService()

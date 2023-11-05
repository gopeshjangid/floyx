import { ApiEndpoint } from '@services/ApiEndpoints'
import { requestService } from '@services/Request/RequestService'

const FLOYX_AVATAR = 'FLOYX_AVATAR'
const FLOYX_USERNAME = 'FLOYX_USERNAME'
const FLOYX_NAME = 'FLOYX_NAME'
const FLOYX_TYPE = 'FLOYX_TYPE'
const FLOYX_ACCOUNT = 'FLOYX_ACCOUNT'
const FLOYX_OFFICIAL = 'FLOYX_OFFICIAL'
const FLOYX_VERIFIED = 'FLOYX_VERIFIED'

export class UserDetailsService {
  public refresh() {
    return requestService
      .get(ApiEndpoint.CurrentUserDetails)
      .success((resp: any) => {
        localStorage.setItem(FLOYX_AVATAR, resp.data.avatar)
        localStorage.setItem(FLOYX_USERNAME, resp.data.username)
        localStorage.setItem(FLOYX_NAME, resp.data.name)
        localStorage.setItem(FLOYX_TYPE, resp.data.accountType)
        localStorage.setItem(FLOYX_VERIFIED, resp.data.verified)
        localStorage.setItem(FLOYX_ACCOUNT, JSON.stringify(resp.data))
      })
      .error(() => {
        localStorage.setItem(FLOYX_AVATAR, '')
        localStorage.setItem(FLOYX_USERNAME, '')
        localStorage.setItem(FLOYX_NAME, '')
        localStorage.setItem(FLOYX_TYPE, '')
        localStorage.setItem(FLOYX_ACCOUNT, '')
        localStorage.setItem(FLOYX_VERIFIED, '')
      })
  }

  public setAccountVerificationDetails(isOfficial: string) {
    localStorage.setItem(FLOYX_OFFICIAL, isOfficial)
  }

  public getAvatar = () => {
    return localStorage.getItem(FLOYX_AVATAR)
  }

  public getUsername = () => {
    return localStorage.getItem(FLOYX_USERNAME)
  }

  public getName = () => {
    return localStorage.getItem(FLOYX_NAME)
  }

  public getType = () => {
    return localStorage.getItem(FLOYX_TYPE)
  }

  public getOfficial = () => {
    return localStorage.getItem(FLOYX_OFFICIAL)
  }

  public isAuthorizedUser = () => {
    return !((this.getType() === '1' || this.getType() === '2') && this.getVerified() === 'false')
  }

  private readonly getVerified = () => {
    return localStorage.getItem(FLOYX_VERIFIED)
  }

  public isCurrentUser = (username: string) => {
    const item = localStorage.getItem(FLOYX_USERNAME)
    if (item) {
      return item.toLowerCase() === username.toLowerCase()
    }
    return false
  }

  public getDetails = () => {
    const item = localStorage.getItem(FLOYX_ACCOUNT)
    if (item) {
      return JSON.parse(item)
    }
    return {
      avatar: '',
      name: '',
      type: '',
      username: ''
    }
  }
}

export const userDetailsService = new UserDetailsService()

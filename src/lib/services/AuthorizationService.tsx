/* eslint-disable @typescript-eslint/no-unused-vars */
class AuthorizationService {
  private static readonly TOKEN_NAME = 'FLOYX_TOKEN'

  public getAuthData() {
    let token = localStorage.getItem(AuthorizationService.TOKEN_NAME)

    if (token === null) {
      token = sessionStorage.getItem(AuthorizationService.TOKEN_NAME)
    }

    if (token !== null) {
      return JSON.parse(token)
    }

    return null
  }

  public updateAuthData = (jwt: any) => {
    const token = localStorage.getItem(AuthorizationService.TOKEN_NAME)

    this.setAuthData(jwt, token !== null)
  }

  public getAuthToken = () => {
    const authData = this.getAuthData()
    if (authData !== null) {
      return 'Bearer ' + authData.accessToken
    }

    return null
  }

  public setAuthData = (token: any, remember: boolean) => {
    localStorage.setItem(AuthorizationService.TOKEN_NAME, token)
    // if (remember) {
    //   localStorage.setItem(AuthorizationService.TOKEN_NAME, token);
    // } else {
    //   sessionStorage.setItem(AuthorizationService.TOKEN_NAME, token);
    // }
  }

  public removeAuthData = () => {
    localStorage.removeItem(AuthorizationService.TOKEN_NAME)
    sessionStorage.removeItem(AuthorizationService.TOKEN_NAME)
  }
}

export default AuthorizationService

import { tokenService } from "./tokenService"

export class AuthService {
  private history: any

//   public login(username: string, password: string, remember: boolean) {
//     return new LoginResponse(ApiEndpoint.Login, username, password, remember)
//   }

//   public socialLogin(email: string, firstname: string, lastname: string, profileImage: string, socialid: string, socialType: string) {
//     return new SocialLoginResponse(email, firstname, lastname, profileImage, socialid, socialType)
//   }

//   public loginUseTwoStepAuth(username: string, password: string, remember: boolean, code: string, tempToken: any) {
//     return new RequestResponse(
//       ApiEndpoint.Login2fa,
//       { name: username, password, remember, twoStepAuthenticationCode: code },
//       true,
//       RequestType.Post,
//       tempToken.token.accessToken
//     ).success((resp) => {
//       if (resp.data === true) {
//         tokenService.setAuthData(tempToken, remember)
//       }
//     })
//   }

//   public loginUseRecoveryCode(username: string, password: string, remember: boolean, code: string) {
//     return new RequestResponse(ApiEndpoint.Login, { name: username, password, remember, recoveryCode: code }, false).success((resp) => {
//       tokenService.setAuthData(resp.data, remember)
//     })
//   }

  public logout() {
    tokenService.removeAuthData()
    if (this.history) {
      this.history.push('/login')
    }
  }

  public initHistory(history: any) {
    this.history = history
  }

  public isLoggedIn() {
    const token = tokenService.getAuthData()
    if (!token) {
      return false
    }
    const val = token && !this.checkIfTokenExpired(token)

    if (!val) {
      this.logout()
    }

    return val
  }

  private checkIfTokenExpired(token: any) {
    return token && token.expires < Date.now()
  }
}

export const authService = new AuthService()

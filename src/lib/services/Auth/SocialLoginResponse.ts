import { ApiEndpoint } from '@services/ApiEndpoints'
import { superagent } from 'src/shared/libs/superagent'

import { BackendStatusCode } from '@services/BackendStatusCode'
import { tokenService } from '@services/TokenService'

export class SocialLoginResponse {
  private readonly successResponse: any[] = []
  private readonly errorArr: any[] = []
  private readonly twoFA: any[] = []

  constructor(email: string, firstname: string, lastname: string, profileImage: string, socialid: string, socialType: string) {
    const that = this
    this.saveAuthData(false)

    const data = {
      email,
      responseSocialloginDetails: [
        {
          firstname,
          lastname,
          email,
          profileImage,
          socialid,
          socialType
        }
      ]
    }

    superagent
      .post(ApiEndpoint.SocialLogin)
      .send(data)
      .ok((res) => res.status <= 401)
      .then((resp) => {
        that.callCallbacks(resp)
      })
  }

  public success(callback: (resp: any) => void): SocialLoginResponse {
    this.successResponse.push(callback)

    return this
  }

  public twoStepEnabled(callback: (resp: any) => void): SocialLoginResponse {
    this.twoFA.push(callback)

    return this
  }

  // invalid_credentials/email_not_verifieed
  public error(callback: (resp: any) => void): SocialLoginResponse {
    this.errorArr.push(callback)

    return this
  }

  private callUnauthorizedCallbacks(resp: any) {
    if (resp.code === BackendStatusCode.TwoStepEnabled) {
      this.twoFA.forEach((callback) => callback(resp))
    } else {
      this.errorArr.forEach((callback) => callback(resp))
    }
  }

  private callCallbacks(resp: any) {
    if (resp.status === 200) {
      this.successResponse.forEach((callback) => callback(resp.body.value))
    } else if (resp.status === 401) {
      this.callUnauthorizedCallbacks(resp.body.value)
    }
  }

  private saveAuthData(remember: boolean) {
    this.successResponse.push((resp: any) => {
      if (!resp.twoStepLoginRequired) {
        tokenService.setAuthData(resp.data, remember)
      }
    })
  }
}

import { superagent } from 'src/shared/libs/superagent'
import { Observable } from 'rxjs'
import { BackendStatusCode } from '@services/BackendStatusCode'
import { tokenService } from '@services/TokenService'

export enum RequestType {
  Post,
  Get,
  Put,
  Delete
}

export class BetterRequestResponse {
  private readonly successResponse: any[] = []
  private readonly errorArr: any[] = []
  private subscription: any

  constructor(url: string, data = {}, useAuthorization: boolean = true, requestType = RequestType.Post) {
    const that = this

    switch (requestType) {
      case RequestType.Post:
        this.sendPost(url, data, useAuthorization, that)
        break
      case RequestType.Get:
        this.sendGet(url, data, useAuthorization, that)
        break
      case RequestType.Put:
        this.sendPut(url, data, useAuthorization, that)
        break
      case RequestType.Delete:
        this.sendDelete(url, that)
        break
    }
  }

  public success(callback: (resp: any) => void): BetterRequestResponse {
    this.successResponse.push(callback)

    return this
  }

  public error(callback: (resp: any) => void): BetterRequestResponse {
    this.errorArr.push(callback)

    return this
  }

  public cancel() {
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe()
    }
  }

  private callCallbacks(resp: any) {
    if (resp.status === 200 && resp.body?.value?.code === BackendStatusCode.Success) {
      this.successResponse.forEach((callback) => callback(resp.body.value))
    } else {
      if (resp?.body?.value) this.errorArr.forEach((callback) => callback(resp.body.value))
    }
  }

  private sendPost(url: string, data: {}, useAuthorization: boolean, that: this) {
    if (useAuthorization) {
      this.sendAuthorizationPost(url, data, that)
    } else {
      this.sendUnAuthorizationPost(url, data, that)
    }
  }

  private sendGet(url: string, data: {}, useAuthorization: boolean, that: this) {
    if (useAuthorization) {
      this.sendAuthorizationGet(url, data, that)
    } else {
      this.sendUnAuthorizationGet(url, data, that)
    }
  }

  private sendPut(url: string, data: {}, useAuthorization: boolean, that: this) {
    if (useAuthorization) {
      this.sendAuthorizationPut(url, data, that)
    }
  }

  private sendDelete(url: string, that: this) {
    this.sendAuthorizationDelete(url, that)
  }

  private sendAuthorizationDelete(url: string, that: this) {
    superagent
      .delete(url)
      .send({})
      .ok((res) => res.status <= 401)
      .set('Authorization', this.getToken())
      .then((resp) => {
        that.callCallbacks(resp)
      })
  }

  private sendAuthorizationPut(url: string, data: {}, that: this) {
    superagent
      .put(url)
      .send(data)
      .ok((res) => res.status <= 401)
      .set('Authorization', this.getToken())
      .then((resp) => {
        that.callCallbacks(resp)
      })
  }

  private sendAuthorizationGet(url: string, data: {}, that: this) {
    this.subscription = Observable.create((observer: any) => {
      superagent
        .get(url)
        .send(data)
        .ok((res) => res.status <= 401)
        .set('Authorization', this.getToken())
        .then((resp) => {
          observer.next(resp)
        })
    }).subscribe(
      (resp: any) => {
        that.callCallbacks(resp)
      },
      undefined,
      undefined
    )
  }

  private sendUnAuthorizationGet(url: string, data: {}, that: this) {
    superagent
      .get(url)
      .send(data)
      .ok((res) => res.status <= 401)
      .then((resp) => {
        that.callCallbacks(resp)
      })
  }

  private sendAuthorizationPost(url: string, data: {}, that: this) {
    superagent
      .post(url)
      .send(data)
      .ok((res) => res.status <= 401)
      .set('Authorization', this.getToken())
      .then((resp) => {
        that.callCallbacks(resp)
      })
  }

  private sendUnAuthorizationPost(url: string, data: {}, that: this) {
    superagent
      .post(url)
      .send(data)
      .ok((res) => res.status <= 401)
      .then((resp) => {
        that.callCallbacks(resp)
      })
  }

  private getToken(): string {
    const token = tokenService.getBearerToken()

    if (!token) {
      // throw new Error("token is null");
      return ''
    }

    return token
  }
}

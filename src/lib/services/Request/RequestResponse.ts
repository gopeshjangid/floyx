import { superagent } from 'src/shared/libs/superagent'
import { BackendStatusCode } from '@services/BackendStatusCode'
import { tokenService } from '@services/TokenService'

export enum RequestType {
  Post,
  Get,
  Put,
  Delete
}

export class RequestResponse {
  private readonly successResponse: any[] = []
  private readonly errorArr: any[] = []

  constructor(url: string, data = {}, useAuthorization: boolean = true, requestType = RequestType.Post, tempToken = '') {
    const that = this

    switch (requestType) {
      case RequestType.Post:
        this.sendPost(url, data, useAuthorization, that, tempToken)
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

  public success(callback: (resp: any) => void): RequestResponse {
    this.successResponse.push(callback)

    return this
  }

  public error(callback: (resp: any) => void): RequestResponse {
    this.errorArr.push(callback)

    return this
  }

  private callCallbacks(resp: any) {
    if (resp.status === 200 && resp && resp.text && !resp.body) {
      this.successResponse.forEach((callback) => callback(resp.text))
    } else if (resp.status === 200 && resp.body.value.code === BackendStatusCode.Success) {
      this.successResponse.forEach((callback) => callback(resp.body.value))
    } else {
      this.errorArr.forEach((callback) => callback(resp.body ? resp.body.value : resp))
    }
  }

  private callErrCallbacks(err: any) {
    if (err.status == 404) {
      this.errorArr.forEach((callback) => callback(err.status))
    } else {
      this.errorArr.forEach((callback) => callback(err.body))
    }
  }

  private sendPost(url: string, data: {}, useAuthorization: boolean, that: this, tempToken: string = '') {
    if (useAuthorization) {
      this.sendAuthorizationPost(url, data, that, tempToken)
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
      .catch(this.catchError)
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
      .catch(this.catchError)
  }

  private sendAuthorizationGet(url: string, data: {}, that: this) {
    superagent
      .get(url)
      .send(data)
      .ok((res) => res.status <= 401)
      .set('Authorization', this.getToken())
      .then((resp) => {
        that.callCallbacks(resp)
      })
      // .catch(this.catchError);
      .catch((err) => that.callErrCallbacks(err))
  }

  private sendUnAuthorizationGet(url: string, data: {}, that: this) {
    superagent
      .get(url)
      .send(data)
      .ok((res) => res.status <= 401)
      .then((resp) => {
        that.callCallbacks(resp)
      })
      .catch((err) => that.callErrCallbacks(err))
  }

  private sendAuthorizationPost(url: string, data: {}, that: this, tempToken: string = '') {
    if (tempToken != '') {
      superagent
        .post(url)
        .send(data)
        .ok((res) => res.status <= 401)
        .set('Authorization', 'Bearer ' + tempToken)
        .then(
          (resp) => {
            that.callCallbacks(resp)
          },
          (err) => that.callErrCallbacks(err)
        )
    } else {
      superagent
        .post(url)
        .send(data)
        .ok((res) => res.status <= 401)
        .set('Authorization', this.getToken())
        .then(
          (resp) => {
            that.callCallbacks(resp)
          },
          (err) => that.callErrCallbacks(err)
        )
    }
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
      return ''
      // throw new Error("token is null");
    }

    return token
  }

  private catchError(resp: any): any {
    if (resp.response) {
      switch (resp.response.status) {
        // case 401 : window.location.href = '/login'; break;
        case 500: // TODO: other valid
      }
    }
  }
}

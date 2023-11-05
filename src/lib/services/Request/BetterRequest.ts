import { BetterRequestResponse } from '@services/Request/BetterRequestResponse'
import { RequestType } from '@services/Request/RequestResponse'

export class BetterRequestService {
  public get(url: string, data = {}, useAuthorization: boolean = true): BetterRequestResponse {
    return new BetterRequestResponse(url, data, useAuthorization, RequestType.Get)
  }
}

export const betterRequestService = new BetterRequestService()

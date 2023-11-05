import { RequestResponse, RequestType } from '@services/Request/RequestResponse';

export class RequestService {
    public post(url: string, data = {}): RequestResponse {
        return new RequestResponse(url, data);
    }

    public postUnathorized(url: string, data = {}): RequestResponse {
        return new RequestResponse(url, data, false);
    }

    public get(url: string, data = {}, useAuthorization: boolean = true): RequestResponse {
        return new RequestResponse(url, data, useAuthorization, RequestType.Get);
    }

    public put(url: string, data = {}): RequestResponse {
        return new RequestResponse(url, data, true, RequestType.Put);
    }

    public delete(url: string, data = {}): RequestResponse {
        return new RequestResponse(url, data, true, RequestType.Delete);
    }
}

export const requestService = new RequestService();

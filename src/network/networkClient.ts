import { CoreError } from "@iota-pico/core/dist/error/coreError";
import { NumberHelper } from "@iota-pico/core/dist/helpers/numberHelper";
import { ObjectHelper } from "@iota-pico/core/dist/helpers/objectHelper";
import { INetworkClient } from "@iota-pico/core/dist/interfaces/INetworkClient";
import { INetworkEndPoint } from "@iota-pico/core/dist/interfaces/INetworkEndPoint";

/**
 * Implementation of a node client for use in the browser.
 * @interface
 */
export class NetworkClient implements INetworkClient {
    /* @internal */
    private readonly _networkEndPoint: INetworkEndPoint;
    /* @internal */
    private readonly _timeoutMs: number;

    /**
     * Create an instance of NetworkClient.
     * @param networkEndPoint The endpoint to use for the client.
     * @param timeoutMs The timeout in ms before aborting.
     */
    constructor(networkEndPoint: INetworkEndPoint, timeoutMs: number = 0) {
        if (ObjectHelper.isEmpty(networkEndPoint)) {
            throw new CoreError("The networkEndPoint must be defined");
        }
        if (!NumberHelper.isInteger(timeoutMs) || timeoutMs < 0) {
            throw new CoreError("The timeoutMs must be >= 0");
        }
        this._networkEndPoint = networkEndPoint;
        this._timeoutMs = timeoutMs;
    }

    /**
     * Get data asynchronously.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async get(additionalHeaders?: { [header: string]: string }): Promise<string> {
        return this.doRequest("GET", undefined, additionalHeaders);
    }

    /**
     * Post data asynchronously.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async post(data: string, additionalHeaders?: { [header: string]: string }): Promise<string> {
        return this.doRequest("POST", data, additionalHeaders);
    }

    /**
     * Get data asynchronously.
     * @typeparam U The generic type for the returned object.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async getJson<U>(additionalHeaders?: { [header: string]: string }): Promise<U> {
        return this.doRequest("GET", undefined, additionalHeaders)
            .then((responseData) => {
                try {
                    const response = JSON.parse(responseData);
                    return <U>response;
                } catch (err) {
                    throw(new CoreError("Failed GET request, unable to parse response", {
                        endPoint: this._networkEndPoint.getUri(),
                        response: responseData
                    }));
                }
            });
    }

    /**
     * Post data asynchronously.
     * @typeparam T The generic type for the object to send.
     * @typeparam U The generic type for the returned object.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async postJson<T, U>(data: T, additionalHeaders?: { [header: string]: string }): Promise<U> {
        const headers = additionalHeaders || {};
        headers["Content-Type"] = "application/json";

        return this.doRequest("POST", JSON.stringify(data), headers)
            .then((responseData) => {
                try {
                    const response = JSON.parse(responseData);
                    return <U>response;
                } catch (err) {
                    throw(new CoreError("Failed POST request, unable to parse response", {
                        endPoint: this._networkEndPoint.getUri(),
                        response: responseData
                    }));
                }
            });
    }

    /* @internal */
    private async doRequest(method: string, data: string, additionalHeaders?: { [header: string]: string }): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const headers = additionalHeaders || {};

            const req = new XMLHttpRequest();
            if (this._timeoutMs > 0) {
                req.timeout = this._timeoutMs;
            }
            req.open(method, this._networkEndPoint.getUri(), true);
            for (const key in headers) {
                req.setRequestHeader(key, headers[key]);
            }

            req.ontimeout = () => {
                reject(new CoreError(`Failed ${method} request, timed out`, {
                    endPoint: this._networkEndPoint.getUri()
                }));
            };

            req.onload = () => {
                const responseData = req.responseText;
                if (req.status === 200) {
                    resolve(responseData);
                } else {
                    reject(new CoreError(`Failed ${method} request`, {
                        endPoint: this._networkEndPoint.getUri(),
                        httpStatusCode: req.status,
                        response: responseData
                    }));
                }
            };

            try {
                req.send(data);
            } catch (err) {
                reject(new CoreError(`Failed ${method} request`, {
                    endPoint: this._networkEndPoint.getUri(),
                    httpError: err
                }));
            }
        });
    }
}

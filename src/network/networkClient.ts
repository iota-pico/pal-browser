import { CoreError } from "@iota-pico/core/dist/error/coreError";
import { INetworkClient } from "@iota-pico/core/dist/interfaces/INetworkClient";
import { INetworkEndPoint } from "@iota-pico/core/dist/interfaces/INetworkEndPoint";

/**
 * Implementation of a node client for use in the browser.
 * @interface
 */
export class NetworkClient implements INetworkClient {
    private readonly _networkEndPoint: INetworkEndPoint;

    /**
     * Create an instance of NetworkClient.
     * @param networkEndPoint The endpoint to use for the client.
     */
    constructor(networkEndPoint: INetworkEndPoint) {
        if (networkEndPoint === undefined || networkEndPoint === null) {
            throw new CoreError("The networkEndPoint must be defined");
        }
        this._networkEndPoint = networkEndPoint;
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
        return new Promise<U>((resolve, reject) => {
            const headers = additionalHeaders || {};
            headers["Content-Type"] = "application/json";

            const req = new XMLHttpRequest();
            req.open("POST", this._networkEndPoint.getUri(), true);
            for (const key in headers) {
                req.setRequestHeader(key, headers[key]);
            }

            req.onreadystatechange = () => {
                if (req.readyState === XMLHttpRequest.DONE) {
                    const responseData = req.responseText;
                    if (req.status === 200) {
                        try {
                            const response = JSON.parse(responseData);
                            resolve(response);
                        } catch (err) {
                            reject(new CoreError("Unsuccessful POST request, unable to parse response", {
                                endPoint: this._networkEndPoint.getUri(),
                                httpStatusCode: req.status,
                                response: responseData
                            }));
                        }
                    } else {
                        reject(new CoreError("Unsuccessful POST request", {
                            endPoint: this._networkEndPoint.getUri(),
                            httpStatusCode: req.status,
                            response: responseData
                        }));
                    }
                }
            };

            try {
                req.send(JSON.stringify(data));
            } catch (err) {
                reject(new CoreError("Unsuccessful POST request", {
                    endPoint: this._networkEndPoint.getUri(),
                    httpError: err
                }));
            }
        });
    }
}

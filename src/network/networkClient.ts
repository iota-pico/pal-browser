import { CoreError } from "@iota-pico/core/dist/error/coreError";
import { NumberHelper } from "@iota-pico/core/dist/helpers/numberHelper";
import { ObjectHelper } from "@iota-pico/core/dist/helpers/objectHelper";
import { StringHelper } from "@iota-pico/core/dist/helpers/stringHelper";
import { ILogger } from "@iota-pico/core/dist/interfaces/ILogger";
import { INetworkClient } from "@iota-pico/core/dist/interfaces/INetworkClient";
import { INetworkEndPoint } from "@iota-pico/core/dist/interfaces/INetworkEndPoint";
import { NullLogger } from "@iota-pico/core/dist/loggers/nullLogger";

/**
 * Implementation of a node client for use in the browser.
 */
export class NetworkClient implements INetworkClient {
    /* @internal */
    private readonly _networkEndPoint: INetworkEndPoint;
    /* @internal */
    private readonly _logger: ILogger;
    /* @internal */
    private readonly _timeoutMs: number;

    /**
     * Create an instance of NetworkClient.
     * @param networkEndPoint The endpoint to use for the client.
     * @param logger Logger to send communication info to.
     * @param timeoutMs The timeout in ms before aborting.
     */
    constructor(networkEndPoint: INetworkEndPoint, logger?: ILogger, timeoutMs: number = 0) {
        if (ObjectHelper.isEmpty(networkEndPoint)) {
            throw new CoreError("The networkEndPoint must be defined");
        }
        if (!NumberHelper.isInteger(timeoutMs) || timeoutMs < 0) {
            throw new CoreError("The timeoutMs must be >= 0");
        }
        this._networkEndPoint = networkEndPoint;
        this._timeoutMs = timeoutMs;
        this._logger = logger || new NullLogger();

        this._logger.banner("Network Client", { endPoint: this._networkEndPoint });
    }

    /**
     * Get data asynchronously.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async get(additionalPath?: string, additionalHeaders?: { [header: string]: string }): Promise<string> {
        return this.doRequest("GET", undefined, additionalPath, additionalHeaders);
    }

    /**
     * Post data asynchronously.
     * @param additionalPath An additional path append to the endpoint path.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async post(data: string, additionalPath?: string, additionalHeaders?: { [header: string]: string }): Promise<string> {
        return this.doRequest("POST", data, additionalPath, additionalHeaders);
    }

    /**
     * Get data as JSON asynchronously.
     * @typeparam U The generic type for the returned object.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async getJson<U>(additionalPath?: string, additionalHeaders?: { [header: string]: string }): Promise<U> {
        return this.doRequest("GET", undefined, additionalPath, additionalHeaders)
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
     * Post data as JSON asynchronously.
     * @typeparam T The generic type for the object to send.
     * @typeparam U The generic type for the returned object.
     * @param data The data to send.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async postJson<T, U>(data: T, additionalPath?: string, additionalHeaders?: { [header: string]: string }): Promise<U> {
        const headers = additionalHeaders || {};
        headers["Content-Type"] = "application/json";

        return this.doRequest("POST", JSON.stringify(data), additionalPath, headers)
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
    private async doRequest(method: string, data: string, additionalPath?: string, additionalHeaders?: { [header: string]: string }): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const headers = additionalHeaders || {};

            let uri = this._networkEndPoint.getUri();

            if (!StringHelper.isEmpty(additionalPath)) {
                const stripped = `/${additionalPath.replace(/^\/*/, "")}`;
                uri += stripped;
            }

            const req = new XMLHttpRequest();

            if (this._timeoutMs > 0) {
                req.timeout = this._timeoutMs;
            }

            req.ontimeout = () => {
                this._logger.error("<=== Timed Out");

                reject(new CoreError(`Failed ${method} request, timed out`, {
                    endPoint: uri,
                    errorResponseCode: req.status,
                    errorResponse: req.responseText || req.statusText
                }));
            };

            req.onerror = (err) => {
                this._logger.error("<=== Errored");

                reject(new CoreError(`Failed ${method} request`, {
                    endPoint: uri,
                    errorResponseCode: req.status,
                    errorResponse: req.responseText || req.statusText
                }));
            };

            req.onload = () => {
                if (req.status === 200) {
                    this._logger.info("<=== Received", { data: req.responseText });
                    resolve(req.responseText);
                } else {
                    this._logger.info("<=== Received Fail", { code: req.status, data: req.responseText });
                    reject(new CoreError(`Failed ${method} request`, {
                        endPoint: uri,
                        errorResponseCode: req.status,
                        errorResponse: req.responseText || req.statusText
                    }));
                }
            };

            req.open(method, uri, true);

            for (const key in headers) {
                req.setRequestHeader(key, headers[key]);
            }

            this._logger.info("===> Send", { data });

            req.send(data);
        });
    }
}

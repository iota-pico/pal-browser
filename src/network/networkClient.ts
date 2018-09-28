import { NetworkError } from "@iota-pico/core/dist/error/networkError";
import { NumberHelper } from "@iota-pico/core/dist/helpers/numberHelper";
import { ObjectHelper } from "@iota-pico/core/dist/helpers/objectHelper";
import { StringHelper } from "@iota-pico/core/dist/helpers/stringHelper";
import { ILogger } from "@iota-pico/core/dist/interfaces/ILogger";
import { INetworkClient } from "@iota-pico/core/dist/interfaces/INetworkClient";
import { INetworkEndPoint } from "@iota-pico/core/dist/interfaces/INetworkEndPoint";
import { NetworkMethod } from "@iota-pico/core/dist/interfaces/networkMethod";
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
            throw new NetworkError("The networkEndPoint must be defined");
        }
        if (!NumberHelper.isInteger(timeoutMs) || timeoutMs < 0) {
            throw new NetworkError("The timeoutMs must be >= 0");
        }
        this._networkEndPoint = networkEndPoint;
        this._timeoutMs = timeoutMs;
        this._logger = logger || new NullLogger();

        this._logger.banner("Network Client", { endPoint: this._networkEndPoint });
    }

    /**
     * Get data asynchronously.
     * @param data The data to send.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async get(data: { [key: string]: any }, additionalPath?: string, additionalHeaders?: { [header: string]: string }): Promise<string> {
        this._logger.info("===> NetworkClient::GET Send");
        const resp = await this.doRequest("GET", this.objectToParameters(data), additionalPath, additionalHeaders);
        this._logger.info("<=== NetworkClient::GET Received", resp);
        return resp;
    }

    /**
     * Post data asynchronously.
     * @param data The data to send.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async post(data: string, additionalPath?: string, additionalHeaders?: { [header: string]: string }): Promise<string> {
        this._logger.info("===> NetworkClient::POST Send", data);
        const resp = await this.doRequest("POST", data, additionalPath, additionalHeaders);
        this._logger.info("<=== NetworkClient::POST Received", resp);
        return resp;
    }

    /**
     * Request data as JSON asynchronously.
     * @typeparam T The generic type for the object to send.
     * @typeparam U The generic type for the returned object.
     * @param data The data to send as the JSON body.
     * @param method The method to send with the request.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async json<T, U>(data?: T, method?: NetworkMethod, additionalPath?: string, additionalHeaders?: { [header: string]: string }): Promise<U> {
        this._logger.info(`===> NetworkClient::${method} Send`);

        const headers = additionalHeaders || {};

        let localData;
        if (method === "GET" || method === "DELETE") {
            localData = this.objectToParameters(data);
        } else {
            headers["Content-Type"] = "application/json";
            localData = JSON.stringify(data);
        }

        return this.doRequest(method, localData, additionalPath, headers)
            .then((responseData) => {
                try {
                    const response = JSON.parse(responseData);
                    this._logger.info(`===> NetworkClient::${method} Received`, response);
                    return <U>response;
                } catch (err) {
                    this._logger.info(`===> NetworkClient::${method} Parse Failed`, responseData);
                    throw (new NetworkError(`Failed ${method} request, unable to parse response`, {
                        endPoint: this._networkEndPoint.getUri(),
                        response: responseData
                    }));
                }
            });
    }

    /**
     * Perform a request asynchronously.
     * @param method The method to send the data with.
     * @param data The data to send.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    public async doRequest(method: string, data: string, additionalPath?: string, additionalHeaders?: { [header: string]: string }): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const headers = additionalHeaders || {};

            let uri = this._networkEndPoint.getUri();

            if (!StringHelper.isEmpty(additionalPath)) {
                const stripped = `/${additionalPath.replace(/^\/*/, "")}`;
                uri += stripped;
            }

            if ((method === "GET" || method === "DELETE") && !ObjectHelper.isEmpty(data)) {
                uri += data;
            }

            const req = new XMLHttpRequest();

            if (this._timeoutMs > 0) {
                req.timeout = this._timeoutMs;
            }

            req.ontimeout = () => {
                this._logger.error("<=== NetworkClient::Timed Out");

                reject(new NetworkError(`Failed ${method} request, timed out`, {
                    endPoint: uri,
                    errorResponseCode: req.status,
                    errorResponse: req.responseText || req.statusText
                }));
            };

            req.onerror = (err) => {
                this._logger.error("<=== NetworkClient::Errored");

                reject(new NetworkError(`Failed ${method} request`, {
                    endPoint: uri,
                    errorResponseCode: req.status,
                    errorResponse: req.responseText || req.statusText
                }));
            };

            req.onload = () => {
                if (req.status === 200) {
                    resolve(req.responseText);
                } else {
                    this._logger.info("<=== NetworkClient::Received Fail", { code: req.status, data: req.responseText });
                    reject(new NetworkError(`Failed ${method} request`, {
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

            this._logger.info("===> NetworkClient::Send", { data });

            if (method === "GET" || method === "DELETE") {
                req.send();
            } else {
                req.send(data);
            }
        });
    }

    /* @internal */
    private objectToParameters<T>(data: T): string {
        let localUri = "";

        if (data) {
            const keys = Object.keys(data);

            if (keys.length > 0) {
                const parms: string[] = [];

                for (let i = 0; i < keys.length; i++) {
                    const key = <keyof T>keys[i];
                    const value = data[key] ? data[key].toString() : "";
                    parms.push(`${encodeURIComponent(keys[i])}=${encodeURIComponent(value)}`);
                }

                localUri += `?${parms.join("&")}`;
            }
        }

        return localUri;
    }
}

import { ILogger } from "@iota-pico/core/dist/interfaces/ILogger";
import { INetworkClient } from "@iota-pico/core/dist/interfaces/INetworkClient";
import { INetworkEndPoint } from "@iota-pico/core/dist/interfaces/INetworkEndPoint";
import { NetworkMethod } from "@iota-pico/core/dist/interfaces/networkMethod";
/**
 * Implementation of a node client for use in the browser.
 */
export declare class NetworkClient implements INetworkClient {
    /**
     * Create an instance of NetworkClient.
     * @param networkEndPoint The endpoint to use for the client.
     * @param logger Logger to send communication info to.
     * @param timeoutMs The timeout in ms before aborting.
     */
    constructor(networkEndPoint: INetworkEndPoint, logger?: ILogger, timeoutMs?: number);
    /**
     * Get data asynchronously.
     * @param data The data to send.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    get(data: {
        [key: string]: any;
    }, additionalPath?: string, additionalHeaders?: {
        [header: string]: string;
    }): Promise<string>;
    /**
     * Post data asynchronously.
     * @param data The data to send.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    post(data: string, additionalPath?: string, additionalHeaders?: {
        [header: string]: string;
    }): Promise<string>;
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
    json<T, U>(data?: T, method?: NetworkMethod, additionalPath?: string, additionalHeaders?: {
        [header: string]: string;
    }): Promise<U>;
    /**
     * Perform a request asynchronously.
     * @param method The method to send the data with.
     * @param data The data to send.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    doRequest(method: string, data: string, additionalPath?: string, additionalHeaders?: {
        [header: string]: string;
    }): Promise<string>;
}

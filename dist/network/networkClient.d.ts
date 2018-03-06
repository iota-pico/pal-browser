import { INetworkClient } from "@iota-pico/core/dist/interfaces/INetworkClient";
import { INetworkEndPoint } from "@iota-pico/core/dist/interfaces/INetworkEndPoint";
/**
 * Implementation of a node client for use in the browser.
 * @interface
 */
export declare class NetworkClient implements INetworkClient {
    /**
     * Create an instance of NetworkClient.
     * @param networkEndPoint The endpoint to use for the client.
     * @param timeoutMs The timeout in ms before aborting.
     */
    constructor(networkEndPoint: INetworkEndPoint, timeoutMs?: number);
    /**
     * Get data asynchronously.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    get(additionalHeaders?: {
        [header: string]: string;
    }): Promise<string>;
    /**
     * Post data asynchronously.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    post(data: string, additionalHeaders?: {
        [header: string]: string;
    }): Promise<string>;
    /**
     * Get data asynchronously.
     * @typeparam U The generic type for the returned object.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    getJson<U>(additionalHeaders?: {
        [header: string]: string;
    }): Promise<U>;
    /**
     * Post data asynchronously.
     * @typeparam T The generic type for the object to send.
     * @typeparam U The generic type for the returned object.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    postJson<T, U>(data: T, additionalHeaders?: {
        [header: string]: string;
    }): Promise<U>;
}

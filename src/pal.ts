import { NetworkClientFactory } from "@iota-pico/core/dist/factories/networkClientFactory";
import { INetworkEndPoint } from "@iota-pico/core/dist/interfaces/INetworkEndPoint";
import { NetworkClient } from "./network/networkClient";

/**
 * Platform abstraction layer for Browser.
 */
export class PAL {
    /* @internal */
    private static _isInitialized: boolean = false;

    /**
     * Perform any initialization for the PAL.
     */
    public static async initialize(): Promise<void> {
        if (!PAL._isInitialized) {
            PAL._isInitialized = true;
            NetworkClientFactory.instance().register("default", (networkEndpoint: INetworkEndPoint) => new NetworkClient(networkEndpoint));
        }

        return Promise.resolve();
    }
}

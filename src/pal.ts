import { NetworkClientFactory } from "@iota-pico/core/dist/factories/networkClientFactory";
import { PlatformCryptoFactory } from "@iota-pico/core/dist/factories/platformCryptoFactory";
import { RngServiceFactory } from "@iota-pico/core/dist/factories/rngServiceFactory";
import { ILogger } from "@iota-pico/core/dist/interfaces/ILogger";
import { INetworkEndPoint } from "@iota-pico/core/dist/interfaces/INetworkEndPoint";
import { PlatformCrypto } from "./crypto/platformCrypto";
import { NetworkClient } from "./network/networkClient";
import { RngService } from "./services/rngService";

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
            NetworkClientFactory.instance().register("default", (networkEndpoint: INetworkEndPoint, logger: ILogger, timeoutMs: number) => new NetworkClient(networkEndpoint, logger, timeoutMs));
            RngServiceFactory.instance().register("default", () => new RngService());
            PlatformCryptoFactory.instance().register("default", (publicKey, privateKey) => new PlatformCrypto(publicKey, privateKey));
        }

        return Promise.resolve();
    }
}

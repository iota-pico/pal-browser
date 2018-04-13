Object.defineProperty(exports, "__esModule", { value: true });
const networkClientFactory_1 = require("@iota-pico/core/dist/factories/networkClientFactory");
const platformCryptoFactory_1 = require("@iota-pico/core/dist/factories/platformCryptoFactory");
const rngServiceFactory_1 = require("@iota-pico/core/dist/factories/rngServiceFactory");
const platformCrypto_1 = require("./crypto/platformCrypto");
const networkClient_1 = require("./network/networkClient");
const rngService_1 = require("./services/rngService");
/**
 * Platform abstraction layer for Browser.
 */
class PAL {
    /**
     * Perform any initialization for the PAL.
     */
    static async initialize() {
        if (!PAL._isInitialized) {
            PAL._isInitialized = true;
            networkClientFactory_1.NetworkClientFactory.instance().register("default", (networkEndpoint, logger, timeoutMs) => new networkClient_1.NetworkClient(networkEndpoint, logger, timeoutMs));
            rngServiceFactory_1.RngServiceFactory.instance().register("default", () => new rngService_1.RngService());
            platformCryptoFactory_1.PlatformCryptoFactory.instance().register("default", (publicKey, privateKey) => new platformCrypto_1.PlatformCrypto(publicKey, privateKey));
        }
        return Promise.resolve();
    }
}
/* @internal */
PAL._isInitialized = false;
exports.PAL = PAL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsOEZBQTJGO0FBQzNGLGdHQUE2RjtBQUM3Rix3RkFBcUY7QUFHckYsNERBQXlEO0FBQ3pELDJEQUF3RDtBQUN4RCxzREFBbUQ7QUFFbkQ7O0dBRUc7QUFDSDtJQUlJOztPQUVHO0lBQ0ksTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVO1FBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDMUIsMkNBQW9CLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLGVBQWlDLEVBQUUsTUFBZSxFQUFFLFNBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUksNkJBQWEsQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEwscUNBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLHVCQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLDZDQUFxQixDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLCtCQUFjLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDL0gsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7QUFmRCxlQUFlO0FBQ0Esa0JBQWMsR0FBWSxLQUFLLENBQUM7QUFGbkQsa0JBaUJDIn0=
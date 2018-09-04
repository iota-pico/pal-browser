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
     * @returns Promise.
     */
    static async initialize() {
        if (!PAL._isInitialized) {
            PAL._isInitialized = true;
            networkClientFactory_1.NetworkClientFactory.instance().register("default", (networkEndpoint, logger, timeoutMs) => new networkClient_1.NetworkClient(networkEndpoint, logger, timeoutMs));
            rngServiceFactory_1.RngServiceFactory.instance().register("default", () => new rngService_1.RngService());
            platformCryptoFactory_1.PlatformCryptoFactory.instance().register("default", () => new platformCrypto_1.PlatformCrypto());
        }
        return Promise.resolve();
    }
}
/* @internal */
PAL._isInitialized = false;
exports.PAL = PAL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsOEZBQTJGO0FBQzNGLGdHQUE2RjtBQUM3Rix3RkFBcUY7QUFHckYsNERBQXlEO0FBQ3pELDJEQUF3RDtBQUN4RCxzREFBbUQ7QUFFbkQ7O0dBRUc7QUFDSCxNQUFhLEdBQUc7SUFJWjs7O09BR0c7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVU7UUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7WUFDckIsR0FBRyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDMUIsMkNBQW9CLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDLGVBQWlDLEVBQUUsTUFBZSxFQUFFLFNBQWlCLEVBQUUsRUFBRSxDQUFDLElBQUksNkJBQWEsQ0FBQyxlQUFlLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdEwscUNBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLHVCQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLDZDQUFxQixDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSwrQkFBYyxFQUFFLENBQUMsQ0FBQztTQUNwRjtRQUVELE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7O0FBaEJELGVBQWU7QUFDQSxrQkFBYyxHQUFZLEtBQUssQ0FBQztBQUZuRCxrQkFrQkMifQ==
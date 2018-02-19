Object.defineProperty(exports, "__esModule", { value: true });
const networkClientFactory_1 = require("@iota-pico/core/dist/factories/networkClientFactory");
const networkClient_1 = require("./network/networkClient");
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
            networkClientFactory_1.NetworkClientFactory.instance().register("default", (networkEndpoint) => new networkClient_1.NetworkClient(networkEndpoint));
        }
        return Promise.resolve();
    }
}
/* @internal */
PAL._isInitialized = false;
exports.PAL = PAL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsOEZBQTJGO0FBRTNGLDJEQUF3RDtBQUV4RDs7R0FFRztBQUNIO0lBSUk7O09BRUc7SUFDSSxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVU7UUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN0QixHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMxQiwyQ0FBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsZUFBaUMsRUFBRSxFQUFFLENBQUMsSUFBSSw2QkFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDbkksQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7QUFiRCxlQUFlO0FBQ0Esa0JBQWMsR0FBWSxLQUFLLENBQUM7QUFGbkQsa0JBZUMifQ==
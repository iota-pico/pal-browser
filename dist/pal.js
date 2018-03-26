Object.defineProperty(exports, "__esModule", { value: true });
const networkClientFactory_1 = require("@iota-pico/core/dist/factories/networkClientFactory");
const rngServiceFactory_1 = require("@iota-pico/core/dist/factories/rngServiceFactory");
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
            networkClientFactory_1.NetworkClientFactory.instance().register("default", (networkEndpoint) => new networkClient_1.NetworkClient(networkEndpoint));
            rngServiceFactory_1.RngServiceFactory.instance().register("default", () => new rngService_1.RngService());
        }
        return Promise.resolve();
    }
}
/* @internal */
PAL._isInitialized = false;
exports.PAL = PAL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsOEZBQTJGO0FBQzNGLHdGQUFxRjtBQUVyRiwyREFBd0Q7QUFDeEQsc0RBQW1EO0FBRW5EOztHQUVHO0FBQ0g7SUFJSTs7T0FFRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVTtRQUMxQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzFCLDJDQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxlQUFpQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLDZCQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMvSCxxQ0FBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksdUJBQVUsRUFBRSxDQUFDLENBQUM7UUFDN0UsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQzs7QUFkRCxlQUFlO0FBQ0Esa0JBQWMsR0FBWSxLQUFLLENBQUM7QUFGbkQsa0JBZ0JDIn0=
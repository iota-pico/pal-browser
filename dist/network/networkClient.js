Object.defineProperty(exports, "__esModule", { value: true });
const coreError_1 = require("@iota-pico/core/dist/error/coreError");
const numberHelper_1 = require("@iota-pico/core/dist/helpers/numberHelper");
const objectHelper_1 = require("@iota-pico/core/dist/helpers/objectHelper");
/**
 * Implementation of a node client for use in the browser.
 * @interface
 */
class NetworkClient {
    /**
     * Create an instance of NetworkClient.
     * @param networkEndPoint The endpoint to use for the client.
     * @param timeoutMs The timeout in ms before aborting.
     */
    constructor(networkEndPoint, timeoutMs = 0) {
        if (objectHelper_1.ObjectHelper.isEmpty(networkEndPoint)) {
            throw new coreError_1.CoreError("The networkEndPoint must be defined");
        }
        if (!numberHelper_1.NumberHelper.isInteger(timeoutMs) || timeoutMs < 0) {
            throw new coreError_1.CoreError("The timeoutMs must be >= 0");
        }
        this._networkEndPoint = networkEndPoint;
        this._timeoutMs = timeoutMs;
    }
    /**
     * Get data asynchronously.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async get(additionalHeaders) {
        return this.doRequest("GET", undefined, additionalHeaders);
    }
    /**
     * Post data asynchronously.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async post(data, additionalHeaders) {
        return this.doRequest("POST", data, additionalHeaders);
    }
    /**
     * Get data asynchronously.
     * @typeparam U The generic type for the returned object.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async getJson(additionalHeaders) {
        return this.doRequest("GET", undefined, additionalHeaders)
            .then((responseData) => {
            try {
                const response = JSON.parse(responseData);
                return response;
            }
            catch (err) {
                throw (new coreError_1.CoreError("Failed GET request, unable to parse response", {
                    endPoint: this._networkEndPoint.getUri(),
                    response: responseData
                }));
            }
        });
    }
    /**
     * Post data asynchronously.
     * @typeparam T The generic type for the object to send.
     * @typeparam U The generic type for the returned object.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async postJson(data, additionalHeaders) {
        const headers = additionalHeaders || {};
        headers["Content-Type"] = "application/json";
        return this.doRequest("POST", JSON.stringify(data), headers)
            .then((responseData) => {
            try {
                const response = JSON.parse(responseData);
                return response;
            }
            catch (err) {
                throw (new coreError_1.CoreError("Failed POST request, unable to parse response", {
                    endPoint: this._networkEndPoint.getUri(),
                    response: responseData
                }));
            }
        });
    }
    /* @internal */
    async doRequest(method, data, additionalHeaders) {
        return new Promise((resolve, reject) => {
            const headers = additionalHeaders || {};
            const req = new XMLHttpRequest();
            if (this._timeoutMs > 0) {
                req.timeout = this._timeoutMs;
            }
            req.open(method, this._networkEndPoint.getUri(), true);
            for (const key in headers) {
                req.setRequestHeader(key, headers[key]);
            }
            req.ontimeout = () => {
                reject(new coreError_1.CoreError(`Failed ${method} request, timed out`, {
                    endPoint: this._networkEndPoint.getUri()
                }));
            };
            req.onload = () => {
                const responseData = req.responseText;
                if (req.status === 200) {
                    resolve(responseData);
                }
                else {
                    reject(new coreError_1.CoreError(`Failed ${method} request`, {
                        endPoint: this._networkEndPoint.getUri(),
                        httpStatusCode: req.status,
                        response: responseData
                    }));
                }
            };
            try {
                req.send(data);
            }
            catch (err) {
                reject(new coreError_1.CoreError(`Failed ${method} request`, {
                    endPoint: this._networkEndPoint.getUri(),
                    httpError: err
                }));
            }
        });
    }
}
exports.NetworkClient = NetworkClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29ya0NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3JrL25ldHdvcmtDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFpRTtBQUNqRSw0RUFBeUU7QUFDekUsNEVBQXlFO0FBSXpFOzs7R0FHRztBQUNIO0lBTUk7Ozs7T0FJRztJQUNILFlBQVksZUFBaUMsRUFBRSxZQUFvQixDQUFDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLDJCQUFZLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUkscUJBQVMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLDJCQUFZLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELE1BQU0sSUFBSSxxQkFBUyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBZ0Q7UUFDN0QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBWSxFQUFFLGlCQUFnRDtRQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBSSxpQkFBZ0Q7UUFD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
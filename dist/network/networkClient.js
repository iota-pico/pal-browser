Object.defineProperty(exports, "__esModule", { value: true });
const coreError_1 = require("@iota-pico/core/dist/error/coreError");
const numberHelper_1 = require("@iota-pico/core/dist/helpers/numberHelper");
const objectHelper_1 = require("@iota-pico/core/dist/helpers/objectHelper");
const stringHelper_1 = require("@iota-pico/core/dist/helpers/stringHelper");
const nullLogger_1 = require("@iota-pico/core/dist/loggers/nullLogger");
/**
 * Implementation of a node client for use in the browser.
 * @interface
 */
class NetworkClient {
    /**
     * Create an instance of NetworkClient.
     * @param networkEndPoint The endpoint to use for the client.
     * @param logger Logger to send communication info to.
     * @param timeoutMs The timeout in ms before aborting.
     */
    constructor(networkEndPoint, logger, timeoutMs = 0) {
        if (objectHelper_1.ObjectHelper.isEmpty(networkEndPoint)) {
            throw new coreError_1.CoreError("The networkEndPoint must be defined");
        }
        if (!numberHelper_1.NumberHelper.isInteger(timeoutMs) || timeoutMs < 0) {
            throw new coreError_1.CoreError("The timeoutMs must be >= 0");
        }
        this._networkEndPoint = networkEndPoint;
        this._timeoutMs = timeoutMs;
        this._logger = logger || new nullLogger_1.NullLogger();
        this._logger.banner("Network Client", { endPoint: this._networkEndPoint });
    }
    /**
     * Get data asynchronously.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async get(additionalPath, additionalHeaders) {
        return this.doRequest("GET", undefined, additionalPath, additionalHeaders);
    }
    /**
     * Post data asynchronously.
     * @param additionalPath An additional path append to the endpoint path.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async post(data, additionalPath, additionalHeaders) {
        return this.doRequest("POST", data, additionalPath, additionalHeaders);
    }
    /**
     * Get data as JSON asynchronously.
     * @typeparam U The generic type for the returned object.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async getJson(additionalPath, additionalHeaders) {
        return this.doRequest("GET", undefined, additionalPath, additionalHeaders)
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
     * Post data as JSON asynchronously.
     * @typeparam T The generic type for the object to send.
     * @typeparam U The generic type for the returned object.
     * @param data The data to send.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async postJson(data, additionalPath, additionalHeaders) {
        const headers = additionalHeaders || {};
        headers["Content-Type"] = "application/json";
        return this.doRequest("POST", JSON.stringify(data), additionalPath, headers)
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
    async doRequest(method, data, additionalPath, additionalHeaders) {
        return new Promise((resolve, reject) => {
            const headers = additionalHeaders || {};
            let uri = this._networkEndPoint.getUri();
            if (!stringHelper_1.StringHelper.isEmpty(additionalPath)) {
                const stripped = `/${additionalPath.replace(/^\/*/, "")}`;
                uri += stripped;
            }
            const req = new XMLHttpRequest();
            if (this._timeoutMs > 0) {
                req.timeout = this._timeoutMs;
            }
            req.ontimeout = () => {
                this._logger.error("<=== Timed Out");
                reject(new coreError_1.CoreError(`Failed ${method} request, timed out`, {
                    endPoint: uri,
                    errorResponseCode: req.status,
                    errorResponse: req.responseText || req.statusText
                }));
            };
            req.onerror = (err) => {
                this._logger.error("<=== Errored");
                reject(new coreError_1.CoreError(`Failed ${method} request`, {
                    endPoint: uri,
                    errorResponseCode: req.status,
                    errorResponse: req.responseText || req.statusText
                }));
            };
            req.onload = () => {
                if (req.status === 200) {
                    this._logger.error("<=== Received", { data: req.responseText });
                    resolve(req.responseText);
                }
                else {
                    this._logger.error("<=== Received Fail", { code: req.status, data: req.responseText });
                    reject(new coreError_1.CoreError(`Failed ${method} request`, {
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
            this._logger.info("===> Send", { data });
            req.send(data);
        });
    }
}
exports.NetworkClient = NetworkClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29ya0NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3JrL25ldHdvcmtDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFpRTtBQUNqRSw0RUFBeUU7QUFDekUsNEVBQXlFO0FBQ3pFLDRFQUF5RTtBQUl6RSx3RUFBcUU7QUFFckU7OztHQUdHO0FBQ0g7SUFRSTs7Ozs7T0FLRztJQUNILFlBQVksZUFBaUMsRUFBRSxNQUFnQixFQUFFLFlBQW9CLENBQUM7UUFDbEYsRUFBRSxDQUFDLENBQUMsMkJBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxxQkFBUyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsMkJBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEQsTUFBTSxJQUFJLHFCQUFTLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztRQUN4QyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sSUFBSSxJQUFJLHVCQUFVLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBdUIsRUFBRSxpQkFBZ0Q7UUFDdEYsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsaUJBQWlC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
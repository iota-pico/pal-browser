Object.defineProperty(exports, "__esModule", { value: true });
const coreError_1 = require("@iota-pico/core/dist/error/coreError");
const numberHelper_1 = require("@iota-pico/core/dist/helpers/numberHelper");
const objectHelper_1 = require("@iota-pico/core/dist/helpers/objectHelper");
const stringHelper_1 = require("@iota-pico/core/dist/helpers/stringHelper");
const nullLogger_1 = require("@iota-pico/core/dist/loggers/nullLogger");
/**
 * Implementation of a node client for use in the browser.
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
                    this._logger.info("<=== Received", { data: req.responseText });
                    resolve(req.responseText);
                }
                else {
                    this._logger.info("<=== Received Fail", { code: req.status, data: req.responseText });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29ya0NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3JrL25ldHdvcmtDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFpRTtBQUNqRSw0RUFBeUU7QUFDekUsNEVBQXlFO0FBQ3pFLDRFQUF5RTtBQUl6RSx3RUFBcUU7QUFFckU7O0dBRUc7QUFDSDtJQVFJOzs7OztPQUtHO0lBQ0gsWUFBWSxlQUFpQyxFQUFFLE1BQWdCLEVBQUUsWUFBb0IsQ0FBQztRQUNsRixFQUFFLENBQUMsQ0FBQywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLHFCQUFTLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQywyQkFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNLElBQUkscUJBQVMsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUF1QixFQUFFLGlCQUFnRDtRQUN0RixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxpQkFBaUIs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
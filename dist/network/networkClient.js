Object.defineProperty(exports, "__esModule", { value: true });
const networkError_1 = require("@iota-pico/core/dist/error/networkError");
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
            throw new networkError_1.NetworkError("The networkEndPoint must be defined");
        }
        if (!numberHelper_1.NumberHelper.isInteger(timeoutMs) || timeoutMs < 0) {
            throw new networkError_1.NetworkError("The timeoutMs must be >= 0");
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
        this._logger.info("===> NetworkClient::GET Send");
        const resp = await this.doRequest("GET", undefined, additionalPath, additionalHeaders);
        this._logger.info("<=== NetworkClient::GET Received", resp);
        return resp;
    }
    /**
     * Post data asynchronously.
     * @param additionalPath An additional path append to the endpoint path.
     * @param data The data to send.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async post(data, additionalPath, additionalHeaders) {
        this._logger.info("===> NetworkClient::POST Send", data);
        const resp = await this.doRequest("POST", data, additionalPath, additionalHeaders);
        this._logger.info("<=== NetworkClient::POST Received", resp);
        return resp;
    }
    /**
     * Get data as JSON asynchronously.
     * @typeparam U The generic type for the returned object.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async getJson(additionalPath, additionalHeaders) {
        this._logger.info("===> NetworkClient::GET Send");
        return this.doRequest("GET", undefined, additionalPath, additionalHeaders)
            .then((responseData) => {
            try {
                const response = JSON.parse(responseData);
                this._logger.info("===> NetworkClient::GET Received", response);
                return response;
            }
            catch (err) {
                this._logger.info("===> NetworkClient::GET Parse Failed", responseData);
                throw (new networkError_1.NetworkError("Failed GET request, unable to parse response", {
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
        this._logger.info("===> NetworkClient::POST Send");
        const headers = additionalHeaders || {};
        headers["Content-Type"] = "application/json";
        return this.doRequest("POST", JSON.stringify(data), additionalPath, headers)
            .then((responseData) => {
            try {
                const response = JSON.parse(responseData);
                this._logger.info("===> NetworkClient::POST Received", response);
                return response;
            }
            catch (err) {
                this._logger.info("===> NetworkClient::GET Parse Failed", responseData);
                throw (new networkError_1.NetworkError("Failed POST request, unable to parse response", {
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
                this._logger.error("<=== NetworkClient::Timed Out");
                reject(new networkError_1.NetworkError(`Failed ${method} request, timed out`, {
                    endPoint: uri,
                    errorResponseCode: req.status,
                    errorResponse: req.responseText || req.statusText
                }));
            };
            req.onerror = (err) => {
                this._logger.error("<=== NetworkClient::Errored");
                reject(new networkError_1.NetworkError(`Failed ${method} request`, {
                    endPoint: uri,
                    errorResponseCode: req.status,
                    errorResponse: req.responseText || req.statusText
                }));
            };
            req.onload = () => {
                if (req.status === 200) {
                    resolve(req.responseText);
                }
                else {
                    this._logger.info("<=== NetworkClient::Received Fail", { code: req.status, data: req.responseText });
                    reject(new networkError_1.NetworkError(`Failed ${method} request`, {
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
            this._logger.info("===> NetworkClient::Send", { data });
            req.send(data);
        });
    }
}
exports.NetworkClient = NetworkClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29ya0NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3JrL25ldHdvcmtDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUF1RTtBQUN2RSw0RUFBeUU7QUFDekUsNEVBQXlFO0FBQ3pFLDRFQUF5RTtBQUl6RSx3RUFBcUU7QUFFckU7O0dBRUc7QUFDSDtJQVFJOzs7OztPQUtHO0lBQ0gsWUFBWSxlQUFpQyxFQUFFLE1BQWdCLEVBQUUsWUFBb0IsQ0FBQztRQUNsRixFQUFFLENBQUMsQ0FBQywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxJQUFJLDJCQUFZLENBQUMscUNBQXFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQywyQkFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RCxNQUFNLElBQUksMkJBQVksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUF1QixFQUFFLGlCQUFnRDtRQUN0RixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sSUFBSSxHQUFH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
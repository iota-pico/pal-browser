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
     * @param data The data to send.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async get(data, additionalPath, additionalHeaders) {
        this._logger.info("===> NetworkClient::GET Send");
        const resp = await this.doRequest("GET", this.objectToParameters(data), additionalPath, additionalHeaders);
        this._logger.info("<=== NetworkClient::GET Received", resp);
        return resp;
    }
    /**
     * Post data asynchronously.
     * @param data The data to send.
     * @param additionalPath An additional path append to the endpoint path.
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
     * Request data as JSON asynchronously.
     * @typeparam T The generic type for the object to send.
     * @typeparam U The generic type for the returned object.
     * @param data The data to send as the JSON body.
     * @param method The method to send with the request.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async json(data, method, additionalPath, additionalHeaders) {
        this._logger.info(`===> NetworkClient::${method} Send`);
        const headers = additionalHeaders || {};
        let localData;
        if (method === "GET" || method === "DELETE") {
            localData = this.objectToParameters(data);
        }
        else {
            headers["Content-Type"] = "application/json";
            localData = JSON.stringify(data);
        }
        return this.doRequest(method, localData, additionalPath, headers)
            .then((responseData) => {
            try {
                const response = JSON.parse(responseData);
                this._logger.info(`===> NetworkClient::${method} Received`, response);
                return response;
            }
            catch (err) {
                this._logger.info(`===> NetworkClient::${method} Parse Failed`, responseData);
                throw (new networkError_1.NetworkError(`Failed ${method} request, unable to parse response`, {
                    endPoint: this._networkEndPoint.getUri(),
                    response: responseData
                }));
            }
        });
    }
    /**
     * Perform a request asynchronously.
     * @param method The method to send the data with.
     * @param data The data to send.
     * @param additionalPath An additional path append to the endpoint path.
     * @param additionalHeaders Extra headers to send with the request.
     * @returns Promise which resolves to the object returned or rejects with error.
     */
    async doRequest(method, data, additionalPath, additionalHeaders) {
        return new Promise((resolve, reject) => {
            const headers = additionalHeaders || {};
            let uri = this._networkEndPoint.getUri();
            if (!stringHelper_1.StringHelper.isEmpty(additionalPath)) {
                const stripped = `/${additionalPath.replace(/^\/*/, "")}`;
                uri += stripped;
            }
            if ((method === "GET" || method === "DELETE") && !objectHelper_1.ObjectHelper.isEmpty(data)) {
                uri += data;
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
            if (method === "GET" || method === "DELETE") {
                req.send();
            }
            else {
                req.send(data);
            }
        });
    }
    /* @internal */
    objectToParameters(data) {
        let localUri = "";
        if (data) {
            const keys = Object.keys(data);
            if (keys.length > 0) {
                const parms = [];
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const value = data[key] ? data[key].toString() : "";
                    parms.push(`${encodeURIComponent(keys[i])}=${encodeURIComponent(value)}`);
                }
                localUri += `?${parms.join("&")}`;
            }
        }
        return localUri;
    }
}
exports.NetworkClient = NetworkClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29ya0NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9uZXR3b3JrL25ldHdvcmtDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUF1RTtBQUN2RSw0RUFBeUU7QUFDekUsNEVBQXlFO0FBQ3pFLDRFQUF5RTtBQUt6RSx3RUFBcUU7QUFFckU7O0dBRUc7QUFDSCxNQUFhLGFBQWE7SUFRdEI7Ozs7O09BS0c7SUFDSCxZQUFZLGVBQWlDLEVBQUUsTUFBZ0IsRUFBRSxZQUFvQixDQUFDO1FBQ2xGLElBQUksMkJBQVksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDdkMsTUFBTSxJQUFJLDJCQUFZLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksQ0FBQywyQkFBWSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO1lBQ3JELE1BQU0sSUFBSSwyQkFBWSxDQUFDLDRCQUE0QixDQUFDLENBQUM7U0FDeEQ7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBRTFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBNEIsRUFBRSxjQUF1QixFQUFFLGlCQUFnRDtRQUNwSCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxL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